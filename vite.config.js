import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Base path (relative for GitHub Pages & root for Vercel)
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
