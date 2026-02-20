import axios from 'axios'

const adminBase = import.meta.env.DEV ? '/api/admin' : import.meta.env.VITE_ADMIN_URL || 'http://127.0.0.1:8086'

const client = axios.create({
  baseURL: adminBase,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const admin = {
  // Post Management
  removePost: (postId, reason) =>
    client.post('/admin/posts/remove', { post_id: postId, reason }),

  getAllPosts: (limit = 50, offset = 0, onlyRemoved = false) =>
    client.get('/admin/posts', { params: { limit, offset, only_removed: onlyRemoved } }),

  getUserPosts: (userId, limit = 50, offset = 0) =>
    client.get(`/admin/posts/user/${userId}`, { params: { limit, offset } }),

  // Posting Restrictions
  restrictUserPosting: (userId, durationMinutes, reason) =>
    client.post('/admin/restrictions/posting', {
      user_id: userId,
      duration_minutes: durationMinutes,
      reason,
    }),

  removePostRestriction: (userId) =>
    client.delete(`/admin/restrictions/posting/${userId}`),

  // Account Management
  deactivateUser: (userId, reason) =>
    client.post('/admin/users/deactivate', { user_id: userId, reason }),

  reactivateUser: (userId) =>
    client.post('/admin/users/reactivate', { user_id: userId }),

  // User Details
  getUserDetails: (userId) =>
    client.get(`/admin/users/${userId}`),
}

export default client
