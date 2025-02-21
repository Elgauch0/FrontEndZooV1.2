import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '~public': path.resolve(__dirname, './public') // Chemin absolu vérifié
    }
  },
  build: {
    assetsInclude: ['**/*.jpg'],
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
});