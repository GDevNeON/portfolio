import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    outDir: 'dist-a02',
    rollupOptions: { input: fileURLToPath(new URL('./a02.html', import.meta.url)) },
  },
})
