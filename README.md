# (WIP) rv_gui v0.0.2

> [!TIP]
> Want to join a great upcoming dev community? Make sure you don't miss to join our [Discord](https://discord.gg/3FjtbxSMNT) :)!

> [!IMPORTANT]
> [Documentation](https://revolution-4.gitbook.io/revolution-or-docs/resources/rv_gui) can be found here. Just click the link

## How to build?

1. Go to the root directory of the resource

2. Use the command that you need

```bash
bun run build - build server files
bun run build:web - build webview
bun run watch - watch server files
bun run watch:web - watch webview
bun run build:dev - build everything
bun run dev - watch everyting
```

### <ins>Folder Structure<ins>

- rv_gui// root directory of the resource
- resource// this is where the server will start our resource from. getting created when you build it
- gui// frontend stuff
- src// this is where you can write client or serverside code which is later getting compiled to js
