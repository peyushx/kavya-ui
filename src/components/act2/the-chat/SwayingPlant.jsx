import React from 'react';
import { motion } from 'framer-motion';

const SwayingPlant = ({ d, fill, delay, duration, origin, style }) => (
  <motion.path
    d={d}
    fill={fill}
    style={{ originX: origin?.x || '50%', originY: origin?.y || '100%', ...style }}
    animate={{ rotate: [-2.5, 2.5, -2.5] }}
    transition={{
      duration: duration || 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay || 0
    }}
  />
);

export default SwayingPlant;
