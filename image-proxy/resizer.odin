package main

import "core:slice"
import "base:runtime"
import stb_image "vendor:stb/image"
import "core:log"
import "core:math"

AllowedSizes :: []u16{16, 32, 64, 128, 256, 512, 1024, 2048}

LoadResult :: struct {
	width:    i32,
	height:   i32,
	channels: i32,
	data:     [^]f32,
}

LoadError :: struct #all_or_none {
	message: string,
	cause:   string,
}

new_load_error :: proc(message: string, cause: string) -> ^LoadError {
	err := new(LoadError)
	err.cause = cause
	err.message = message
	return err
}

validate_allowed_sizes :: proc() {
	cursor := new(u16, context.temp_allocator)
	cursor^ = 16
	for size in AllowedSizes {
		assert(cursor^ == size)
		cursor^ = cursor^ << 1
	}
	free_all(context.temp_allocator)
}

// returns true if it is valid
validate_size :: proc(size: string) -> bool {
	size_int := cast(u16)_to_int(size)
	// TODO: CHANGE THIS
	sizes_proxy := AllowedSizes

	return slice.contains(sizes_proxy[:], size_int)
}

load_image :: proc(data: []byte) -> (result: ^LoadResult, err: ^LoadError) {
	res := new(LoadResult)
	x, y, channels: i32

	res.data = stb_image.loadf_from_memory(
		raw_data(data),
		cast(i32)len(data),
		&x,
		&y,
		&channels,
		4,
	)

	if res.data == nil {
		reason := stb_image.failure_reason()
		log.error("loadf_from_memory failed:", reason)

		free(res)

		return nil, new_load_error(
			"Could not load image into stb_image",
			cast(string)reason,
		)
	}

	res.width = x
	res.height = y
	res.channels = 4 // desired_channels — data always has this many regardless of source
	return res, nil
}

// allocates data for the resized output image
alloc_resize :: proc(img: ^LoadResult, output: ^LoadResult) {
	pixels := int(img.channels * output.height * output.width)
	output.data = make([^]f32, pixels)
}

resize_image :: proc(img: ^LoadResult, size: Vector2i32) -> ^LoadResult {
	assert(img != nil, "img must not be nil")
	assert(img.data != nil, "img.data must not be nil")

	output := new(LoadResult)
	output.width = size.x
	output.height = size.y
	output.channels = img.channels

	alloc_resize(img, output)

	result := stb_image.resize_float(
		img.data,
		img.width,
		img.height,
		0,
		output.data,
		size.x,
		size.y,
		0,
		img.channels,
	)

	if result == 0 {
		log.error("resize_float failed")
		free(output.data)
		free(output)
		return nil
	}

	return output
}

@(private)
_write_callback :: proc "c" (ctx: rawptr, data: rawptr, size: i32) {
	context = runtime.default_context()
	buf := cast(^[dynamic]u8)(ctx) // cast ctx to a pointer to a dynamic byte array
	src := cast([^]u8)(data) // cast data into an array of pointers
	append(buf, ..src[:int(size)]) // append the remaining parts of src to the buffer
}

@(private)
linear_to_srgb_u8 :: proc(linear: f32) -> u8 {
	// IEC 61966-2-1 sRGB curve
	v := math.clamp(linear, 0, 1)
	if v <= 0.0031308 {
		// magic number hell
		// This is the constant for dark values
		v = 12.92 * v
	} else {
		// multiply by light constant. 
		v = 1.055 * math.pow(v, 1.0 / 2.4) - 0.055
	}
	return u8(v * 255 + 0.5)
}

encode_png :: proc(img: ^LoadResult, allocator := context.allocator) -> []u8 {
	assert(img != nil)
	assert(img.data != nil)

	pixel_count := img.width * img.height * img.channels
	pixels_u8 := make([]u8, pixel_count, allocator)

	for i in 0 ..< pixel_count {
		pixels_u8[i] = linear_to_srgb_u8(img.data[i])
	}

	buf: [dynamic]u8
	buf.allocator = allocator

	stb_image.write_png_to_func(
		_write_callback,
		&buf,
		img.width,
		img.height,
		img.channels,
		raw_data(pixels_u8),
		img.width * img.channels,
	)

	return buf[:]
}

/*
Frees a LoadResult whose `.data` was allocated by stb_image (load functions).
Do NOT use this on results from `resize_image` — those use Odin's allocator.
*/
stb_free :: proc(img: ^LoadResult) {
	if img == nil do return
	stb_image.image_free(img.data)
	free(img)
}

/*
Frees a LoadResult whose `.data` was allocated by Odin's allocator (resize_image).
*/
result_free :: proc(img: ^LoadResult) {
	if img == nil do return
	free(img.data)
	free(img)
}
