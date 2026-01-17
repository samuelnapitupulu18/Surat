import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { PrismaClient } from '@prisma/client'
import auth from './routes/auth'
import { authMiddleware, adminMiddleware } from './middleware/auth'

const app = new Hono()
const prisma = new PrismaClient()

// Public routes (API)
app.get('/api/health', (c) => c.json({ status: 'ok' }))
app.route('/auth', auth)

// Protected Admin Route Example
app.get('/admin/dashboard', authMiddleware, adminMiddleware, (c) => {
  return c.json({ message: 'Welcome to Admin Dashboard' })
})

// File Upload Route
app.post('/upload', authMiddleware, async (c) => {
  const body = await c.req.parseBody()
  const file = body['file'] // File is File | string

  if (file && file instanceof File) {
    const fileName = `${Date.now()}-${file.name}`
    const path = `uploads/${fileName}`

    await Bun.write(path, file)

    return c.json({
      message: 'Upload successful',
      url: `/uploads/${fileName}`
    })
  }

  return c.json({ error: 'No file uploaded' }, 400)
})

// Serve uploaded files statically
app.use('/uploads/*', serveStatic({ root: './' }))

// Serve Frontend Static Files (Assets)
app.use('/*', serveStatic({
  root: '../web/dist',
}))

// SPA Fallback: Serve index.html for all other routes
app.get('*', serveStatic({
  path: '../web/dist/index.html',
}))



const port = parseInt(process.env.PORT || "3000");

export default {
  port,
  fetch: app.fetch,
}

