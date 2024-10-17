

import { resolve } from 'path'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

const port = 3000

export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: [{ find: /^~/, replacement: '' }],
    },
    build: {
        outDir: 'build',
        target: 'esnext',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
        },
    },
    server: {
        open: true,
        port,
    },
})
