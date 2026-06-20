import { env } from '../config/env.js'
import * as systemRepository from '../repositories/system.repository.js'
import { hashPassword } from '../utils/password.js'

export async function resetLab() {
  const password = await hashPassword(env.adminPassword)

  return systemRepository.resetLabData({
    name: 'QA Admin',
    email: env.adminEmail.toLowerCase(),
    password,
    role: 'admin',
    active: true,
  })
}
