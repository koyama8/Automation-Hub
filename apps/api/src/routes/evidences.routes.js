import { Router } from 'express'
import * as evidencesController from '../controllers/evidences.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const evidencesRouter = Router()

evidencesRouter.use(requireAuthentication)
evidencesRouter.post('/', requirePermission('evidences:write'), evidencesController.create)
evidencesRouter.get('/', requirePermission('evidences:read'), evidencesController.index)
evidencesRouter.get('/:id/download', requirePermission('evidences:read'), evidencesController.download)
evidencesRouter.get('/:id', requirePermission('evidences:read'), evidencesController.show)
evidencesRouter.delete('/:id', requirePermission('evidences:delete'), evidencesController.destroy)
evidencesRouter.delete('/', requirePermission('system:reset'), evidencesController.clear)
