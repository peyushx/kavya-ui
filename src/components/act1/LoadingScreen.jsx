import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const loadingMessages = [
  'calibrating the feels…',
  'downloading ur emotional damage…',
  'stealing ur heart brb…',
  'asking the stars about u…',
  'buffering main character energy…',
  'loading tears (the happy kind dw)…',
  'this is gonna hit different…',
  'okay almost there fr fr…',
  'preparing something unhinged…',
];

function RotatingMessages({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="loading-messages">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="loading-message"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function LoadingScreen({ onComplete }) {
  const [complete, setComplete] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setComplete(true);
      setTimeout(() => onComplete(), 1200);
    }, 8500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animated percentage counter
  useEffect(() => {
    const keyframes = [
      { time: 0, val: 0 },
      { time: 2400, val: 35 },
      { time: 4000, val: 47 },
      { time: 4200, val: 47 },
      { time: 5600, val: 88 },
      { time: 5800, val: 88 },
      { time: 8000, val: 100 },
    ];

    const timers = keyframes.map(kf =>
      setTimeout(() => setPercent(kf.val), kf.time)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="act1-screen">
      <div className="loading-container">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="screen-badge"
        >
          hold on
        </motion.div>

        <RotatingMessages messages={loadingMessages} />

        {/* Percentage */}
        <motion.p
          className="loading-percent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {percent}%
        </motion.p>

        {/* Loading bar */}
        <div className="loading-bar-track">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: ['0%', '35%', '47%', '47%', '88%', '88%', '100%'] }}
            transition={{
              duration: 8,
              ease: 'easeInOut',
              times: [0, 0.3, 0.5, 0.52, 0.7, 0.72, 1],
            }}
          />
        </div>

        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="loading-ready"
          >
            <Sparkles size={18} />
            <span>it's giving… ready</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
