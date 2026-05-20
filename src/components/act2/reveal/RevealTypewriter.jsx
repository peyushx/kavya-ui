import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  'so.',
  'that happened at 1:30 AM.',
  'three hours before you started your little investigation.',
  'meera already confessed.',
  'jiya already forgave her.',
  'they already handled it.',
  'like adults.',
  'like real friends.',
  null,
  'and you?',
  'you spent the last 20 minutes',
  'going through their profiles',
  'snooping through their chat history',
  'analyzing their last seen',
  'reading their group chats',
  'interrogating them one by one',
  'playing detective 🔍',
  null,
  'on a case that was already closed 💀',
];

export default function RevealTypewriter({ onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= LINES.length) {
      const t = setTimeout(onComplete, 3500);
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
          const isHighlight = line.includes('already') || line.includes('already closed') || line.includes('detective');
          const isFinal = line.includes('already closed');
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
              style={{ fontSize: isFinal ? 20 : isHighlight ? 16 : 15, color: isFinal ? '#ef4444' : isHighlight ? '#fbbf24' : 'rgba(255,255,255,0.7)', fontWeight: isFinal ? 700 : isHighlight ? 600 : 400, fontStyle: 'italic' }}>
              {line}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
