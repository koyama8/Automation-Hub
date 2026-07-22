import { Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { authRouter } from './auth.routes.js'
import { cartsRouter } from './carts.routes.js'
import { clientsRouter } from './clients.routes.js'
import { contractsRouter } from './contracts.routes.js'
import { couponsRouter } from './coupons.routes.js'
import { evidencesRouter } from './evidences.routes.js'
import { ordersRouter } from './orders.routes.js'
import { passwordRouter } from './password.routes.js'
import { paymentsRouter } from './payments.routes.js'
import { productsRouter } from './products.routes.js'
import { reportsRouter } from './reports.routes.js'
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
routes.use('/api/cart', cartsRouter)
routes.use('/api/clients', clientsRouter)
routes.use('/api/contracts', contractsRouter)
routes.use('/api/coupons', couponsRouter)
routes.use('/api/evidences', evidencesRouter)
routes.use('/api/orders', ordersRouter)
routes.use('/api/password', passwordRouter)
routes.use('/api/payments', paymentsRouter)
routes.use('/api/products', productsRouter)
routes.use('/api/reports', reportsRouter)
routes.use('/api/system', systemRouter)
routes.use('/api/users', usersRouter)
