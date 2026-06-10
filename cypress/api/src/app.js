import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { authRoutes } from './routes/auth.routes.js'
import { formRoutes } from './routes/forms.routes.js'
import { passwordRoutes } from './routes/password.routes.js'
import { userRoutes } from './routes/users.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

export const app = express()

app.use(cors({ origin: env.webUrl }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'QA Automation Lab API' })
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' })
})

app.use('/api/auth', authRoutes)
app.use('/api/forms', formRoutes)
app.use('/api/password', passwordRoutes)
app.use('/api/users', userRoutes)
app.use(errorMiddleware)
