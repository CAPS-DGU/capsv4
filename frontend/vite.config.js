import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert';

import fs from 'fs';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  server: {

    proxy: {
      '/api': {
        target: 'https://api.dgucaps.kr:8443/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  }
})
