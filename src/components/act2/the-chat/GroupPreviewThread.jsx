export default function GroupPreviewThread({ activeGroup, isLight, colors, onReturn, setNarratorComment, setView, view }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: isLight ? '#efeae2' : '#0b141a',
      position: 'relative',
      fontFamily: "'Outfit', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: isLight ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
        color: isLight ? '#111b21' : '#e9edef',
        zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => {
              const comment = activeGroup.narratorComment;
              onReturn();
              if (comment) {
                setNarratorComment(comment);
              }
            }} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Back to Investigation"
          >
            <ArrowLeft size={20} />
          </div>
          <div 
            onClick={() => setView(view === 'info' ? 'chat' : 'info')}
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            title="Toggle Group Info"
          >
            <span style={{ fontSize: '14.5px', fontWeight: 600 }}>{activeGroup.name}</span>
            <span style={{ fontSize: '11px', color: colors.dateText }}>{activeGroup.membersCount} members · Preview Mode</span>
          </div>
        </div>
        <button 
          onClick={() => {
            const comment = activeGroup.narratorComment;
            onReturn();
            if (comment) {
              setNarratorComment(comment);
            }
          }}
          style={{
            background: '#00a884',
            color: '#ffffff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '11.5px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#008f72'}
          onMouseLeave={(e) => e.target.style.background = '#00a884'}
        >
          Investigation Chat 💬
        </button>
      </div>

      {/* Messages View */}
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
          gap: '10px',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: isLight ? 0.04 : 0.02,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 10px 10px, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />

        {activeGroup.messages.map((m, idx) => {
          if (m.type === 'system') {
            return (
              <div 
                key={idx}
                style={{
                  alignSelf: 'center',
                  background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  color: isLight ? '#54656f' : '#8696a0',
                  textAlign: 'center',
                  maxWidth: '90%',
                  margin: '4px 0',
                  lineHeight: '1.4',
                  zIndex: 5
                }}
              >
                {m.text}
              </div>
            );
          }

          const isOutgoing = m.sender === 'You' || m.sender === 'Riya' || m.sender === 'Arjun' || m.sender === 'Meera';
          const senderColor = isOutgoing 
            ? (isLight ? '#075E54' : '#00a884')
            : (isLight ? '#ca8a04' : '#f59e0b');

          return (
            <div 
              key={idx}
              style={{
                alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: isOutgoing 
                  ? (isLight ? '#dcf8c6' : '#005c4b') 
                  : (isLight ? '#ffffff' : '#202c33'),
                borderRadius: isOutgoing ? '8px 0 8px 8px' : '0 8px 8px 8px',
                padding: '6px 10px',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 5
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: senderColor, marginBottom: '2px' }}>
                {m.sender}
              </span>

              {m.type === 'good_morning_img' ? (
                <div style={{
                  width: '150px',
                  background: isLight ? '#f1f5f9' : '#1e293b',
                  borderRadius: '6px',
                  padding: '6px',
                  marginTop: '4px',
                  border: isLight ? '1px solid #cbd5e1' : '1px solid #334155'
                }}>
                  <div style={{ 
                    height: '90px', 
                    background: 'linear-gradient(135deg, #fef08a 0%, #f472b6 100%)', 
                    borderRadius: '4px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <span style={{ fontSize: '28px' }}>🌹🌻</span>
                    <span style={{ fontSize: '8px', color: '#1e293b', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                      GOOD MORNING
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: colors.dateText, marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    Good_Morning_Minion_Roses.jpg
                  </div>
                </div>
              ) : m.type === 'pdf_file' ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                  borderRadius: '6px',
                  padding: '8px',
                  marginTop: '4px',
                  border: isLight ? '1px solid #e2e8f0' : '1px solid #334155',
                  width: '180px'
                }}>
                  <div style={{ width: '30px', height: '30px', background: '#ef4444', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '9px' }}>
                    PDF
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: isLight ? '#111b21' : '#e9edef' }}>
                      Unit_4_Complete_Notes...
                    </span>
                    <span style={{ fontSize: '9px', color: colors.dateText }}>
                      43 pages · 2.4 MB
                    </span>
                  </div>
                </div>
              ) : (
                <span style={{ fontSize: '12.5px', color: isOutgoing ? colors.bubbleOutgoingText : colors.bubbleIncomingText, lineHeight: '1.45' }}>
                  {m.text}
                </span>
              )}

              <span style={{ fontSize: '8.5px', color: colors.dateText, textAlign: 'right', marginTop: '3px' }}>
                {m.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Disabled inputs */}
      <div style={{
        padding: '12px 16px',
        background: isLight ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35'
      }}>
        <span style={{ fontSize: '12.5px', color: colors.dateText, fontStyle: 'italic', fontWeight: 500 }}>
          Preview Only · Only group administrators can send messages.
        </span>
      </div>
    </div>
  );
}