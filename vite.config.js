import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Base path for root deployment (like Vercel)
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
  },
});
