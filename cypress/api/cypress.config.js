import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3030',
    viewportWidth: 1000,
    viewportHeight: 660,
    video: true,
    setupNodeEvents(on, config) {
      return config
    },
  },
})
