import { useMemo } from 'react';

// Generates random cloud positions for a layer
function generateClouds(count, seed = 0) {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const rand = (n) => ((i * n + seed * 23) % 100) / 100;
    
    // Each cloud is a structured cluster of 5 puffs for a 'bubble' look
    const puffs = [
      { size: 100, x: 0, y: 0 },         // Center
      { size: 70, x: -50, y: 10 },       // Left
      { size: 70, x: 50, y: 10 },        // Right
      { size: 60, x: -30, y: -25 },      // Top Left
      { size: 60, x: 30, y: -25 },       // Top Right
    ];

    clouds.push({
      puffs,
      x: `${(i * 35 + rand(11) * 15) % 150 - 25}%`,
      y: `${10 + rand(17) * 75}%`,
      scale: 0.5 + rand(19) * 1.0,
      opacity: 0.4 + rand(31) * 0.6 // local variance
    });
  }
  return clouds;
}

export default function CloudLayer({ speed = 40, opacity = 0.15, blur = 4, count = 5, seed = 0 }) {
  const clouds = useMemo(() => generateClouds(count, seed), [count, seed]);

  return (
    <div
      className="cloud-layer"
      style={{
        animation: `drift ${speed}s linear infinite`,
        opacity,
      }}
    >
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="cloud-cluster"
          style={{
            position: 'absolute',
            top: cloud.y,
            left: cloud.x,
            transform: `scale(${cloud.scale})`,
            filter: `blur(${blur}px)`,
            opacity: cloud.opacity,
          }}
        >
          {cloud.puffs.map((puff, j) => (
            <div
              key={j}
              className="cloud-puff"
              style={{
                position: 'absolute',
                width: puff.size,
                height: puff.size,
                left: puff.x,
                top: puff.y,
                backgroundColor: 'white',
                borderRadius: '50%',
                // Subtle outline feel without being too 'cartoon'
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.02)',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
