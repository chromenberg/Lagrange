#+feature dynamic-literals
package main
import "core:net"
import "core:log"
import "core:strings"
import http "../packages/odin-http"
import "core:container/lru"
import client "./client"

cache: lru.Cache(string, []byte)

R2ImageRoute :: "/(.*)/(.*)/(.*)"
LRU_Capacity :: 200

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

// FileMimeTypes := map[string]string {
// 	"jpg" = MimeTypes["jpeg"],
// 	"jpeg" = MimeTypes["jpeg"],
// 	"png" = MimeTypes["png"],
// 	"bmp" = MimeTypes["bmp"],
// 	"gif" = MimeTypes["gif"],
// 	"apng" = MimeTypes["apng"],
// 	"tiff" = MimeTypes["tiff"],
// 	"avif" = MimeTypes["avif"],
// }

// Gets the MIME type of a file based off of its file name
get_mime_type :: proc(filename: string) -> string {
	split := strings.split(filename, ".")
	file_type := split[len(split) - 1] // get the last item

	return MimeTypes[file_type]
}


check_for_cached_image :: proc(path: string) -> (^[]byte, bool) {
	return lru.get_ptr(&cache, path)
}

image_handler :: proc(req: ^http.Request, res: ^http.Response) {
	log.info("Request URL:", req.url.path)
	log.info("Request Query:", req.url.query)

	data, exists := check_for_cached_image(req.url.path)

	if !exists {
		log.info(req.url.path, "was not cached")
		
		img_res := client.fetch_image(req.url.path)

		img := client.get_body_plain(img_res)

		lru.set(&cache, req.url.path, transmute([]byte)img)
	}
	if exists {
		log.info(req.url.path, "was cached")
		// lru.get(&cache, req.url.path)
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

	// cdn file handler.
	http.route_get(&router, R2ImageRoute, http.handler(image_handler))

	log.info("Server listening on 127.0.0.1:86 (change this to use config)")

	err := http.listen_and_serve(&server, router_handler, net.Endpoint{
		address = net.IP4_Address{127, 0, 0, 1},
		port = 86
	})

	if err != nil {
		log.fatal("Could not start proxy server. Reason:", err)
		return
	}

}

main :: proc() {
	// Set a logger to exist for the process context
	context.logger = log.create_console_logger(log.Level.Info)
	lru.init(&cache, LRU_Capacity)
	init_server()

	defer lru.destroy(&cache, false)
}
