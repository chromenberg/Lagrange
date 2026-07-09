package main
import "core:fmt"
import "core:strings"
import "core:os"
import "base:runtime"
import "json_reader"
import "core:encoding/json"

JsonObject :: distinct map[string]json.Value


get_dependents :: proc(data: JsonObject) -> json.Array {
	return data["dependencies"].(json.Array)
}

clone_dependents :: proc(repos: []string) {
	os.
}

main :: proc() {
	json_data := json_reader.read_json_file("package-list.json")
	data := json_data.(json.Object)
	
	dependents := data["dependencies"].(json.Array)
	fmt.println(dependents)

	
} 
