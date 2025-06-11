import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const MessagePopup = ({ message, type = 'error', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      default:
        return 'bg-red-500/20 border-red-500/50 text-red-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg border backdrop-blur-sm shadow-lg ${getTypeStyles()}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">{message}</div>
          <button
            onClick={onClose}
            className="text-current/70 hover:text-current transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessagePopup; 