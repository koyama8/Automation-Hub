import crypto from 'node:crypto'
import { prisma } from '../lib/prisma.js'
import { failure, success } from '../utils/response.js'

export async function forgot(req, res, next) {
  try {
    const { email } = req.body
    if (!email || email.trim() === '') return failure(res, 400, 'Email is required')

    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } })
    if (!user) return failure(res, 404, 'User not found')

    const token = crypto.randomBytes(12).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30)

    await prisma.passwordResetToken.create({
      data: { token, expiresAt, userId: user.id },
    })

    return success(res, 200, 'Password reset token created', { token })
  } catch (error) {
    return next(error)
  }
}

export async function reset(req, res, next) {
  try {
    const { token, password } = req.body

    if (!token || token.trim() === '') return failure(res, 400, 'Token is required')
    if (!password || password.trim() === '') return failure(res, 400, 'Password is required')

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })
    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return failure(res, 400, 'Invalid or expired token')
    }

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: password.trim() },
    })

    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true },
    })

    return success(res, 200, 'Password updated successfully')
  } catch (error) {
    return next(error)
  }
}
