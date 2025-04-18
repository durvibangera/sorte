import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  LightBulbIcon,
  SunIcon,
  MoonIcon 
} from '@heroicons/react/24/outline';

export default function Settings({ user }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [selectedColor, setSelectedColor] = useState('bg-blue-100');
  const [selectedLogo, setSelectedLogo] = useState('ssc');

  const colors = [
    { name: 'gray', class: 'bg-gray-100' },
    { name: 'pink', class: 'bg-pink-100' },
    { name: 'blue', class: 'bg-blue-100' },
    { name: 'purple', class: 'bg-purple-100' },
    { name: 'green', class: 'bg-green-100' },
    { name: 'yellow', class: 'bg-yellow-100' },
    { name: 'orange', class: 'bg-orange-100' }
  ];

  const logos = [
    { id: 'upload', name: 'Upload a custom logo', image: null },
    { id: 'student', name: 'Student ID', image: '/logos/student.png' },
    { id: 'ssc', name: 'Struggling Students Club', image: '/logos/ssc.png' },
    { id: 'scholar', name: 'Scholar Me Senpai', image: '/logos/scholar.png' },
    { id: 'academic', name: 'Academic Slayer', image: '/logos/academic.png' },
    { id: 'victim', name: 'Academic Victim', image: '/logos/victim.png' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">Appearance</h2>
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-4 border-b dark:border-gray-700">
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

        {/* Color Selection */}
        <div className="mt-6">
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Theme Color</h3>
          <div className="flex gap-4">
            {colors.map(color => (
              <button
                key={color.name}
                className={`w-12 h-12 rounded-full ${color.class} ${
                  selectedColor === color.class 
                    ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-dark-card' 
                    : ''
                }`}
                onClick={() => setSelectedColor(color.class)}
              />
            ))}
          </div>
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

      {/* ID Card Settings */}
      <div className="bg-white dark:bg-dark-card shadow rounded-lg p-6 transition-colors duration-200">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">ID Card</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {logos.map(logo => (
            <button
              key={logo.id}
              className={`aspect-video border rounded-xl p-4 flex items-center justify-center ${
                selectedLogo === logo.id 
                  ? 'ring-2 ring-indigo-500 border-transparent' 
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-hover'
              } transition-colors`}
              onClick={() => setSelectedLogo(logo.id)}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">{logo.name}</span>
            </button>
          ))}
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