import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT || 3030),
  webUrl: process.env.WEB_URL || 'http://localhost:3000',
  adminEmail: process.env.ADMIN_EMAIL || 'alab@hotmail.com',
  adminPassword: process.env.ADMIN_PASSWORD || '123',
}
