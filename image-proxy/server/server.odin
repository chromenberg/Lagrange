package server
import http "../../packages/odin-http"
import "core:net"
import "core:os"
import "core:fmt"

open_test_file :: proc() -> []byte {
	data, err := os.read_entire_file("./test.jpg", context.allocator)
	if err != nil {
		panic("Error occured when reading test file")
	}

	return data;
}

cdn_file_handler :: proc(req: ^http.Request, res: ^http.Response) {
	fmt.println("Request URL:",req.url)
	fmt.println("Request Params:",req.url_params)
	// add the MIME type to a reference of the headers
	http.headers_set(&res.headers, "Content-Type", "image/jpeg")
	http.respond_file_content(res, "./test.jpg", open_test_file())
}

main :: proc() {
	server: http.Server
	http.server_shutdown_on_interrupt(&server) // shutdown on sigint

	router: http.Router
	http.router_init(&router) // start the router
	defer http.router_destroy(&router) // defer router close until end

	// cdn file handler.
	http.route_get(&router, "/(.*)/(.*)/(.*)", http.handler(cdn_file_handler))

	router_handler := http.router_handler(&router)
	
	err := http.listen_and_serve(&server, router_handler, net.Endpoint{
		address = net.IP4_Address{127, 0, 0, 1},
		port = 86
	})
	
}
