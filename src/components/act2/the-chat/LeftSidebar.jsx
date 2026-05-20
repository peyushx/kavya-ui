import { useState } from 'react';
import { Search, RotateCcw, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeftSidebar({
  isLight,
  colors,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  favourites,
  mockChats,
  setView,
  view,
  onChatSelect
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const doReset = () => {
    localStorage.removeItem('kavvs_stalking_unlocked');
    localStorage.removeItem('kavvs_typing_attempt');
    localStorage.removeItem('kavvs_input_lock_state');
    localStorage.removeItem('kavvs_attachment_tap_count');
    localStorage.removeItem('kavvs_phone_call_logs');
    localStorage.removeItem('kavvs_group_dp_index');
    localStorage.removeItem('kavvs_group_name');
    localStorage.removeItem('kavvs_favourites');
    localStorage.removeItem('kavvs_explored_suspects');
    localStorage.removeItem('kavvs_completed_dms');
    localStorage.removeItem('kavvs_narrator_dm_alert_triggered');
    localStorage.removeItem('kavvs_whatsapp_history');
    localStorage.removeItem('kavvs_pishu_messages');
    localStorage.removeItem('kavvs_pishu_unread');
    localStorage.removeItem('kavvs_dm_history_Jiya 🧸');
    localStorage.removeItem('kavvs_dm_history_Arjun 😎');
    localStorage.removeItem('kavvs_dm_history_Meera 💅');
    localStorage.removeItem('kavvs_dm_step_Jiya 🧸');
    localStorage.removeItem('kavvs_dm_step_Arjun 😎');
    localStorage.removeItem('kavvs_dm_step_Meera 💅');
    window.location.reload();
  };

  return (
    <div style={{
      width: '300px',
      height: '100%',
      borderRight: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
      background: isLight ? '#ffffff' : '#111b21',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative'
    }}>
      {/* Left Header */}
      <div style={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: isLight ? '#f0f2f5' : '#202c33',
        borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35'
      }}>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: isLight ? '#111b21' : '#e9edef' }}>WhatsApp</h1>
        <div style={{ display: 'flex', gap: '14px', color: isLight ? '#54656f' : '#aebac1', alignItems: 'center' }}>
          <RotateCcw 
            size={18} 
            style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }} 
            title="Reset Investigation" 
            onClick={() => setShowResetConfirm(true)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(-45deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '8px 12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: isLight ? '#f0f2f5' : '#202c33',
          borderRadius: '8px',
          padding: '6px 12px',
          gap: '8px'
        }}>
          <Search size={16} color={isLight ? '#54656f' : '#aebac1'} />
          <input 
            type="text"
            placeholder="Search or start a new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              color: isLight ? '#111b21' : '#e9edef',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ padding: '4px 12px 8px', display: 'flex', gap: '6px' }}>
        {['All', 'Unread', 'Groups'].map(f => {
          const isActive = f === activeFilter;
          return (
            <button key={f} onClick={() => setActiveFilter(f === activeFilter ? 'All' : f)}
              style={{
                background: isActive ? (isLight ? '#e7fce0' : '#00a884') : (isLight ? '#f0f2f5' : '#202c33'),
                color: isActive ? (isLight ? '#008069' : '#111b21') : (isLight ? '#54656f' : '#aebac1'),
                border: 'none',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
              {f}
            </button>
          );
        })}
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {mockChats
          .filter(chat => {
            if (activeFilter === 'Unread') return chat.unread;
            if (activeFilter === 'Groups') return chat.isGroup;
            return true;
          })
          .filter(chat => {
            if (!searchQuery) return true;
            return chat.name.toLowerCase().includes(searchQuery.toLowerCase());
          })
          .map(chat => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            style={{
              display: 'flex',
              gap: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              background: chat.selected ? (isLight ? '#f0f2f5' : '#2a3942') : 'transparent',
              borderBottom: isLight ? '1px solid #f0f2f5' : '1px solid rgba(134,150,160,0.08)',
              transition: 'background 0.2s ease',
              alignItems: 'center',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!chat.selected) e.currentTarget.style.background = isLight ? '#f5f6f6' : '#202c33';
            }}
            onMouseLeave={(e) => {
              if (!chat.selected) e.currentTarget.style.background = 'transparent';
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: chat.isGroup ? (isLight ? '#00a884' : '#00a884') : (isLight ? '#dfe5e7' : '#6b7c85'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: chat.isGroup ? '22px' : '20px',
              color: '#fff',
              fontWeight: 700,
              border: chat.chatId === 'pishu' ? '2px solid #ef4444' : 'none',
              boxShadow: chat.chatId === 'pishu' ? '0 0 8px rgba(239,68,68,0.3)' : 'none'
            }}>
              {chat.isGroup ? <Users size={20} /> : chat.avatar}
            </div>
            
            {/* Chat Info */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '14.5px', 
                  fontWeight: 600, 
                  color: isLight ? '#111b21' : '#e9edef',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{chat.name}</span>
                <span style={{ 
                  fontSize: '11px', 
                  color: chat.unread ? '#00a884' : (isLight ? '#667781' : '#8696a0'),
                  fontWeight: chat.unread ? 600 : 400,
                  flexShrink: 0,
                  marginLeft: 8
                }}>{chat.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <span style={{ 
                  fontSize: '12.5px', 
                  color: isLight ? '#667781' : '#8696a0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '170px'
                }}>{chat.message}</span>
                {chat.unread && (
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#00a884',
                    color: '#111b21',
                    fontSize: '10px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>{chat.unreadCount || 1}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp-styled Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.55)',
                zIndex: 100,
              }}
            />
            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '260px',
                background: isLight ? '#ffffff' : '#3b4a54',
                borderRadius: '6px',
                zIndex: 101,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ padding: '20px 24px 16px' }}>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.5,
                  color: isLight ? '#3b4a54' : '#e9edef',
                }}>
                  Reset investigation? This will restart the chapter from the beginning.
                </p>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0',
                padding: '0 8px 8px',
              }}>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 16px',
                    color: '#00a884',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={doReset}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 16px',
                    color: '#ef4444',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
