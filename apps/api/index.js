import { app } from './src/app.js'
import { env } from './src/config/env.js'

app.listen(env.port, () => {
  console.log(`QA Automation Lab API running on port ${env.port}`)
})
