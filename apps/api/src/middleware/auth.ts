import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'

const SECRET_KEY = process.env.JWT_SECRET || 'supersecret'

export const authMiddleware = createMiddleware(async (c, next) => {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
        return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = await verify(token, SECRET_KEY)
        c.set('jwtPayload', payload)
        await next()
    } catch (e) {
        return c.json({ error: 'Invalid token' }, 401)
    }
})

export const adminMiddleware = createMiddleware(async (c, next) => {
    const payload = c.get('jwtPayload')
    if (payload.role !== 'ADMIN') {
        return c.json({ error: 'Forbidden: Admin access only' }, 403)
    }
    await next()
})
