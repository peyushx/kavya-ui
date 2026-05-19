import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Users, UserPlus, Search, Heart, ListPlus, MinusCircle, 
  LogOut, ThumbsDown, Edit2, AlertTriangle, Lock, ShieldAlert, Flag 
} from 'lucide-react';

export default function GroupInfoView({ colors, isLight, setView, onNext, isFavourite, setIsFavourite, onSelectMember, completedDms = [] }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('besties only 💀🫶');
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showExitDenied, setShowExitDenied] = useState(false);
  
  // Custom Toast state
  const [toastText, setToastText] = useState(null);

  const triggerToast = (text) => {
    setToastText(text);
    setTimeout(() => {
      setToastText(null);
    }, 4500);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    
    // Autocorrect logic
    if (val.toLowerCase().includes('fun group')) {
      setNameInput('trust issues support group');
    } else if (val.length < nameInput.length) {
      setNameInput('stop trying to rename the evidence');
    } else {
      setNameInput('one of us is lying 🐍');
    }
  };

  const handleNameSubmit = (e) => {
    e?.preventDefault();
    triggerToast("the group name stays. you don't get to rebrand the crime scene bestie 💀");
    setNameInput('besties only 💀🫶');
    setIsEditingName(false);
  };

  const handleSelectGroupDP = (optionName) => {
    setShowGalleryPicker(false);
    triggerToast("you cannot change the group photo during an active investigation. also your selection says a LOT about you 👀");
  };

  const members = [
    { 
      name: 'Jiya 🧸', 
      status: 'sends 47 messages per hour', 
      avatar: '🧸', 
      color: '#eb5528', 
      tag: 'Added by Meera' 
    },
    { 
      name: 'Arjun 😎', 
      status: 'has muted this group for 1 year', 
      avatar: '😎', 
      color: '#64748b', 
      tag: 'Added by You' 
    },
    { 
      name: 'Meera 💅', 
      status: "has removed 3 people before. don't test her", 
      avatar: '💅', 
      color: '#ec4899', 
      tag: 'Admin' 
    },
    { 
      name: 'You 🫵', 
      status: 'screenshots taken in this chat: 4', 
      avatar: '🫵', 
      color: '#10b981', 
      tag: 'Added by Meera' 
    }
  ];

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '320px', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        width: '320px',
        height: '100%',
        background: isLight ? '#ffffff' : '#111b21',
        borderLeft: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 20,
        flexShrink: 0,
        position: 'relative',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px',
        background: isLight ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        color: isLight ? '#111b21' : '#e9edef',
        borderBottom: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div onClick={() => setView('chat')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <X size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Group info</h2>
      </div>

      {/* Group Icon & Name */}
      <div style={{
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        position: 'relative'
      }}>
        {/* DP Container */}
        <div 
          onClick={() => setShowGalleryPicker(true)}
          style={{
            width: '110px', 
            height: '110px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#ffffff',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '3px solid white',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            const overlay = e.currentTarget.querySelector('.dp-overlay');
            if (overlay) overlay.style.opacity = 1;
          }}
          onMouseLeave={(e) => {
            const overlay = e.currentTarget.querySelector('.dp-overlay');
            if (overlay) overlay.style.opacity = 0;
          }}
        >
          {/* Mock group selfie rendering */}
          <span style={{ fontSize: '36px', userSelect: 'none' }}>👥</span>
          
          {/* Hover Edit Overlay */}
          <div 
            className="dp-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              color: 'white',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            EDIT PHOTO
          </div>
        </div>

        <div style={{ textAlign: 'center', width: '100%' }}>
          {isEditingName ? (
            <form onSubmit={handleNameSubmit} style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
              <input 
                type="text" 
                value={nameInput} 
                onChange={handleNameChange}
                autoFocus
                style={{
                  background: isLight ? '#f0f2f5' : '#2a3942',
                  border: '1px solid #00a884',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: isLight ? '#111b21' : '#e9edef',
                  fontSize: '15px',
                  fontWeight: 600,
                  outline: 'none',
                  textAlign: 'center',
                  width: '80%'
                }}
              />
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 600 }}>besties only 💀🫶</h2>
              <Edit2 
                size={14} 
                color={colors.dateText} 
                style={{ cursor: 'pointer' }}
                onClick={() => setIsEditingName(true)}
              />
            </div>
          )}
          <span style={{ fontSize: '12px', color: colors.dateText, display: 'block', marginTop: '4px' }}>
            Group · 4 members
          </span>
        </div>
      </div>

      {/* Description */}
      <div style={{
        padding: '16px',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        color: isLight ? '#111b21' : '#e9edef',
        fontSize: '13.5px'
      }}>
        <div style={{ color: colors.dateText, fontSize: '11.5px', marginBottom: '6px' }}>
          Created by Meera 💅
        </div>
        <div style={{ fontStyle: 'italic', opacity: 0.85 }}>No secrets allowed. 🤫💅</div>
      </div>

      {/* Members List */}
      <div style={{
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
      }}>
        <div style={{ padding: '16px 16px 8px 16px', fontSize: '12.5px', color: colors.dateText, fontWeight: 600 }}>
          4 members
        </div>
        
        {/* Add Member Row (Mock Locked) */}
        <div 
          onClick={() => triggerToast("adding members is suspended during active investigations 🔒")}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 16px', cursor: 'pointer' }}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <UserPlus size={18} />
          </div>
          <div style={{ fontSize: '14.5px', color: isLight ? '#111b21' : '#e9edef' }}>Add member</div>
        </div>

        {members.map((m, i) => (
          <div 
            key={i} 
            onClick={() => onSelectMember && onSelectMember(m.name)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '14px', 
              padding: '12px 16px', 
              borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = isLight ? '#f0f2f5' : '#1f2c34'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: m.color, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '20px', 
              color: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {m.avatar}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 600 }}>
                  {m.name}
                </span>
                {m.tag && (
                  <span style={{ 
                    fontSize: '10px', 
                    color: m.tag === 'Admin' ? '#ec4899' : '#00a884', 
                    background: m.tag === 'Admin' ? 'rgba(236,72,153,0.1)' : 'rgba(0,168,132,0.1)', 
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    whiteSpace: 'nowrap',
                    fontWeight: 600
                  }}>
                    {m.tag}
                  </span>
                )}
              </div>
              <span style={{ 
                fontSize: '11.5px', 
                color: m.name === 'You 🫵' ? '#ef4444' : colors.dateText, 
                marginTop: '3px',
                fontWeight: m.name === 'You 🫵' ? 600 : 400
              }}>
                {m.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Options */}
      <div style={{
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        padding: '6px 0',
      }}>
        <div 
          onClick={() => setIsFavourite(!isFavourite)}
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', color: isLight ? '#111b21' : '#e9edef' }}>
          <span style={{ opacity: 0.6, display: 'flex', color: isFavourite ? '#ef4444' : 'inherit' }}>
            <Heart size={20} fill={isFavourite ? '#ef4444' : 'none'} />
          </span>
          <span style={{ fontSize: '13.5px', fontWeight: 500 }}>
            {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          </span>
        </div>
      </div>

      {/* Act Progression Interrogation Status Button */}
      <div style={{
        padding: '16px',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ fontSize: '11px', color: colors.dateText, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, textAlign: 'center' }}>
          Interrogation Progression Status
        </div>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '4px 0' }}>
          {['Jiya 🧸', 'Arjun 😎', 'Meera 💅'].map((suspect) => {
            const isDone = completedDms.includes(suspect);
            const avatar = suspect.split(' ')[1];
            return (
              <div 
                key={suspect} 
                title={suspect}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isDone ? '#00a884' : (isLight ? '#cbd5e1' : '#2d383f'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  border: isDone ? '2px solid #00a884' : '2px dashed #64748b',
                  opacity: isDone ? 1 : 0.5,
                  position: 'relative'
                }}
              >
                {avatar}
                {isDone && (
                  <div style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#00a884',
                    color: 'white',
                    fontSize: '8px',
                    borderRadius: '50%',
                    width: '12px',
                    height: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    border: '1px solid white'
                  }}>
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {completedDms.length === 3 ? (
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNext && onNext()}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '12px 0',
              fontWeight: 800,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              letterSpacing: '0.5px'
            }}
          >
            <span>PROCEED TO VERDICT</span>
            <span>➔</span>
          </motion.button>
        ) : (
          <div style={{
            width: '100%',
            background: isLight ? '#f1f5f9' : '#1e293b',
            color: isLight ? '#64748b' : '#94a3b8',
            borderRadius: '20px',
            padding: '12px 0',
            fontWeight: 700,
            fontSize: '12.5px',
            textAlign: 'center',
            border: isLight ? '1px dashed #cbd5e1' : '1px dashed #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <Lock size={12} />
            <span>🔐 COMPLETE {3 - completedDms.length} MORE DMs</span>
          </div>
        )}
      </div>

      {/* Danger Options */}
      <div style={{ padding: '6px 0', paddingBottom: '30px' }}>
        <div 
          onClick={() => triggerToast("evidence clearing is disabled 🚫 you cannot tamper with crime files")}
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', color: '#ef4444' }}
        >
          <span style={{ display: 'flex' }}><MinusCircle size={20} /></span>
          <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Clear chat</span>
        </div>
        
        {/* Exit Group */}
        <div 
          onClick={() => setShowExitConfirm(true)}
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', color: '#ef4444' }}
        >
          <span style={{ display: 'flex' }}><LogOut size={20} /></span>
          <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Exit group</span>
        </div>
        
        {/* Report Group */}
        <div 
          onClick={() => triggerToast("report WHAT?? YOU'RE the suspect 💀 the group should be reporting YOU")}
          style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', color: '#ef4444' }}
        >
          <span style={{ display: 'flex' }}><ThumbsDown size={20} /></span>
          <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Report group</span>
        </div>
      </div>

      {/* 🖼️ DP Change Gallery Selector Popup Overlay */}
      <AnimatePresence>
        {showGalleryPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 350,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                width: '100%',
                maxWidth: '300px',
                background: isLight ? '#ffffff' : '#232d36',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                color: isLight ? '#111b21' : '#e9edef'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Select Profile Photo</h4>
                <div onClick={() => setShowGalleryPicker(false)} style={{ cursor: 'pointer', opacity: 0.7 }}><X size={16} /></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Photo 1: Scribbled Face */}
                <div 
                  onClick={() => handleSelectGroupDP('scribbled')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isLight ? '#f0f2f5' : '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', position: 'relative' }}>
                    👥
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold', fontSize: '22px' }}>❌</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>scribbled_face.png</span>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>Your face is crossed out in red</span>
                  </div>
                </div>

                {/* Photo 2: Texting alone */}
                <div 
                  onClick={() => handleSelectGroupDP('texting')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isLight ? '#f0f2f5' : '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    📱
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>texting_secretly.png</span>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>Everyone smiling except you</span>
                  </div>
                </div>

                {/* Photo 3: Red Flag */}
                <div 
                  onClick={() => handleSelectGroupDP('flag')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isLight ? '#f0f2f5' : '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                    <Flag size={20} fill="#ef4444" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>red_flag.png</span>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>Just a red flag. That's it.</span>
                  </div>
                </div>

                {/* Photo 4: Clown Makeup */}
                <div 
                  onClick={() => handleSelectGroupDP('clown')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isLight ? '#f0f2f5' : '#1f2c34',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    🤡
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>current_group_vibe.png</span>
                    <span style={{ fontSize: '10px', opacity: 0.6 }}>Clown makeup.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔒 Dialog: EXIT CONFIRMATION */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 350,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{
                width: '100%',
                maxWidth: '280px',
                background: isLight ? '#ffffff' : '#232d36',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                color: isLight ? '#111b21' : '#e9edef'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 600 }}>Exit group?</h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '13px', opacity: 0.8, lineHeight: '1.4' }}>
                Are you sure you want to leave?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <button 
                  onClick={() => setShowExitConfirm(false)}
                  style={{ background: 'transparent', border: 'none', color: '#00a884', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                >
                  CANCEL
                </button>
                <button 
                  onClick={() => {
                    setShowExitConfirm(false);
                    setTimeout(() => setShowExitDenied(true), 200);
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
                >
                  EXIT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔒 Dialog: EXIT DENIED (Lmao no) */}
      <AnimatePresence>
        {showExitDenied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 360,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              style={{
                width: '100%',
                maxWidth: '280px',
                background: '#182229',
                border: '1.5px solid #ef4444',
                borderRadius: '16px',
                padding: '24px 20px',
                boxShadow: '0 12px 32px rgba(239,68,68,0.2)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '12px' }} />
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5px' }}>
                Lmao no 💀
              </h4>
              <p style={{ margin: '0 0 6px 0', fontSize: '13.5px', fontWeight: 600 }}>
                you cannot leave an active investigation
              </p>
              <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#8696a0', lineHeight: '1.4' }}>
                you're locked in bestie. should've thought about that before you joined 🔒
              </p>
              
              <button 
                onClick={() => setShowExitDenied(false)}
                style={{ 
                  width: '100%',
                  background: '#ef4444', 
                  color: 'white',
                  border: 'none', 
                  borderRadius: '20px',
                  padding: '10px 0',
                  fontWeight: 'bold', 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(239,68,68,0.3)'
                }}
              >
                Locked in 🔒
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔔 Dynamic Toast Popup */}
      <AnimatePresence>
        {toastText && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 15, scale: 0.95, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              background: '#00a884',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '24px',
              boxShadow: '0 8px 24px rgba(0, 168, 132, 0.35)',
              fontSize: '13px',
              fontWeight: 600,
              zIndex: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              maxWidth: '85%',
              textAlign: 'center'
            }}
          >
            <span>🔔</span>
            <span>{toastText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
