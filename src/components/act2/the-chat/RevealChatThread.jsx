import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// CORRECT ANSWER — MEERA 💅
// ═══════════════════════════════════════════════════════
const MEERA_CORRECT = [
  { type: 'system', text: '🔔 THE DETECTIVE HAS SPOKEN. AND THEY\'RE RIGHT. 💀' },
  { sender: 'Meera 💅', color: '#ec4899', text: '...' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'ok FINE' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'yes it was me' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'BUT in my defense' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'here we go' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i was on a call with sneha and i was telling her how i felt bad for jiya' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'and sahil was in the room and he OVERHEARD' },
  { sender: 'Meera 💅', color: '#ec4899', text: "i didn't SEND anything. i SAID it. out loud. like a person. with a mouth." },
  { sender: 'Meera 💅', color: '#ec4899', text: 'is talking a crime now??' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'meera. you literally said "ur secrets are safe with me pinky promise 🤞"' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'and they WERE safe' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'from my PHONE' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'my mouth is a separate department' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i cannot control all departments at once 💅' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'departments 💀' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'MEERA' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'ok ok i\'m sorry 🥺' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i really am' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i wasn\'t trying to gossip i was genuinely worried about you' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'but i should\'ve just talked to YOU directly' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'i\'m sorry jiya 💖' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: '...' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'you\'re lucky i love you idiot 😭💖' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'so can i go back to sleep now' },
  { sender: 'Meera 💅', color: '#ec4899', text: 'ARJUN' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'what. the case is solved. i\'m tired.' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'goodnight everyone' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'also i want it on record that i was innocent the whole time' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'remember this day. the day arjun did nothing wrong.' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'that\'s literally every day you do nothing 😭' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'exactly. consistent. 😎' },
  { type: 'system', text: '🔔 case closed. you cracked it bestie. 🔍✨' },
];

// ═══════════════════════════════════════════════════════
// WRONG ANSWER — JIYA 🧸
// ═══════════════════════════════════════════════════════
const JIYA_WRONG = [
  { sender: 'Jiya 🧸', color: '#eb5528', text: 'ME??' },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "i'm literally the VICTIM here 😭" },
  { sender: 'Jiya 🧸', color: '#eb5528', text: "that's like accusing the pizza of eating itself" },
  { sender: 'Arjun 😎', color: '#64748b', text: 'lol' },
  { type: 'system', text: '🔔 yeah... that\'s not it bestie 💀' },
  { type: 'system', text: '🔔 let me walk you through what you missed.' },
];

// ═══════════════════════════════════════════════════════
// WRONG ANSWER — ARJUN 😎
// ═══════════════════════════════════════════════════════
const ARJUN_WRONG = [
  { sender: 'Arjun 😎', color: '#64748b', text: 'bro' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'i was asleep' },
  { sender: 'Arjun 😎', color: '#64748b', text: "i'm literally always asleep" },
  { sender: 'Arjun 😎', color: '#64748b', text: "i didn't even know jiya sent a message until today" },
  { sender: 'Arjun 😎', color: '#64748b', text: 'i have this group on mute for 1 year' },
  { sender: 'Arjun 😎', color: '#64748b', text: 'ONE YEAR' },
  { type: 'system', text: '🔔 yeah... that\'s not it bestie 💀' },
  { type: 'system', text: '🔔 let me walk you through what you missed.' },
];

// ═══════════════════════════════════════════════════════
// CLUES FOR PISHU'S PRIVATE CHAT (wrong answers)
// ═══════════════════════════════════════════════════════
export const JIYA_CLUES = [
  "clue 1: meera's office gossip group. she said 'what happens in this group stays in this group' and then told the entire office. she literally has a track record. 👀",
  "clue 2: meera's about says 'ur secrets are safe with me pinky promise 🤞'. that pinky promise lasted 48 hours last time. pattern bestie. pattern. 💀",
  "clue 3: during interrogation meera said 'i have a feeling i know who did it.' she KNEW because SHE did it. she was testing if YOU knew. 💅",
  "clue 4: meera has 3 documents shared in the group. 11 starred messages. 12 groups. she collects information like pokemon cards. 👀",
  "meanwhile jiya? she begged people not to share her notes outside the college group. she RESPECTS boundaries. she would never leak her own vulnerable moment. 🥺",
  "you got the wrong person but honestly the clues were tricky. want to replay and catch them this time? 🔍",
];

