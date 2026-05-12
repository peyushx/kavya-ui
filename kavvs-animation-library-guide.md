# Animation & Transition Library Guide
## Every effect in the website — which library, how to use it, and why

---

---

# 📦 LIBRARY OVERVIEW

## Install Everything

```bash
npm install framer-motion gsap @studio-freight/lenis @tsparticles/react tsparticles howler
```

## Which Library Does What

| Library | Best For | Used In |
|---------|----------|---------|
| **Framer Motion** | Component mount/unmount animations, hover/tap effects, layout transitions, presence animations | Act 1 screens, text fade-ins, button animations, card reveals, star pop-ups |
| **GSAP + ScrollTrigger** | Scroll-driven animations, timeline sequences, complex choreography, pinning sections | Sky color shifts, constellation drawing, sunrise gradient, rain-to-clear transition |
| **Lenis** | Smooth scrolling feel | Global (Act 2 and Act 3 scrolling) |
| **tsparticles** | Particle systems — stars, rain, fireflies, floating dots | Star fields, rain effect, floating particles in Act 1 background |
| **Howler.js** | Audio playback with fade, loop, volume control | Background music, rain sounds, voice note |
| **CSS @keyframes** | Simple looping animations that don't need JS control | Cloud drifting, gentle floating, pulsing glow |

## The Rule

**Use the simplest tool that works:**
- Pure CSS → for loops that never change (clouds floating, gentle pulse)
- Framer Motion → for things that mount/unmount or respond to user interaction
- GSAP → for scroll-driven sequences or complex multi-step timelines
- tsparticles → for particle systems only

Don't use GSAP for a simple fade-in. Don't use Framer Motion for scroll-driven sky changes.

---

---

# 🔧 LIBRARY SETUP

## 1. Lenis (Smooth Scroll) — Global Setup

Lenis makes scrolling feel buttery smooth instead of the default browser choppiness.

**Where:** `App.jsx` — wraps everything

```jsx
// App.jsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration — higher = smoother/slower
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      smooth: true,
      smoothTouch: true,      // IMPORTANT: enables smooth scroll on mobile touch
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger so they work together
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    return () => lenis.destroy();
  }, []);

  return (
    <div>
      {/* Act 1 — click-based, no scroll */}
      {/* Act 2 — scroll-based */}
      {/* Act 3 — scroll-based */}
    </div>
  );
}
```

**Important:** Lenis and GSAP ScrollTrigger MUST be connected (the `lenis.on('scroll')` part) or scroll-driven animations will lag behind.

**Settings to tweak:**
- `duration: 1.2` — increase to 1.5-1.8 for even dreamier feel, decrease to 0.8 for snappier
- `smoothTouch: true` — must be true since she'll use mobile

---

## 2. GSAP + ScrollTrigger — Global Setup

```jsx
// At the top of App.jsx or in a setup file
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Default easing for everything — feels cinematic
gsap.defaults({
  ease: 'power2.out',
  duration: 1,
});
```

**ScrollTrigger crash course:**

```jsx
// Basic: animate something when it scrolls into view
gsap.to('.my-element', {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: '.my-element',    // element to watch
    start: 'top 80%',         // when top of element hits 80% of viewport
    end: 'top 30%',           // when top of element hits 30% of viewport
    scrub: true,              // ties animation to scroll position (not time)
    // scrub: 1,              // scrub with 1 second smoothing (feels dreamier)
  },
});
```

**Key concepts:**
- `scrub: true` = animation position follows scroll position exactly
- `scrub: 1` = animation follows scroll with 1 second of smoothing (RECOMMENDED for this project — feels dreamy)
- `pin: true` = element stays fixed while scroll animation plays
- `toggleActions: "play none none reverse"` = plays on enter, reverses on leave

---

## 3. Framer Motion — Import Pattern

```jsx
import { motion, AnimatePresence } from 'framer-motion';

// Basic fade-in component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  Content here
</motion.div>

// AnimatePresence — required for exit animations
<AnimatePresence mode="wait">
  {currentStep === 1 && <Screen1 key="s1" />}
  {currentStep === 2 && <Screen2 key="s2" />}
</AnimatePresence>
```

**The custom easing `[0.16, 1, 0.3, 1]`** — this is a custom cubic bezier that feels smooth and cinematic. Use it everywhere in this project instead of the default.

---

## 4. tsparticles — Setup

```jsx
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import { useEffect, useState } from 'react';

function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);  // loadSlim is smaller than loadFull
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      options={{/* config goes here — see section-specific configs below */}}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}
```

---

## 5. Howler.js — Audio Manager

