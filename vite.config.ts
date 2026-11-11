import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const USE_MOCK = true;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api/search/shows': {
        target: USE_MOCK
          ? 'http://localhost:3001'
          : 'https://api.tvmaze.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});