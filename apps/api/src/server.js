import { app } from './app.js'
import { env } from './config/env.js'

app.listen(env.port, () => {
  console.log(`QA Automation Lab API running on port ${env.port}`)
})
