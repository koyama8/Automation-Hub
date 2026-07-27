import { Router } from 'express'
import * as reportsController from '../controllers/reports.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const reportsRouter = Router()

reportsRouter.use(requireAuthentication)
reportsRouter.get('/summary', requirePermission('reports:read'), reportsController.summary)
reportsRouter.get('/:type/export', requirePermission('reports:export'), reportsController.exportCsv)
reportsRouter.get('/:type', requirePermission('reports:read'), reportsController.index)
