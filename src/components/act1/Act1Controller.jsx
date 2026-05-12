import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CutenessCheck from './CutenessCheck';
import MoodCheck from './MoodCheck';
import TrustTest from './TrustTest';
import LoadingScreen from './LoadingScreen';

const screenVariants = {
  enter: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

const screenTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export default function Act1Controller({ onComplete, isHeartbroken, onHeartbreak, isSkyFalling, onSkyFalling, theme }) {
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem('kavvs_act1Step')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('kavvs_act1Step', step);
  }, [step]);

  return (
    <div className="act1-container">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="cuteness"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={screenTransition}
          >
            <CutenessCheck onNext={() => setStep(1)} />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="mood"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={screenTransition}
          >
            <MoodCheck 
              onNext={() => setStep(2)} 
              isHeartbrokenGlobal={isHeartbroken}
              onHeartbreakGlobal={onHeartbreak}
              isSkyFalling={isSkyFalling}
              onSkyFalling={onSkyFalling}
              theme={theme}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="trust"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={screenTransition}
          >
            <TrustTest onNext={() => setStep(3)} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="loading"
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={screenTransition}
          >
            <LoadingScreen onComplete={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
