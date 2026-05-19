import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoCallScreen from './VideoCallScreen';
import GroupInfoView from './GroupInfoView';
import LeftSidebar from './LeftSidebar';
import ChatThread from './ChatThread';
import SyncDialogs from './SyncDialogs';
import NarratorOverlay from './NarratorOverlay';
import ContactInfoView from './ContactInfoView';

export default function WhatsAppUI({ theme, onNext }) {
  const isLight = theme === 'light';
  
  const colors = {
    headerBg: isLight ? '#075E54' : '#1f2c34',
    headerText: '#ffffff',
    bg: isLight ? '#efeae2' : '#0b141a',
    bubbleIncoming: isLight ? '#ffffff' : '#202c33',
    bubbleIncomingText: isLight ? '#111b21' : '#e9edef',
    bubbleOutgoing: isLight ? '#dcf8c6' : '#005c4b',
    bubbleOutgoingText: isLight ? '#111b21' : '#e9edef',
    dateText: isLight ? '#54656f' : '#8696a0',
    dateBg: isLight ? 'rgba(255,255,255,0.8)' : 'rgba(32,44,51,0.8)'
  };

  const defaultMessages = [
    {
      id: 'msg-1',
      sender: 'Pishu ✨',
      type: 'image_leak',
      text: 'guys someone sent this to me... is this true?!',
      time: '10:14 AM',
      senderColor: '#34b7f1',
      isIncoming: true
    },
    {
      id: 'msg-2',
      sender: 'Riya 🧸',
      type: 'text',
      text: 'omg wait who screenshotted my chat?? 😡',
      time: '10:15 AM',
      senderColor: '#eb5528',
      isIncoming: true
    }
  ];

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('kavvs_whatsapp_history');
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  const endRef = useRef(null);
  const isStalkingUnlocked = localStorage.getItem('kavvs_stalking_unlocked') === 'true';
  const [view, setView] = useState(isStalkingUnlocked ? 'info' : 'chat');
  const [showNarrator, setShowNarrator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFavourite, setIsFavourite] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [syncErrorState, setSyncErrorState] = useState(null); // null, 'loading', 'error', 'narrator'
  const [syncAttempts, setSyncAttempts] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null); // null, 'Riya 🧸', 'Arjun 😎', 'Meera 💅', 'You 🫵'

  const [typingAttempt, setTypingAttempt] = useState(() => {
    return Number(localStorage.getItem('kavvs_typing_attempt') || '0');
  });
  const [inputLockedState, setInputLockedState] = useState(() => {
    return localStorage.getItem('kavvs_input_lock_state') || 'initial'; // 'initial', 'unlocked_for_one', 'revoked'
  });
  const [inputText, setInputText] = useState('');
  const [isShakingInput, setIsShakingInput] = useState(false);
  const [narratorTyping, setNarratorTyping] = useState(false);
  const [typingToast, setTypingToast] = useState(null);

  const showTypingToast = (text) => {
    setTypingToast(text);
    setTimeout(() => {
      setTypingToast(null);
    }, 4500);
  };

  useEffect(() => {
    localStorage.setItem('kavvs_typing_attempt', typingAttempt.toString());
  }, [typingAttempt]);

  useEffect(() => {
    localStorage.setItem('kavvs_input_lock_state', inputLockedState);
  }, [inputLockedState]);

  const handleTypeSendSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    if (inputLockedState === 'revoked') {
      showTypingToast("typing privileges revoked 🔒 you lost them. you did this to yourself.");
      setInputText('');
      return;
    }

    if (inputLockedState === 'initial') {
      const nextAttempt = typingAttempt + 1;
      setTypingAttempt(nextAttempt);

      if (nextAttempt === 1) {
        const tempId = `temp-${Date.now()}`;
        const newMsg = {
          id: tempId,
          sender: 'You',
          type: 'text',
          text: inputText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isIncoming: false
        };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        setTimeout(() => {
          setMessages(prev => prev.filter(m => m.id !== tempId));
          showTypingToast("this is a crime scene bestie. you don't get to talk. you OBSERVE 🔍");
        }, 500);
      } 
      else if (nextAttempt === 2) {
        setIsShakingInput(true);
        setInputText('');
        setTimeout(() => {
          setIsShakingInput(false);
        }, 500);
        showTypingToast("did i stutter? no texting during an investigation 🚫");
      } 
      else if (nextAttempt >= 3) {
        setInputText('');
        if (document.activeElement) {
          document.activeElement.blur();
        }
        setNarratorTyping(true);
        setTimeout(() => {
          setNarratorTyping(false);
          showTypingToast("you're really persistent huh. fine. i'll allow one message.");
          setInputLockedState('unlocked_for_one');
        }, 2000);
      }
    } 
    else if (inputLockedState === 'unlocked_for_one') {
      const myText = inputText;
      const myMsg = {
        id: `user-msg-${Date.now()}`,
        sender: 'You',
        type: 'text',
        text: myText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isIncoming: false
      };
      setMessages(prev => [...prev, myMsg]);
      setInputText('');
      setInputLockedState('revoked');

      setTimeout(() => {
        const riyaMsg = {
          id: `resp-riya-${Date.now()}`,
          sender: 'Riya 🧸',
          type: 'text',
          text: "what??",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderColor: '#eb5528',
          isIncoming: true
        };
        setMessages(prev => [...prev, riyaMsg]);
      }, 1500);

      setTimeout(() => {
        const arjunMsg = {
          id: `resp-arjun-${Date.now()}`,
          sender: 'Arjun 😎',
          type: 'text',
          text: "bro what",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderColor: '#64748b',
          isIncoming: true
        };
        setMessages(prev => [...prev, arjunMsg]);
      }, 3000);

      setTimeout(() => {
        const meeraMsg = {
          id: `resp-meera-${Date.now()}`,
          sender: 'Meera 💅',
          type: 'text',
          text: "bestie that made no sense 😭",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderColor: '#ec4899',
          isIncoming: true
        };
        setMessages(prev => [...prev, meeraMsg]);
      }, 4500);

      setTimeout(() => {
        showTypingToast("yeah they didn't understand you. honestly neither did i. stick to the investigation 💀");
      }, 6000);
    }
  };

  const handleShowSyncError = () => {
    if (syncErrorState === 'loading') return;
    setSyncErrorState('loading');
    setTimeout(() => {
      setSyncErrorState('error');
      setSyncAttempts(prev => prev + 1);
    }, 1200);
  };

  // Scroll instantly on initial mount
  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'auto' });
    }, 100);
  }, []);

  // Scroll smoothly when messages are updated
  useEffect(() => {
    localStorage.setItem('kavvs_whatsapp_history', JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isStalkingUnlocked) return;
    const timer = setTimeout(() => {
      setShowNarrator(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, [isStalkingUnlocked]);

  const handleAppendCallLog = (duration) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logMessage = {
      id: `call-log-${Date.now()}`,
      sender: 'System',
      type: 'call_log',
      duration: duration,
      text: `Group video call (${duration}s)`,
      time: nowStr,
      isIncoming: false
    };
    setMessages(prev => [...prev, logMessage]);
  };

  const mockChats = [
    { 
      name: 'The Baddies 💅', 
      message: messages[messages.length - 1]?.text || 'guys someone sent this to me... is this true?!', 
      time: messages[messages.length - 1]?.time || '10:14 AM', 
      avatar: '👥', 
      color: '#64748b', 
      isGroup: true, 
      selected: true 
    }
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: colors.bg,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes shakeInputBar {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes bounceTyping {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes spinFan {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* 1. Left Sidebar Component */}
      <LeftSidebar
        isLight={isLight}
        colors={colors}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        isFavourite={isFavourite}
        mockChats={mockChats}
        setView={setView}
        view={view}
      />

      {/* 2. Middle Panel (Conversation Frame) Component */}
      <ChatThread
        messages={messages}
        isLight={isLight}
        colors={colors}
        handleShowSyncError={handleShowSyncError}
        isStalkingUnlocked={isStalkingUnlocked}
        narratorTyping={narratorTyping}
        endRef={endRef}
        handleTypeSendSubmit={handleTypeSendSubmit}
        isShakingInput={isShakingInput}
        inputLockedState={inputLockedState}
        showTypingToast={showTypingToast}
        inputText={inputText}
        setInputText={setInputText}
        setView={setView}
        view={view}
        setIsVideoCallActive={setIsVideoCallActive}
        typingToast={typingToast}
        onSelectMember={(name) => {
          setSelectedContact(name);
          setView('info');
        }}
      />

      {/* 3. Right Panel (Group Info / Contact Info Sidebar) Component */}
      <AnimatePresence>
        {view === 'info' && (
          selectedContact ? (
            <ContactInfoView
              key="contact-info"
              memberName={selectedContact}
              isLight={isLight}
              colors={colors}
              onClose={() => setSelectedContact(null)}
            />
          ) : (
            <GroupInfoView 
              key="group-info" 
              colors={colors} 
              isLight={isLight} 
              setView={setView} 
              onNext={onNext} 
              isFavourite={isFavourite}
              setIsFavourite={setIsFavourite}
              onSelectMember={(name) => setSelectedContact(name)}
            />
          )
        )}
      </AnimatePresence>

      {/* 4. Fullscreen Group Video Call Screen Overlay */}
      <AnimatePresence>
        {isVideoCallActive && (
          <VideoCallScreen
            isLight={isLight} 
            onClose={(duration) => {
              setIsVideoCallActive(false);
              if (duration !== undefined && duration > 0) {
                handleAppendCallLog(duration);
              }
            }} 
          />
        )}
      </AnimatePresence>

      {/* Narrator Overlay Component */}
      <AnimatePresence>
        <NarratorOverlay
          showNarrator={showNarrator}
          setShowNarrator={setShowNarrator}
        />
      </AnimatePresence>

      {/* WhatsApp Hacking / Sync Error Simulators Component */}
      <AnimatePresence>
        <SyncDialogs
          syncErrorState={syncErrorState}
          setSyncErrorState={setSyncErrorState}
          syncAttempts={syncAttempts}
          setSyncAttempts={setSyncAttempts}
          handleShowSyncError={handleShowSyncError}
          isLight={isLight}
        />
      </AnimatePresence>
    </div>
  );
}
