
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/3.jpg';
import rbcLogo from '../../assets/images/rbclogo.png';
import { login, getGoogleAuthUrl, getLinkedInAuthUrl } from '../util/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // recaptchaToken can be added if you integrate recaptcha
      const res = await login(email, password);
      // API returns { success: true, data: { user, accessToken, ... } }
      const payload = res?.data || res;
      const user = payload?.user || null;
      if (!user) {
        setError('Login succeeded but no user info returned');
        return;
      }
      // simple role-based redirect: you can customize mappings
      // fetch role names if needed; for now route to dashboard or admin
      // Example mapping by roleId is left simple
      if (user.roleId) {
        // naive: if roleId present, go to dashboard
        navigate('/dashboard');
      } else {
        navigate('/profile-setup');
      }
    } catch (err) {
      if (err?.message && (/not found|invalid credentials|no user/i.test(err.message))) {
        setError('No account found with this email or password is incorrect');
      } else {
        setError(err?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleLinkedInLogin = () => {
    window.location.href = getLinkedInAuthUrl();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="max-w-md w-full">
          {/* Get Started Link */}
          <div className="mb-6">
            <Link to="/getstarted" className="text-base font-medium text-gray-800 hover:text-gray-900 hover:underline">
              Get Started &rarr;
            </Link>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border border-gray-500 p-8">
            <form onSubmit={handleSubmit} className="space-y-2">

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
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
                onClick={handleLinkedInLogin}
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

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/10 text-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                  disabled={loading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Continue with email'}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center mt-2">
                <Link to="/forgot-password" className="text-blue-400 hover:underline font-semibold">
                  Forgot password?
                </Link>
              </div>

             
            </form>

            {/* Sign Up Link */}
            <div className="mt-2 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
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


      {/* Right Side - Image with Grid Overlay */}
      <div className="hidden lg:block lg:w-1/2 bg-gray-800 relative">
        <img src={image1} alt="Healthcare professionals" className="w-full h-full object-cover" />
        {/* Grid Overlay Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
          {/* Horizontal line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;