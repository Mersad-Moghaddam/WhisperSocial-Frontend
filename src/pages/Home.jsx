import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06b6d4] to-[#e0f2fe] relative overflow-hidden">
      <div className="clouds-container">
        {/* Realistic Cloud 1 - Large fluffy cloud */}
        <svg
          className="cloud cloud-1"
          width="280"
          height="100"
          viewBox="0 0 280 100"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-1">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="0" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.15" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-1" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-1)">
            <ellipse
              cx="140"
              cy="50"
              rx="65"
              ry="28"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="95"
              cy="58"
              rx="55"
              ry="24"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="185"
              cy="58"
              rx="55"
              ry="24"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="115"
              cy="45"
              rx="45"
              ry="20"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="165"
              cy="45"
              rx="45"
              ry="20"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="70"
              cy="65"
              rx="38"
              ry="18"
              fill="url(#cloud-gradient-1)"
            />
            <ellipse
              cx="210"
              cy="65"
              rx="38"
              ry="18"
              fill="url(#cloud-gradient-1)"
            />
          </g>
        </svg>

        {/* Realistic Cloud 2 - Medium wispy cloud */}
        <svg
          className="cloud cloud-2"
          width="240"
          height="85"
          viewBox="0 0 240 85"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-2">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="3" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.12" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-2" cx="50%" cy="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.75" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-2)">
            <ellipse
              cx="120"
              cy="42"
              rx="58"
              ry="24"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="85"
              cy="50"
              rx="48"
              ry="20"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="155"
              cy="50"
              rx="48"
              ry="20"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="100"
              cy="38"
              rx="38"
              ry="16"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="140"
              cy="38"
              rx="38"
              ry="16"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="65"
              cy="58"
              rx="32"
              ry="14"
              fill="url(#cloud-gradient-2)"
            />
            <ellipse
              cx="175"
              cy="58"
              rx="32"
              ry="14"
              fill="url(#cloud-gradient-2)"
            />
          </g>
        </svg>

        {/* Realistic Cloud 3 - Large dramatic cloud */}
        <svg
          className="cloud cloud-3"
          width="320"
          height="110"
          viewBox="0 0 320 110"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-3">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
              <feOffset dx="0" dy="5" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.18" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-3" cx="50%" cy="28%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.85" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-3)">
            <ellipse
              cx="160"
              cy="55"
              rx="72"
              ry="32"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="105"
              cy="65"
              rx="62"
              ry="28"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="215"
              cy="65"
              rx="62"
              ry="28"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="130"
              cy="48"
              rx="52"
              ry="23"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="190"
              cy="48"
              rx="52"
              ry="23"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="75"
              cy="72"
              rx="42"
              ry="20"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="245"
              cy="72"
              rx="42"
              ry="20"
              fill="url(#cloud-gradient-3)"
            />
            <ellipse
              cx="160"
              cy="40"
              rx="45"
              ry="18"
              fill="url(#cloud-gradient-3)"
            />
          </g>
        </svg>

        {/* Realistic Cloud 4 - Small puffy cloud */}
        <svg
          className="cloud cloud-4"
          width="200"
          height="75"
          viewBox="0 0 200 75"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-4">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
              <feOffset dx="0" dy="3.5" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.13" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-4" cx="50%" cy="32%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.78" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-4)">
            <ellipse
              cx="100"
              cy="38"
              rx="52"
              ry="22"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="70"
              cy="45"
              rx="42"
              ry="18"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="130"
              cy="45"
              rx="42"
              ry="18"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="85"
              cy="33"
              rx="35"
              ry="15"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="115"
              cy="33"
              rx="35"
              ry="15"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="55"
              cy="52"
              rx="28"
              ry="13"
              fill="url(#cloud-gradient-4)"
            />
            <ellipse
              cx="145"
              cy="52"
              rx="28"
              ry="13"
              fill="url(#cloud-gradient-4)"
            />
          </g>
        </svg>

        {/* Realistic Cloud 5 - Medium fluffy cloud */}
        <svg
          className="cloud cloud-5"
          width="260"
          height="90"
          viewBox="0 0 260 90"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-5">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4.5" />
              <feOffset dx="0" dy="4.5" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.16" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-5" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.82" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-5)">
            <ellipse
              cx="130"
              cy="45"
              rx="62"
              ry="26"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="90"
              cy="53"
              rx="52"
              ry="22"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="170"
              cy="53"
              rx="52"
              ry="22"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="108"
              cy="40"
              rx="42"
              ry="18"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="152"
              cy="40"
              rx="42"
              ry="18"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="68"
              cy="60"
              rx="35"
              ry="16"
              fill="url(#cloud-gradient-5)"
            />
            <ellipse
              cx="192"
              cy="60"
              rx="35"
              ry="16"
              fill="url(#cloud-gradient-5)"
            />
          </g>
        </svg>

        {/* Realistic Cloud 6 - Extra large distant cloud */}
        <svg
          className="cloud cloud-6"
          width="300"
          height="95"
          viewBox="0 0 300 95"
          fill="none"
        >
          <defs>
            <filter id="cloud-shadow-6">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dx="0" dy="6" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="cloud-gradient-6" cx="50%" cy="25%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <g filter="url(#cloud-shadow-6)">
            <ellipse
              cx="150"
              cy="48"
              rx="68"
              ry="28"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="100"
              cy="57"
              rx="58"
              ry="24"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="200"
              cy="57"
              rx="58"
              ry="24"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="122"
              cy="43"
              rx="48"
              ry="20"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="178"
              cy="43"
              rx="48"
              ry="20"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="75"
              cy="65"
              rx="38"
              ry="17"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="225"
              cy="65"
              rx="38"
              ry="17"
              fill="url(#cloud-gradient-6)"
            />
            <ellipse
              cx="150"
              cy="35"
              rx="42"
              ry="16"
              fill="url(#cloud-gradient-6)"
            />
          </g>
        </svg>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e0f2fe] backdrop-blur-lg border-b border-[#bae6fd] shadow-wisper-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 group no-underline"
            >
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
              <span className="text-xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#0891b2] bg-clip-text text-transparent tracking-tight">
                Wisper
              </span>
            </button>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/timeline')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-xl hover:shadow-wisper-md hover:scale-[1.02] transition-all no-underline"
                >
                  Go to Timeline
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f9ff] rounded-xl transition-all no-underline"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-xl hover:shadow-wisper-md hover:scale-[1.02] transition-all no-underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full mb-6 border border-[#cffafe]">
                <svg
                  className="w-4 h-4 text-[#06b6d4]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                </svg>
                <span className="text-sm font-medium text-[#0F172A]">
                  Share your thoughts softly
                </span>
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-[#0F172A] mb-6 leading-tight">
                Whisper to the world
              </h1>
              <p className="text-xl text-[#475569] mb-8 leading-relaxed">
                Join Wisper, where your thoughts float like clouds. Connect,
                share, and discover in a calm, beautiful space.
              </p>

              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/timeline')}
                  className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Go to Your Timeline
                </button>
              ) : (
                <div className="space-y-3 max-w-sm">
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Create account
                  </button>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-[#cffafe]" />
                    <span className="text-sm text-[#94A3B8]">or</span>
                    <div className="flex-1 h-px bg-[#cffafe]" />
                  </div>
                  <p className="text-[#0F172A] font-semibold text-lg mb-3">
                    Already have an account?
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full px-6 py-3 text-base font-semibold text-[#06b6d4] bg-white border-2 border-[#cffafe] rounded-full hover:bg-[#e0f2fe] hover:border-[#06b6d4] transition-all"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/5 to-[#0891b2]/5 blur-3xl"></div>
                <div className="relative w-full aspect-square flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full opacity-80"
                  >
                    <defs>
                      <linearGradient
                        id="minimalGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="100%"
                          stopColor="#0891b2"
                          stopOpacity="0.4"
                        />
                      </linearGradient>
                    </defs>

                    {/* Simple Cloud 1 */}
                    <path
                      d="M50 100 Q70 85 90 100 Q110 85 130 100 Q140 110 130 120 Q110 130 90 120 Q70 130 50 120 Q40 110 50 100Z"
                      fill="url(#minimalGrad)"
                    />

                    {/* Simple Cloud 2 */}
                    <path
                      d="M100 60 Q115 50 130 60 Q140 65 135 75 Q120 80 105 75 Q95 70 100 60Z"
                      fill="url(#minimalGrad)"
                      opacity="0.7"
                    />

                    {/* Simple Cloud 3 */}
                    <path
                      d="M60 140 Q75 130 90 140 Q100 145 95 152 Q80 157 65 152 Q55 147 60 140Z"
                      fill="url(#minimalGrad)"
                      opacity="0.6"
                    />

                    {/* Minimal accent circles */}
                    <circle
                      cx="90"
                      cy="105"
                      r="2"
                      fill="#06b6d4"
                      opacity="0.4"
                    />
                    <circle
                      cx="120"
                      cy="65"
                      r="1.5"
                      fill="#06b6d4"
                      opacity="0.3"
                    />
                    <circle
                      cx="75"
                      cy="145"
                      r="1.5"
                      fill="#06b6d4"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0F172A] mb-4">
              Float above the noise
            </h2>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto">
              Experience social media the way it should be—calm, beautiful, and
              meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-white to-[#e0f2fe] rounded-3xl border border-[#cffafe] hover:shadow-xl transition-all group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-all">
                <svg
                  className="w-7 h-7 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Share Softly
              </h3>
              <p className="text-[#475569] leading-relaxed">
                Express your thoughts in a peaceful space where every voice
                matters
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-white to-[#e0f2fe] rounded-3xl border border-[#cffafe] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Connect Gently
              </h3>
              <p className="text-[#475569] leading-relaxed">
                Build meaningful connections with people who inspire you
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-white to-[#e0f2fe] rounded-3xl border border-[#cffafe] hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                Discover Calmly
              </h3>
              <p className="text-[#475569] leading-relaxed">
                Find content that matters in a serene, distraction-free
                environment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-6">
            Ready to whisper?
          </h2>
          <p className="text-xl text-[#475569] mb-10 max-w-2xl mx-auto">
            Join Wisper today and be part of a calm, thoughtful community
          </p>
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/timeline')}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              Go to Timeline
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full hover:shadow-2xl hover:scale-105 transition-all"
              >
                Sign up
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 text-lg font-semibold text-[#06b6d4] bg-white border-2 border-[#cffafe] rounded-full hover:bg-[#e0f2fe] hover:border-[#06b6d4] transition-all"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#cffafe] py-8 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#475569] text-sm">
              © 2024 Wisper. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-[#475569]">
              <button className="hover:text-[#06b6d4] transition-colors">
                About
              </button>
              <button className="hover:text-[#06b6d4] transition-colors">
                Help Center
              </button>
              <button className="hover:text-[#06b6d4] transition-colors">
                Terms
              </button>
              <button className="hover:text-[#06b6d4] transition-colors">
                Privacy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
