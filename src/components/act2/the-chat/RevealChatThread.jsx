import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

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

const NARRATOR_LINES = [
  { type: 'system', text: '🔔 ok. investigation is over.' },
  { type: 'system', text: '🔔 time for the truth.' },
  { type: 'system', text: "🔔 and bestie... you're not ready for this one 💀" },
];

const DM_HEADER = { type: 'dm-header', text: '📁 recovered DM logs · between Meera 💅 and Jiya 🧸\ntimestamp: 1:30 AM · 3 hours BEFORE the investigation started' };

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
  { sender: 'Meera 💅', color: '#ec4899', text: "i wasn't gossiping about you i swear. i was genuinely worried." },
  { sender: 'Meera 💅', color: '#ec4899', text: "but it doesn't matter because the result is the same. you got hurt because of me." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: '...' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i understand if you're mad. you have every right to be." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'meera.' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "i'm not mad." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "i'm hurt. yeah." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "but you told me yourself. you didn't hide it. you didn't let me find out from someone else." },
  { sender: 'Meera 💅', color: '#ec4899', text: "i couldn't do that to you. you're my person 🥺" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "you're my person too idiot 😭💖" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "just... next time. keep it in the group. or tell me directly." },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'promise?' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'promise. real promise. not pinky promise. REAL. 💖' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'i love you' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i love you more 🥺💅' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "also tell sneha to control her boyfriend's ears" },
  { sender: 'Meera 💅', color: '#ec4899', text: 'LMAOOO 😭😭' },
];

const NARRATOR_AFTERMATH = [
  { type: 'system', text: '🔔 so. that happened at 1:30 AM.' },
  { type: 'system', text: '🔔 three hours before you started your little investigation.' },
  { type: 'system', text: '🔔 meera already confessed. jiya already forgave her.' },
  { type: 'system', text: '🔔 they already handled it. like adults. like real friends.' },
  { type: 'system', text: '🔔 and you? you spent the last 20 minutes playing detective 🔍' },
  { type: 'system', text: '🔔 on a case that was already closed 💀' },
];

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

const FINAL_SYSTEM = [
  { type: 'system', text: '🔔 Arjun is now offline.' },
  { type: 'system-narrator', text: '🔔 Of course he is.' },
];

