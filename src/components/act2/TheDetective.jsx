import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Award, Lock, Sparkles } from 'lucide-react';

function SuspectCard({ suspect, index, onSelect, isSelected, anySelected }) {
  const isMeera = suspect.name.includes('Meera');
  const isArjun = suspect.name.includes('Arjun');
  const glowColor = isMeera 
    ? 'rgba(236, 72, 153, 0.4)' 
    : isArjun 
      ? 'rgba(99, 102, 241, 0.4)' 
      : 'rgba(249, 115, 22, 0.4)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ 
        opacity: anySelected ? (isSelected ? 1 : 0.25) : 1, 
        y: 0,
        scale: isSelected ? 1.05 : 1
      }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      whileHover={!anySelected ? { 
        y: -12, 
        scale: 1.03,
        boxShadow: `0 20px 40px ${glowColor}, 0 0 0 2px ${suspect.color}`
      } : {}}
      onClick={() => {
        if (!anySelected) onSelect(suspect.name);
      }}
      style={{
        width: '320px',
        background: 'rgba(15, 23, 42, 0.55)',
        borderRadius: '24px',
        border: isSelected ? `2px solid ${suspect.color}` : '1px solid rgba(255, 255, 255, 0.08)',
        padding: '36px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: isSelected 
          ? `0 20px 50px ${glowColor}` 
          : '0 15px 35px rgba(0, 0, 0, 0.5)',
        cursor: anySelected ? 'default' : 'pointer',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s, opacity 0.4s'
      }}
    >
      {/* Background card overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(to right, ${suspect.color}, transparent)`
      }} />

      {/* Selected Badge */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -10 }}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: suspect.color,
              color: '#09090b',
              fontWeight: 800,
              fontSize: '11px',
              padding: '6px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
          >
            <Sparkles size={11} />
            <span>ACCUSED</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar with dynamic glow */}
      <motion.div
        whileHover={!anySelected ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          marginBottom: '20px',
          boxShadow: `inset 0 4px 15px rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.4)`
        }}
      >
        {suspect.avatar}
      </motion.div>

      {/* Name */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: '#f8fafc',
        margin: '0 0 24px 0',
        letterSpacing: '-0.5px'
      }}>
        {suspect.name}
      </h3>

      {/* Details List */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* About */}
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
            About
          </div>
          <div style={{ fontSize: '14.5px', fontWeight: 500, color: '#e2e8f0' }}>
            {suspect.about}
          </div>
        </div>

        {/* Last Seen */}
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
            Last Seen
          </div>
          <div style={{ fontSize: '14.5px', fontWeight: 500, color: '#e2e8f0' }}>
            {suspect.lastSeen}
          </div>
        </div>

        {/* Sus Detail */}
        <div style={{
          marginTop: '10px',
          background: 'rgba(239, 68, 68, 0.04)',
          border: '1px dashed rgba(239, 68, 68, 0.2)',
          padding: '14px 16px',
          borderRadius: '16px',
          position: 'relative'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-10px', 
            right: '-10px', 
            background: '#ef4444', 
            color: '#ffffff', 
            fontSize: '9px', 
            fontWeight: 800, 
            padding: '3px 8px', 
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            EVIDENCE FILE
          </div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#fca5a5', lineHeight: '1.5' }}>
            "{suspect.susDetail}"
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function TheDetective({ theme, onNext }) {
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const suspects = [
    {
      name: 'Jiya 🧸',
      avatar: '🧸',
      color: '#f97316',
      about: 'Living my best life ✨',
      lastSeen: 'Today at 10:14 AM',
      susDetail: 'Opened the chat right after it leaked. Claims she came online because someone tip-off texted her.'
    },
    {
      name: 'Arjun 😎',
      avatar: '😎',
      color: '#6366f1',
      about: 'i mind my own business.',
      lastSeen: 'Yesterday at 11:59 PM',
      susDetail: "Muted the group but was awake at 3 AM. Deflects guilt onto 'the one asking all the questions'."
    },
    {
      name: 'Meera 💅',
      avatar: '💅',
      color: '#ec4899',
      about: 'moisturized and unbothered 💅',
      lastSeen: 'Today at 10:15 AM',
      susDetail: "Runs a workspace gossip ring. Mockingly pointed out that investigators are often the real culprits."
    }
  ];

  const handleSelectSuspect = (name) => {
    setSelectedSuspect(name);
    localStorage.setItem('kavvs_final_verdict', name);
    setIsTransitioning(true);

    // Play high-fidelity cinematic exit transition
    setTimeout(() => {
      if (onNext) onNext();
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'radial-gradient(circle at center, #11131a 0%, #07080c 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.8s ease-in-out'
    }}>
      
      {/* Background Grid Pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none'
      }} />

      {/* Dramatic ambient glowing blurs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '450px',
        height: '450px',
        background: 'rgba(239, 68, 68, 0.1)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        opacity: selectedSuspect ? 0.05 : 0.25,
        pointerEvents: 'none',
        transition: 'opacity 1s'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '20%',
        width: '400px',
        height: '400px',
        background: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        opacity: selectedSuspect ? 0.05 : 0.25,
        pointerEvents: 'none',
        transition: 'opacity 1s'
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '50px', zIndex: 10 }}
      >
        <span style={{
          fontSize: '12px',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          fontWeight: 800,
          color: '#ef4444',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <ShieldAlert size={14} />
          THE VERDICT
        </span>
        <h1 style={{
          fontSize: '44px',
          fontWeight: 800,
          color: '#f8fafc',
          margin: '0 0 12px 0',
          letterSpacing: '-1.5px',
          fontFamily: "'Outfit', sans-serif",
          textTransform: 'lowercase'
        }}>
          who leaked jiya's message?
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#94a3b8',
          marginTop: '8px',
          fontWeight: 500,
          letterSpacing: '0.5px'
        }}>
          choose wisely. or don't. won't matter in a second 💀
        </p>
      </motion.div>

      {/* Suspect Cards Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '28px',
        zIndex: 10,
        maxWidth: '1200px',
        marginBottom: '20px'
      }}>
        {suspects.map((suspect, i) => (
          <SuspectCard 
            key={suspect.name} 
            suspect={suspect} 
            index={i} 
            onSelect={handleSelectSuspect}
            isSelected={selectedSuspect === suspect.name}
            anySelected={!!selectedSuspect}
          />
        ))}
      </div>

      {/* Dynamic Flash Screen overlay during lock submission */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#09090b',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255, 255, 255, 0.05)',
                borderTop: '3px solid #ef4444',
                borderRadius: '50%'
              }}
            />
            <span style={{
              color: '#a1a1aa',
              fontSize: '12px',
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              Accusing suspect... submitting file
            </span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
