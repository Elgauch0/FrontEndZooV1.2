import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  publicDir: 'public',
  resolve: {
    alias: {
      '~public': path.resolve(__dirname, './public') 
    }
  },
  
});



