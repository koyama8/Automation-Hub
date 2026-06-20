import { prisma } from '../../apps/api/lib/prisma.js'
import { hashPassword } from '../../apps/api/src/utils/password.js'

const adminEmail = process.env.ADMIN_EMAIL || 'qa@adminlab.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'pwd123'

try {
  const passwordHash = await hashPassword(adminPassword)
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'QA Admin',
      password: passwordHash,
      role: 'admin',
      active: true,
    },
    create: {
      name: 'QA Admin',
      email: adminEmail,
      password: passwordHash,
      role: 'admin',
      active: true,
    },
  })

  console.log(`Local admin ready: ${admin.email}`)
} finally {
  await prisma.$disconnect()
}
