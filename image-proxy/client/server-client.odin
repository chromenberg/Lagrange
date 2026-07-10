package proxyclient
import http_client "../../packages/odin-http/client"
import "core:log"
import "core:strings"
import http "../../packages/odin-http"

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

get_body_plain :: proc(body: http_client.Body_Type) -> string {
	return body.(http_client.Body_Plain)
}