```jsx
// hooks/useAudioManager.js
import { Howl } from 'howler';
import { useRef, useCallback } from 'react';

export function useAudioManager() {
  const musicRef = useRef(null);
  const rainRef = useRef(null);

  const startMusic = useCallback(() => {
    if (musicRef.current) return; // don't restart

    musicRef.current = new Howl({
      src: ['/audio/ambient-music.mp3'],
      loop: true,
      volume: 0,       // start silent
      html5: true,      // better for mobile — streams instead of loading whole file
    });

    musicRef.current.play();
    musicRef.current.fade(0, 0.4, 3000);  // fade in over 3 seconds to 40% volume
  }, []);

  const startRain = useCallback(() => {
    rainRef.current = new Howl({
      src: ['/audio/rain-loop.mp3'],
      loop: true,
      volume: 0,
      html5: true,
    });
    rainRef.current.play();
    rainRef.current.fade(0, 0.25, 2000);
  }, []);

  const fadeOutRain = useCallback(() => {
    if (rainRef.current) {
      rainRef.current.fade(0.25, 0, 3000); // fade out over 3s
      setTimeout(() => rainRef.current?.stop(), 3000);
    }
  }, []);

  const playVoiceNote = useCallback(() => {
    const voice = new Howl({
      src: ['/audio/voice-note.mp3'],
      volume: 0.8,
    });
    voice.play();
  }, []);

  return { startMusic, startRain, fadeOutRain, playVoiceNote };
}
```

**Usage in Bridge component:**
```jsx
const { startMusic } = useAudioManager();

// When "Hey Kavvs..." typewriter starts:
startMusic(); // music fades in softly
```

**CRITICAL for mobile:** Browsers block autoplay. Music can ONLY start after a user interaction (tap/click). That's why the Act 1 tap flow is perfect — by the time we reach the Bridge, she's already tapped multiple buttons, so the browser allows audio.

---

---

# 🎬 SECTION-BY-SECTION ANIMATION DETAILS

---

## ACT 1 — Funny Entry (Framer Motion Only)

Act 1 is entirely click-driven. No scrolling. Each screen replaces the previous one. This is pure Framer Motion territory.

### Screen Transitions (between steps)

```jsx
// Act1Controller.jsx
import { motion, AnimatePresence } from 'framer-motion';

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

function Act1Controller() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
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
          <motion.div key="mood" /* same variants */ >
            <MoodCheck onNext={() => setStep(2)} />
          </motion.div>
        )}
        {/* ... more steps */}
      </AnimatePresence>
    </div>
  );
}
```

**Why `mode="wait"`:** The current screen fully exits before the next one enters. Without this, they'd overlap during transition.

### Button Tap Animations

```jsx
// Reusable button with tap feedback
<motion.button
  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.12)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  onClick={handleClick}
  className="w-full p-4 rounded-xl border border-white/15 text-white"
>
  {label}
</motion.button>
```

**Spring physics:** `stiffness: 400, damping: 20` feels snappy but not harsh. Lower stiffness = bouncier. Higher damping = less bounce.

### Response Text Animation (after she taps an option)

```jsx
// The response that appears after her choice
<motion.p
  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
  transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
  className="text-emerald-300 text-sm mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
>
  {response}
</motion.p>
```

**The `filter: 'blur'` trick:** Text starts blurry and becomes sharp. Subtle but makes it feel like the text is "materializing" — way better than a plain fade.

### Runaway "No" Button

```jsx
import { motion, useMotionValue, useAnimation } from 'framer-motion';

function TrustTest({ onNext }) {
  const [attempts, setAttempts] = useState(0);
  const controls = useAnimation();

  const handleNoHover = () => {
    // Generate random position within the screen
    const randomX = (Math.random() - 0.5) * 250;
    const randomY = (Math.random() - 0.5) * 300;

    controls.start({
      x: randomX,
      y: randomY,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,    // low damping = button bounces when it lands
      },
    });

    setAttempts(prev => prev + 1);
  };

  return (
    <div className="relative h-[300px]">
      <p className="text-white text-xl text-center">Do you trust me?</p>

      <button onClick={onNext} className="...">
        Yes
      </button>

      {attempts < 4 ? (
        <motion.button
          animate={controls}
          onHoverStart={handleNoHover}    // desktop
          onTouchStart={handleNoHover}    // mobile — triggers before tap completes
          className="absolute ..."
        >
          No
        </motion.button>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 text-sm italic"
        >
          You literally can't say no. I rigged it.
        </motion.p>
      )}
    </div>
  );
}
```

**For mobile:** Use `onTouchStart` instead of `onHoverStart` because there's no hover on touch screens. The button moves the instant her finger gets close.

### Fake Loading Bar

```jsx
import { motion } from 'framer-motion';

function LoadingBar() {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          // Custom keyframes — bar gets "stuck" then jumps
          times: [0, 0.3, 0.5, 0.52, 0.7, 0.72, 1],
          // widths at each time point:
          // 0% → 35% → 47%(stuck) → 47%(still stuck) → 88%(jump!) → 88% → 100%
        }}
        // Alternative using keyframes:
        // animate={{ width: ['0%', '35%', '47%', '47%', '88%', '88%', '100%'] }}
      />
    </div>
  );
}
```

