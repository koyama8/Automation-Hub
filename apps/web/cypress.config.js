const fs = require('fs')
const http = require('http')
const path = require('path')
const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin,
  afterRunHandler,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

let staticServer
const webPort = Number(process.env.WEB_PORT || 3000)
const webUrl = process.env.WEB_URL || `http://localhost:${webPort}`

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
  projectId: '2hmvki',
  e2e: {
    async setupNodeEvents(on, config) {
      startStaticServer(webPort)

      await addCucumberPreprocessorPlugin(on, config, {
        omitAfterRunHandler: true,
      })

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))

      on('after:run', async (results) => {
        await afterRunHandler(config, results)
        staticServer?.close()
        staticServer = null
      })

      return config
    },
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/features/**/*.feature',
    ],
    experimentalStudio: true,
    video: true,
    baseUrl: webUrl,
    viewportWidth: 1440,
    viewportHeight: 900,
  },
})
