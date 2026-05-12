import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FlyingBird({ delay = 0, triggerSelector, yOffset = -30 }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: -80, y: 20, opacity: 0 },
        {
          x: window.innerWidth + 80,
          y: yOffset,
          opacity: 1,
          duration: 4,
          delay,
          ease: 'none',
          scrollTrigger: triggerSelector ? {
            trigger: triggerSelector,
            start: 'center center',
            toggleActions: 'play none none none',
          } : undefined,
        }
      );
    });

    return () => ctx.revert();
  }, [delay, triggerSelector, yOffset]);

  return (
    <svg
      ref={pathRef}
      className="bird-svg"
      style={{ position: 'absolute' }}
      width="30"
      height="20"
      viewBox="0 0 30 20"
    >
      <path
        d="M0 10 Q7 0 15 8 Q23 0 30 10"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        style={{ color: '#374151' }}
      />
    </svg>
  );
}
