import { motion, AnimatePresence } from 'framer-motion';

export default function HeartbreakOverlay({
  isHeartbroken,
  heartbreakPhase,
  typedHeartbreakText,
  showHeartbreakButton,
  resetHeartbreak
}) {
  return (
    <AnimatePresence>
      {isHeartbroken && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: heartbreakPhase === 3 ? 'auto' : 'none' }}>
          {/* Stage 2: The Sun/Moon Falls */}
          <AnimatePresence>
            {heartbreakPhase >= 2 && (
              <motion.div 
                className="broken-sun sun-falling-anim"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* Stage 3: The Final Blackout */}
          <AnimatePresence>
            {heartbreakPhase === 3 && (
              <motion.div 
                className="heartbreak-blackout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ zIndex: 10, padding: '0 20px' }}
                >
                  <h2 
                    className="line-system" 
                    style={{ color: 'white', opacity: 0.9, fontSize: '28px', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}
                  >
                    {typedHeartbreakText}
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
                  </h2>
                  
                  <AnimatePresence>
                    {showHeartbreakButton && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ready-btn"
                        onClick={resetHeartbreak}
                        style={{ 
                          marginTop: '60px', 
                          background: 'rgba(255,255,255,0.1)', 
                          borderColor: 'rgba(255,255,255,0.2)',
                          color: 'white'
                        }}
                        whileHover={{ background: 'rgba(255,255,255,0.2)', scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Wait, I was kidding! 🥺
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
