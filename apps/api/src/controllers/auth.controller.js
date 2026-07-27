import * as authService from '../services/auth.service.js'

export async function login(req, res) {
  const data = await authService.authenticate(req.body)
  return res.status(200).json({ message: 'Login successful', data })
}

export async function me(req, res) {
  const user = await authService.getAuthenticatedUser(req.auth.userId)
  return res.status(200).json({ data: user })
}

export async function refresh(req, res) {
  const data = await authService.refreshAuthentication(req.body)
  return res.status(200).json({ message: 'Authentication renewed successfully', data })
}

export async function logout(req, res) {
  await authService.logout(req.auth.sessionId)
  return res.status(204).send()
}
