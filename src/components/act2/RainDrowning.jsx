import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Moon, ArrowRight } from 'lucide-react';

const UmbrellaPerson = ({ rescueStatus }) => {
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    if (rescueStatus === 'pulling') {
      setPhase('pulled_up');
    } else if (rescueStatus === 'sinking') {
      setPhase('sinking_down');
    } else if (rescueStatus === 'sunk') {
      setPhase('sunk');
    } else if (rescueStatus === 'leaving') {
      setPhase('leaving');
    } else if (rescueStatus === 'left') {
      setPhase('left');
    } else {
      const t1 = setTimeout(() => setPhase('walking'), 6500);
      const t2 = setTimeout(() => setPhase('standing'), 10500);
      const t3 = setTimeout(() => setPhase('panicking'), 15000); // water at waist/chest
      const t4 = setTimeout(() => setPhase('floating'), 19000);  // completely submerged
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [rescueStatus]);

  return (
    <motion.div
      initial="hidden"
      animate={phase}
      variants={{
        hidden: { x: '-10vw', y: 0, opacity: 0 },
        walking: { x: '35vw', y: 0, opacity: 0.8, transition: { duration: 4, ease: "linear" } },
        standing: { x: '35vw', y: 0, opacity: 0.8 },
        panicking: { x: '35vw', y: 0, opacity: 0.8 },
        floating: { x: '45vw', y: '-25vh', opacity: 0.8, transition: { duration: 15, ease: "linear" } },
        pulled_up: { x: '45vw', y: '-65vh', rotate: 90, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
        sinking_down: { x: '45vw', y: '-10vh', rotate: 180, opacity: 0, transition: { duration: 2, ease: "easeIn" } },
        sunk: { opacity: 0 },
        leaving: { x: '45vw', y: '-15vh', opacity: 0, rotate: -30, transition: { duration: 4, ease: "easeIn" } },
        left: { opacity: 0 }
      }}
      style={{
        position: 'absolute',
        bottom: '0',
        left: 0,
        zIndex: 30,
        pointerEvents: 'none'
      }}
    >
      <motion.div
        variants={{
          hidden: { y: 0, rotate: 0 },
          walking: { y: [0, -3, 0], rotate: 0, transition: { duration: 0.5, repeat: Infinity } },
          standing: { y: 0, rotate: 0 },
          panicking: { y: [0, 5, -5, 0], rotate: [0, -10, 10, 0], transition: { duration: 0.4, repeat: Infinity } },
          floating: { y: [0, -10, 10, 0], rotate: [0, -5, 5, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
          pulled_up: { y: 0, rotate: 0 },
          sinking_down: { y: 0, rotate: 0 },
          sunk: { y: 0, rotate: 0 },
          leaving: { y: 0, rotate: 0 },
          left: { y: 0, rotate: 0 }
        }}
      >
        <svg width="140" height="220" viewBox="0 0 140 220" style={{ overflow: 'visible' }}>
          
          {/* UMBRELLA */}
          <motion.g
            variants={{
              hidden: { x: 0, y: 0, rotate: 0, opacity: 1 },
              walking: { x: 0, y: 0, rotate: 0, opacity: 1 },
              standing: { x: 0, y: 0, rotate: 0, opacity: 1 },
              panicking: { x: 400, y: -300, rotate: 180, opacity: 0, transition: { duration: 2, ease: "easeIn" } },
              floating: { x: 400, y: -300, rotate: 180, opacity: 0 },
              pulled_up: { opacity: 0 },
              sinking_down: { opacity: 0 },
              sunk: { opacity: 0 },
              leaving: { opacity: 0 },
              left: { opacity: 0 }
            }}
            style={{ originX: '70px', originY: '70px' }}
          >
            {/* Umbrella canopy */}
            <path d="M15 80 Q25 25 70 20 Q115 25 125 80" stroke="var(--text-primary)" strokeWidth="2.5" fill="var(--text-primary)" opacity="0.15" />
            <path d="M15 80 Q25 25 70 20 Q115 25 125 80" stroke="var(--text-primary)" strokeWidth="2.5" fill="none" opacity="0.8" />
            {/* Umbrella ribs */}
            <line x1="70" y1="20" x2="15" y2="80" stroke="var(--text-primary)" strokeWidth="0.5" opacity="0.3" />
            <line x1="70" y1="20" x2="45" y2="78" stroke="var(--text-primary)" strokeWidth="0.5" opacity="0.3" />
            <line x1="70" y1="20" x2="95" y2="78" stroke="var(--text-primary)" strokeWidth="0.5" opacity="0.3" />
            <line x1="70" y1="20" x2="125" y2="80" stroke="var(--text-primary)" strokeWidth="0.5" opacity="0.3" />
            {/* Umbrella pole */}
            <line x1="70" y1="20" x2="70" y2="125" stroke="var(--text-primary)" strokeWidth="2" opacity="0.8" />
            {/* Umbrella handle */}
            <path d="M70 125 Q70 132 63 132 Q56 132 56 126" stroke="var(--text-primary)" strokeWidth="2" fill="none" opacity="0.7" />
          </motion.g>

          {/* PERSON BODY */}
          {/* Head */}
          <ellipse cx="70" cy="100" rx="8" ry="9" fill="var(--text-primary)" opacity="0.9" />
          {/* Neck */}
          <line x1="70" y1="109" x2="70" y2="114" stroke="var(--text-primary)" strokeWidth="3" />
          {/* Torso */}
          <path d="M60 114 L80 114 L78 155 L62 155 Z" fill="var(--text-primary)" opacity="0.85" />
          
          {/* Right arm */}
          <motion.path 
            d="M76 118 Q82 115 78 108 Q74 102 70 105"
            variants={{
              hidden: { d: "M76 118 Q82 115 78 108 Q74 102 70 105" },
              walking: { d: "M76 118 Q82 115 78 108 Q74 102 70 105" },
              standing: { d: "M76 118 Q82 115 78 108 Q74 102 70 105" },
              panicking: { d: ["M76 118 Q90 100 85 85 Q80 75 75 70", "M76 118 Q95 110 90 95 Q85 85 80 80"], transition: { duration: 0.3, repeat: Infinity, repeatType: "mirror" } },
              floating: { d: ["M76 118 Q90 100 85 85 Q80 75 75 70", "M76 118 Q95 110 90 95 Q85 85 80 80"], transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } },
              pulled_up: { d: "M76 118 Q90 100 85 85 Q80 75 75 70" },
              sinking_down: { d: "M76 118 Q90 100 85 85 Q80 75 75 70" },
              sunk: { d: "M76 118 Q90 100 85 85 Q80 75 75 70" },
              leaving: { d: "M76 118 Q90 100 85 85 Q80 75 75 70" },
              left: { d: "M76 118 Q90 100 85 85 Q80 75 75 70" }
            }}
            stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"
          />
          
          {/* Left arm */}
          <motion.path 
            d="M64 118 Q55 130 50 140"
            variants={{
              hidden: { d: "M64 118 Q55 130 50 140" },
              walking: { d: ["M64 118 Q55 130 50 140", "M64 118 Q55 125 52 132"], transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" } },
              standing: { d: "M64 118 Q55 130 50 140" },
              panicking: { d: ["M64 118 Q50 100 40 90", "M64 118 Q45 110 30 100"], transition: { duration: 0.3, repeat: Infinity, repeatType: "mirror" } },
              floating: { d: ["M64 118 Q50 100 40 90", "M64 118 Q45 110 30 100"], transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } },
              pulled_up: { d: "M64 118 Q50 100 40 90" },
              sinking_down: { d: "M64 118 Q50 100 40 90" },
              sunk: { d: "M64 118 Q50 100 40 90" },
              leaving: { d: "M64 118 Q50 100 40 90" },
              left: { d: "M64 118 Q50 100 40 90" }
            }}
            stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"
          />
          
          {/* Left leg */}
          <motion.path 
            d="M65 155 L58 185 L52 210"
            variants={{
              hidden: { d: "M65 155 L58 185 L52 210" },
              walking: { d: ["M65 155 L58 185 L52 210", "M65 155 L60 185 L62 210"], transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" } },
              standing: { d: "M65 155 L58 185 L52 210" },
              panicking: { d: ["M65 155 L50 180 L40 200", "M65 155 L60 185 L70 190"], transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" } },
              floating: { d: ["M65 155 L55 170 L50 180", "M65 155 L60 175 L65 185"], transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } },
              pulled_up: { d: "M65 155 L55 170 L50 180" },
              sinking_down: { d: "M65 155 L55 170 L50 180" },
              sunk: { d: "M65 155 L55 170 L50 180" },
              leaving: { d: "M65 155 L55 170 L50 180" },
              left: { d: "M65 155 L55 170 L50 180" }
            }}
            stroke="var(--text-primary)" strokeWidth="4" strokeLinecap="round" fill="none"
          />
          
          {/* Right leg */}
          <motion.path 
            d="M75 155 L80 185 L86 210"
            variants={{
              hidden: { d: "M75 155 L80 185 L86 210" },
              walking: { d: ["M75 155 L80 185 L86 210", "M75 155 L78 185 L76 210"], transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" } },
              standing: { d: "M75 155 L80 185 L86 210" },
              panicking: { d: ["M75 155 L85 180 L95 190", "M75 155 L75 185 L70 200"], transition: { duration: 0.2, repeat: Infinity, repeatType: "mirror" } },
              floating: { d: ["M75 155 L80 170 L85 180", "M75 155 L75 175 L70 185"], transition: { duration: 1.5, repeat: Infinity, repeatType: "mirror" } },
              pulled_up: { d: "M75 155 L80 170 L85 180" },
              sinking_down: { d: "M75 155 L80 170 L85 180" },
              sunk: { d: "M75 155 L80 170 L85 180" },
              leaving: { d: "M75 155 L80 170 L85 180" },
              left: { d: "M75 155 L80 170 L85 180" }
            }}
            stroke="var(--text-primary)" strokeWidth="4" strokeLinecap="round" fill="none"
          />
          
        </svg>
      </motion.div>
    </motion.div>
  );
};

const RainLandscape = () => (
  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, pointerEvents: 'none' }}>
    <svg width="100%" height="350" viewBox="0 0 1200 350" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="puddle-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(100,180,255,0.25)" />
          <stop offset="100%" stopColor="rgba(50,100,150,0.05)" />
        </radialGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a1a" />
          <stop offset="40%" stopColor="#0f1f0f" />
          <stop offset="100%" stopColor="#0a150a" />
        </linearGradient>
        <linearGradient id="mud-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1f15" />
          <stop offset="100%" stopColor="#1a1208" />
        </linearGradient>
      </defs>

      {/* Sky-to-ground fog */}
      <rect x="0" y="0" width="1200" height="80" fill="url(#ground-grad)" opacity="0.3" />

      {/* Far hills */}
      <path d="M0,120 Q150,60 300,100 Q450,50 600,90 Q750,40 900,80 Q1050,50 1200,100 L1200,350 L0,350 Z" fill="#0c180c" opacity="0.6" />

      {/* Mid hills */}
      <path d="M0,160 Q100,120 250,150 Q400,100 550,140 Q700,110 850,145 Q1000,105 1200,150 L1200,350 L0,350 Z" fill="#111e11" opacity="0.7" />

      {/* TREE 1 — tall bare tree, left */}
      <g transform="translate(80, 80)" opacity="0.6">
        <line x1="0" y1="270" x2="0" y2="100" stroke="#1a1a1a" strokeWidth="8" />
        <line x1="0" y1="100" x2="0" y2="0" stroke="#1a1a1a" strokeWidth="5" />
        <path d="M0,60 Q-30,30 -60,15" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <path d="M0,80 Q-25,55 -45,50" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M0,50 Q30,20 55,5" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <path d="M0,100 Q35,70 65,60" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M0,130 Q-40,100 -70,95" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M-60,15 Q-70,5 -80,0" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        <path d="M55,5 Q65,-5 75,-8" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        <path d="M-45,50 Q-55,42 -65,40" stroke="#1a1a1a" strokeWidth="1" fill="none" />
        <path d="M65,60 Q78,52 85,48" stroke="#1a1a1a" strokeWidth="1" fill="none" />
      </g>

      {/* TREE 2 — right side */}
      <g transform="translate(950, 100)" opacity="0.55">
        <line x1="0" y1="250" x2="0" y2="80" stroke="#1a1a1a" strokeWidth="7" />
        <line x1="0" y1="80" x2="0" y2="0" stroke="#1a1a1a" strokeWidth="4" />
        <path d="M0,40 Q-35,15 -55,0" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M0,65 Q30,35 50,25" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M0,90 Q-30,65 -50,55" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M0,110 Q25,85 45,80" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M-55,0 Q-62,-8 -70,-12" stroke="#1a1a1a" strokeWidth="1" fill="none" />
        <path d="M50,25 Q60,18 68,15" stroke="#1a1a1a" strokeWidth="1" fill="none" />
      </g>

      {/* TREE 3 — small distant left */}
      <g transform="translate(250, 115)" opacity="0.35">
        <line x1="0" y1="235" x2="0" y2="60" stroke="#1a1a1a" strokeWidth="5" />
        <path d="M0,60 Q-20,35 -35,25" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M0,80 Q18,55 32,45" stroke="#1a1a1a" strokeWidth="2" fill="none" />
        <path d="M0,100 Q-22,78 -38,72" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      </g>

      {/* TREE 4 — distant right */}
      <g transform="translate(1100, 120)" opacity="0.3">
        <line x1="0" y1="230" x2="0" y2="50" stroke="#1a1a1a" strokeWidth="4" />
        <path d="M0,50 Q-18,30 -30,20" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
        <path d="M0,70 Q15,50 25,40" stroke="#1a1a1a" strokeWidth="1.5" fill="none" />
      </g>

      {/* Main ground */}
      <path d="M0,200 Q200,185 400,195 Q600,180 800,190 Q1000,178 1200,195 L1200,350 L0,350 Z" fill="url(#mud-grad)" />

      {/* Grass tufts */}
      {[50, 120, 200, 310, 420, 530, 640, 720, 800, 880, 960, 1050, 1130].map((gx, i) => (
        <g key={`grass-${i}`} transform={`translate(${gx}, ${190 + Math.sin(i) * 5})`} opacity="0.5">
          <line x1="0" y1="0" x2="-4" y2="-12" stroke="#1a3a1a" strokeWidth="1.5" />
          <line x1="3" y1="0" x2="0" y2="-15" stroke="#1a3a1a" strokeWidth="1.5" />
          <line x1="6" y1="0" x2="10" y2="-11" stroke="#1a3a1a" strokeWidth="1.5" />
        </g>
      ))}

      {/* Puddles */}
      <ellipse cx="350" cy="250" rx="60" ry="10" fill="url(#puddle-grad)" />
      <ellipse cx="750" cy="240" rx="45" ry="8" fill="url(#puddle-grad)" />
      <ellipse cx="550" cy="260" rx="35" ry="6" fill="url(#puddle-grad)" />

      {/* Animated ripples */}
      <motion.ellipse cx="350" cy="250" fill="none" stroke="rgba(150,200,255,0.2)" strokeWidth="0.5"
        initial={{ rx: 8, ry: 2, opacity: 0.4 }}
        animate={{ rx: [8, 30], ry: [2, 6], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.ellipse cx="355" cy="248" fill="none" stroke="rgba(150,200,255,0.15)" strokeWidth="0.5"
        initial={{ rx: 5, ry: 1.5, opacity: 0.3 }}
        animate={{ rx: [5, 22], ry: [1.5, 4], opacity: [0.3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, repeatDelay: 1.5 }}
      />
      <motion.ellipse cx="750" cy="240" fill="none" stroke="rgba(150,200,255,0.2)" strokeWidth="0.5"
        initial={{ rx: 6, ry: 1.5, opacity: 0.35 }}
        animate={{ rx: [6, 25], ry: [1.5, 5], opacity: [0.35, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, repeatDelay: 2 }}
      />
      <motion.ellipse cx="552" cy="259" fill="none" stroke="rgba(150,200,255,0.15)" strokeWidth="0.5"
        initial={{ rx: 4, ry: 1, opacity: 0.3 }}
        animate={{ rx: [4, 18], ry: [1, 3.5], opacity: [0.3, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 1.2, repeatDelay: 1.8 }}
      />

      {/* Dirt trail */}
      <path d="M0,280 Q150,275 300,285 Q500,270 700,280 Q900,268 1200,278 L1200,310 Q900,300 700,312 Q500,298 300,315 Q150,305 0,310 Z" fill="#1f150d" opacity="0.5" />
    </svg>
  </div>
);

const FloodWater = () => (
  <motion.div
    initial={{ height: '0vh' }}
    animate={{ height: '70vh' }}
    transition={{ delay: 10, duration: 20, ease: 'linear' }}
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 35,
      pointerEvents: 'none',
      overflow: 'visible',
      opacity: 0.6,
    }}
  >
    {/* Wave surface */}
    <div style={{ position: 'absolute', top: '-25px', left: 0, right: 0, height: '30px' }}>
      <motion.svg
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <motion.path
          d="M0,15 Q50,0 100,15 Q150,30 200,15 Q250,0 300,15 Q350,30 400,15 Q450,0 500,15 Q550,30 600,15 Q650,0 700,15 Q750,30 800,15 Q850,0 900,15 Q950,30 1000,15 Q1050,0 1100,15 Q1150,30 1200,15 L1200,30 L0,30 Z"
          fill="rgba(15, 30, 60, 0.85)"
          animate={{
            d: [
              "M0,15 Q50,0 100,15 Q150,30 200,15 Q250,0 300,15 Q350,30 400,15 Q450,0 500,15 Q550,30 600,15 Q650,0 700,15 Q750,30 800,15 Q850,0 900,15 Q950,30 1000,15 Q1050,0 1100,15 Q1150,30 1200,15 L1200,30 L0,30 Z",
              "M0,15 Q50,30 100,15 Q150,0 200,15 Q250,30 300,15 Q350,0 400,15 Q450,30 500,15 Q550,0 600,15 Q650,30 700,15 Q750,0 800,15 Q850,30 900,15 Q950,0 1000,15 Q1050,30 1100,15 Q1150,0 1200,15 L1200,30 L0,30 Z",
              "M0,15 Q50,0 100,15 Q150,30 200,15 Q250,0 300,15 Q350,30 400,15 Q450,0 500,15 Q550,30 600,15 Q650,0 700,15 Q750,30 800,15 Q850,0 900,15 Q950,30 1000,15 Q1050,0 1100,15 Q1150,30 1200,15 L1200,30 L0,30 Z",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>

    {/* Second wave layer (lighter, offset) */}
    <div style={{ position: 'absolute', top: '-18px', left: 0, right: 0, height: '25px' }}>
      <motion.svg
        viewBox="0 0 1200 25"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <motion.path
          d="M0,12 Q75,0 150,12 Q225,25 300,12 Q375,0 450,12 Q525,25 600,12 Q675,0 750,12 Q825,25 900,12 Q975,0 1050,12 Q1125,25 1200,12 L1200,25 L0,25 Z"
          fill="rgba(20, 50, 90, 0.4)"
          animate={{
            d: [
              "M0,12 Q75,0 150,12 Q225,25 300,12 Q375,0 450,12 Q525,25 600,12 Q675,0 750,12 Q825,25 900,12 Q975,0 1050,12 Q1125,25 1200,12 L1200,25 L0,25 Z",
              "M0,12 Q75,25 150,12 Q225,0 300,12 Q375,25 450,12 Q525,0 600,12 Q675,25 750,12 Q825,0 900,12 Q975,25 1050,12 Q1125,0 1200,12 L1200,25 L0,25 Z",
              "M0,12 Q75,0 150,12 Q225,25 300,12 Q375,0 450,12 Q525,25 600,12 Q675,0 750,12 Q825,25 900,12 Q975,0 1050,12 Q1125,25 1200,12 L1200,25 L0,25 Z",
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>

    {/* Water body */}
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(10, 25, 55, 0.8) 0%, rgba(5, 15, 35, 0.92) 40%, rgba(2, 8, 20, 0.95) 100%)',
    }} />

    {/* Floating debris / foam on surface */}
    <motion.div
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top: '5px', left: '20%', width: '40px', height: '3px', background: 'rgba(150,180,200,0.15)', borderRadius: '2px' }}
    />
    <motion.div
      animate={{ x: [15, -25, 15] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      style={{ position: 'absolute', top: '8px', left: '55%', width: '30px', height: '2px', background: 'rgba(150,180,200,0.12)', borderRadius: '2px' }}
    />
    <motion.div
      animate={{ x: [-10, 30, -10] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      style={{ position: 'absolute', top: '3px', left: '75%', width: '25px', height: '2px', background: 'rgba(150,180,200,0.1)', borderRadius: '2px' }}
    />
  </motion.div>
);

const BoatPerson = ({ rescueStatus }) => {
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    if (rescueStatus === 'pulling') {
      setPhase('tipping');
    } else if (rescueStatus === 'sinking') {
      setPhase('sinking');
    } else if (rescueStatus === 'sunk') {
      setPhase('sunk');
    } else {
      // Flood is stable at 30s (10s delay + 20s duration)
      const timer = setTimeout(() => setPhase('entering'), 30000);
      return () => clearTimeout(timer);
    }
  }, [rescueStatus]);

  return (
    <motion.div
      initial={{ x: '110vw', y: 0, opacity: 0, rotate: 0 }}
      animate={
        phase === 'entering' ? { x: '42vw', y: 0, opacity: 1, rotate: 0, transition: { duration: 8, ease: "easeOut" } } :
        phase === 'tipping' ? { x: '42vw', y: '5vh', opacity: 1, rotate: -25, transition: { duration: 1.5, ease: "easeInOut" } } :
        phase === 'sinking' ? { x: '42vw', y: '60vh', opacity: 0, rotate: -70, transition: { duration: 2.5, ease: "easeIn" } } :
        phase === 'sunk' ? { opacity: 0 } :
        phase === 'leaving' ? { x: '-50vw', y: 0, opacity: 1, rotate: 0, transition: { duration: 4, ease: "easeIn" } } :
        phase === 'left' ? { opacity: 0 } :
        {}
      }
      style={{
        position: 'absolute',
        bottom: '68vh', // Sits slightly into the 70vh water
        left: 0,
        zIndex: 40, // Above flood (35)
        pointerEvents: 'none'
      }}
    >
      <motion.div
        animate={
          phase === 'tipping' || phase === 'sinking' || phase === 'sunk' ? {} : 
          { y: [0, -4, 2, 0], rotate: [0, -2, 2, 0] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="180" height="100" viewBox="0 0 180 100" style={{ overflow: 'visible' }}>
          {/* Boat Hull */}
          <path 
            d="M20,50 L160,50 L145,75 Q90,85 35,75 Z" 
            fill="var(--text-primary)" 
            opacity="0.9" 
          />
          <path 
            d="M20,50 L160,50 L145,75 Q90,85 35,75 Z" 
            fill="none" 
            stroke="var(--text-primary)" 
            strokeWidth="1" 
          />

          {/* Person Rowing (Girl) */}
          <g transform="translate(85, 25)">
            {/* The flowing hair (drawn first so it goes behind her back) */}
            <motion.path 
              d="M 5,-15 Q 15,-15 18,-5 Q 20,5 15,15 Q 10,5 8,-5 Z"
              fill="var(--text-primary)"
              animate={{ d: [
                "M 5,-15 Q 15,-15 18,-5 Q 20,5 15,15 Q 10,5 8,-5 Z",
                "M 5,-15 Q 18,-12 22,-2 Q 25,8 18,18 Q 12,8 8,-5 Z",
                "M 5,-15 Q 15,-15 18,-5 Q 20,5 15,15 Q 10,5 8,-5 Z"
              ]}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* The Head */}
            <circle cx="4" cy="-15" r="5" fill="var(--text-primary)" />
            {/* The Bun */}
            <circle cx="10" cy="-18" r="3.5" fill="var(--text-primary)" />

            {/* The Body (Dress silhouette, facing left) */}
            <path 
              d="M 4,-10 
                 Q -4,-2 -10,12 
                 Q -12,18 -10,22 
                 L 12,22 
                 Q 12,10 8,-2 Z" 
              fill="var(--text-primary)" 
            />

            {/* Oar & Arms */}
            <motion.g
              animate={phase === 'tipping' || phase === 'sinking' ? {} : { rotate: [-20, 20, -20] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: '4px', originY: '-8px' }}
            >
              {/* Arms extending from shoulder (4, -8) to oar handle (-20, 10) */}
              <path d="M 4,-8 L -20,10" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
              
              {/* Oar passing through hands (-20, 10) down to water (-60, 40) and up behind (20, -20) */}
              <line x1="-60" y1="40" x2="20" y2="-20" stroke="var(--text-primary)" strokeWidth="2.5" />
              
              {/* Oar Blade */}
              <path d="M-60,40 L-70,48 L-65,52 L-55,44 Z" fill="var(--text-primary)" />
            </motion.g>
          </g>

          {/* Waves hitting boat (Bow & Stern splashes) */}
          <motion.g
             animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
             transition={{ duration: 1.5, repeat: Infinity }}
          >
            {/* Bow wave */}
            <path d="M15,55 Q5,65 20,75" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M25,50 Q15,60 30,70" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
            
            {/* Stern wake */}
            <path d="M165,55 Q175,65 160,75" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
          </motion.g>

          {/* Small ripples around boat */}
          <motion.ellipse 
            cx="90" cy="80" 
            fill="none" stroke="white" strokeWidth="1"
            initial={{ rx: 40, ry: 5, opacity: 0.2 }}
            animate={{ rx: [40, 55], opacity: [0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const TypewriterText = ({ text, delay = 0, speed = 0.03, style }) => {
  const characters = Array.from(text);
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { delayChildren: delay, staggerChildren: speed }
        }
      }}
      style={style}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const CreditsScreen = ({ onRestart, onNext }) => {
  const credits = [
    { role: "Main Character Energy", name: "The User (You 💅)" },
    { role: "Girl With Pony", name: "Miss 55kg (A survivor tbh ✨)" },
    { role: "Drowning Man", name: "Mr. 75kg (Math was literally not on his side 💀)" },
    { role: "The Boat", name: "Holding 120kg (She did her best 😭)" },
    { role: "Grass", name: "Just vibing in the background 🌿" },
    { role: "Post Mail", name: "Delivering trauma since Act 1 📬" },
    { role: "The Rain", name: "AtmosphericOverlay.jsx (Paid actor 🌧️)" },
    { role: "The Sun", name: "Fired in Act 1 🚫☀️" },
    { role: "The Moon", name: "Working overtime 🌙" },
    { role: "Trust Issues", name: "TrustTest.jsx (Are u sure u trust me? 🚩)" },
    { role: "The Vibe", name: "MoodCheck.jsx (It was never 10/10 😭)" },
    { role: "Broken Hearts", name: "HeartGame.jsx (Shattered 💔)" },
    { role: "Bottled Trauma", name: "EmotionJar.jsx (Fragile, handle with care 🫙)" },
    { role: "Delusion Credentials", name: "BaddieResume.jsx (She is certified 📜)" },
    { role: "The Rising Tension", name: "FloodWater.svg (Literally drowning us 🌊)" },
    { role: "Physics & Gravity", name: "Framer Motion (Carrying this whole project 🚀)" },
    { role: "The Math", name: "Literally not mathing 📉" },
    { role: "Director & Dev", name: "Pishu (he/him) 💻💖" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(5, 10, 15, 0.5)', // More transparent so the blur is visible
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: '-350vh' }}
        transition={{ duration: 70, ease: "linear" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <h1 style={{ color: '#fca5a5', fontSize: '56px', marginBottom: '100px', fontStyle: 'italic' }}>The End.</h1>
        {credits.map((c, i) => (
          <div key={i} style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{c.role}</div>
            <div style={{ color: 'white', fontSize: '32px', fontWeight: 600 }}>{c.name}</div>
          </div>
        ))}
        
        <h2 style={{ color: '#a7f3d0', fontSize: '36px', marginTop: '100px', fontStyle: 'italic' }}>thanks for playing BADDIEE 💖</h2>
      </motion.div>

      {/* Continue to Next Chapter Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6, duration: 2 }}
        onClick={onNext}
        style={{
          position: 'absolute',
          bottom: '140px',
          padding: '16px 40px',
          borderRadius: '30px',
          background: 'rgba(255,255,255,0.1)',
          color: '#a7f3d0',
          border: '1.5px solid rgba(167,243,208,0.4)',
          cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '18px',
          fontWeight: 600,
          transition: 'all 0.3s',
          backdropFilter: 'blur(10px)',
          zIndex: 301
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(167,243,208,0.2)'; e.currentTarget.style.borderColor = 'rgba(167,243,208,0.8)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(167,243,208,0.4)'; }}
      >
        continue to next chapter 📱✨
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 55, duration: 2 }}
        onClick={onRestart}
        style={{
          position: 'absolute',
          bottom: '60px',
          padding: '16px 40px',
          borderRadius: '30px',
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '18px',
          fontWeight: 600,
          transition: 'all 0.3s',
          backdropFilter: 'blur(10px)',
          zIndex: 301
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
      >
        start over ✨
      </motion.button>
    </motion.div>
  );
};

export default function RainDrowning({ theme, onNext }) {
  const [showThemePrompt, setShowThemePrompt] = useState(theme === 'light');
  const [showRescuePrompt, setShowRescuePrompt] = useState(false);
  const [rescueStatus, setRescueStatus] = useState('idle');
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [finalOutcome, setFinalOutcome] = useState(''); // 'sunk' or 'survived'
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      setShowThemePrompt(false);
      // Trigger the rescue prompt exactly as the boat reaches the center
      const timer = setTimeout(() => setShowRescuePrompt(true), 38000);
      return () => clearTimeout(timer);
    } else {
      setShowThemePrompt(true);
    }
  }, [theme]);

  const handleRescueAttempt = () => {
    setShowRescuePrompt(false);
    setRescueStatus('pulling');
    
    // Sequence timing
    setTimeout(() => {
      setRescueStatus('sinking');
    }, 1500); // After pulling him up for 1.5s
    
    setTimeout(() => {
      setRescueStatus('sunk');
      setFinalOutcome('sunk');
      setShowFinalPrompt(true);
    }, 4000); // Takes 2.5s to sink fully
  };

  const handleLeaveHim = () => {
    setShowRescuePrompt(false);
    setRescueStatus('leaving');

    setTimeout(() => {
      setRescueStatus('left');
      setFinalOutcome('survived');
      setShowFinalPrompt(true);
    }, 4000); // Takes 4 seconds to row offscreen
  };

  if (showThemePrompt) {
    return (
      <div className="rain-theme-prompt" style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        pointerEvents: 'none',
      }}>
        {/* === CLOUD BUBBLE (positioned near toggle) === */}
        <motion.div 
          initial={{ y: 200, opacity: 0, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: '110px',
            right: '20px',
            width: '340px',
            height: '200px',
            pointerEvents: 'auto',
          }}
        >
          {/* Main Cloud Body */}
          <svg width="340" height="200" viewBox="0 0 340 200">
            {/* The little tail pointing to the toggle (top right corner of the cloud) */}
            <path d="M 280 60 Q 320 20 340 0 Q 310 40 310 70 Z" fill="white" />
            
            <ellipse cx="170" cy="100" rx="150" ry="70" fill="white" />
            <ellipse cx="90" cy="130" rx="85" ry="55" fill="none" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="170" cy="110" rx="95" ry="65" fill="none" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="255" cy="125" rx="75" ry="55" fill="none" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="130" cy="80" rx="65" ry="55" fill="none" stroke="#334155" strokeWidth="2.5" />
            <ellipse cx="210" cy="70" rx="70" ry="55" fill="none" stroke="#334155" strokeWidth="2.5" />
          </svg>

          {/* Text Content - appears after cloud arrives */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            style={{
              position: 'absolute',
              top: '40px',
              left: '30px',
              right: '30px',
              bottom: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              textAlign: 'center'
            }}
          >
            <p style={{ 
              fontSize: '15px', 
              color: '#1e293b', 
              fontFamily: "'Outfit', sans-serif", 
              fontWeight: 400, 
              margin: 0, 
              lineHeight: '1.5' 
            }}>
              kavyu, check out dark mode rn.<br/>
              it's <span style={{ fontStyle: 'italic', opacity: 0.6 }}>lit</span> rn.<br/>
              no cap.
            </p>
          </motion.div>
        </motion.div>

        {/* === DASHED ARROW (fixed, from cloud to toggle) === */}
        <motion.svg
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '200px',
            height: '120px',
            zIndex: 101,
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          viewBox="0 0 200 120"
        >
          {/* Dashed curve from below (cloud area) up to the toggle */}
          <motion.path
            d="M 100 110 C 100 70, 140 40, 155 52"
            fill="none"
            stroke="#334155"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, delay: 2.8, ease: 'easeOut' }}
          />
          {/* Arrowhead */}
          <motion.path
            d="M 148 42 L 158 52 L 148 62"
            fill="none"
            stroke="#334155"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.4, delay: 4 }}
          />
        </motion.svg>
      </div>
    );
  }

  return (
    <div className="rain-drowning-container" style={{ minHeight: '100vh', width: '100%', position: 'relative', background: 'var(--bg-deep)', overflow: 'hidden' }}>
      {/* Rain Animation Layer */}
      <div className="rain-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
        <div className="rain-css" />
      </div>

      <RainLandscape />
      <UmbrellaPerson rescueStatus={rescueStatus} />
      <FloodWater />
      <BoatPerson rescueStatus={rescueStatus} />

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2 }}
        style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20 }}
      >
        <motion.div
          animate={{ filter: 'blur(10px)', opacity: 0 }}
          transition={{ delay: 5, duration: 3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '40px' }}
          >
            drowning in the blue...
          </motion.h1>

          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.6 }}
             transition={{ delay: 2, duration: 2 }}
             style={{ maxWidth: '500px', textAlign: 'center', lineHeight: '1.8', color: 'var(--text-secondary)', padding: '0 20px' }}
          >
            sometimes the sky is too heavy to hold. <br/>
            so we let it fall.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Rescue Prompt Overlay */}
      <AnimatePresence>
        {showRescuePrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: 'calc(-50% + 20px)' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 100,
              background: 'rgba(5, 10, 15, 0.3)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              maxWidth: '440px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', color: '#fca5a5', fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}>
              Love, wait. we have a situation.
            </h3>
            <p style={{ margin: '0 0 35px 0', fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              the girlie in the boat is 55kg, and the boat holds 120kg max. the guy drowning is 65kg... meaning the total is exactly 120kg. <br/><br/>
              if u pull him in, the boat might sink or might not, as it will be literally touching the threshold. <br/><br/>
              <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>would u risk it all to save him anyway?</span>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <button 
                onClick={handleRescueAttempt}
                style={{
                  padding: '14px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(248, 113, 113, 0.3)',
                  background: 'rgba(248, 113, 113, 0.05)',
                  color: '#fca5a5',
                  fontWeight: 400,
                  fontSize: '14px',
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(248, 113, 113, 0.15)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(248, 113, 113, 0.05)'; }}
              >
                save him anyway
              </button>
              <button 
                onClick={handleLeaveHim}
                style={{
                  padding: '14px 20px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontWeight: 300,
                  fontSize: '14px',
                  fontFamily: "'Outfit', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                girl needs to be saved, let him die
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Consequence Overlay */}
      <AnimatePresence>
        {showFinalPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {finalOutcome === 'sunk' ? (
              <>
                <h2 style={{ color: '#fca5a5', fontFamily: "'Outfit', sans-serif", fontSize: '32px', textAlign: 'center', marginBottom: '20px', fontWeight: 500 }}>
                  <TypewriterText delay={0.5} speed={0.05} text="my sweet girl 🥺..." />
                  <br/>
                  <TypewriterText delay={2.0} speed={0.04} style={{ color: 'white', fontStyle: 'italic', fontSize: '38px', fontWeight: 400 }} text="math is literally math 💔" />
                </h2>
                
                <div style={{ color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", fontSize: '18px', textAlign: 'center', maxWidth: '550px', lineHeight: '1.6', marginBottom: '40px' }}>
                  <TypewriterText delay={4.0} speed={0.03} text="Love, i know u just wanted to save him bc u have the purest heart 😭💖. " />
                  <TypewriterText delay={6.8} speed={0.06} text="but he was actually " />
                  <TypewriterText delay={9.0} speed={0.05} text="75kg the whole time." />
                  <br/><br/>
                  <TypewriterText delay={11.0} speed={0.04} style={{ color: 'white', fontWeight: 600 }} text="75 + 55 = 130 babes." />
                  <TypewriterText delay={12.3} speed={0.03} text=" the boat could literally only hold 120." />
                  <br/><br/>
                  <TypewriterText delay={14.5} speed={0.05} style={{ fontStyle: 'italic', color: '#f87171' }} text="moral of the story:" />
                  <TypewriterText delay={16.0} speed={0.03} text=" please don't sacrifice yourself and blindly trust things just bc u wanna &quot;do the right thing&quot;. your peace and safety come first 🥺💅 " />
                  <TypewriterText delay={20.8} speed={0.06} text="rip to u both tho." />
                </div>
              </>
            ) : (
              <>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ color: '#a7f3d0', fontFamily: "'Outfit', sans-serif", fontSize: '38px', textAlign: 'center', marginBottom: '20px', fontStyle: 'italic', fontWeight: 400 }}
                >
                  you did the right thing love ✨
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  style={{ color: 'var(--text-secondary)', fontFamily: "'Outfit', sans-serif", fontSize: '18px', textAlign: 'center', maxWidth: '550px', lineHeight: '1.6', marginBottom: '40px' }}
                >
                  sometimes you literally just have to protect your own peace. 🥺💖<br/><br/>
                  the math wasn't mathing, and you chose yourself. i'm so so proud of u kv. never sacrifice your own boat for someone else's storm. 💅✨
                </motion.p>
              </>
            )}

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: finalOutcome === 'sunk' ? 22.5 : 2.5, duration: 1 }}
              onClick={() => setShowCredits(true)} 
              style={{ 
                padding: '14px 40px', 
                borderRadius: '30px', 
                background: 'transparent', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.3)', 
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            >
              continue anyway
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {showCredits && <CreditsScreen onRestart={() => {
        localStorage.clear();
        window.location.reload();
      }} onNext={onNext} />}

      <style dangerouslySetInnerHTML={{ __html: `
        .rain-css {
          position: absolute;
          width: 100%;
          height: 100%;
          background: url('https://raw.githubusercontent.com/PavelDoGreat/WebGL-Fluid-Simulation/master/logo.png') repeat;
          opacity: 0.05;
        }
        
        .rain-drowning-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }
      `}} />
    </div>
  );
}
