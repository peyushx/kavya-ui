import { motion } from 'framer-motion';
import { Lock, Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle, isLocked }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={isLocked ? undefined : onToggle}
      className="theme-toggle"
      animate={{
        backgroundColor: isDark ? '#494b4e' : '#cde5f1',
        borderColor: isDark ? '#2a2b2c' : '#8cbed6',
        opacity: isLocked ? 0.7 : 1,
        filter: isLocked ? 'grayscale(0.3)' : 'grayscale(0)'
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        width: '90px',
        height: '46px',
        borderRadius: '99px',
        borderWidth: '4px',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        zIndex: 200,
        overflow: 'hidden',
        outline: 'none',
      }}
    >
      {/* Lock Icon Overlay */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            background: 'rgba(0,0,0,0.2)',
          }}
        >
          <Lock size={18} color="white" strokeWidth={2.5} />
        </motion.div>
      )}

      {/* Background Stars for Night Mode */}
      <motion.div
        className="toggle-stars"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, y: isDark ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'absolute', top: '8px', left: '42px', width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '16px', left: '56px', width: '3px', height: '3px', background: '#fff', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '24px', left: '48px', width: '2px', height: '2px', background: '#fff', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '30px', left: '60px', width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '20px', left: '72px', width: '5px', height: '5px', background: '#fff', borderRadius: '50%' }} />
      </motion.div>

      {/* The Handle */}
      <motion.div
        className="toggle-handle"
        initial={false}
        animate={{
          x: isDark ? 0 : 44,
          backgroundColor: isDark ? '#f3f2d8' : '#fce152',
          borderColor: isDark ? '#d9d8c0' : '#e6c836',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          borderWidth: '3px',
          borderStyle: 'solid',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <motion.div
          initial={false}
          animate={{ scale: isDark ? 0 : 1, opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Sun size={18} color="#e6a500" strokeWidth={2.5} />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ scale: isDark ? 1 : 0, opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Moon size={18} color="#8a8a8a" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      {/* Day Cloud (Overlaps the Sun Handle) */}
      <motion.div
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
          x: isDark ? 20 : 36,
          y: isDark ? 10 : 0
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        <svg width="28" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14C3.68629 14 1 11.3137 1 8C1 5.37257 2.69176 3.14175 5.06821 2.30237C5.97547 0.902302 7.62534 0 9.5 0C12.4496 0 14.8649 2.31175 15.084 5.22394C15.3768 5.07797 15.6811 5 16 5C18.7614 5 21 7.23858 21 10C21 12.7614 18.7614 15 16 15H8" fill="white" />
          <path d="M5.06821 2.30237C2.69176 3.14175 1 5.37257 1 8C1 11.3137 3.68629 14 7 14M5.06821 2.30237C5.97547 0.902302 7.62534 0 9.5 0C12.4496 0 14.8649 2.31175 15.084 5.22394M5.06821 2.30237C5.02307 2.40428 4.98144 2.50853 4.94361 2.61494M15.084 5.22394C15.3768 5.07797 15.6811 5 16 5C18.7614 5 21 7.23858 21 10C21 12.7614 18.7614 15 16 15H8M15.084 5.22394C15.0945 5.06742 15.1 4.90947 15.1 4.75" stroke="#d2d2d2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </motion.button>
  );
}
