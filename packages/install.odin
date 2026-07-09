package main
import "core:fmt"
import "core:strings"
import "core:os"
import "base:runtime"
import "json_reader"
import "core:encoding/json"

JsonObject :: distinct map[string]json.Value

// get_dependents :: proc(data: JsonObject) -> map[string]string {
// 	dependencies := data["dependencies"].(json.Object)
// 	return dependencies
// }

main :: proc() {
	json_data := json_reader.read_json_file("package-list.json")
	data := json_data.(json.Object)
	
	dependents := data["dependencies"].(json.Object)
	fmt.println(dependents)
} 
