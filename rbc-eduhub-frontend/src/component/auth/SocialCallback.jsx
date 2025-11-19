import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { refreshAuth } from '../util/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SocialCallback() {
  const query = useQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const newUserFlag = query.get('newUser');
        const refreshRes = await refreshAuth();
        // refreshAuth returns { success:true, data: { user, accessToken, ... } }
        const payload = refreshRes?.data || refreshRes;
        const u = payload?.user || payload;
        setUser(u || null);

        if (newUserFlag && u) {
          // fetch available roles
          const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/roles`);
          if (!r.ok) throw new Error('Failed to load roles');
          const jr = await r.json();
          setRoles(jr.roles || []);
          if (jr.roles && jr.roles.length) setSelectedRole(jr.roles[0].id);
        } else {
          // not a new user - redirect based on role
          redirectByRole(u);
        }
      } catch (e) {
        setError(e.message || 'Auth failed');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function redirectByRole(u) {
    if (!u) return navigate('/');
    const roleId = u.roleId;
    // naive mapping by role name via roles list or fallbacks
    // for now: if roleId absent -> go to /profile-setup, otherwise dashboard
    if (!roleId) return navigate('/profile-setup');
    // default dashboards - you can customize mapping
    return navigate('/dashboard');
  }

  async function submitRole() {
    setError('');
    try {
      const base = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${base}/api/auth/set-role`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId: selectedRole })
      });
      if (!res.ok) throw new Error(await res.text());
      const jr = await res.json();
      const updated = jr.user || jr.data || jr;
      // redirect to dashboard
      return navigate('/dashboard');
    } catch (e) {
      setError(e.message || 'Failed to set role');
    }
  }

  if (loading) return <div className="p-8">Finalizing authentication...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  // if roles present, show small modal to pick role
  if (roles && roles.length) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-3">Choose your role</h3>
          <p className="text-sm text-gray-600 mb-4">Select the role that best describes you. You can update this later in your profile.</p>
          <select className="w-full p-2 border rounded mb-4" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => navigate('/')}>Skip</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={submitRole}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-8">Redirecting...</div>;
}
