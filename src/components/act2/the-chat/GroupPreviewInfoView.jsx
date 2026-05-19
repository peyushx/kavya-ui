
export function GroupPreviewInfoView({ activeGroup, isLight, colors, onClose, onSelectMember }) {
  const getGroupMembers = (groupId) => {
    switch (groupId) {
      case 'family':
        return [
          { name: "Riya's Mom", role: 'Group Creator / Admin', avatar: '👩', color: '#10b981' },
          { name: "Riya's Dad", role: 'Minion image sender', avatar: '👨', color: '#f59e0b' },
          { name: 'Riya 🧸', role: 'Daughter / Dal maker', avatar: '🧸', color: '#eb5528' }
        ];
      case 'notes':
        return [
          { name: 'Riya 🧸', role: 'Group Creator / Admin', avatar: '🧸', color: '#eb5528' },
          { name: 'Random guy', role: 'Active note-beggar', avatar: '🧑', color: '#3b82f6' },
          { name: 'Girl', role: 'Stressed student', avatar: '👩', color: '#ca8a04' },
          { name: '31 other classmates...', role: 'Silent readers', avatar: '👥', color: '#64748b', isFiller: true }
        ];
      case 'boys':
        return [
          { name: 'Karan', role: 'Group Creator / Admin', avatar: '🧑', color: '#64748b' },
          { name: 'Dev', role: 'Gym buddy / Protein source', avatar: '🧑', color: '#475569' },
          { name: 'Arjun 😎', role: 'Oversleeper', avatar: '😎', color: '#64748b' },
          { name: '3 others...', role: 'Gym chatters', avatar: '👥', color: '#94a3b8', isFiller: true }
        ];
      case 'fifa':
        return [
          { name: 'Sam', role: 'Group Creator / Admin', avatar: '🧑', color: '#f59e0b' },
          { name: 'Karan', role: 'Pro gamer', avatar: '🧑', color: '#ca8a04' },
          { name: 'Arjun 😎', role: 'Lag complain specialist', avatar: '😎', color: '#64748b' },
          { name: '5 others...', role: 'Active players', avatar: '👥', color: '#94a3b8', isFiller: true }
        ];
      case 'rent':
        return [
          { name: 'Vikram', role: 'Group Creator / Admin', avatar: '🧑', color: '#10b981' },
          { name: 'Arjun 😎', role: 'Installment manager', avatar: '😎', color: '#64748b' },
          { name: 'Flatmate...', role: 'Quiet observer', avatar: '🧑', color: '#475569', isFiller: true }
        ];
      case 'girlsnight':
        return [
          { name: 'Meera 💅', role: 'Group Creator / Admin', avatar: '💅', color: '#ec4899' },
          { name: 'Priya', role: 'Pajama rule violator', avatar: '👩', color: '#db2777' },
          { name: 'Ananya', role: 'Corner boyfriend sponsor', avatar: '👩', color: '#ca8a04' },
          { name: '2 others...', role: 'Night out planners', avatar: '👥', color: '#94a3b8', isFiller: true }
        ];
      case 'gossip':
        return [
          { name: 'Meera 💅', role: 'Group Creator / Admin', avatar: '💅', color: '#ec4899' },
          { name: 'Sneha', role: 'Secret keeper (48h)', avatar: '👩', color: '#ca8a04' },
          { name: 'Tanya', role: 'Furious HR victim', avatar: '👩', color: '#db2777' },
          { name: '1 other...', role: 'Coffee gossip sponsor', avatar: '🧑', color: '#475569', isFiller: true }
        ];
      case 'skincare':
        return [
          { name: 'Meera 💅', role: 'Group Creator / Admin', avatar: '💅', color: '#ec4899' },
          { name: 'Girl', role: 'Korean skin expert', avatar: '👩', color: '#db2777' },
          { name: '5 others...', role: 'Moisturizer cultists', avatar: '👥', color: '#94a3b8', isFiller: true }
        ];
      case 'birthday':
        return [
          { name: 'Meera 💅', role: 'Group Creator / Admin', avatar: '💅', color: '#ec4899' },
          { name: 'Priya', role: 'Left on read', avatar: '👩', color: '#64748b' },
          { name: 'Ananya', role: 'Left on read', avatar: '👩', color: '#64748b' },
          { name: 'Sneha', role: 'Left on read', avatar: '👩', color: '#64748b' },
          { name: 'You 🫵', role: 'Left on read', avatar: '🫵', color: '#10b981' }
        ];
      default:
        return [];
    }
  };

  const groupMembers = getGroupMembers(activeGroup.id);

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
        borderLeft: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 20,
        flexShrink: 0,
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
        borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div onClick={onClose} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Close Group Info">
          <ArrowLeft size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Group info</h2>
      </div>

      {/* Profile Photo Card */}
      <div style={{
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          marginBottom: '16px'
        }}>
          👥
        </div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef', textAlign: 'center' }}>
          {activeGroup.name}
        </h2>
        <span style={{ fontSize: '12px', color: colors.dateText, marginTop: '4px' }}>
          Group · {activeGroup.membersCount} Members
        </span>
      </div>

      {/* Description Block */}
      <div style={{
        padding: '16px',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <span style={{ fontSize: '11px', color: '#00a884', fontWeight: 600, letterSpacing: '0.5px' }}>DESCRIPTION</span>
        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: isLight ? '#111b21' : '#cbd5e1', lineHeight: '1.45' }}>
          {activeGroup.desc}
        </p>
      </div>

      {/* Members List */}
      <div style={{
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{ padding: '16px 16px 8px 16px', fontSize: '12.5px', color: colors.dateText, fontWeight: 600 }}>
          {activeGroup.membersCount} participants
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {groupMembers.map((m, i) => {
            const isSelectable = !m.isFiller && (m.name.includes('Riya') || m.name.includes('Arjun') || m.name.includes('Meera') || m.name.includes('You'));
            return (
              <div 
                key={i} 
                onClick={() => {
                  if (isSelectable) {
                    onSelectMember(m.name);
                  }
                }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '10px 16px', 
                  borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35',
                  cursor: isSelectable ? 'pointer' : 'default',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (isSelectable) {
                    e.currentTarget.style.background = isLight ? '#f0f2f5' : '#1f2c34';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isSelectable) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: m.color || '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: 'white',
                  flexShrink: 0
                }}>
                  {m.avatar}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>
                    {m.name}
                  </span>
                  <span style={{ fontSize: '11px', color: colors.dateText, marginTop: '2px' }}>
                    {m.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Encryption Warning */}
      <div style={{
        padding: '24px 16px 40px 16px',
        textAlign: 'center',
        background: isLight ? '#ffffff' : '#111b21',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Lock size={16} color={colors.dateText} />
        <span style={{ fontSize: '10.5px', color: colors.dateText, lineHeight: '1.4' }}>
          Messages in preview are static and logged during investigation. End-to-end encryption details are locked.
        </span>
      </div>
    </motion.div>
  );
}