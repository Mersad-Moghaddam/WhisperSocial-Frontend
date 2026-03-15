import { createClient } from './client'

const adminBase = import.meta.env.DEV
  ? '/api/admin'
  : import.meta.env.VITE_ADMIN_URL || 'http://127.0.0.1:8086'

const client = createClient(adminBase)

export const admin = {
  getStats: () => client.get('/admin/stats'),

  getUsers: (status) =>
    client.get('/admin/users', {
      params: status ? { status } : undefined,
    }),

  getUserById: (userId) => client.get(`/admin/users/${userId}`),

  updateUserStatus: (userId, status) =>
    client.patch(`/admin/users/${userId}`, { status }),

  getPosts: () => client.get('/admin/posts'),

  getPostById: (postId) => client.get(`/admin/posts/${postId}`),

  deletePost: (postId) => client.delete(`/admin/posts/${postId}`),
}

export default client
