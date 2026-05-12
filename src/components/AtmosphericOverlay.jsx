import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground, { rainConfig, starConfig } from './ParticleBackground';
import CloudLayer from './CloudLayer';

const Sun = ({ isVisible, isHeartbroken }) => (
  <motion.div
    initial={{ y: 100, x: -100, opacity: 0, scale: 0 }}
    animate={{ 
      y: isHeartbroken ? '120vh' : (isVisible ? 0 : 100), 
      x: isVisible ? 0 : -100, 
      opacity: isVisible ? 1 : 0, 
      scale: isVisible ? 1 : 0 
    }}
    transition={{ 
      type: 'spring', 
      stiffness: isHeartbroken ? 50 : 100, 
      damping: 20,
      duration: isHeartbroken ? 4 : 1.5 
    }}
    style={{
      position: 'fixed',
      top: 'clamp(40px, 10vh, 100px)',
      left: 'clamp(40px, 10vw, 100px)',
      width: 'clamp(80px, 15vw, 120px)',
      height: 'clamp(80px, 15vw, 120px)',
      background: 'radial-gradient(circle, #fce152 0%, #facc15 70%, transparent 100%)',
      borderRadius: '50%',
      filter: 'blur(15px)',
      boxShadow: '0 0 80px #fde047',
      zIndex: 1,
      pointerEvents: 'none'
    }}
  >
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)'
      }}
    />
  </motion.div>
);

const Moon = ({ isVisible, isHeartbroken }) => (
  <motion.div
    initial={{ y: 100, x: -100, opacity: 0, scale: 0 }}
    animate={{ 
      y: isHeartbroken ? '120vh' : (isVisible ? 0 : 100), 
      x: isVisible ? 0 : -100, 
      opacity: isVisible ? 1 : 0, 
      scale: isVisible ? 1 : 0 
    }}
    transition={{ 
      type: 'spring', 
      stiffness: isHeartbroken ? 50 : 100, 
      damping: 20,
      duration: isHeartbroken ? 4 : 1.5 
    }}
    style={{
      position: 'fixed',
      top: 'clamp(40px, 10vh, 100px)',
      left: 'clamp(40px, 10vw, 100px)',
      width: 'clamp(70px, 12vw, 100px)',
      height: 'clamp(70px, 12vw, 100px)',
      background: 'radial-gradient(circle, #f3f2d8 0%, #d9d8c0 70%, transparent 100%)',
      borderRadius: '50%',
      filter: 'blur(5px)',
      boxShadow: '0 0 40px rgba(243, 242, 216, 0.4)',
      zIndex: 1,
      pointerEvents: 'none'
    }}
  >
    <div style={{ position: 'absolute', top: '20%', left: '30%', width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)' }} />
    <div style={{ position: 'absolute', top: '50%', left: '20%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)' }} />
    <div style={{ position: 'absolute', top: '40%', left: '60%', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)' }} />
  </motion.div>
);

const FallingFlower = ({ delay, x, speed, isHeartbroken }) => (
  <motion.div
    initial={{ x: `${x}vw`, y: -20, opacity: 0, rotate: 0 }}
    animate={{ 
      y: isHeartbroken ? '120vh' : '110vh',
      x: isHeartbroken ? [`${x}vw`, `${x + 20}vw`] : [`${x}vw`, `${x + 10}vw`, `${x - 5}vw`, `${x + 2}vw`],
      opacity: [0, 1, 1, 0],
      rotate: 720
    }}
    transition={{
      duration: isHeartbroken ? 3 : speed,
      delay: isHeartbroken ? 0 : delay,
      repeat: isHeartbroken ? 0 : Infinity,
      ease: isHeartbroken ? 'easeIn' : 'linear'
    }}
    style={{ position: 'fixed', zIndex: 2, pointerEvents: 'none' }}
  >
    <svg width="15" height="15" viewBox="0 0 20 20">
      <path d="M10 0 C12 5 18 5 18 10 C18 15 12 15 10 20 C8 15 2 15 2 10 C2 5 8 5 10 0" fill="#fbcfe8" opacity="0.8" />
      <circle cx="10" cy="10" r="2" fill="#fdf2f8" />
    </svg>
  </motion.div>
);

const Butterfly = ({ delay, x, y, speed, isHeartbroken }) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      x: isHeartbroken ? x : [x, x + 50, x - 50, x],
      y: isHeartbroken ? '120vh' : [y, y - 30, y + 20, y],
      opacity: isHeartbroken ? [1, 0] : 1
    }}
    transition={{
      duration: isHeartbroken ? 2 : speed,
      delay: isHeartbroken ? 0.2 : delay,
      repeat: isHeartbroken ? 0 : Infinity,
      ease: isHeartbroken ? 'easeIn' : 'easeInOut'
    }}
    style={{ position: 'fixed', zIndex: 2, pointerEvents: 'none' }}
  >
    <motion.svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20"
      animate={{ rotateY: [0, 180, 0] }}
      transition={{ duration: 0.2, repeat: Infinity }}
    >
      <path d="M10 10 C10 0 0 0 0 10 C0 20 10 20 10 10 M10 10 C10 0 20 0 20 10 C20 20 10 20 10 10" fill="#f472b6" opacity="0.8" />
    </motion.svg>
  </motion.div>
);