export const ARJUN_CLUES = [
  "clue 1: arjun's last seen was YESTERDAY. the leak happened at 2:45 AM today. he wasn't even online. he was in bed. like always. 😴",
  "clue 2: arjun has shared 2 photos in the ENTIRE group history. this man doesn't engage. he definitely doesn't screenshot. that requires effort. 💀",
  "clue 3: arjun has the group muted for 1 year. starred messages: 0. he doesn't care enough about this group to betray it. you need to care first to betray. 😭",
  "clue 4: meera on the other hand has 11 starred messages, 3 documents, runs a gossip group, and broke a pinky promise in 48 hours. the evidence was RIGHT THERE bestie. 👀",
  "you picked the sleepiest, most unbothered person in the group 😭 want to try again? 🔍",
];

export default function RevealChatThread({ chosenSuspect, isLight, colors, onComplete, onWrongAnswer }) {
  const [allItems, setAllItems] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingSender, setTypingSender] = useState(null);
  const [scriptIndex, setScriptIndex] = useState(0);
  const endRef = useRef(null);

  const isCorrect = chosenSuspect === 'Meera 💅';

  const fullScript = useMemo(() => {
    if (isCorrect) return MEERA_CORRECT;
    if (chosenSuspect === 'Jiya 🧸') return JIYA_WRONG;
    return ARJUN_WRONG;
  }, [chosenSuspect]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allItems, typing]);

  useEffect(() => {
    if (scriptIndex >= fullScript.length) {
      if (isCorrect) {
        const t = setTimeout(() => { if (onComplete) onComplete(); }, 5000);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { if (onWrongAnswer) onWrongAnswer(chosenSuspect); }, 2500);
        return () => clearTimeout(t);
      }
      return;
    }

    const item = fullScript[scriptIndex];
    const isSystem = item.type === 'system';
    const delay = isSystem ? 3500 : (1800 + Math.random() * 1000);

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
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{isCorrect ? '🎉' : '🔍'}</div>
        <div>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>{isCorrect ? 'case closed 🎉' : 'the reveal 🔍'}</h4>
          <span style={{ fontSize: 11, color: colors.dateText }}>Jiya 🧸, Arjun 😎, Meera 💅, You 🫵</span>
        </div>
      </div>

      {/* Chat body */}
      <div data-lenis-prevent onWheel={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()}
        style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', zIndex: 15 }}>

        <div style={{ alignSelf: 'center', background: colors.dateBg, padding: '4px 10px', borderRadius: 8, fontSize: 11, color: colors.dateText, marginBottom: 10 }}>TODAY</div>

        {allItems.map((item) => {
          if (item.type === 'system') {
            return (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ alignSelf: 'center', background: colors.dateBg, padding: '6px 14px', borderRadius: 8, fontSize: 12, color: item.text.includes('RIGHT') || item.text.includes('cracked') ? '#22c55e' : colors.dateText, fontWeight: item.text.includes('RIGHT') || item.text.includes('cracked') ? 600 : 400, margin: '6px 0', textAlign: 'center', maxWidth: '85%' }}>
                {item.text}
              </motion.div>
            );
          }

          return (
            <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              style={{ alignSelf: 'flex-start', maxWidth: '80%', background: isLight ? '#fff' : '#202c33', borderRadius: '0 8px 8px 8px', padding: '6px 8px 2px', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', marginTop: 3 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: item.color, paddingBottom: 2 }}>{item.sender}</div>
              <div style={{ fontSize: 13, color: isLight ? '#111b21' : '#e9edef' }}>{item.text}</div>
              <div style={{ textAlign: 'right', fontSize: 10, color: colors.dateText, paddingTop: 2 }}>{timeStr}</div>
            </motion.div>
          );
        })}

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
