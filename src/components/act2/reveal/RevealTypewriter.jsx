import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  'you spent all that time',
  'checking their profiles',
  'reading their messages',
  'going through their chat history',
  'analyzing their last seen',
  'judging their bios',
  'investigating their groups',
  'interrogating them one by one',
  null, // pause
  'and the whole time',
  null,
  'the screenshots were in YOUR DMs',
  null,
  'the forwarded message was from YOUR chat',
  null,
  'the "who would do that 😤" was YOU',
  null,
  'you were the detective AND the criminal bestie 🐍🪞',
];

export default function RevealTypewriter({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= LINES.length) {
      const t = setTimeout(onComplete, 3000);
      return () => clearTimeout(t);
    }
    const current = LINES[visibleCount];
    const delay = current === null ? 2000 : 800;
    const t = setTimeout(() => setVisibleCount(prev => prev + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40, fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {LINES.slice(0, visibleCount).map((line, i) => {
          if (line === null) return <div key={i} style={{ height: 12 }} />;
          const isHighlight = line.includes('YOUR') || line.includes('YOU') || line.includes('detective AND');
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              style={{ fontSize: isHighlight ? 18 : 15, color: isHighlight ? '#ef4444' : 'rgba(255,255,255,0.7)', fontWeight: isHighlight ? 700 : 400, fontStyle: 'italic' }}>
              {line}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