const RainDrop = ({ x, delay, duration }) => (
  <motion.div
    initial={{ x: `${x}vw`, y: -20, opacity: 0 }}
    animate={{ 
      y: '110vh',
      opacity: [0, 0.45, 0.45, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear'
    }}
    style={{ 
      position: 'fixed', 
      width: '1px', 
      height: '40px', 
      background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))',
      zIndex: 11,
      pointerEvents: 'none'
    }}
  />
);

const StormFlash = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 0.25, 0, 0.35, 0],
    }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: Math.random() * 6 + 2
    }}
    style={{ 
      position: 'fixed', 
      inset: 0, 
      background: 'white', 
      zIndex: 10, 
      pointerEvents: 'none' 
    }}
  />
);

const LightningBolt = ({ x, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0, 1, 0.4, 1, 0],
    }}
    transition={{
      duration: 0.3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 7 + 2
    }}
    style={{ position: 'fixed', top: 0, left: `${x}vw`, zIndex: 11, pointerEvents: 'none' }}
  >
    <svg width="150" height="800" viewBox="0 0 150 800" style={{ filter: 'drop-shadow(0 0 20px #fef08a)' }}>
      <motion.path
        d="M75,0 L45,150 L95,220 L25,400 L85,550 L55,800"
        stroke="#fef08a"
        strokeWidth="5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.08 }}
      />
    </svg>
  </motion.div>
);

const Lightning = () => (
  <>
    <StormFlash />
    <LightningBolt x={10} delay={1} />
    <LightningBolt x={30} delay={3} />
    <LightningBolt x={50} delay={5} />
    <LightningBolt x={70} delay={2} />
    <LightningBolt x={85} delay={4} />
    <LightningBolt x={95} delay={6} />
  </>
);

const FallingDebris = ({ delay, x, size, rotate, color }) => (
  <motion.div
    initial={{ x: `${x}vw`, y: -100, opacity: 0, rotate }}
    animate={{ 
      y: '120vh',
      x: `${x + (Math.random() * 20 - 10)}vw`,
      opacity: [0, 1, 1, 0],
      rotate: rotate + (Math.random() * 720 - 360)
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      delay,
      ease: [0.45, 0, 0.55, 1]
    }}
    style={{ 
      position: 'fixed', 
      zIndex: 0, 
      pointerEvents: 'none',
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      filter: 'blur(1px)',
      boxShadow: `0 0 20px ${color}`
    }}
  />
);

const Firefly = ({ delay, x, y, speed, isHeartbroken }) => (
  <motion.div
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      x: isHeartbroken ? x : [x, x + 30, x - 20, x],
      y: isHeartbroken ? '120vh' : [y, y - 20, y + 10, y],
      opacity: isHeartbroken ? [1, 0] : [0, 0.8, 0.4, 0.8, 0]
    }}
    transition={{
      duration: isHeartbroken ? 2.5 : speed,
      delay: isHeartbroken ? 0.1 : delay,
      repeat: isHeartbroken ? 0 : Infinity,
      ease: isHeartbroken ? 'easeIn' : 'easeInOut'
    }}
    style={{ 
      position: 'fixed', 
      zIndex: 2, 
      pointerEvents: 'none',
      width: '4px',
      height: '4px',
      background: '#fef08a',
      borderRadius: '50%',
      boxShadow: '0 0 10px #fef08a, 0 0 20px #eab308'
    }}
  />
);

const DetailedLeaf = ({ x, y, rotate, scale, color }) => (
  <path
    d="M0,0 C10,-10 20,-10 30,0 C20,10 10,10 0,0 Z"
    fill={color}
    transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}
    style={{ transformOrigin: '0% 0%' }}
  />
);

