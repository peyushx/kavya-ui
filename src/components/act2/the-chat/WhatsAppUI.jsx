import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoCallScreen from './VideoCallScreen';
import GroupInfoView from './GroupInfoView';
import LeftSidebar from './LeftSidebar';
import ChatThread from './ChatThread';
import SyncDialogs from './SyncDialogs';
import ContactInfoView from './ContactInfoView';
import GroupPreviewThread from './GroupPreviewThread';
import { GroupPreviewInfoView } from './GroupPreviewInfoView';
import PrivateDmView from './PrivateDmView';
import RevealChatThread, { JIYA_CLUES, ARJUN_CLUES } from './RevealChatThread';
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
      sender: 'Jiya 🧸',
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
  const [isStalkingUnlocked, setIsStalkingUnlocked] = useState(() => {
    return localStorage.getItem('kavvs_stalking_unlocked') === 'true';
  });
  const [view, setView] = useState(() => {
    const unlocked = localStorage.getItem('kavvs_stalking_unlocked') === 'true';
    return unlocked ? 'info' : 'chat';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('kavvs_favourites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [syncErrorState, setSyncErrorState] = useState(null); // null, 'loading', 'error', 'narrator'
  const [syncAttempts, setSyncAttempts] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null); // null, 'Jiya 🧸', 'Arjun 😎', 'Meera 💅', 'You 🫵'
  
  const [activeSidebarGroup, setActiveSidebarGroup] = useState(null);
  const [narratorComment, setNarratorComment] = useState(null);

  const [activeChatId, setActiveChatId] = useState('besties');
  const [pishuMessages, setPishuMessages] = useState(() => {
    const saved = localStorage.getItem('kavvs_pishu_messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kavvs_pishu_messages', JSON.stringify(pishuMessages));
  }, [pishuMessages]);

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

  const [exploredSuspects, setExploredSuspects] = useState(() => {
    const saved = localStorage.getItem('kavvs_explored_suspects');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedDms, setCompletedDms] = useState(() => {
    const saved = localStorage.getItem('kavvs_completed_dms');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeDmSuspect, setActiveDmSuspect] = useState(null);
  const [revealSuspect, setRevealSuspect] = useState(null);

  const [narratorDmAlertTriggered, setNarratorDmAlertTriggered] = useState(() => {
    return localStorage.getItem('kavvs_narrator_dm_alert_triggered') === 'true';
  });

  // Suspect Exploration tracking
  useEffect(() => {
    const handleExploredChanged = () => {
      const saved = localStorage.getItem('kavvs_explored_suspects');
      if (saved) {
        setExploredSuspects(JSON.parse(saved));
      }
    };
    window.addEventListener('kavvs_explored_changed', handleExploredChanged);
    return () => window.removeEventListener('kavvs_explored_changed', handleExploredChanged);
  }, []);

  // Alert Trigger when all 3 profiles explored
  useEffect(() => {
    if (exploredSuspects.length === 3 && !narratorDmAlertTriggered) {
      const alertMsg = {
        id: 'pishu-alert-1',
        sender: 'Pishu ✨',
        type: 'text',
        text: "ok you've done your research. now let's hear what they have to say. tap on anyone to DM them privately 💬",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderColor: '#ef4444',
        isIncoming: true
      };

      setPishuMessages(prev => {
        const hasAlert = prev.some(m => m.id === 'pishu-alert-1');
        if (hasAlert) return prev;
        return [...prev, alertMsg];
      });

      localStorage.setItem('kavvs_pishu_unread', 'true');
      setNarratorDmAlertTriggered(true);
      localStorage.setItem('kavvs_narrator_dm_alert_triggered', 'true');
    }
  }, [exploredSuspects, narratorDmAlertTriggered]);

  const handleDmComplete = (suspectName) => {
    setCompletedDms(prev => {
      const next = prev.includes(suspectName) ? prev : [...prev, suspectName];
      localStorage.setItem('kavvs_completed_dms', JSON.stringify(next));
      
      // If all 3 suspects are DMed, post the final prompt in Pishu's chat history and trigger progression!
      if (next.length === 3) {
        setTimeout(() => {
          const finalMsg = {
            id: 'pishu-alert-2',
            sender: 'Pishu ✨',
            type: 'text',
            text: "you've seen the profiles. you've read the evidence. you've heard their side. time to make your call.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderColor: '#ef4444',
            isIncoming: true
          };
          
          setPishuMessages(prev => {
            const hasAlert = prev.some(m => m.id === 'pishu-alert-2');
            if (hasAlert) return prev;
            return [...prev, finalMsg];
          });

          localStorage.setItem('kavvs_pishu_unread', 'true');
        }, 1500);
      }
      
      return next;
    });
  };

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
    localStorage.setItem('kavvs_favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('kavvs_input_lock_state', inputLockedState);
  }, [inputLockedState]);

  const handleToggleFavourite = (groupId) => {
    if (favourites.includes(groupId)) {
      setFavourites(favourites.filter(id => id !== groupId));
    } else {
      setFavourites([...favourites, groupId]);
    }
  };

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
          // Mark the message as deleted by admin
          setMessages(prev => prev.map(m => m.id === tempId ? { ...m, deleted: true } : m));
          
          // Trigger Pishu's typing animation
          setNarratorTyping(true);

          setTimeout(() => {
            setNarratorTyping(false);
            const pishuMsg = {
              id: `pishu-${Date.now()}`,
              sender: 'Pishu ✨',
              type: 'text',
              text: "this is a crime scene bestie. you don't get to talk. you OBSERVE 🔍",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              senderColor: '#34b7f1',
              isIncoming: true
            };
            setMessages(prev => [...prev, pishuMsg]);
          }, 2000);
        }, 1200);
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
        const jiyaMsg = {
          id: `resp-jiya-${Date.now()}`,
          sender: 'Jiya 🧸',
          type: 'text',
          text: "what??",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          senderColor: '#eb5528',
          isIncoming: true
        };
        setMessages(prev => [...prev, jiyaMsg]);
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
    if (!isStalkingUnlocked) {
      // Check if pishuMessages already has the initial message
      const alreadySent = pishuMessages.some(m => m.id === 'pishu-initial-detective-hat');
      if (!alreadySent) {
        const timer = setTimeout(() => {
          const initMsg = {
            id: 'pishu-initial-detective-hat',
            sender: 'Pishu ✨',
            type: 'text',
            text: "Alright baddie, time to put on your detective hat 🕵️‍♀️. Tap the group info above and stalk every single member. Check their bios. Check their last seens. Find out who leaked it. Trust NO ONE. 💅",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            senderColor: '#ef4444',
            isIncoming: true
          };
          setPishuMessages(prev => [...prev, initMsg]);
          localStorage.setItem('kavvs_pishu_unread', 'true');
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [isStalkingUnlocked, pishuMessages]);

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

  const getSuspectLastMessage = (suspectName) => {
    const saved = localStorage.getItem(`kavvs_dm_history_${suspectName}`);
    if (saved) {
      const msgs = JSON.parse(saved);
      if (msgs.length > 0) {
        return msgs[msgs.length - 1].text;
      }
    }
    return completedDms.includes(suspectName)
      ? (suspectName === 'Jiya 🧸'
          ? "i don't want to accuse anyone without proof. 🧸"
          : suspectName === 'Arjun 😎'
          ? 'i mind my own business. 😎'
          : 'office gossip is about STRANGERS. 💅')
      : 'Tap to start private DM 💬';
  };

  const getSuspectLastTime = (suspectName) => {
    const saved = localStorage.getItem(`kavvs_dm_history_${suspectName}`);
    if (saved) {
      const msgs = JSON.parse(saved);
      if (msgs.length > 0) {
        return msgs[msgs.length - 1].time;
      }
    }
    return completedDms.includes(suspectName) ? 'DMed' : '';
  };

  const showSuspectDmsInSidebar = exploredSuspects.length === 3 || narratorDmAlertTriggered;

  const mockChats = [
    { 
      id: 'active',
      name: localStorage.getItem('kavvs_group_name') || 'besties only 💀🫶', 
      message: messages[messages.length - 1]?.text || 'guys someone sent this to me... is this true?!', 
      time: messages[messages.length - 1]?.time || '10:14 AM', 
      avatar: '👥', 
      color: '#0d9488', 
      isGroup: true, 
      selected: activeSidebarGroup === null && activeChatId === 'besties' && !activeDmSuspect,
      isMain: true,
      chatId: 'besties'
    },
    {
      id: 'pishu-chat',
      name: 'Pishu ✨',
      message: pishuMessages[pishuMessages.length - 1]?.text || 'Tap to chat privately',
      time: pishuMessages[pishuMessages.length - 1]?.time || '',
      avatar: '🕵️‍♂️',
      color: '#ef4444',
      isGroup: false,
      selected: activeSidebarGroup === null && activeChatId === 'pishu' && !activeDmSuspect,
      isMain: true,
      chatId: 'pishu',
      unread: localStorage.getItem('kavvs_pishu_unread') === 'true'
    }
  ];

  if (showSuspectDmsInSidebar) {
    mockChats.push(
      {
        id: 'jiya-dm-chat',
        name: 'Jiya 🧸',
        message: getSuspectLastMessage('Jiya 🧸'),
        time: getSuspectLastTime('Jiya 🧸'),
        avatar: '🧸',
        color: '#eb5528',
        isGroup: false,
        selected: activeDmSuspect === 'Jiya 🧸',
        isMain: false,
        chatId: 'jiya-dm'
      },
      {
        id: 'arjun-dm-chat',
        name: 'Arjun 😎',
        message: getSuspectLastMessage('Arjun 😎'),
        time: getSuspectLastTime('Arjun 😎'),
        avatar: '😎',
        color: '#64748b',
        isGroup: false,
        selected: activeDmSuspect === 'Arjun 😎',
        isMain: false,
        chatId: 'arjun-dm'
      },
      {
        id: 'meera-dm-chat',
        name: 'Meera 💅',
        message: getSuspectLastMessage('Meera 💅'),
        time: getSuspectLastTime('Meera 💅'),
        avatar: '💅',
        color: '#ec4899',
        isGroup: false,
        selected: activeDmSuspect === 'Meera 💅',
        isMain: false,
        chatId: 'meera-dm'
      }
    );
  }

  if (revealSuspect) {
    mockChats.push({
      id: 'reveal-chat',
      name: 'the reveal 🔍',
      message: 'the truth is out...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '🔍',
      color: '#ef4444',
      isGroup: true,
      selected: activeChatId === 'reveal',
      isMain: true,
      chatId: 'reveal'
    });
  }

  const [showReplay, setShowReplay] = useState(false);

  const handleVerdictSelection = (suspectName) => {
    const userMsg = {
      id: `pishu-verdict-user-${Date.now()}`,
      sender: 'You 🫵',
      text: suspectName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isIncoming: false
    };
    
    setPishuMessages(prev => [...prev, userMsg]);
    setNarratorTyping(true);

    const isCorrect = suspectName === 'Meera 💅';

    setTimeout(() => {
      setNarratorTyping(false);
      const conclusionMsg = {
        id: `pishu-verdict-reply-${Date.now()}`,
        sender: 'Pishu ✨',
        text: isCorrect ? 'YOU GOT IT 🎉🎉🎉' : 'hmm. let\'s see about that...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderColor: isCorrect ? '#22c55e' : '#ef4444',
        isIncoming: true
      };
      setPishuMessages(prev => [...prev, conclusionMsg]);
      
      setTimeout(() => {
        setRevealSuspect(suspectName);
        setActiveChatId('reveal');
        setActiveDmSuspect(null);
      }, 2000);
    }, 1800);
  };

  const handleWrongAnswer = (suspectName) => {
    const clues = suspectName === 'Jiya 🧸' ? JIYA_CLUES : ARJUN_CLUES;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const clueMessages = clues.map((text, i) => ({
      id: `pishu-clue-${Date.now()}-${i}`,
      sender: 'Pishu ✨',
      text,
      time: now,
      senderColor: '#ef4444',
      isIncoming: true
    }));

    setPishuMessages(prev => [...prev, ...clueMessages]);
    localStorage.setItem('kavvs_pishu_unread', 'true');
    setActiveChatId('pishu');
    setShowReplay(true);
  };

  const handleReplay = () => {
    setRevealSuspect(null);
    setShowReplay(false);
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: colors.bg,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'row',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: "'Outfit', sans-serif"
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
        favourites={favourites}
        mockChats={mockChats}
        setView={setView}
        view={view}
        onChatSelect={(chat) => {
          const oldComment = activeSidebarGroup?.narratorComment;
          if (chat.isMain) {
            setActiveSidebarGroup(null);
            setActiveChatId(chat.chatId);
            setActiveDmSuspect(null);
            if (chat.chatId === 'pishu') {
              localStorage.setItem('kavvs_pishu_unread', 'false');
              localStorage.setItem('kavvs_stalking_unlocked', 'true');
              setIsStalkingUnlocked(true);
            }
            if (oldComment) {
              setNarratorComment(oldComment);
            }
          } else {
            if (chat.chatId === 'jiya-dm') {
              setActiveDmSuspect('Jiya 🧸');
            } else if (chat.chatId === 'arjun-dm') {
              setActiveDmSuspect('Arjun 😎');
            } else if (chat.chatId === 'meera-dm') {
              setActiveDmSuspect('Meera 💅');
            } else {
              setActiveSidebarGroup(chat.groupData);
              setNarratorComment(null);
            }
          }
        }}
      />

      {/* 2. Middle Panel (Conversation Frame) Component */}
      {activeSidebarGroup ? (
        <GroupPreviewThread
          key={activeSidebarGroup.id}
          activeGroup={activeSidebarGroup}
          isLight={isLight}
          colors={colors}
          setView={setView}
          view={view}
          onReturn={() => {
            const comment = activeSidebarGroup.narratorComment;
            setActiveSidebarGroup(null);
            if (comment) {
              setNarratorComment(comment);
            }
          }}
          setNarratorComment={setNarratorComment}
        />
      ) : activeChatId === 'reveal' && revealSuspect ? (
        <RevealChatThread
          chosenSuspect={revealSuspect}
          isLight={isLight}
          colors={colors}
          onComplete={() => { if (onNext) onNext(); }}
          onWrongAnswer={handleWrongAnswer}
        />
      ) : activeDmSuspect ? (
        <PrivateDmView
          key={activeDmSuspect}
          suspect={activeDmSuspect}
          isLight={isLight}
          colors={colors}
          onClose={() => setActiveDmSuspect(null)}
          onComplete={() => handleDmComplete(activeDmSuspect)}
        />
      ) : (
        <ChatThread
          messages={activeChatId === 'pishu' ? pishuMessages : messages}
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
          exploredSuspects={exploredSuspects}
          completedDms={completedDms}
          onStartSuspectDm={(suspectName) => setActiveDmSuspect(suspectName)}
          activeChatId={activeChatId}
          verdictOptions={activeChatId === 'pishu' && completedDms.length === 3 && !revealSuspect ? ['Jiya 🧸', 'Arjun 😎', 'Meera 💅'] : null}
          onVerdictSelect={handleVerdictSelection}
          showReplay={activeChatId === 'pishu' && showReplay}
          onReplay={handleReplay}
        />
      )}

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
              onSelectGroup={(groupName) => {
                const found = mockChats.find(c => c.name === groupName);
                if (found && found.groupData) {
                  setActiveSidebarGroup(found.groupData);
                  setSelectedContact(null);
                  setView('info');
                }
              }}
            />
          ) : activeSidebarGroup ? (
            <GroupPreviewInfoView
              key={activeSidebarGroup.id}
              activeGroup={activeSidebarGroup}
              isLight={isLight}
              colors={colors}
              onClose={() => {
                const comment = activeSidebarGroup.narratorComment;
                setActiveSidebarGroup(null);
                setView('chat');
                if (comment) {
                  setNarratorComment(comment);
                }
              }}
              onSelectMember={(name) => {
                setSelectedContact(name);
              }}
              favourites={favourites}
              onToggleFavourite={handleToggleFavourite}
            />
          ) : (
            <GroupInfoView 
              key="group-info" 
              colors={colors} 
              isLight={isLight} 
              setView={setView} 
              onNext={onNext} 
              isFavourite={favourites.includes('active')}
              setIsFavourite={() => handleToggleFavourite('active')}
              onSelectMember={(name) => setSelectedContact(name)}
              completedDms={completedDms}
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

      {/* Sidebar Exit Narrator Commentary Pop-up Toast */}
      <AnimatePresence>
        {narratorComment && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              width: '280px',
              background: '#1f2c34', 
              color: '#ffffff',
              padding: '12px 14px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              zIndex: 100,
              border: '1.5px solid #00a884',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <div style={{ fontSize: '18px' }}>🔔</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '12.5px', lineHeight: '1.45', fontWeight: 500, color: '#e9edef' }}>
                {narratorComment}
              </p>
            </div>
            <button 
              onClick={() => setNarratorComment(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8696a0',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px',
                fontFamily: "'Outfit', sans-serif"
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = '#8696a0'}
            >
              DISMISS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
