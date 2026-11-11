import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const USE_MOCK = true;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api/search/shows': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});