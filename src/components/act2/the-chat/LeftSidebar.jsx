import { ListPlus, MoreVertical, Search, Users } from 'lucide-react';

export default function LeftSidebar({
  isLight,
  colors,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  isFavourite,
  mockChats,
  setView,
  view
}) {
  return (
    <div style={{
      width: '300px',
      height: '100%',
      borderRight: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
      background: isLight ? '#ffffff' : '#111b21',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
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
        <div style={{ display: 'flex', gap: '16px', color: isLight ? '#54656f' : '#aebac1' }}>
          <ListPlus size={20} style={{ cursor: 'pointer' }} />
          <MoreVertical size={20} style={{ cursor: 'pointer' }} />
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
              border: 'none',
              background: 'transparent',
              fontSize: '13px',
              color: isLight ? '#111b21' : '#e9edef',
              outline: 'none',
              width: '100%'
            }} 
          />
        </div>
      </div>

      {/* Filters Row */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '4px 12px 10px 12px',
        overflowX: 'auto',
        flexShrink: 0
      }}>
        {['All', 'Unread', 'Favourites', 'Groups'].map((tag, i) => (
          <span 
            key={i} 
            onClick={() => setActiveFilter(tag)}
            style={{
              background: tag === activeFilter ? (isLight ? '#e1f5fe' : '#0a3329') : (isLight ? '#f0f2f5' : '#202c33'),
              color: tag === activeFilter ? (isLight ? '#039be5' : '#00a884') : (isLight ? '#54656f' : '#8696a0'),
              fontSize: '12px',
              padding: '4px 10px',
              borderRadius: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Chats List */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {mockChats.filter(chat => {
          const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                chat.message.toLowerCase().includes(searchQuery.toLowerCase());
          if (!matchesSearch) return false;
          if (activeFilter === 'Unread') return false; 
          if (activeFilter === 'Favourites') return isFavourite; 
          if (activeFilter === 'Groups') return chat.isGroup;
          return true;
        }).map((chat, idx) => (
          <div 
            key={idx} 
            onClick={() => setView('chat')}
            style={{
              display: 'flex',
              padding: '12px 16px',
              gap: '12px',
              background: chat.selected ? (isLight ? '#f0f2f5' : '#2a3942') : 'transparent',
              borderBottom: isLight ? '1px solid #f0f2f5' : '1px solid #222e35',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: chat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#ffffff',
              flexShrink: 0
            }}>
              {chat.isGroup ? <Users size={20} /> : chat.avatar}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {chat.name}
                </span>
                <span style={{ fontSize: '11px', color: chat.unread ? '#00a884' : colors.dateText, fontWeight: chat.unread ? 'bold' : 'normal' }}>
                  {chat.time}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: colors.dateText, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', flex: 1, marginRight: '8px' }}>
                  {chat.message}
                </span>
              </div>
            </div>
          </div>
        ))}

        {mockChats.filter(chat => {
          const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                chat.message.toLowerCase().includes(searchQuery.toLowerCase());
          if (!matchesSearch) return false;
          if (activeFilter === 'Unread') return false;
          if (activeFilter === 'Favourites') return isFavourite;
          if (activeFilter === 'Groups') return chat.isGroup;
          return true;
        }).length === 0 && (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: colors.dateText,
            fontSize: '14px'
          }}>
            No chats, groups or contacts found
          </div>
        )}
      </div>
    </div>
  );
}
