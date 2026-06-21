import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shahzads-website/', // Base path for GitHub Pages subfolder deployment
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
