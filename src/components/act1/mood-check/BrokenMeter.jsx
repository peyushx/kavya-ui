import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrokenMeter({
  isBroken,
  showGloveWarning,
  glovesDropped,
  hasGloves,
  shards,
  totalPieces,
  draggingNearBin,
  theme,
  handleGlovesPickup,
  handleShardDragEnd,
  handleDrag,
  handleShardFirstTouch,
  binRef
}) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [showGlovesInner, setShowGlovesInner] = useState(false);

  useEffect(() => {
    if (!showGloveWarning || hasGloves) {
      setLine1("");
      setLine2("");
      setLine3("");
      setShowGlovesInner(false);
      return;
    }

    let isMounted = true;

    const runSequence = async () => {
      const l1 = "wait wait wait 🥺";
      const l2 = "those are sharp love,\nput these on first okay? 💛";
      const l3 = "can't have jiya's baddie getting hurt";

      // Line 1
      for (let i = 0; i <= l1.length; i++) {
        if (!isMounted) return;
        setLine1(l1.slice(0, i));
        await new Promise(r => setTimeout(r, 50));
      }
      await new Promise(r => setTimeout(r, 600));

      // Line 2
      for (let i = 0; i <= l2.length; i++) {
        if (!isMounted) return;
        setLine2(l2.slice(0, i));
        await new Promise(r => setTimeout(r, 40));
      }
      await new Promise(r => setTimeout(r, 800));

      // Line 3
      for (let i = 0; i <= l3.length; i++) {
        if (!isMounted) return;
        setLine3(l3.slice(0, i));
        await new Promise(r => setTimeout(r, 30));
      }
      
      if (isMounted) setShowGlovesInner(true);
    };

    runSequence();
    return () => { isMounted = false; };
  }, [showGloveWarning, hasGloves]);
  return (
    <>
      {/* GLOVE WARNING OVERLAY */}
      <AnimatePresence>
        {showGloveWarning && !hasGloves && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              background: 'radial-gradient(circle at center, rgba(251,191,36,0.12) 0%, rgba(0,0,0,0.4) 100%)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', maxWidth: '340px', padding: '0 20px' }}
            >
              <p className="line-personal" style={{
                fontSize: '32px',
                color: 'var(--text-primary)',
                margin: '0 0 8px 0',
                lineHeight: 1.3,
                minHeight: '42px'
              }}>
                {line1}
              </p>
              <p className="line-personal" style={{
                fontSize: '22px',
                color: 'var(--accent-warm)',
                margin: '0 0 4px 0',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
                minHeight: '62px'
              }}>
                {line2}
              </p>
              <p className="line-personal" style={{
                fontSize: '15px',
                color: 'var(--text-muted)',
                margin: 0,
                fontStyle: 'italic',
                minHeight: '20px'
              }}>
                {line3}
              </p>
            </motion.div>

            {glovesDropped && showGlovesInner && (
              <motion.div
                initial={{ y: -80, opacity: 0, scale: 0.3 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
                onClick={handleGlovesPickup}
                style={{
                  cursor: 'pointer',
                  marginTop: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
                  border: '2px solid rgba(251,191,36,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(251,191,36,0.1)',
                }}>
                  <span style={{ fontSize: '48px' }}>🧤</span>
                </div>
                <span className="line-personal" style={{ fontSize: '14px', color: 'rgba(251,191,36,0.6)' }}>
                  tap to wear
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collection Bin */}
      <AnimatePresence>
        {hasGloves && totalPieces > 0 && (
          <motion.div
            ref={binRef}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: draggingNearBin ? 1.15 : 1,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 55,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{
                borderColor: draggingNearBin ? 'rgba(251,191,36,0.7)' : 'rgba(251,191,36,0.3)',
                background: draggingNearBin ? 'rgba(251,191,36,0.12)' : 'rgba(251,191,36,0.03)',
                boxShadow: draggingNearBin
                  ? '0 0 40px rgba(251,191,36,0.3), inset 0 0 20px rgba(251,191,36,0.1)'
                  : '0 0 0px transparent',
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '2px dashed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.span
                animate={{ scale: draggingNearBin ? 1.2 : 1 }}
                style={{ fontSize: '52px' }}
              >
                🗑️
              </motion.span>
            </motion.div>
            <span className="line-personal" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)' }}>
              {totalPieces} left
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass Shards Overlay */}
      <AnimatePresence>
        {shards.length > 0 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
            {shards.map((shard, idx) => (
              <motion.div
                key={shard.id}
                drag={hasGloves}
                dragSnapToOrigin={!hasGloves}
                onDragEnd={hasGloves ? (e, info) => handleShardDragEnd(shard.id, info) : undefined}
                onDrag={hasGloves ? handleDrag : undefined}
                onPointerDown={!hasGloves ? handleShardFirstTouch : undefined}
                initial={{ opacity: 0, scale: 0, rotate: shard.rotate }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: shard.rotate,
                }}
                exit={{ opacity: 0, scale: 0, y: 40 }}
                transition={{ delay: idx * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
                whileDrag={hasGloves ? { scale: 1.1, opacity: 0.7, cursor: 'grabbing' } : undefined}
                style={{
                  position: 'absolute',
                  left: shard.left,
                  top: shard.top,
                  width: `${shard.size}px`,
                  height: `${shard.size}px`,
                  background: theme === 'light' 
                    ? 'linear-gradient(135deg, rgba(125, 211, 252, 0.2) 0%, rgba(255,255,255,0.4) 50%, rgba(125, 211, 252, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: theme === 'light'
                    ? '1px solid rgba(8, 47, 73, 0.2)'
                    : '1px solid rgba(255,255,255,0.25)',
                  borderTopColor: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
                  borderLeftColor: theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
                  boxShadow: theme === 'light'
                    ? '0 4px 20px rgba(8, 47, 73, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                    : '0 2px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
                  clipPath: shard.clip,
                  cursor: hasGloves ? 'grab' : 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'none'
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
