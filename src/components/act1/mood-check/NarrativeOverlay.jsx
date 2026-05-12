import { motion, AnimatePresence } from 'framer-motion';

export default function NarrativeOverlay({ active, text }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="narrative-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
          }}
        >
          <p className="line-personal" style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5, maxWidth: '600px' }}>
            {text}
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
