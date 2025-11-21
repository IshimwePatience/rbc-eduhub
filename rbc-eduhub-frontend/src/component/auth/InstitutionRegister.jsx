import React, { useState, useEffect } from 'react';
import { registerInstitution } from '../../component/util/api';
import { useNavigate, Link } from 'react-router-dom';
import countries from '../../data/countries';
import CountrySelect from '../util/CountrySelect';
import image1 from '../../assets/images/145.png';
import image2 from '../../assets/images/146.png';
import image3 from '../../assets/images/147.png';
import rbcLogo from '../../assets/images/rbclogo.png';
import Gov from '../../assets/images/gov.png';


export default function InstitutionRegister() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', organization: '', country: '' });
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
  const onCountryChange = (code) => setForm({ ...form, country: code });

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (!form.password) {
        throw new Error('Password is required');
      }
      if (form.password !== form.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      if (!form.country) {
        throw new Error('Country is required');
      }

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        organization: form.organization,
        country: form.country
      };
      const res = await registerInstitution(payload);
  setSuccess('Institution admin created. Check your email for a verification code. Redirecting to verification...');
  setLoading(false);
  setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(form.email)}`), 2000);
    } catch (err) {
      setLoading(false);
      setError(err.message || String(err));
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10">
        <div className="max-w-md w-full">
              {/* Logo */}
                      <div className="fixed top-8 left-2 pt-6 pl-6 z-50 flex item-center gap-4">
                        <img src={Gov} alt="RBC Logo" className="h-16" />
                              <img src={rbcLogo} alt="RBC Logo" className="h-16" />
                      </div>

          <div className="mb-6">
            <Link to="/getstarted" className="text-base font-medium text-gray-800 hover:text-gray-900 hover:underline">
              Get Started &rarr;
            </Link>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">Register your institution</h2>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            {success && <div className="text-green-600 mb-3">{success}</div>}
            <form onSubmit={onSubmit} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={onChange} placeholder="First name" className="border border-gray-300 p-2 rounded w-full" required />
                <input name="lastName" value={form.lastName} onChange={onChange} placeholder="Last name" className="border border-gray-300 p-2 rounded w-full" required />
              </div>
              <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="organization" value={form.organization} onChange={onChange} placeholder="Organization name" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full border border-gray-300 p-2 rounded" required />
              <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} placeholder="Confirm password" type="password" className="w-full border border-gray-300 p-2 rounded" required />
              <div className="w-full">
                <CountrySelect value={form.country} onChange={onCountryChange} />
              </div>
              <div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Institution Admin'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Sliding Images */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-800 relative overflow-hidden items-center justify-center">
        <div className="w-full h-full relative">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`hero-${index}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10"></div>
          </div>
          {/* Dots indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}