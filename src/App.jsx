import { useState, useEffect, useLayoutEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Act 1
import Act1Controller from './components/act1/Act1Controller';

// Act 2
import OpeningSky from './components/act2/OpeningSky';
import EmotionJar from './components/act2/EmotionJar';
import BaddieResume from './components/act2/BaddieResume';
import RainDrowning from './components/act2/RainDrowning';
import TheChat from './components/act2/TheChat';
import TheDetective from './components/act2/TheDetective';

import './warm-theme.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power2.out',
  duration: 1,
});


import ThemeToggle from './components/ThemeToggle';
import AtmosphericOverlay from './components/AtmosphericOverlay';
import ChapterNav from './components/ChapterNav';

export default function App() {
 
  const [currentAct, setCurrentAct] = useState(() => {
    return localStorage.getItem('kavvs_currentAct') || 'act1';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kavvs_theme') || 'dark';
  });

  const [isHeartbroken, setIsHeartbroken] = useState(false);
  const [isSkyFalling, setIsSkyFalling] = useState(false);
  
  const [act2Phase, setAct2Phase] = useState(() => {
    return localStorage.getItem('kavvs_act2Phase') || 'opening';
  });

  const [act1Step, setAct1Step] = useState(() => {
    return parseInt(localStorage.getItem('kavvs_act1Step')) || 0;
  });


  useEffect(() => {
    localStorage.setItem('kavvs_currentAct', currentAct);
  }, [currentAct]);

  useEffect(() => {
    localStorage.setItem('kavvs_act2Phase', act2Phase);
  }, [act2Phase]);

  useEffect(() => {
    localStorage.setItem('kavvs_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Chapter navigation handler
  const handleChapterNavigate = (act, step, phase) => {
    if (act === 'act1') {
      setCurrentAct('act1');
      setAct1Step(step);
      localStorage.setItem('kavvs_act1Step', step);
    } else if (act === 'act2') {
      setCurrentAct('act2');
      setAct2Phase(phase);
      localStorage.setItem('kavvs_act2Phase', phase);
    }
  };

  // Initialize Lenis only when we're past Act 1 (Act 2+ uses scrolling)
  useEffect(() => {
    if (currentAct !== 'act2') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis (recommended official integration)
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    // Turn off GSAP's lag smoothing to avoid conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [currentAct]);

  return (
    <div className="app-container">
      <ThemeToggle 
        theme={theme} 
        onToggle={toggleTheme} 
        isLocked={currentAct === 'act2' && act2Phase === 'rain'} 
      />
      <AtmosphericOverlay 
        theme={theme} 
        isHeartbroken={isHeartbroken} 
        isSkyFalling={isSkyFalling} 
        isRaining={currentAct === 'act2' && act2Phase === 'rain'}
        isStorming={currentAct === 'act2' && act2Phase === 'rain'}
      />

      <button className="reset-btn" onClick={handleReset}>
        reset
      </button>

      <ChapterNav
        currentAct={currentAct}
        act1Step={act1Step}
        act2Phase={act2Phase}
        onNavigate={handleChapterNavigate}
      />

      {/* Act 1 — click-based, no scroll */}
        {currentAct === 'act1' && (
          <Act1Controller 
            onComplete={() => setCurrentAct('act2')} 
            isHeartbroken={isHeartbroken}
            onHeartbreak={setIsHeartbroken}
            isSkyFalling={isSkyFalling}
            onSkyFalling={setIsSkyFalling}
            theme={theme}
            externalStep={act1Step}
            onStepChange={setAct1Step}
          />
        )}

      {/* Bridge — Skipped in favor of WarmReveal intro directly to Act 2 */}

      {/* Act 2 — scroll-driven sections */}
      {currentAct === 'act2' && (
        <div>
          {act2Phase === 'opening' && (
            <OpeningSky onComplete={() => setAct2Phase('emotion-jar')} />
          )}
          
          {act2Phase === 'emotion-jar' && (
            <EmotionJar onNext={() => setAct2Phase('resume')} />
          )}

          {act2Phase === 'resume' && (
            <BaddieResume onNext={() => setAct2Phase('rain')} />
          )}

          {act2Phase === 'rain' && (
            <RainDrowning theme={theme} onNext={() => setAct2Phase('chat')} />
          )}

          {act2Phase === 'chat' && (
            <TheChat theme={theme} onNext={() => setAct2Phase('detective')} />
          )}

          {act2Phase === 'detective' && (
            <TheDetective theme={theme} onNext={() => alert('Act 2 complete! Preparing Act 3...')} />
          )}
        </div>
      )}
    </div>
  );
}
