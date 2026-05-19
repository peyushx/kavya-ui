import React from 'react';
import { motion } from 'framer-motion';

function SuspectCard({ suspect, theme, index }) {
  const isLight = theme === 'light';
  
  const colors = {
    cardBg: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.7)',
    cardBorder: isLight ? 'rgba(8, 47, 73, 0.1)' : 'rgba(255, 255, 255, 0.05)',
    avatarBg: isLight ? '#e0f2fe' : '#1e293b',
    nameText: isLight ? '#0f172a' : '#f8fafc',
    label: isLight ? '#64748b' : '#94a3b8',
    valueText: isLight ? '#334155' : '#cbd5e1',
    susBg: isLight ? '#fef2f2' : '#450a0a',
    susText: isLight ? '#b91c1c' : '#f87171',
    susBorder: isLight ? '#fca5a5' : '#7f1d1d'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), type: 'spring', bounce: 0.4 }}
      whileHover={{ y: -10, scale: 1.02 }}
      style={{
        width: '300px',
        background: colors.cardBg,
        borderRadius: '24px',
        border: `1px solid ${colors.cardBorder}`,
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isLight 
          ? '0 20px 40px rgba(8, 47, 73, 0.08)' 
          : '0 20px 40px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Avatar */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
        style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: colors.avatarBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '46px',
          marginBottom: '16px',
          boxShadow: isLight ? 'inset 0 4px 10px rgba(255,255,255,0.5)' : 'inset 0 4px 10px rgba(255,255,255,0.05)'
        }}
      >
        {suspect.avatar}
      </motion.div>

      {/* Name */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: colors.nameText,
        margin: '0 0 24px 0',
        letterSpacing: '-0.5px'
      }}>
        {suspect.name}
      </h3>

      {/* Details List */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* About */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, color: colors.label, marginBottom: '4px' }}>
            About
          </div>
          <div style={{ fontSize: '15px', fontWeight: 500, color: colors.valueText }}>
            {suspect.about}
          </div>
        </div>

        {/* Last Seen */}
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, color: colors.label, marginBottom: '4px' }}>
            Last Seen
          </div>
          <div style={{ fontSize: '15px', fontWeight: 500, color: colors.valueText }}>
            {suspect.lastSeen}
          </div>
        </div>

        {/* Sus Detail */}
        <div style={{
          marginTop: '8px',
          background: colors.susBg,
          border: `1px dashed ${colors.susBorder}`,
          padding: '12px 16px',
          borderRadius: '12px',
          position: 'relative'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: '-10px', 
            right: '-10px', 
            background: colors.susText, 
            color: 'white', 
            fontSize: '10px', 
            fontWeight: 'bold', 
            padding: '4px 8px', 
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transform: 'rotate(15deg)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}>
            SUS!
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: colors.susText, lineHeight: '1.5' }}>
            {suspect.susDetail}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function TheDetective({ theme, onNext }) {
  const isLight = theme === 'light';

  const suspects = [
    {
      name: 'Jiya',
      avatar: '💁‍♀️',
      about: 'Living my best life ✨',
      lastSeen: 'Today at 10:14 AM',
      susDetail: 'Usually never online in the morning... was she watching the chat?'
    },
    {
      name: 'Arjun',
      avatar: '📸',
      about: 'Capturing moments 📷',
      lastSeen: 'Yesterday at 11:59 PM',
      susDetail: "He was asking about Jiya's chats yesterday. Coincidence?"
    },
    {
      name: 'Meera',
      avatar: '🤫',
      about: 'Busy. Text only.',
      lastSeen: 'Today at 10:15 AM',
      susDetail: "She's the only one who didn't reply to the group panic..."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: isLight 
        ? 'linear-gradient(to bottom, #e0f2fe 0%, #f0f9ff 100%)' 
        : 'linear-gradient(to bottom, #020617 0%, #0f172a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.8s ease-in-out'
    }}>
      
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '400px',
        height: '400px',
        background: isLight ? '#bae6fd' : '#1e40af',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.3,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '300px',
        height: '300px',
        background: isLight ? '#fecdd3' : '#9f1239',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.2,
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '60px', zIndex: 10 }}
      >
        <span style={{
          fontSize: '13px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: isLight ? '#ef4444' : '#f87171',
          marginBottom: '12px',
          display: 'block'
        }}>
          Act 3
        </span>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 800,
          color: isLight ? '#0f172a' : '#f8fafc',
          margin: 0,
          letterSpacing: '-1px',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Who leaked it? 🕵️‍♀️
        </h1>
        <p style={{
          fontSize: '18px',
          color: isLight ? '#64748b' : '#94a3b8',
          marginTop: '16px',
          fontWeight: 500
        }}>
          Review the suspects. Trust no one.
        </p>
      </motion.div>

      {/* Suspect Cards Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '32px',
        zIndex: 10,
        maxWidth: '1200px'
      }}>
        {suspects.map((suspect, i) => (
          <SuspectCard key={suspect.name} suspect={suspect} theme={theme} index={i} />
        ))}
      </div>

    </div>
  );
}
