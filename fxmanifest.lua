name 'Vue+Ts Boilerplate'
fx_version 'cerulean'
game 'gta5'
version '0.0.3'
node_version '22'
lua54 'yes'

use_experimental_fxv2_oal 'yes'
nui_callback_strict_mode 'true'

author 'thirst'
description 'TS Vue Boilerplate'

client_scripts {
   'resource/client/index.js'
}

server_scripts {
   'resource/server/index.js'
}

shared_scripts {
   'resource/common/*.js'
}

dependencies {
   '/server:13943',
	'/onesync',
}

files {
   'resource/web/assets/*',
   'resource/web/*',
}


ui_page 'resource/web/index.html'