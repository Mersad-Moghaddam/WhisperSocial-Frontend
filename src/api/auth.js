import { createClient } from './client'

// Use proxied path in dev: Vite will forward /api/auth to the auth service.
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

/** Get public profile by user ID. Throws with response.status 404 if user does not exist. */
export async function getUserProfile(userId) {
  const res = await client.get(`/users/${userId}`)
  return res.data
}

/** Update own profile (name, username). Requires auth. */
export async function updateProfile({ name, username }) {
  const res = await client.put('/profile', { name, username })
  return res.data
}