**The "stuck" effect:** The bar pauses at 47% (times 0.5 to 0.52 both at 47%), then jumps to 88%. This makes it feel like a real slow loading bar and is funnier.

### Rotating Messages Above Loading Bar

```jsx
import { AnimatePresence, motion } from 'framer-motion';

function RotatingMessages({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-white/70 text-sm text-center absolute w-full"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
```

---

## BRIDGE — "Hey Kavvs…" (Framer Motion + Howler)

This is the most important transition. Funny → Emotional.

```jsx
function Bridge({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0=black, 1=line1, 2=line2, 3=fade
  const { startMusic } = useAudioManager();

  useEffect(() => {
    // Timeline: black → show line 1 → show line 2 → fade to sky
    const timers = [
      setTimeout(() => { setPhase(1); startMusic(); }, 2000),  // 2s of black silence
      setTimeout(() => setPhase(2), 5000),     // line 2 after line 1 finishes typing
      setTimeout(() => setPhase(3), 8000),     // begin fade to sky
      setTimeout(() => onComplete(), 10000),   // hand off to Act 2
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-black flex items-center justify-center"
      animate={phase === 3 ? {
        background: 'linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #7dd3fc 100%)',
      } : {}}
      transition={{ duration: 3, ease: 'easeInOut' }}
    >
      {phase >= 1 && (
        <div className="text-center">
          <TypewriterText
            text="Hey Kavvs…"
            speed={70}                    // slower than normal — 70ms per char
            className="text-white text-3xl font-caveat"
          />
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <TypewriterText
                text="This is for you."
                speed={60}
                className="text-white/80 text-xl mt-4"
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
```

### Typewriter Component (Reusable)

```jsx
function TypewriterText({ text, speed = 40, className, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className={className}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-white ml-1 align-middle"
        />
      )}
    </p>
  );
}
```

**The blinking cursor** at the end while typing — small detail, big impact.

---

## ACT 2, SECTION 2.1 — Opening Sky (GSAP + CSS + tsparticles)

### Cloud Layers (Pure CSS — no JS needed)

```css
/* index.css */

/* Cloud container — full width, positioned absolutely */
.cloud-layer {
  position: absolute;
  width: 200%;           /* wider than screen so clouds can loop */
  height: 100%;
  top: 0;
  left: 0;
}

/* Individual cloud */
.cloud {
  position: absolute;
  background: white;
  border-radius: 100px;
  opacity: 0.15;
  filter: blur(8px);     /* makes clouds look soft and diffused */
}

/* Layer 1 — far away, slow, small */
.cloud-layer-1 {
  animation: drift-slow 60s linear infinite;
}

.cloud-layer-1 .cloud {
  opacity: 0.08;
  filter: blur(12px);
}

/* Layer 2 — mid distance */
.cloud-layer-2 {
  animation: drift-medium 40s linear infinite;
}

/* Layer 3 — close, faster, more visible */
.cloud-layer-3 {
  animation: drift-fast 25s linear infinite;
}

.cloud-layer-3 .cloud {
  opacity: 0.2;
  filter: blur(4px);
}

@keyframes drift-slow {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }  /* moves half its width, then loops */
}

@keyframes drift-medium {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes drift-fast {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Why pure CSS?** Clouds just drift endlessly. They don't respond to user input. CSS is lighter than JS for this. Three layers at different speeds creates depth (parallax).

**Cloud shapes in JSX:**
```jsx
function CloudLayer({ speed, opacity, blur, clouds }) {
  return (
    <div
      className="absolute w-[200%] h-full top-0 left-0"
      style={{
        animation: `drift ${speed}s linear infinite`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: cloud.w,
            height: cloud.h,
            top: cloud.y,
            left: cloud.x,
          }}
        />
      ))}
    </div>
  );
}
```

### Star Field (tsparticles config)

```jsx
const starConfig = {
  particles: {
    number: { value: 80 },           // number of stars
    color: { value: '#ffffff' },
    opacity: {
      value: { min: 0.1, max: 0.8 }, // random opacity per star
      animation: {
        enable: true,
        speed: 0.5,                   // slow twinkle
        minimumValue: 0.1,
        sync: false,                  // each star twinkles independently
      },
    },
    size: {
      value: { min: 1, max: 3 },     // tiny dots
    },
    move: {
      enable: true,
      speed: 0.1,                     // barely drifting — almost still
      direction: 'none',
      random: true,
      outModes: 'bounce',
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'bubble',               // stars glow when she hovers near
      },
    },
    modes: {
      bubble: {
        distance: 100,
        size: 5,
        opacity: 1,
        duration: 2,
      },
    },
  },
  detectRetina: true,
};
```

**The hover bubble effect** — when she moves her finger/cursor near stars, they glow brighter and get slightly bigger. Makes the sky feel alive and responsive.

### Text Reveal on Scroll (GSAP ScrollTrigger)

```jsx
// FadeInText.jsx — reusable for all scroll-triggered text
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function FadeInText({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',        // starts when text is near bottom of viewport
          toggleActions: 'play none none none',  // play once, don't reverse
        },
      }
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

