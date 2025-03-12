name 'Vue+Ts Boilerplate'
fx_version 'cerulean'
game 'gta5'
version '1.0.0'
node_version '22'

nui_callback_strict_mode 'true'

author 'thirst'
description 'TS Vue Boilerplate'

client_scripts {
   'resource/client/index.js'
}

server_scripts {
   'resource/server/index.js'
}

dependencies {
   '/server:13068',
	'/onesync',
}

files {
   'resource/web/assets/*',
   'resource/web/*'
}


ui_page 'resource/web/index.html'