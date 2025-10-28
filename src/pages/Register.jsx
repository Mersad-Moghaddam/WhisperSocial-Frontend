import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(email, password);
      toast.success('Account created! Please sign in.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Registration failed');
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
            Join Wisper today
          </h1>
          <p className="text-[#475569]">
            Create your account and start whispering
          </p>
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
            <Input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              label="Confirm Password"
              type="password"
              required
            />

            {error && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="primary"
              className="!py-3 !rounded-full !font-semibold"
            >
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#475569] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#06b6d4] hover:text-[#0891b2] font-medium"
              >
                Sign in
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
