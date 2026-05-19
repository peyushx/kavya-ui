import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealGroupReaction from './reveal/RevealGroupReaction';
import RevealNarrator from './reveal/RevealNarrator';
import RevealReceipts from './reveal/RevealReceipts';
import RevealTypewriter from './reveal/RevealTypewriter';
import RevealMontage from './reveal/RevealMontage';
import RevealFinalChat from './reveal/RevealFinalChat';

const PHASES = ['GROUP_REACTION','NARRATOR','RECEIPTS','TYPEWRITER','MONTAGE','FINAL_CHAT'];

export default function TheReveal({ theme, chosenSuspect, onNext }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex];

  const advance = () => {
    if (phaseIndex < PHASES.length - 1) {
      setPhaseIndex(prev => prev + 1);
    } else {
      if (onNext) onNext();
    }
  };

  return (
    <div style={{
      minHeight: '100vh', width: '100%', position: 'relative',
      background: '#000', fontFamily: "'Outfit', sans-serif",
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {phase === 'GROUP_REACTION' && (
          <motion.div key="p1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealGroupReaction theme={theme} chosenSuspect={chosenSuspect} onComplete={advance} />
          </motion.div>
        )}
        {phase === 'NARRATOR' && (
          <motion.div key="p2" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealNarrator onComplete={advance} />
          </motion.div>
        )}
        {phase === 'RECEIPTS' && (
          <motion.div key="p3" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealReceipts onComplete={advance} />
          </motion.div>
        )}
        {phase === 'TYPEWRITER' && (
          <motion.div key="p4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealTypewriter onComplete={advance} />
          </motion.div>
        )}
        {phase === 'MONTAGE' && (
          <motion.div key="p5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealMontage onComplete={advance} />
          </motion.div>
        )}
        {phase === 'FINAL_CHAT' && (
          <motion.div key="p6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} style={{position:'absolute',inset:0}}>
            <RevealFinalChat theme={theme} onComplete={advance} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
