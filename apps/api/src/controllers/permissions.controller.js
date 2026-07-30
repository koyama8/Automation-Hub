import * as permissionsService from '../services/permissions.service.js'

export function catalog(req, res) {
  return res.status(200).json({ data: permissionsService.getPermissionCatalog() })
}

export async function profiles(req, res) {
  return res.status(200).json({ data: await permissionsService.getProfiles() })
}

export async function profile(req, res) {
  return res.status(200).json({ data: await permissionsService.getProfile(req.params.profile) })
}

export async function updateProfile(req, res) {
  const data = await permissionsService.editProfilePermissions(req.params.profile, req.body, req.auth)
  return res.status(200).json({ message: 'Profile permissions updated successfully', data })
}

export async function users(req, res) {
  return res.status(200).json(await permissionsService.getManagedUsers(req.query))
}

export async function user(req, res) {
  return res.status(200).json({ data: await permissionsService.getManagedUser(req.params.id) })
}

export async function createUser(req, res) {
  const result = await permissionsService.createManagedUser(
    req.body,
    req.auth,
    req.get('Idempotency-Key'),
  )
  return res.status(result.idempotentReplay ? 200 : 201).json({
    message: result.idempotentReplay
      ? 'User creation replayed successfully'
      : 'Managed user created successfully',
    ...result,
  })
}

export async function updateUserProfile(req, res) {
  const data = await permissionsService.changeManagedUserProfile(
    req.params.id,
    req.body,
    req.auth,
    req.get('If-Match'),
  )
  return res.status(200).json({ message: 'User profile updated successfully', data })
}

export async function updateUserAccess(req, res) {
  const data = await permissionsService.changeManagedUserAccess(
    req.params.id,
    req.body,
    req.auth,
    req.get('If-Match'),
  )
  return res.status(200).json({ message: 'User access updated successfully', data })
}

export async function deleteUser(req, res) {
  const data = await permissionsService.deleteManagedUser(
    req.params.id,
    req.body,
    req.auth,
    req.get('If-Match'),
  )
  return res.status(200).json({ message: 'Managed user deleted successfully', data })
}

export async function deleteUsers(req, res) {
  const data = await permissionsService.deleteAllManagedUsers(req.body, req.auth)
  return res.status(200).json({
    message: 'Managed users deleted successfully',
    data,
  })
}

export async function effectivePermissions(req, res) {
  return res
    .status(200)
    .json({ data: await permissionsService.getEffectivePermissions(req.params.id) })
}

export async function revokeSessions(req, res) {
  const data = await permissionsService.revokeManagedUserSessions(req.params.id, req.body, req.auth)
  return res.status(200).json({ message: 'User sessions revoked successfully', data })
}

export async function audit(req, res) {
  return res.status(200).json(await permissionsService.getAudit(req.query))
}

export async function auditEvent(req, res) {
  return res.status(200).json({ data: await permissionsService.getAuditEvent(req.params.id) })
}

export async function clearAudit(req, res) {
  const data = await permissionsService.clearAudit(req.body)
  return res.status(200).json({
    message: 'Audit records cleared successfully',
    data,
  })
}

export async function acceptInvitation(req, res) {
  const data = await permissionsService.acceptInvitation(req.params.token, req.body)
  return res.status(200).json({ message: 'Invitation accepted successfully', data })
}

export async function resendInvitation(req, res) {
  const data = await permissionsService.resendInvitation(req.params.id, req.body, req.auth)
  return res.status(200).json({ message: 'Invitation resent successfully', data })
}
