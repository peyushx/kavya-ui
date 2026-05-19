import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Gauge, Handshake, Loader, CloudMoon, FlaskConical, Mail, CloudRain, Check, ChevronRight, X, MessageSquare } from 'lucide-react';

const CHAPTERS = [
  // Act 1
  { id: 'act1-0', act: 'act1', step: 0, label: 'Verification', Icon: Fingerprint, act2Phase: null },
  { id: 'act1-1', act: 'act1', step: 1, label: 'Vibe Check', Icon: Gauge, act2Phase: null },
  { id: 'act1-2', act: 'act1', step: 2, label: 'Trust Test', Icon: Handshake, act2Phase: null },
  { id: 'act1-3', act: 'act1', step: 3, label: 'Loading...', Icon: Loader, act2Phase: null },
  // Act 2
  { id: 'act2-opening', act: 'act2', step: null, label: 'The Sky', Icon: CloudMoon, act2Phase: 'opening' },
  { id: 'act2-jar', act: 'act2', step: null, label: 'Emotion Jar', Icon: FlaskConical, act2Phase: 'emotion-jar' },
  { id: 'act2-resume', act: 'act2', step: null, label: 'A letter to baddie', Icon: Mail, act2Phase: 'resume' },
  { id: 'act2-rain', act: 'act2', step: null, label: 'The Rain', Icon: CloudRain, act2Phase: 'rain' },
  { id: 'act2-chat', act: 'act2', step: null, label: 'The Chat', Icon: MessageSquare, act2Phase: 'chat' },
];

export default function ChapterNav({ currentAct, act1Step, act2Phase, onNavigate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which chapter is currently active
  const getActiveId = () => {
    if (currentAct === 'act1') return `act1-${act1Step}`;
    if (currentAct === 'act2') return `act2-${act2Phase === 'emotion-jar' ? 'jar' : act2Phase}`;
    return null;
  };

  const activeId = getActiveId();

  // Determine which chapters are "unlocked" (visited or current)
  const getChapterState = (chapter) => {
    const activeIndex = CHAPTERS.findIndex(c => c.id === activeId);
    const chapterIndex = CHAPTERS.findIndex(c => c.id === chapter.id);
    if (chapter.id === activeId) return 'active';
    if (chapterIndex < activeIndex) return 'completed';
    return 'available';
  };

  const handleNavigate = (chapter) => {
    onNavigate(chapter.act, chapter.step, chapter.act2Phase);
    setIsExpanded(false);
  };

  const activeChapter = CHAPTERS.find(c => c.id === activeId);
  const activeIndex = CHAPTERS.findIndex(c => c.id === activeId);

  return (
    <>
      {/* The collapsed dot rail — always visible on the left edge */}
      <motion.div
        className="chapter-nav-rail"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Toggle button */}
        <motion.button
          className="chapter-nav-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle chapter navigation"
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'inline-block', fontSize: '10px' }}
          >
            ▶
          </motion.span>
        </motion.button>

        {/* Dot indicators */}
        <div className="chapter-nav-dots">
          {CHAPTERS.map((chapter, i) => {
            const state = getChapterState(chapter);
            return (
              <motion.button
                key={chapter.id}
                className={`chapter-dot chapter-dot--${state}`}
                onClick={() => handleNavigate(chapter)}
                whileHover={{ scale: 1.6 }}
                whileTap={{ scale: 0.9 }}
                title={chapter.label}
                aria-label={`Go to ${chapter.label}`}
                style={{ cursor: 'pointer' }}
              >
                {/* Active pulse ring */}
                {state === 'active' && (
                  <motion.span
                    className="chapter-dot-pulse"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Current chapter label — subtle, below dots */}
        <AnimatePresence mode="wait">
          {activeChapter && (
            <motion.span
              key={activeId}
              className="chapter-nav-current-label"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {activeIndex + 1}/{CHAPTERS.length}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded panel overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="chapter-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Chapter list panel */}
            <motion.div
              className="chapter-nav-panel"
              initial={{ opacity: 0, x: -30, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, x: 0, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, x: -30, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="chapter-nav-header">
                <span className="chapter-nav-title">chapters</span>
                <motion.button
                  className="chapter-nav-close"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Act 1 section */}
              <div className="chapter-nav-section">
                <span className="chapter-nav-section-label">act i — the test</span>
                {CHAPTERS.filter(c => c.act === 'act1').map((chapter) => {
                  const state = getChapterState(chapter);
                  return (
                    <motion.button
                      key={chapter.id}
                      className={`chapter-nav-item chapter-nav-item--${state}`}
                      onClick={() => handleNavigate(chapter)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="chapter-nav-item-icon"><chapter.Icon size={16} /></span>
                      <span className="chapter-nav-item-label">{chapter.label}</span>
                      {state === 'active' && (
                        <motion.span
                          className="chapter-nav-item-indicator"
                          layoutId="activeIndicator"
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        />
                      )}
                      {state === 'completed' && (
                        <span className="chapter-nav-item-check">✓</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Act 2 section */}
              <div className="chapter-nav-section">
                <span className="chapter-nav-section-label">act ii — the truth</span>
                {CHAPTERS.filter(c => c.act === 'act2').map((chapter) => {
                  const state = getChapterState(chapter);
                  return (
                    <motion.button
                      key={chapter.id}
                      className={`chapter-nav-item chapter-nav-item--${state}`}
                      onClick={() => handleNavigate(chapter)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="chapter-nav-item-icon"><chapter.Icon size={16} /></span>
                      <span className="chapter-nav-item-label">{chapter.label}</span>
                      {state === 'active' && (
                        <motion.span
                          className="chapter-nav-item-indicator"
                          layoutId="activeIndicator"
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        />
                      )}
                      {state === 'completed' && (
                        <span className="chapter-nav-item-check">✓</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Progress line */}
              <div className="chapter-nav-progress">
                <div className="chapter-nav-progress-track">
                  <motion.div
                    className="chapter-nav-progress-fill"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: (activeIndex + 1) / CHAPTERS.length }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
