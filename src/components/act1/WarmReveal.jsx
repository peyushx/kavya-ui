import { useState, useEffect, useRef } from "react";

const LINES = [
  { text: "Identity verified.", style: "system" },
  { 
    text: "Welcome back, Kavya.", 
    style: "system",
    special: {
      type: "cursive",
      split: "Welcome back, ",
      cursive: "Kavya."
    }
  },
  { text: "This isn't an app. There's no account. No login.", style: "personal" },
  { text: "This is just a little world someone built for you.", style: "personal" },
  { 
    text: "Someone who wants you to be happy every day", 
    style: "personal",
    special: {
      type: "strikethrough",
      base: "Someone who wants you to be happy every ",
      wrong: "day",
      correct: "minute :)."
    }
  },
  { text: "So sit tight. Get comfortable.", style: "personal" },
  { text: "Can't wait to see you smile", style: "personal" },
];

import { motion } from "framer-motion";

function TypewriterText({ text, speed = 45, onComplete, className, special }) {
  const [displayed, setDisplayed] = useState("");
  const [cursiveVisible, setCursiveVisible] = useState(false);
  const [strikethroughDone, setStrikethroughDone] = useState(false);
  const [correctedText, setCorrectedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setCursiveVisible(false);
    setStrikethroughDone(false);
    setCorrectedText("");
    setDone(false);

    if (special?.type === "cursive") {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(special.split.slice(0, i + 1));
        i++;
        if (i >= special.split.length) {
          clearInterval(interval);
          setTimeout(() => {
            setCursiveVisible(true);
            setDone(true);
            if (onComplete) setTimeout(onComplete, 2500);
          }, 400);
        }
      }, speed);
      return () => clearInterval(interval);
    } else if (special?.type === "strikethrough") {
      // 1. Type base + wrong
      const fullInitial = special.base + special.wrong;
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(fullInitial.slice(0, i + 1));
        i++;
        if (i >= fullInitial.length) {
          clearInterval(interval);
          // 2. Wait, then strike
          setTimeout(() => {
            setStrikethroughDone(true);
            // 3. Type correction
            let j = 0;
            const correctInterval = setInterval(() => {
              setCorrectedText(special.correct.slice(0, j + 1));
              j++;
              if (j >= special.correct.length) {
                clearInterval(correctInterval);
                setDone(true);
                if (onComplete) setTimeout(onComplete, 2000);
              }
            }, speed);
          }, 800);
        }
      }, speed);
      return () => clearInterval(interval);
    } else {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          if (onComplete) setTimeout(onComplete, 1200);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [text, speed, special, onComplete]);

  return (
    <p className={className}>
      {special?.type === "strikethrough" ? (
        <span>
          <span>{displayed.slice(0, special.base.length)}</span>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            {displayed.slice(special.base.length)}
            {strikethroughDone && (
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '55%',
                  height: '2px',
                  background: 'currentColor',
                  opacity: 0.7
                }}
              />
            )}
          </span>
          <span style={{ marginLeft: '8px' }}>{correctedText}</span>
        </span>
      ) : (
        <>
          <span>{displayed}</span>
          {special?.type === "cursive" && cursiveVisible && (
            <span className="cursive-name writing-animation">
              {special.cursive}
            </span>
          )}
        </>
      )}
      {!done && <span className="cursor-blink">|</span>}
    </p>
  );
}

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

export default function WarmReveal({ onReady }) {
  const [phase, setPhase] = useState("verified"); // verified → lines
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      delay: Math.random() * 8,
      size: 1 + Math.random() * 3,
      x: Math.random() * 100,
      duration: 6 + Math.random() * 8,
    }))
  );

  useEffect(() => {
    const t2 = setTimeout(() => setPhase("lines"), 2500);
    return () => clearTimeout(t2);
  }, []);

  const handleLineComplete = () => {
    if (lineIndex < LINES.length - 1) {
      setTimeout(() => setLineIndex((i) => i + 1), 1400);
    } else {
      setTimeout(() => setShowButton(true), 1500);
    }
  };

  return (
    <>
        {/* Status */}
        <div className="status-text">
          {phase === "verified" && "verified"}
          {phase === "lines" && "for you"}
        </div>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}

        {/* ---- VERIFIED PHASE ---- */}
        {phase === "verified" && (
          <div className="verified-container">
            <div className="check-circle">
              <svg
                className="checkmark-svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="checkmark-path" d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div className="verified-label">verified</div>
          </div>
        )}

        {/* ---- LINES PHASE ---- */}
        {phase === "lines" && (
          <>
            <div className="lines-container">
              <div className="line-wrapper" key={lineIndex}>
                <TypewriterText
                  text={LINES[lineIndex].text}
                  special={LINES[lineIndex].special}
                  speed={LINES[lineIndex].style === "system" ? 40 : 50}
                  onComplete={handleLineComplete}
                  className={
                    LINES[lineIndex].style === "system"
                      ? "line-system"
                      : "line-personal"
                  }
                />
              </div>
            </div>

            {showButton && (
              <button className="ready-btn" onClick={onReady}>
                I'm ready
              </button>
            )}
          </>
        )}

        {/* Bottom ornament */}
        <div className="bottom-ornament">
          <div className="ornament-line" />
          <div className="ornament-dot" />
          <div className="ornament-line" />
        </div>
    </>
  );
}
