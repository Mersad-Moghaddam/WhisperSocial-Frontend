import { createClient } from './client'

// Use proxied path in dev: Vite will forward /api/auth to the auth service.
// in dev we use the Vite proxy path; in prod use VITE_AUTH_URL or documented default
const authBase = import.meta.env.DEV ? '/api/auth' : import.meta.env.VITE_AUTH_URL || 'http://127.0.0.1:8080'
const client = createClient(authBase)

export async function login(email, password) {
  const res = await client.post('/login', { email, password })
  return res.data
}

export async function register(email, password) {
  const res = await client.post('/register', { email, password })
  return res.data
}
