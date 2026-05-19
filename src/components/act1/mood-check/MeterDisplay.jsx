import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

export default function MeterDisplay({
  isBroken,
  isScanning,
  scanningText,
  hasGloves,
  meterCleaned,
  phase,
  phases,
  showError,
  showPunchline,
  handleMeterDragEnd,
  handleDrag,
  handlePointerDown,
  handlePointerUp
}) {
  return (
    <motion.div
      key="meter-screen"
      className={`act1-screen meter-screen${showPunchline ? ' meter-screen--game' : ''}`}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={isBroken ? {
        opacity: 1, scale: 1,
        x: [0, -6, 8, -6, 4, -2, 0],
        y: [0, 3, -4, 3, -1, 0],
      } : { opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Title */}
      <motion.h2
        className="line-system"
        initial={{ opacity: 0, y: 15 }}
        animate={{
          opacity: isBroken ? 0 : 1,
          y: isBroken ? -10 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(20px, 5vw, 40px)', fontSize: 'clamp(18px, 5vw, 24px)', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
      >
        {isScanning ? (
          <>
            {scanningText}
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
          </>
        ) : "Vibe-meter"}
      </motion.h2>

      {/* Meter Container */}
      <motion.div
        className="meter-container"
        drag={isBroken && hasGloves && !meterCleaned}
        dragSnapToOrigin={false}
        onDragEnd={handleMeterDragEnd}
        onDrag={handleDrag}
        whileDrag={{ scale: 0.9, opacity: 0.6, cursor: 'grabbing' }}
        animate={meterCleaned ? { opacity: 0, scale: 0, y: 60 } : {}}
        transition={meterCleaned ? { duration: 0.4 } : {}}
        style={{
          cursor: isBroken && hasGloves && !meterCleaned ? 'grab' : 'default',
          touchAction: isBroken && hasGloves ? 'none' : 'auto',
        }}
      >
        <svg viewBox="0 0 350 175" className="meter-svg">
          <defs>
            <linearGradient id="meter-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <path d="M 55 155 A 120 120 0 0 1 295 155" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" strokeLinecap="round" />
          
          {/* Colored Track */}
          <motion.path
            d="M 55 155 A 120 120 0 0 1 295 155"
            fill="none"
            stroke="url(#meter-gradient)"
            strokeWidth="20"
            strokeLinecap="round"
            animate={isBroken ? { opacity: 0.3 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Crack lines on the arc */}
          <AnimatePresence>
            {isBroken && (
              <>
                <motion.path 
                  d="M 155 42 L 165 70 L 155 90 L 170 120"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 0.9 }} 
                  transition={{ duration: 0.12, delay: 0 }} 
                  stroke="#fff" strokeWidth="1.5" fill="none" filter="url(#glow)" 
                />
                <motion.path 
                  d="M 220 55 L 210 80 L 225 110"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 0.7 }} 
                  transition={{ duration: 0.1, delay: 0.05 }} 
                  stroke="#fff" strokeWidth="1" fill="none" filter="url(#glow)" 
                />
                <motion.path 
                  d="M 125 60 L 135 85 L 120 105"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 0.6 }} 
                  transition={{ duration: 0.08, delay: 0.1 }} 
                  stroke="#fff" strokeWidth="1" fill="none" 
                />
                <motion.path 
                  d="M 250 75 L 240 95 L 255 130"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 0.5 }} 
                  transition={{ duration: 0.1, delay: 0.08 }} 
                  stroke="rgba(239,68,68,0.6)" strokeWidth="1" fill="none" 
                />
                <motion.path 
                  d="M 90 80 L 100 100 L 85 125"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 0.4 }} 
                  transition={{ duration: 0.1, delay: 0.12 }} 
                  stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" 
                />
              </>
            )}
          </AnimatePresence>

          {/* Labels */}
          <motion.text animate={isBroken ? { opacity: 0, y: 25 } : {}} transition={{ delay: 0.1, duration: 0.6 }} x="30" y="170" fill="var(--text-muted)" fontSize="11" textAnchor="end" fontFamily="var(--font-body)">low vibe</motion.text>
          <motion.text animate={isBroken ? { opacity: 0, y: 30 } : {}} transition={{ delay: 0.15, duration: 0.6 }} x="55" y="40" fill="var(--text-muted)" fontSize="11" textAnchor="end" fontFamily="var(--font-body)">vibe-ing</motion.text>
          <motion.text animate={isBroken ? { opacity: 0, y: 35 } : {}} transition={{ delay: 0.2, duration: 0.6 }} x="175" y="12" fill="var(--text-muted)" fontSize="11" textAnchor="middle" fontFamily="var(--font-body)">pure vibes</motion.text>
          <motion.text animate={isBroken ? { opacity: 0, y: 30 } : {}} transition={{ delay: 0.25, duration: 0.6 }} x="295" y="40" fill="var(--text-muted)" fontSize="11" textAnchor="start" fontFamily="var(--font-body)">immaculate</motion.text>
          <motion.text animate={isBroken ? { opacity: 0, y: 25 } : {}} transition={{ delay: 0.3, duration: 0.6 }} x="320" y="170" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="start" fontFamily="var(--font-body)">BADDIE ENERGY</motion.text>

          {/* Ticks */}
          <motion.line animate={isBroken ? { opacity: 0 } : { opacity: 0.5 }} transition={{ duration: 0.3 }} x1="73" y1="155" x2="41" y2="155" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          <motion.line animate={isBroken ? { opacity: 0 } : { opacity: 0.5 }} transition={{ duration: 0.3, delay: 0.05 }} x1="90" y1="70" x2="68" y2="48" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          <motion.line animate={isBroken ? { opacity: 0 } : { opacity: 0.5 }} transition={{ duration: 0.3, delay: 0.1 }} x1="175" y1="51" x2="175" y2="19" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          <motion.line animate={isBroken ? { opacity: 0 } : { opacity: 0.5 }} transition={{ duration: 0.3, delay: 0.15 }} x1="260" y1="70" x2="282" y2="48" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
          <motion.line animate={isBroken ? { opacity: 0 } : { opacity: 0.7 }} transition={{ duration: 0.3, delay: 0.2 }} x1="277" y1="155" x2="309" y2="155" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

          {/* The Needle */}
          <g style={{
            transform: `rotate(${isBroken ? 85 : (isScanning ? phases[phase].angle : 0)}deg)`,
            transformOrigin: '175px 155px',
            transition: isBroken
              ? 'transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.5s ease'
              : phase === 4
                ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
                : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isBroken ? 0.4 : 1,
          }}>
            <line x1="175" y1="155" x2="175" y2="45" stroke={phase === 4 ? '#ef4444' : 'var(--text-primary)'} strokeWidth="3" strokeLinecap="round" filter={phase === 4 ? 'url(#glow)' : 'none'} />
            <circle cx="175" cy="155" r="7" fill={phase === 4 ? '#ef4444' : 'var(--text-primary)'} />
          </g>
        </svg>

        {/* Sparks */}
        <AnimatePresence>
          {isBroken && [...Array(6)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="meter-spark"
              initial={{ left: '82%', top: '50%', scale: 0, opacity: 1 }}
              animate={{
                left: `${82 + (Math.random() * 15 - 5)}%`,
                top: `${50 + (Math.random() * 30 - 15)}%`,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
              style={{ backgroundColor: i % 2 === 0 ? '#ef4444' : '#fde68a' }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Trigger & Subtext */}
      {!isBroken && (
        <>
          <motion.div
            className="meter-start-trigger flex-col-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '20px', cursor: 'pointer', touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isScanning ? { scale: [1, 1.1, 1], opacity: 1 } : { scale: 1, opacity: 0.5 }}
              transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isScanning ? 'var(--accent-green-soft)' : 'var(--scanner-bg)',
                border: `1px solid ${isScanning ? 'var(--accent-green)' : 'var(--scanner-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}
            >
              <Fingerprint size={32} color={isScanning ? "var(--accent-green)" : "var(--text-primary)"} style={{ opacity: isScanning ? 1 : 0.6 }} />
            </motion.div>
            <p className="line-personal" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
              {isScanning ? "Scanning..." : "hold thumb here to scan"}
            </p>
          </motion.div>
        </>
      )}

      {/* Error Sequence */}
      <AnimatePresence>
        {showError && !showPunchline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: '16px', textAlign: 'center', zIndex: 10 }}
          >
            <AnimatePresence mode="wait">
              {!hasGloves ? (
                <motion.div key="error-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="line-personal" style={{
                    fontSize: 'clamp(18px, 5vw, 24px)',
                    color: 'var(--text-primary)',
                    margin: '0 0 6px 0'
                  }}>
                    oops... it couldn't handle you 💀
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="line-personal"
                    style={{ fontSize: 'clamp(14px, 4vw, 17px)', color: 'var(--accent-warm)', margin: 0 }}
                  >
                    help me clean this up? 🥺
                  </motion.p>
                </motion.div>
              ) : (
                <motion.p key="drag-msg" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="line-personal" style={{ fontSize: 'clamp(14px, 4vw, 17px)', color: 'var(--text-secondary)', margin: 0 }}>
                  drag the pieces away ↓
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
