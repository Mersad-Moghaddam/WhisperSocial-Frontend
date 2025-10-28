import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data && data.token) {
        toast.success('Logged in successfully');
        navigate('/timeline', { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#06b6d4] to-[#e0f2fe]">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-3xl flex items-center justify-center shadow-xl">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white">
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
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
            Welcome back
          </h1>
          <p className="text-[#475569]">Sign in to continue to Wisper</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-[#cffafe] rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              required
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="primary"
              className="!py-3 !rounded-full !font-semibold"
            >
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#475569] text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                className="text-[#06b6d4] hover:text-[#0891b2] font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

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
    </div>
  );
}
