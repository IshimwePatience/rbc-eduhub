// SubNavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import rbcLogo from '../assets/images/rbclogo.png';

const SubNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Logo and Slogan Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Logo and Text */}
          <div className="flex items-center space-x-6">
            <img 
              src={rbcLogo} 
              alt="Rwanda Biomedical Center" 
              className="h-20 w-auto"
            />
            <div className="border-l-2 border-gray-300 pl-6">
              <h1 className="text-3xl font-bold text-gray-800">Rwanda Biomedical Centre</h1>
              <p className="text-base text-gray-600 italic mt-1">Excellence in Learning, Excellence in Healthcare</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#061c30] text-white">
          <div className="flex space-x-1 overflow-x-auto">
            <Link 
              to="/Getstarted" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Get Started
            </Link>
            <Link 
              to="/courses" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              All Courses
            </Link>
            <Link 
              to="/categories" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Categories
            </Link>
            <Link 
              to="/my-learning" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              My Learning
            </Link>
            <Link 
              to="/instructors" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Instructors
            </Link>
            <Link 
              to="/certificates" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Certificates
            </Link>
            <Link 
              to="/live-sessions" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Live Sessions
            </Link>
            <Link 
              to="/resources" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              About
            </Link>
             <Link 
              to="/contact" 
              className="px-6 py-3 hover:bg-gray-700 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Let's Connect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;