import { useState, useEffect } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const [selectedDuration, setSelectedDuration] = useState(25);

  const durations = {
    work: [15, 25, 30, 45, 60],
    break: [5, 10, 15, 20, 30]
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio('/notification.mp3');
      audio.play();
      
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
        setSelectedDuration(5);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
        setSelectedDuration(25);
      }
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleDurationChange = (direction) => {
    const currentIndex = durations[mode].indexOf(selectedDuration);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % durations[mode].length;
    } else {
      newIndex = (currentIndex - 1 + durations[mode].length) % durations[mode].length;
    }
    
    const newDuration = durations[mode][newIndex];
    setSelectedDuration(newDuration);
    setTimeLeft(newDuration * 60);
    setIsRunning(false);
  };

  const switchMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    const defaultDuration = newMode === 'work' ? 25 : 5;
    setSelectedDuration(defaultDuration);
    setTimeLeft(defaultDuration * 60);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* iPod-style Timer Component */}
          <div className="bg-white dark:bg-dark-card shadow-xl rounded-3xl p-8 mb-8 transition-colors duration-200">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pomodoro Timer</h1>
              <button
                onClick={switchMode}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-dark-hover text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Switch to {mode === 'work' ? 'Break' : 'Work'}
              </button>
            </div>

            {/* Circular Timer Display */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className={`absolute inset-0 rounded-full ${
                mode === 'work' 
                  ? 'bg-indigo-100 dark:bg-indigo-900/30' 
                  : 'bg-green-100 dark:bg-green-900/30'
              } flex items-center justify-center transition-colors duration-200`}>
                <div className="text-center">
                  <div className={`text-6xl font-mono font-bold mb-2 ${
                    mode === 'work' 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-lg font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {mode} Session
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => handleDurationChange('prev')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-600 dark:text-gray-400"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <span className="mx-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                {selectedDuration} minutes
              </span>
              <button
                onClick={() => handleDurationChange('next')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover text-gray-600 dark:text-gray-400"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleTimer}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white ${
                  mode === 'work' 
                    ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600' 
                    : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-dark-bg ${
                  mode === 'work' ? 'focus:ring-indigo-500' : 'focus:ring-green-500'
                } transition-colors`}
              >
                {isRunning ? (
                  <>
                    <PauseIcon className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={resetTimer}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-dark-bg focus:ring-gray-500 transition-colors"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="bg-white dark:bg-dark-card shadow rounded-2xl p-6 grid grid-cols-2 gap-4 transition-colors duration-200">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
              <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-2">Work Sessions</h3>
              <div className="flex flex-wrap gap-2">
                {durations.work.map(duration => (
                  <button
                    key={duration}
                    onClick={() => {
                      if (mode === 'work') {
                        setSelectedDuration(duration);
                        setTimeLeft(duration * 60);
                        setIsRunning(false);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      mode === 'work' && selectedDuration === duration
                        ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                        : 'bg-white dark:bg-dark-card text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                    }`}
                  >
                    {duration}m
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">Break Sessions</h3>
              <div className="flex flex-wrap gap-2">
                {durations.break.map(duration => (
                  <button
                    key={duration}
                    onClick={() => {
                      if (mode === 'break') {
                        setSelectedDuration(duration);
                        setTimeLeft(duration * 60);
                        setIsRunning(false);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      mode === 'break' && selectedDuration === duration
                        ? 'bg-green-600 dark:bg-green-500 text-white'
                        : 'bg-white dark:bg-dark-card text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40'
                    }`}
                  >
                    {duration}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 