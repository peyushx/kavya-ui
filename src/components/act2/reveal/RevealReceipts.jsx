import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DM_MESSAGES = [
  { sender: 'Meera 💅', color: '#ec4899', text: 'jiya' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i need to tell you something' },
  { sender: 'Meera 💅', color: '#ec4899', text: "and please don't hate me" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'what happened??' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'you know your message in the group. the one about feeling clingy.' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'sahil knows about it.' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'WHAT' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'HOW' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i was on a call with sneha and i was venting about how i felt bad that you were feeling that way" },
  { sender: 'Meera 💅', color: '#ec4899', text: "and i didn't realize sahil was with her" },
  { sender: 'Meera 💅', color: '#ec4899', text: 'he overheard it' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i didn't screenshot it. i didn't forward it. but i talked about it out loud and the wrong person was in the room." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'meera...' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i know. i know. i'm so sorry." },
  { sender: 'Meera 💅', color: '#ec4899', text: "i wasn't gossiping about you i swear. i was genuinely worried. i was telling sneha that i didn't know how to make you feel better." },
  { sender: 'Meera 💅', color: '#ec4899', text: "but it doesn't matter because the result is the same. you got hurt because of me." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: '...' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i understand if you're mad. you have every right to be." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'meera.' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "i'm not mad." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "i'm hurt. yeah." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "but you told me yourself. you didn't hide it. you didn't let me find out from someone else." },
  { sender: 'Meera 💅', color: '#ec4899', text: "i couldn't do that to you. you're my person 🥺" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "you're my person too idiot 😭💖" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "just... next time. even if you're worried about me. keep it in the group. or tell me directly." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'promise?' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'promise. real promise. not pinky promise. REAL. 💖' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'i love you' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i love you more 🥺💅' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "also tell sneha to control her boyfriend's ears" },
  { sender: 'Meera 💅', color: '#ec4899', text: 'LMAOOO 😭😭' },
];

export default function RevealReceipts({ onComplete }) {
  const [showTitle, setShowTitle] = useState(true);
  const [showDm, setShowDm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { setShowTitle(false); setShowDm(true); }, 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showDm) return;
    if (visibleCount >= DM_MESSAGES.length) {
      const t = setTimeout(onComplete, 3000);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setVisibleCount(prev => prev + 1);
    }, 900 + Math.random() * 400);
    return () => clearTimeout(t);
  }, [showDm, visibleCount]);

  const nextSender = visibleCount < DM_MESSAGES.length ? DM_MESSAGES[visibleCount].sender : null;

  if (showTitle) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: "'Outfit', sans-serif" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          style={{ fontSize: 13, color: '#8696a0', letterSpacing: 1.5, marginBottom: 8, textAlign: 'center' }}>
          📁 recovered DM logs · between Meera 💅 and Jiya 🧸
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
          style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', textAlign: 'center' }}>
          timestamp: 1:30 AM · 3 hours BEFORE the investigation started
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0b141a', color: '#e9edef', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ padding: '12px 16px', background: '#202c33', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #222e35' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💬</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Meera 💅 ↔ Jiya 🧸</h4>
          <span style={{ fontSize: 11, color: '#8696a0' }}>private DM · 1:30 AM</span>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: '#ef4444', fontWeight: 600, padding: '4px 10px', background: 'rgba(239,68,68,0.1)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.2)' }}>
          🔒 RECOVERED
        </div>
      </div>
      <div data-lenis-prevent onWheel={e => e.stopPropagation()} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {DM_MESSAGES.slice(0, visibleCount).map((msg, i) => {
          const isMeera = msg.sender.includes('Meera');
          return (
            <motion.div key={i} initial={{ opacity: 0, x: isMeera ? -15 : 15 }} animate={{ opacity: 1, x: 0 }}
              style={{ alignSelf: isMeera ? 'flex-start' : 'flex-end', maxWidth: '80%', background: isMeera ? '#202c33' : '#005c4b', borderRadius: isMeera ? '0 8px 8px 8px' : '8px 0 8px 8px', padding: '6px 8px 2px', marginTop: 3 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: msg.color, paddingBottom: 2 }}>{msg.sender}</div>
              <div style={{ fontSize: 13 }}>{msg.text}</div>
              <div style={{ textAlign: 'right', fontSize: 10, color: '#8696a0', paddingTop: 2 }}>1:30 AM</div>
            </motion.div>
          );
        })}
        {typing && nextSender && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ alignSelf: nextSender.includes('Meera') ? 'flex-start' : 'flex-end', background: nextSender.includes('Meera') ? '#202c33' : '#005c4b', borderRadius: '0 8px 8px 8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: DM_MESSAGES[visibleCount]?.color, marginRight: 6 }}>{nextSender}</span>
            {[0, 1, 2].map(j => <span key={j} style={{ display: 'inline-block', width: 6, height: 6, background: '#8696a0', borderRadius: '50%', animation: `bounceTyping 0.8s infinite alternate ${j * 0.2}s` }} />)}
          </motion.div>
        )}
      </div>
      <style>{`@keyframes bounceTyping { 0% { transform:translateY(0); opacity:0.4; } 100% { transform:translateY(-4px); opacity:1; } }`}</style>
    </div>
  );
}
