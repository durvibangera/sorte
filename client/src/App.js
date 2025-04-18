import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Pomodoro from './pages/Pomodoro';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { ThemeProvider } from './context/ThemeContext';
import StudySpace from './pages/StudySpace';
import StudySpaceSelection from './pages/StudySpaceSelection';
import Landing from './pages/Landing';

// Wrapper component to manage navigation display based on route
function AppContent() {
  const [user] = useState({
    name: 'duvi',
    school: 'DJSCE',
    yearLevel: 'SY',
    birthday: '12-09-2005',
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  
  // Don't show navigation on landing page, login, or register pages
  const hideNavigation = location.pathname === '/' || 
                          location.pathname === '/login' || 
                          location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 flex">
      {/* Sidebar Navigation - only hide on landing/auth pages */}
      {!hideNavigation && <Navigation />}
      
      {/* Main Content */}
      <div className={`flex-1 ${!hideNavigation ? 'p-8' : 'p-0'}`}>
        <div className="max-w-7xl mx-auto">
          <Routes>
            {/* Landing page as default route */}
            <Route path="/" element={<Landing />} />
            
            {/* Protected routes (should check authentication) */}
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/study-space/:space" element={<StudySpace />} />
            <Route path="/study-space-selection" element={<StudySpaceSelection />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename="/sorte">
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
