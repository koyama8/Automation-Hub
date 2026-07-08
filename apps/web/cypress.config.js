const fs = require('fs')
const http = require('http')
const path = require('path')
const { defineConfig } = require('cypress')

let staticServer

function startStaticServer(port = 3000) {
  if (staticServer) return

  const distDir = path.join(__dirname, 'dist')

  staticServer = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://localhost:${port}`)
    const pathname = decodeURIComponent(requestUrl.pathname)
    const requestedPath = path.normalize(path.join(distDir, pathname))
    const isAsset = path.extname(requestedPath)
    const filePath = requestedPath.startsWith(distDir) && isAsset
      ? requestedPath
      : path.join(distDir, 'index.html')

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404)
        response.end('Not found')
        return
      }

      response.writeHead(200)
      response.end(content)
    })
  })

  staticServer.on('error', (error) => {
    if (error.code !== 'EADDRINUSE') throw error
  })

  staticServer.listen(port)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      startStaticServer()

      on('after:run', () => {
        staticServer?.close()
        staticServer = null
      })

      return config
    },
    experimentalStudio: true,
    video: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
  },
})
