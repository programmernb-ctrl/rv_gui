import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import pkg from 'fast-glob'; // fast-glob is a CommonJS module?
const { globSync } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.resolve(__dirname);

async function buildFiles() {
    const buildContexts = [
        {
            label: 'client',
            platform: 'browser',
            target: ['chrome97'],
            entryPoints: globSync('./src/client/index.ts'),
            format: 'iife'
        },
        {
            label: 'server',
            platform: 'node',
            target: ['node22'],
            entryPoints: globSync('./src/server/index.ts'),
            format: 'cjs',
        }
    ];

    for (const ctx of buildContexts) {
        const label = ctx.label;
        delete ctx.label;

        const outputDir = path.normalize(path.join(buildPath, 'resource', label));

        if (!(fs.existsSync(outputDir))) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        try {
            await esbuild.build({
                ...ctx,
                outdir: outputDir,
                bundle: true,
                minify: true,
                minifyWhitespace: true,
            });
            console.log(`Build completed for ${label}`);
        } catch (error) {
            console.error(`\nBuild errored for ${label}:`, error);
        }
    }
}

buildFiles();