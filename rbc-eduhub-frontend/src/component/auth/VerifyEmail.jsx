
import React, { useState } from 'react';
import rbcLogo from '../../assets/images/rbclogo.png';
import Gov from '../../assets/images/gov.png';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../util/api';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get('email') || '';
  // Detect if this is a superadmin verification page
  const isSuperAdmin = location.pathname.startsWith('/superadminregistration');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const handleResend = async () => {
    setResendLoading(true);
    setResendMsg('');
    setError('');
    try {
  await postJSON('/api/auth/resend-code', { email });
  setResendMsg('A new verification code has been sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to resend code');
    }
    setResendLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
  await postJSON('/api/auth/verify-email', { email, code });
      setSuccess(true);
      setTimeout(() => {
        if (isSuperAdmin) {
          navigate('/superadminregistration/login');
        } else {
          navigate('/login');
        }
      }, 2000);
    } catch (err) {
      setError(err.message || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8 py-12">
      {/* Logo */}
      <div className="fixed top-8 left-2 pt-6 pl-6 z-50 flex item-center gap-4">
        <img src={Gov} alt="RBC Logo" className="h-16" />
        <img src={rbcLogo} alt="RBC Logo" className="h-16" />
      </div>
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-gray-500 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input type="email" value={email} disabled className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Verification Code</label>
              <input type="text"  placeholder="Enter code from email" value={code} onChange={e => setCode(e.target.value)} required className="w-full text-gray-700  border boder-gray-300 px-4 py-3 rounded-lg" />
            </div>
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {resendMsg && <div className="text-green-600 text-sm text-center">{resendMsg}</div>}
            {success && <div className="text-green-600 text-sm text-center">Email verified! Redirecting...</div>}
            <button type="submit" className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <button type="button" onClick={handleResend} className="w-full text-blue-400 py-3 font-semibold hover:underline transition-colors mt-2" disabled={resendLoading}>
              {resendLoading ? 'Resending...' : 'Resend Code'}
            </button>
            <div className="text-center mt-2">
              <Link to={isSuperAdmin ? '/superadminregistration/login' : '/login'} className="text-blue-400 hover:underline font-semibold">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
