import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLASHES = [
  { emoji: '🕐', title: "Jiya's Last Seen — 3AM", quote: "she was online because MEERA told her what happened. she was reading meera's apology." },
  { emoji: '💅', title: "Meera's Office Gossip Group", quote: "you thought \"GOTCHA\" — but meera leaking office tea about strangers is completely different. she didn't screenshot or forward anything. she was venting to a friend out of genuine concern and someone overheard." },
  { emoji: '😴', title: "Interrogating Arjun", quote: "this man was ASLEEP. he had nothing to do with any of this. he never does 😭" },
  { emoji: '🤙', title: "Meera's Pinky Promise", quote: "\"pinky promise lasted 48 hours\" — but this time she didn't break a promise on purpose. it was an accident. and she owned it immediately." },
  { emoji: '😎', title: "Arjun's DM", quote: "\"sometimes it's the one asking all the questions 👀\" — he wasn't talking about the leaker. he was talking about YOU. stirring up drama that was already resolved." },
  { emoji: '💅', title: "Meera's DM", quote: "\"sometimes the person investigating the crime is the one who committed it\" — she was saying YOU are the problem right now. not the leak. you. running around reopening a wound that already healed." },
];

export default function RevealMontage({ onComplete }) {
  const [currentFlash, setCurrentFlash] = useState(0);

  useEffect(() => {
    if (currentFlash >= FLASHES.length) {
      const t = setTimeout(onComplete, 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentFlash(prev => prev + 1), 2500);
    return () => clearTimeout(t);
  }, [currentFlash]);

  const flash = FLASHES[currentFlash];

  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 40, fontFamily: "'Outfit', sans-serif" }}>
      <AnimatePresence mode="wait">
        {flash && (
          <motion.div key={currentFlash}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', maxWidth: 480, padding: '0 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{flash.emoji}</div>
            <div style={{ fontSize: 13, color: '#8696a0', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>{flash.title}</div>
            <div style={{ fontSize: 15, color: '#fbbf24', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.6 }}>"{flash.quote}"</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 6 }}>
        {FLASHES.map((_, i) => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= currentFlash ? '#fbbf24' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
        ))}
      </div>
    </div>
  );
}
