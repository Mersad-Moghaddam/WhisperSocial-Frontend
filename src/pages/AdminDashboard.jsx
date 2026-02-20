import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { admin } from '../api/admin'
import Button from '../components/Button'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Posts Management
            </button>
            <button
              onClick={() => setActiveTab('restrictions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'restrictions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Restrictions
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'accounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Account Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Details
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'posts' && <PostsManagement loading={loading} setLoading={setLoading} />}
        {activeTab === 'restrictions' && <UserRestrictions loading={loading} setLoading={setLoading} />}
        {activeTab === 'accounts' && <AccountManagement loading={loading} setLoading={setLoading} />}
        {activeTab === 'users' && <UserDetails loading={loading} setLoading={setLoading} />}
      </div>
    </div>
  )
}

// Posts Management Component
function PostsManagement({ loading, setLoading }) {
  const [posts, setPosts] = useState([])
  const [limit, setLimit] = useState(50)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [onlyRemoved, setOnlyRemoved] = useState(false)
  const [removing, setRemoving] = useState(null)
  const [removeReason, setRemoveReason] = useState('')

  const loadPosts = async () => {
    setLoading(true)
    try {
      const res = await admin.getAllPosts(limit, offset, onlyRemoved)
      setPosts(res.data.posts)
      setTotal(res.data.total)
    } catch (error) {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleRemovePost = async (postId) => {
    if (!removeReason.trim()) {
      toast.error('Please provide a reason for removal')
      return
    }
    try {
      await admin.removePost(postId, removeReason)
      toast.success('Post removed successfully')
      setRemoving(null)
      setRemoveReason('')
      loadPosts()
    } catch (error) {
      toast.error('Failed to remove post')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Posts Management</h2>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={onlyRemoved}
              onChange={(e) => setOnlyRemoved(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Show only removed posts</span>
          </label>
          <Button onClick={loadPosts} disabled={loading}>
            {loading ? 'Loading...' : 'Load Posts'}
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-500">Post #{post.id} by User #{post.author_id}</p>
                  <p className="text-gray-900 mt-2">{post.content}</p>
                </div>
                {post.removed && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded">
                    Removed
                  </span>
                )}
              </div>
              {post.removal_reason && (
                <p className="text-sm text-gray-600 mb-2">Reason: {post.removal_reason}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(post.created_at).toLocaleString()}
              </p>
              {!post.removed && (
                <>
                  {removing === post.id ? (
                    <div className="mt-4 space-y-2">
                      <textarea
                        value={removeReason}
                        onChange={(e) => setRemoveReason(e.target.value)}
                        placeholder="Reason for removal"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleRemovePost(post.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Confirm Remove
                        </Button>
                        <button
                          onClick={() => {
                            setRemoving(null)
                            setRemoveReason('')
                          }}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRemoving(post.id)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Remove Post
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-8">No posts found</p>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {offset + 1} to {Math.min(offset + limit, total)} of {total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= total}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// User Restrictions Component
function UserRestrictions({ loading, setLoading }) {
  const [userId, setUserId] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [reason, setReason] = useState('')

  const handleRestrict = async () => {
    if (!userId || !reason.trim()) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await admin.restrictUserPosting(parseInt(userId), durationMinutes, reason)
      toast.success('User posting restricted successfully')
      setUserId('')
      setDurationMinutes(60)
      setReason('')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to restrict user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Restrict User from Posting</h2>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for restriction"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        <Button onClick={handleRestrict} disabled={loading} className="w-full">
          {loading ? 'Restricting...' : 'Restrict User'}
        </Button>
      </div>
    </div>
  )
}

// Account Management Component
function AccountManagement({ loading, setLoading }) {
  const [userId, setUserId] = useState('')
  const [reason, setReason] = useState('')
  const [action, setAction] = useState('deactivate')

  const handleAction = async () => {
    if (!userId || (action === 'deactivate' && !reason.trim())) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      if (action === 'deactivate') {
        await admin.deactivateUser(parseInt(userId), reason)
        toast.success('User account deactivated successfully')
      } else {
        await admin.reactivateUser(parseInt(userId))
        toast.success('User account reactivated successfully')
      }
      setUserId('')
      setReason('')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to perform action')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Account Management</h2>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Action
          </label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="deactivate">Deactivate Account</option>
            <option value="reactivate">Reactivate Account</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {action === 'deactivate' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for deactivation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
        )}
        <Button onClick={handleAction} disabled={loading} className="w-full">
          {loading ? 'Processing...' : 'Perform Action'}
        </Button>
      </div>
    </div>
  )
}

// User Details Component
function UserDetails({ loading, setLoading }) {
  const [userId, setUserId] = useState('')
  const [userDetails, setUserDetails] = useState(null)

  const handleGetDetails = async () => {
    if (!userId) {
      toast.error('Please enter a user ID')
      return
    }
    setUserDetails(null)
    setLoading(true)
    try {
      const res = await admin.getUserDetails(parseInt(userId))
      setUserDetails(res.data.user)
    } catch (error) {
      setUserDetails(null)
      toast.error(error.response?.data?.error || 'Failed to load user details')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">User Details</h2>
        <div className="flex gap-2 mb-6 max-w-md">
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleGetDetails} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {userDetails && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">ID</p>
              <p className="text-lg font-semibold text-gray-900">{userDetails.id}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-900">{userDetails.email}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{userDetails.role}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">Account Status</p>
              <p className={`text-lg font-semibold ${
                userDetails.is_active ? 'text-green-600' : 'text-red-600'
              }`}>
                {userDetails.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">Posts Count</p>
              <p className="text-lg font-semibold text-gray-900">{userDetails.post_count}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-500">Posting Restricted Until</p>
              <p className="text-lg font-semibold text-gray-900">
                {userDetails.restricted_until 
                  ? new Date(userDetails.restricted_until).toLocaleString()
                  : 'No restriction'}
              </p>
            </div>
            {userDetails.is_deactivated && (
              <>
                <div className="border-l-4 border-red-500 pl-4 col-span-2">
                  <p className="text-sm text-gray-500">Deactivated At</p>
                  <p className="text-lg font-semibold text-red-600">
                    {new Date(userDetails.deactivated_at).toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {userId && !userDetails && !loading && (
          <p className="text-center text-gray-500 py-8">No user found</p>
        )}
      </div>
    </div>
  )
}
