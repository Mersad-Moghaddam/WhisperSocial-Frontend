import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        // Proxy API calls in dev to backend services to avoid CORS issues.
        // Each entry rewrites the /api/<service> prefix before forwarding.
        '/api/auth': {
          target: env.VITE_AUTH_URL || 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/auth/, ''),
        },
        '/api/posts': {
          target: env.VITE_POST_URL || 'http://127.0.0.1:8084',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/posts/, ''),
        },
        '/api/follow': {
          target: env.VITE_FOLLOW_URL || 'http://127.0.0.1:8082',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/follow/, ''),
        },
        '/api/timeline': {
          target: env.VITE_TIMELINE_URL || 'http://127.0.0.1:8085',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/timeline/, ''),
        },
        '/api/admin': {
          target: env.VITE_ADMIN_URL || 'http://127.0.0.1:8086',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/admin/, ''),
        },
      },
      open: '/',
    },
  };
});
