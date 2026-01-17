import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { sign } from 'hono/jwt'

const auth = new Hono()
const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || 'supersecret'

auth.post('/login', async (c) => {
    const { email, password } = await c.req.json()

    const user = await prisma.user.findUnique({
        where: { email }
    })

    // In real app, compare hashed password!
    if (!user || user.password !== password) {
        return c.json({ error: 'Invalid credentials' }, 401)
    }

    const payload = {
        sub: user.id,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
    }

    const token = await sign(payload, SECRET_KEY)
    return c.json({ token })
})

export default auth
