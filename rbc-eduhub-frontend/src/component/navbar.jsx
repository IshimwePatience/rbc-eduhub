// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [showHelpText, setShowHelpText] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Super Admin auth pages
  const isSuperAdminAuth = location?.pathname.startsWith('/superadminregistration');
  const hidePublicCTAs = isSuperAdminAuth;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="bg-[#004370] shadow-md border-b-4 border-blue-500 fixed top-0 left-0 right-0 z-[9999]">
        <div className="w-full px-3 sm:px-3 lg:px-3">
          <div className="flex justify-between items-center h-8">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {isSuperAdminAuth ? (
                  <>
                    <Link to="/superadminregistration/login" className="text-white hover:text-blue-600 font-medium transition-colors">Login</Link>
                    <Link to="/superadminregistration" className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700 transition-colors font-medium">Register</Link>
                    <Link to="/superadminregistration/forgot-password" className="text-white hover:text-blue-600 font-medium transition-colors">Forgot Password</Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white hover:text-blue-600 font-medium transition-colors">Login</Link>
                    <Link to="/signup" className="bg-blue-600 text-white px-4 py-1 hover:bg-blue-700 transition-colors font-medium">Sign Up</Link>
                  </>
                )}
              </div>

              <div 
                className="relative"
                onMouseEnter={() => setShowHelpText(true)}
                onMouseLeave={() => setShowHelpText(false)}
              >
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <HelpCircle size={24} />
                </button>
                
                {showHelpText && (
                  <div className="absolute right-0 top-full mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
                    Help
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-blue-600 transform rotate-45"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-blue-600 relative z-[101]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* Desktop-only institution CTA in right corner */}
            {!hidePublicCTAs && (
              <div className="hidden md:flex items-center absolute right-4 top-1">
                <Link
                  to="/register-institution"
                  className="text-white bg-transparent hover:text-yellow-300 font-medium px-3 py-1 rounded text-sm"
                >
                  or Manage your institution
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[99]">
          <div className="flex flex-col items-start justify-start h-full space-y-6 px-8 pt-24">
            {isSuperAdminAuth ? (
              <>
                <Link to="/superadminregistration/login" className="text-gray-800 hover:text-blue-600 font-semibold transition-all duration-300 text-3xl hover:translate-x-2 w-full py-3 border-b border-gray-200" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/superadminregistration" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-3xl rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                <Link to="/superadminregistration/forgot-password" className="mt-2 w-full text-3xl text-gray-800 hover:text-yellow-500 font-semibold transition-all duration-300 text-left py-3" onClick={() => setIsMobileMenuOpen(false)}>Forgot Password</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-600 font-semibold transition-all duration-300 text-3xl hover:translate-x-2 w-full py-3 border-b border-gray-200" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-3xl rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                <Link to="/register-institution" className="mt-2 w-full text-3xl text-gray-800 hover:text-yellow-500 font-semibold transition-all duration-300 text-left py-3" onClick={() => setIsMobileMenuOpen(false)}>Create account for your institution</Link>
              </>
            )}
            <button className="flex items-center space-x-4 text-gray-600 hover:text-blue-600 font-semibold text-3xl transition-all duration-300 hover:translate-x-2 w-full py-3 border-b border-gray-200" onClick={() => setIsMobileMenuOpen(false)}>
              <HelpCircle size={32} strokeWidth={2.5} />
              <span>Help</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;