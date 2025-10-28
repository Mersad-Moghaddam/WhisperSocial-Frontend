import React, { useEffect, useState } from 'react';
import { getTimeline } from '../api/timeline';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFeed } from '../api/follow';
import { formatDate } from '../utils/formatDate';

export default function Timeline() {
  const [wispers, setWispers] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const load = async ({ cursorParam = 0, more = false } = {}) => {
    setLoading(true);
    try {
      const res = await getTimeline({ cursor: cursorParam, limit: 10 });
      if (more) {
        setWispers((w) => [...w, ...res.posts]);
      } else {
        setWispers(res.posts);
      }
      setCursor(res.next_cursor || 0);
    } catch (err) {
      console.error('Failed to load timeline', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always load fresh timeline on mount or when returning from creating a post
    load({ cursorParam: 0, more: false });
  }, [location.key]);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="sticky top-16 z-40 pb-4 mb-6">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f2fe] backdrop-blur-md border border-[#bae6fd] rounded-2xl p-5 shadow-wisper-md">
            {/* Title */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">
                Your Feed
              </h1>
              <p className="text-sm text-[#64748b] mt-1">
                See what&apos;s happening
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Search user by ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchId) {
                      navigate(`/timeline/profile/${searchId}`);
                    }
                  }}
                  className="flex-1 px-4 py-2.5 bg-white border border-[#e0f2fe] rounded-xl text-[#1e293b] placeholder-[#94a3b8] text-sm focus:border-[#06b6d4] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/20 transition-all"
                />
                <button
                  onClick={() =>
                    searchId && navigate(`/timeline/profile/${searchId}`)
                  }
                  disabled={!searchId}
                  className="px-5 py-2.5 bg-white border border-[#e0f2fe] text-[#0f172a] rounded-xl hover:bg-[#f0f9ff] hover:border-[#06b6d4] transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const res = await getTimeline({ cursor: 0, limit: 10 });
                    setWispers(res.posts || []);
                    setCursor(res.next_cursor || 0);
                    if ((res.posts || []).length === 0) {
                      const feedRes = await getFeed(50);
                      setWispers(feedRes.posts || []);
                    }
                  } catch (e) {
                    console.error('Failed to fetch feed fallback:', e);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="px-5 py-2.5 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white rounded-xl hover:shadow-wisper-md transition-all text-sm font-semibold disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        {/* Loading State */}
        {loading && wispers.length === 0 && (
          <div className="text-center py-20 bg-white/70 backdrop-blur-sm border border-[#e0f2fe] rounded-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-[#e0f2fe] border-t-[#06b6d4] rounded-full animate-spin"></div>
              </div>
              <p className="text-[#64748b] font-medium">Loading your feed...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && wispers.length === 0 && (
          <div className="text-center py-20 bg-white/70 backdrop-blur-sm border border-[#e0f2fe] rounded-2xl">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] rounded-3xl flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-[#06b6d4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-2 tracking-tight">
                Your feed is empty
              </h3>
              <p className="text-[#64748b] mb-2 max-w-sm">
                Start following people to see their wispers here
              </p>
              <p className="text-sm text-[#94a3b8]">
                Try searching for users above
              </p>
            </div>
          </div>
        )}

        {/* Wispers List */}
        <div className="space-y-3">
          {wispers.map((w, index) => (
            <article
              key={w.id}
              className="bg-white/80 backdrop-blur-sm border border-[#e0f2fe] rounded-2xl p-5 hover:bg-white hover:border-[#bae6fd] hover:shadow-wisper-sm transition-all duration-200 animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* User Info */}
              <div className="flex items-start gap-3 mb-4">
                <button
                  onClick={() => navigate(`/timeline/profile/${w.author_id}`)}
                  className="flex-shrink-0 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center text-white font-bold text-base group-hover:shadow-wisper-md transition-all">
                    {String(w.author_id).slice(-2)}
                  </div>
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={() =>
                        navigate(`/timeline/profile/${w.author_id}`)
                      }
                      className="font-semibold text-[#0f172a] hover:text-[#06b6d4] transition-colors text-base no-underline tracking-tight"
                    >
                      User {w.author_id}
                    </button>
                    <span className="text-[#cbd5e1] text-sm">•</span>
                    <span className="text-[#94a3b8] text-sm font-medium">
                      {formatDate(w.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4 pl-14">
                <p className="text-[#1e293b] text-base leading-relaxed whitespace-pre-wrap break-words">
                  {w.content}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-8 pl-14 pt-2 border-t border-[#f0f9ff]">
                <button
                  className="flex items-center gap-2 text-[#94a3b8] hover:text-[#06b6d4] transition-colors group"
                  title="Comment"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Reply</span>
                </button>

                <button
                  className="flex items-center gap-2 text-[#94a3b8] hover:text-[#06b6d4] transition-colors group"
                  title="Like"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Like</span>
                </button>

                <button
                  className="flex items-center gap-2 text-[#94a3b8] hover:text-[#06b6d4] transition-colors group"
                  title="Share"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {cursor !== 0 && (
          <div className="text-center pt-6">
            <button
              onClick={() => load({ cursorParam: cursor, more: true })}
              disabled={loading}
              className="px-8 py-3 bg-white border-2 border-[#e0f2fe] text-[#0f172a] rounded-xl hover:bg-[#f0f9ff] hover:border-[#bae6fd] hover:shadow-wisper-sm transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#e0f2fe] border-t-[#06b6d4] rounded-full animate-spin"></div>
                  Loading...
                </span>
              ) : (
                'Load more wispers'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