const Branch = ({ isLight, theme, delay, isHeartbroken, isRight = false }) => {
  const branchColor = isLight ? '#3f6212' : '#020617';
  const leafColor1 = isLight ? '#65a30d' : '#0f172a';
  const leafColor2 = isLight ? '#4d7c0f' : '#1e293b';
  const leafColor3 = isLight ? '#3f6212' : '#020617';
  
  const shadow = isLight 
    ? 'drop-shadow(4px 8px 12px rgba(0, 0, 0, 0.15))' 
    : 'drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.8))';

  const leaves1 = [
    {x: 20, y: 10, r: 45}, {x: 75, y: 12, r: 30},
    {x: 135, y: 3, r: -10}, {x: 155, y: -2, r: -30},
    {x: 45, y: 18, r: 60}, {x: 105, y: 8, r: 15}
  ];
  const leaves2 = [
    {x: 45, y: 30, r: 85}, {x: 48, y: 85, r: 105},
    {x: 55, y: 40, r: 90}, {x: 58, y: 100, r: 115}
  ];
  const leaves3 = [
    {x: 95, y: 25, r: 75}, {x: 112, y: 90, r: 95},
    {x: 100, y: 40, r: 80}, {x: 118, y: 110, r: 105}
  ];

  return (
    <motion.div
      initial={{ y: -400, opacity: 0 }}
      animate={{ 
        y: isHeartbroken ? '120vh' : 0, 
        opacity: 1,
        rotate: isHeartbroken ? (isRight ? -15 : 15) : 0
      }}
      transition={{ 
        duration: isHeartbroken ? 3.5 : 2.2, 
        ease: isHeartbroken ? 'easeIn' : [0.34, 1.1, 0.64, 1],
        delay: isHeartbroken ? 0.3 : delay 
      }}
      className="branch-container"
      style={{ 
        position: 'fixed', 
        top: 0, 
        [isRight ? 'right' : 'left']: 0, 
        zIndex: 3, 
        pointerEvents: 'none',
        transform: isRight ? 'scaleX(-1)' : 'none',
        width: 'min(500px, 70vw)'
      }}
    >
      <motion.div style={{ filter: shadow, marginTop: '-20px', [isRight ? 'marginRight' : 'marginLeft']: '-30px' }}>
        <motion.svg 
          viewBox="0 0 200 200" 
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
          animate={{ rotate: isHeartbroken ? 0 : [0, 2, 0, -2, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M0,0 C40,20 100,10 160,0" stroke={branchColor} strokeWidth="3" fill="none" />
          <path d="M40,15 C60,40 50,80 40,120" stroke={branchColor} strokeWidth="2" fill="none" />
          <path d="M90,10 C110,50 100,90 110,130" stroke={branchColor} strokeWidth="1.5" fill="none" />
          
          {leaves1.map((l, i) => (
            <DetailedLeaf key={`l1-${i}`} x={l.x} y={l.y} rotate={l.r} scale={1} color={i % 2 === 0 ? leafColor1 : leafColor2} />
          ))}
          {leaves2.map((l, i) => (
            <DetailedLeaf key={`l2-${i}`} x={l.x} y={l.y} rotate={l.r} scale={0.9} color={i % 2 === 0 ? leafColor2 : leafColor3} />
          ))}
          {leaves3.map((l, i) => (
            <DetailedLeaf key={`l3-${i}`} x={l.x} y={l.y} rotate={l.r} scale={0.8} color={i % 2 === 0 ? leafColor1 : leafColor3} />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

const Bird = ({ delay, y, speed, scale, isHeartbroken }) => {
  return (
    <motion.div
      initial={{ x: -100, y }}
      animate={{ 
        x: isHeartbroken ? 120 : '110vw',
        y: isHeartbroken ? '120vh' : y,
        rotate: isHeartbroken ? 45 : 0
      }}
      transition={{
        duration: isHeartbroken ? 2 : speed,
        delay: isHeartbroken ? 0 : delay,
        repeat: isHeartbroken ? 0 : Infinity,
        ease: isHeartbroken ? 'easeIn' : 'linear'
      }}
      style={{ position: 'fixed', zIndex: 1, pointerEvents: 'none', scale }}
    >
      <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
        <motion.path
          d="M2 10C5 5 10 5 15 10C20 5 25 5 28 10"
          animate={{
            d: isHeartbroken 
              ? "M2 10C5 5 10 5 15 10C20 5 25 5 28 10" 
              : ["M2 10C5 5 10 5 15 10C20 5 25 5 28 10", "M2 10C5 15 10 15 15 10C20 15 25 15 28 10"]
          }}
          transition={{ 
            duration: 0.4, 
            repeat: isHeartbroken ? 0 : Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};

export default function AtmosphericOverlay({ theme, isHeartbroken, isSkyFalling, isRaining: propIsRaining, isStorming: propIsStorming }) {
  const isLight = theme === 'light';
  const [localIsRaining, setLocalIsRaining] = useState(false);

  useEffect(() => {
    let rainTimeout, stopRainTimeout;
    const startRainCycle = () => {
      rainTimeout = setTimeout(() => {
        setLocalIsRaining(true);
        stopRainTimeout = setTimeout(() => {
          setLocalIsRaining(false);
          startRainCycle();
        }, Math.random() * 5000 + 5000);
      }, Math.random() * 15000 + 10000);
    };
    startRainCycle();
    return () => { clearTimeout(rainTimeout); clearTimeout(stopRainTimeout); };
  }, []);

  const isRaining = propIsRaining || localIsRaining;
  const isStorming = propIsStorming || isRaining; // Storming usually accompanies rain here

  const birds = [
    { delay: 0, y: '10%', speed: 20, scale: 0.8 },
    { delay: 5, y: '45%', speed: 25, scale: 0.6 },
    { delay: 12, y: '28%', speed: 18, scale: 1 },
  ];

  const butterflies = [
    { delay: 0, x: '10vw', y: '80vh', speed: 8 },
    { delay: 2, x: '80vw', y: '75vh', speed: 10 },
  ];

  const flowers = [
    { delay: 0, x: 10, speed: 15 },
    { delay: 5, x: 30, speed: 18 },
  ];

  const fireflies = [
    { delay: 0, x: '15vw', y: '40vh', speed: 4 },
    { delay: 1, x: '75vw', y: '30vh', speed: 5 },
    { delay: 2, x: '50vw', y: '60vh', speed: 6 },
  ];

  const heavyRain = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.5 + Math.random() * 0.3
    }));
  }, []);

  const debris = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      delay: Math.random() * 5,
      x: Math.random() * 100,
      size: 10 + Math.random() * 40,
      rotate: Math.random() * 360,
      color: isLight 
        ? (Math.random() > 0.5 ? 'rgba(2, 132, 199, 0.15)' : 'rgba(255, 255, 255, 0.4)')
        : (Math.random() > 0.5 ? 'rgba(125, 211, 252, 0.4)' : 'rgba(255, 255, 255, 0.3)')
    }));
  }, [isLight]);

  return (
    <div className="atmospheric-overlay" style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {/* Global Sky Base (Stars & Clouds) */}
      {!isHeartbroken && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Star particles */}
          {!isLight && <ParticleBackground config={starConfig} id="global-stars" />}

          {/* Cloud layers (3 speeds for parallax) */}
          <CloudLayer speed={60} opacity={isLight ? 0.05 : 0.08} blur={12} count={6} seed={1} />
          <CloudLayer speed={40} opacity={isLight ? 0.1 : 0.15} blur={8} count={5} seed={2} />
          <CloudLayer speed={25} opacity={isLight ? 0.15 : 0.2} blur={4} count={4} seed={3} />
        </motion.div>
      )}

      <AnimatePresence>
        {isSkyFalling && debris.map((d, i) => (
          <FallingDebris key={`debris-${i}`} {...d} />
        ))}
      </AnimatePresence>
      <Sun isVisible={isLight} isHeartbroken={isHeartbroken} />
      <Moon isVisible={!isLight} isHeartbroken={isHeartbroken} />
      
      {/* Left Lush Branch */}
      <Branch isLight={isLight} theme={theme} delay={0} isHeartbroken={isHeartbroken} />

      {/* Right Lush Branch */}
      <Branch isLight={isLight} theme={theme} delay={0.2} isHeartbroken={isHeartbroken} isRight={true} />

      <AnimatePresence>
        {!isLight && (
          <motion.div key="night-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {fireflies.map((ff, i) => <Firefly key={`ff-${i}`} {...ff} isHeartbroken={isHeartbroken} />)}
            {isRaining && !isHeartbroken && (
              <>
                {heavyRain.map((drop, i) => <RainDrop key={`drop-${i}`} {...drop} />)}
                <Lightning />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLight && (
          <motion.div key="day-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {birds.map((bird, i) => <Bird key={`bird-${i}`} {...bird} isHeartbroken={isHeartbroken} />)}
            {flowers.map((flower, i) => <FallingFlower key={`flower-${i}`} {...flower} isHeartbroken={isHeartbroken} />)}
            {butterflies.map((bf, i) => <Butterfly key={`bf-${i}`} {...bf} isHeartbroken={isHeartbroken} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