**Use this for every poetic text line in Act 2.** Each line fades in + moves up + deblurs as she scrolls to it.

---

## ACT 2, SECTION 2.2 — Childhood: Rain Effect

### Rain (tsparticles config)

```jsx
const rainConfig = {
  particles: {
    number: { value: 150 },
    color: { value: '#94a3b8' },     // gray-blue rain
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: {
      value: { min: 1, max: 2 },
      // Thin and tall = raindrop shape
    },
    shape: {
      type: 'line',                   // lines instead of circles = rain
    },
    move: {
      enable: true,
      speed: 15,                      // fast falling
      direction: 'bottom',           // falls downward
      straight: true,                // no wobble — rain falls straight
      outModes: {
        bottom: 'out',               // disappear at bottom
        top: 'out',
      },
    },
    rotate: {
      value: 10,                     // slight angle — rain rarely falls perfectly vertical
      direction: 'clockwise',
    },
    life: {
      duration: { value: 0 },       // infinite (keeps falling)
    },
  },
  detectRetina: true,
};
```

### Rain Fading Out (Transition Section)

When she scrolls from childhood → transition, rain should gradually stop:

```jsx
// In the Transition component
import { useEffect, useRef } from 'react';

function Transition() {
  const rainParticlesRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger to reduce rain particle count as she scrolls
    gsap.to({}, {
      scrollTrigger: {
        trigger: '#transition-section',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          // self.progress goes from 0 to 1
          const particleCount = Math.floor(150 * (1 - self.progress));
          // Update tsparticles count dynamically
          if (rainParticlesRef.current) {
            // tsparticles API to update options
            rainParticlesRef.current.loadOptions({
              particles: { number: { value: particleCount } }
            });
          }
        },
      },
    });
  }, []);

  // ...
}
```

### Sky Color Change (GSAP ScrollTrigger)

The most important visual transition — gray rainy sky → blue clear sky:

```jsx
useEffect(() => {
  // Create a GSAP timeline tied to scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#transition-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,                  // 1.5s smoothing for dreamy feel
      pin: true,                   // section stays pinned while sky changes
    },
  });

  // Step 1: Gray → Slate blue (rain clearing)
  tl.to('#sky-background', {
    background: 'linear-gradient(180deg, #475569 0%, #64748b 100%)',
    duration: 1,
  });

  // Step 2: Slate → Soft blue (sky opening)
  tl.to('#sky-background', {
    background: 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 50%, #bae6fd 100%)',
    duration: 2,
  });

  // Step 3: Birds appear
  tl.fromTo('.bird-svg',
    { x: -100, opacity: 0 },
    { x: '100vw', opacity: 1, duration: 3, stagger: 0.4 },
    '-=1.5'  // start slightly before sky finishes changing
  );

  // Step 4: Sunlight glow
  tl.fromTo('#sun-glow', {
    opacity: 0,
    scale: 0.5,
  }, {
    opacity: 0.6,
    scale: 1,
    duration: 2,
  }, '-=2');

}, []);
```

**`pin: true`** — This is KEY. The section stays locked on screen while the sky color animates based on scroll. She scrolls, but the section doesn't move — only the colors change. This creates a cinematic "scene change" feel.

**`scrub: 1.5`** — The animation follows her scroll but with 1.5 seconds of smoothing. So if she scrolls fast, the animation still feels smooth.

**`stagger: 0.4`** — Birds appear one after another, 0.4 seconds apart. Not all at once.

### Bird SVG Path Animation

```jsx
// Birds flying across screen
function FlyingBird({ delay }) {
  const pathRef = useRef(null);

  useEffect(() => {
    // Bird follows a slightly curved path
    gsap.fromTo(pathRef.current,
      { x: -80, y: 20, opacity: 0 },
      {
        x: window.innerWidth + 80,
        y: -30,                        // slight upward arc
        opacity: 1,
        duration: 4,
        delay,
        ease: 'none',                 // constant speed — birds don't accelerate
        scrollTrigger: {
          trigger: '#transition-section',
          start: 'center center',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <svg ref={pathRef} className="absolute" width="30" height="20" viewBox="0 0 30 20">
      {/* Simple bird shape — two curved lines */}
      <path d="M0 10 Q7 0 15 8 Q23 0 30 10" stroke="currentColor"
            fill="none" strokeWidth="2" className="text-gray-700" />
    </svg>
  );
}
```

---

## ACT 2, SECTION 2.3 — Nickname Clouds (Framer Motion)

