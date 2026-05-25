package main

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"strings"
	"syscall/js"
)

const tokenMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890_-"

type Token struct {
	data []byte
}

func NewToken(byteLength int) (*Token, error) {

	if byteLength < 10 {
		return nil, errors.New("Cannot create a token with less than 10 bytes of data due to security reasons.")
	}
	
	buff := make([]byte, byteLength)
	_, err := rand.Read(buff)
	if err != nil {
		return nil, err
	}
	return &Token{data: buff}, nil
}

func (token *Token) ToBase64Atlas() string {
	return strings.Split(
		base64.NewEncoding(tokenMap).EncodeToString(token.data),
		"=",
	)[0]
}
func (token *Token) ToBase64() string {
	return base64.StdEncoding.EncodeToString(token.data);
}



func GenToken(this js.Value, args []js.Value) interface{} {
	tok, err := NewToken(args[0].Int())

	if err != nil {
		return js.ValueOf(err)
	}
	
	return js.ValueOf(map[string]interface{}{
		"ToBase64": js.FuncOf(func(this js.Value, args []js.Value) any {
			return tok.ToBase64()
		}),
		"ToBase64Atlas": js.FuncOf(func(this js.Value, args []js.Value) any {
			return tok.ToBase64Atlas()	
		}),
	})
}


func main() {
	println("[CRYPT.WASM] Crypt WASM file loaded")
	js.Global().Set("NewToken", js.FuncOf(GenToken))
}
