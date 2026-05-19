import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, Phone, MessageSquare, Video, Shield, Heart, 
  Volume2, VolumeX, Folder, Star, Users, Info, ChevronRight, Lock 
} from 'lucide-react';

export default function ContactInfoView({ memberName, isLight, colors, onClose }) {
  // Profiles database
  const profiles = {
    'Riya 🧸': {
      avatar: '🧸',
      avatarColor: '#eb5528',
      about: 'overthinking is my cardio 🏃‍♀️',
      phone: '+91 •••••• 7842',
      lastSeen: '3:02 AM',
      media: '14 photos, 6 videos, 0 documents',
      starred: [
        { sender: 'Riya 🧸', text: 'i love you guys sm 🥺' },
        { sender: 'Meera 💅', text: "riya you're not clingy you're just loving" },
        { sender: 'Arjun 😎', text: 'group trip when??' }
      ],
      groups: [
        { name: 'besties only 💀🫶', desc: 'Pishu, Arjun, Meera...' },
        { name: 'Family Group 🏠', desc: 'Mom, Dad, Bro...' },
        { name: 'college notes sharing 📚', desc: 'Batch 2026...' }
      ],
      notifications: 'LOUD (Every message, full volume)',
      isLoud: true,
      customDP: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #fbcfe8 0%, #f472b6 100%)' }}>
          <span style={{ fontSize: '72px' }}>🧸</span>
          {/* Crying visual indicators: tear drops and red eyes */}
          <div style={{ position: 'absolute', top: '48%', left: '38%', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: '48%', right: '38%', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
            style={{ position: 'absolute', top: '56%', left: '38%', width: '4px', height: '8px', borderRadius: '2px', background: '#60a5fa' }} 
          />
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 0.8 }}
            style={{ position: 'absolute', top: '56%', right: '38%', width: '4px', height: '8px', borderRadius: '2px', background: '#60a5fa' }} 
          />
        </div>
      )
    },
    'Arjun 😎': {
      avatar: '😎',
      avatarColor: '#64748b',
      about: 'i mind my own business',
      phone: '+91 •••••• 2261',
      lastSeen: 'Yesterday',
      media: '2 photos, 1 video, 0 documents',
      starred: [],
      groups: [
        { name: 'besties only 💀🫶', desc: 'Pishu, Riya, Meera...' },
        { name: 'boys only 🏋️', desc: 'Gym & Protein...' },
        { name: 'FIFA tournament 🎮', desc: 'Weekend league...' },
        { name: 'apartment rent split 💸', desc: 'Flat 404...' },
        { name: 'college batch 2022', desc: 'Engineering...' },
        { name: 'random group he never left', desc: 'Silent mode...' },
        { name: 'another random group he never left', desc: 'Silent mode...' }
      ],
      notifications: 'Muted for 1 year',
      isLoud: false,
      customDP: (
        <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(3px)', opacity: 0.75, position: 'relative' }}>
          <span style={{ fontSize: '72px' }}>😎</span>
          <div style={{ position: 'absolute', bottom: '6px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', color: 'white', fontSize: '9px', fontWeight: 'bold' }}>TAKEN IN 2019</div>
        </div>
      )
    },
    'Meera 💅': {
      avatar: '💅',
      avatarColor: '#ec4899',
      about: 'ur secrets are safe with me pinky promise 🤞',
      phone: '+91 •••••• 5519',
      lastSeen: '11:58 PM',
      media: '47 photos, 23 videos, 3 documents 📄⚠️',
      starred: [
        { sender: 'Riya 🧸', text: 'meera you look like a literal model omg' },
        { sender: 'Pishu ✨', text: 'did you hear what happened in the library??' },
        { sender: 'You 🫵', text: "don't tell arjun i said this but..." },
        { sender: 'Meera 💅', text: '*archived chat log compliments*' }
      ],
      groups: [
        { name: 'besties only 💀🫶', desc: 'Pishu, Riya, Arjun...' },
        { name: 'girls night 💃', desc: 'No boys allowed...' },
        { name: 'office gossip ☕', desc: 'Created by Meera...' },
        { name: 'skincare cult 🧴', desc: 'Korean glass skin...' },
        { name: 'meera\'s birthday planning 🎂', desc: 'Admin: Meera...' },
        { name: '6 other groups (15+ members)', desc: 'Active communication...' }
      ],
      notifications: 'Custom notification tone (Active special sound)',
      isLoud: true,
      customDP: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #fdf2f8 0%, #f472b6 100%)' }}>
          <span style={{ fontSize: '72px' }}>💅</span>
          {/* Ring light glowing circular reflection overlay */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.7)',
            boxShadow: '0 0 15px rgba(255,255,255,0.9)',
            pointerEvents: 'none'
          }} />
        </div>
      )
    },
    'You 🫵': {
      avatar: '🫵',
      avatarColor: '#10b981',
      about: 'No bio set',
      phone: '+91 •••••• YOURS',
      lastSeen: 'online 🟢',
      media: '3 photos, 1 video, 0 documents',
      starred: [],
      groups: [
        { name: 'besties only 💀🫶', desc: 'Riya, Arjun, Meera...' }
      ],
      notifications: 'Custom (Default settings)',
      isLoud: true,
      customDP: (
        <div style={{ width: '100%', height: '100%', background: isLight ? '#e2e8f0' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          <Users size={72} strokeWidth={1} />
        </div>
      ),
      isYou: true
    }
  };

  // Find profile details
  const profileName = memberName.replace(' Riya 🧸', 'Riya 🧸').replace(' Arjun 😎', 'Arjun 😎').replace(' Meera 💅', 'Meera 💅').replace(' You 🫵', 'You 🫵');
  const profile = profiles[profileName] || profiles['You 🫵'];

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '320px', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      style={{
        width: '320px',
        height: '100%',
        background: isLight ? '#ffffff' : '#111b21',
        borderLeft: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 25,
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
        borderBottom: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div onClick={onClose} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <X size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Contact info</h2>
      </div>

      {/* Profile Photo */}
      <div style={{
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '3px solid white',
          background: '#64748b',
          marginBottom: '16px'
        }}>
          {profile.customDP}
        </div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>
          {profileName}
        </h2>
        <span style={{ fontSize: '12px', color: colors.dateText, marginTop: '4px' }}>
          {profile.phone}
        </span>
      </div>

      {/* About & Last Seen */}
      <div style={{
        padding: '16px',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontSize: '11px', color: '#00a884', fontWeight: 600, letterSpacing: '0.5px' }}>ABOUT</span>
          <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef' }}>{profile.about}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35', paddingTop: '10px' }}>
          <span style={{ fontSize: '11px', color: '#00a884', fontWeight: 600, letterSpacing: '0.5px' }}>LAST SEEN</span>
          <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 600 }}>{profile.lastSeen}</span>
        </div>
      </div>

      {/* Media shared in Chat */}
      <div style={{
        padding: '16px',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Folder size={18} color={colors.dateText} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 500 }}>Media, links and docs</span>
              <span style={{ fontSize: '11px', color: colors.dateText }}>{profile.media}</span>
            </div>
          </div>
          <ChevronRight size={16} color={colors.dateText} />
        </div>
      </div>

      {/* Notifications settings */}
      <div style={{
        padding: '16px',
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {profile.isLoud ? <Volume2 size={18} color={colors.dateText} /> : <VolumeX size={18} color="#ef4444" />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 500 }}>Notifications</span>
            <span style={{ fontSize: '11px', color: profile.isLoud ? '#00a884' : '#ef4444', fontWeight: 600 }}>{profile.notifications}</span>
          </div>
        </div>
      </div>

      {/* Starred Messages */}
      <div style={{
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{ padding: '16px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyBetween: 'center', justifyContent: 'space-between', borderBottom: isLight ? '1px solid #f0f2f5' : '1px solid #222e35' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: isLight ? '#111b21' : '#e9edef' }}>
            <Star size={16} color="#eab308" fill="#eab308" />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Starred Messages ({profile.starred.length})</span>
          </div>
        </div>

        {profile.starred.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlignment: 'center', textAlign: 'center', fontSize: '12.5px', color: colors.dateText }}>
            No starred messages
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {profile.starred.map((msg, i) => (
              <div key={i} style={{ padding: '10px 16px', borderBottom: i < profile.starred.length - 1 ? (isLight ? '1px solid #f0f2f5' : '1px solid #222e35') : 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#00a884', display: 'block', marginBottom: '2px' }}>{msg.sender}</span>
                <span style={{ fontSize: '12px', color: isLight ? '#54656f' : '#cbd5e1', fontStyle: 'italic' }}>"{msg.text}"</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Groups in Common */}
      <div style={{
        background: isLight ? '#ffffff' : '#111b21',
        borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
      }}>
        <div style={{ padding: '16px 16px 8px 16px', fontSize: '12.5px', color: colors.dateText, fontWeight: 600 }}>
          Groups in common ({profile.groups.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {profile.groups.map((group, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'white' }}>
                👥
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{group.name}</span>
                <span style={{ fontSize: '11px', color: colors.dateText, marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{group.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encryption Warning (Crucial BOMBSHELL clue for YOU 🫵) */}
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
        {profile.isYou ? (
          <span style={{ fontSize: '11.5px', color: '#ef4444', lineHeight: '1.4', fontWeight: 600, border: '1px dashed rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: '8px' }}>
            Encryption: Messages are end-to-end encrypted. Except the ones you forwarded 📤
          </span>
        ) : (
          <span style={{ fontSize: '10.5px', color: colors.dateText, lineHeight: '1.4' }}>
            Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
          </span>
        )}
      </div>
    </motion.div>
  );
}
