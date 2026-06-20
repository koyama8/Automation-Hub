import { AppError } from './app-error.js'

export function requireText(value, message) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AppError(400, message)
  }

  return value.trim()
}

export function requireEmail(value) {
  const email = requireText(value, 'Email is required!').toLowerCase()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, 'Invalid email format!')
  }

  return email
}

export function requirePassword(value, fieldName = 'Password') {
  const password = requireText(value, `${fieldName} is required!`)

  if (password.length < 6) {
    throw new AppError(400, `${fieldName} must contain at least 6 characters!`)
  }

  return password
}

export function parsePositiveId(value, message = 'Invalid id!') {
  const id = Number(value)

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(400, message)
  }

  return id
}

export function parseBoolean(value, message = 'Invalid boolean value!') {
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  throw new AppError(400, message)
}
