import React, { useState, useRef } from 'react';
import { BookOpen, FileText, ListChecks, Video, GraduationCap, Users, BarChart2 } from 'lucide-react';
import RecentActivitySidebar from './RecentActivitySidebar';
import TopNavbar from '../navbar/TopNavbar';

const sidebarLinks = [
  { label: 'Courses', icon: BookOpen },
  { label: 'Live Sessions', icon: Video },
  { label: 'Certificates', icon: GraduationCap },
  { label: 'Students', icon: Users },
  { label: 'Analytics', icon: BarChart2 }
];

function InstructorDashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(256); // 64 * 4 = 256px (w-64)
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const sidebarRef = useRef(null);
  const minWidth = 60; // Minimum sidebar width (just icons)
  const maxWidth = 400; // Maximum sidebar width

  // When sidebarMinimized changes from TopNavbar, update sidebarWidth immediately
  React.useEffect(() => {
    if (sidebarMinimized) {
      setSidebarWidth(minWidth);
    } else {
      setSidebarWidth(256);
    }
  }, [sidebarMinimized]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth);
      // Auto-minimize if width is below threshold
      if (newWidth < 150) {
        setSidebarMinimized(true);
      } else {
        setSidebarMinimized(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar sidebarMinimized={sidebarMinimized} setSidebarMinimized={setSidebarMinimized} />
      <div className="flex flex-1">
        {/* Sidebar with resize handle */}
        <div className="relative flex">
          <aside 
            ref={sidebarRef}
            className="bg-white border-r border-gray-400 flex flex-col py-8 transition-all duration-300"
            style={{ 
              width: sidebarMinimized ? minWidth : sidebarWidth,
              minWidth: minWidth,
              maxWidth: maxWidth
            }}
          >
            <nav className="flex-1 px-2">
              <ul className="space-y-4">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <button 
                        className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-gray-800 group hover:bg-stone-200 hover:text-gray-900 transition-all"
                        title={sidebarMinimized ? link.label : ''}
                      >
                        <Icon 
                          size={20} 
                          className="text-gray-600 group-hover:text-gray-900 transition-colors flex-shrink-0" 
                        />
                        {!sidebarMinimized && (
                          <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            {link.label}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          {/* Resize Handle */}
          <div
            className="w-1 cursor-col-resize hover:bg-blue-400 active:bg-blue-600 transition-colors relative group"
            onMouseDown={handleMouseDown}
            style={{
              backgroundColor: isResizing ? '#2563eb' : 'transparent',
            }}
          >
            {/* Visual indicator on hover */}
            <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-200/50 transition-colors"></div>
          </div>
        </div>
        {/* Main Content */}
        <main className="flex-1 px-10 py-8 overflow-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Instructor Dashboard</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Example Section: Courses */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-[#004370] mb-4">Your Courses</h2>
              {/* Course cards/components will go here */}
              <div className="text-gray-700">No courses yet.</div>
            </section>
            {/* Example Section: Analytics */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-[#004370] mb-4">Analytics</h2>
              {/* Analytics widgets/components will go here */}
              <div className="text-gray-700">No analytics data yet.</div>
            </section>
          </div>
        </main>
        {/* Right Panel: Recent Activities */}
        <aside className="hidden xl:block w-80 p-6">
          <RecentActivitySidebar />
        </aside>
      </div>
    </div>
  );
}

export default InstructorDashboard;