import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import SubNavbar from './component/subnavbar';
import Getstarted from './component/landingpages/Getstarted';
import About from './component/landingpages/About';
import Contact from './component/landingpages/Contact';
import Login from './component/auth/Login';
import Footer from './component/footer';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Show offline banner when no internet */}
        {!isOnline && (
          <div className="bg-gray-800 text-white text-center py-2 text-sm">
            You are offline. Some features may not work.
          </div>
        )}
        
        <Navbar />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/Getstarted" element={
              <>
                <SubNavbar />
                <Getstarted />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <SubNavbar />
                <About />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <SubNavbar />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <>
                <SubNavbar />
                <Getstarted />
                <Footer />
              </>
            } />
          </Routes>
        </div>
        
        <style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;