// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, HelpCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [showHelpText, setShowHelpText] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-50 shadow-md border-b-4 border-blue-500 fixed top-0 left-0 right-0 z-[60]">
        <div className="w-full px-3 sm:px-3 lg:px-3">
          <div className="flex justify-between items-center h-8">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
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
                  <div className="absolute right-0 top-full mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg animate-slideDown">
                    Help
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-blue-600 transform rotate-45"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600 z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>

      {/* Mobile Menu - Fullscreen Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 animate-slideDown">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 transition-colors font-medium text-2xl rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <button 
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium text-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle size={28} />
              <span>Help</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;