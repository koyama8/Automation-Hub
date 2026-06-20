import { Router } from 'express'
import * as systemController from '../controllers/system.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const systemRouter = Router()

systemRouter.use(requireAuthentication, requireAdministrator)
systemRouter.delete('/reset', systemController.reset)
