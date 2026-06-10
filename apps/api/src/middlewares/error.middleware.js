import { failure } from '../utils/response.js'

export function errorMiddleware(error, req, res, next) {
  console.error(error)

  if (error.code === 'P2002') {
    return failure(res, 409, 'Email already exists')
  }

  if (error.code === 'P2025') {
    return failure(res, 404, 'User not found')
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return failure(res, 400, 'Invalid JSON format')
  }

  return failure(res, 500, 'Internal server error')
}
