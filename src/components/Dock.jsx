import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Github, Instagram, MessageCircle, User, Twitter } from 'lucide-react';

const icons = [
  { type: 'internal', href: '/', icon: <Home size={20} /> },
  { type: 'internal', href: '/about', icon: <User size={20} /> },
  { type: 'internal', href: '/work', icon: <Briefcase size={20} /> },
  { type: 'divider' },
  { type: 'external', href: 'https://github.com/GhostFreakk', icon: <Github size={20} /> },
  { type: 'external', href: 'https://www.instagram.com/ghostfreakks/', icon: <Instagram size={20} /> },
  { type: 'external', href: 'https://discord.com/users/1259926188265308372', icon: <MessageCircle size={20} /> },
  { type: 'external', href: 'https://x.com/Ghostythefreak', icon: <Twitter size={20} /> },
  { type: 'divider' },
  { type: 'internal', href: '/contact', icon: 'Hire Me', isButton: true },
];

const DockIcon = ({ children, href, external, isButton, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className={
      isButton
        ? `px-3 py-1 bg-white text-black rounded-lg text-xs font-semibold hover:bg-white/90 transition-colors cursor-pointer ${className}`
        : `w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors ${className}`
    }
    style={{ minWidth: isButton ? 64 : undefined }}
  >
    {external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
        {children}
      </a>
    ) : isButton ? (
      <Link to={href} className="w-full h-full flex items-center justify-center">
        {children}
      </Link>
    ) : (
      <Link to={href} className="text-white w-full h-full flex items-center justify-center">
        {children}
      </Link>
    )}
  </motion.div>
);

const Dock = () => {
  let delay = 0.1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="hidden md:flex fixed left-1/2 -translate-x-1/2 bottom-0 mb-6 bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-2 items-center gap-5 border border-white/10 z-50 shadow-2xl"
      style={{ minWidth: '340px', maxWidth: '90vw' }}
    >
      {icons.map((item, i) => {
        if (item.type === 'divider') {
          return <div key={i} className="w-px h-7 bg-white/20 mx-2" />;
        }
        delay += 0.07;
        return (
          <DockIcon
            key={i}
            href={item.href}
            external={item.type === 'external'}
            isButton={item.isButton}
            delay={delay}
          >
            {item.icon}
          </DockIcon>
        );
      })}
    </motion.div>
  );
};

export default Dock; 