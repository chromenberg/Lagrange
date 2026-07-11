package main
import http_client "../packages/odin-http/client"
import "core:log"
import "core:strings"
import http "../packages/odin-http"

// Path to the S3 bucket, using the public path
Path :: "https://cdn.wyvernapp.com"

// Concatenates a request path with the cloudflare media bucket path
to_bucket_url :: proc(path: string) -> string {
	return strings.concatenate([]string{
		Path,
		path
	})
}

fetch_image :: proc(path: string) -> (http_client.Body_Type) {
	// get request data that will be made towards cloudflare
	req := http_client.Request{
		method = http.Method.Get
	}
	res, err := http_client.request(&req, to_bucket_url(path))

	body, was_alloc, body_err :=http_client.response_body(&res)
	log.info(was_alloc)
	
	return body
}

// Fetches an image from cloudflare and returns its body in bytes
fetch_image_bytes :: proc(path: string) -> []byte {
	return get_body_bytes(fetch_image(path))
}

// Converts a requests body into a string
get_body_plain :: proc(body: http_client.Body_Type) -> string {
	return body.(http_client.Body_Plain)
}

// Converts a requests body into bytes
get_body_bytes :: proc(body: http_client.Body_Type) -> []byte {
	return transmute([]byte)get_body_plain(body)
}