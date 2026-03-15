import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { admin } from '../api/admin'
import { useAuth } from '../hooks/useAuth'

const USER_STATUS = ['active', 'deactivated', 'restricted']

function Badge({ children, tone = 'neutral' }) {
  const toneClass = {
    success: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    danger: 'bg-rose-100 text-rose-700 border-rose-200',
    info: 'bg-sky-100 text-sky-700 border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClass[tone]}`}
    >
      {children}
    </span>
  )
}

function statusTone(status) {
  if (status === 'active') return 'success'
  if (status === 'restricted') return 'warning'
  if (status === 'deactivated') return 'danger'
  return 'neutral'
}

function StatCard({ label, value, subLabel }) {
  return (
    <div className="rounded-2xl border border-cyan-100 bg-white/85 p-5 shadow-sm backdrop-blur-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {subLabel ? <p className="mt-1 text-xs text-slate-500">{subLabel}</p> : null}
    </div>
  )
}

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return value
  }
}



Badge.propTypes = {
  children: PropTypes.node.isRequired,
  tone: PropTypes.oneOf(['success', 'warning', 'danger', 'info', 'neutral']),
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subLabel: PropTypes.string,
}
export default function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  const [stats, setStats] = useState(null)
  const [loadingStats, setLoadingStats] = useState(false)

  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetailsLoading, setUserDetailsLoading] = useState(false)
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false)

  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [postLoading, setPostLoading] = useState(false)
  const [deletingPostId, setDeletingPostId] = useState(null)

  const overviewCards = useMemo(() => {
    if (!stats) return []

    return [
      { label: 'Total Users', value: stats.total_users ?? '—' },
      { label: 'Active Users', value: stats.active_users ?? '—' },
      { label: 'Restricted Users', value: stats.restricted_users ?? '—' },
      { label: 'Deactivated Users', value: stats.deactivated_users ?? '—' },
      { label: 'Total Posts', value: stats.total_posts ?? '—' },
      { label: 'Removed Posts', value: stats.deleted_posts ?? stats.removed_posts ?? '—' },
    ]
  }, [stats])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const loadStats = async () => {
    setLoadingStats(true)
    try {
      const res = await admin.getStats()
      setStats(res.data)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load admin stats')
    } finally {
      setLoadingStats(false)
    }
  }

  const loadUsers = async (filter = statusFilter) => {
    setUsersLoading(true)
    try {
      const res = await admin.getUsers(filter === 'all' ? undefined : filter)
      const nextUsers = res.data.users || res.data.data || res.data || []
      setUsers(Array.isArray(nextUsers) ? nextUsers : [])
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load users')
    } finally {
      setUsersLoading(false)
    }
  }

  const loadPosts = async () => {
    setPostsLoading(true)
    try {
      const res = await admin.getPosts()
      const nextPosts = res.data.posts || res.data.data || res.data || []
      setPosts(Array.isArray(nextPosts) ? nextPosts : [])
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load posts')
    } finally {
      setPostsLoading(false)
    }
  }

  const handleFetchUser = async () => {
    if (!selectedUserId) {
      toast.error('Enter a user ID first')
      return
    }

    setUserDetailsLoading(true)
    setSelectedUser(null)
    try {
      const res = await admin.getUserById(Number(selectedUserId))
      setSelectedUser(res.data.user || res.data)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load user details')
    } finally {
      setUserDetailsLoading(false)
    }
  }

  const handleUpdateUserStatus = async (userId, status) => {
    setStatusUpdateLoading(true)
    try {
      await admin.updateUserStatus(userId, status)
      toast.success(`User #${userId} status updated to ${status}`)
      await Promise.all([loadUsers(), selectedUserId ? handleFetchUser() : Promise.resolve()])
      loadStats()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update user status')
    } finally {
      setStatusUpdateLoading(false)
    }
  }

  const handleFetchPost = async () => {
    if (!selectedPostId) {
      toast.error('Enter a post ID first')
      return
    }

    setPostLoading(true)
    setSelectedPost(null)
    try {
      const res = await admin.getPostById(Number(selectedPostId))
      setSelectedPost(res.data.post || res.data)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load post details')
    } finally {
      setPostLoading(false)
    }
  }

  const handleDeletePost = async (postId) => {
    if (!window.confirm(`Delete post #${postId}? This action cannot be undone.`)) return

    setDeletingPostId(postId)
    try {
      await admin.deletePost(postId)
      toast.success(`Post #${postId} deleted`)
      if (Number(selectedPostId) === Number(postId)) {
        setSelectedPost(null)
      }
      await loadPosts()
      loadStats()
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete post')
    } finally {
      setDeletingPostId(null)
    }
  }

  useEffect(() => {
    loadStats()
    loadUsers('all')
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-sky-50 to-white">
      <header className="sticky top-0 z-20 border-b border-cyan-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Whisper Control Center</p>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadStats}
              className="rounded-xl border border-cyan-200 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50"
            >
              Refresh Metrics
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {loadingStats ? (
            <div className="col-span-full rounded-2xl border border-cyan-100 bg-white p-6 text-center text-slate-500">
              Loading latest metrics...
            </div>
          ) : (
            overviewCards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
                subLabel={card.subLabel}
              />
            ))
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-cyan-100 bg-white/90 p-2 shadow-sm">
          {[
            ['overview', 'Overview'],
            ['users', 'Users'],
            ['posts', 'Posts'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow'
                  : 'text-slate-600 hover:bg-cyan-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <section className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Moderation at a glance</h2>
            <p className="mt-2 text-sm text-slate-600">
              Use the Users and Posts tabs to execute backend-supported moderation operations: list users,
              inspect user details, update user status, list posts, inspect post details, and delete posts.
            </p>
          </section>
        )}

        {activeTab === 'users' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Users Directory</h2>
                <button
                  onClick={() => loadUsers()}
                  className="rounded-lg border border-cyan-200 px-3 py-1.5 text-xs font-medium text-cyan-700 hover:bg-cyan-50"
                >
                  Refresh
                </button>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <label className="text-sm font-medium text-slate-600">Filter:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    loadUsers(e.target.value)
                  }}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  <option value="all">All</option>
                  {USER_STATUS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {usersLoading ? (
                  <p className="text-sm text-slate-500">Loading users...</p>
                ) : users.length === 0 ? (
                  <p className="text-sm text-slate-500">No users found for this filter.</p>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-900">#{user.id} · {user.email}</p>
                          <p className="text-xs text-slate-500">Role: {user.role || 'user'}</p>
                        </div>
                        <Badge tone={statusTone(user.status)}>{user.status || 'unknown'}</Badge>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {USER_STATUS.map((status) => (
                          <button
                            key={status}
                            disabled={statusUpdateLoading || user.status === status}
                            onClick={() => handleUpdateUserStatus(user.id, status)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Set {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">User Inspector</h2>
              <p className="mt-1 text-sm text-slate-500">Fetch a specific user via <code>/admin/users/{'{userId}'}</code>.</p>

              <div className="mt-4 flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  placeholder="User ID"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm"
                />
                <button
                  onClick={handleFetchUser}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  {userDetailsLoading ? 'Loading...' : 'Inspect'}
                </button>
              </div>

              {selectedUser && (
                <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 p-4 text-sm">
                  <p><strong>ID:</strong> {selectedUser.id}</p>
                  <p><strong>Email:</strong> {selectedUser.email || '—'}</p>
                  <p><strong>Role:</strong> {selectedUser.role || 'user'}</p>
                  <p>
                    <strong>Status:</strong> <Badge tone={statusTone(selectedUser.status)}>{selectedUser.status}</Badge>
                  </p>
                  <p><strong>Created:</strong> {formatDate(selectedUser.created_at)}</p>
                  <p><strong>Updated:</strong> {formatDate(selectedUser.updated_at)}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'posts' && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Posts Directory</h2>
                <button
                  onClick={loadPosts}
                  className="rounded-lg border border-cyan-200 px-3 py-1.5 text-xs font-medium text-cyan-700 hover:bg-cyan-50"
                >
                  Refresh
                </button>
              </div>

              <div className="max-h-[470px] space-y-3 overflow-y-auto pr-1">
                {postsLoading ? (
                  <p className="text-sm text-slate-500">Loading posts...</p>
                ) : posts.length === 0 ? (
                  <p className="text-sm text-slate-500">No posts found.</p>
                ) : (
                  posts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-900">Post #{post.id}</p>
                          <p className="text-xs text-slate-500">Author #{post.author_id}</p>
                        </div>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          disabled={deletingPostId === post.id}
                          className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                        >
                          {deletingPostId === post.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm text-slate-700">{post.content}</p>
                      <p className="mt-2 text-xs text-slate-500">{formatDate(post.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Post Inspector</h2>
              <p className="mt-1 text-sm text-slate-500">Fetch a single post via <code>/admin/posts/{'{postId}'}</code>.</p>

              <div className="mt-4 flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={selectedPostId}
                  onChange={(e) => setSelectedPostId(e.target.value)}
                  placeholder="Post ID"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm"
                />
                <button
                  onClick={handleFetchPost}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  {postLoading ? 'Loading...' : 'Inspect'}
                </button>
              </div>

              {selectedPost && (
                <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 p-4 text-sm">
                  <p><strong>ID:</strong> {selectedPost.id}</p>
                  <p><strong>Author:</strong> #{selectedPost.author_id}</p>
                  <p><strong>Created:</strong> {formatDate(selectedPost.created_at)}</p>
                  <p className="rounded-xl bg-slate-50 p-3 text-slate-700">{selectedPost.content}</p>
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    disabled={deletingPostId === selectedPost.id}
                    className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                  >
                    {deletingPostId === selectedPost.id ? 'Deleting...' : 'Delete this post'}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}