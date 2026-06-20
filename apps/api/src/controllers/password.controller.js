import * as passwordService from '../services/password.service.js'

export async function forgot(req, res) {
  const data = await passwordService.requestPasswordReset(req.body)
  return res.status(200).json({ message: 'Password reset token generated', data })
}

export async function reset(req, res) {
  const data = await passwordService.resetPassword(req.body)
  return res.status(200).json({ message: 'Password reset successfully', data })
}
