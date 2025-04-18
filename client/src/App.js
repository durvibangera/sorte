import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Pomodoro from './pages/Pomodoro';
import { Login, Register } from './pages/Auth';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [user] = useState({
    name: 'duvi',
    school: 'DJSCE',
    yearLevel: 'SY',
    birthday: '12-09-2005',
  });

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 flex">
          {/* Sidebar Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/settings" element={<Settings user={user} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
