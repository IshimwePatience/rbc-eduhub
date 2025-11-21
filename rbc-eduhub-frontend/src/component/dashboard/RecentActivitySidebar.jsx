import React from 'react';

const activities = [
  {
    time: '17 hours ago',
    text: 'Quick access to the pull request description now in the "Files..."',
  },
  {
    time: '17 hours ago',
    text: 'GitHub Actions cache size can now exceed 10 GB per...',
  },
  {
    time: '19 hours ago',
    text: 'Linter integration with Copilot code review now in public...',
  },
  {
    time: 'Yesterday',
    text: 'Enterprise bring your own key (BYOK) for GitHub Copilot is...',
  },
];

function RecentActivitySidebar() {
  return (
    <aside
      className="w-80 bg-gray-200 border border-gray-300 rounded-xl p-6 shadow-lg text-gray-800 flex flex-col gap-6"
      style={{ marginLeft: '-40px', zIndex: 10, position: 'relative' }}
    >
      <div>
        <h2 className="text-lg font-bold mb-8">Latest from our changelog</h2>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1.5 top-2 bottom-0 w-0.5 bg-gray-400" style={{zIndex: 0}}></div>
          
          {activities.map((activity, idx) => (
            <div key={idx} className="mb-8 flex gap-6 relative" style={{zIndex: 1}}>
              {/* Dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="w-3 h-3 rounded-full bg-gray-500" style={{zIndex: 2}}></span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-600 mb-1">{activity.time}</div>
                <div className="text-sm text-gray-700 leading-snug">{activity.text}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="text-gray-600 text-sm font-semibold hover:text-gray-800 mt-6 inline-block">View changelog →</a>
      </div>
    </aside>
  );
}

export default RecentActivitySidebar;