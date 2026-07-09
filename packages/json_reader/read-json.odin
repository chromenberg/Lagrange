package json_reader

import "core:os"
import "core:encoding/json"

read_json_file :: proc(path: string) -> (json.Value) {
	file_data, err := os.read_entire_file(path, context.allocator)

	if err != nil {
		return nil
	}
	
	json_data, parse_err := json.parse(file_data)
	
	if parse_err != nil {
		return nil
	}

	return json_data
}
