import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT) || 3030,
  webUrl: process.env.WEB_URL || 'http://localhost:3000',
  adminEmail: process.env.ADMIN_EMAIL || 'qa@adminlab.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'pwd123',
  jwtSecret: process.env.JWT_SECRET || 'qa-automation-lab-local-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  resetTokenMinutes: Number(process.env.RESET_TOKEN_MINUTES) || 15,
}
