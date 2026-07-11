package main
import "core:net"

ipaddress := net.IP4_Address{127, 0, 0, 1}
MaxCacheSize :: 200
R2ImageRoute :: "/([0-9]*)/([0-9]*)/(.*)"
ProxyPath    :: "https://cdn.wyvernapp.com"
QualityPresets :: enum {
	Shit    = 10,
	Low     = 30,
	MedLow  = 40,
	Medium  = 50,
	MedHigh = 60,
	High    = 75,
	None    = 100
}

ServerAddress :: "127.0.0.1"
ServerPort    :: 82
