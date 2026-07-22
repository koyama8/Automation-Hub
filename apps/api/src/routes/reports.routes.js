import { Router } from 'express'
import * as reportsController from '../controllers/reports.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const reportsRouter = Router()

reportsRouter.use(requireAuthentication)
reportsRouter.get('/summary', reportsController.summary)
reportsRouter.get('/:type/export', reportsController.exportCsv)
reportsRouter.get('/:type', reportsController.index)
