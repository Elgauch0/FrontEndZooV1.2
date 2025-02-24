import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@functions': path.resolve(__dirname, './src/functions.js'),
      '@assets': path.resolve(__dirname, './public'),  
    }
   },
  
  build: {
    assetsDir: 'assets',
    manifest: true
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling:true

    }
  },
  define: {
    'process.env': process.env
}
});



