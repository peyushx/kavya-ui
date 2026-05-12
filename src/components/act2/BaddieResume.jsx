import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letterParagraphs = [
  "you make people feel safe just by existing.",
  "you say \"i'm fine\" while everything falls apart.\nyou give main character energy without trying.\nyou survived things that would've ended other people.",
  "you're stronger than you think you are.\nyou're kinder than anyone deserves.\nyou're the person you needed when you were younger.",
  "you think you're too much.\nyou're the only thing that's ever been enough for me.",
  "that's what this is about.",
  "— someone who's been paying attention"
];

// Junk items that fall out of the mailbox
const JUNK_ITEMS = [
  { emoji: '🪨', label: 'rock', msg: "that's a rock. why was that in there." },
  { emoji: '🍎', label: 'apple', msg: "an apple?? in a mailbox?? okay." },
  { emoji: '🧦', label: 'sock', msg: "...whose sock is this." },
  { emoji: '🪥', label: 'brush', msg: "a toothbrush. romantic." },
  { emoji: '🦆', label: 'duck', msg: "rubber duck. no explanation needed." },
];

// Scattered item component (junk or letter)
function ScatteredItem({ item, x, y, rotation, gone, onClick }) {
  const isLetter = item.type === 'letter';
  return (
    <motion.div
      initial={{ x: 0, y: 0, rotate: 0, scale: 0 }}
      animate={gone ? { scale: 0, opacity: 0, y: y - 40 } : { x, y, rotate: rotation, scale: 1, opacity: 1 }}
      transition={gone ? { duration: 0.4, ease: 'easeOut' } : { type: 'spring', damping: 8, stiffness: 60 }}
      onClick={onClick}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        cursor: gone ? 'default' : 'pointer', zIndex: 30,
        pointerEvents: gone ? 'none' : 'auto',
      }}
    >
      {isLetter ? (
        /* Stamped envelope */
        <div style={{ width: 90, height: 60, background: 'var(--bg-paper)', border: '1px solid var(--border-paper)', borderRadius: 4, boxShadow: 'none', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 20, background: '#fef3c7', border: '1.5px solid #e8c47c', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '8px' }}>💌</span>
          </div>
          <div style={{ padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
            <div style={{ height: 2, background: '#e5e0d5', width: '55%' }} />
            <div style={{ height: 2, background: '#e5e0d5', width: '75%' }} />
            <div style={{ height: 2, background: '#e5e0d5', width: '40%' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 5, right: 24, width: 18, height: 18, border: '1.5px solid rgba(180,80,80,0.3)', borderRadius: '50%' }}>
            <div style={{ width: 12, height: 1.5, background: 'rgba(180,80,80,0.3)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          </div>
        </div>
      ) : (
        /* Junk item */
        <div style={{ width: 60, height: 60, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
          {item.emoji}
        </div>
      )}
    </motion.div>
  );
}

// Detailed folded letter component with interactive wax seal and unfolding animation
function FoldedLetterDetail({ onOpen }) {
  const [isPeeling, setIsPeeling] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [dragProgress, setDragProgress] = useState(0); // 0-1 how far the seal has been pulled
  const [fragments, setFragments] = useState([]);

  const handleDrag = (_, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    setDragProgress(Math.min(distance / 100, 1));
  };

  const handleDragEnd = (_, info) => {
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    if (distance > 60) {
      // Generate wax fragments
      const frags = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 200,
        y: Math.random() * -120 - 30,
        r: Math.random() * 360,
        size: 4 + Math.random() * 10,
        delay: Math.random() * 0.15,
      }));
      setFragments(frags);
      setIsBroken(true);
      
      // Stagger: seal cracks → fragments scatter → flap lifts → letter appears
      setTimeout(() => {
        setIsOpening(true);
        setTimeout(onOpen, 1200);
      }, 600);
    } else {
      setIsPeeling(false);
      setDragProgress(0);
    }
  };

  // Crack lines that appear on the seal as you drag
  const crackOpacity = Math.max(0, dragProgress - 0.2) / 0.8;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 1.05, opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeIn' } }}
      transition={{ type: 'spring', damping: 18, stiffness: 90 }}
      transition={{ type: 'spring', damping: 18, stiffness: 90 }}
      style={{
        position: 'relative',
        width: 'min(320px, 90vw)',
        height: 'min(220px, 60vw)',
        zIndex: 100,
        perspective: '800px',
      }}
    >
      {/* === ENVELOPE BODY === */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg-paper)',
        border: '1px solid var(--border-paper)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        {/* Inner letter peek — visible lines hinting at content inside */}
        <motion.div 
          animate={isOpening ? { y: -30, opacity: 1 } : { y: 0, opacity: 0.15 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{ 
            position: 'absolute', bottom: '20px', left: '30px', right: '30px',
            display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 0
          }}
        >
          <div style={{ width: '80%', height: '1.5px', background: 'var(--text-muted)', opacity: 0.2 }} />
          <div style={{ width: '60%', height: '1.5px', background: 'var(--text-muted)', opacity: 0.15 }} />
          <div style={{ width: '70%', height: '1.5px', background: 'var(--text-muted)', opacity: 0.1 }} />
        </motion.div>
        
        {/* Paper texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', 
          background: 'url(https://www.transparenttextures.com/patterns/paper-fibers.png)' }} />
      </div>

      {/* === TRIANGULAR TOP FLAP (like a real envelope) === */}
      <motion.div
        initial={false}
        animate={isOpening 
          ? { rotateX: -178, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } }
          : { rotateX: 0 }
        }
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '55%',
          transformOrigin: 'top center',
          zIndex: isOpening ? 0 : 8,
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Triangular flap shape using clip-path */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'var(--bg-paper)',
          border: '1px solid var(--border-paper)',
          borderTop: 'none',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          borderRadius: '3px 3px 0 0',
          position: 'relative',
        }}>
          {/* Fold crease line */}
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '20%',
            right: '20%',
            height: '1px',
            background: 'var(--border-paper)',
            opacity: 0.5,
          }} />
        </div>
      </motion.div>

      {/* === WAX SEAL === */}
      <AnimatePresence>
        {!isBroken && (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragStart={() => setIsPeeling(true)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            exit={{ 
              scale: [1, 1.3, 0],
              opacity: [1, 0.8, 0],
              transition: { duration: 0.35, ease: 'easeOut' }
            }}
            whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              zIndex: 20,
              cursor: 'grab',
              touchAction: 'none',
            }}
          >
            {/* Seal base */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 35% 35%, #b91c1c, #7f1d1d 70%, #450a0a)',
              borderRadius: '50%',
              border: '2px solid #5c1010',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Stamp impression */}
              <span style={{ fontSize: '24px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))', userSelect: 'none', position: 'relative', zIndex: 2 }}>💌</span>
              
              {/* Wax texture ring */}
              <div style={{
                position: 'absolute', inset: '3px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.08)',
              }} />
              
              {/* Cracks that appear during drag */}
              <motion.svg
                viewBox="0 0 64 64"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}
                animate={{ opacity: crackOpacity }}
              >
                <path d="M 20 10 L 32 32 L 44 8" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" fill="none" />
                <path d="M 10 40 L 32 32 L 12 20" stroke="rgba(0,0,0,0.5)" strokeWidth="1" fill="none" />
                <path d="M 50 45 L 32 32 L 55 25" stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none" />
              </motion.svg>
            </div>
            
            {/* Wax drip */}
            <div style={{ 
              position: 'absolute', bottom: '-8px', left: '50%', marginLeft: '-6px',
              width: '12px', height: '12px', background: '#991b1b', borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
              border: '1px solid #7f1d1d',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === WAX FRAGMENTS (scatter when seal breaks) === */}
      <AnimatePresence>
        {isBroken && fragments.map(f => (
          <motion.div
            key={f.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ 
              x: f.x, 
              y: f.y, 
              opacity: 0, 
              scale: 0.3, 
              rotate: f.r,
            }}
            transition={{ duration: 0.7, delay: f.delay, ease: [0.2, 0, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: f.size,
              height: f.size,
              background: '#991b1b',
              borderRadius: '30%',
              zIndex: 25,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>

      {/* === INSTRUCTION TEXT === */}
      <AnimatePresence>
        {!isBroken && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isPeeling ? 0 : [0.3, 0.55, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { repeat: Infinity, duration: 2.5 } }}
            style={{
              position: 'absolute',
              bottom: '-36px',
              width: '100%',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '11px',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 300,
              userSelect: 'none',
              zIndex: 30,
            }}
          >
            {isPeeling ? 'keep pulling...' : 'drag the seal to open'}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const LetterContent = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => { if (onComplete) onComplete(); }, 8000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="resume-paper" style={{ 
      padding: 'clamp(40px, 8vh, 60px) clamp(20px, 8vw, 48px) clamp(40px, 8vh, 60px) clamp(40px, 12vw, 84px)', 
      minHeight: '60vh',
      width: 'min(700px, 95vw)'
    }}>
      {/* Date */}
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} 
        transition={{ duration: 1, delay: 0.3 }}
        style={{ textAlign: 'right', fontSize: '16px', marginBottom: '2em', color: 'var(--text-paper)', opacity: 0.5 }}
      >
        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </motion.p>

      {/* Greeting */}
      <motion.p 
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="resume-line" style={{ marginBottom: '2em' }}
      >
        hey you,
      </motion.p>

      {/* Body */}
      {letterParagraphs.map((p, i) => (
        <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: i * 0.4 + 1, ease: "easeOut" }}
          className="resume-line" style={{ marginBottom: '2em', whiteSpace: 'pre-wrap' }}>
          {p}
        </motion.p>
      ))}

      {/* Closing */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.2, delay: letterParagraphs.length * 0.4 + 1.5 }}
        style={{ marginTop: '3em', position: 'relative', zIndex: 2 }}
      >
        <p className="resume-line" style={{ marginBottom: '0.5em' }}>with everything i have,</p>
        <p className="resume-line" style={{ fontSize: '1.4em', marginTop: '0.5em' }}>— K ♡</p>
      </motion.div>

      {/* Little doodle hearts in margin */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 0.15 }}
        transition={{ delay: 3, duration: 2 }}
        style={{ position: 'absolute', top: '120px', left: '18px', fontSize: '14px', zIndex: 3, writingMode: 'vertical-rl' }}
      >
        ♡ ♡ ♡
      </motion.div>
    </div>
  );
};


