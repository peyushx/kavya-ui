import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import modular subcomponents
import SwayingPlant from './the-chat/SwayingPlant';
import WalkingMan from './the-chat/WalkingMan';
import PhoneInterface from './the-chat/PhoneInterface';

// Drifting Fireflies / Pollen Spores component (kept local for landscape background aesthetics)
function Fireflies({ count = 25, theme }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: theme === 'light' ? 3 + Math.random() * 3 : 2 + Math.random() * 3,
      dur: theme === 'light' ? 8 + Math.random() * 8 : 6 + Math.random() * 8,
      delay: Math.random() * -10,
    })), [count, theme]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6, overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(253, 230, 138, 0.65)',
            boxShadow: theme === 'light' ? '0 0 8px rgba(255, 255, 255, 0.5)' : '0 0 10px 3px rgba(251, 191, 36, 0.45)',
          }}
          animate={{
            y: [0, -120, -250],
            x: [0, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0.8, 1.3, 1, 0.5]
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

export default function TheChat({ theme, onNext }) {
  const isLight = theme === 'light';

  const phonePickedUpSaved = localStorage.getItem('kavvs_phone_picked_up') === 'true';

  // State flags for full-screen atmospheric reveal sequence (matching RainDrowning.tsx style)
  const [introActive, setIntroActive] = useState(!phonePickedUpSaved);
  const [isWalking, setIsWalking] = useState(false);

  // Cinematic Multistage Scene State System
  const [sceneStage, setSceneStage] = useState(phonePickedUpSaved ? 'phone-active' : 'intro'); // 'intro', 'walk-to-center', 'stop-and-drop', 'walk-to-right', 'phone-active'
  const [phoneDropped, setPhoneDropped] = useState(phonePickedUpSaved);
  
  const [isPickedUp, setIsPickedUp] = useState(phonePickedUpSaved);
  const [isWokenUp, setIsWokenUp] = useState(phonePickedUpSaved);
  const [isUnlocked, setIsUnlocked] = useState(phonePickedUpSaved);
  const [chatProgress, setChatProgress] = useState(phonePickedUpSaved ? 3 : 0);
  const [messages, setMessages] = useState(phonePickedUpSaved ? [
    { sender: 'pishu', text: "someone in this group screenshotted jiya's message and leaked it. find who did it baddiee", id: 0 },
    { sender: 'pishu', text: "Check whatsapp group", id: 1 },
    { sender: 'system', text: "Act 2 Complete. Time to investigate the leak.", id: 2 }
  ] : []);
  const [isTyping, setIsTyping] = useState(false);

  // Time for lock screen
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // Cinematic Multi-Stage Timers
  useEffect(() => {
    if (!introActive && sceneStage === 'intro') {
      setSceneStage('walk-to-center');
    }
  }, [introActive, sceneStage]);

  useEffect(() => {
    if (sceneStage === 'walk-to-center') {
      setIsWalking(true);
      const timer = setTimeout(() => {
        setIsWalking(false);
        setSceneStage('stop-and-drop');
      }, 5000); // Walks to center in 5s
      return () => clearTimeout(timer);
    }

    if (sceneStage === 'stop-and-drop') {
      // Bends down and drops the phone after 0.8s
      const dropTimer = setTimeout(() => {
        setPhoneDropped(true);
      }, 800);

      // Starts walking off-screen right after 2.5s
      const walkRightTimer = setTimeout(() => {
        setIsWalking(true);
        setSceneStage('walk-to-right');
      }, 2500);

      return () => {
        clearTimeout(dropTimer);
        clearTimeout(walkRightTimer);
      };
    }

    if (sceneStage === 'walk-to-right') {
      // Walks completely off-screen right in 5.5s
      const timer = setTimeout(() => {
        setIsWalking(false);
        setSceneStage('phone-active');
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [sceneStage]);

  // Color tokens representing rich landscape themes (deep slate charcoal traveler, vibrant forest greens, glowing mushrooms)
  const colors = useMemo(() => {
    return {
      bg: isLight 
        ? 'linear-gradient(to bottom, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)' 
        : 'linear-gradient(to bottom, #020617 0%, #050b14 60%, #09121f 100%)',
      mountShadow: isLight ? 'rgba(4, 120, 87, 0.08)' : 'rgba(0, 0, 0, 0.4)',
      moundBg: isLight ? '#86efac' : '#052e16',
      forestBack: isLight ? 'rgba(22, 101, 52, 0.05)' : 'rgba(22, 101, 52, 0.12)',
      forestMiddle: isLight ? 'rgba(21, 128, 61, 0.08)' : 'rgba(22, 163, 74, 0.08)',
      forestFront: isLight ? 'rgba(21, 128, 61, 0.12)' : 'rgba(34, 197, 94, 0.08)',
      bedFill: isLight ? '#4ade80' : '#14532d',
      
      // Grass Sway Colors
      plantP1: isLight ? '#166534' : '#15803d',
      plantP2: isLight ? '#15803d' : '#16a34a',
      plantP3: isLight ? '#16a34a' : '#22c55e',
      plantP4: isLight ? '#22c55e' : '#4ade80',
      
      // Smartphone Wrapper
      phoneBg: isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.65)',
      phoneBorder: isLight ? '1px solid rgba(255, 255, 255, 0.7)' : '1px solid rgba(255, 255, 255, 0.08)',
      phoneInnerBg: isLight ? '#bae6fd' : '#000000',
      phoneInnerBorder: isLight ? '1px solid rgba(8, 47, 73, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
      
      // Lockscreen
      lockBg: isLight 
        ? 'linear-gradient(to bottom, #bae6fd 0%, #fef08a 100%)' 
        : 'linear-gradient(to bottom, #111b2d 0%, #06090e 100%)',
      lockTitle: isLight ? '#0369a1' : 'white',
      lockTime: isLight ? '#082f49' : 'white',
      notifBg: isLight ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0.05)',
      notifBorder: isLight ? 'rgba(8, 47, 73, 0.12)' : 'rgba(255, 255, 255, 0.06)',
      notifTitle: isLight ? '#082f49' : 'white',
      notifText: isLight ? '#0f172a' : 'rgba(255, 255, 255, 0.85)',
      sliderBg: isLight ? 'rgba(8, 47, 73, 0.06)' : 'rgba(255, 255, 255, 0.03)',
      sliderBorder: isLight ? 'rgba(8, 47, 73, 0.15)' : 'rgba(255, 255, 255, 0.08)',
      sliderKnob: isLight ? '#082f49' : 'white',
      sliderKnobIcon: isLight ? 'white' : 'black',
      sliderHint: isLight ? 'rgba(8, 47, 73, 0.6)' : 'rgba(255, 255, 255, 0.45)',
      
      // Messenger
      chatBg: isLight ? '#f0f9ff' : '#0a0f18',
      chatHeaderBg: isLight ? 'rgba(224, 242, 254, 0.85)' : 'rgba(15, 23, 42, 0.7)',
      chatHeaderBorder: isLight ? 'rgba(8, 47, 73, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      chatTitle: isLight ? '#082f49' : 'white',
      chatOnline: isLight ? '#15803d' : '#10b981',
      chatBodyBg: isLight 
        ? 'radial-gradient(circle at center, rgba(14, 165, 233, 0.05) 0%, transparent 100%)' 
        : 'radial-gradient(circle at center, rgba(16, 24, 48, 0.2) 0%, transparent 100%)',
      bubbleOtherBg: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.05)',
      bubbleOtherBorder: isLight ? 'rgba(8, 47, 73, 0.1)' : 'rgba(255, 255, 255, 0.04)',
      bubbleOtherText: isLight ? '#0f172a' : 'white',
      bubbleSelfBg: isLight ? '#0284c7' : '#2563eb',
      bubbleTypingBg: isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.05)',
      bubbleTypingBorder: isLight ? 'rgba(8, 47, 73, 0.1)' : 'rgba(255, 255, 255, 0.04)',
      bubbleTypingDot: isLight ? '#0284c7' : 'white',
      chatSystemBg: isLight ? 'rgba(2, 132, 199, 0.05)' : 'rgba(255, 255, 255, 0.03)',
      chatSystemBorder: isLight ? 'rgba(2, 132, 199, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      chatSystemText: isLight ? '#0369a1' : '#a7f3d0',
      
      // Footer
      footerBg: isLight ? 'rgba(224, 242, 254, 0.85)' : 'rgba(15, 23, 42, 0.5)',
      footerBorder: isLight ? 'rgba(8, 47, 73, 0.1)' : 'rgba(255, 255, 255, 0.05)'
    };
  }, [theme]);

  // Chat Script
  const chatScript = useMemo(() => [
    {
      sender: 'pishu',
      text: "someone in this group screenshotted jiya's message and leaked it. find who did it baddiee",
      delay: 1500
    },
    {
      sender: 'pishu',
      text: "Check whatsapp group",
      delay: 2000
    },
    {
      sender: 'system',
      text: "Act 2 Complete. Time to investigate the leak.",
      delay: 1000
    }
  ], []);

  // Progress the script automatically
  useEffect(() => {
    if (!isUnlocked || chatProgress >= chatScript.length) return;

    const currentItem = chatScript[chatProgress];

    if (currentItem.sender === 'pishu' || currentItem.sender === 'system') {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          sender: currentItem.sender,
          text: currentItem.text,
          id: chatProgress
        }]);
        setChatProgress(prev => prev + 1);
      }, currentItem.delay);

      return () => clearTimeout(typingTimer);
    }
  }, [isUnlocked, chatProgress, chatScript]);

  return (
    <div className="the-chat-container" style={{
      minHeight: '100vh',
      width: '100%',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif",
      transition: 'background 0.8s ease-in-out'
    }}>
      {/* Premium Forest Atmosphere SVG Backdrop */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '42vh',
        zIndex: 5,
        pointerEvents: 'none'
      }}>
        <svg viewBox="0 0 1200 400" width="100%" height="100%" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id="glow-mushroom" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isLight ? '#60a5fa' : '#38bdf8'} stopOpacity="0.8" />
              <stop offset="60%" stopColor={isLight ? '#3b82f6' : '#2563eb'} stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Distant mountains backdrop */}
          <path d="M 0,400 Q 150,220 380,320 T 780,280 Q 1000,180 1200,400 Z" fill={colors.forestBack} />
          <path d="M 0,400 Q 300,280 600,340 T 1200,310 Z" fill={colors.forestMiddle} />
          <path d="M -50,400 Q 400,330 850,360 T 1250,400 Z" fill={colors.forestFront} />

          {/* Glowing mushrooms details */}
          <g transform="translate(180, 80)" style={{ pointerEvents: 'none' }}>
            <ellipse cx="0" cy="22" rx="20" ry="5.5" fill="rgba(0,0,0,0.2)" />
            <motion.ellipse cx="0" cy="0" rx="35" ry="35" fill="url(#glow-mushroom)"
              animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
            <path d="M-2,15 Q-1,0 0,-15 Q1,0 2,15 Z" fill="#64748b" />
            <path d="M-12,-10 Q0,-25 12,-10 Q10,-8 0,-8 Q-10,-8 -12,-10 Z" fill={isLight ? '#2563eb' : '#3b82f6'} />
          </g>

          <g transform="translate(850, 80)" style={{ pointerEvents: 'none' }}>
            <ellipse cx="0" cy="22" rx="24" ry="6" fill="rgba(0,0,0,0.22)" />
            <motion.ellipse cx="0" cy="0" rx="45" ry="45" fill="url(#glow-mushroom)"
              animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
            <path d="M-3,15 Q-1,0 0,-20 Q1,0 3,15 Z" fill="#475569" />
            <path d="M10,20 Q12,8 10,-8 Q8,8 6,20 Z" fill="#334155" />
            <path d="M-18,-15 Q0,-32 18,-15 Q15,-13 0,-13 Q-15,-13 -18,-15 Z" fill={isLight ? '#3b82f6' : '#60a5fa'} />
            <path d="M-2,-5 Q10,-18 20,-5 Q18,-3 10,-3 Q2,-3 -2,-5 Z" fill="#93c5fd" />
          </g>

          {/* LAYERED SWAYING FOLIAGE & FERNS */}
          <g transform="translate(80, 110)">
            <ellipse cx="0" cy="5" rx="40" ry="8" fill="rgba(0,0,0,0.18)" />
            <SwayingPlant d="M -4,0 C -15,-25 -25,-55 -32,-80 C -18,-50 -6,-15 0,0" fill={colors.plantP1} duration={5.5} origin={{ x: '100%', y: '100%' }} />
            <SwayingPlant d="M -2,0 C -8,-35 -15,-65 -18,-95 C -10,-55 -3,-20 0,0" fill={colors.plantP2} duration={6} origin={{ x: '100%', y: '100%' }} delay={0.5} />
            <SwayingPlant d="M 0,0 C 5,-30 12,-60 15,-85 C 8,-50 3,-18 0,0" fill={colors.plantP1} duration={5.2} origin={{ x: '0%', y: '100%' }} delay={1} />
            <SwayingPlant d="M 2,0 C 12,-20 20,-45 25,-70 C 15,-40 6,-15 0,0" fill={colors.plantP4} duration={4.8} origin={{ x: '0%', y: '100%' }} delay={1.4} />
          </g>

          <g transform="translate(1080, 100)">
            <ellipse cx="0" cy="5" rx="42" ry="8" fill="rgba(0,0,0,0.18)" />
            <SwayingPlant d="M -3,0 C -10,-25 -18,-55 -22,-85 C -12,-50 -4,-18 0,0" fill={colors.plantP3} duration={4.8} origin={{ x: '0%', y: '100%' }} />
            <SwayingPlant d="M -1,0 C -5,-35 -10,-70 -12,-100 C -6,-60 -2,-22 0,0" fill={colors.plantP4} duration={5.4} origin={{ x: '100%', y: '100%' }} delay={0.3} />
            <SwayingPlant d="M 1,0 C 6,-32 14,-65 20,-95 C 10,-55 4,-20 0,0" fill={colors.plantP1} duration={4.2} origin={{ x: '0%', y: '100%' }} delay={0.8} />
            <SwayingPlant d="M 3,0 C 12,-22 22,-48 28,-75 C 16,-42 6,-16 0,0" fill={colors.plantP2} duration={5} origin={{ x: '0%', y: '100%' }} delay={1.2} />
          </g>

          {/* Center Grassy Bed Mound */}
          <g transform="translate(600, 100)">
            <ellipse cx="0" cy="16" rx="230" ry="14" fill="rgba(0,0,0,0.22)" />
            <path d="M -250,15 Q 0,-25 250,15 Z" fill={colors.bedFill} />
            <g style={{ overflow: 'visible' }}>
              <SwayingPlant d="M-2,0 Q-15,-25 -25,-55 Q-8,-25 0,0" fill={colors.plantP1} duration={4.5} delay={0.2} style={{ transform: 'translateX(-120px) translateY(10px)' }} />
              <SwayingPlant d="M-1,0 Q-8,-35 -15,-65 Q-4,-30 0,0" fill={colors.plantP2} duration={5} style={{ transform: 'translateX(-80px) translateY(5px)' }} />
              <SwayingPlant d="M-1,0 Q-5,-45 -8,-80 Q-2,-35 0,0" fill={colors.plantP1} duration={4.7} delay={0.4} style={{ transform: 'translateX(-40px) translateY(0px)' }} />
              <SwayingPlant d="M0,0 Q5,-45 10,-80 Q2,-35 1,0" fill={colors.plantP4} duration={5.2} delay={0.6} style={{ transform: 'translateX(40px) translateY(0px)' }} />
              <SwayingPlant d="M0,0 Q10,-35 18,-65 Q4,-30 1,0" fill={colors.plantP1} duration={4.9} delay={0.8} style={{ transform: 'translateX(80px) translateY(5px)' }} />
              <SwayingPlant d="M0,0 Q15,-25 25,-55 Q8,-25 2,0" fill={colors.plantP2} duration={4.6} delay={1} style={{ transform: 'translateX(120px) translateY(10px)' }} />
            </g>

            {/* Glowing flora sparkles */}
            <motion.circle cx="-35" cy="-20" r="1.5" fill="#38bdf8"
              animate={{ opacity: [0.2, 1, 0.2], y: [-20, -35, -20] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="55" cy="-25" r="1" fill="#60a5fa"
              animate={{ opacity: [0.1, 0.8, 0.1], y: [-25, -45, -25] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
          </g>
        </svg>
      </div>

      {/* Floating firefly particles */}
      <Fireflies theme={theme} />

      {/* Walking traveler silhouette */}
      <WalkingMan 
        theme={theme} 
        sceneStage={sceneStage} 
        isWalking={isWalking} 
      />

      {/* Smartphone interface & drop animations */}
      <AnimatePresence>
        {phoneDropped && (
          <motion.div
            initial={isPickedUp ? "hand" : "dropped"}
            animate={isPickedUp ? "hand" : "ground"}
            variants={{
              dropped: {
                scale: 0.01,
                x: '-50%',
                y: '-100px',
                rotate: 45,
                bottom: '31vh',
                top: 'auto',
                left: '50%',
                position: 'absolute',
                zIndex: 10,
                opacity: 0
              },
              ground: {
                scale: 0.02,
                x: '-50%',
                y: '0px',
                rotate: -8,
                bottom: '31vh',
                top: 'auto',
                left: '50%',
                position: 'absolute',
                zIndex: 10,
                opacity: 1,
                cursor: sceneStage === 'phone-active' ? 'pointer' : 'default',
                transition: {
                  type: 'spring',
                  stiffness: 140,
                  damping: 12,
                  opacity: { duration: 0.4 }
                }
              },
              hand: {
                scale: 1,
                x: '-50%',
                y: '-50%',
                rotate: 0,
                bottom: 'auto',
                top: '50%',
                left: '50%',
                position: 'absolute',
                zIndex: 50,
                opacity: 1,
                transition: { duration: 0.6 }
              }
            }}
            onClick={() => {
              if (!isPickedUp && sceneStage === 'phone-active') {
                setIsPickedUp(true);
                setIsWokenUp(true);
                localStorage.setItem('kavvs_phone_picked_up', 'true');
              }
            }}
            style={{
              width: '960px',
              height: '640px',
              maxWidth: '95vw',
              maxHeight: '90vh',
              borderRadius: '24px',
              padding: '16px',
              background: colors.phoneBg,
              boxShadow: isPickedUp 
                ? (theme === 'light' 
                    ? '0 30px 100px rgba(8, 47, 73, 0.12), 0 0 0 1px rgba(255,255,255,0.6), inset 0 0 20px rgba(255,255,255,0.3)'
                    : '0 30px 100px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 20px rgba(255,255,255,0.05)')
                : (theme === 'light'
                    ? '0 10px 40px rgba(2, 132, 199, 0.35), 0 0 20px rgba(2, 132, 199, 0.25)'
                    : '0 10px 40px rgba(56, 189, 248, 0.45), 0 0 20px rgba(56, 189, 248, 0.3)'),
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: colors.phoneBorder,
              boxSizing: 'border-box',
              transformOrigin: 'bottom center'
            }}
            whileHover={!isPickedUp && sceneStage === 'phone-active' ? {
              scale: 0.025,
              boxShadow: theme === 'light'
                ? '0 15px 50px rgba(2, 132, 199, 0.45), 0 0 30px rgba(2, 132, 199, 0.25)'
                : '0 15px 50px rgba(56, 189, 248, 0.65), 0 0 30px rgba(56, 189, 248, 0.45)',
              transition: { duration: 0.3 }
            } : {}}
          >
            {/* Click target expander for smooth UX when phone is extremely tiny on the ground */}
            {!isPickedUp && (
              <div style={{
                position: 'absolute',
                top: '-250%',
                left: '-250%',
                right: '-250%',
                bottom: '-250%',
                zIndex: 99,
                cursor: 'pointer'
              }} />
            )}

            {/* Concentric Flashy Glowing Beacon Rings on forest ground */}
            {!isPickedUp && (
              <>
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-18px',
                    borderRadius: '45px',
                    border: theme === 'light' ? '2.5px solid rgba(2, 132, 199, 0.7)' : '2.5px solid rgba(56, 189, 248, 0.75)',
                    filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.5))',
                    zIndex: -1,
                    pointerEvents: 'none'
                  }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-36px',
                    borderRadius: '50px',
                    border: theme === 'light' ? '1px dashed rgba(2, 132, 199, 0.45)' : '1px dashed rgba(56, 189, 248, 0.5)',
                    zIndex: -2,
                    pointerEvents: 'none'
                  }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />
              </>
            )}

            {/* Smartphone core screen interface */}
            <PhoneInterface
              theme={theme}
              colors={colors}
              isPickedUp={isPickedUp}
              isWokenUp={isWokenUp}
              setIsWokenUp={setIsWokenUp}
              isUnlocked={isUnlocked}
              setIsUnlocked={setIsUnlocked}
              chatProgress={chatProgress}
              messages={messages}
              isTyping={isTyping}
              chatScript={chatScript}
              currentTime={currentTime}
              onNext={onNext}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter navigation hint display */}
      <AnimatePresence>
        {isPickedUp && !isWokenUp && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              position: 'absolute',
              bottom: '10vh',
              left: '50%',
              transform: 'translateX(-50%)',
              color: theme === 'light' ? '#082f49' : 'var(--text-secondary)',
              fontSize: '14px',
              fontStyle: 'italic',
              zIndex: 5,
              fontWeight: 600
            }}
          >
            tap screen to light up 📱✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter 5 Blur Overlay Intro Reveal (identical to RainDrowning.jsx specs) */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            initial={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{ 
              opacity: 0, 
              backdropFilter: 'blur(0px)',
              transition: { duration: 1.5, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(2, 6, 23, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ textAlign: 'center', padding: '20px' }}
            >
              <span style={{
                fontSize: '12px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                opacity: 0.5,
                color: theme === 'light' ? '#0284c7' : '#38bdf8',
                display: 'block',
                marginBottom: '16px',
                fontWeight: 600
              }}>
                Chapter V
              </span>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 300,
                color: theme === 'light' ? '#0f172a' : 'white',
                margin: 0,
                letterSpacing: '1px',
                fontFamily: "'Outfit', sans-serif"
              }}>
                The Chat
              </h1>
              <p style={{
                fontSize: '14px',
                opacity: 0.6,
                color: theme === 'light' ? '#475569' : 'var(--text-secondary)',
                marginTop: '12px',
                fontStyle: 'italic'
              }}>
                under the quiet canopy...
              </p>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIntroActive(false);
                }}
                style={{
                  marginTop: '30px',
                  padding: '10px 24px',
                  borderRadius: '20px',
                  border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.15)' : '1px solid rgba(255, 255, 255, 0.15)',
                  background: theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.05)',
                  color: theme === 'light' ? '#0f172a' : 'white',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  transition: 'background 0.3s, scale 0.2s'
                }}
                whileHover={{ scale: 1.05, background: theme === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Forest ➔
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
