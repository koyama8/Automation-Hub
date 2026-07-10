import 'dotenv/config'
import { defineConfig } from 'cypress'
import { deleteUserByEmail } from './cypress/support/database.js'

const port = process.env.PORT || 3030

export default defineConfig({
  projectId: '2hmvki',
  e2e: {
    baseUrl: `http://localhost:${port}`,
    setupNodeEvents(on, config) {
      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        },
      })

      return config
    },
  },
})
