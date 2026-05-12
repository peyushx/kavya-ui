import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useState } from 'react';

// Default star config
const defaultStarConfig = {
  particles: {
    number: {
      value: typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80,
      density: { enable: true, area: 800 },
    },
    color: { value: '#ffffff' },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: {
        enable: true,
        speed: 0.5,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 0.1,
      direction: 'none',
      random: true,
      outModes: 'bounce',
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'bubble',
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
  background: {
    color: { value: 'transparent' },
  },
  detectRetina: true,
};

export default function ParticleBackground({ config, id = 'tsparticles' }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id={id}
      options={config || defaultStarConfig}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  );
}

// Export configs for different sections
export const starConfig = defaultStarConfig;

export const rainConfig = {
  particles: {
    number: {
      value: typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 150,
    },
    color: { value: '#94a3b8' },
    opacity: { value: { min: 0.2, max: 0.5 } },
    size: {
      value: { min: 1, max: 2 },
    },
    shape: {
      type: 'line',
    },
    move: {
      enable: true,
      speed: 15,
      direction: 'bottom',
      straight: true,
      outModes: {
        bottom: 'out',
        top: 'out',
      },
    },
    rotate: {
      value: 10,
      direction: 'clockwise',
    },
    life: {
      duration: { value: 0 },
    },
  },
  background: {
    color: { value: 'transparent' },
  },
  detectRetina: true,
};
