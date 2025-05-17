import { addCommand } from "@communityox/ox_lib/server";

function initCmds() {
   addCommand<{ webpage: string, focus: number }>('page', async (source: number, args, raw: string) => {
      if (!args) return;

      Citizen.trace(`page command args received: { ${args.webpage}, ${args.focus} }`);

      emitNet('rv_gui:Webview:switch', source, args.webpage, args.focus)
   }, {
      help: 'changes the page for rv_gui boilerplate',
      params: [
         { name: 'webpage', paramType: 'string', help: 'e.x hud' },
         { name: 'focus', paramType: 'number', help: '1=focus, 0=not focused' }
      ],
      restricted: 'group.admin'
   })
}

initCmds();