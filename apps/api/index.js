import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { prisma } from './lib/prisma.js'

const app = express()
const port = Number(process.env.PORT) || 3030

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }

  return next()
})

function isBlank(value) {
  return typeof value !== 'string' || value.trim() === ''
}

function buildUserPayload(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'API Cypress' })
})

app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {}

    if (isBlank(name)) {
      return res.status(400).json({ error: 'Name is required!' })
    }

    if (isBlank(email)) {
      return res.status(400).json({ error: 'Email is required!' })
    }

    if (isBlank(password)) {
      return res.status(400).json({ error: 'Password is required!' })
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      },
    })

    return res.status(201).json({
      message: 'User created successfully',
      data: buildUserPayload(user),
    })
  } catch (error) {
    console.error(error)

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists!' })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        id: 'asc',
      },
    })

    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.put('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, email, password } = req.body ?? {}

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid user id!' })
    }

    if (isBlank(name)) {
      return res.status(400).json({ error: 'Name is required!' })
    }

    if (isBlank(email)) {
      return res.status(400).json({ error: 'Email is required!' })
    }

    if (isBlank(password)) {
      return res.status(400).json({ error: 'Password is required!' })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      },
    })

    return res.status(200).json({
      message: 'User updated successfully',
      data: buildUserPayload(updatedUser),
    })
  } catch (error) {
    console.error(error)

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found!' })
    }

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists!' })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.delete('/api/users', async (req, res) => {
  try {
    const usersCount = await prisma.user.count()

    await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE')

    return res.status(200).json({
      message: 'Users deleted successfully',
      deleted: usersCount,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`QA Automation Lab API running on port ${port}`)
})
