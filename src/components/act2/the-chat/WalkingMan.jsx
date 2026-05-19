import React from 'react';
import { motion } from 'framer-motion';

function WalkingMan({ theme, sceneStage, isWalking }) {
  const isLight = theme === 'light';
  
  // High-fidelity dark silhouette colors (high-contrast deep slate blue vs bright green grass)
  const bodyColor = isLight ? '#0f172a' : '#020617';
  const glowColor = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.35)';
  const shadowColor = isLight ? 'rgba(15, 23, 42, 0.35)' : 'rgba(0, 0, 0, 0.7)';

  // Keyframes for traversing the entire landscape screen
  const manVariants = {
    initial: { x: '-120px', opacity: 0 },
    'walk-to-center': {
      x: 'calc(50vw - 32px)',
      opacity: 0.95,
      transition: { duration: 5, ease: 'easeOut' }
    },
    'stop-and-drop': {
      x: 'calc(50vw - 32px)',
      opacity: 0.95,
      transition: { duration: 0.3 }
    },
    'walk-to-right': {
      x: '115vw',
      opacity: 0.95,
      transition: { duration: 5.5, ease: 'easeIn' }
    },
    'phone-active': {
      x: '115vw',
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div
      initial="initial"
      animate={sceneStage}
      variants={manVariants}
      style={{
        position: 'absolute',
        bottom: '24vh', // Firmly anchored on center mound shadow
        left: 0,
        zIndex: 8,
        pointerEvents: 'none'
      }}
    >
      {/* Walking Bobbing / Drop Bending Body */}
      <motion.div
        animate={
          sceneStage === 'stop-and-drop'
            ? { 
                y: [0, 15, 0], 
                rotate: [0, 4, 0],
                scaleY: [1, 0.95, 1] 
              }
            : (isWalking 
                ? { y: [0, -5, 0, -5, 0], rotate: [0, -1, 1, -1, 0], scaleY: [1, 0.98, 1, 0.98, 1] } 
                : { y: [0, -2, 0], scaleY: [1, 1.015, 1] })
        }
        transition={
          sceneStage === 'stop-and-drop'
            ? { duration: 2.2, ease: 'easeInOut' }
            : (isWalking ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' })
        }
        style={{
          width: '64px',
          height: '130px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transformOrigin: 'bottom center'
        }}
      >
        <svg viewBox="0 0 100 200" width="64" height="128" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* Organic Foot Shadow */}
          <motion.ellipse 
            cx="50" 
            cy="185" 
            fill={shadowColor}
            filter="url(#soft-shadow)"
            initial={{ rx: 24, ry: 6.5 }}
            animate={isWalking ? {
              rx: [24, 21, 24, 21, 24],
              opacity: [0.85, 0.95, 0.85, 0.95, 0.85]
            } : {
              rx: [24, 25, 24],
              opacity: [0.9, 0.8, 0.9]
            }}
            transition={{
              duration: isWalking ? 1.3 : 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Head & Beanie hat detail */}
          <circle cx="50" cy="34" r="10.5" fill={bodyColor} />
          <path d="M 39 31 C 42 22, 58 22, 61 31 Z" fill={bodyColor} />
          
          {/* Neck */}
          <rect x="48" y="43" width="4" height="6" fill={bodyColor} />
          
          {/* Elegant Trench Coat / Torso */}
          <path 
            d="M 37 48 
               C 33 54, 29 70, 30 100
               C 31 122, 24 144, 26 148 
               L 74 148 
               C 76 144, 69 122, 70 100
               C 71 70, 67 54, 63 48 
               Z" 
            fill={bodyColor} 
            stroke={glowColor}
            strokeWidth="0.75"
          />

          {/* Crossbody Sling Bag Strap & Pouch */}
          <path d="M 35 52 Q 50 76 65 98" fill="none" stroke={isLight ? '#475569' : '#334155'} strokeWidth="2" opacity="0.55" />
          <rect x="56" y="88" width="13" height="11" rx="2" fill={isLight ? '#334155' : '#1e293b'} stroke={glowColor} strokeWidth="0.5" opacity="0.8" />
          
          {/* Left Coat Sleeve (Natural Walk Swing) */}
          <motion.path 
            d="M 35 49 C 25 68, 23 92, 25 110" 
            fill="none" 
            stroke={bodyColor} 
            strokeWidth="6" 
            strokeLinecap="round"
            animate={isWalking ? {
              d: [
                "M 35 49 C 25 68, 23 92, 25 110",
                "M 35 49 C 29 68, 31 92, 32 110",
                "M 35 49 C 25 68, 23 92, 25 110"
              ]
            } : {}}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Right Coat Sleeve (Natural Walk Swing) */}
          <motion.path 
            d="M 65 49 C 75 68, 77 92, 75 110" 
            fill="none" 
            stroke={bodyColor} 
            strokeWidth="6" 
            strokeLinecap="round"
            animate={isWalking ? {
              d: [
                "M 65 49 C 75 68, 77 92, 75 110",
                "M 65 49 C 69 68, 67 92, 66 110",
                "M 65 49 C 75 68, 77 92, 75 110"
              ]
            } : {}}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Left Trouser Leg */}
          <motion.path 
            d="M 42 146 L 37 182" 
            fill="none" 
            stroke={bodyColor} 
            strokeWidth="6.5" 
            strokeLinecap="round"
            animate={isWalking ? {
              d: [
                "M 42 146 L 37 182",
                "M 42 146 L 46 180",
                "M 42 146 L 37 182"
              ]
            } : {}}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Right Trouser Leg */}
          <motion.path 
            d="M 58 146 L 63 182" 
            fill="none" 
            stroke={bodyColor} 
            strokeWidth="6.5" 
            strokeLinecap="round"
            animate={isWalking ? {
              d: [
                "M 58 146 L 63 182",
                "M 58 146 L 54 180",
                "M 58 146 L 63 182"
              ]
            } : {}}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default WalkingMan;
