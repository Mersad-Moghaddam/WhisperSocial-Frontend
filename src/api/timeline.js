import { createClient } from './client'

const timelineBase = import.meta.env.DEV ? '/api/timeline' : import.meta.env.VITE_TIMELINE_URL || 'http://127.0.0.1:8085'
const client = createClient(timelineBase)

export async function getTimeline({ cursor = 0, limit = 10 } = {}) {
  const res = await client.get('/timeline', { params: { cursor, limit } })
  return res.data
}
