import { Router } from 'express'
import * as systemController from '../controllers/system.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const systemRouter = Router()

systemRouter.use(requireAuthentication, requirePermission('system:reset'))
systemRouter.delete('/reset', systemController.reset)
