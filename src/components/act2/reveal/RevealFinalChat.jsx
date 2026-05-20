import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FINAL_MESSAGES = [
  { sender: 'Meera 💅', color: '#ec4899', text: 'so... are we done here detective? 💅' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "guys it's fine. seriously. me and meera sorted it out hours ago 🥺" },
  { sender: 'Arjun 😎', color: '#64748b', text: 'wait so i got woken up from my nap for nothing??' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'i literally left my bed for this' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'i want compensation' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'arjun 😭😭' },
  { sender: 'Meera 💅', color: '#ec4899', text: "arjun you live on that bed. leaving it for 20 minutes won't kill you." },
  { sender: 'Arjun 😎', color: '#64748b', text: "you don't know that. it might." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'but also' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'to whoever is reading this' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'thank you for caring enough to investigate 🥺' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'your heart was in the right place' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'even if the case was already solved lol' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'yeah bestie. you meant well. we know that 💖' },
  { sender: 'Meera 💅', color: '#ec4899', text: "you're just a little late. fashionably late. like me. but for drama." },
  { sender: 'Arjun 😎', color: '#64748b', text: 'can i go back to sleep now' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'yes arjun. you can go back to sleep.' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'finally 😴' },
];

const SYSTEM_MESSAGES = [
  '🔔 Arjun is now offline.',
  '🔔 Of course he is.',
];

export default function RevealFinalChat({ theme, onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(true);
  const [systemIdx, setSystemIdx] = useState(0);
  const [showSystem, setShowSystem] = useState(false);

  useEffect(() => {
    if (visibleCount >= FINAL_MESSAGES.length) {
      const t = setTimeout(() => setShowSystem(true), 1500);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setVisibleCount(prev => prev + 1);
    }, 900 + Math.random() * 500);
    return () => clearTimeout(t);
  }, [visibleCount]);

  useEffect(() => {
    if (!showSystem) return;
    if (systemIdx >= SYSTEM_MESSAGES.length) {
      const t = setTimeout(onComplete, 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSystemIdx(prev => prev + 1), 2000);
    return () => clearTimeout(t);
  }, [showSystem, systemIdx]);

  const nextSender = visibleCount < FINAL_MESSAGES.length ? FINAL_MESSAGES[visibleCount].sender : null;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0b141a', color: '#e9edef', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '12px 16px', background: '#202c33', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #222e35' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>👥</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>besties only 💀🫶</h4>
          <span style={{ fontSize: 11, color: '#8696a0' }}>Jiya 🧸, Arjun 😎, Meera 💅, You 🫵</span>
        </div>
      </div>
      <div data-lenis-prevent onWheel={e => e.stopPropagation()} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ alignSelf: 'center', background: 'rgba(32,44,51,0.8)', padding: '4px 10px', borderRadius: 8, fontSize: 11, color: '#8696a0', marginBottom: 10 }}>CASE CLOSED</div>
        {FINAL_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ alignSelf: 'flex-start', maxWidth: '80%', background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 8px 2px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', marginTop: 3 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: msg.color, paddingBottom: 2 }}>{msg.sender}</div>
            <div style={{ fontSize: 13 }}>{msg.text}</div>
            <div style={{ textAlign: 'right', fontSize: 10, color: '#8696a0', paddingTop: 2 }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        ))}
        {typing && nextSender && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ alignSelf: 'flex-start', background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: FINAL_MESSAGES[visibleCount]?.color || '#8696a0', marginRight: 6 }}>{nextSender}</span>
            {[0, 1, 2].map(j => <span key={j} style={{ display: 'inline-block', width: 6, height: 6, background: '#8696a0', borderRadius: '50%', animation: `bounceTyping 0.8s infinite alternate ${j * 0.2}s` }} />)}
          </motion.div>
        )}
        {showSystem && SYSTEM_MESSAGES.slice(0, systemIdx).map((sys, i) => (
          <motion.div key={`sys-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ alignSelf: 'center', background: 'rgba(32,44,51,0.8)', padding: '6px 14px', borderRadius: 8, fontSize: 12, color: i === 1 ? '#fbbf24' : '#8696a0', fontStyle: i === 1 ? 'italic' : 'normal', marginTop: 8 }}>
            {sys}
          </motion.div>
        ))}
      </div>
      <style>{`@keyframes bounceTyping { 0% { transform:translateY(0); opacity:0.4; } 100% { transform:translateY(-4px); opacity:1; } }`}</style>
    </div>
  );
}
