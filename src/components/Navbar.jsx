import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e0f2fe] backdrop-blur-lg border-b border-[#bae6fd] sticky top-0 z-50 shadow-wisper-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2.5 group no-underline">
          <div className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-xl flex items-center justify-center shadow-wisper-sm group-hover:shadow-wisper-md transition-all">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
              <path d="M7 13c0-2.2 1.8-4 4-4 .6-2.4 2.8-4.2 5.4-4.2 2.4 0 4.4 1.5 5.1 3.6 2.1 0 3.9 1.7 3.9 3.8 0 2.1-1.8 3.8-3.9 3.8H11c-2.2 0-4-1.8-4-4z" />
              <path
                d="M8.5 14h11"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-[#06b6d4] to-[#0891b2] bg-clip-text text-transparent tracking-tight hidden sm:inline">
            Wisper
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md rounded-xl transition-all no-underline"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/timeline"
                className="px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f9ff] rounded-xl transition-all no-underline"
              >
                My Feed
              </Link>
              <Link
                to="/timeline/create-post"
                className="px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-xl hover:shadow-wisper-md hover:scale-[1.02] transition-all no-underline"
              >
                Wisper
              </Link>
              <Link
                to="/timeline/profile"
                className="px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f9ff] rounded-xl transition-all no-underline"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f9ff] rounded-xl transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f9ff] rounded-xl transition-all no-underline"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-xl hover:shadow-wisper-md hover:scale-[1.02] transition-all no-underline"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
