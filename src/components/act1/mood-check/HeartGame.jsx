import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

// Funny messages that change as she catches more hearts
const catchMessages = [
  "", // 0 caught
  "ooh quick hands 👀",
  "okay she's locked in",
  "ma'am this isn't a competition... but you're winning",
  "4 down. the last one won't be easy tho 😏",
];

// Messages during the chaos phase (after 4 catches)
const chaosMessages = [
  "lol good luck now",
  "they're evolving. run.",
  "this is what you get for being too good at this",
  "the hearts heard you were coming and panicked",
];

export default function HeartGame({
  gameWon,
  heartsCaught,
  showSmirk,
  showFinalHeart,
  typedText,
  showHeartIcon,
  poppedPos,
  heartKey,
  heartPos,
  catchHeart,
  catchFinalHeart,
  onNext
}) {
  const [chaosMessageIndex, setChaosMessageIndex] = useState(0);
  const [showCatchReaction, setShowCatchReaction] = useState(false);
  const [missCount, setMissCount] = useState(0);
  const [showMissText, setShowMissText] = useState(false);

  // Rotate chaos messages
  useEffect(() => {
    if (heartsCaught < 4 || showFinalHeart || gameWon) return;
    const interval = setInterval(() => {
      setChaosMessageIndex(prev => (prev + 1) % chaosMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heartsCaught, showFinalHeart, gameWon]);

  // Flash catch reaction
  useEffect(() => {
    if (heartsCaught > 0 && heartsCaught <= 4) {
      setShowCatchReaction(true);
      const timer = setTimeout(() => setShowCatchReaction(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [heartsCaught]);

  // Track misses (clicks on empty area)
  const handleAreaClick = (e) => {
    if (e.target === e.currentTarget && heartsCaught < 4) {
      setMissCount(prev => prev + 1);
      setShowMissText(true);
      setTimeout(() => setShowMissText(false), 1200);
    }
  };

  const missTexts = [
    "swing and a miss 💨",
    "not even close lol",
    "the heart is right there 😭",
    "are your eyes closed??",
    "i'm rooting for you but wow",
    "okay maybe i made them too small",
    "no no try again i believe in you (barely)",
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="meter-punchline-area"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!gameWon ? (
          <>
            {/* Game instruction */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="line-personal"
              style={{ fontSize: '20px', color: 'var(--text-secondary)', marginTop: '12px', textAlign: 'center', padding: '0 20px' }}
            >
              {heartsCaught >= 4 && !showFinalHeart
                ? chaosMessages[chaosMessageIndex]
                : heartsCaught === 0
                  ? "catch 5 hearts to fix my sky (good luck han 😘)"
                  : catchMessages[heartsCaught] || ""
              }
            </motion.p>

            {/* Progress dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={i < heartsCaught ? {
                    scale: [1, 1.5, 1],
                    backgroundColor: 'var(--accent-warm)',
                  } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: i < heartsCaught ? 'var(--accent-warm)' : 'var(--scanner-border)',
                    transition: 'background-color 0.3s',
                    boxShadow: i < heartsCaught ? '0 0 8px rgba(251,191,36,0.4)' : 'none',
                  }}
                />
              ))}
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '6px' }}
              >
                {heartsCaught}/5
              </motion.span>
            </motion.div>

            {/* Game play area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="hearts-game-area"
              onClick={handleAreaClick}
            >
              {/* Miss text */}
              <AnimatePresence>
                {showMissText && (
                  <motion.p
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 0.7, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '14px',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                      pointerEvents: 'none',
                      zIndex: 10,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {missTexts[missCount % missTexts.length]}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Smirking face during chaos */}
              <AnimatePresence>
                {showSmirk && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 5,
                      pointerEvents: 'none',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '64px' }}>😏</span>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: 0.5 }}
                      style={{ fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic' }}
                    >
                      you thought it was gonna be easy?
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main area content */}
              <AnimatePresence mode="wait">
                {showFinalHeart ? (
                  <motion.div
                    key="final-reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      gap: '16px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <p
                        className="line-personal"
                        style={{ fontSize: '22px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', margin: 0 }}
                      >
                        {typedText}
                        <span style={{ opacity: showHeartIcon ? 0 : 0.8, transition: 'opacity 0.3s' }}>|</span>
                      </p>
                      {showHeartIcon && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1.4, 1],
                            opacity: 1,
                          }}
                          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                          onClick={catchFinalHeart}
                          style={{ cursor: 'pointer', display: 'flex', padding: '4px' }}
                          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Heart size={28} fill="#fbbf24" stroke="none" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.6))' }} />
                        </motion.div>
                      )}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      transition={{ delay: 2 }}
                      style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}
                    >
                      ↑ tap the heart. this one's yours.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div key="game-play" exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ width: '100%', height: '100%' }}>
                    {/* Pop burst effect */}
                    <AnimatePresence>
                      {poppedPos && (
                        <>
                          <motion.div
                            key={`pop-${heartKey}`}
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                              position: 'absolute',
                              left: `${poppedPos.x}%`,
                              top: `${poppedPos.y}%`,
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              background: 'radial-gradient(circle, rgba(251,191,36,0.4), transparent)',
                              transform: 'translate(-50%, -50%)',
                              pointerEvents: 'none',
                            }}
                          />
                          {/* Mini sparkles on catch */}
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={`sparkle-${heartKey}-${i}`}
                              initial={{
                                left: `${poppedPos.x}%`,
                                top: `${poppedPos.y}%`,
                                scale: 1,
                                opacity: 1,
                              }}
                              animate={{
                                left: `${poppedPos.x + (Math.random() - 0.5) * 15}%`,
                                top: `${poppedPos.y + (Math.random() - 0.5) * 15}%`,
                                scale: 0,
                                opacity: 0,
                              }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#fbbf24',
                                pointerEvents: 'none',
                                boxShadow: '0 0 6px rgba(251,191,36,0.8)',
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* The heart to catch */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={heartKey}
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          rotate: 0,
                          // Gentle floating when not in chaos mode
                          y: heartsCaught < 4 ? [0, -5, 0] : 0,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={heartsCaught >= 4
                          ? { duration: 0.05 }
                          : {
                              type: 'spring',
                              stiffness: 300,
                              damping: 15,
                              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                            }
                        }
                        onClick={catchHeart}
                        style={{
                          position: 'absolute',
                          left: `${heartPos.x}%`,
                          top: `${heartPos.y}%`,
                          cursor: heartsCaught >= 4 ? 'default' : 'pointer',
                          transform: 'translate(-50%, -50%)',
                          filter: `drop-shadow(0 0 ${heartsCaught >= 4 ? '4' : '8'}px rgba(251,191,36,0.5))`,
                          pointerEvents: heartsCaught >= 4 ? 'none' : 'auto',
                          zIndex: 20,
                        }}
                        whileHover={heartsCaught < 4 ? { scale: 1.2 } : undefined}
                        whileTap={heartsCaught < 4 ? { scale: 0.8 } : undefined}
                      >
                        <Heart
                          size={heartsCaught >= 4 ? 14 : 28 - heartsCaught * 2}
                          fill="#fbbf24"
                          stroke="none"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          /* ========== GAME WON ========== */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px', padding: '0 24px' }}
          >
            {/* Celebration hearts burst */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`celebrate-${i}`}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0.5],
                    x: Math.cos((i / 8) * Math.PI * 2) * 50,
                    y: Math.sin((i / 8) * Math.PI * 2) * 50,
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <Heart size={12} fill="#fbbf24" stroke="none" style={{ opacity: 0.6 }} />
                </motion.div>
              ))}
              <motion.div
                animate={{ rotate: [0, 10, -10, 5, -5, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <Heart size={48} fill="#fbbf24" stroke="none" style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.6))' }} />
              </motion.div>
            </div>

            {/* Win message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="line-personal"
              style={{ fontSize: '22px', color: 'var(--accent-warm)', marginTop: '20px', textAlign: 'center' }}
            >
              5/5 hearts caught.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 1.2 }}
              className="line-personal"
              style={{ fontSize: '17px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}
            >
              okay u passed. barely.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 2 }}
              className="line-personal"
              style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'center', fontStyle: 'italic' }}
            >
              jk ur literally perfect and i rigged it so you'd win anyway 🤫
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="trust-yes-btn"
              onClick={onNext}
              style={{ marginTop: '24px' }}
            >
              okay show me what you made →
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}