```jsx
function NicknameClouds({ nicknames }) {
  const [revealed, setRevealed] = useState({});

  return (
    <div className="relative h-[400px]">
      {nicknames.map((item, i) => (
        <motion.div
          key={item.name}
          className="absolute cursor-pointer"
          style={{
            // Position each cloud differently
            top: ['20%', '45%', '70%'][i],
            left: ['15%', '55%', '35%'][i],
          }}
          // Gentle floating animation
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,           // each cloud floats out of sync
            ease: 'easeInOut',
          }}
          onClick={() => setRevealed(prev => ({ ...prev, [item.name]: true }))}
        >
          {/* Cloud shape */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4
                          border border-white/10 text-center">
            <p className="text-white text-lg font-semibold">{item.name}</p>

            {/* Meaning revealed on tap */}
            <AnimatePresence>
              {revealed[item.name] && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/70 text-sm font-caveat italic"
                >
                  {item.meaning}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## ACT 2, SECTION 2.4A — Collecting Smiles / Stars (Framer Motion)

```jsx
function CollectingSmiles({ stars }) {
  const [collected, setCollected] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const count = Object.keys(collected).length;

  // Generate random positions for stars (once)
  const positions = useRef(
    stars.map(() => ({
      top: `${15 + Math.random() * 65}%`,
      left: `${10 + Math.random() * 75}%`,
    }))
  ).current;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="text-white/50 text-sm text-center pt-8"
      >
        tap the stars
      </motion.p>

      {/* Stars */}
      {stars.map((message, i) => (
        <motion.button
          key={i}
          className="absolute"
          style={{ top: positions[i].top, left: positions[i].left }}
          // Pulse/twinkle animation
          animate={{
            scale: collected[i] ? 0.5 : [1, 1.3, 1],
            opacity: collected[i] ? 0.2 : [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: collected[i] ? 0 : Infinity,
            delay: i * 0.3,
          }}
          onClick={() => {
            setCollected(prev => ({ ...prev, [i]: true }));
            setActiveIndex(i);
          }}
        >
          {/* Star shape */}
          <div className={`w-3 h-3 rounded-full ${
            collected[i] ? 'bg-white/20' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
          }`} />
        </motion.button>
      ))}

      {/* Message card — appears when a star is tapped */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-20 mx-auto max-w-sm
                       bg-white/10 backdrop-blur-xl border border-white/15
                       rounded-2xl p-6 text-center z-50"
            onClick={() => setActiveIndex(null)}  // tap card to dismiss
          >
            <p className="text-white text-base leading-relaxed font-caveat text-lg">
              {stars[activeIndex]}
            </p>
            <p className="text-white/30 text-xs mt-3">tap to close</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter */}
      <motion.div
        className="fixed bottom-6 left-0 right-0 text-center"
        animate={{ opacity: count > 0 ? 1 : 0 }}
      >
        <p className="text-white/40 text-sm">
          {count}/{stars.length} smiles collected
          {count === stars.length && ' ✓'}
        </p>
      </motion.div>
    </div>
  );
}
```

---

## ACT 2, SECTION 2.4B — Safe Place House (Framer Motion + CSS)

```jsx
function SafePlace() {
  const [lit, setLit] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                    bg-gradient-to-b from-[#bae6fd] to-[#7dd3fc] relative">

      <FadeInText>
        <p className="text-[#1e3a5f] text-xl text-center mb-12">
          You never had a place that felt safe.
        </p>
      </FadeInText>

      {/* House */}
      <motion.div
        className="cursor-pointer relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLit(true)}
      >
        {/* House SVG goes here — simple line art */}
        <svg width="200" height="180" viewBox="0 0 200 180">
          {/* Roof */}
          <path d="M100 10 L190 80 L10 80 Z"
                fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
          {/* Body */}
          <rect x="30" y="80" width="140" height="90"
                fill="none" stroke="#1e3a5f" strokeWidth="2.5" />
          {/* Door */}
          <rect x="80" y="110" width="40" height="60"
                fill="none" stroke="#1e3a5f" strokeWidth="2" />
          {/* Windows */}
          <rect x="45" y="95" width="25" height="25"
                fill={lit ? '#fbbf24' : 'none'}
                stroke="#1e3a5f" strokeWidth="2"
                style={{ transition: 'fill 1s ease' }} />
          <rect x="130" y="95" width="25" height="25"
                fill={lit ? '#fbbf24' : 'none'}
                stroke="#1e3a5f" strokeWidth="2"
                style={{ transition: 'fill 1s ease' }} />
          {/* Chimney */}
          <rect x="140" y="25" width="20" height="55"
                fill="none" stroke="#1e3a5f" strokeWidth="2" />
        </svg>

        {/* Window glow effect */}
        <AnimatePresence>
          {lit && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1.5 }}
                className="absolute top-[55%] left-[22%] w-8 h-8 rounded-full
                           bg-amber-300 blur-xl pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1.5 }}
                transition={{ delay: 0.3 }}
                className="absolute top-[55%] right-[18%] w-8 h-8 rounded-full
                           bg-amber-300 blur-xl pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {!lit && (
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#1e3a5f]/50 text-sm mt-6"
        >
          tap the house
        </motion.p>
      )}

      {/* Text after house lights up */}
      <AnimatePresence>
        {lit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-center mt-10 px-8"
          >
            <p className="text-[#1e3a5f] text-lg leading-relaxed">
              You never deserved the chaos.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-[#1e3a5f] text-lg leading-relaxed mt-4"
            >
              You deserved warmth.<br />
              A place where you could just… be.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
              className="text-[#1e3a5f] text-xl font-caveat leading-relaxed mt-6"
            >
              I want to be that place.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## ACT 2, SECTION 2.4C — Ocean of Thoughts (CSS + Framer Motion)

### Floating Words Animation

```css
/* Words floating in water */
@keyframes float-word {
  0% {
    transform: translateX(100vw) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(-100vw) translateY(-20px);
    opacity: 0;
  }
}

/* For fading words — disappear before reaching the other side */
@keyframes float-word-fading {
  0% {
    transform: translateX(100vw) translateY(0);
    opacity: 0;
  }
  15% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.4;
  }
  55% {
    opacity: 0;                /* disappears midway */
  }
  100% {
    transform: translateX(-100vw);
    opacity: 0;
  }
}

/* Wave effect at bottom */
@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

```jsx
function OceanOfThoughts({ visible, fading }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1e3a5f] to-[#0c1929]
                    overflow-hidden">
      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 w-[200%]"
           style={{ animation: 'wave 8s linear infinite' }}>
        <svg viewBox="0 0 1440 120" className="w-full">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1440,40 1440,60 L1440,120 L0,120 Z"
                fill="rgba(125,211,252,0.1)" />
        </svg>
      </div>

      {/* Visible floating words */}
      {visible.map((word, i) => (
        <div
          key={`v-${i}`}
          className="absolute text-white/70 text-lg font-caveat whitespace-nowrap"
          style={{
            top: `${20 + i * 12}%`,
            animation: `float-word ${12 + i * 2}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        >
          {word}
        </div>
      ))}

      {/* Fading words — disappear before fully crossing */}
      {fading.map((word, i) => (
        <div
          key={`f-${i}`}
          className="absolute text-white/40 text-base italic whitespace-nowrap"
          style={{
            top: `${25 + i * 15}%`,
            animation: `float-word-fading ${10 + i * 2}s linear infinite`,
            animationDelay: `${i * 4 + 2}s`,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
```

---

## ACT 2, SECTION 2.5 — Constellation (GSAP — Most Complex Animation)

```jsx
function Constellation({ lines }) {
  const containerRef = useRef(null);
  const [starPositions] = useState(() => generateHeartConstellation());

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Stars fade in one by one
      gsap.fromTo('.constellation-star',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,             // each star 150ms after the last
          ease: 'back.out(2)',       // slight overshoot — star pops in
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Lines draw between stars (SVG line animation)
      gsap.fromTo('.constellation-line',
        { strokeDashoffset: 1000 },  // line is fully hidden
        {
          strokeDashoffset: 0,        // line draws in
          stagger: 0.3,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'center center',
            scrub: 1,                // tied to scroll
          },
        }
      );

      // 3. Text lines appear with scroll
      lines.forEach((_, i) => {
        gsap.fromTo(`#constellation-text-${i}`,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: `#constellation-text-${i}`,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 4. Heart glow appears last
      gsap.fromTo('#heart-glow',
        { opacity: 0 },
        {
          opacity: 0.3,
          duration: 3,
          scrollTrigger: {
            trigger: '#heart-glow',
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-[#0f172a] relative">

      {/* SVG canvas for stars and lines */}
      <svg className="sticky top-0 w-full h-screen" viewBox="0 0 400 400">
        {/* Lines between stars */}
        {starPositions.lines.map((line, i) => (
          <line
            key={i}
            className="constellation-line"
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="1000"       /* needed for draw-in animation */
            strokeDashoffset="1000"
          />
        ))}

        {/* Star dots */}
        {starPositions.stars.map((star, i) => (
          <circle
            key={i}
            className="constellation-star"
            cx={star.x} cy={star.y}
            r="2.5"
            fill="white"
          />
        ))}

        {/* Subtle heart glow behind the constellation */}
        <circle
          id="heart-glow"
          cx="200" cy="200" r="80"
          fill="url(#heartGradient)"
          opacity="0"
        />
        <defs>
          <radialGradient id="heartGradient">
            <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Text overlaid on the starry background */}
      <div className="absolute top-0 left-0 w-full">
        {lines.map((line, i) => (
          <div
            key={i}
            id={`constellation-text-${i}`}
            className="h-[35vh] flex items-center justify-center"
          >
            <p className={`text-white text-center px-8 ${
              i === lines.length - 1
                ? 'text-2xl font-caveat'    // last line bigger (handwritten)
                : 'text-lg'
            }`}>
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generate star positions that roughly form a heart
function generateHeartConstellation() {
  // Heart parametric equation (modified for a subtle, organic shape)
  const stars = [];
  const numStars = 20;

  for (let i = 0; i < numStars; i++) {
    const t = (i / numStars) * Math.PI * 2;
    // Heart curve with randomness
    const x = 200 + 80 * (16 * Math.pow(Math.sin(t), 3)) / 16 + (Math.random() - 0.5) * 20;
    const y = 200 - 80 * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) / 16 + (Math.random() - 0.5) * 20;
    stars.push({ x, y });
  }

  // Connect nearby stars with lines
  const lines = [];
  for (let i = 0; i < stars.length; i++) {
    const next = (i + 1) % stars.length;
    lines.push({
      x1: stars[i].x, y1: stars[i].y,
      x2: stars[next].x, y2: stars[next].y,
    });
    // Add some cross-connections for organic feel
    if (i % 3 === 0 && i + 3 < stars.length) {
      lines.push({
        x1: stars[i].x, y1: stars[i].y,
        x2: stars[i + 3].x, y2: stars[i + 3].y,
      });
    }
  }

  return { stars, lines };
}
```

**`sticky top-0`** — The SVG stays fixed on screen while text scrolls over it. This means the constellation builds and stays visible while she reads each line.

**`strokeDasharray` + `strokeDashoffset`** — This is the SVG line-drawing trick. The line is there but hidden (dashoffset = full length). As dashoffset animates to 0, the line "draws" itself.

---

## ACT 2, SECTION 2.6 — Sunrise (GSAP ScrollTrigger)

```jsx
function Sunrise() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',               // section is 2x viewport height of scroll
        scrub: 1.5,
        pin: true,                    // pinned while sunrise plays
      },
    });

    // Phase 1: Dark navy → deep purple
    tl.to('#sunrise-bg', {
      background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      duration: 1,
    });

    // Phase 2: Purple → warm orange at horizon
    tl.to('#sunrise-bg', {
      background: 'linear-gradient(180deg, #312e81 0%, #7c3aed 30%, #f97316 70%, #fbbf24 100%)',
      duration: 2,
    });

    // Phase 3: Full sunrise — golden warm
    tl.to('#sunrise-bg', {
      background: 'linear-gradient(180deg, #7dd3fc 0%, #bae6fd 30%, #fde68a 60%, #fbbf24 90%, #f97316 100%)',
      duration: 2,
    });

    // Stars fade out during phase 2
    tl.to('.sunrise-star', {
      opacity: 0,
      duration: 1.5,
    }, 1); // starts at time 1 in the timeline

    // Sun glow appears
    tl.fromTo('#sun-orb', {
      y: 100,
      opacity: 0,
      scale: 0.8,
    }, {
      y: 0,
      opacity: 0.9,
      scale: 1,
      duration: 2,
    }, 2);

    // Birds in sunrise
    tl.fromTo('.sunrise-bird', {
      x: -50,
      opacity: 0,
    }, {
      x: 300,
      opacity: 1,
      stagger: 0.5,
      duration: 3,
    }, 3);

    // Text reveals
    tl.fromTo('#sunrise-text-1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.5);
    tl.fromTo('#sunrise-text-2', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 3);
    tl.fromTo('#sunrise-text-3', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 4);
    tl.fromTo('#sunrise-final', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 }, 5);

  }, []);

  return (
    <div ref={sectionRef} className="h-screen relative overflow-hidden">
      <div id="sunrise-bg"
           className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#1e293b]
                      transition-none" />

      {/* Sun orb — glowing circle near bottom */}
      <div id="sun-orb" className="absolute bottom-[20%] left-1/2 -translate-x-1/2
                                    w-32 h-32 rounded-full bg-amber-300/80
                                    blur-2xl opacity-0" />

      {/* Text container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        <p id="sunrise-text-1" className="text-white text-xl text-center opacity-0">
          If the world was hard on you…
        </p>
        <p id="sunrise-text-2" className="text-white text-xl text-center mt-6 opacity-0">
          then let me be your peace.
        </p>
        <p id="sunrise-text-3" className="text-white/80 text-lg text-center mt-8 opacity-0">
          Not because you're broken. You never were.
        </p>
        <p id="sunrise-final"
           className="text-white text-3xl font-caveat text-center mt-10 opacity-0">
          I'm staying, Kavvs. 💙
        </p>
      </div>
    </div>
  );
}
```

---

## ACT 2 — Lantern Drag Interaction (Vanilla JS + CSS)

The lantern in the childhood section that reveals hidden text:

```jsx
function LanternReveal({ hiddenTexts }) {
  const [lanternPos, setLanternPos] = useState({ x: 40, y: 300 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX, clientY) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLanternPos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-[#0a0a0a] rounded-2xl overflow-hidden
                 cursor-grab active:cursor-grabbing select-none"
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }}
      onMouseDown={() => isDragging.current = true}
      onMouseUp={() => isDragging.current = false}
      onTouchStart={() => isDragging.current = true}
      onTouchEnd={() => isDragging.current = false}
    >
      {/* Hidden texts — only visible when lantern is near */}
      {hiddenTexts.map((text, i) => {
        const textPos = {
          x: [100, 250, 180][i],
          y: [80, 200, 320][i],
        };
        const distance = Math.hypot(lanternPos.x - textPos.x, lanternPos.y - textPos.y);
        const isRevealed = distance < 120;  // reveal radius

        return (
          <p
            key={i}
            className="absolute text-white font-caveat text-lg transition-opacity duration-500
                       pointer-events-none"
            style={{
              left: textPos.x,
              top: textPos.y,
              opacity: isRevealed ? Math.max(0, 1 - distance / 120) : 0,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {text}
          </p>
        );
      })}

      {/* Lantern glow (follows cursor/finger) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: lanternPos.x,
          top: lanternPos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Warm circular glow */}
        <div className="w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
        {/* Brighter center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
      </div>

      {/* Instruction */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/30 text-xs">
        drag the light to reveal
      </p>
    </div>
  );
}
```

**How it works:** The lantern creates a circular "light" area. Hidden texts have their opacity calculated by distance from the lantern. Closer = more visible. She literally drags light across darkness to find truths.

**`Math.hypot`** — calculates distance between two points. Much simpler than manual distance formula.

---

---

# 🎯 PERFORMANCE TIPS

1. **Kill ScrollTriggers when leaving Act 1.**
   Act 1 has no scrolling. Don't initialize GSAP ScrollTrigger until Act 2 begins.

2. **Use `will-change: transform` on animated elements.**
   Tells the browser to GPU-accelerate those elements.
   ```css
   .cloud, .bird-svg, .constellation-star {
     will-change: transform, opacity;
   }
   ```

3. **Limit tsparticles count on mobile.**
   Desktop: 80-150 particles.
   Mobile: 40-60 particles.
   ```jsx
   const isMobile = window.innerWidth < 768;
   const particleCount = isMobile ? 40 : 80;
   ```

4. **Lazy-load Act 2 components.**
   Don't render constellation/sunrise components until she's scrolled near them.
   ```jsx
   const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });
   return <div ref={ref}>{inView && <Constellation />}</div>;
   ```

5. **Audio: Use `html5: true` in Howler.**
   Streams audio instead of loading the entire file. Essential for mobile on slow connections.

6. **Preload fonts.**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Caveat:wght@500;700&display=swap">
   ```

7. **Test on her actual device if possible.**
   Or test on a mid-range phone. If it runs smooth there, it'll run smooth everywhere.

---

---

# 📐 RESPONSIVE BREAKPOINTS

```css
/* Mobile first (default) */
.poetic-text { font-size: 18px; padding: 0 24px; }
.section-height { min-height: 100vh; min-height: 100dvh; }  /* dvh = dynamic viewport height on mobile */

/* Tablet */
@media (min-width: 768px) {
  .poetic-text { font-size: 22px; padding: 0 48px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .poetic-text { font-size: 26px; max-width: 600px; margin: 0 auto; }
}
```

**`100dvh` vs `100vh`:** On mobile browsers, `100vh` includes the address bar area, so content gets cut off. `100dvh` is the actual visible area. Always use `100dvh` for full-screen sections.

---

---

# 🔗 LIBRARY QUICK REFERENCE

## When to use what — decision tree

```
Is it a simple loop that never changes?
  → CSS @keyframes (clouds, gentle float, pulse)

Does it mount/unmount or respond to tap/click?
  → Framer Motion (screen transitions, cards, buttons, reveals)

Is it tied to scroll position?
  → GSAP ScrollTrigger (sky colors, constellation, sunrise)

Is it a particle system (many small moving things)?
  → tsparticles (stars, rain, fireflies)

Is it audio?
  → Howler.js

Is it smooth scrolling?
  → Lenis
```

## Import Cheat Sheet

```jsx
// Framer Motion
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Lenis
import Lenis from '@studio-freight/lenis';

// tsparticles
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';

// Howler
import { Howl } from 'howler';
```

## Easing Values Used in This Project

| Name | Value | Feel | Used for |
|------|-------|------|----------|
| Cinematic ease | `[0.16, 1, 0.3, 1]` | Smooth, luxurious | Screen transitions, text reveals |
| Back out | `back.out(2)` | Slight overshoot/bounce | Star pop-ins, playful moments |
| Power3 out | `power3.out` | Strong deceleration | Text fade-ins on scroll |
| EaseInOut | `easeInOut` | Symmetric | Floating loops, clouds |
| Linear | `none` / `linear` | Constant speed | Cloud drift, rain fall, birds |
| Spring | `type: 'spring', stiffness: 400, damping: 20` | Physical/natural | Button taps |
