import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Facebook, Instagram, Youtube, ChevronDown } from 'lucide-react';

function Footer() {
  const [openSections, setOpenSections] = useState({
    learning: false,
    resources: false,
    about: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-stone-200 text-gray-900 py-6 md:py-6 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-2 w-full">
        
        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden lg:grid grid-cols-4 gap-6 xl:gap-8 mb-4">
          
          {/* Company Info & Locations */}
          <div className="min-w-0">
             <h3 className="text-xl md:text-2xl font-proxima font-bold mb-4 md:mb-6 text-gray-900">RBC EduHub <span className="text-blue-600 font-bold">.</span></h3>
            
            <div className="space-y-3 xl:space-y-4 text-sm">
              <div>
                 <h4 className="font-semibold font-proxima  mb-2 text-gray-900">Rwanda Office</h4>
                <p className="text-gray-900 font-proxima  leading-relaxed">KG 644 St, Kigali,</p>
                <p className="text-gray-900 font-proxima ">Kimihurura | Kigali | Rwanda</p>
                 <p className="text-gray-900 font-proxima ">P.O. Box 7162 Kigali, Rwanda</p>
              </div>
            </div>
          </div>

          {/* Learning Column */}
          <div className="min-w-0">
            <h4 className="font-bold font-proxima  mb-4 text-gray-900">Learning</h4>
            <ul className="space-y-3 text-sm font-proxima text-gray-900">
              <li>
                <Link to="/Getstarted" className="hover:text-blue-400 transition-colors inline-block">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-400 transition-colors inline-block">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition-colors inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/my-learning" className="hover:text-blue-400 transition-colors inline-block">
                  My Learning
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-blue-400 transition-colors inline-block">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="min-w-0">
            <h4 className="font-bold font-proxima  mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-3 text-sm font-proxima  text-gray-900">
              <li>
                <Link to="/instructors" className="hover:text-blue-400 transition-colors inline-block">
                  Instructors
                </Link>
              </li>
              <li>
                <Link to="/live-sessions" className="hover:text-blue-400 transition-colors inline-block">
                  Live Sessions
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-blue-400 transition-colors inline-block">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="min-w-0">
            <h4 className="font-bold font-proxima mb-4 text-gray-900">About Us</h4>
            <ul className="space-y-3 text-sm text-gray-900">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors inline-block">
                  About
                </Link>
              </li>
            </ul>

            <div className="mt-6 xl:mt-8">
              <h4 className="font-bold font-proxima  mb-4 text-gray-900">Contact Us</h4>
              <Link to="/contact" className="text-sm font-proxima text-gray-900 hover:text-blue-400 transition-colors inline-block">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Collapsible Sections */}
        <div className="lg:hidden mb-8 md:mb-12">
          
          {/* Company Info - Always Visible */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">RBC EduHub <span className="text-blue-600 font-bold">.</span></h3>
            <div className="space-y-3 md:space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">Rwanda Office</h4>
                <p className="text-gray-900 leading-relaxed">KG 644 St, Kigali,</p>
                <p className="text-gray-900">Kimihurura | Kigali | Rwanda</p>
                 <p className="text-gray-900">P.O. Box 7162 Kigali, Rwanda</p>
              </div>
            </div>
          </div>

          {/* Learning Section */}
          <div className="border-b border-gray-700 py-1">
            <button
              onClick={() => toggleSection('learning')}
              className="w-full flex justify-between items-center py-3 md:py-4 text-left focus:outline-none touch-manipulation"
              aria-expanded={openSections.learning}
            >
              <h4 className="font-bold text-base md:text-lg text-gray-900">Learning</h4>
              <ChevronDown 
                size={20} 
                className={`transform transition-transform duration-200 text-gray-900 flex-shrink-0 ml-2 ${openSections.learning ? 'rotate-180' : ''}`}
              />
            </button>
            {openSections.learning && (
              <ul className="pb-3 md:pb-4 space-y-2 md:space-y-3 text-sm text-gray-900">
                <li>
                  <Link to="/Getstarted" className="hover:text-blue-400 transition-colors block py-1">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-blue-400 transition-colors block py-1">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-blue-400 transition-colors block py-1">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/my-learning" className="hover:text-blue-400 transition-colors block py-1">
                    My Learning
                  </Link>
                </li>
                <li>
                  <Link to="/certificates" className="hover:text-blue-400 transition-colors block py-1">
                    Certificates
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Resources Section */}
          <div className="border-b border-gray-700 py-1">
            <button
              onClick={() => toggleSection('resources')}
              className="w-full flex justify-between items-center py-3 md:py-4 text-left focus:outline-none touch-manipulation"
              aria-expanded={openSections.resources}
            >
              <h4 className="font-bold text-base md:text-lg text-gray-900">Resources</h4>
              <ChevronDown 
                size={20} 
                className={`transform transition-transform duration-200 text-gray-900 flex-shrink-0 ml-2 ${openSections.resources ? 'rotate-180' : ''}`}
              />
            </button>
            {openSections.resources && (
              <ul className="pb-3 md:pb-4 space-y-2 md:space-y-3 text-sm text-gray-900">
                <li>
                  <Link to="/instructors" className="hover:text-blue-400 transition-colors block py-1">
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link to="/live-sessions" className="hover:text-blue-400 transition-colors block py-1">
                    Live Sessions
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-blue-400 transition-colors block py-1">
                    Resources
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* About Us Section */}
          <div className="border-b border-gray-700 py-1">
            <button
              onClick={() => toggleSection('about')}
              className="w-full flex justify-between items-center py-3 md:py-4 text-left focus:outline-none touch-manipulation"
              aria-expanded={openSections.about}
            >
              <h4 className="font-bold text-base md:text-lg text-gray-900">About Us</h4>
              <ChevronDown 
                size={20} 
                className={`transform transition-transform duration-200 text-gray-900 flex-shrink-0 ml-2 ${openSections.about ? 'rotate-180' : ''}`}
              />
            </button>
            {openSections.about && (
              <div className="pb-3 md:pb-4 space-y-4 md:space-y-6">
                <ul className="space-y-2 md:space-y-3 text-sm text-gray-900">
                  <li>
                    <Link to="/about" className="hover:text-blue-400 transition-colors block py-1">
                      About
                    </Link>
                  </li>
                </ul>

                <div>
                  <h5 className="font-bold mb-2 text-gray-900">Contact Us</h5>
                  <Link to="/contact" className="text-sm text-gray-900 hover:text-blue-400 transition-colors inline-block">
                    Let's Connect
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap gap-4 md:gap-6 pt-4 md:pt-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="X">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="YouTube">
            <Youtube size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 text-xs md:text-sm text-gray-400">
          <p className="text-center">© {new Date().getFullYear()} Rwanda Biomedical Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;