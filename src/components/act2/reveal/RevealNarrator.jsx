import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: 'ok. investigation is over.', delay: 2000 },
  { text: 'time for the truth.', delay: 2000 },
  { text: "and bestie... you're not ready for this one 💀", delay: 2500 },
];

export default function RevealNarrator({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (visibleCount >= LINES.length) {
      const t = setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 1200); }, 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount(prev => prev + 1), visibleCount === 0 ? 2000 : LINES[visibleCount - 1]?.delay || 1500);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <motion.div animate={{ opacity: fadeOut ? 0 : 1 }} transition={{ duration: 1.2 }}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#000', padding: 40, fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
        <AnimatePresence>
          {LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, color: '#fbbf24' }}>🔔</span>
              <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>"{line.text}"</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
