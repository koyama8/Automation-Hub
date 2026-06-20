import bcrypt from 'bcryptjs'

const HASH_ROUNDS = 10

export function hashPassword(password) {
  return bcrypt.hash(password, HASH_ROUNDS)
}

export function isPasswordHash(password) {
  return /^\$2[aby]\$/.test(password)
}

export async function verifyPassword(password, storedPassword) {
  if (!isPasswordHash(storedPassword)) {
    return password === storedPassword
  }

  return bcrypt.compare(password, storedPassword)
}
