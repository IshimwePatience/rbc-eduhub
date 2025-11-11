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
            <Link 
              to="/Getstarted" 
              className="flex items-center space-x-2 px-3 py-1 hover:border-l-2 hover:border-r-2 hover:border-dotted hover:border-blue-600 transition-all"
            >
              <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' className="w-6 h-6">
                <circle cx='50' cy='50' r='50' fill='#0969da'/>
                <path d='M 50 15 C 32 15, 20 27, 20 42 C 20 49, 23 53, 28 59 L 28 67 C 28 70, 30 72, 33 72 L 67 72 C 70 72, 72 70, 72 67 L 72 59 C 77 53, 80 49, 80 42 C 80 27, 68 15, 50 15 Z' fill='white' stroke='#e0e0e0' strokeWidth='2'/>
                <rect x='40' y='72' width='20' height='4' fill='#bbb' rx='1'/>
                <rect x='40' y='77' width='20' height='4' fill='#bbb' rx='1'/>
                <rect x='42' y='82' width='16' height='5' fill='#aaa' rx='1.5'/>
                <path d='M 28 35 L 28 55 M 28 35 L 36 35 Q 39 35, 39 39 Q 39 43, 36 43 L 28 43 M 36 43 L 39 55' fill='none' stroke='#4A90E2' strokeWidth='5' strokeLinecap='round' strokeLinejoin='round'/>
                <path d='M 43 35 L 43 55 M 43 35 L 51 35 Q 54 35, 54 38.5 Q 54 42, 51 42 L 43 42 M 43 42 L 52 42 Q 56 42, 56 47.5 Q 56 53, 52 53 L 43 53' fill='none' stroke='#F5B800' strokeWidth='5' strokeLinecap='round' strokeLinejoin='round'/>
                <path d='M 72 35 Q 62 35, 62 45 Q 62 55, 72 55' fill='none' stroke='#50C878' strokeWidth='5' strokeLinecap='round'/>
              </svg>
            </Link>

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