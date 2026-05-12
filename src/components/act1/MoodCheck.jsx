import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeartbreakOverlay from './mood-check/HeartbreakOverlay';
import MeterDisplay from './mood-check/MeterDisplay';
import BrokenMeter from './mood-check/BrokenMeter';
import NarrativeOverlay from './mood-check/NarrativeOverlay';
import HeartGame from './mood-check/HeartGame';

const phases = [
  { text: "scanning…", angle: -80, label: "low vibe" },
  { text: "hmm…", angle: -40, label: "vibe-ing" },
  { text: "interesting…", angle: 0, label: "pure vibes" },
  { text: "wait…", angle: 45, label: "immaculate" },
  { text: "!!!", angle: 115, label: "BADDIE ENERGY" },
];

function FloatingParticle({ delay, size, x, duration, className }) {
  return (
    <div
      className={`floating-particle ${className || ""}`}
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

export default function MoodCheck({ onNext, isHeartbrokenGlobal, onHeartbreakGlobal, isSkyFalling, onSkyFalling, theme }) {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      delay: Math.random() * 8,
      size: 1 + Math.random() * 3,
      x: Math.random() * 100,
      duration: 6 + Math.random() * 8,
    }))
  );
  const [isIntro, setIsIntro] = useState(true);
  const [introText, setIntroText] = useState("");
  const [showIntroButtons, setShowIntroButtons] = useState(false);
  const [isHeartbroken, setIsHeartbroken] = useState(false);
  const [heartbreakPhase, setHeartbreakPhase] = useState(0); // 0: none, 1: particles, 2: sun, 3: blackout

  // Sync with global state if reset externally
  useEffect(() => {
    if (!isHeartbrokenGlobal && isHeartbroken) {
      setIsHeartbroken(false);
      setHeartbreakPhase(0);
    }
  }, [isHeartbrokenGlobal, isHeartbroken]);

  const [phase, setPhase] = useState(0);
  const [scanningText, setScanningText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);
  const [heartsCaught, setHeartsCaught] = useState(0);
  const [heartPos, setHeartPos] = useState({ x: 50, y: 50 });
  const [heartKey, setHeartKey] = useState(0);
  const [poppedPos, setPoppedPos] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [showFinalHeart, setShowFinalHeart] = useState(false);
  const [showSmirk, setShowSmirk] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typedHeartbreakText, setTypedHeartbreakText] = useState('');
  const [showHeartbreakButton, setShowHeartbreakButton] = useState(false);
  const [showHeartIcon, setShowHeartIcon] = useState(false);
  const [shards, setShards] = useState([]);
  const [narrativeActive, setNarrativeActive] = useState(false);
  const [narrativeText, setNarrativeText] = useState("");
  const [hasGloves, setHasGloves] = useState(false);
  const [showGloveWarning, setShowGloveWarning] = useState(false);
  const [glovesDropped, setGlovesDropped] = useState(false);
  const [meterCleaned, setMeterCleaned] = useState(false);
  const [draggingNearBin, setDraggingNearBin] = useState(false);
  const heartTimerRef = useRef(null);
  const chaosTimerRef = useRef(null);
  const binRef = useRef(null);
  const narrativeStartedRef = useRef(false);

  // Heartbreak sequencing
  const triggerHeartbreak = () => {
    setIsHeartbroken(true);
    if (onHeartbreakGlobal) onHeartbreakGlobal(true);
    setHeartbreakPhase(1); // Start falling leaves/particles

    setTimeout(() => {
      setHeartbreakPhase(2); // Sun falls
    }, 1200);

    setTimeout(() => {
      setHeartbreakPhase(3); // Fade to black
    }, 3500);
  };

  const resetHeartbreak = () => {
    setHeartbreakPhase(0);
    setIsHeartbroken(false);
    setTypedHeartbreakText('');
    setShowHeartbreakButton(false);
    if (onHeartbreakGlobal) onHeartbreakGlobal(false);
  };

  // Heartbreak Typewriter
  useEffect(() => {
    if (heartbreakPhase !== 3) return;

    let isMounted = true;
    const runTypewriter = async () => {
      // Initial wait after blackout starts
      await new Promise(r => setTimeout(r, 2000));

      const parts = [
        { text: "oh...", delay: 2000, speed: 200 }, // Slow typing + long pause
        { text: " okay then ", delay: 800, speed: 100 },
        { text: "💔", delay: 1200, speed: 300 },
        { text: "\ni guess the vibe check is over.", delay: 50, speed: 50 },
      ];

      let current = "";
      for (const part of parts) {
        if (!isMounted) return;

        // Type each character of the part
        for (let char of part.text) {
          if (!isMounted) return;
          current += char;
          setTypedHeartbreakText(current);
          await new Promise(r => setTimeout(r, part.speed));
        }

        // Pause after the part
        await new Promise(r => setTimeout(r, part.delay));
      }

      if (isMounted) setShowHeartbreakButton(true);
    };

    runTypewriter();
    return () => { isMounted = false; };
  }, [heartbreakPhase]);

  // Typing effect for intro
  useEffect(() => {
    if (!isIntro) return;
    const fullText = "Before that han. I need to check ur vibe :)";
    let i = 0;
    const interval = setInterval(() => {
      setIntroText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowIntroButtons(true), 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isIntro]);


  const spawnHeart = useCallback(() => {
    setHeartPos({
      x: 5 + Math.random() * 85,
      y: 5 + Math.random() * 80,
    });
    setHeartKey(prev => prev + 1);
  }, []);

  // Auto-respawn hearts while game is active
  useEffect(() => {
    if (!showPunchline || gameWon || showFinalHeart) return;
    // After 4 catches: impossibly fast (150ms). Before: normal speed.
    const speed = heartsCaught >= 4 ? 150 : Math.max(1500, 2500 - heartsCaught * 250);
    heartTimerRef.current = setInterval(() => {
      spawnHeart();
    }, speed);
    return () => clearInterval(heartTimerRef.current);
  }, [showPunchline, gameWon, showFinalHeart, heartsCaught, spawnHeart]);

  // After 4 catches: 10s chaos → smirk → 5s more chaos → typing reveal
  useEffect(() => {
    if (heartsCaught !== 4) return;
    const smirkTimer = setTimeout(() => {
      setShowSmirk(true);
    }, 10000);
    chaosTimerRef.current = setTimeout(() => {
      clearInterval(heartTimerRef.current);
      setShowSmirk(false);
      setShowFinalHeart(true);
    }, 15000);
    return () => {
      clearTimeout(smirkTimer);
      clearTimeout(chaosTimerRef.current);
    };
  }, [heartsCaught]);

  const catchHeart = () => {
    if (heartsCaught >= 4 && !showFinalHeart) return; // Can't catch during chaos
    const newCount = heartsCaught + 1;
    setPoppedPos({ ...heartPos });
    setTimeout(() => setPoppedPos(null), 400);
    setHeartsCaught(newCount);
    if (newCount >= 5) {
      setGameWon(true);
      clearInterval(heartTimerRef.current);
    } else {
      spawnHeart();
    }
  };

  // Typing effect when final heart is shown
  useEffect(() => {
    if (!showFinalHeart) return;
    const fullText = "no one messes with jiya's baddie";
    let i = 0;
    const typeTimer = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typeTimer);
        setTimeout(() => setShowHeartIcon(true), 600);
      }
    }, 60);
    return () => clearInterval(typeTimer);
  }, [showFinalHeart]);

  const catchFinalHeart = () => {
    setHeartsCaught(5);
    setGameWon(true);
  };

  const handlePointerDown = () => {
    if (isBroken) return;
    setIsScanning(true);
  };

  const handlePointerUp = () => {
    if (isBroken) return;
    setIsScanning(false);
    setPhase(0); // Reset the meter
  };

  const scanningPhrases = [
    { text: "calculating ur exact vibe...", speed: 60, pauseAfter: 0 },
    { text: "Wow that's pretty finger.. : )", speed: 100, pauseAfter: 500 },
    { text: "sorry my bad love..", speed: 70, pauseAfter: 300 },
    { text: "okay so, almost complete", speed: 80, pauseAfter: 400 },
    { text: "wait wait something is wrong", speed: 120, pauseAfter: 0 }
  ];

  useEffect(() => {
    if (!isScanning) {
      setScanningText("");
      return;
    }

    let isMounted = true;
    const runTypewriter = async () => {
      const phraseObj = scanningPhrases[phase];
      if (!phraseObj) return;

      const fullText = phraseObj.text;
      let current = "";
      setScanningText("");

      for (let i = 0; i < fullText.length; i++) {
        if (!isMounted) return;
        const char = fullText[i];
        current += char;
        setScanningText(current);

        // Dynamic delay logic
        let delay = phraseObj.speed;
        if (char === '.' || char === ',') delay += 300; // Pause for punctuation
        if (char === ' ') delay += 50; // Slight pause between words

        // Add some randomness for "human" feel
        const jitter = Math.random() * 40 - 20;
        await new Promise(r => setTimeout(r, Math.max(20, delay + jitter)));
      }
    };

    runTypewriter();
    return () => { isMounted = false; };
  }, [isScanning, phase]);

  useEffect(() => {
    if (!isScanning) return;

    // Sequence timing — stretched out for slower scanning
    const sequence = [
      { delay: 3000, action: () => setPhase(1) },
      { delay: 6500, action: () => setPhase(2) },
      { delay: 10000, action: () => setPhase(3) },
      {
        delay: 13500, action: () => {
          setPhase(4);
          setIsBroken(true);
          // Spawn broken glass shards
          setShards([
            { id: 1, left: '10%', top: '25%', rotate: 15, size: 110, clip: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
            { id: 2, left: '55%', top: '20%', rotate: -30, size: 130, clip: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' },
            { id: 3, left: '25%', top: '50%', rotate: 55, size: 95, clip: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
            { id: 4, left: '70%', top: '45%', rotate: -20, size: 100, clip: 'polygon(0% 20%, 100% 0%, 80% 100%, 20% 80%)' },
            { id: 5, left: '45%', top: '55%', rotate: 40, size: 90, clip: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' },
            { id: 6, left: '80%', top: '60%', rotate: -50, size: 105, clip: 'polygon(10% 10%, 90% 0%, 100% 90%, 0% 100%)' },
          ]);
        }
      },
      { delay: 14000, action: () => setShowError(true) },
    ];

    const timeouts = sequence.map(step => setTimeout(step.action, step.delay));
    return () => timeouts.forEach(clearTimeout);
  }, [isScanning]);

  const handleShardFirstTouch = () => {
    if (hasGloves) return;
    setShowGloveWarning(true);
    setTimeout(() => {
      setGlovesDropped(true);
    }, 1800);
  };

  const handleGlovesPickup = () => {
    setHasGloves(true);
    setShowGloveWarning(false);
    setGlovesDropped(false);
  };

  const totalPieces = shards.length + (meterCleaned ? 0 : 1);

  const checkAllCleaned = (shardsLeft, meterGone) => {
    if (shardsLeft === 0 && meterGone) {
      setTimeout(() => startStory(), 800);
    }
  };

  const startStory = async () => {
    if (narrativeStartedRef.current) return;
    narrativeStartedRef.current = true;

    if (onSkyFalling) onSkyFalling(true);
    setNarrativeActive(true);
    const story = [
      "well... that just happened.",
      "don't worry han, you didn't break anything.",
      "this meter just wasn't built for someone like you.",
      "it tried to measure jiya's baddie and literally gave up lol.",
      "but honestly... i already knew the result.",
      "i never needed a meter to know what you are.",
      "you're my favorite disaster. let me show you why."
    ];

    for (const line of story) {
      // Clear text with a tiny delay to avoid flickering/jank
      setNarrativeText("");
      await new Promise(r => setTimeout(r, 100));

      // type line
      let currentText = "";
      for (let char of line) {
        currentText += char;
        setNarrativeText(currentText);
        // More stable delay
        await new Promise(r => setTimeout(r, 35 + Math.random() * 25));
      }
      // wait more after the last line
      await new Promise(r => setTimeout(r, 2000));
    }
    if (onSkyFalling) onSkyFalling(false);
    setNarrativeActive(false);
    setShowPunchline(true);
  };

  const handleShardDragEnd = (id, info) => {
    if (!hasGloves) return;
    setDraggingNearBin(false);
    if (Math.abs(info.offset.x) > 60 || Math.abs(info.offset.y) > 60) {
      setShards(prev => {
        const remaining = prev.filter(s => s.id !== id);
        checkAllCleaned(remaining.length, meterCleaned);
        return remaining;
      });
    }
  };

  const handleMeterDragEnd = (e, info) => {
    if (!hasGloves) return;
    setDraggingNearBin(false);
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.offset.y) > 80) {
      setMeterCleaned(true);
      checkAllCleaned(shards.length, true);
    }
  };

  const handleDrag = (e, info) => {
    // Check if dragging near the bin area (bottom center)
    if (!binRef.current) return;
    const binRect = binRef.current.getBoundingClientRect();
    const binCenterX = binRect.left + binRect.width / 2;
    const binCenterY = binRect.top + binRect.height / 2;
    const pointerX = info.point.x;
    const pointerY = info.point.y;
    const dist = Math.sqrt((pointerX - binCenterX) ** 2 + (pointerY - binCenterY) ** 2);
    setDraggingNearBin(dist < 120);
  };

  return (
    <div className="warm-reveal-container phase-scanning">
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

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle
          key={i}
          {...p}
          className={heartbreakPhase >= 1 ? "falling-particle-broken" : ""}
        />
      ))}

      {/* Full screen red flash on break */}
      <AnimatePresence>
        {isBroken && !showPunchline && (
          <motion.div
            className="screen-flash-red"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.1, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.3, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {isHeartbroken && heartbreakPhase === 1 && (
        <div className="heartbreak-leaf-rain">
          {[...Array(20)].map((_, i) => (
            <FloatingParticle key={i} x={Math.random() * 100} size={8 + Math.random() * 10} delay={Math.random() * 2} duration={2 + Math.random() * 2} className="particle-leaf rain-anim" />
          ))}
        </div>
      )}

      <HeartbreakOverlay
        isHeartbroken={isHeartbroken}
        heartbreakPhase={heartbreakPhase}
        typedHeartbreakText={typedHeartbreakText}
        showHeartbreakButton={showHeartbreakButton}
        resetHeartbreak={resetHeartbreak}
      />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div
            key="intro-screen"
            className="intro-center-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="line-system" style={{ fontSize: '24px', minHeight: '64px' }}>{introText}</h2>
            <AnimatePresence>
              {showIntroButtons && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
                >
                  <button className="ready-btn" onClick={() => setIsIntro(false)} style={{ padding: '16px 48px' }}>
                    Go ahead !
                  </button>
                  <button
                    onClick={triggerHeartbreak}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontStyle: 'italic'
                    }}
                  >
                    ( Nope, I have trust issues )
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <>
            <MeterDisplay
              isBroken={isBroken}
              isScanning={isScanning}
              scanningText={scanningText}
              hasGloves={hasGloves}
              meterCleaned={meterCleaned}
              phase={phase}
              phases={phases}
              showError={showError}
              showPunchline={showPunchline}
              handleMeterDragEnd={handleMeterDragEnd}
              handleDrag={handleDrag}
              handlePointerDown={handlePointerDown}
              handlePointerUp={handlePointerUp}
            />

            <BrokenMeter
              isBroken={isBroken}
              showGloveWarning={showGloveWarning}
              glovesDropped={glovesDropped}
              hasGloves={hasGloves}
              shards={shards}
              totalPieces={totalPieces}
              draggingNearBin={draggingNearBin}
              theme={theme}
              handleGlovesPickup={handleGlovesPickup}
              handleShardDragEnd={handleShardDragEnd}
              handleDrag={handleDrag}
              handleShardFirstTouch={handleShardFirstTouch}
              binRef={binRef}
            />

            <NarrativeOverlay
              active={narrativeActive}
              text={narrativeText}
            />

            {showPunchline && (
              <HeartGame
                gameWon={gameWon}
                heartsCaught={heartsCaught}
                showSmirk={showSmirk}
                showFinalHeart={showFinalHeart}
                typedText={typedText}
                showHeartIcon={showHeartIcon}
                poppedPos={poppedPos}
                heartKey={heartKey}
                heartPos={heartPos}
                catchHeart={catchHeart}
                catchFinalHeart={catchFinalHeart}
                onNext={onNext}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
