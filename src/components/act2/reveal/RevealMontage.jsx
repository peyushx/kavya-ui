import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FLASHES = [
  { emoji: '📸', title: 'Camera — Your Reflection', quote: "that's the suspect btw. right there. in the camera 📸🐍" },
  { emoji: '🖼️', title: 'Your Profile', quote: 'Screenshots taken in this chat: 4' },
  { emoji: '🔐', title: 'Encryption Notice', quote: 'messages are end-to-end encrypted. except the ones you forwarded 📤' },
  { emoji: '🖼️', title: 'Gallery — Blurry Screenshot', quote: 'that blurry screenshot in the gallery? it was YOUR screenshot.' },
  { emoji: '🗑️', title: 'Gallery — Deleted Photo', quote: '"this photo has been deleted." you deleted the evidence.' },
  { emoji: '👥', title: 'Groups In Common', quote: '1 group. barely connected. just enough access to betray.' },
  { emoji: '😎', title: "Arjun's DM", quote: "sometimes it's the one asking all the questions 👀" },
  { emoji: '💅', title: "Meera's DM", quote: 'sometimes the person investigating the crime is the one who committed it 💅' },
  { emoji: '📍', title: 'Location', quote: 'Denial. You are here.' },
  { emoji: '👤', title: 'Contact', quote: 'Your Conscience. Last contacted: never.' },
];

export default function RevealMontage({ onComplete }) {
  const [currentFlash, setCurrentFlash] = useState(0);

  useEffect(() => {
    if (currentFlash >= FLASHES.length) {
      const t = setTimeout(onComplete, 1500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentFlash(prev => prev + 1), 2000);
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
            style={{ textAlign: 'center', maxWidth: 450 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{flash.emoji}</div>
            <div style={{ fontSize: 13, color: '#8696a0', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12, fontWeight: 600 }}>{flash.title}</div>
            <div style={{ fontSize: 16, color: '#ef4444', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.6 }}>"{flash.quote}"</div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Progress dots */}
      <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 6 }}>
        {FLASHES.map((_, i) => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= currentFlash ? '#ef4444' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }} />
        ))}
      </div>
    </div>
  );
}
