import { createServer, preview } from 'vite'

// Vite's listen promise is an event-backed finite readiness wait, not a port-poll loop.
export async function startFoundationServer({ legacy = false, production = false } = {}) {
  const configFile = legacy ? 'vite.config.ts' : 'vite.foundation.config.ts'
  const port = legacy ? 4176 : 4175
  if (production) {
    const server = await preview({ configFile, preview: { host: '127.0.0.1', port, strictPort: true } })
    return { url: `http://127.0.0.1:${port}`, close: () => new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve())) }
  }
  const server = await createServer({ configFile, server: { host: '127.0.0.1', port, strictPort: true } })
  let timer
  try {
    await Promise.race([server.listen(), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Vite readiness timeout')), 12000) })])
  } catch (error) { await server.close(); throw error } finally { clearTimeout(timer) }
  return { url: `http://127.0.0.1:${port}`, close: () => server.close() }
}
