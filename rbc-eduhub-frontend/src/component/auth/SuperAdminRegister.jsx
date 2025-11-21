import React, { useState, useEffect } from 'react';
import { registerSuperAdmin } from '../../component/util/api';
import { useNavigate, Link } from 'react-router-dom';
import image1 from '../../assets/images/145.png';
import image2 from '../../assets/images/146.png';
import image3 from '../../assets/images/147.png';
import rbcLogo from '../../assets/images/rbclogo.png';
import Gov from '../../assets/images/gov.png';
import rbc12 from '../../assets/images/rbc12.png';

export default function SuperAdminRegister() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '', secret: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // client-side validation
      if (!form.password) throw new Error('Password is required');
      if (form.password !== form.confirmPassword) throw new Error('Passwords do not match');

      const payload = { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password, phone: form.phone, secret: form.secret };
      await registerSuperAdmin(payload);
  setSuccess('Super Admin created. Check your email for a verification code. Redirecting to verification...');
  setLoading(false);
  setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(form.email)}`), 2000);
    } catch (err) {
      setLoading(false);
      // backend may return a JSON error body string; try to parse
      let msg = '';
      try {
        const parsed = JSON.parse(err.message || '');
        msg = parsed?.message || parsed?.error || JSON.stringify(parsed) || String(err);
      } catch (e) {
        msg = err.message || String(err);
      }
      // map known internal errors to user-friendly text
      if (msg && msg.toLowerCase().includes('super admin secret not configured')) {
        msg = 'Platform misconfiguration: Super admin registration is disabled. Contact the platform administrator.';
      }
      setError(msg);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Logo */}
      <div className="fixed top-8 left-2 pt-6 pl-6 z-50 flex item-center gap-4">
        <img src={Gov} alt="RBC Logo" className="h-16" />
        <img src={rbcLogo} alt="RBC Logo" className="h-16" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10">
        <div className="max-w-md w-full">
    <div className="rounded-2xl border border-gray-200 p-6 overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">Super Admin registration (private)</h2>
            <p className="text-sm text-gray-600 mb-4">This page is private. You will need the platform secret to create a Super Admin.</p>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            {success && <div className="text-green-600 mb-3">{success}</div>}
            <form onSubmit={onSubmit} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="border border-gray-300 p-2 rounded w-full" required />
                <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="border border-gray-300 p-2 rounded w-full" required />
              </div>
              <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="password" value={form.password} onChange={onChange} placeholder="Password (recommended)" type="password" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} placeholder="Confirm password" type="password" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" type="text" className="w-full border border-gray-300 p-2 rounded" />
              <input name="secret" value={form.secret} onChange={onChange} placeholder="Platform secret" type="password" className="w-full border border-gray-300 p-2 rounded" required />
              <div>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Super Admin'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-[#0071bc] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {/* Use an img with object-contain so the logo scales to fit without cropping */}
          <img
            src={rbc12}
            alt="RBC logo"
            className="max-h-full w-auto object-contain"
            style={{ maxHeight: '100%', width: 'auto' }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10"></div>
        </div>
      </div>
    </div>
  );
}
