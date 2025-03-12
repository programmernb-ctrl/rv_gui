import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

import pkg from 'fast-glob'; // fast-glob is a CommonJS module?
const {globSync} = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.resolve(__dirname);

const isWatchMode = process.argv.includes('--watch');

async function buildFiles() {
    const buildContexts = [
        {
            label: 'client',
            platform: 'browser',
            target: ['chrome97'],
            entryPoints: globSync('./src/client/index.ts'),
            format: 'iife',
        },
        {
            label: 'server',
            platform: 'node',
            target: ['node22'],
            entryPoints: globSync('./src/server/index.ts'),
            format: 'cjs',
        },
    ];

    for (const ctx of buildContexts) {
        const label = ctx.label;
        delete ctx.label;

        const outputDir = path.normalize(path.join(buildPath, 'resource', label));
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, {recursive: true});
        }

        try {
            const context = await esbuild.context({
                ...ctx,
                outdir: outputDir,
                bundle: true,
                minify: true,
                minifyWhitespace: true,
                logLevel: 'info',
            });

            if (isWatchMode) {
                console.log(`Watching for changes in ${label}...`);
                await context.watch();
            } else {
                await context.rebuild();
                console.log(`Build completed for ${label}`);
                await context.dispose();
            }
        } catch (error) {
            console.error(`\nBuild errored for ${label}:`, error);
        }
    }
}

buildFiles();
