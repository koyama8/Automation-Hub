import { Router } from 'express'
import * as evidencesController from '../controllers/evidences.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const evidencesRouter = Router()

evidencesRouter.use(requireAuthentication)
evidencesRouter.post('/', evidencesController.create)
evidencesRouter.get('/', evidencesController.index)
evidencesRouter.get('/:id/download', evidencesController.download)
evidencesRouter.get('/:id', evidencesController.show)
evidencesRouter.delete('/:id', evidencesController.destroy)
evidencesRouter.delete('/', requireAdministrator, evidencesController.clear)
