
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../util/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/request-password-reset', { email });
      setSent(true);
      setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(email)}`), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send reset email');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8 py-12">
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-gray-500 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
          {sent ? (
            <div className="text-green-600 text-sm text-center mb-4">Check your email for a password reset code.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg" />
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <button type="submit" className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => navigate('/login')} className="w-full text-blue-400 hover:underline font-semibold mt-2">Back to Login</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
