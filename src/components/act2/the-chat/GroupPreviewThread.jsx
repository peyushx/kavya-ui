import { ArrowLeft } from 'lucide-react';

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
            <span style={{ fontSize: '11px', color: colors.dateText }}>{activeGroup.membersCount} members</span>
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

          // Determine who the "viewed contact" is — their messages go right (outgoing)
          // Extract base name from activeGroup context (e.g., "Family Group 🏠" for Jiya)
          const viewedContact = activeGroup.viewingContact || '';
          const isOutgoing = viewedContact && m.sender.toLowerCase().includes(viewedContact.toLowerCase());

          // WhatsApp-style sender colors for incoming messages
          const SENDER_COLORS = {
            default: isLight ? '#6b7280' : '#8696a0'
          };
          const getSenderColor = (name) => {
            if (isOutgoing) return isLight ? '#075e54' : '#06cf9c';
            const lower = name.toLowerCase();
            if (lower.includes('mom') || lower.includes('mummy')) return '#25d366';
            if (lower.includes('dad') || lower.includes('papa')) return '#f59e0b';
            if (lower.includes('meera')) return '#ec4899';
            if (lower.includes('arjun') || lower.includes('karan') || lower.includes('dev')) return '#64748b';
            if (lower.includes('jiya') || lower.includes('riya')) return '#eb5528';
            if (lower.includes('sneha') || lower.includes('ananya')) return '#a855f7';
            if (lower.includes('priya') || lower.includes('pjiya')) return '#db2777';
            // Hash-based color for others
            const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
            const hue = hash % 360;
            return `hsl(${hue}, 60%, 55%)`;
          };

          const senderColor = getSenderColor(m.sender);

          return (
            <div 
              key={idx}
              style={{
                alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                background: isOutgoing 
                  ? (isLight ? '#d9fdd3' : '#005c4b') 
                  : (isLight ? '#ffffff' : '#202c33'),
                borderRadius: isOutgoing ? '8px 0 8px 8px' : '0 8px 8px 8px',
                padding: '4px 8px 2px',
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 5,
                marginTop: idx > 0 && activeGroup.messages[idx - 1]?.sender === m.sender ? '1px' : '4px'
              }}
            >
              {/* Only show sender name if it's a different sender than the previous message, or first message */}
              {(idx === 0 || activeGroup.messages[idx - 1]?.sender !== m.sender || activeGroup.messages[idx - 1]?.type === 'system') && (
                <span style={{ fontSize: '12px', fontWeight: 600, color: senderColor, marginBottom: '1px' }}>
                  {m.sender}
                </span>
              )}

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
                <span style={{ fontSize: '13px', color: isLight ? '#111b21' : '#e9edef', lineHeight: '1.4' }}>
                  {m.text}
                </span>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3px', marginTop: '1px' }}>
                <span style={{ fontSize: '10px', color: isLight ? '#667781' : '#8696a0' }}>
                  {m.time}
                </span>
                {isOutgoing && (
                  <svg viewBox="0 0 16 11" width="14" height="10" style={{ fill: isLight ? '#53bdeb' : '#53bdeb' }}>
                    <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.46.46 0 0 0-.327-.14.458.458 0 0 0-.33.151c-.076.084-.116.185-.116.299 0 .113.04.214.116.299l2.343 2.442a.434.434 0 0 0 .344.166.457.457 0 0 0 .351-.178l6.533-8.074a.392.392 0 0 0 .098-.295.39.39 0 0 0-.126-.287z" />
                    <path d="M14.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.46.46 0 0 0-.327-.14.458.458 0 0 0-.33.151c-.076.084-.116.185-.116.299 0 .113.04.214.116.299l2.343 2.442a.434.434 0 0 0 .344.166.457.457 0 0 0 .351-.178l6.533-8.074a.392.392 0 0 0 .098-.295.39.39 0 0 0-.126-.287z" opacity=".5" />
                  </svg>
                )}
              </div>
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
          📁 evidence log · read only
        </span>
      </div>
    </div>
  );
}