// Generate scattered positions for items
function generateScatteredItems() {
  const shuffledJunk = [...JUNK_ITEMS].sort(() => Math.random() - 0.5).slice(0, 4);
  const items = [
    ...shuffledJunk.map(j => ({ type: 'junk', ...j })),
    { type: 'letter' },
  ].sort(() => Math.random() - 0.5); // shuffle positions

  return items.map(item => ({
    ...item,
    x: (Math.random() - 0.5) * (window.innerWidth * 0.6),
    y: (Math.random() - 0.5) * (window.innerHeight * 0.5),
    rotation: (Math.random() - 0.5) * 80,
  }));
}

export default function BaddieResume({ onNext }) {
  const [phase, setPhase] = useState('sealed');
  const [shakeCount, setShakeCount] = useState(0);
  const [items, setItems] = useState([]);
  const [goneIndices, setGoneIndices] = useState([]);
  const [funnyMsg, setFunnyMsg] = useState(null);
  const lastDragX = useRef(0);
  const shakeThreshold = 5;

  const handleOpen = () => {
    if (phase !== 'sealed') return;
    setPhase('opened');
  };

  const handleDrag = (_, info) => {
    const dx = Math.abs(info.point.x - lastDragX.current);
    if (dx > 30) {
      setShakeCount(prev => {
        const next = prev + 1;
        if (next >= shakeThreshold) {
          setTimeout(() => {
            setItems(generateScatteredItems());
            setPhase('scattered');
          }, 300);
        }
        return next;
      });
      lastDragX.current = info.point.x;
    }
  };

  const handleItemClick = (index) => {
    if (goneIndices.includes(index)) return;
    const item = items[index];

    if (item.type === 'letter') {
      setGoneIndices(prev => [...prev, index]);
      setFunnyMsg(null);
      setTimeout(() => setPhase('folded'), 800);
    } else {
      setGoneIndices(prev => [...prev, index]);
      setFunnyMsg(item.msg);
      setTimeout(() => setFunnyMsg(null), 5000);
    }
  };

  const getPrompt = () => {
    if (phase === 'sealed') return 'you have mail. click to open.';
    if (phase === 'opened') return 'now drag it side to side — shake it!';
    if (phase === 'shaking') return `keep shaking! (${shakeCount}/${shakeThreshold})`;
    if (phase === 'scattered' && !funnyMsg) return 'find the letter to continue...';
    if (phase === 'folded') return 'you found it.';
    return null;
  };

  useEffect(() => {
    if (phase === 'opened' && shakeCount > 0 && shakeCount < shakeThreshold) {
      setPhase('shaking');
    }
  }, [shakeCount, phase]);

  const prompt = getPrompt();

  return (
    <div className="resume-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: phase === 'reading' || phase === 'finished' ? 'flex-start' : 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* Funny message cloud bubble (Vaporizing) */}
      <AnimatePresence>
        {funnyMsg && (
          <motion.div 
            key={funnyMsg} 
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { duration: 1.2 } }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{ 
              position: 'absolute', 
              top: '12%', 
              left: '50%', 
              x: '-50%',
              zIndex: 200, 
              background: 'rgba(255, 255, 255, 0.08)', 
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)', 
              borderRadius: '50px', 
              padding: '20px 40px', 
              maxWidth: '85%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Cloud "puffs" */}
            <div style={{ position: 'absolute', width: 40, height: 40, background: 'inherit', borderRadius: '50%', top: -15, left: 20, border: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: 'none' }} />
            <div style={{ position: 'absolute', width: 30, height: 30, background: 'inherit', borderRadius: '50%', top: -10, right: 30, border: '1px solid rgba(255, 255, 255, 0.1)', borderBottom: 'none' }} />
            
            <p style={{ fontSize: '18px', color: 'var(--text-primary)', fontFamily: "'Outfit',sans-serif", fontWeight: 300, textAlign: 'center', margin: 0, letterSpacing: '0.5px' }}>
              {funnyMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAILBOX SCENE --- */}
      {(phase === 'sealed' || phase === 'opened' || phase === 'shaking' || phase === 'scattered' || phase === 'folded') && (
        <div style={{ position: 'relative', width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '40px' }}>
          
          <AnimatePresence>
            {phase === 'folded' && (
              <div key="folded-view" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,}}>
                <FoldedLetterDetail onOpen={() => setPhase('reading')} />
              </div>
            )}
          </AnimatePresence>

          <div style={{ position: 'relative', width: '100%', height: '60vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

           {/* Scattered items (junk + 1 letter) */}
           {phase === 'scattered' && items.map((item, i) => (
             <ScatteredItem key={i} item={item} x={item.x} y={item.y} rotation={item.rotation} gone={goneIndices.includes(i)} onClick={() => handleItemClick(i)} />
           ))}

           {/* Mailbox wrapper — draggable when opened */}
           <motion.div 
             drag={phase === 'opened' || phase === 'shaking' ? 'x' : false}
             dragConstraints={{ left: -60, right: 60 }}
             dragElastic={0.3}
             onDrag={handleDrag}
             onClick={phase === 'sealed' ? handleOpen : undefined}
             animate={phase === 'scattered' ? { rotate: [0, -5, 5, -3, 0], transition: { duration: 0.5 } } : {}}
             style={{ 
               position: 'relative', 
               width: 'min(300px, 80vw)', 
               height: 'min(300px, 80vw)', 
               cursor: phase === 'sealed' ? 'pointer' : phase === 'opened' || phase === 'shaking' ? 'grab' : 'default', 
               touchAction: 'none' 
             }}
           >
              {/* Prompt text */}
              {prompt && (
                <motion.div 
                  key={prompt}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: phase === 'sealed' ? 3.5 : 0.3 }}
                  style={{ position: 'absolute', top: '-30px', width: '100%', textAlign: 'center', color: 'var(--text-primary)', fontSize: '15px', opacity: 0.8, letterSpacing: '0.5px', zIndex: 40 }}>
                  {prompt}
                </motion.div>
              )}

              {/* Grass / Flowers / Soil */}
              <svg viewBox="0 0 300 100" style={{ position: 'absolute', bottom: -10, left: 0, width: '100%', height: '100px', zIndex: 1, overflow: 'visible' }}>
                 <ellipse cx="50" cy="98" rx="55" ry="12" fill="#5c3d2e" />
                 <ellipse cx="50" cy="96" rx="50" ry="8" fill="#6b4423" />
                 <ellipse cx="250" cy="98" rx="50" ry="10" fill="#5c3d2e" />
                 <ellipse cx="250" cy="96" rx="45" ry="7" fill="#6b4423" />
                 <rect x="0" y="96" width="300" height="6" fill="#4a3728" rx="2" opacity="0.3" />

                 <motion.circle cx="20" cy="95" r="3.5" fill="#9ca3af" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
                 <motion.circle cx="35" cy="97" r="2.5" fill="#a8a29e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} />
                 <motion.circle cx="70" cy="96" r="3" fill="#78716c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} />
                 <motion.circle cx="55" cy="98" r="2" fill="#d6d3d1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
                 <motion.circle cx="230" cy="96" r="3" fill="#9ca3af" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                 <motion.circle cx="255" cy="97" r="2.5" fill="#a8a29e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} />
                 <motion.circle cx="275" cy="95" r="3.5" fill="#78716c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} />
                 <motion.circle cx="140" cy="97" r="2.5" fill="#78716c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                 <motion.circle cx="155" cy="96" r="3" fill="#a8a29e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} />

                 <motion.path d="M 40 100 Q 30 50 20 20" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
                 <motion.path d="M 40 100 Q 50 40 60 10" fill="none" stroke="#15803d" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.5 }} />
                 <motion.path d="M 40 100 Q 60 50 80 30" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
                 <motion.path d="M 260 100 Q 250 50 240 20" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
                 <motion.path d="M 260 100 Q 270 40 280 10" fill="none" stroke="#15803d" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.7 }} />
                 <motion.path d="M 260 100 Q 280 50 290 30" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1 }} />

                 <motion.g transform="translate(30, 30)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1.5 }}>
                    <circle r="4" fill="#fbbf24"/><circle cx="0" cy="-6" r="3" fill="#fff"/><circle cx="0" cy="6" r="3" fill="#fff"/>
                    <circle cx="-6" cy="0" r="3" fill="#fff"/><circle cx="6" cy="0" r="3" fill="#fff"/>
                 </motion.g>
                 <motion.g transform="translate(60, 45) scale(0.8)" initial={{ scale: 0 }} animate={{ scale: 0.8 }} transition={{ type: 'spring', delay: 1.8 }}>
                    <circle r="4" fill="#fbbf24"/><circle cx="0" cy="-6" r="3" fill="#fff"/><circle cx="0" cy="6" r="3" fill="#fff"/>
                    <circle cx="-6" cy="0" r="3" fill="#fff"/><circle cx="6" cy="0" r="3" fill="#fff"/>
                 </motion.g>
                 <motion.g transform="translate(250, 25)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 2 }}>
                    <circle r="4" fill="#fbbf24"/><circle cx="0" cy="-6" r="3" fill="#fff"/><circle cx="0" cy="6" r="3" fill="#fff"/>
                    <circle cx="-6" cy="0" r="3" fill="#fff"/><circle cx="6" cy="0" r="3" fill="#fff"/>
                 </motion.g>
              </svg>

              {/* Post */}
              <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                style={{ position: 'absolute', left: 140, bottom: 0, width: 20, height: 160, background: '#334155', borderRadius: 4, zIndex: 2, transformOrigin: 'bottom' }} />
              
              {/* Mailbox */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 2.2 }}
                style={{ position: 'absolute', left: 50, top: 60, width: 200, height: 100, zIndex: 3 }}>
                <div style={{ position: 'absolute', right: 0, top: 5, width: 20, height: 90, background: '#450a0a' }} />

                <svg viewBox="0 0 200 100" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
                  <defs>
                    <linearGradient id="mb-grad" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="0%" stopColor="#f87171" /><stop offset="20%" stopColor="#ef4444" />
                      <stop offset="80%" stopColor="#dc2626" /><stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>
                  </defs>
                  <motion.path d="M 190 0 L 40 0 A 40 50 0 0 0 40 100 L 190 100 Z" fill="url(#mb-grad)" 
                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 2.5 }} />
                  <motion.rect x="130" y="45" width="10" height="10" rx="2" fill="#94a3b8" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 3 }} />
                </svg>

                <motion.div style={{ position: 'absolute', left: 135, top: 50, width: 40, height: 10, background: '#ef4444', borderRadius: '5px', transformOrigin: '0% 50%', zIndex: 6, border: '1px solid #b91c1c' }}
                  initial={{ rotateZ: 0, opacity: 0 }}
                  animate={phase === 'opened' || phase === 'shaking' || phase === 'scattered' ? { rotateZ: 0, opacity: 1 } : { rotateZ: -90, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: phase === 'sealed' ? 3.2 : 0.1 }} />

                <motion.div style={{ position: 'absolute', right: 10, top: 0, width: 10, height: 100, transformOrigin: 'bottom right', zIndex: 7 }}
                  initial={{ opacity: 0 }}
                  animate={phase !== 'sealed' ? { rotateZ: 100, opacity: 0 } : { rotateZ: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: phase === 'sealed' ? 3.4 : 0 }}>
                  <svg viewBox="0 0 10 100" style={{ width: '100%', height: '100%' }}>
                    <rect x="0" y="0" width="10" height="100" fill="#dc2626" rx="2" />
                    <rect x="5" y="10" width="8" height="20" rx="3" fill="#cbd5e1" />
                  </svg>
                </motion.div>
              </motion.div>
           </motion.div>
        </div>
      </div>
    )}

      {/* --- READING PHASE --- */}
      {(phase === 'reading' || phase === 'finished') && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
          <LetterContent onComplete={() => setPhase('finished')} />
          <AnimatePresence>
            {phase === 'finished' && (
              <motion.div className="resume-outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
                style={{ marginTop: '60px', marginBottom: '40px' }}>
                <button className="ready-btn" onClick={onNext} style={{ background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-primary)' }}>
                  keep going →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
