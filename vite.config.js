import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'configure-response-headers',
            configureServer: (server) => {
                server.middlewares.use((req, res, next) => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    const url = req.originalUrl || req.url;
                    if (url && (url.endsWith('.js') || url.endsWith('.ts') || url.endsWith('.tsx'))) {
                        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
                    }
                    next();
                });
            },
        },
    ],
    server: {
        port: 5175,
        strictPort: true,
        host: true
    },
    build: {
        rollupOptions: {
            output: {
                format: 'es'
            }
        }
    }
});
