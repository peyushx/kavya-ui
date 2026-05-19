import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import WhatsAppUI from './WhatsAppUI';

function PhoneInterface({
  theme,
  colors,
  isPickedUp,
  isWokenUp,
  setIsWokenUp,
  isUnlocked,
  setIsUnlocked,
  chatProgress,
  messages,
  isTyping,
  chatScript,
  currentTime,
  onNext
}) {
  const isLight = theme === 'light';
  const chatEndRef = useRef(null);
  const isStalkingUnlocked = localStorage.getItem('kavvs_stalking_unlocked') === 'true';
  const [activeApp, setActiveApp] = useState(isStalkingUnlocked ? 'whatsapp' : 'imessage'); // 'imessage' | 'whatsapp'

  // Auto-scroll the messenger viewport
  useEffect(() => {
    if (isUnlocked) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isUnlocked]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '16px',
      overflow: 'hidden',
      background: colors.phoneInnerBg,
      position: 'relative',
      border: colors.phoneInnerBorder
    }}>

      <AnimatePresence mode="wait">
        {/* STATE 1: SCREEN OFF */}
        {!isWokenUp && (
          <motion.div
            key="screen-off"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              if (isPickedUp) setIsWokenUp(true);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: theme === 'light' ? '#bae6fd' : 'black',
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {isPickedUp ? (
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  textAlign: 'center',
                  color: theme === 'light' ? '#0369a1' : 'var(--text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                ⚡ tap screen to wake
              </motion.div>
            ) : (
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: theme === 'light' ? '1.5px solid rgba(2, 132, 199, 0.4)' : '1.5px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'light' ? '#0284c7' : '#38bdf8'
              }}>
                👆
              </div>
            )}
          </motion.div>
        )}

        {/* STATE 2: LOCK SCREEN */}
        {isWokenUp && !isUnlocked && (
          <motion.div
            key="screen-locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: colors.lockBg,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              padding: '50px 20px 30px 20px',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                style={{ 
                  fontSize: '12px', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase', 
                  marginBottom: '8px',
                  color: colors.lockTitle,
                  fontWeight: 600 
                }}
              >
                locked 🔒
              </motion.span>
              <h2 style={{ fontSize: '42px', fontWeight: 300, color: colors.lockTime, margin: 0, fontVariantNumeric: 'tabular-nums' }}>
                {currentTime.split(' ')[0]}
              </h2>
              <span style={{ fontSize: '13px', opacity: 0.6, marginTop: '4px', color: colors.lockTime }}>
                Monday, May 18
              </span>
            </div>

            {/* Notifications Stack */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring' }}
                style={{
                  background: colors.notifBg,
                  borderRadius: '16px',
                  padding: '14px',
                  border: colors.notifBorder,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: theme === 'light' && !isUnlocked ? '0 10px 25px rgba(8, 47, 73, 0.05)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #a7f3d0, #34d399)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px'
                    }}>
                      💬
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: colors.notifTitle }}>Pishu ✨</span>
                  </div>
                  <span style={{ fontSize: '11px', opacity: 0.4, color: colors.notifTitle }}>now</span>
                </div>
                <p style={{ fontSize: '13px', margin: 0, opacity: 0.85, lineHeight: 1.4, color: colors.notifText, fontWeight: 500 }}>
                  1 new message
                </p>
              </motion.div>
            </div>

            {/* Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
              <div style={{
                width: '260px',
                height: '54px',
                borderRadius: '27px',
                background: colors.sliderBg,
                border: colors.sliderBorder,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}>
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 195 }}
                  dragElastic={0.05}
                  onDrag={(event, info) => {
                    if (info.point.x > 380 || info.offset.x >= 190) {
                      setIsUnlocked(true);
                    }
                  }}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '23px',
                    background: colors.sliderKnob,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'grab',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 2
                  }}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                >
                  <ChevronRight size={20} color={colors.sliderKnobIcon} />
                </motion.div>
                
                <motion.span
                  animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: colors.sliderHint,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  slide to unlock
                </motion.span>
              </div>

              {/* Status footer icons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', fontSize: '18px', opacity: 0.6, color: colors.lockTitle }}>
                <span>🔦</span>
                <span>📷</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATE 3: UNLOCKED CHAT THREAD (iMessage) */}
        {isUnlocked && activeApp === 'imessage' && (
          <motion.div
            key="chat-thread"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: colors.chatBg,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            {/* Chat header */}
            <div style={{
              padding: '36px 16px 14px 16px',
              background: colors.chatHeaderBg,
              backdropFilter: 'blur(10px)',
              borderBottom: colors.chatHeaderBorder,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 20
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: 'white',
                fontSize: '13px'
              }}>
                P
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: colors.chatTitle }}>Pishu ✨</h4>
                <span style={{ fontSize: '11px', color: colors.chatOnline, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.chatOnline }} />
                  online
                </span>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: colors.chatBodyBg,
              paddingBottom: '30px'
            }}>
              {messages.map((msg, index) => {
                const isSelf = msg.sender === 'player';
                const isSys = msg.sender === 'system';
                
                if (isSys) {
                  return (
                    <motion.div
                      key={`sys-${index}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{
                        alignSelf: 'center',
                        background: colors.chatSystemBg,
                        border: colors.chatSystemBorder,
                        borderRadius: '10px',
                        padding: '6px 14px',
                        color: colors.chatSystemText,
                        fontSize: '11px',
                        textAlign: 'center',
                        margin: '12px 0',
                        fontWeight: 600
                      }}
                    >
                      🎉 {msg.text}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    style={{
                      alignSelf: isSelf ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      background: isSelf ? colors.bubbleSelfBg : colors.bubbleOtherBg,
                      border: isSelf ? 'none' : colors.bubbleOtherBorder,
                      color: isSelf ? 'white' : colors.bubbleOtherText,
                      borderRadius: isSelf ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      padding: '10px 14px',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      boxShadow: theme === 'light' && !isSelf ? '0 2px 6px rgba(8,47,73,0.04)' : '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {msg.text}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    alignSelf: 'flex-start',
                    background: colors.bubbleTypingBg,
                    border: colors.bubbleTypingBorder,
                    borderRadius: '16px 16px 16px 2px',
                    padding: '12px 16px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}
                >
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.bubbleTypingDot, opacity: 0.4 }} />
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.bubbleTypingDot, opacity: 0.6 }} />
                  <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: colors.bubbleTypingDot, opacity: 0.8 }} />
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Footer with Direct Open WhatsApp transition */}
            <div style={{
              padding: '12px 16px 24px 16px',
              background: colors.footerBg,
              backdropFilter: 'blur(10px)',
              borderTop: colors.footerBorder,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 20
            }}>
              <AnimatePresence mode="wait">
                {chatProgress >= chatScript.length && (
                  <motion.button
                    key="btn-whatsapp"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                    whileHover={{ scale: 1.04, background: '#25D366' }} // Sleek WhatsApp Green
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveApp('whatsapp')}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#128C7E', // Dark WhatsApp Green
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: "'Outfit', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.3s'
                    }}
                  >
                    Open WhatsApp 💬
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STATE 4: WHATSAPP INTERFACE */}
        {isUnlocked && activeApp === 'whatsapp' && (
          <motion.div
            key="app-whatsapp"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, type: 'spring' }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <WhatsAppUI theme={theme} onNext={onNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PhoneInterface;
