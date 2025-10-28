import { createClient } from './client'

const postBase = import.meta.env.DEV ? '/api/posts' : import.meta.env.VITE_POST_URL || 'http://127.0.0.1:8084'
const client = createClient(postBase)

export async function createPost(content) {
  const res = await client.post('/posts', { content })
  return res.data
}
