import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, PlayIcon, PauseIcon, ArrowPathIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

// Import images and audio
import cozyStudySpace from '../assets/music/chill beats/cozy study space.jpg';
import natureStudySpace from '../assets/music/nature/nature study space.jpg';

// Lo-fi beats playlist
import track1 from '../assets/music/chill beats/chill.mp3';
import track2 from '../assets/music/chill beats/focus.mp3';
import track3 from '../assets/music/chill beats/lofi.mp3';
import track4 from '../assets/music/chill beats/productivity.mp3';
import track5 from '../assets/music/chill beats/relax.mp3';

// Nature sounds playlist
import nature1 from '../assets/music/nature/cafe.mp3';
import nature2 from '../assets/music/nature/field.mp3';
import nature3 from '../assets/music/nature/ocean.mp3';
import nature4 from '../assets/music/nature/rainy day.mp3';
import nature5 from '../assets/music/nature/shower.mp3';
import nature6 from '../assets/music/nature/stream.mp3';

export default function StudySpace() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [activeTimer, setActiveTimer] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [error, setError] = useState('');
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Get the selected study space from localStorage
  const selectedSpace = localStorage.getItem('selectedStudySpace') || 'cozy';
  
  // Define playlists based on study space
  const playlists = {
    cozy: [track1, track2, track3, track4, track5],
    nature: [nature1, nature2, nature3, nature4, nature5, nature6]
  };
  
  // Get background image based on study space
  const backgroundImage = selectedSpace === 'cozy' ? cozyStudySpace : natureStudySpace;
  
  // Initialize audio
  useEffect(() => {
    const playlist = playlists[selectedSpace];
    if (playlist && playlist.length > 0) {
      setCurrentAudio(playlist[0]);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedSpace]);
  
  // Handle audio playback
  useEffect(() => {
    if (currentAudio) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio(currentAudio);
        audioRef.current.volume = volume;
        audioRef.current.loop = false;
        
        audioRef.current.addEventListener('ended', handleTrackEnd);
        
        if (activeTimer && !muted) {
          audioRef.current.play().catch(err => {
            setError('Audio playback failed: ' + err.message);
            console.error('Audio playback failed:', err);
          });
        }
        
        return () => {
          if (audioRef.current) {
            audioRef.current.removeEventListener('ended', handleTrackEnd);
            audioRef.current.pause();
          }
        };
      } catch (err) {
        setError('Audio initialization failed: ' + err.message);
        console.error('Audio initialization failed:', err);
      }
    }
  }, [currentAudio, activeTimer, muted, volume]);
  
  // Timer logic
  useEffect(() => {
    if (activeTimer) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          handleTimerComplete();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [activeTimer, minutes, seconds]);
  
  const handleTimerComplete = () => {
    if (isBreak) {
      // Break completed, start work time
      setMinutes(25);
      setIsBreak(false);
      setCycles(cycles + 1);
    } else {
      // Work time completed, start break
      setMinutes(cycles % 4 === 3 ? 15 : 5); // Long break every 4 cycles
      setIsBreak(true);
    }
    setSeconds(0);
    setActiveTimer(false);
  };
  
  const startTimer = () => {
    setActiveTimer(true);
  };
  
  const pauseTimer = () => {
    setActiveTimer(false);
  };
  
  const resetTimer = () => {
    setActiveTimer(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };
  
  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      if (!muted) {
        audioRef.current.pause();
      } else if (activeTimer) {
        audioRef.current.play().catch(err => {
          setError('Audio playback failed: ' + err.message);
        });
      }
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const handleTrackEnd = () => {
    const playlist = playlists[selectedSpace];
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentAudio(playlist[nextIndex]);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col overflow-hidden transition-colors duration-200 relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: darkMode ? 0.15 : 0.2,
        }}
      ></div>
      
      {/* Content */}
      <div className="z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/study-space-selection')}
            className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-colors backdrop-blur-sm"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-900 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedSpace === 'cozy' ? 'Cozy Room' : 'Forest View'} Study Space
          </h1>
          <div className="w-8"></div> {/* Empty div for balance */}
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Pomodoro Timer */}
          <div className="flex-1 bg-white/80 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg dark:shadow-gray-900/30 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {isBreak ? 'Break Time' : 'Focus Time'} 
            </h2>
            
            <div className="flex flex-col items-center">
              {/* Timer Display */}
              <div className="text-7xl font-bold text-indigo-600 dark:text-indigo-400 font-mono mb-8">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              
              {/* Timer Controls */}
              <div className="flex space-x-4 mb-8">
                {!activeTimer ? (
                  <button
                    onClick={startTimer}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
                  >
                    <PlayIcon className="h-6 w-6" />
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
                  >
                    <PauseIcon className="h-6 w-6" />
                  </button>
                )}
                
                <button
                  onClick={resetTimer}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 transition-colors"
                >
                  <ArrowPathIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Cycles */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed cycles: <span className="font-medium">{cycles}</span>
              </div>
            </div>
          </div>
          
          {/* Music Player */}
          <div className="flex-1 bg-white/80 dark:bg-dark-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg dark:shadow-gray-900/30 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {selectedSpace === 'cozy' ? 'Lo-fi Beats' : 'Nature Sounds'}
            </h2>
            
            <div className="flex flex-col items-center">
              {/* Album Art */}
              <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 bg-gray-200 dark:bg-gray-800 shadow-md">
                <img 
                  src={backgroundImage} 
                  alt="Playlist Cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Volume Controls */}
              <div className="w-full max-w-xs mb-6">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    onClick={toggleMute}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {muted ? (
                      <SpeakerXMarkIcon className="h-6 w-6" />
                    ) : (
                      <SpeakerWaveIcon className="h-6 w-6" />
                    )}
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Volume: {Math.round(volume * 100)}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Playlist Info */}
              <div className="w-full max-w-xs">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Now Playing - Track {currentTrackIndex + 1}/{playlists[selectedSpace].length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Tracks will automatically play in sequence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Tips */}
        <div className="mt-8 bg-indigo-50/80 dark:bg-indigo-900/10 backdrop-blur-sm rounded-2xl p-5 shadow-sm transition-colors duration-200">
          <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-300 mb-2">Pomodoro Tips</h3>
          <p className="text-indigo-700 dark:text-indigo-400 text-sm mb-2">
            The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
          </p>
          <ul className="list-disc pl-5 text-indigo-700 dark:text-indigo-400 text-sm space-y-1">
            <li>Focus on a single task during each 25-minute work period</li>
            <li>Take a 5-minute break after each work period</li>
            <li>After 4 work periods, take a longer 15-minute break</li>
            <li>Use the study music to help maintain focus</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 