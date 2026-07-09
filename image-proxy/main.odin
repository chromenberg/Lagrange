package main
import "core:net"
import "core:strings"
import "core:fmt"

handle_client_conn :: proc(client: net.TCP_Socket) {
	defer net.close(client) // defer closing request

	buffer: [4069]u8 // create buffer for reading request
	bytes_read, read_err := net.recv(client, buffer[:]) // I Assume this splits the buffer, similar to python

	if read_err != nil {
		fmt.println("Error reading request:", read_err)
		return
	}

	request := string(buffer[:bytes_read])
	fmt.println("Req Data:", request)

	response := strings.concatenate([]string{
		"HTTP/1.1 204 OK"
	})

	// cast the data into u8 bytes
	net.send(client, transmute([]u8)response)
}

main :: proc() {
	socket, err := net.listen_tcp({
		address = ipaddress,
		port = 86
	})

	if err != nil {
		fmt.println("Couldnt create server:", err)
		return
	}
	defer net.close(socket)

	// handle connections
	for {
		// accept client connection, map client, address and error
		client, client_addr, client_err := net.accept_tcp(socket)

		if client_err != nil {
			fmt.println("Error accepting client connection:", client_err)
			continue
		}

		handle_client_conn(client)
	}
}
