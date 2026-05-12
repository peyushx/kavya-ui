import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

export default function Bridge({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase(1);
        startMusic();
      }, 2500),
      setTimeout(() => setPhase(2), 6000),
      setTimeout(() => setPhase(3), 9000),
      setTimeout(() => onComplete(), 11500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="bridge-container"
      animate={phase === 3 ? {
        background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #7dd3fc 100%)',
      } : {
        background: '#000000',
      }}
      transition={{ duration: 3.5, ease: 'easeInOut' }}
    >
      {/* Ambient glow */}
      {phase >= 1 && (
        <motion.div
          className="bridge-glow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1.5 }}
          transition={{ duration: 4, ease: 'easeOut' }}
        />
      )}

      {phase >= 1 && (
        <div className="bridge-text">
          <TypewriterText
            text="hey kavvs…"
            speed={80}
            className="bridge-line1 font-caveat"
          />
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <TypewriterText
                text="this one's for you."
                speed={65}
                className="bridge-line2"
              />
            </motion.div>
          )}
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 1, delay: 2.5 }}
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '13px',
                marginTop: '32px',
                fontFamily: 'var(--font-body)',
              }}
            >
              no skips. you're watching this.
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  );
}
