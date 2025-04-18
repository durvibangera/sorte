import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  FolderIcon, 
  CalendarIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ClockIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { to: '/home', icon: HomeIcon, label: 'Home' },
    { to: '/courses', icon: FolderIcon, label: 'Course' },
    { to: '/schedule', icon: CalendarIcon, label: 'Schedule' },
    { to: '/pomodoro', icon: ClockIcon, label: 'Pomodoro' },
    { to: '/study-space-selection', icon: AcademicCapIcon, label: 'Study Space' },
    { to: '/profile', icon: UserIcon, label: 'Profile' },
    { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  const shouldShow = isOpen || isHovered;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger Menu Button */}
      <button
        className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-dark-card shadow-md hover:bg-gray-50 dark:hover:bg-dark-hover lg:hover:bg-white dark:lg:hover:bg-dark-card transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {shouldShow ? (
          <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Navigation Sidebar */}
      <nav 
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-700 z-20 transition-all duration-300 ${
          shouldShow ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sorté</h1>
          </div>
          <div className="space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-6 w-6" />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation; 