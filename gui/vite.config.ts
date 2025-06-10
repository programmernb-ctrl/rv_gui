import {fileURLToPath, URL} from 'url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
    build: {
        modulePreload: false,
        cssCodeSplit: true,
        outDir: '../resource/web',
        copyPublicDir: true,
        emptyOutDir: true,
        target: 'chrome97',
        minify: 'esbuild',
        rollupOptions: {
            preserveEntrySignatures: false,
            strictDeprecations: true,
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name]_[hash].js',
                dynamicImportInCjs: true,
                hoistTransitiveImports: false,
                interop: 'auto',
                generatedCode: {
                    constBindings: true,
                    arrowFunctions: true,
                },
                minifyInternalExports: true,
            },
        },
    },
    base: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [
        vue(),
        //vueDevTools()
    ],
});
