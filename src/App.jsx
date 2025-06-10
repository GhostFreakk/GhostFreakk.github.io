import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';
import Dock from './components/Dock';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import { Helmet } from 'react-helmet';

const CODE_HASH = 'deb3d256fde0a2aac4ed37d719b0ac62c8380cd79ad4b51b7fabc5190ad5de82';
function sha256(str) {
  return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then(buf =>
    Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('')
  );
}

// Separate component to use useLocation
function AppContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimeout = useRef(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Reset reveal state when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsRevealed(true);
    }
  }, [location.pathname]);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);
    if (clickCount.current === 5) {
      clickCount.current = 0;
      setShowCodeModal(true);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setCodeError('');
    setCodeLoading(true);
    const hash = await sha256(code.trim());
    setCodeLoading(false);
    if (hash === CODE_HASH) {
      setShowCodeModal(false);
      setCode('');
      setCodeError('');
      navigate('/admin');
    } else {
      setCodeError('Incorrect code.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cursor glow effect */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      
      {/* Modal for code entry */}
      {showCodeModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
          <form onSubmit={handleCodeSubmit} className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 min-w-[320px] max-w-[90vw]">
            <h2 className="text-2xl font-bold mb-2 text-center">Enter Access Code</h2>
            <input
              type="password"
              className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-lg focus:outline-none focus:border-white/50"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Access Code"
              autoFocus
              disabled={codeLoading}
            />
            {codeError && <div className="text-red-400 text-sm text-center">{codeError}</div>}
            <button type="submit" className="mt-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors" disabled={codeLoading}>
              {codeLoading ? 'Checking...' : 'Continue'}
            </button>
            <button type="button" className="text-xs text-gray-400 hover:underline mt-2" onClick={() => setShowCodeModal(false)} disabled={codeLoading}>Cancel</button>
          </form>
        </div>
      )}
      
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar onLogoClick={handleLogoClick} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home onReveal={() => setIsRevealed(true)} isRevealed={isRevealed} />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.5 }}
          >
            <Dock />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <Helmet>
        <title>Ghost</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <AppContent />
    </Router>
  );
}

export default App;
