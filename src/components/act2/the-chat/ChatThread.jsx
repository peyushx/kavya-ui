import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Video, Search, Smile, Paperclip, Lock, Send, Mic, 
  Camera, Image, FileText, MapPin, User, X, Info, AlertTriangle, PhoneCall, MessageCircle, Ban 
} from 'lucide-react';

export default function ChatThread({
  messages,
  isLight,
  colors,
  handleShowSyncError,
  isStalkingUnlocked,
  narratorTyping,
  endRef,
  handleTypeSendSubmit,
  isShakingInput,
  inputLockedState,
  showTypingToast,
  inputText,
  setInputText,
  setView,
  view,
  setIsVideoCallActive,
  typingToast,
  onSelectMember,
  exploredSuspects = [],
  completedDms = [],
  onStartSuspectDm,
  activeChatId = 'besties',
  verdictOptions,
  onVerdictSelect,
  showReplay,
  onReplay
}) {
  const [attachmentTapCount, setAttachmentTapCount] = useState(() => {
    return Number(localStorage.getItem('kavvs_attachment_tap_count') || '0');
  });
  const [activeAttachmentMenu, setActiveAttachmentMenu] = useState(false);
  const [activeAttachmentView, setActiveAttachmentView] = useState(null); // 'camera', 'gallery', 'document', 'location', 'contact'
  const [isWigglingPaperclip, setIsWigglingPaperclip] = useState(false);

  const [documentSearchStage, setDocumentSearchStage] = useState('loading'); // 'loading', 'found'
  const [gallerySelectedPhoto, setGallerySelectedPhoto] = useState(null); // null or photo details

  const handlePaperclipClick = () => {
    if (attachmentTapCount === 0) {
      setActiveAttachmentMenu(!activeAttachmentMenu);
    } else {
      setIsWigglingPaperclip(true);
      setTimeout(() => setIsWigglingPaperclip(false), 500);
      showTypingToast("attachments are closed during active investigations. this is a crime scene not a group project 📎🚫");
    }
  };

  const handleSelectAttachmentOption = (option) => {
    setActiveAttachmentMenu(false);
    
    // Increment count and save
    const nextCount = attachmentTapCount + 1;
    setAttachmentTapCount(nextCount);
    localStorage.setItem('kavvs_attachment_tap_count', nextCount.toString());

    setActiveAttachmentView(option);

    if (option === 'camera') {
      setTimeout(() => {
        setActiveAttachmentView(null);
        showTypingToast("that's the suspect btw. right there. in the camera 📸🐍");
      }, 1800);
    } else if (option === 'document') {
      setDocumentSearchStage('loading');
      setTimeout(() => {
        setDocumentSearchStage('found');
      }, 2000);
    } else if (option === 'location') {
      setTimeout(() => {
        setActiveAttachmentView(null);
      }, 2800);
    }
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* WhatsApp Header */}
      <div 
        style={{
          padding: '12px 16px',
          background: isLight ? '#f0f2f5' : '#202c33',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35'
        }}
      >
        <div 
          onClick={() => {
            if (activeChatId !== 'pishu') {
              setView(view === 'info' ? 'chat' : 'info');
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: activeChatId === 'pishu' ? 'default' : 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: activeChatId === 'pishu' ? 'rgba(239, 68, 68, 0.1)' : '#64748b',
            border: activeChatId === 'pishu' ? '1px solid rgba(239, 68, 68, 0.3)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: activeChatId === 'pishu' ? '18px' : 'inherit',
            color: activeChatId === 'pishu' ? '#ef4444' : '#ffffff'
          }}>
            {activeChatId === 'pishu' ? '🕵️‍♂️' : <Users size={20} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>
              {activeChatId === 'pishu' ? 'Pishu ✨' : 'besties only 💀🫶'}
            </h4>
            <span style={{ fontSize: '11px', color: colors.dateText }}>
              {activeChatId === 'pishu' ? 'online · secure narrator line' : 'Jiya 🧸, Arjun 😎, Meera 💅, You 🫵'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', color: isLight ? '#54656f' : '#aebac1', alignItems: 'center' }}>
          {activeChatId !== 'pishu' && (
            <Video 
              size={20} 
              style={{ cursor: 'pointer' }} 
              onClick={() => setIsVideoCallActive(true)}
            />
          )}
          <Search 
            size={20} 
            style={{ cursor: 'pointer' }} 
            onClick={() => {
              if (activeChatId !== 'pishu') {
                setView(view === 'info' ? 'chat' : 'info');
              }
            }}
          />
        </div>
      </div>

      {/* Wallpaper Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isLight ? 0.05 : 0.03,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 10px 10px, #000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

      {/* Chat Body */}
      <div 
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          position: 'relative',
          zIndex: 15
        }}
      >
        {/* Click here to get older messages banner */}
        {activeChatId !== 'pishu' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleShowSyncError}
            style={{
              alignSelf: 'center',
              background: isLight ? 'rgba(0, 0, 0, 0.05)' : '#202c33',
              border: isLight ? '1px solid rgba(0,0,0,0.03)' : '1px solid rgba(255,255,255,0.03)',
              padding: '8px 24px',
              borderRadius: '8px',
              fontSize: '12px',
              color: isLight ? '#54656f' : '#8696a0',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              fontFamily: "'Outfit', sans-serif",
              marginBottom: '6px',
              marginTop: '4px',
              maxWidth: '95%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.08)' : '#2a3942';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.05)' : '#202c33';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Click here to get older messages from your phone.
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: isStalkingUnlocked ? 0 : 0.3 }}
          style={{
            alignSelf: 'center',
            background: colors.dateBg,
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '11px',
            color: colors.dateText,
            marginBottom: '10px',
            boxShadow: '0 1px 1px rgba(0,0,0,0.05)'
          }}
        >
          TODAY
        </motion.div>

        {messages.map((msg) => {
          if (msg.type === 'call_log') {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  alignSelf: 'center',
                  background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: isLight ? '#54656f' : '#8696a0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '8px 0',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.02)',
                  fontFamily: "'Outfit', sans-serif"
                }}
              >
                <Video size={14} color="#00a884" />
                <span>Group video call ended ({msg.duration}s)</span>
              </motion.div>
            );
          }

          if (msg.type === 'image_leak') {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  background: colors.bubbleIncoming,
                  borderRadius: '0 8px 8px 8px',
                  padding: '4px',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
              >
                <div 
                  onClick={() => onSelectMember && onSelectMember(msg.sender)}
                  style={{ fontSize: '11px', fontWeight: 'bold', color: msg.senderColor, padding: '4px 6px', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {msg.sender}
                </div>
                <div style={{
                  width: '180px',
                  height: '240px',
                  background: isLight ? '#e2e8f0' : '#0f172a',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid #1e293b',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                   <div style={{ position: 'absolute', top: '20px', left: '15px', width: '60%', height: '10px', background: isLight ? '#cbd5e1' : '#334155', borderRadius: '4px', filter: 'blur(1px)' }} />
                   <div style={{ position: 'absolute', top: '40px', left: '15px', width: '80%', height: '30px', background: isLight ? '#94a3b8' : '#475569', borderRadius: '8px', filter: 'blur(2px)' }} />
                   <div style={{ position: 'absolute', top: '90px', right: '15px', width: '70%', height: '25px', background: isLight ? '#60a5fa' : '#2563eb', borderRadius: '8px', filter: 'blur(2px)' }} />
                   <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: isLight ? '#ef4444' : '#f87171', fontSize: '20px', fontWeight: 'bold', border: '3px solid', padding: '4px 12px', borderRadius: '6px', transform: 'translateX(-50%) rotate(-15deg)' }}>
                      LEAKED
                   </div>
                </div>
                <div style={{ padding: '6px 8px', fontSize: '13px', color: colors.bubbleIncomingText }}>
                  {msg.text}
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', color: colors.dateText, padding: '0 8px 4px 0' }}>
                  {msg.time}
                </div>
              </motion.div>
            );
          }

          if (msg.deleted) {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  alignSelf: msg.isIncoming ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  background: msg.isIncoming 
                    ? (isLight ? '#f0f2f5' : '#202c33') 
                    : (isLight ? '#dcf8c6' : '#005c4b'),
                  borderRadius: msg.isIncoming ? '0 8px 8px 8px' : '8px 0 8px 8px',
                  padding: '6px 12px 6px 10px',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: 0.8
                }}
              >
                <Ban size={14} style={{ color: isLight ? '#8696a0' : '#8696a0' }} />
                <span style={{ 
                  fontSize: '13.5px', 
                  fontStyle: 'italic', 
                  color: isLight ? '#667781' : '#8696a0',
                  userSelect: 'none'
                }}>
                  This message was deleted by admin
                </span>
                <span style={{ fontSize: '9px', color: colors.dateText, marginLeft: '8px', alignSelf: 'flex-end', paddingTop: '4px' }}>
                  {msg.time}
                </span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.isIncoming ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                alignSelf: msg.isIncoming ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
                background: msg.isIncoming ? colors.bubbleIncoming : colors.bubbleOutgoing,
                borderRadius: msg.isIncoming ? '0 8px 8px 8px' : '8px 0 8px 8px',
                padding: '6px 8px 2px 8px',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                marginTop: '4px'
              }}
            >
              {msg.isIncoming && (
                <div 
                  onClick={() => onSelectMember && onSelectMember(msg.sender)}
                  style={{ fontSize: '11px', fontWeight: 'bold', color: msg.senderColor, paddingBottom: '2px', cursor: 'pointer' }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  {msg.sender}
                </div>
              )}
              <div style={{ fontSize: '13px', color: msg.isIncoming ? colors.bubbleIncomingText : colors.bubbleOutgoingText }}>
                {msg.text}
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px', color: colors.dateText, paddingTop: '2px' }}>
                {msg.time}
              </div>
            </motion.div>
          );
        })}

        {narratorTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              alignSelf: 'flex-start',
              background: colors.bubbleIncoming,
              borderRadius: '0 8px 8px 8px',
              padding: '8px 12px',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px'
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00a884', marginRight: '6px' }}>
              Narrator 🕵️‍♂️
            </span>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#8696a0', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate' }} />
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#8696a0', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate 0.2s' }} />
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#8696a0', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate 0.4s' }} />
          </motion.div>
        )}

        <div ref={endRef} style={{ height: '20px' }} />
      </div>

      {/* 📎 Attachment Menu Popover Overlay */}
      <AnimatePresence>
        {activeAttachmentMenu && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '62px',
              left: '12px',
              width: '260px',
              background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(35, 45, 54, 0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              padding: '12px',
              zIndex: 100,
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Option 1: Camera */}
              <div 
                onClick={() => handleSelectAttachmentOption('camera')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: isLight ? '#111b21' : '#e9edef'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#2b3942'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ff8f00', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: 'white' }}>
                  <Camera size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Evidence</span>
                  <span style={{ fontSize: '10.5px', color: colors.dateText }}>(u don't have any)</span>
                </div>
              </div>

              {/* Option 2: Gallery */}
              <div 
                onClick={() => handleSelectAttachmentOption('gallery')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: isLight ? '#111b21' : '#e9edef'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#2b3942'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: 'white' }}>
                  <Image size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Memes</span>
                  <span style={{ fontSize: '10.5px', color: colors.dateText }}>(not helpful rn)</span>
                </div>
              </div>

              {/* Option 3: Document */}
              <div 
                onClick={() => handleSelectAttachmentOption('document')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: isLight ? '#111b21' : '#e9edef'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#2b3942'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#007bec', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: 'white' }}>
                  <FileText size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>Your Apology</span>
                  <span style={{ fontSize: '10.5px', color: colors.dateText }}>(draft it later)</span>
                </div>
              </div>

              {/* Option 4: Location */}
              <div 
                onClick={() => handleSelectAttachmentOption('location')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: isLight ? '#111b21' : '#e9edef'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#2b3942'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7f3dff', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: 'white' }}>
                  <MapPin size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>You're Lost</span>
                  <span style={{ fontSize: '10.5px', color: colors.dateText }}>(emotionally)</span>
                </div>
              </div>

              {/* Option 5: Contact */}
              <div 
                onClick={() => handleSelectAttachmentOption('contact')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: isLight ? '#111b21' : '#e9edef'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#2b3942'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00e676', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: 'white' }}>
                  <User size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>A Therapist</span>
                  <span style={{ fontSize: '10.5px', color: colors.dateText }}>(you'll need one)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📺 Screen Overlay: CAMERA VIEW (Suspect Selfie Black Reflection) */}
      <AnimatePresence>
        {activeAttachmentView === 'camera' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 150,
              background: '#090d10',
              fontFamily: "'Outfit', sans-serif",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px 20px',
              boxSizing: 'border-box',
              color: 'white',
              overflow: 'hidden'
            }}
          >
            {/* Top camera stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '20px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'bounceTyping 0.6s infinite alternate' }} />
                <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }}>REC</span>
              </div>
              <span style={{ fontSize: '12px', opacity: 0.6, background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '20px' }}>BATTERY: 12% ⚠️</span>
            </div>

            {/* Mirror / Glass reflective center viewport */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Glass Glare Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.02) 100%)',
                pointerEvents: 'none',
                zIndex: 5
              }} />

              {/* Holographic corner guides */}
              <div style={{ position: 'absolute', top: '10%', left: '10%', width: '20px', height: '20px', borderTop: '2px solid rgba(255,255,255,0.4)', borderLeft: '2px solid rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', top: '10%', right: '10%', width: '20px', height: '20px', borderTop: '2px solid rgba(255,255,255,0.4)', borderRight: '2px solid rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '20px', height: '20px', borderBottom: '2px solid rgba(255,255,255,0.4)', borderLeft: '2px solid rgba(255,255,255,0.4)' }} />
              <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '20px', height: '20px', borderBottom: '2px solid rgba(255,255,255,0.4)', borderRight: '2px solid rgba(255,255,255,0.4)' }} />

              {/* Stylized dark outline of user silhouette */}
              <motion.div 
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: '2.5px dashed rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  backdropFilter: 'blur(3px)',
                  color: 'rgba(255,255,255,0.3)',
                  gap: '8px'
                }}
              >
                <Users size={48} opacity={0.3} />
                <span style={{ fontSize: '9px', fontWeight: 'bold', letterSpacing: '2px', color: '#ff8f00' }}>FACE RECOGNITION</span>
              </motion.div>
              
              <h3 style={{ margin: '20px 0 6px 0', fontSize: '15px', color: '#f87171', fontWeight: 600, letterSpacing: '0.5px' }}>
                SUSPECT IDENTIFIED 📸🐍
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                evidence (u don't have any)
              </p>
            </div>

            {/* Bottom viewfinder footer */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', zIndex: 10 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid white', background: 'transparent', cursor: 'pointer', padding: '3px', boxSizing: 'border-box' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'white' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖼️ Screen Overlay: GALLERY VIEW (3 Photos) */}
      <AnimatePresence>
        {activeAttachmentView === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 150,
              background: '#0c1317',
              fontFamily: "'Outfit', sans-serif",
              color: 'white',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              background: '#202c33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #2d383f'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>evidence gallery 🖼️</h3>
              <div 
                onClick={() => setActiveAttachmentView(null)}
                style={{ cursor: 'pointer', opacity: 0.8 }}
              >
                <X size={20} />
              </div>
            </div>

            {/* Gallery Content */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: '#8696a0', fontWeight: 500 }}>3 items found in Target backup</span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Photo 1: Blurry chat screenshot */}
                <div 
                  onClick={() => showTypingToast("wait... who screenshotted this? who has access to this chat?")}
                  style={{
                    background: '#1f2c34',
                    borderRadius: '12px',
                    padding: '8px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '140px',
                    background: '#111b21',
                    borderRadius: '8px',
                    filter: 'blur(6px)',
                    opacity: 0.6,
                    border: '1px dashed rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px'
                  }}>
                    👥
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '8px', color: '#e9edef' }}>blurry_screenshot.png</div>
                  <span style={{ fontSize: '10px', color: '#8696a0' }}>Today, 10:14 AM</span>
                </div>

                {/* Photo 2: Meme Monkey */}
                <div 
                  onClick={() => showTypingToast("this meme represents someone in this chat... highly suspicious.")}
                  style={{
                    background: '#1f2c34',
                    borderRadius: '12px',
                    padding: '8px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '140px',
                    background: '#151e24',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#ef4444', marginBottom: '6px' }}>me pretending i didn't do it</span>
                    <span style={{ fontSize: '32px' }}>🐒</span>
                    <span style={{ fontSize: '9px', opacity: 0.5, marginTop: '6px' }}>*looks away sideways*</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '8px', color: '#e9edef' }}>suspect_vibe.jpg</div>
                  <span style={{ fontSize: '10px', color: '#8696a0' }}>Yesterday</span>
                </div>

                {/* Photo 3: Deleted photo */}
                <div 
                  onClick={() => showTypingToast("hm. wonder who deleted that. couldn't be you right? 🤔")}
                  style={{
                    background: '#1f2c34',
                    borderRadius: '12px',
                    padding: '8px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    gridColumn: 'span 2'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '120px',
                    background: 'rgba(239, 68, 68, 0.04)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#ef4444',
                    border: '1.5px dashed rgba(239,68,68,0.2)'
                  }}>
                    <AlertTriangle size={24} />
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>this photo has been deleted.</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '8px', color: '#e9edef' }}>IMG_0411_DELETED.jpg</div>
                  <span style={{ fontSize: '10px', color: '#8696a0' }}>Today, 10:16 AM</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📄 Screen Overlay: DOCUMENT VIEW (Loading & the_truth.pdf) */}
      <AnimatePresence>
        {activeAttachmentView === 'document' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 150,
              background: '#0c1317',
              fontFamily: "'Outfit', sans-serif",
              color: 'white',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              background: '#202c33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #2d383f'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Documents 📄</h3>
              <div 
                onClick={() => setActiveAttachmentView(null)}
                style={{ cursor: 'pointer', opacity: 0.8 }}
              >
                <X size={20} />
              </div>
            </div>

            {/* Document Content */}
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {documentSearchStage === 'loading' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(0, 168, 132, 0.15)',
                    borderTop: '3px solid #00a884',
                    borderRadius: '50%',
                    animation: 'spinFan 1s infinite linear'
                  }} />
                  <span style={{ fontSize: '13.5px', color: '#8696a0', fontWeight: 500 }}>Searching for documents...</span>
                  <div style={{ width: '80%', maxWidth: '240px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ position: 'relative', width: '50%', height: '100%', background: '#00a884' }} 
                    />
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <span style={{ fontSize: '12px', color: '#8696a0', alignSelf: 'flex-start' }}>1 file matching encryption key</span>
                  
                  <div 
                    onClick={() => showTypingToast("this file will be available after the investigation. patience bestie 🙂")}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      background: '#1f2c34',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      border: '1.5px dashed #007bec',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(0,123,236,0.15)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', color: '#007bec', flexShrink: 0 }}>
                      <FileText size={20} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#e9edef', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>the_truth.pdf</span>
                      <span style={{ fontSize: '11px', color: '#8696a0', marginTop: '2px' }}>Size: too heavy for you to handle</span>
                      <span style={{ fontSize: '10px', color: '#8696a0', marginTop: '2px' }}>Date: Today</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📍 Screen Overlay: MAP LOCATION VIEW (Denial You Are Here) */}
      <AnimatePresence>
        {activeAttachmentView === 'location' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 150,
              background: '#090d10',
              fontFamily: "'Outfit', sans-serif",
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            {/* Map styling grid container */}
            <div style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              pointerEvents: 'none'
            }} />

            {/* Glowing Radar Waves */}
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(127,61,255,0.3)' }}
              />
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
                style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(127,61,255,0.3)' }}
              />

              {/* Pin */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#7f3dff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(127,61,255,0.6)', border: '2px solid white' }}>
                  <MapPin size={22} color="white" />
                </div>
                <div style={{ background: '#7f3dff', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
                  Denial
                </div>
              </motion.div>
            </div>

            <span style={{ fontSize: '13px', color: '#8696a0', marginTop: '10px', zIndex: 10 }}>You are here</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👤 Screen Overlay: CONTACT CARD VIEW (Your Conscience) */}
      <AnimatePresence>
        {activeAttachmentView === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 150,
              background: '#0c1317',
              fontFamily: "'Outfit', sans-serif",
              color: 'white',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              background: '#202c33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #2d383f'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Suggested Contact 👤</h3>
              <div 
                onClick={() => setActiveAttachmentView(null)}
                style={{ cursor: 'pointer', opacity: 0.8 }}
              >
                <X size={20} />
              </div>
            </div>

            {/* Contact Body */}
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                background: '#1f2c34',
                borderRadius: '16px',
                padding: '28px 24px',
                width: '100%',
                maxWidth: '300px',
                boxSizing: 'border-box',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(0, 230, 118, 0.15)',
                  color: '#00e676',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '16px',
                  border: '2px solid #00e676'
                }}>
                  👤
                </div>

                <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 600, color: '#e9edef' }}>Your Conscience</h3>
                <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 500, background: 'rgba(239,68,68,0.1)', padding: '2px 10px', borderRadius: '10px' }}>Last contacted: never</span>

                <p style={{ margin: '16px 0 24px 0', fontSize: '12.5px', color: '#8696a0', lineHeight: '1.5' }}>
                  "Highly recommended for active investigation processes. May help with feelings of mystery or unconfessed leaks."
                </p>

                {/* Call & Message Action suggestions */}
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <button 
                    onClick={() => showTypingToast("maybe give them a call sometime 💀")}
                    style={{
                      flex: 1,
                      background: '#00a884',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <PhoneCall size={14} />
                    Call
                  </button>
                  <button 
                    onClick={() => showTypingToast("maybe give them a call sometime 💀")}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.06)',
                      color: '#00a884',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '10px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <MessageCircle size={14} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      {verdictOptions ? (
        <div style={{
          padding: '16px 20px',
          background: isLight ? '#f0f2f5' : '#202c33',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 20,
          borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
          fontFamily: "'Outfit', sans-serif"
        }}>
          <span style={{ fontSize: '11px', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            SELECT WHO LEAKED IT 💬
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {verdictOptions.map((opt) => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.01, backgroundColor: isLight ? '#ffffff' : '#2a3942' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onVerdictSelect && onVerdictSelect(opt)}
                style={{
                  width: '100%',
                  background: isLight ? '#ffffff' : '#1f2c34',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid #2d383f',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  textAlign: 'left',
                  color: isLight ? '#111b21' : '#e9edef',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: opt.includes('Jiya') ? '#eb5528' : opt.includes('Arjun') ? '#64748b' : '#ec4899', flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{opt}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ) : showReplay ? (
        <div style={{
          padding: '16px 20px',
          background: isLight ? '#f0f2f5' : '#202c33',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 20,
          borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
          fontFamily: "'Outfit', sans-serif",
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>wrong answer! want to try again? 💀</span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onReplay && onReplay()}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #00a884 0%, #25d366 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,168,132,0.3)'
            }}
          >
            🔄 Replay Investigation
          </motion.button>
        </div>
      ) : activeChatId === 'pishu' ? (
        <div 
          style={{
            padding: '16px 20px',
            background: isLight ? '#f0f2f5' : '#202c33',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            zIndex: 20,
            borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
            color: colors.dateText,
            fontStyle: 'italic',
            fontSize: '12.5px',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          <Lock size={13} />
          <span>🔒 secure narrator line · read only</span>
        </div>
      ) : exploredSuspects.length === 3 && completedDms.length < 3 ? (
        <div 
          style={{
            padding: '16px 20px',
            background: isLight ? '#f0f2f5' : '#202c33',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
            borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          <span style={{ fontSize: '11px', color: colors.dateText, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            💬 suspects ready for private interrogation DMs:
          </span>
          
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', width: '100%', padding: '4px 0' }}>
            {['Jiya 🧸', 'Arjun 😎', 'Meera 💅'].map((suspect) => {
              const isDone = completedDms.includes(suspect);
              const cleanName = suspect.split(' ')[0];
              const avatar = suspect.split(' ')[1];
              const borderCol = suspect.includes('Jiya') ? '#eb5528' : suspect.includes('Arjun') ? '#64748b' : '#ec4899';
              
              return (
                <motion.div
                  key={suspect}
                  whileHover={{ scale: isDone ? 1 : 1.08 }}
                  whileTap={{ scale: isDone ? 1 : 0.95 }}
                  onClick={() => !isDone && onStartSuspectDm && onStartSuspectDm(suspect)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: isDone ? 'default' : 'pointer',
                    position: 'relative',
                    opacity: isDone ? 0.45 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: isLight ? '#ffffff' : '#2a3942',
                    border: `2.5px solid ${borderCol}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                    position: 'relative'
                  }}>
                    {avatar}
                    {isDone && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#00a884',
                        color: 'white',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        border: '1.5px solid white'
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, marginTop: '6px', color: isLight ? '#111b21' : '#e9edef' }}>
                    {cleanName}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <form 
          onSubmit={handleTypeSendSubmit}
          style={{
            padding: '8px 16px',
            background: isLight ? '#f0f2f5' : '#202c33',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
            animation: isShakingInput ? 'shakeInputBar 0.5s ease-in-out' : 'none',
            borderTop: isLight ? '1px solid #e9edef' : '1px solid #222e35'
          }}
        >
          <Smile size={22} color={isLight ? '#54656f' : '#8696a0'} style={{ cursor: 'pointer' }} />
          <motion.div
            onClick={handlePaperclipClick}
            animate={isWigglingPaperclip ? { rotate: [0, -25, 25, -25, 25, 0] } : {}}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Paperclip size={22} color={isLight ? '#54656f' : '#8696a0'} />
          </motion.div>
          <div 
            onClick={() => {
              if (inputLockedState === 'revoked') {
                showTypingToast("typing privileges revoked 🔒 you lost them. you did this to yourself.");
              }
            }}
            style={{
              flex: 1,
              background: isLight ? '#ffffff' : (inputLockedState === 'revoked' ? '#182229' : '#2a3942'),
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              cursor: inputLockedState === 'revoked' ? 'not-allowed' : 'text',
              border: inputLockedState === 'revoked' ? '1px solid rgba(239, 68, 68, 0.15)' : 'none',
              opacity: inputLockedState === 'revoked' ? 0.75 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            {inputLockedState === 'revoked' && (
              <Lock size={14} color="#ef4444" style={{ marginRight: '8px' }} />
            )}
            <input 
              type="text" 
              placeholder={inputLockedState === 'revoked' ? "typing privileges revoked" : "Type a message"} 
              value={inputText}
              onChange={(e) => {
                if (inputLockedState !== 'revoked') {
                  setInputText(e.target.value);
                }
              }}
              disabled={inputLockedState === 'revoked'}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                color: inputLockedState === 'revoked' ? '#ef4444' : (isLight ? '#111b21' : '#e9edef'),
                outline: 'none',
                width: '100%',
                cursor: inputLockedState === 'revoked' ? 'not-allowed' : 'text'
              }} 
            />
          </div>
          {inputText.trim() ? (
            <button 
              type="submit"
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00a884'
              }}
            >
              <Send size={22} />
            </button>
          ) : (
            <Mic 
              size={22} 
              color={isLight ? '#54656f' : '#8696a0'} 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                if (inputLockedState === 'revoked') {
                  showTypingToast("typing privileges revoked 🔒 you lost them. you did this to yourself.");
                } else {
                  showTypingToast("did the narrator allow voice messages? absolutely not 🎤❌");
                }
              }}
            />
          )}
        </form>
      )}

      {/* Typing Toast Popup */}
      <AnimatePresence>
        {typingToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '50%',
              background: '#00a884',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '24px',
              boxShadow: '0 8px 24px rgba(0, 168, 132, 0.35)',
              fontSize: '13.5px',
              fontWeight: 600,
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'Outfit', sans-serif",
              maxWidth: '85%',
              textAlign: 'center'
            }}
          >
            <span>🔔</span>
            <span>{typingToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
