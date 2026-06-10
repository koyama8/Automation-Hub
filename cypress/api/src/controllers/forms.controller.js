import { prisma } from '../lib/prisma.js'
import { failure, success } from '../utils/response.js'

export async function createContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body

    if (!name || name.trim() === '') return failure(res, 400, 'Name is required')
    if (!email || email.trim() === '') return failure(res, 400, 'Email is required')
    if (!subject || subject.trim() === '') return failure(res, 400, 'Subject is required')
    if (!message || message.trim() === '') return failure(res, 400, 'Message is required')

    const form = await prisma.formSubmission.create({
      data: {
        type: 'contact',
        payload: { name, email, subject, message },
      },
    })

    return success(res, 201, 'Form submitted successfully', form)
  } catch (error) {
    return next(error)
  }
}
