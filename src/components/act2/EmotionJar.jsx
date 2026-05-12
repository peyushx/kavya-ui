import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Particle component for golden chaos
function GoldenParticles({ count, speed }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      dur: (2 + Math.random() * 3) / speed,
      delay: Math.random() * 2,
    })), [count, speed]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: '50%', background: '#fbbf24', boxShadow: `0 0 ${p.size * 2}px rgba(251,191,36,0.6)` }}
          animate={{ x: [0, (Math.random()-.5)*200*speed, (Math.random()-.5)*150*speed, 0], y: [0, (Math.random()-.5)*200*speed, (Math.random()-.5)*150*speed, 0], opacity: [0.3, 0.9, 0.5, 0.3], scale: [1, 1.5, 0.8, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// The jar SVG
function JarSVG({ fillPercent, isPulsing, isGlowing, isOverflowing }) {
  const jarBottom = 268, jarRange = 206;
  const fillY = jarBottom - (fillPercent / 100) * jarRange;

  return (
    <div style={{ position: 'relative', width: 'min(150px, 40vw)', height: 'min(220px, 60vw)', zIndex: 5, color: 'var(--text-primary)' }}>
      <motion.svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%', overflow: 'visible' }}
        animate={{ scale: isPulsing ? 1.06 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
        <defs>
          <clipPath id="jc"><path d="M42,62 C42,42 62,42 62,42 L138,42 C138,42 158,42 158,62 L163,218 C163,248 138,268 100,268 C62,268 37,248 37,218 Z" /></clipPath>
          <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="gs" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.01" />
            <stop offset="18%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="30%" stopColor="currentColor" stopOpacity="0.01" />
          </linearGradient>
          <radialGradient id="og" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d="M40,60 C40,40 60,40 60,40 L140,40 C140,40 160,40 160,60 L165,220 C165,250 140,270 100,270 C60,270 35,250 35,220 Z"
          fill="currentColor" fillOpacity="0.02" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />

        <g clipPath="url(#jc)">
          <motion.rect x="30" width="140" height="280" fill="url(#fg)"
            initial={{ y: jarBottom }} animate={{ y: fillY }}
            transition={{ type: 'spring', damping: 18, stiffness: 40, mass: 1.2 }} />
          {fillPercent > 15 && [0,1,2].map(i => (
            <motion.circle key={i} cx={60 + i * 35} cy={260} r={2}
              fill="rgba(255,255,255,0.18)"
              animate={{ cy: [260, Math.max(fillY + 20, 80), Math.max(fillY, 62)], opacity: [0, 0.4, 0] }}
              transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 1.2 }} />
          ))}
        </g>

        <path d="M52,70 L52,210 C52,235 72,245 100,245" fill="none" stroke="url(#gs)" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
        <rect x="65" y="26" width="70" height="10" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
        <rect x="58" y="35" width="84" height="7" rx="3" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />

        {isOverflowing && (
          <motion.ellipse cx="100" cy="38" rx="45" ry="12" fill="url(#og)"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0.5, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        )}
      </motion.svg>

      {isGlowing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{ position: 'absolute', inset: '-40%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(251,191,36,0.2) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
      )}

      <AnimatePresence>
        {isOverflowing && [...Array(6)].map((_, i) => (
          <motion.div key={`d${i}`} initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, 30 + Math.random() * 50, 80], opacity: [0, 0.9, 0], scaleY: [0.5, 1.5, 0.8] }}
            transition={{ duration: 1.2 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.25, ease: 'easeIn' }}
            style={{ position: 'absolute', top: '13%', left: `${25 + Math.random() * 50}%`, width: '5px', height: '8px', borderRadius: '0 0 5px 5px', background: 'linear-gradient(180deg,#fbbf24,#d97706)', boxShadow: '0 0 6px rgba(251,191,36,0.5)', zIndex: 10 }} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Narrative line items with timing
const STORY = [
  // Phase 0: Intro question (handled separately)
  // Phase 1: After answer — auto-fill begins
  { text: "every person you meet leaves something behind in you.", phase: 'filling', delay: 0 },
  { text: "a laugh. a scar. a lesson. a feeling you can't name.", phase: 'filling', delay: 4000 },
  { text: "and you? you collected ALL of them.", phase: 'filling', delay: 8000 },
  // Phase 2: Jar is full — chaos
  { text: "okay so that jar is FULL now", phase: 'chaos', delay: 0 },
  { text: "and slightly chaotic", phase: 'chaos', delay: 2500 },
  { text: "just like you", phase: 'chaos', delay: 5000 },
  { text: "i'm obsessed", phase: 'chaos', delay: 7500, style: 'highlight' },
  // Phase 3: Settling
  { text: "you know what's wild?", phase: 'settling', delay: 0 },
  { text: "an empty jar becomes beautiful the moment someone fills it.", phase: 'settling', delay: 3000 },
  { text: "congrats. you're about to see how beautiful this gets.", phase: 'settling', delay: 7000, style: 'personal' },
];

export default function EmotionJar({ onNext }) {
  const [phase, setPhase] = useState('question');     // question → filling → chaos → settling → done
  const [answer, setAnswer] = useState(null);
  const [fillPercent, setFillPercent] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentText, setCurrentText] = useState(null); // { text, style }
  const [particleSpeed, setParticleSpeed] = useState(0);
  const [particleCount, setParticleCount] = useState(0);
  const fillingDone = useRef(false);
  const chaosDone = useRef(false);
  const settleDone = useRef(false);

  // --- Handle YES/NO ---
  const handleAnswer = (a) => {
    setAnswer(a);
    setIsGlowing(true);
    setCurrentText({
      text: a === 'yes' ? "then why does mine feel so full right now 😭" : "mood. let's fix that.",
      style: 'personal'
    });
    setTimeout(() => {
      setIsGlowing(false);
      setPhase('filling');
    }, 3500);
  };

  // --- FILLING: jar auto-fills, narration plays ---
  useEffect(() => {
    if (phase !== 'filling' || fillingDone.current) return;
    fillingDone.current = true;

    setParticleCount(10);
    setParticleSpeed(0.8);

    // Schedule narration
    const fillingLines = STORY.filter(s => s.phase === 'filling');
    fillingLines.forEach(line => {
      setTimeout(() => setCurrentText({ text: line.text, style: line.style || 'system' }), line.delay);
    });

    // Gradually fill jar
    let fill = 0;
    const iv = setInterval(() => {
      fill += 1;
      setFillPercent(Math.min(fill, 100));
      if (fill > 20) { setParticleCount(20); setParticleSpeed(1); }
      if (fill > 50) { setParticleCount(35); setParticleSpeed(1.5); }
      if (fill > 75) { setParticleCount(50); setParticleSpeed(2.2); }
      if (fill >= 100) { clearInterval(iv); setTimeout(() => setPhase('chaos'), 1000); }
    }, 100); // ~10 seconds to fill

    return () => clearInterval(iv);
  }, [phase]);

  // --- CHAOS: jar overflows, funny lines ---
  useEffect(() => {
    if (phase !== 'chaos' || chaosDone.current) return;
    chaosDone.current = true;

    setIsOverflowing(true);
    setIsGlowing(true);
    setParticleSpeed(4);
    setParticleCount(80);

    const chaosLines = STORY.filter(s => s.phase === 'chaos');
    chaosLines.forEach(line => {
      setTimeout(() => setCurrentText({ text: line.text, style: line.style || 'system' }), line.delay);
    });

    setTimeout(() => setPhase('settling'), 11000);
  }, [phase]);

  // --- SETTLING: particles calm, poetic close ---
  useEffect(() => {
    if (phase !== 'settling' || settleDone.current) return;
    settleDone.current = true;

    setParticleSpeed(0.4);
    setParticleCount(15);
    setIsOverflowing(false);

    const settleLines = STORY.filter(s => s.phase === 'settling');
    settleLines.forEach(line => {
      setTimeout(() => setCurrentText({ text: line.text, style: line.style || 'system' }), line.delay);
    });

    setTimeout(() => {
      setPhase('done');
      setTimeout(onNext, 2000);
    }, 11000);
  }, [phase, onNext]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {particleCount > 0 && <GoldenParticles count={particleCount} speed={particleSpeed} />}

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', height: '400px', borderRadius: '50%', background: `radial-gradient(ellipse, rgba(232,196,124,${fillPercent > 50 ? 0.12 : 0.03}) 0%, transparent 70%)`, pointerEvents: 'none', transition: 'background 2s', zIndex: 0 }} />

      {/* Jar — always visible */}
      {phase !== 'done' && (
        <div style={{ zIndex: 10 }}>
          <JarSVG fillPercent={fillPercent} isPulsing={phase === 'filling' && fillPercent % 25 < 3} isGlowing={isGlowing || fillPercent > 40} isOverflowing={isOverflowing} />
        </div>
      )}

      {/* Text area — always at bottom center */}
      <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 20, width: '90%', maxWidth: '500px' }}>
        <AnimatePresence mode="wait">

          {/* Initial question */}
          {phase === 'question' && !answer && (
            <motion.div key="q" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
              <p style={{ fontSize: '20px', color: 'var(--text-primary)', fontFamily: "'Outfit',sans-serif", fontWeight: 300 }}>
                so... is this empty jar love?
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer('yes')}
                  style={{ padding: '12px 36px', borderRadius: '99px', border: '1px solid var(--accent-warm)', background: 'rgba(251,191,36,0.08)', color: 'var(--accent-warm)', fontSize: '16px', fontFamily: "'Outfit',sans-serif", fontWeight: 500, cursor: 'pointer', backdropFilter: 'blur(8px)', letterSpacing: '1px' }}>
                  YES
                </motion.button>
                <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer('no')}
                  style={{ padding: '12px 36px', borderRadius: '99px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '14px', fontFamily: "'Outfit',sans-serif", fontWeight: 400, cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
                  NO (absolutely not)
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* All narrative text after the question */}
          {currentText && phase !== 'question' && (
            <motion.p key={currentText.text}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: currentText.style === 'system' ? "'Outfit',sans-serif" : "'Cormorant Garamond',serif",
                fontWeight: currentText.style === 'highlight' ? 600 : 300,
                fontStyle: currentText.style !== 'system' ? 'italic' : 'normal',
                fontSize: currentText.style === 'highlight' ? 'clamp(24px, 5vw, 32px)' : currentText.style === 'personal' ? 'clamp(18px, 4vw, 24px)' : 'clamp(14px, 3.5vw, 18px)',
                color: currentText.style === 'system' ? 'var(--text-primary)' : 'var(--accent-warm)',
                lineHeight: 1.6,
              }}>
              {currentText.text}
            </motion.p>
          )}

          {/* Answer reaction (still in question phase) */}
          {currentText && phase === 'question' && answer && (
            <motion.p key="ans" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.8 }}
              style={{ fontSize: '20px', color: 'var(--accent-warm)', fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontStyle: 'italic' }}>
              {currentText.text}
            </motion.p>
          )}

        </AnimatePresence>
      </div>

      {/* Final transition */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--bg-deep, #06080f)', zIndex: 50 }} />
        )}
      </AnimatePresence>
    </div>
  );
}