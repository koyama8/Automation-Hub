import { authenticate } from '../services/users.service.js'
import { failure, success } from '../utils/response.js'

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || email.trim() === '') return failure(res, 400, 'Email is required')
    if (!password || password.trim() === '') return failure(res, 400, 'Password is required')

    const user = await authenticate(email, password)
    if (!user) return failure(res, 401, 'Invalid credentials')

    return success(res, 200, 'Login successfully', user)
  } catch (error) {
    return next(error)
  }
}

export function me(req, res) {
  return success(res, 200, 'Authenticated user', {
    id: 1,
    name: 'QA Admin',
    email: 'alab@hotmail.com',
    role: 'admin',
  })
}
