# (WIP) rv_gui

> [!TIP]
> Want to join a great upcoming dev community? Make sure you don't miss to join our [Discord](https://discord.gg/3FjtbxSMNT) :)!

## How to build?

1. Go to the root directory of the resource

2. Type following commands seperatly in the terminal

```bash
pnpm build - build server files
pnpm build:web - build webview
pnpm watch - watch server files
pnpm watch:web - watch webview
pnpm build:dev - build everything
pnpm dev - watch everyting
```

### <ins>Folder Structure<ins>

- rv_gui// root directory of the resource
- resource// this is where the server will start our resource from. getting created when you build it
- gui// frontend stuff
- src// this is where you can write client or serverside code which is later getting compiled to js
