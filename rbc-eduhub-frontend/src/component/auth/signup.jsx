import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, getGoogleAuthUrl, getLinkedInAuthUrl } from '../util/api';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [resident, setResident] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Ensure the reCAPTCHA script is loaded with the site key in the query param.
  useEffect(() => {
    try {
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      if (!siteKey) return;
      if (window.grecaptcha) return; // already loaded
      const s = document.createElement('script');
      s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // client-side confirm-password check
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const payload = { firstName, lastName, email, password, confirmPassword };
      if (selectedRole) payload.roleId = selectedRole;
      if (phone) payload.phone = phone;
      if (nationalId) payload.nationalId = nationalId;
      if (jobTitle) payload.jobTitle = jobTitle;
  if (organization) payload.organization = organization;
  if (resident) payload.resident = resident;

      // Attach reCAPTCHA v3 token if available
      try {
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        if (siteKey && window.grecaptcha && typeof window.grecaptcha.execute === 'function') {
          const token = await new Promise((resolve) => {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(siteKey, { action: 'signup' }).then(resolve).catch(() => resolve(null));
            });
          });
          if (token) payload.recaptchaToken = token;
        }
      } catch (e) {
        // ignore reCAPTCHA errors here; backend will reject if required
      }

  const result = await signup(payload);
  // If backend returns success, proceed. If error, do not redirect.
  if (result && result.success !== false) {
    setSuccess(true);
    setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(email)}`), 1500);
  } else {
    setError(result?.message || 'User already exists with this email');
    setSuccess(false);
  }
    } catch (err) {
      if (err?.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err?.message && /already in use|already exists/i.test(err.message)) {
        setError('User already exists with this email');
      } else {
        setError(err?.message || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleLinkedInSignup = () => {
    window.location.href = getLinkedInAuthUrl();
  };

  useEffect(() => {
    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${base}/api/auth/roles`);
        if (!res.ok) return;
        const jr = await res.json();
        const r = jr.roles || [];
        setRoles(r);
        if (r.length) setSelectedRole(r[0].id);
      } catch (e) {
        // ignore silently — roles are optional
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8 py-12">
      <div className="max-w-md w-full">
        <div className="mb-6">
          <Link to="/getstarted" className="text-base font-medium text-gray-800 hover:text-gray-900 hover:underline">
            Get Started &rarr;
          </Link>
        </div>
        <div className="rounded-2xl border border-gray-500 p-8">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Social Signup Buttons */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full bg-[#004370] hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-3 transition-colors"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button
              type="button"
              onClick={handleLinkedInSignup}
              className="w-full bg-[#0077B5] hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-3 transition-colors mt-2"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
              </svg>
              Continue with LinkedIn
            </button>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            {/* Role selection (if roles available) - shown at top and required when present */}
            {roles && roles.length > 0 && (
              <div>
                <label className="block text-sm text-gray-600 mb-1">I am a</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-white text-gray-700 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={loading}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}{r.description ? ` — ${r.description}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="National ID (optional)"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Job Title (optional)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Organization (optional)"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Resident (required)"
                value={resident}
                onChange={(e) => setResident(e.target.value)}
                className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm text-center">Signup successful! Redirecting...</div>
            )}
            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
            <p className="text-gray-400 text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:underline font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
        {/* Privacy Policy */}
                      <p className="text-gray-400 text-sm text-center">
                        By continuing, you acknowledge RBC's{' '}
                        <Link to="/privacy" className="text-blue-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
      </div>
    </div>
  );
}

export default Signup;