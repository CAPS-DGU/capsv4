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

    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'private.key')), // 개인 키
      cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt')), // 인증서
      ca: fs.readFileSync(path.resolve(__dirname, 'ca_bundle.crt')), // 인증서 체인
    },
    host: "beta.dgucaps.kr",
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
