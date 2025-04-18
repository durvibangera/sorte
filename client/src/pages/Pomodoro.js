import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ForwardIcon,
  BackwardIcon
} from '@heroicons/react/24/outline';

// Import background images
import cozyBg from '../assets/music/chill beats/cozy study space.jpg';
import natureBg from '../assets/music/nature/nature study space.jpg';

export default function Pomodoro() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work');
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [stats, setStats] = useState({
    workMinutes: 0,
    breakMinutes: 0
  });
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(localStorage.getItem('selectedStudySpace') || 'cozy');
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  const durations = {
    work: [15, 25, 30, 45, 60],
    break: [5, 10, 15, 20, 30]
  };

  // Background and playlist based on selected space
  const backgrounds = {
    cozy: cozyBg,
    nature: natureBg
  };

  const playlists = {
    cozy: [
      { name: 'Chill', path: require('../assets/music/chill beats/chill.mp3') },
      { name: 'Focus', path: require('../assets/music/chill beats/focus.mp3') },
      { name: 'Lofi', path: require('../assets/music/chill beats/lofi.mp3') },
      { name: 'Productivity', path: require('../assets/music/chill beats/productivity.mp3') },
      { name: 'Relax', path: require('../assets/music/chill beats/relax.mp3') }
    ],
    nature: [
      { name: 'Cafe Ambience', path: require('../assets/music/nature/cafe.mp3') },
      { name: 'Ocean Waves', path: require('../assets/music/nature/ocean.mp3') },
      { name: 'Rainy Day', path: require('../assets/music/nature/rainy day.mp3') },
      { name: 'Field Sounds', path: require('../assets/music/nature/field.mp3') },
      { name: 'Shower Sounds', path: require('../assets/music/nature/shower.mp3') },
      { name: 'Gentle Stream', path: require('../assets/music/nature/stream.mp3') }
    ]
  };

  // Initialize or redirect if no space is selected
  useEffect(() => {
    const space = localStorage.getItem('selectedStudySpace');
    if (!space) {
      navigate('/study-space-selection');
    } else {
      setSelectedSpace(space);
      
      // Preload the background image
      const img = new Image();
      img.src = backgrounds[space];
      img.onload = () => setBackgroundLoaded(true);
    }
  }, [navigate]);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        // Update stats every minute
        if (timeLeft % 60 === 0) {
          setStats(prev => ({
            ...prev,
            [mode + 'Minutes']: prev[mode + 'Minutes'] + 1
          }));
        }
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio('/notification.mp3');
      audio.play();
      
      // Add remaining minutes to stats when timer completes
      setStats(prev => ({
        ...prev,
        [mode + 'Minutes']: prev[mode + 'Minutes'] + Math.ceil(selectedDuration)
      }));

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
  }, [isRunning, timeLeft, mode, selectedDuration]);

  // Audio management
  const audioRef = useState(() => new Audio())[0];

  useEffect(() => {
    if (selectedSpace && playlists[selectedSpace] && playlists[selectedSpace][currentTrack]) {
      audioRef.src = playlists[selectedSpace][currentTrack].path;
      audioRef.volume = volume / 100;
      
      if (isPlaying) {
        const playPromise = audioRef.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio:", error);
          });
        }
      }
    }
    
    return () => {
      audioRef.pause();
    };
  }, [audioRef, selectedSpace, currentTrack, isPlaying]);

  // Handle volume changes
  useEffect(() => {
    audioRef.volume = volume / 100;
    audioRef.muted = isMuted;
  }, [audioRef, volume, isMuted]);

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

  const formatHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes}m`;
    }
    return remainingMinutes === 0 ? `${hours}h` : `${hours}h ${remainingMinutes}m`;
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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (selectedSpace && playlists[selectedSpace]) {
      setCurrentTrack(prev => (prev + 1) % playlists[selectedSpace].length);
    }
  };

  const previousTrack = () => {
    if (selectedSpace && playlists[selectedSpace]) {
      setCurrentTrack(prev => (prev - 1 + playlists[selectedSpace].length) % playlists[selectedSpace].length);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(50);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const changeStudySpace = () => {
    navigate('/study-space-selection');
  };

  // Background style
  const backgroundStyle = {
    backgroundImage: `url(${backgrounds[selectedSpace]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: backgroundLoaded ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out'
  };

  console.log("Selected space:", selectedSpace);
  console.log("Background image:", backgrounds[selectedSpace]);

  return (
    <>
      {/* Background with image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={backgroundStyle}
      >
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Fallback background in case image fails to load */}
      <div className={`fixed inset-0 w-full h-full z-[-1] bg-gray-900`}></div>

      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate('/')}
                className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-white">{selectedSpace === 'cozy' ? 'Cozy Room' : 'Nature Study'}</h1>
              <button
                onClick={changeStudySpace}
                className="p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <AdjustmentsHorizontalIcon className="h-6 w-6" />
              </button>
            </div>

            {/* iPod-style Timer Component */}
            <div className="bg-white/10 backdrop-blur-sm shadow-xl rounded-3xl p-8 mb-8 transition-colors duration-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-medium text-white">Pomodoro Timer</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={switchMode}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <span className="mr-2">{mode === 'work' ? '💼' : '☕'}</span>
                    {mode === 'work' ? 'Work' : 'Break'}
                  </button>
                  <button
                    onClick={() => setShowAudioPlayer(!showAudioPlayer)}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <MusicalNoteIcon className="h-5 w-5 mr-2" />
                    Music
                  </button>
                </div>
              </div>

              {/* Circular Timer Display */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className={`absolute inset-0 rounded-full ${
                  mode === 'work' 
                    ? 'bg-white/20'
                    : 'bg-white/15'
                } flex items-center justify-center transition-colors duration-200`}>
                  <div className="text-center">
                    <div className="text-6xl font-mono font-bold mb-2 text-white">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-lg font-medium text-white/90 capitalize">
                      {mode} Session
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Selector */}
              <div className="flex items-center justify-center mb-8">
                <button
                  onClick={() => handleDurationChange('prev')}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <span className="mx-4 text-lg font-medium text-white">
                  {selectedDuration} minutes
                </span>
                <button
                  onClick={() => handleDurationChange('next')}
                  className="p-2 rounded-full hover:bg-white/10 text-white"
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
                      ? 'bg-white/20 hover:bg-white/30'
                      : 'bg-white/15 hover:bg-white/25'
                  } focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors`}
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
                  className="inline-flex items-center px-6 py-3 border border-white/30 text-base font-medium rounded-full text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Reset
                </button>
              </div>

              {/* Audio Player */}
              {showAudioPlayer && (
                <div className="mt-8 p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Now Playing:</h3>
                    <p className="text-white/80 text-sm">
                      {selectedSpace && playlists[selectedSpace] && playlists[selectedSpace][currentTrack]
                        ? playlists[selectedSpace][currentTrack].name
                        : 'Loading...'}
                    </p>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={previousTrack}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                    >
                      <BackwardIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={togglePlayPause}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-white"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                    <button
                      onClick={nextTrack}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                    >
                      <ForwardIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white"
                    >
                      {isMuted ? (
                        <SpeakerXMarkIcon className="h-5 w-5" />
                      ) : (
                        <SpeakerWaveIcon className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-sm shadow rounded-2xl p-6 mb-8 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-6">
                <ClockIcon className="h-6 w-6 text-white/80" />
                <h2 className="text-xl font-medium text-white">Today's Progress</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatHours(stats.workMinutes)}
                  </div>
                  <div className="text-sm text-white/80">
                    Study Time
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/10">
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatHours(stats.breakMinutes)}
                  </div>
                  <div className="text-sm text-white/80">
                    Break Time
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Settings */}
            <div className="bg-white/10 backdrop-blur-sm shadow rounded-2xl p-6 grid grid-cols-2 gap-4 transition-colors duration-200">
              <div className="p-4 rounded-xl bg-white/10">
                <h3 className="font-medium text-white mb-2">Work Sessions</h3>
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
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {duration}m
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/10">
                <h3 className="font-medium text-white mb-2">Break Sessions</h3>
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
                          ? 'bg-white/30 text-white'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
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
    </>
  );
} 