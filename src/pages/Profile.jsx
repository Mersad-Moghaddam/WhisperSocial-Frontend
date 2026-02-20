import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStats, follow, unfollow, isFollowing } from '../api/follow';
import { getUserProfile, updateProfile } from '../api/auth';
import { toast, ToastContainer } from 'react-toastify';

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [stats, setStats] = useState({
    followers_count: 0,
    following_count: 0,
  });
  const [followingState, setFollowingState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [currentUserId] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || null;
    } catch (e) {
      return null;
    }
  });
  const targetId = id ? parseInt(id, 10) : currentUserId;

  const loadProfile = async () => {
    if (!targetId) return;
    setLoading(true);
    setUserNotFound(false);
    setProfile(null);
    try {
      const p = await getUserProfile(targetId);
      setProfile(p);
      const s = await getStats(targetId);
      setStats(s);
      if (currentUserId && currentUserId !== targetId) {
        const f = await isFollowing(targetId);
        setFollowingState(!!f.is_following);
      } else {
        setFollowingState(false);
      }
    } catch (e) {
      if (e?.response?.status === 404) {
        setUserNotFound(true);
      } else {
        console.error('Failed to fetch profile data:', e);
        toast.error(e?.response?.data?.error || 'Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [targetId, currentUserId]);

  const handleFollowToggle = async () => {
    if (!targetId) return;
    try {
      if (followingState) {
        await unfollow(targetId);
        setFollowingState(false);
        toast.success('Unfollowed successfully');
      } else {
        await follow(targetId);
        setFollowingState(true);
        toast.success('Followed successfully');
      }
      const s = await getStats(targetId);
      setStats(s);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Action failed');
    }
  };

  const openEditModal = () => {
    setEditName(profile?.name ?? '');
    setEditUsername(profile?.username ?? '');
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      await updateProfile({ name: editName.trim(), username: editUsername.trim() });
      toast.success('Profile updated');
      setShowEditModal(false);
      await loadProfile();
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  if (!targetId) {
    return (
      <div className="text-center py-16 bg-white/60 backdrop-blur border border-[#cffafe] rounded-3xl">
        <p className="text-[#475569]">No user selected</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16 bg-white/60 backdrop-blur border border-[#cffafe] rounded-3xl">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-[#06b6d4]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-[#475569] mt-4">Loading profile...</p>
      </div>
    );
  }

  if (userNotFound) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm border border-[#cffafe] rounded-3xl">
          <p className="text-[#64748b] font-medium">User does not exist</p>
          <p className="text-[#94a3b8] text-sm mt-2">No user found with this ID.</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.name?.trim() || `User ${targetId}`;
  const displayUsername = profile?.username?.trim() ? `@${profile.username}` : `@user${targetId}`;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm border border-[#cffafe] rounded-3xl overflow-hidden shadow-lg">
        <div className="h-40 bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#0ea5e9]" />

        <div className="px-6 pb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-32 h-32 -mt-16 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-3xl border-4 border-white flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {String(targetId).slice(-2)}
            </div>
            <div className="mt-3">
              {currentUserId !== targetId ? (
                <button
                  onClick={handleFollowToggle}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    followingState
                      ? 'bg-white border-2 border-[#cffafe] text-[#0F172A] hover:border-red-200 hover:bg-red-50 hover:text-red-600'
                      : 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {followingState ? 'Unfollow' : 'Follow'}
                </button>
              ) : (
                <button
                  onClick={openEditModal}
                  className="px-6 py-2 rounded-full font-semibold bg-white border-2 border-[#cffafe] text-[#0F172A] hover:bg-[#e0f2fe] hover:border-[#06b6d4] transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-[#0F172A] mb-1">{displayName}</h1>
            <p className="text-[#94A3B8]">{displayUsername}</p>
          </div>

          <div className="flex items-center gap-1 text-[#94A3B8] text-sm mb-4">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined {stats.joined_at || 'recently'}</span>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">{stats.following_count}</span>
              <span className="text-[#94A3B8]">Following</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">{stats.followers_count}</span>
              <span className="text-[#94A3B8]">Followers</span>
            </div>
          </div>

          {currentUserId === targetId && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#06b6d4]/10 to-[#0891b2]/10 border border-[#cffafe] rounded-2xl">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#06b6d4] mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-[#0F172A] font-medium text-sm">This is your profile</p>
                  <p className="text-[#475569] text-sm mt-1">
                    Other users will see this when they visit your profile
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#e0f2fe]">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Display name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-[#e0f2fe] rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-[#06b6d4] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1">Username</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  placeholder="username (no @)"
                  className="w-full px-4 py-2 border border-[#e0f2fe] rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-[#06b6d4] outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-[#e0f2fe] text-[#475569] rounded-xl hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white rounded-xl hover:shadow-lg disabled:opacity-50"
              >
                {savingProfile ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        theme="light"
        toastStyle={{
          background: '#ffffff',
          color: '#0F172A',
          border: '1px solid #cffafe',
        }}
      />
    </div>
  );
}
