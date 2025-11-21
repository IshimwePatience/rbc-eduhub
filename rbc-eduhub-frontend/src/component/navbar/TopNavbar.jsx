
import React, { useState, useRef, useEffect } from 'react';
import { Search, User, Settings, LogOut, Bot, Bell } from 'lucide-react';
import Gov from '../../assets/images/gov.png';
import { getProfile, updateProfile } from '../util/api';

function TopNavbar({ sidebarMinimized, setSidebarMinimized }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (e) {
        setUser({});
      }
    }
    fetchUser();
  }, []);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPic, setEditPic] = useState('');
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditProfile = () => {
    setEditName(user.fullName || '');
    setEditEmail(user.email || '');
    setEditPic(user.profilePic || '');
    setEditOpen(true);
    setMenuOpen(false);
  };

  const handleSaveProfile = async () => {
    const updated = {
      ...user,
      fullName: editName,
      email: editEmail,
      profilePic: editPic || user.profilePic
    };
    try {
      const res = await updateProfile(updated);
      setUser(res);
      setEditOpen(false);
    } catch (e) {
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleToggleSidebar = () => {
    if (setSidebarMinimized) {
      setSidebarMinimized((v) => !v);
    }
  };

  return (
    <nav className="w-full bg-[#FCFCFD] text-gray-800 flex items-center justify-between px-6 py-3 border-b border-gray-400">
      {/* Logo and Dashboard Link */}
      <div className="flex items-center gap-4">
        {/* Sidebar Minimize Button */}
        <button
          className={`mr-2 p-1 rounded hover:bg-gray-200 transition-all flex items-center justify-center ${sidebarMinimized ? 'rotate-180' : ''}`}
          style={{ transition: 'transform 0.3s' }}
          onClick={handleToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 9l3 3-3 3"/></svg>
        </button>
        <img src={Gov} alt="Logo" className="h-8 w-8 rounded-full object-cover shadow-lg" />
        <button className="text-base font-semibold hover:text-blue-600 transition-colors" onClick={() => window.location.href = '/dashboard'}>
          Dashboard
        </button>
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center px-8" ref={searchRef}>
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search (/) for resources, docs, products, and more"
              className="w-full bg-white text-gray-700 text-sm rounded-md px-4 py-2.5 pl-10 border border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-500"
              onFocus={() => setSearchOpen(true)}
            />
            <Search className="absolute left-3 top-3 text-gray-500" size={16} />
            <kbd className="absolute right-3 top-2 px-2 py-1 text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded font-mono">
              /
            </kbd>
          </div>
          {/* Search Dropdown (mockup) */}
          {searchOpen && (
            <div className="absolute left-0 top-[calc(100%+12px)] w-full bg-white border border-gray-300 rounded-lg shadow-2xl z-50 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded"></div>
                  <span className="text-blue-600 font-semibold text-sm">Gemini</span>
                </div>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                  Chat with an AI companion to get comprehensive answers to any topic related to Google Cloud
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Tip: use <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono mx-0.5">Alt G</kbd> to open and close the chat
                </p>
                <div className="flex flex-col gap-2">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md text-left transition-all flex items-center gap-2 border border-gray-300 hover:border-gray-400 font-medium text-sm">
                    <Search size={15} className="text-gray-500" />
                    <span>Ask Gemini a question</span>
                  </button>
                  {['What is Secret Manager?', 'Create a custom organization policy constraint...', 'How does GKE scale my clusters?', 'What is Migration Center?'].map((q, i) => (
                    <button key={i} className="w-full bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-left transition-all text-sm border border-gray-300 hover:border-gray-400">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-blue-600 rotate-45"></div>
                  </div>
                  <span className="text-gray-600 font-semibold text-sm">Popular searches</span>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Compute Engine', desc: 'VMs, GPUs, TPUs, disks', color: 'bg-blue-600', icon: '💻' },
                    { name: 'BigQuery', desc: 'Data warehouse/analytics', color: 'bg-green-600', icon: '📊' },
                    { name: 'IAM & Admin', desc: 'Resource access control', color: 'bg-purple-600', icon: '🔐' },
                    { name: 'Cloud Storage', desc: 'Enterprise-ready object storage', color: 'bg-orange-600', icon: '☁️' }
                  ].map((item, i) => (
                    <button key={i} className="bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-3 rounded-md flex items-start gap-3 transition-all border border-gray-300 hover:border-gray-400">
                      <div className={`w-9 h-9 ${item.color} rounded flex items-center justify-center flex-shrink-0 text-lg shadow-md`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-sm text-gray-800">{item.name}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{item.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Profile Menu */}
      <div className="flex items-center gap-3 relative" ref={menuRef}>
        {/* AI Assistant Icon - Same size as profile */}
        <button
          className="p-0 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center w-10 h-10"
          title="AI Assistant"
          onClick={() => alert('AI Assistant coming soon!')}
        >
          <Bot size={24} className="text-blue-600" />
        </button>
        {/* Notification Icon with Dropdown - Same size as profile */}
        <div className="relative">
          <button
            className="p-0 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center w-10 h-10 relative"
            title="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <Bell size={24} className="text-gray-700" />
            {/* Notification dot */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] bg-white border border-gray-300 rounded-lg shadow-2xl min-w-[320px] z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Notifications</div>
              <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
                {/* Example notifications */}
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium text-blue-600">AI Assistant</span> is now available!
                  <div className="text-xs text-gray-500 mt-1">Just now</div>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium">You have 3 new course enrollments</span>
                  <div className="text-xs text-gray-500 mt-1">5 min ago</div>
                </li>
                <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium">Assignment deadline approaching</span>
                  <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                </li>
              </ul>
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button className="text-blue-600 hover:underline text-sm font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        {/* Profile Picture - maintaining original size */}
        <button 
          className="flex items-center gap-2 p-0 rounded-full transition-all w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="inline-flex items-center justify-center rounded-full bg-white w-10 h-10">
            {user.profilePic ? (
              <img 
                src={user.profilePic}
                alt="Profile" 
                className="h-10 w-10 rounded-full border border-gray-300 hover:border-gray-400 transition-all cursor-pointer" 
              />
            ) : (
              <span className="h-10 w-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-lg font-bold text-gray-600 select-none">
                {user.fullName && user.fullName.split(' ')[0]?.slice(0,2).toUpperCase()}
              </span>
            )}
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-[calc(100%+12px)] bg-white border border-gray-300 rounded-lg shadow-2xl min-w-[260px] z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
              <div className="flex items-start gap-3 mb-2">
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" className="h-12 w-12 rounded-full border-2 border-gray-300 flex-shrink-0" />
                ) : (
                  <span className="h-12 w-12 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 select-none">
                    {user.fullName && user.fullName.split(' ')[0]?.slice(0,2).toUpperCase()}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-base truncate">{user.fullName}</div>
                  <div className="text-xs text-gray-600 truncate mt-0.5">{user.email}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-300">
                Signed in as <span className="text-gray-700 font-medium">{user.fullName}</span>
              </div>
            </div>
            <div className="py-1.5">
              <button 
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-left transition-colors text-sm group"
                onClick={handleEditProfile}
              >
                <User size={16} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                <span>Your Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-left transition-colors text-sm group" onClick={() => window.location.href = '/settings'}>
                <Settings size={16} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-left transition-colors text-sm group" onClick={handleLogout}>
                <LogOut size={16} className="text-gray-500 group-hover:text-red-600 transition-colors" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        )}
        {/* Edit Profile Modal */}
        {editOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-300 shadow-2xl">
              <h3 className="text-xl font-bold mb-5 text-gray-800">Edit Profile</h3>
              <div className="mb-5 flex flex-col items-center gap-3">
                <img 
                  src={editPic || user.profilePic || 'https://ui-avatars.com/api/?name=' + (user.fullName || 'User')} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full border-2 border-gray-300 shadow-lg" 
                />
                <input 
                  type="text" 
                  className="w-full p-2.5 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-sm transition-all" 
                  placeholder="Profile picture URL" 
                  value={editPic} 
                  onChange={e => setEditPic(e.target.value)} 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-2.5 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all" 
                  value={editName} 
                  onChange={e => setEditName(e.target.value)} 
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2.5 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all" 
                  value={editEmail} 
                  onChange={e => setEditEmail(e.target.value)} 
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button 
                  className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all border border-gray-300 font-medium" 
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg shadow-blue-600/20" 
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default TopNavbar;