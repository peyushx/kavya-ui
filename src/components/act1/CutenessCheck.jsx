import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Zap, X, AlertTriangle, RefreshCcw } from 'lucide-react';
import WarmReveal from './WarmReveal';

const failResponses = [
  { title: "Verification Failed", msg: "are you not my Baddie ? Hmm" },
  { title: "Verification Failed", msg: "Let's try again :(" },
  { title: "Verification ??", msg: "JIYA's BADDIE is that you ?" },
];

function FloatingParticle({ delay, size, x, duration }) {
  return (
    <div
      className="floating-particle"
      style={{
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function CutenessCheck({ onNext }) {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      delay: Math.random() * 8,
      size: 1 + Math.random() * 3,
      x: Math.random() * 100,
      duration: 6 + Math.random() * 8,
    }))
  );
  const [phase, setPhase] = useState('idle');
  const [attempt, setAttempt] = useState(0);
  const [scanValue, setScanValue] = useState(0);
  const [screenFlash, setScreenFlash] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [frame, setFrame] = useState(0);

  const startScan = useCallback(() => {
    if (phase !== 'idle' && phase !== 'fail') return;
    if (phase === 'fail') {
      setAttempt(prev => prev + 1);
    }
    setIsHolding(true);
    setPhase('scanning');
    setScanValue(0);
    setFrame(0);
  }, [phase]);

  const stopScan = useCallback(() => {
    if (phase === 'scanning') {
      setIsHolding(false);
      setPhase('idle');
      setScanValue(0);
      setFrame(0);
    } else {
      setIsHolding(false);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'scanning' || !isHolding) return;

    const isLastAttempt = attempt >= failResponses.length;
    const scanDuration = isLastAttempt ? 55 : 28 + attempt * 4;

    const interval = setInterval(() => {
      setFrame(prev => {
        const next = prev + 1;
        const p = 1 - Math.pow(1 - next / scanDuration, 3);
        setScanValue(Math.min(Math.round(p * 100), 100));

        if (next >= scanDuration) {
          clearInterval(interval);
          if (isLastAttempt) {
            setPhase('success');
            setIsHolding(false);
          } else {
            setScreenFlash(true);
            setTimeout(() => setScreenFlash(false), 500);
            setPhase('fail');
            setIsHolding(false);
          }
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase, attempt, isHolding]);

  // retry is now handled within startScan for the hold mechanic

  const currentFail = failResponses[attempt] || failResponses[0];

  return (
    <div className={`warm-reveal-container phase-${phase === 'success' ? 'verified' : phase}`}>
      {/* Atmospheric layers */}
      <div className="bg-grain" />
      <div className="bg-radial-top" />
      <div className="bg-radial-warm" />
      <div className="line-accent" style={{ left: '15%' }} />
      <div className="line-accent" style={{ left: '85%' }} />

      {/* Corner marks */}
      <div className="corner-mark corner-tl" />
      <div className="corner-mark corner-tr" />
      <div className="corner-mark corner-bl" />
      <div className="corner-mark corner-br" />

      {/* Status */}
      <div className="status-text">
        {phase === "idle" && "standby"}
        {phase === "scanning" && "scanning"}
        {phase === "fail" && "failed"}
        {phase === "success" && "verified"}
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Red flash */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            className="screen-flash-red"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase !== 'success' ? (
          <motion.div
            key="scanner"
            className="scanner-screen"
            animate={phase === 'fail' ? {
              x: [0, -10, 12, -8, 6, 0],
            } : { x: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            {/* Title container with fixed height so text changes don't shift the scanner */}
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '36px' }}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={phase + attempt}
                  className="line-system"
                  style={{ marginBottom: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {phase === 'idle' && attempt === 0 && "Wait, are you actually Kavya? Let me verify."}
                  {phase === 'idle' && attempt > 0 && "Okay, one more time…"}
                  {phase === 'scanning' && <span>Verifying<span className="dots-anim"></span></span>}
                  {phase === 'fail' && currentFail.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Scanner Circle */}
            <motion.div
              className="scanner-outer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onPointerDown={startScan}
              onPointerUp={stopScan}
              onPointerLeave={stopScan}
              style={{ cursor: phase === 'idle' || phase === 'fail' ? 'pointer' : 'default', touchAction: 'none' }}
            >
              {/* Scanning pulses */}
              {phase === 'scanning' && [0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="scanner-pulse"
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
                />
              ))}

              {phase === 'scanning' && (
                <motion.div
                  className="scanner-spin-ring"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}

              {/* Fail — red ring or warning ring */}
              {phase === 'fail' && (
                <motion.div
                  className={attempt === 2 ? "scanner-warning-ring" : "scanner-fail-ring"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.15, 1], opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Center circle */}
              <motion.div
                className="scanner-center"
                animate={{
                  borderColor: phase === 'fail'
                    ? (attempt === 2 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(239, 68, 68, 0.4)')
                    : 'var(--scanner-border)',
                  backgroundColor: phase === 'fail'
                    ? (attempt === 2 ? 'rgba(245, 158, 11, 0.08)' : 'rgba(239, 68, 68, 0.08)')
                    : 'var(--scanner-bg)',
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {phase === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, scale: [1, 1.08, 1] }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      transition={{ scale: { duration: 2.5, repeat: Infinity } }}
                      className="scanner-icon"
                    >
                      <Fingerprint size={56} strokeWidth={1.2} />
                    </motion.div>
                  )}

                  {phase === 'scanning' && (
                    <motion.div
                      key="scan"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 360 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{
                        rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 0.3 },
                      }}
                      className="scanner-icon scanning"
                    >
                      <Zap size={46} strokeWidth={1.5} />
                    </motion.div>
                  )}

                  {phase === 'fail' && (
                    <motion.div
                      key="fail"
                      initial={{ scale: 2, rotate: 90, opacity: 0 }}
                      animate={{
                        scale: [2, 0.8, 1.1, 1],
                        rotate: 0,
                        opacity: 1
                      }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="scanner-icon fail absolute inset-0 flex items-center justify-center"
                      style={attempt === 2 ? { color: '#f59e0b' } : undefined}
                    >
                      {attempt === 2 ? (
                        <AlertTriangle size={56} strokeWidth={2.5} />
                      ) : (
                        <RefreshCcw size={56} strokeWidth={2.5} />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Hints */}
              {phase === 'idle' && (
                <motion.p
                  className="scanner-hint"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '10px', color: 'var(--text-muted)' }}
                >
                  {attempt === 0 ? 'hold to scan' : 'hold to retry'}
                </motion.p>
              )}

              {phase === 'fail' && (
                <motion.p
                  className="scanner-hint"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}
                >
                  hold to try again
                </motion.p>
              )}
            </motion.div>

            {/* Bottom message container with fixed height so it doesn't push the scanner up */}
            <div style={{ height: '60px', marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {phase === 'fail' && (
                  <motion.p
                    key={`fail-${attempt}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="line-personal"
                    style={{ margin: 0 }}
                  >
                    {currentFail.msg}
                  </motion.p>
                )}

                {phase === 'scanning' && (
                  <motion.p
                    key="pct"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    exit={{ opacity: 0 }}
                    className="scanner-pct"
                    style={{ fontSize: '15px', margin: 0 }}
                  >
                    {scanValue}%
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <WarmReveal key="reveal" onReady={onNext} />
        )}
      </AnimatePresence>
    </div>
  );
}

