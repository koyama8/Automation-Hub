import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../apps/api/generated/prisma/client.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

const adminEmail = process.env.ADMIN_EMAIL || 'alab@hotmail.com'
const adminPassword = process.env.ADMIN_PASSWORD || '123'

await prisma.user.upsert({
  where: { email: adminEmail },
  update: {
    name: 'QA Admin',
    password: adminPassword,
    role: 'admin',
    active: true,
  },
  create: {
    name: 'QA Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
    active: true,
  },
})

console.log(`Local admin ready: ${adminEmail}`)

await prisma.$disconnect()
