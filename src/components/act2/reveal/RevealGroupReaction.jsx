import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const REACTIONS = {
  'Jiya 🧸': [
    { sender: 'Jiya 🧸', color: '#eb5528', text: 'you think the person who got leaked... did the leaking?? 🥺' },
    { sender: 'Jiya 🧸', color: '#eb5528', text: "that's like blaming the pizza for getting eaten" },
    { sender: 'Arjun 😎', color: '#64748b', text: 'lol' },
    { sender: 'Meera 💅', color: '#ec4899', text: 'bestie... no. just no. 😭' },
  ],
  'Arjun 😎': [
    { sender: 'Arjun 😎', color: '#64748b', text: 'bro' },
    { sender: 'Arjun 😎', color: '#64748b', text: "i haven't even opened the group chat in 3 days" },
    { sender: 'Arjun 😎', color: '#64748b', text: "i'm here right now because meera called me 4 times" },
    { sender: 'Arjun 😎', color: '#64748b', text: 'i thought someone died' },
    { sender: 'Jiya 🧸', color: '#eb5528', text: '😭😭' },
    { sender: 'Meera 💅', color: '#ec4899', text: 'i called you because this is SERIOUS arjun' },
  ],
  'Meera 💅': [
    { sender: 'Meera 💅', color: '#ec4899', text: '...' },
    { sender: 'Meera 💅', color: '#ec4899', text: 'ok.' },
    { sender: 'Meera 💅', color: '#ec4899', text: 'fine.' },
    { sender: 'Jiya 🧸', color: '#eb5528', text: 'meera?' },
    { sender: 'Meera 💅', color: '#ec4899', text: "no no. they're right." },
  ],
};

export default function RevealGroupReaction({ theme, chosenSuspect, onComplete }) {
  const msgs = REACTIONS[chosenSuspect] || REACTIONS['Jiya 🧸'];
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (visibleCount >= msgs.length) {
      const t = setTimeout(onComplete, 3000);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setVisibleCount(prev => prev + 1);
    }, 1200 + Math.random() * 600);
    return () => clearTimeout(t);
  }, [visibleCount, msgs.length]);

  const nextSender = visibleCount < msgs.length ? msgs[visibleCount].sender : null;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0b141a', color: '#e9edef', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '12px 16px', background: '#202c33', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #222e35' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>👥</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>besties only 💀🫶</h4>
          <span style={{ fontSize: 11, color: '#8696a0' }}>Jiya 🧸, Arjun 😎, Meera 💅, You 🫵</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ alignSelf: 'center', background: 'rgba(32,44,51,0.8)', padding: '4px 10px', borderRadius: 8, fontSize: 11, color: '#8696a0', marginBottom: 10 }}>TODAY</div>
        {msgs.slice(0, visibleCount).map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ alignSelf: 'flex-start', maxWidth: '80%', background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 8px 2px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', color: msg.color, paddingBottom: 2 }}>{msg.sender}</div>
            <div style={{ fontSize: 13 }}>{msg.text}</div>
            <div style={{ textAlign: 'right', fontSize: 10, color: '#8696a0', paddingTop: 2 }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        ))}
        {typing && nextSender && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ alignSelf: 'flex-start', background: '#202c33', borderRadius: '0 8px 8px 8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: msgs[visibleCount]?.color || '#8696a0', marginRight: 6 }}>{nextSender}</span>
            {[0, 1, 2].map(j => <span key={j} style={{ display: 'inline-block', width: 6, height: 6, background: '#8696a0', borderRadius: '50%', animation: `bounceTyping 0.8s infinite alternate ${j * 0.2}s` }} />)}
          </motion.div>
        )}
      </div>
      <style>{`@keyframes bounceTyping { 0% { transform:translateY(0); opacity:0.4; } 100% { transform:translateY(-4px); opacity:1; } }`}</style>
    </div>
  );
}
