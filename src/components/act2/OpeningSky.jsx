import { useRef } from 'react';
import { motion } from 'framer-motion';
import FadeInText from '../FadeInText';

export default function OpeningSky({ onComplete }) {
  const sectionRef = useRef(null);

  return (
    <div ref={sectionRef} className="opening-sky-container" style={{ minHeight: '150vh', position: 'relative' }}>
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(60px, 15vh, 20vh) 0',
      }}>
        <div style={{ marginBottom: 'clamp(100px, 30vh, 40vh)' }}>
          <FadeInText>
            <p className="poetic-text" style={{ fontSize: 'clamp(24px, 6vw, 32px)' }}>
              Scroll up baddie...
            </p>
          </FadeInText>
        </div>

        <div style={{ marginBottom: 'clamp(100px, 30vh, 40vh)' }}>
          <FadeInText delay={0.4}>
            <p className="poetic-text" style={{ color: 'var(--text-secondary)' }}>
              the sky's been here this whole time tbh.
            </p>
          </FadeInText>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FadeInText delay={0.8}>
            <p className="poetic-text font-caveat" style={{ fontSize: '28px', marginBottom: '48px' }}>
              just waiting for you to notice.
            </p>
          </FadeInText>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="ready-btn"
            onClick={onComplete}
          >
            let's talk about you →
          </motion.button>
        </div>
      </div>
    </div>
  );
}
