import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { authRouter } from './auth.routes.js'
import { clientsRouter } from './clients.routes.js'
import { contractsRouter } from './contracts.routes.js'
import { passwordRouter } from './password.routes.js'
import { systemRouter } from './system.routes.js'
import { usersRouter } from './users.routes.js'

export const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'API Cypress' })
})

routes.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    return res.status(200).json({
      status: 'ok',
      service: 'qa-automation-lab-api',
      api: 'online',
      database: 'connected',
    })
  } catch (error) {
    return res.status(503).json({
      status: 'unavailable',
      service: 'qa-automation-lab-api',
      api: 'online',
      database: 'unavailable',
    })
  }
})

routes.use('/api/auth', authRouter)
routes.use('/api/clients', clientsRouter)
routes.use('/api/contracts', contractsRouter)
routes.use('/api/password', passwordRouter)
routes.use('/api/system', systemRouter)
routes.use('/api/users', usersRouter)
