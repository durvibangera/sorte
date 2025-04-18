import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function Settings({ user, setIsLoggedIn }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    
    // Update login state
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }
    
    // Redirect to landing page
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Appearance</h2>
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {darkMode ? (
              <MoonIcon className="h-6 w-6 text-indigo-500" />
            ) : (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            )}
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {darkMode ? 'Easy on the eyes' : 'Classic light mode'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-6">
          <BellIcon className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Push Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about important updates</p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-6">
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">Account</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Logout</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign out from your account</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-6">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-medium text-red-500">Danger Zone</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white">Delete Account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permanently remove your account and all data</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 