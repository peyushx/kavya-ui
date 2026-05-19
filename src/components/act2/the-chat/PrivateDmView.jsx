import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, Lock } from 'lucide-react';

const DM_CONFIGS = {
  'Jiya 🧸': {
    color: '#eb5528',
    avatar: '🧸',
    bgLight: '#ffe4e6',
    bgDark: '#201214',
    bubbleColorLight: '#fecdd3',
    bubbleColorDark: '#501c24',
    bubbleTextColorLight: '#111b21',
    bubbleTextColorDark: '#ffd2d7',
    startMessage: "hey... i know you're looking into what happened. i just want you to know i would never leak my own vulnerable moment. that message was hard for me to send. 🥺",
    steps: [
      {
        options: [
          "you were online at 3am though. right when it leaked.",
          "i believe you. but i have to ask everyone."
        ],
        responses: [
          "i came online BECAUSE of the leak. i got a text from someone saying \"yo did you really say that in a group chat\" and i panicked and opened the group to check. i wish i never sent that message in the first place 😭",
          "i get it. honestly i've been trying to figure it out too. it really hurt. whoever did it saw me be vulnerable and used it as entertainment. that's not a friend."
        ]
      },
      {
        options: [
          "do you suspect anyone?",
          "who else knew about what you shared?"
        ],
        responses: [
          "i don't want to accuse anyone without proof. but... idk. i just feel like someone in the group isn't who they pretend to be. i can feel it. 🥺",
          "only the group. i didn't tell anyone else. that's why it hurts so much. it HAD to come from one of us four. there's no other way."
        ]
      }
    ]
  },
  'Arjun 😎': {
    color: '#64748b',
    avatar: '😎',
    bgLight: '#dbeafe',
    bgDark: '#121921',
    bubbleColorLight: '#bfdbfe',
    bubbleColorDark: '#1e304a',
    bubbleTextColorLight: '#111b21',
    bubbleTextColorDark: '#d2e4ff',
    startMessage: "yo what's up",
    steps: [
      {
        options: [
          "bro this is serious. someone leaked jiya's message.",
          "you barely talk in the group but you read everything. why?"
        ],
        responses: [
          "yeah that's messed up. but idk why you're asking me i literally had the group on mute. i didn't even see her message until today when everyone started fighting lol",
          "bro i'm in like 200 groups. i don't read anything in any of them. i just open whatsapp to reply to my mom and accidentally see stuff. i didn't even know there was drama until you texted me just now."
        ]
      },
      {
        options: [
          "your about says 'i mind my own business.' kinda sounds like something a guilty person would say.",
          "if it wasn't you then who do you think it was?"
        ],
        responses: [
          "bro that bio has been there since 2021. i put it because my ex kept checking my phone. it's not that deep 😭 you're reading into a whatsapp bio like it's a confession letter",
          "honestly? no idea. i don't pay enough attention to this group to have theories. but if i had to guess... whoever did it probably acts the most normal about it. the loudest person in the room isn't always the guilty one bro. sometimes it's the quiet one. or the one asking all the questions 👀"
        ]
      }
    ]
  },
  'Meera 💅': {
    color: '#ec4899',
    avatar: '💅',
    bgLight: '#fae8ff',
    bgDark: '#1e111d',
    bubbleColorLight: '#f5d0fe',
    bubbleColorDark: '#441d45',
    bubbleTextColorLight: '#111b21',
    bubbleTextColorDark: '#ffd1ff',
    startMessage: "FINALLY. i've been waiting for someone to ask me about this. ok so i have thoughts. 💅",
    steps: [
      {
        options: [
          "you changed your profile pic right after the drama. why?",
          "you run a literal gossip group at work. how do we know you didn't leak this too?"
        ],
        responses: [
          "bestie i change my pfp every 3 days. go check my profile history. i posted a selfie because the lighting in my room was insane that night. i'm not gonna NOT post a good selfie because of group chat drama. my skin was glowing. priorities. 💅",
          "ok first of all. office gossip is about STRANGERS. random people from work. i would never EVER leak something personal from my close friends. there's a difference between \"rahul from marketing is dating someone\" and \"my best friend opened up about her insecurities.\" i'm not a monster. i'm just well-informed. 💅"
        ]
      },
      {
        options: [
          "you said you know who did it. tell me.",
          "if you had to swear on your skincare collection. was it you?"
        ],
        responses: [
          [
            "i said i have a FEELING. i don't have proof. and i'm not about to accuse someone without receipts. that's messy and i'm not messy. i'm strategic. 💅",
            "but i will say this. sometimes the person investigating the crime is the one who committed it. just something to think about bestie. 🤷‍♀️"
          ],
          [
            "ON MY SKINCARE COLLECTION?? that's the most serious oath i can take. on my serums. on my retinol. on my ₹3000 moisturizer. it was NOT me. 💅",
            "but someone in this group knows exactly what they did. and they're pretending really hard right now. really. hard."
          ]
        ]
      }
    ]
  }
};

