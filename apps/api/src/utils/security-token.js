import { createHash, randomBytes, randomUUID } from 'node:crypto'

export function createOpaqueToken(bytes = 32) {
  return randomBytes(bytes).toString('hex')
}

export function createSessionId() {
  return randomUUID()
}

export function hashSecurityToken(value) {
  return createHash('sha256').update(String(value)).digest('hex')
}

export function hashPayload(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}
