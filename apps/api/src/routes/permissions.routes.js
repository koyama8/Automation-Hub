import { Router } from 'express'
import * as permissionsController from '../controllers/permissions.controller.js'
import {
  requireAdministrator,
  requireAuthentication,
} from '../middlewares/authentication.js'

export const permissionsRouter = Router()

permissionsRouter.post('/invitations/:token/accept', permissionsController.acceptInvitation)
permissionsRouter.use(requireAuthentication, requireAdministrator)
permissionsRouter.get('/catalog', permissionsController.catalog)
permissionsRouter.get('/profiles', permissionsController.profiles)
permissionsRouter.get('/profiles/:profile', permissionsController.profile)
permissionsRouter.put('/profiles/:profile', permissionsController.updateProfile)
permissionsRouter.get('/audit', permissionsController.audit)
permissionsRouter.get('/audit/:id', permissionsController.auditEvent)
permissionsRouter.get('/users', permissionsController.users)
permissionsRouter.post('/users', permissionsController.createUser)
permissionsRouter.get('/users/:id', permissionsController.user)
permissionsRouter.patch('/users/:id/profile', permissionsController.updateUserProfile)
permissionsRouter.patch('/users/:id/access', permissionsController.updateUserAccess)
permissionsRouter.delete('/users/:id', permissionsController.deleteUser)
permissionsRouter.get('/users/:id/effective-permissions', permissionsController.effectivePermissions)
permissionsRouter.post('/users/:id/revoke-sessions', permissionsController.revokeSessions)
permissionsRouter.post('/users/:id/invitation/resend', permissionsController.resendInvitation)
