import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Task Management",
      description: "Keep track of all your tasks and deadlines in one place with our intuitive task management system.",
      icon: "📝"
    },
    {
      title: "Course Organization",
      description: "Organize your courses, assignments, and study materials with ease.",
      icon: "📚"
    },
    {
      title: "Study Spaces",
      description: "Choose from different study environments with curated playlists to enhance your focus.",
      icon: "🎧"
    },
    {
      title: "Pomodoro Timer",
      description: "Boost your productivity with our customizable Pomodoro timer to manage work and break sessions.",
      icon: "⏱️"
    },
    {
      title: "Schedule Planner",
      description: "Plan your weekly schedule with our easy-to-use visual calendar.",
      icon: "📅"
    },
    {
      title: "Dark Mode",
      description: "Study comfortably day or night with our eye-friendly dark mode.",
      icon: "🌙"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Minimal top navigation */}
      <nav className="bg-white dark:bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-medium text-gray-800 dark:text-gray-200">Sorté</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-500" />
                )}
              </button>
              
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Log in
              </Link>
              
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Register
              </Link>
            </div>
            
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleDarkMode}
                className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Minimal hero section */}
      <div className="flex flex-col items-center justify-center px-4 text-center min-h-[70vh]">
        <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl mb-2 text-gray-900 dark:text-white">Sorté</h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-md">
          A minimal, elegant productivity platform for students
        </p>
        <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/register"
            className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>

      {/* Features section with minimal design */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-light text-gray-900 dark:text-white">Features</h2>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-5 transform transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </span>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple footer */}
      <footer className="bg-white dark:bg-gray-900 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2023 Sorté, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 