import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function DmBubble({ sender, text, isOutgoing, color }) {
  return (
    <div style={{ alignSelf: isOutgoing ? 'flex-end' : 'flex-start', maxWidth: '80%', background: isOutgoing ? '#005c4b' : '#202c33', borderRadius: isOutgoing ? '8px 0 8px 8px' : '0 8px 8px 8px', padding: '6px 8px 2px', marginTop: 3 }}>
      {!isOutgoing && <div style={{ fontSize: 11, fontWeight: 'bold', color: color || '#00a884', paddingBottom: 2 }}>{sender}</div>}
      <div style={{ fontSize: 13, color: '#e9edef' }}>{text}</div>
    </div>
  );
}

function ForwardedBlock({ text }) {
  return (
    <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#005c4b', borderRadius: '8px 0 8px 8px', padding: '6px 8px', marginTop: 3 }}>
      <div style={{ fontSize: 10, color: '#00a884', fontStyle: 'italic', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>↗ Forwarded from besties only 💀🫶</div>
      <div style={{ background: 'rgba(0,0,0,0.2)', borderLeft: '3px solid #eb5528', padding: '6px 8px', borderRadius: 4, fontSize: 12, color: '#e9edef', fontStyle: 'italic' }}>
        <span style={{ fontSize: 11, fontWeight: 'bold', color: '#eb5528' }}>Jiya 🧸</span><br />{text}
      </div>
    </div>
  );
}

const SCREENSHOTS = [
  {
    title: 'DM with Sahil',
    messages: [
      { sender: 'You 🫵', text: "bro you won't believe what jiya just said in the group chat 💀", out: true },
      { sender: 'Sahil', text: 'what', out: false, color: '#60a5fa' },
      { type: 'forwarded', text: "i feel like i'm too clingy sometimes and everyone secretly finds me annoying... i just don't want to lose anyone 🥺" },
      { sender: 'Sahil', text: 'lmaooo she actually said that in a GROUP CHAT??', out: false, color: '#60a5fa' },
      { sender: 'You 🫵', text: 'ikr 💀💀', out: true },
    ]
  },
  {
    title: 'DM with Sahil (continued)',
    messages: [
      { sender: 'Sahil', text: "bro that's kinda personal tho", out: false, color: '#60a5fa' },
      { sender: 'You 🫵', text: "yeah but it's funny", out: true },
      { sender: 'Sahil', text: 'should i tell her i saw it', out: false, color: '#60a5fa' },
      { sender: 'You 🫵', text: "NO. don't. she'll know someone leaked it", out: true },
      { sender: 'Sahil', text: 'too late i already told my girlfriend', out: false, color: '#60a5fa' },
      { sender: 'You 🫵', text: 'BRO', out: true },
      { sender: 'Sahil', text: "she probably won't tell anyone", out: false, color: '#60a5fa' },
      { sender: 'You 🫵', text: '🤦‍♂️', out: true },
    ]
  },
  {
    title: 'besties only 💀🫶 — after the leak',
    messages: [
      { sender: 'Jiya 🧸', text: 'guys. someone told sahil what i said in this group. who did this?? i\'m literally shaking rn 😭', out: false, color: '#eb5528' },
      { sender: 'Meera 💅', text: 'WHAT. that\'s so messed up', out: false, color: '#ec4899' },
      { sender: 'Arjun 😎', text: "bro that's not cool", out: false, color: '#64748b' },
      { sender: 'You 🫵', text: 'wtf?? who would do that 😤', out: true },
      { sender: 'You 🫵', text: "that's so wrong. i'm so sorry jiya 💔", out: true },
      { sender: 'Jiya 🧸', text: 'i trusted this group with something personal and someone just shared it like it was a joke', out: false, color: '#eb5528' },
      { sender: 'You 🫵', text: "we'll figure out who did it. i promise. 💪", out: true },
    ]
  },
];

const SPLIT_SCREEN = {
  left: { title: 'besties only 💀🫶', msg: { sender: 'You 🫵', text: "we'll figure out who did it. i promise. 💪", out: true } },
  right: { title: 'DM with Sahil', messages: [
    { sender: 'You 🫵', text: 'bro delete the messages. they\'re trying to figure out who leaked it 💀', out: true },
    { sender: 'Sahil', text: "lmao you're on your own", out: false, color: '#60a5fa' },
    { sender: 'You 🫵', text: 'SAHIL.', out: true },
  ]}
};

export default function RevealReceipts({ onComplete }) {
  const [currentSS, setCurrentSS] = useState(-1); // -1 = title, 0-2 = screenshots, 3 = split

  useEffect(() => {
    const delays = [3000, 6000, 6000, 6000, 5000];
    if (currentSS < 3) {
      const t = setTimeout(() => setCurrentSS(prev => prev + 1), delays[currentSS + 1] || 5000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 5000);
      return () => clearTimeout(t);
    }
  }, [currentSS]);

  const cardStyle = { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '16px 14px', maxWidth: 420, width: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' };
  const headerStyle = { fontSize: 11, color: '#8696a0', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 };

  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Outfit', sans-serif" }}>
      {/* Title */}
      {currentSS === -1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#8696a0', letterSpacing: 2, marginBottom: 8 }}>📁 recovered DM logs · suspect:</div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
            style={{ fontSize: 28, fontWeight: 700, color: '#ef4444' }}>You 🫵</motion.div>
        </motion.div>
      )}

      {/* Screenshot cards */}
      {currentSS >= 0 && currentSS <= 2 && (
        <motion.div key={currentSS} initial={{ opacity: 0, scale: 0.95, x: -5 }} animate={{ opacity: 1, scale: 1, x: [0, -3, 3, -2, 0] }}
          transition={{ duration: 0.5, x: { duration: 0.4, delay: 0.1 } }} style={cardStyle}>
          <div style={headerStyle}>💬 {SCREENSHOTS[currentSS].title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {SCREENSHOTS[currentSS].messages.map((m, i) => (
              m.type === 'forwarded' ? <ForwardedBlock key={i} text={m.text} />
                : <DmBubble key={i} sender={m.sender} text={m.text} isOutgoing={m.out} color={m.color} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Split screen */}
      {currentSS === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', gap: 12, maxWidth: 700, width: '95vw' }}>
          <div style={{ ...cardStyle, flex: 1, borderColor: 'rgba(0,168,132,0.3)' }}>
            <div style={headerStyle}>👥 {SPLIT_SCREEN.left.title}</div>
            <DmBubble sender={SPLIT_SCREEN.left.msg.sender} text={SPLIT_SCREEN.left.msg.text} isOutgoing={SPLIT_SCREEN.left.msg.out} />
          </div>
          <div style={{ ...cardStyle, flex: 1, borderColor: 'rgba(239,68,68,0.3)' }}>
            <div style={headerStyle}>💬 {SPLIT_SCREEN.right.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SPLIT_SCREEN.right.messages.map((m, i) => (
                <DmBubble key={i} sender={m.sender} text={m.text} isOutgoing={m.out} color={m.color} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
