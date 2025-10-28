import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateWisper() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const maxChars = 280;

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.warning('Please write something first');
      return;
    }

    setLoading(true);
    try {
      await createPost(content);
      toast.success('Posted successfully!');
      setContent('');
      setTimeout(() => {
        navigate('/timeline', { state: { refresh: true } });
      }, 800);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to post');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  const remainingChars = maxChars - content.length;
  const isOverLimit = remainingChars < 0;
  const showWarning = remainingChars <= 20 && remainingChars >= 0;

  return (
    <div className="min-h-screen flex items-start justify-center pt-8 pb-20 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#0891b2] mb-2">
            What&apos;s on your mind?
          </h1>
          <p className="text-[#0e7490] text-sm">
            Share your thoughts in 280 characters or less
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border-2 border-[#e0f2fe] shadow-wisper-sm hover:border-[#06b6d4] transition-colors">
          <form onSubmit={handleSubmit}>
            {/* Textarea */}
            <div className="p-6">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="w-full text-[#0891b2] text-lg placeholder-[#67e8f9] focus:outline-none resize-none"
                style={{ minHeight: '120px', maxHeight: '400px' }}
                placeholder="Start typing..."
                autoFocus
                disabled={loading}
              />

              {/* Character Counter */}
              {content.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-[#0e7490]">
                    {content.trim().split(/\s+/).filter(Boolean).length} words
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isOverLimit
                        ? 'text-red-500'
                        : showWarning
                        ? 'text-amber-500'
                        : 'text-[#06b6d4]'
                    }`}
                  >
                    {remainingChars} / {maxChars}
                  </div>
                </div>
              )}

              {/* Warning */}
              {isOverLimit && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  Please shorten by {Math.abs(remainingChars)} characters
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border-t border-[#e0f2fe] rounded-b-2xl">
              <div className="flex items-center justify-between gap-4">
                {/* Hint */}
                <div className="text-xs text-[#0e7490] hidden sm:block">
                  <kbd className="px-1.5 py-0.5 bg-white border border-[#06b6d4] rounded text-[#06b6d4] font-mono text-xs">
                    ⌘
                  </kbd>
                  <span className="mx-1">+</span>
                  <kbd className="px-1.5 py-0.5 bg-white border border-[#06b6d4] rounded text-[#06b6d4] font-mono text-xs">
                    Enter
                  </kbd>
                  <span className="ml-1.5">to post</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    type="button"
                    onClick={() => navigate('/timeline')}
                    className="px-4 py-2 text-sm font-medium text-[#0e7490] hover:text-[#06b6d4] transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !content.trim() || isOverLimit}
                    className="px-6 py-2 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white text-sm font-semibold rounded-lg hover:shadow-wisper-md hover:from-[#0891b2] hover:to-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Posting...
                      </>
                    ) : (
                      'Post'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 text-center text-sm text-[#0e7490]">
          Be kind, be authentic, inspire others ✨
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeButton={false}
        theme="light"
        toastStyle={{
          background: '#ffffff',
          color: '#0891b2',
          border: '2px solid #06b6d4',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(6, 182, 212, 0.15)',
          padding: '12px 20px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      />
    </div>
  );
}
