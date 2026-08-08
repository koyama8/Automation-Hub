import 'dotenv/config'
import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import { deleteUserByEmail } from './cypress/support/database.js'

const port = process.env.PORT || 3030

export default defineConfig({
  projectId: '2hmvki',
  e2e: {
    baseUrl: `http://localhost:${port}`,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))

      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        },
      })

      return config
    },
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/features/**/*.feature',
    ],
  },
})