export default function PrivateDmView({ suspect, isLight, colors, onClose, onComplete }) {
  const config = DM_CONFIGS[suspect] || DM_CONFIGS['Jiya 🧸'];
  
  const [step, setStep] = useState(() => {
    return parseInt(localStorage.getItem(`kavvs_dm_step_${suspect}`)) || 0;
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isReady, setIsReady] = useState(() => {
    const saved = localStorage.getItem(`kavvs_dm_history_${suspect}`);
    return saved ? true : false;
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`kavvs_dm_history_${suspect}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`kavvs_dm_history_${suspect}`, JSON.stringify(messages));
    }
  }, [messages, suspect]);

  useEffect(() => {
    localStorage.setItem(`kavvs_dm_step_${suspect}`, step.toString());
  }, [step, suspect]);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      setIsReady(true);
      return;
    }

    if (suspect === 'Arjun 😎') {
      setIsTyping(true);
      
      // Cycle 1: type for 1.2s, off for 0.8s
      setTimeout(() => {
        setIsTyping(false);
        
        // Cycle 2: type for 1.2s, off for 0.8s
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            
            // Cycle 3: type for 1.5s, then deliver!
            setTimeout(() => {
              setIsTyping(true);
              
              setTimeout(() => {
                setIsTyping(false);
                setMessages([
                  {
                    id: 'init-msg',
                    sender: suspect,
                    text: config.startMessage,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isIncoming: true
                  }
                ]);
                setIsReady(true);
              }, 1500);
            }, 800);
          }, 1200);
        }, 800);
      }, 1200);
    } else if (suspect === 'Meera 💅') {
      // Meera responds instantly (500ms delay)
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 'init-msg',
            sender: suspect,
            text: config.startMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isIncoming: true
          }
        ]);
        setIsReady(true);
      }, 500);
    } else {
      // For Jiya & Meera, standard organic 1.2s single delay
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 'init-msg',
            sender: suspect,
            text: config.startMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isIncoming: true
          }
        ]);
        setIsReady(true);
      }, 1200);
    }
  }, [suspect]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectOption = (question, optionIdx) => {
    // 1. Append User Question
    const userMsg = {
      id: `user-q-${step}`,
      sender: 'You 🫵',
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIncoming: false
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Suspect responds after a typing delay
    setTimeout(() => {
      setIsTyping(false);
      const response = config.steps[step].responses[optionIdx];
      
      if (Array.isArray(response)) {
        // Handle dual-message response sequence
        const suspectMsg1 = {
          id: `suspect-r-${step}-1`,
          sender: suspect,
          text: response[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isIncoming: true
        };
        setMessages(prev => [...prev, suspectMsg1]);
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const suspectMsg2 = {
            id: `suspect-r-${step}-2`,
            sender: suspect,
            text: response[1],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isIncoming: true
          };
          setMessages(prev => [...prev, suspectMsg2]);
          advanceStep();
        }, 1800);
      } else {
        const suspectMsg = {
          id: `suspect-r-${step}`,
          sender: suspect,
          text: response,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isIncoming: true
        };
        setMessages(prev => [...prev, suspectMsg]);
        advanceStep();
      }
    }, 1200);
  };

  const advanceStep = () => {
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep === 2) {
      onComplete();
    }
  };

  const handleResetLoopOption = () => {
    const userMsg = {
      id: `user-loop-${Date.now()}`,
      sender: 'You 🫵',
      text: "i need more details",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIncoming: false
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const suspectMsg = {
        id: `suspect-loop-yes-${Date.now()}`,
        sender: suspect,
        text: "yes ?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isIncoming: true
      };
      setMessages(prev => [...prev, suspectMsg]);
      setStep(0);
    }, 1200);
  };

  const currentBg = isLight ? config.bgLight : config.bgDark;
  const currentBubbleColor = isLight ? config.bubbleColorLight : config.bubbleColorDark;
  const currentBubbleTextColor = isLight ? config.bubbleTextColorLight : config.bubbleTextColorDark;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: currentBg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif",
      transition: 'background 0.3s ease'
    }}>
      {/* DM Header */}
      <div style={{
        padding: '12px 16px',
        background: isLight ? '#f0f2f5' : '#202c33',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35'
      }}>
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: isLight ? '#54656f' : '#aebac1',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: config.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: 'white',
          border: '1.5px solid rgba(255,255,255,0.2)'
        }}>
          {config.avatar}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>
            {suspect}
          </h4>
          <span style={{ fontSize: '11px', color: isTyping ? '#00a884' : colors.dateText, fontWeight: isTyping ? 600 : 400 }}>
            {isTyping ? 'typing...' : 'online'}
          </span>
        </div>

        <div style={{ fontSize: '11px', color: '#ec4899', background: 'rgba(236,72,153,0.1)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Lock size={10} />
          <span>CONFIDENTIAL DM</span>
        </div>
      </div>

      {/* Message Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        zIndex: 15
      }}>
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  alignSelf: 'center',
                  background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  color: isLight ? '#54656f' : '#8696a0',
                  margin: '12px 0',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.02)',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  textAlign: 'center',
                  border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                {msg.text}
              </motion.div>
            );
          }

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.isIncoming ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                alignSelf: msg.isIncoming ? 'flex-start' : 'flex-end',
                maxWidth: '75%',
                background: msg.isIncoming ? currentBubbleColor : colors.bubbleOutgoing,
                color: msg.isIncoming ? currentBubbleTextColor : colors.bubbleOutgoingText,
                borderRadius: msg.isIncoming ? '0 8px 8px 8px' : '8px 0 8px 8px',
                padding: '8px 12px 4px 12px',
                boxShadow: '0 1.5px 3px rgba(0,0,0,0.15)',
                marginTop: '4px'
              }}
            >
              <div style={{ fontSize: '13.5px', lineHeight: '1.4' }}>
                {msg.text}
              </div>
              <div style={{ 
                textAlign: 'right', 
                fontSize: '9.5px', 
                color: msg.isIncoming ? (isLight ? '#54656f' : '#a2aeb5') : colors.dateText, 
                paddingTop: '3px',
                opacity: 0.8
              }}>
                {msg.time}
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              alignSelf: 'flex-start',
              background: currentBubbleColor,
              borderRadius: '0 8px 8px 8px',
              padding: '10px 14px',
              boxShadow: '0 1.5px 3px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '4px'
            }}
          >
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: isLight ? '#54656f' : '#a2aeb5', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate' }} />
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: isLight ? '#54656f' : '#a2aeb5', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate 0.2s' }} />
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: isLight ? '#54656f' : '#a2aeb5', borderRadius: '50%', animation: 'bounceTyping 0.8s infinite alternate 0.4s' }} />
          </motion.div>
        )}

        <div ref={chatEndRef} style={{ height: '30px' }} />
      </div>

      {/* Quick Replies / Options footer panel */}
      <div style={{
        padding: '16px',
        background: isLight ? '#f0f2f5' : '#202c33',
        borderTop: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        zIndex: 20
      }}>
        {step < 2 ? (
          isReady ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: colors.dateText, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '4px', textAlign: 'center' }}>
                Select a response privately 💬
              </span>
              {config.steps[step].options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, backgroundColor: isLight ? '#ffffff' : '#2a3942' }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isTyping}
                  onClick={() => handleSelectOption(opt, idx)}
                  style={{
                    width: '100%',
                    background: isLight ? '#ffffff' : '#1f2c34',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid #2d383f',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    textAlign: 'left',
                    color: isLight ? '#111b21' : '#e9edef',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: isTyping ? 'not-allowed' : 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    opacity: isTyping ? 0.6 : 1
                  }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{opt}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              padding: '12px 0',
              color: colors.dateText,
              fontStyle: 'italic',
              fontSize: '12px',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              <span>⚡ establishing secure connection line...</span>
            </div>
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: isLight ? '#ffffff' : '#2a3942' }}
              whileTap={{ scale: 0.99 }}
              disabled={isTyping}
              onClick={() => handleResetLoopOption()}
              style={{
                width: '100%',
                background: isLight ? '#ffffff' : '#1f2c34',
                border: isLight ? '1px solid #cbd5e1' : '1px solid #2d383f',
                borderRadius: '12px',
                padding: '12px 14px',
                textAlign: 'left',
                color: isLight ? '#111b21' : '#e9edef',
                fontSize: '13px',
                fontWeight: 500,
                cursor: isTyping ? 'not-allowed' : 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                opacity: isTyping ? 0.6 : 1
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>i need more details</span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
