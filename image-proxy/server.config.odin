package main

Snowflake :: "([0-9]*)"

MaxCacheSize :: 200

AvatarRoute :: "/avatars/([0-9]*)/(.*).webp"
AttachmentRoute :: "/attachments/([0-9]*)/([0-9]*)/(.*)"

R2ImageRoute :: "/([0-9]*)/([0-9]*)/(.*)"
ProxyPath    :: "https://cdn.wyvernapp.com"

QualityPresets :: enum {
	Shittest = 1,
	Shitter = 5,
	Shit    = 10,
	Low     = 30,
	MedLow  = 40,
	Medium  = 50,
	MedHigh = 60,
	High    = 75,
	None    = 100
}

HostAddress   :: "media.wyvernapp.com"
ServerAddress :: "192.168.0.40"
ServerPort    :: 80