export default function RevealChatThread({ chosenSuspect, isLight, colors, onComplete }) {
  const [allItems, setAllItems] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingSender, setTypingSender] = useState(null);
  const endRef = useRef(null);

  // Build the full script
  const fullScript = [];
  const reactions = REACTIONS[chosenSuspect] || REACTIONS['Jiya 🧸'];
  reactions.forEach(m => fullScript.push({ ...m, type: 'msg' }));
  NARRATOR_LINES.forEach(m => fullScript.push(m));
  fullScript.push(DM_HEADER);
  DM_MESSAGES.forEach(m => fullScript.push({ ...m, type: 'dm' }));
  NARRATOR_AFTERMATH.forEach(m => fullScript.push(m));
  FINAL_MESSAGES.forEach(m => fullScript.push({ ...m, type: 'msg' }));
  FINAL_SYSTEM.forEach(m => fullScript.push(m));

  const [scriptIndex, setScriptIndex] = useState(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allItems, typing]);

  useEffect(() => {
    if (scriptIndex >= fullScript.length) {
      const t = setTimeout(() => { if (onComplete) onComplete(); }, 5000);
      return () => clearTimeout(t);
    }

    const item = fullScript[scriptIndex];
    const isSystem = item.type === 'system' || item.type === 'system-narrator' || item.type === 'dm-header';
    const isDmHeader = item.type === 'dm-header';
    const delay = isDmHeader ? 4000 : isSystem ? 3500 : (1800 + Math.random() * 1000);

    if (!isSystem) {
      setTyping(true);
      setTypingSender(item.sender);
    }

    const t = setTimeout(() => {
      setTyping(false);
      setTypingSender(null);
      setAllItems(prev => [...prev, { ...item, id: scriptIndex }]);
      setScriptIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(t);
  }, [scriptIndex]);

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: colors.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', background: isLight ? '#f0f2f5' : '#202c33', display: 'flex', alignItems: 'center', gap: 12, zIndex: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔍</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>the reveal 🔍</h4>
          <span style={{ fontSize: 11, color: colors.dateText }}>Jiya 🧸, Arjun 😎, Meera 💅, You 🫵</span>
        </div>
      </div>

      {/* Chat body */}
      <div data-lenis-prevent onWheel={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}
        style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', zIndex: 15 }}>

        <div style={{ alignSelf: 'center', background: colors.dateBg, padding: '4px 10px', borderRadius: 8, fontSize: 11, color: colors.dateText, marginBottom: 10 }}>TODAY</div>

        {allItems.map((item) => {
          if (item.type === 'system' || item.type === 'system-narrator') {
            return (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ alignSelf: 'center', background: colors.dateBg, padding: '6px 14px', borderRadius: 8, fontSize: 12, color: item.type === 'system-narrator' ? '#fbbf24' : colors.dateText, fontStyle: item.type === 'system-narrator' ? 'italic' : 'normal', margin: '6px 0', textAlign: 'center', maxWidth: '85%' }}>
                {item.text}
              </motion.div>
            );
          }

          if (item.type === 'dm-header') {
            return (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ alignSelf: 'center', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', padding: '10px 16px', borderRadius: 12, fontSize: 12, color: '#ef4444', margin: '10px 0', textAlign: 'center', maxWidth: '90%', fontWeight: 600, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {item.text}
              </motion.div>
            );
          }

          if (item.type === 'dm') {
            const isMeera = item.sender.includes('Meera');
            return (
              <motion.div key={item.id} initial={{ opacity: 0, x: isMeera ? -15 : 15 }} animate={{ opacity: 1, x: 0 }}
                style={{ alignSelf: isMeera ? 'flex-start' : 'flex-end', maxWidth: '80%', background: isMeera ? (isLight ? '#fff' : '#202c33') : (isLight ? '#dcf8c6' : '#005c4b'), borderRadius: isMeera ? '0 8px 8px 8px' : '8px 0 8px 8px', padding: '6px 8px 2px', marginTop: 3, boxShadow: '0 1px 1px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', color: item.color, paddingBottom: 2 }}>{item.sender}</div>
                <div style={{ fontSize: 13, color: isLight ? '#111b21' : '#e9edef' }}>{item.text}</div>
                <div style={{ textAlign: 'right', fontSize: 10, color: colors.dateText, paddingTop: 2 }}>1:30 AM</div>
              </motion.div>
            );
          }

          // Regular group message
          return (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              style={{ alignSelf: 'flex-start', maxWidth: '80%', background: isLight ? '#fff' : '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 8px 2px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', marginTop: 3 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: item.color, paddingBottom: 2 }}>{item.sender}</div>
              <div style={{ fontSize: 13, color: isLight ? '#111b21' : '#e9edef' }}>{item.text}</div>
              <div style={{ textAlign: 'right', fontSize: 10, color: colors.dateText, paddingTop: 2 }}>{timeStr}</div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {typing && typingSender && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ alignSelf: 'flex-start', background: isLight ? '#fff' : '#202c33', borderRadius: '0 8px 8px 8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: '#8696a0', marginRight: 6 }}>{typingSender}</span>
            {[0, 1, 2].map(j => <span key={j} style={{ display: 'inline-block', width: 6, height: 6, background: '#8696a0', borderRadius: '50%', animation: `bounceTyping 0.8s infinite alternate ${j * 0.2}s` }} />)}
          </motion.div>
        )}

        <div ref={endRef} style={{ height: 20 }} />
      </div>

      {/* Locked input */}
      <div style={{ padding: '16px 20px', background: isLight ? '#f0f2f5' : '#202c33', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 20, borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #222e35', color: colors.dateText, fontStyle: 'italic', fontSize: '12.5px' }}>
        <Lock size={13} />
        <span>🔒 narrator controlled · watch the truth unfold</span>
      </div>

      <style>{`@keyframes bounceTyping { 0% { transform:translateY(0); opacity:0.4; } 100% { transform:translateY(-4px); opacity:1; } }`}</style>
    </div>
  );
}
