import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 4175, strictPort: true },
  build: { outDir: 'dist-foundation', rollupOptions: { input: fileURLToPath(new URL('./foundation.html', import.meta.url)) } },
})
