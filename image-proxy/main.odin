#+feature dynamic-literals
package main
import "core:net"
import conv "core:strconv"
import "core:log"
import "core:strings"
import http "../packages/odin-http"
import "core:container/lru"

cache: lru.Cache(string, []u8)

MimeTypes := map[string]string {
	"jpg" = "image/jpeg",
	"jpeg" = "image/jpeg",
	"png"  = "image/png",
	"bmp"  = "image/bmp",
	"avif" = "image/avif",
	"tiff" = "image/tiff",
	"apng" = "image/apng",
	"gif"  = "image/gif"
}

URLParamInt :: #type string
R2Data :: struct {
	/*
	Access key for a bucket as provided by cloudflare

	Create a variable called `AccessKey` in a new file `cloudflare.config.odin`
	in the image-proxy root
	*/
	AccessKey: string,
	/*
	Secret Access key for a bucket as provided by cloudflare

	Create a variable called `SecretKey` in a new file `cloudflare.config.odin`
	in the image-proxy root
	*/
	SecretKey: string,
	/*
	Path to the bucket as provided by cloudflare

	Create a variable called `Path` in a new file `cloudflare.config.odin`
	in the image-proxy root
	*/
	Path: string
}

ProxyParams :: struct {
	size    : Maybe(URLParamInt),
	width   : Maybe(URLParamInt),
	height  : Maybe(URLParamInt),
	quality : QualityPresets,
	format  : string,
}

// Returns num as an int, while disregarding the error param
@(private)
_to_int :: proc(num: string) -> int {
	val, err := conv.parse_int(num)
	return val
}

get_name :: proc(path: string) -> string {
	split := strings.split(path, ".")
	return split[len(split)-1]
}

// Gets the MIME type of a file based off of its file name
get_mime_type :: proc(filename: string) -> string {
	return MimeTypes[get_name(filename)]
}

check_for_cached_image :: proc(path: string) -> ([]u8, bool) {
	res, ok := lru.get(&cache, path)
	return res, ok
}

run_resize :: proc(data: []u8, flags: ProxyParams) -> []u8 {

	load, err := load_image(data) // load image data from cloudflare
	if err != nil do return nil
	defer stb_free(load) // free image after exit

	// Initialise and set the default width and height
	// to the image width and height, in case nothing was specified
	width, height: i32
	width  = load.width
	height = load.height

	// Set width and height to the ones specified in the flags if present
	// These values take precedence over the default values
	if flags.width != nil && flags.height != nil {
		width  = auto_cast _to_int(flags.width.(URLParamInt))
		height = auto_cast _to_int(flags.height.(URLParamInt))
	}

	// If size is set then set the width and height to be the size
	// This flag should take full priority, and if present should
	// always become the width and height
	if flags.size != nil {
		if !validate_size(flags.size.(URLParamInt)) {
			return nil
		}
		width  = auto_cast _to_int(flags.size.(URLParamInt))
		height = auto_cast _to_int(flags.size.(URLParamInt))
	}

	resized := resize_image(load, {x = width, y = height}) // resize the image
	if resized == nil do return nil
	defer result_free(resized) // free results after exit

	log.info("resized:", resized.width, resized.height, resized.channels)

	return encode_png(resized) // encode back and return
}

manip_image :: proc(path: string, flags: ProxyParams) -> []u8 {
	log.info("Fetching", path, "from cloudflare")
	cached, ok := check_for_cached_image(path)

	if ok {
		log.debug("Root image", path, "was cached... Using cached content instead")
		return run_resize(cached, flags)
	}

	img_data := fetch_image_bytes(path)
	// if we encounter an error then it will end up caching that
	// this is something to fix
	cache_result(path, &img_data) // if we had to fetch the result then instantly cache the image
	return run_resize(img_data, flags)
}

cache_result :: proc(name: string, data: ^[]u8) {
	if data^ == nil do return
	log.debug("Caching", name, "data")
	lru.set(&cache, name, data^)
}

// Responds to a request with the image they requested
respond_image :: proc(
	res: ^http.Response,
	name: string,
	data: ^[]u8
) {
	http.headers_set(&res.headers, "Content-Type", get_mime_type(name))
	http.respond_file_content(res, name, data^)
}

parse_query :: proc(query: string) -> ProxyParams {
	split_query := strings.split(query, "&")
	flags: ProxyParams

	parse_quality :: proc(quality: QualityPresets, flags: ^ProxyParams) {
		switch quality {
			case .Shit    : flags.quality = .Shit
			case .Low     : flags.quality = .Low
			case .MedLow  : flags.quality = .MedLow
			case .Medium  : flags.quality = .Medium
			case .MedHigh : flags.quality = .MedHigh
			case .High    : flags.quality = .High
			case .None    : flags.quality = .None
		}
	}
	if split_query[0] != "" {
		log.info(split_query)
		for flag in split_query {
			split_flag := strings.split(flag, "=")
			val := split_flag[1]

			switch split_flag[0] {
				case "size":   flags.size = val
				case "width":  flags.width = val
				case "height": flags.height = val
				case "format": flags.format = val
				case "quality": parse_quality(auto_cast _to_int(val), &flags)
			}
		}
	}

	return flags
}

image_handler :: proc(req: ^http.Request, res: ^http.Response) {
	log.info("Request URL:", req.url.path)
	log.info("Request Query:", req.url.query)

	full_name := strings.concatenate([]string{
		req.url.path,
		req.url.query
	})

	data, exists := check_for_cached_image(full_name)
	if !exists {

		flags := parse_query(req.url.query)
		image := manip_image(req.url.path, flags)

		cache_result(full_name, &image)
		respond_image(res, req.url.path, &image)
	}
	if exists {
		log.info(full_name, "was cached")
		respond_image(res, req.url.path, &data)
	}
}

init_server :: proc() {
	log.info("Initializing proxy server")

	// create a new http server
	server: http.Server
	http.server_shutdown_on_interrupt(&server) // shutdown on sigint

	router: http.Router
	http.router_init(&router) // start the router
	defer http.router_destroy(&router) // defer router close until end

	router_handler := http.router_handler(&router)
	http.route_get(&router, R2ImageRoute, http.handler(image_handler))

	log.info("Server listening on", ServerAddress,":", ServerPort ,"(change this to use config)")

	address, ok := net.parse_ip4_address(ServerAddress)
	err := http.listen_and_serve(&server, router_handler, net.Endpoint{
		address = address,
		port = ServerPort
	})

	if err != nil {
		log.fatal("Could not start proxy server. Reason:", err)
		return
	}
}

main :: proc() {
	// Set a logger to exist for the process context
	context.logger = log.create_console_logger(log.Level.Debug)
	lru.init(&cache, MaxCacheSize)
	defer lru.destroy(&cache, false)

	validate_allowed_sizes()
	init_server()
}
