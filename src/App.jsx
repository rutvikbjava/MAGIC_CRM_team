import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagicBackground from './components/MagicBackground';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AllStartups from './components/AllStartups';
import InactiveStartups from './components/InactiveStartups';
import SMCScheduling from './components/SMCScheduling';
import OneOnOneScheduling from './components/OneOnOneScheduling';
import Onboarded from './components/Onboarded';
import Graduated from './components/Graduated';
import Rejected from './components/Rejected';
import Settings from './components/Settings';
import LandingPageEditor from './components/LandingPageEditor';
import { storage } from './utils/storage';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'guest'
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const session = storage.get('adminSession');
    if (session && session.isLoggedIn) {
      setIsLoggedIn(true);
      setUserRole(session.role || 'admin');
      setShowLanding(false);
    }
    
    const savedDarkMode = storage.get('darkMode', false);
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = (username, password) => {
    // Admin login
    if (username === 'admin' && password === 'magic2024') {
      storage.set('adminSession', { isLoggedIn: true, role: 'admin', timestamp: Date.now() });
      setIsLoggedIn(true);
      setUserRole('admin');
      setShowLanding(false);
      return true;
    }
    
    // Guest login - check against stored guests
    const guests = storage.get('guests', []);
    const guest = guests.find(g => g.username === username && g.password === password);
    if (guest) {
      storage.set('adminSession', { isLoggedIn: true, role: 'guest', username: guest.username, timestamp: Date.now() });
      setIsLoggedIn(true);
      setUserRole('guest');
      setShowLanding(false);
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    storage.remove('adminSession');
    setIsLoggedIn(false);
    setShowLanding(true);
    setCurrentPage('dashboard');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    storage.set('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Show landing page first
  if (showLanding && !isLoggedIn) {
    return <LandingPage onNavigateToLogin={() => setShowLanding(false)} />;
  }

  // Show login page
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} isGuest={userRole === 'guest'} />;
      case 'startups':
        return <AllStartups isGuest={userRole === 'guest'} />;
      case 'inactive':
        return <InactiveStartups isGuest={userRole === 'guest'} />;
      case 'smc':
        return <SMCScheduling isGuest={userRole === 'guest'} />;
      case 'oneOnOne':
        return <OneOnOneScheduling isGuest={userRole === 'guest'} />;
      case 'onboarded':
        return <Onboarded isGuest={userRole === 'guest'} />;
      case 'graduated':
        return <Graduated isGuest={userRole === 'guest'} />;
      case 'rejected':
        return <Rejected isGuest={userRole === 'guest'} />;
      case 'settings':
        return <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} isGuest={userRole === 'guest'} />;
      case 'landingEditor':
        return <LandingPageEditor onPreview={() => window.open('/', '_blank')} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} isGuest={userRole === 'guest'} />;
    }
  };

  return (
    <MagicBackground>
      <div className="flex h-screen transition-colors duration-300 overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isGuest={userRole === 'guest'}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6 lg:p-8 min-h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MagicBackground>
  );
}

export default App;
