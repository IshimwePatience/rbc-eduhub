import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import rbcLogo from '../assets/images/rbclogo.png';

const SubNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Sample course filters
  const courseFilters = [
    'All Courses',
    'Medicine',
    'Nursing',
    'Public Health',
    'Laboratory',
    'Pharmacy',
    'Radiology',
    'Surgery',
    'Pediatrics',
    'Cardiology'
  ];

  // Sample FAQ data
  const faqItems = [
    'How to apply?',
    'How much does it cost?',
    'Where is it?',
    'What is the Academic Calendar?'
  ];

  // Sample top searches
  const topSearches = [
    ['Campus', 'Schedule', 'Sports'],
    ['Tuition Fees', 'Scholarships', 'Graduate'],
    ['Application', 'Programs', 'Certificate']
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    console.log('With filters:', selectedFilters);
  };

  const toggleFilter = (filter) => {
    if (filter === 'All Courses') {
      setSelectedFilters([]);
    } else {
      setSelectedFilters(prev => 
        prev.includes(filter) 
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm relative z-10 pt-8">
        {/* Top Utility Bar */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-end space-x-6 h-10">
              <Link to="/partners" className="text-sm text-gray-700 hover:text-gray-900">
                Partners
              </Link>
              <Link to="/resources" className="text-sm text-gray-700 hover:text-gray-900">
                Resources
              </Link>
              <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">
               {/* Logo */}
            <div className="flex-shrink-0 flex items-center -mt-16">
              <Link to="/">
                <img 
                  src={rbcLogo} 
                  alt="Rwanda Biomedical Center" 
                  className="h-16 w-auto"
                />
              </Link>
            </div>

              {/* Center Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                <Link to="/getstarted" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  Get Started
                </Link>
                <Link to="/courses" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  All Courses
                </Link>
                <Link to="/categories" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  Categories
                </Link>
                <Link to="/my-learning" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  My Learning
                </Link>
                <Link to="/instructors" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  Instructors
                </Link>
                <Link to="/certificates" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  Certificates
                </Link>
                <Link to="/live-sessions" className="text-base font-medium text-gray-800 hover:text-gray-900">
                  Live Sessions
                </Link>
              </nav>

              {/* Right Side - Search Icon & Button */}
              <div className="flex items-center space-x-4">
                {/* Search Icon */}
                <button 
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>

                {/* Let's Connect Button */}
                <Link 
                  to="/contact"
                  className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200 text-sm font-medium whitespace-nowrap"
                >
                  Let's Connect
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden pb-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                <Link to="/getstarted" className="text-sm text-gray-700 hover:text-gray-900">Get Started</Link>
                <Link to="/courses" className="text-sm text-gray-700 hover:text-gray-900">All Courses</Link>
                <Link to="/categories" className="text-sm text-gray-700 hover:text-gray-900">Categories</Link>
                <Link to="/my-learning" className="text-sm text-gray-700 hover:text-gray-900">My Learning</Link>
                <Link to="/instructors" className="text-sm text-gray-700 hover:text-gray-900">Instructors</Link>
                <Link to="/certificates" className="text-sm text-gray-700 hover:text-gray-900">Certificates</Link>
                <Link to="/live-sessions" className="text-sm text-gray-700 hover:text-gray-900">Live Sessions</Link>
                <Link to="/resources" className="text-sm text-gray-700 hover:text-gray-900">Resources</Link>
                <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Search Overlay with Slide Animation */}
      <div 
        className={`fixed inset-0 bg-[#004370] z-50 overflow-y-auto transition-transform duration-300 ease-out ${
          showSearch ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setShowSearch(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-white hover:text-gray-900" />
            </button>
          </div>

          {/* Large Search Title */}
          <h1 className="text-6xl font-light text-gray-400 mb-8">Search</h1>

          {/* Search Input */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
              className="w-full px-6 py-4 pr-12 border-b-2 border-gray-300 focus:outline-none focus:border-white text-lg bg-transparent"
              autoFocus
            />
            <button 
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-100"
            >
              <Search size={24} />
            </button>
          </div>

          {/* Course Filters */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {courseFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === 'All Courses'
                      ? selectedFilters.length === 0
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : selectedFilters.includes(filter)
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">FAQ</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <button className="text-white hover:text-gray-100 text-left transition-colors">
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Searches Section */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-white mb-6">Top Searches:</h2>
              <div className="space-y-6">
                {topSearches.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-3 gap-4">
                    {row.map((search, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <button 
                          onClick={() => setSearchQuery(search)}
                          className="text-white hover:text-gray-100 transition-colors"
                        >
                          {search}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubNavbar;