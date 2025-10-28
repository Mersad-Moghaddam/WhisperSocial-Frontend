import { createClient } from './client'

const followBase = import.meta.env.DEV ? '/api/follow' : import.meta.env.VITE_FOLLOW_URL || 'http://127.0.0.1:8082'
const client = createClient(followBase)

export async function follow(user_id) {
  const res = await client.post('/follow', { user_id })
  return res.data
}

export async function unfollow(user_id) {
  const res = await client.post('/unfollow', { user_id })
  return res.data
}

export async function getStats(userId) {
  const res = await client.get(`/stats/${userId}`)
  return res.data
}

export async function getFeed(limit = 20) {
  const res = await client.get(`/feed`, { params: { limit } })
  return res.data
}

export async function isFollowing(userId) {
  const res = await client.get(`/is-following/${userId}`)
  return res.data
}

export async function getFollowers(userId) {
  const res = await client.get(`/followers/${userId}`)
  return res.data
}

export async function getFollowing(userId) {
  const res = await client.get(`/following/${userId}`)
  return res.data
}
