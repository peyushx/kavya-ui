import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
 
// The No button gets increasingly desperate and dramatic
const noButtonTexts = [
  "no",
  "still no",
  "absolutely not",
  "i said NO",
  "why won't it—",
  "STOP MOVING",
  "THIS IS RIGGED",
  "...",
];
 
// What the website says after each failed "No" attempt
const websiteReactions = [
  "",
  "cute attempt",
  "the button disagrees",
  "it's getting away from you lol",
  "you're really committed to this huh",
  "at this point it's personal",
  "the button is faster than you and that's embarrassing",
  "okay i think we both know how this ends",
];
 
// The Yes button gets more confident with each failed No
const yesButtonTexts = [
  "yes, obviously",
  "yes (the only real option)",
  "yes (just accept it)",
  "YES (it's inevitable)",
  "YES (resistance is futile)",
  "YES (the button has spoken)",
  "YES (even the no button agrees)",
  "YES ♥",
];
 
export default function TrustTest({ onNext }) {
  const [attempts, setAttempts] = useState(0);
  const [showRigged, setShowRigged] = useState(false);
  const [noButtonDead, setNoButtonDead] = useState(false);
  const [yesGlowing, setYesGlowing] = useState(false);
  const [showFootnote, setShowFootnote] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);
 
  useEffect(() => {
    controls.start({ opacity: 1, x: 0, transition: { delay: 0.8 } });
    const footnoteTimer = setTimeout(() => setShowFootnote(true), 3000);
    return () => clearTimeout(footnoteTimer);
  }, []);
 
  // Yes button starts glowing more after 3 attempts
  useEffect(() => {
    if (attempts >= 3) setYesGlowing(true);
  }, [attempts]);
 
  const handleNoAttempt = () => {
    if (showRigged) return;
 
    const newAttempts = attempts + 1;
 
    if (newAttempts >= noButtonTexts.length) {
      // No button "dies"
      setNoButtonDead(true);
      controls.start({
        opacity: 0,
        scale: 0,
        rotate: 720,
        y: 200,
        transition: { duration: 0.8, ease: 'easeIn' },
      });
      setTimeout(() => setShowRigged(true), 1000);
      setAttempts(newAttempts);
      return;
    }
 
    // Button escapes with increasing chaos
    const intensity = 1 + newAttempts * 0.3;
    const bounds = containerRef.current?.getBoundingClientRect();
    const maxX = bounds ? bounds.width / 2 - 60 : 150;
    const maxY = bounds ? bounds.height / 2 - 30 : 200;
 
    const randomX = (Math.random() - 0.5) * 2 * maxX * intensity;
    const randomY = (Math.random() - 0.5) * 2 * maxY * intensity;
 
    // After attempt 4, the button starts doing wilder things
    const rotation = newAttempts > 4 
      ? (Math.random() - 0.5) * 180 
      : (Math.random() - 0.5) * 40;
    
    const buttonScale = Math.max(0.5, 1 - newAttempts * 0.07);
 
    controls.start({
      x: randomX,
      y: randomY,
      rotate: rotation,
      scale: buttonScale,
      transition: {
        type: 'spring',
        stiffness: 300 + newAttempts * 80,
        damping: 8,
        mass: 0.5,
      },
    });
 
    setAttempts(newAttempts);
  };
 
  const handleYesClick = () => {
    // Satisfying click moment before proceeding
    setTimeout(() => onNext(), 600);
  };
 
  return (
    <div className="act1-screen trust-screen-enhanced" ref={containerRef}>
      {/* Phase badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="screen-badge"
      >
        final checkpoint
      </motion.div>
 
      <div className="trust-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="trust-card"
        >
          {/* Main question */}
          <motion.p
            className="trust-question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            do you trust me?
          </motion.p>
 
          {/* Dynamic subtitle based on attempts */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="trust-subtext"
            style={{ color: 'var(--text-secondary)' }}
            key={attempts} // re-animate on change
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={attempts}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {attempts === 0
                  ? "choose wisely han"
                  : websiteReactions[Math.min(attempts, websiteReactions.length - 1)]
                }
              </motion.span>
            </AnimatePresence>
          </motion.p>
 
          {/* Buttons */}
          <div className="trust-actions" style={{ position: 'relative', minHeight: '120px' }}>
            {/* YES button — grows more prominent as No keeps failing */}
            <motion.button
              className="trust-yes-btn"
              onClick={handleYesClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: yesGlowing ? [1, 1.03, 1] : 1,
              }}
              transition={{
                delay: 0.8,
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              style={{
                transition: 'transform 0.3s ease',
              }}
            >
              <span>{yesButtonTexts[Math.min(attempts, yesButtonTexts.length - 1)]}</span>
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: 'inline-flex', marginLeft: '8px' }}
              >
                <Heart size={16} fill="currentColor" />
              </motion.span>
            </motion.button>
 
            {/* NO button — the runaway rebel */}
            <AnimatePresence>
              {!noButtonDead && (
                <motion.button
                  key="no-btn"
                  animate={controls}
                  onPointerDown={handleNoAttempt}
                  onHoverStart={handleNoAttempt}
                  className="trust-no-btn enhanced-no"
                  initial={{ opacity: 0, x: 20 }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    rotate: 720,
                    y: 200,
                    filter: 'blur(10px)',
                    transition: { duration: 0.8 },
                  }}
                  style={{
                    position: attempts > 0 ? 'absolute' : 'relative',
                    zIndex: 5,
                    fontSize: attempts > 5 ? '11px' : '14px',
                  }}
                >
                  {noButtonTexts[Math.min(attempts, noButtonTexts.length - 1)]}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
 
          {/* Rigged reveal — after No button dies */}
          <AnimatePresence>
            {showRigged && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                  padding: '16px',
                }}
              >
                <p style={{
                  fontSize: '16px',
                  color: 'var(--accent-warm)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  the "no" button didn't make it.
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginTop: '8px',
                    fontStyle: 'italic',
                  }}
                >
                  it fought bravely. but love always wins or whatever.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 2 }}
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginTop: '12px',
                  }}
                >
                  (the only option left is yes. you're welcome.)
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
 
        {/* Bottom footnote */}
        <AnimatePresence>
          {showFootnote && !showRigged && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
              }}
            >
              terms & conditions: you're stuck with me
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
 














