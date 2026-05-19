import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isFavourite, setIsFavourite] = useState(() => {
    return localStorage.getItem('kavvs_is_favourite') === 'true';
  });
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [syncErrorState, setSyncErrorState] = useState(null); // null, 'loading', 'error', 'narrator'
  const [syncAttempts, setSyncAttempts] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null); // null, 'Riya 🧸', 'Arjun 😎', 'Meera 💅', 'You 🫵'
  
  const [activeSidebarGroup, setActiveSidebarGroup] = useState(null);
  const [narratorComment, setNarratorComment] = useState(null);

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
    localStorage.setItem('kavvs_is_favourite', isFavourite ? 'true' : 'false');
  }, [isFavourite]);

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
      id: 'active',
      name: localStorage.getItem('kavvs_group_name') || 'besties only 💀🫶', 
      message: messages[messages.length - 1]?.text || 'guys someone sent this to me... is this true?!', 
      time: messages[messages.length - 1]?.time || '10:14 AM', 
      avatar: '👥', 
      color: '#0d9488', 
      isGroup: true, 
      selected: activeSidebarGroup === null,
      isMain: true
    },
    {
      id: 'family',
      name: 'Family Group 🏠',
      message: 'still. call sometime.',
      time: '9:08 PM',
      avatar: '🏠',
      color: '#0284c7',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'family',
      groupData: {
        id: 'family',
        name: 'Family Group 🏠',
        desc: "A warm place for mummy, papa, and beta to argue about Dal vs Pasta, ignore read receipts, and send Good Morning rose pictures at midnight.",
        membersCount: 3,
        narratorComment: "good morning is a feeling. riya's dad is a philosopher 💀",
        messages: [
          { sender: "Riya's Mom", text: "beta aaj dinner kya banana hai", time: "8:45 PM" },
          { sender: "Riya", text: "mummy i told you na pasta", time: "8:46 PM" },
          { sender: "Riya's Mom", text: "pasta vasta nahi khaate hum. dal bana do", time: "8:48 PM" },
          { sender: "Riya", text: "😭😭😭", time: "8:49 PM" },
          { sender: "Riya's Dad", text: "Roses and Minion Good Morning photo", time: "9:00 PM", type: "good_morning_img" },
          { sender: "Riya", text: "papa it's 9pm", time: "9:01 PM" },
          { sender: "Riya's Dad", text: "good morning is a feeling beta. not a time.", time: "9:03 PM" },
          { sender: "Riya's Mom", text: "your father is right. also call me you never call", time: "9:05 PM" },
          { sender: "Riya", text: "mummy i literally live with you", time: "9:06 PM" },
          { sender: "Riya's Mom", text: "still. call sometime.", time: "9:08 PM" }
        ]
      }
    },
    {
      id: 'notes',
      name: 'College Notes Sharing 📚',
      message: 'thanks',
      time: '2:30 PM',
      avatar: '📚',
      color: '#8b5cf6',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'notes',
      groupData: {
        id: 'notes',
        name: 'College Notes Sharing 📚',
        desc: "Notes, reference textbooks, highlighted PDFs, and last-minute exam panics shared by 34 desperate college classmates at 2:00 AM.",
        membersCount: 34,
        narratorComment: "43 pages. color coded. extra references. 3 weeks. one 'thanks.' 😭",
        messages: [
          { sender: "Random guy", text: "does anyone have unit 4 notes", time: "2:10 PM" },
          { sender: "Girl", text: "bro exam is literally tomorrow", time: "2:12 PM" },
          { sender: "Random guy", text: "that's why i'm asking NOW", time: "2:13 PM" },
          { sender: "Girl", text: "💀💀💀", time: "2:15 PM" },
          { sender: "Riya", text: "wait i have them give me 5 mins", time: "2:18 PM" },
          { sender: "Riya", text: "Unit_4_Complete_Notes_Highlighted_Color_Coded.pdf", time: "2:23 PM", type: "pdf_file" },
          { sender: "Riya", text: "i also added extra references at the end just in case 🥺", time: "2:24 PM" },
          { sender: "Riya", text: "also guys please don't share these outside the group 🙏 i spent 3 weeks making them", time: "2:25 PM" },
          { sender: "Random guy", text: "thanks", time: "2:30 PM" }
        ]
      }
    },
    {
      id: 'boys',
      name: 'Boys Only 🏋️',
      message: "7th time's the charm bro",
      time: '9:50 AM',
      avatar: '🏋️',
      color: '#64748b',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'boys',
      groupData: {
        id: 'boys',
        name: 'Boys Only 🏋️',
        desc: "Gym, protein schedules, workout routines, and gym-bros calling out Arjun for sleeping in on their 6:00 AM plans six days in a row.",
        membersCount: 6,
        narratorComment: "7th time's the charm 😭",
        messages: [
          { sender: "Karan", text: "gym tomorrow 6am?", time: "10:15 PM" },
          { sender: "Dev", text: "let's go bro 💪", time: "10:17 PM" },
          { sender: "Arjun", text: "yeah bro for sure", time: "10:20 PM" },
          { type: "system", text: "— next day —" },
          { sender: "Karan", text: "bro where are you we're at the gym", time: "6:15 AM" },
          { sender: "Dev", text: "arjun??", time: "6:30 AM" },
          { sender: "Karan", text: "this man", time: "6:45 AM" },
          { type: "system", text: "— 3 hours later —" },
          { sender: "Arjun", text: "my bad bro alarm didn't ring", time: "9:45 AM" },
          { sender: "Karan", text: "you said that last 6 times", time: "9:46 AM" },
          { sender: "Arjun", text: "7th time's the charm bro", time: "9:50 AM" }
        ]
      }
    },
    {
      id: 'fifa',
      name: 'FIFA Tournament 🎮',
      message: 'clearly',
      time: '4:55 PM',
      avatar: '🎮',
      color: '#f59e0b',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'fifa',
      groupData: {
        id: 'fifa',
        name: 'FIFA Tournament 🎮',
        desc: "Tournament brackets, offline match scheduling, and dramatic excuses about 'emotional lag' after losing a match 7-0.",
        membersCount: 8,
        narratorComment: "emotional lag. noted. 💀",
        messages: [
          { sender: "Arjun", text: "this is my year. i can feel it.", time: "4:00 PM" },
          { sender: "Sam", text: "bro you say that every year", time: "4:02 PM" },
          { sender: "Arjun", text: "this time it's different. i've been practicing.", time: "4:05 PM" },
          { type: "system", text: "— after the match —" },
          { sender: "Sam", text: "7-0 LMAOOO", time: "4:45 PM" },
          { sender: "Karan", text: "bro that was brutal", time: "4:46 PM" },
          { sender: "Arjun", text: "lag.", time: "4:48 PM" },
          { sender: "Sam", text: "it was an offline match", time: "4:49 PM" },
          { sender: "Arjun", text: "emotional lag.", time: "4:50 PM" },
          { sender: "Karan", text: "WHAT DOES THAT EVEN MEAN", time: "4:52 PM" },
          { sender: "Arjun", text: "it means i wasn't mentally present", time: "4:53 PM" },
          { sender: "Sam", text: "clearly", time: "4:55 PM" }
        ]
      }
    },
    {
      id: 'rent',
      name: 'Apartment Rent Split 💸',
      message: 'there is now 😎',
      time: '5:20 PM',
      avatar: '💸',
      color: '#10b981',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'rent',
      groupData: {
        id: 'rent',
        name: 'Apartment Rent Split 💸',
        desc: "Rent split reminders, maintenance invoices, and Vikram constantly tracking down Arjun's innovative ₹500 'installment plans' for a ₹15,000 bill.",
        membersCount: 3,
        narratorComment: "installment plan for rent 😎 this man is something else",
        messages: [
          { sender: "Vikram", text: "bro rent is due", time: "11:00 AM" },
          { sender: "Arjun", text: "yeah bro i'll send tomorrow", time: "11:15 AM" },
          { type: "system", text: "— 2 weeks later —" },
          { sender: "Vikram", text: "ARJUN. RENT.", time: "2:00 PM" },
          { sender: "Arjun", text: "bro i thought i sent it??", time: "2:10 PM" },
          { sender: "Vikram", text: "you did not.", time: "2:11 PM" },
          { sender: "Arjun", text: "are you sure", time: "2:13 PM" },
          { sender: "Vikram", text: "YES I CHECK THE ACCOUNT", time: "2:15 PM" },
          { sender: "Arjun", text: "ok ok sending now", time: "2:20 PM" },
          { type: "system", text: "— 1 week later —" },
          { sender: "Vikram", text: "Arjun i'm going to lose my mind", time: "5:00 PM" },
          { sender: "Arjun", text: "BRO I SWEAR I SENT IT THIS TIME", time: "5:05 PM" },
          { sender: "Vikram", text: "you sent ₹500. the rent is ₹15,000.", time: "5:10 PM" },
          { sender: "Arjun", text: "that was the advance bro. installment plan.", time: "5:12 PM" },
          { sender: "Vikram", text: "THERE IS NO INSTALLMENT PLAN FOR RENT", time: "5:15 PM" },
          { sender: "Arjun", text: "there is now 😎", time: "5:20 PM" }
        ]
      }
    },
    {
      id: 'girlsnight',
      name: 'Girls Night 💃',
      message: 'one time too many babes 💅',
      time: '6:22 PM',
      avatar: '💃',
      color: '#ec4899',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'girlsnight',
      groupData: {
        id: 'girlsnight',
        name: 'Girls Night 💃',
        desc: "Saturday plans, aesthetic filters, and Meera enforcing strict ground rules (No cancels, matching outfits, and definitely no pajama violations).",
        membersCount: 5,
        narratorComment: "reading comprehension is free 💀",
        messages: [
          { sender: "Meera", text: "ok saturday girls night. no boyfriends. no excuses. no cancelling.", time: "6:00 PM" },
          { sender: "Priya", text: "i'm in!!", time: "6:02 PM" },
          { sender: "Ananya", text: "can i bring my boyfriend", time: "6:05 PM" },
          { sender: "Meera", text: "it's called GIRLS night. reading comprehension is free ananya.", time: "6:08 PM" },
          { sender: "Ananya", text: "he'll just sit in the corner", time: "6:10 PM" },
          { sender: "Meera", text: "the corner of GIRLS night?? no ❌", time: "6:12 PM" },
          { sender: "Priya", text: "lmaooo", time: "6:13 PM" },
          { sender: "Ananya", text: "fine 🙄", time: "6:15 PM" },
          { sender: "Meera", text: "also dress code is cute tops. no pajamas. i'm looking at you priya.", time: "6:18 PM" },
          { sender: "Priya", text: "IT WAS ONE TIME", time: "6:20 PM" },
          { sender: "Meera", text: "one time too many babes 💅", time: "6:22 PM" }
        ]
      }
    },
    {
      id: 'gossip',
      name: 'Office Gossip 👀',
      message: 'ok everyone. but in my defense...',
      time: '9:15 AM',
      avatar: '☕',
      color: '#ec4899',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'gossip',
      groupData: {
        id: 'gossip',
        name: 'Office Gossip 👀',
        desc: "High-voltage corporate whispers, marketing-HR rumors, and Meera making solemn pinky promises that expire in under 48 hours.",
        membersCount: 4,
        narratorComment: "pinky promise 🤞 lasted 48 hours. impressive for meera honestly",
        messages: [
          { sender: "Meera", text: "ok so apparently rahul from marketing is dating priya from HR", time: "11:30 AM" },
          { sender: "Sneha", text: "NO WAY", time: "11:32 AM" },
          { sender: "Tanya", text: "how do you know this", time: "11:33 AM" },
          { sender: "Meera", text: "i have my sources 😌", time: "11:35 AM" },
          { sender: "Sneha", text: "meera you're actually scary", time: "11:36 AM" },
          { sender: "Meera", text: "i'm not scary i'm informed. there's a difference.", time: "11:38 AM" },
          { sender: "Tanya", text: "ok but do NOT tell anyone i don't want drama", time: "11:40 AM" },
          { sender: "Meera", text: "obviously. what happens in this group stays in this group.", time: "11:42 AM" },
          { sender: "Sneha", text: "pinky promise?", time: "11:43 AM" },
          { sender: "Meera", text: "pinky promise 🤞", time: "11:45 AM" },
          { type: "system", text: "— 2 days later —" },
          { sender: "Tanya", text: "MEERA. EVERYONE IN THE OFFICE KNOWS.", time: "9:00 AM" },
          { sender: "Meera", text: "ok but i only told like 2 people", time: "9:05 AM" },
          { sender: "Sneha", text: "MEERA", time: "9:07 AM" },
          { sender: "Meera", text: "ok 5 people", time: "9:10 AM" },
          { sender: "Tanya", text: "MEERA.", time: "9:12 AM" },
          { sender: "Meera", text: "ok everyone. but in my defense the gossip was TOO good to keep 💀", time: "9:15 AM" }
        ]
      }
    },
    {
      id: 'skincare',
      name: 'Skincare Cult 🧴',
      message: 'insane but moisturized. stay dry bestie 🧴',
      time: '1:20 PM',
      avatar: '🧴',
      color: '#db2777',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'skincare',
      groupData: {
        id: 'skincare',
        name: 'Skincare Cult 🧴',
        desc: "Ordinary niacinamide life transformations, hydration updates, and Meera defending a ₹3000 molecular-level moisturizer: 'insane but moisturized'.",
        membersCount: 7,
        narratorComment: "insane but moisturized. honestly life goals 🧴",
        messages: [
          { sender: "Meera", text: "ok the ordinary niacinamide changed my life", time: "1:00 PM" },
          { sender: "Girl", text: "meera you say that about every product", time: "1:02 PM" },
          { sender: "Meera", text: "because every product changes my life. i'm constantly evolving 🧬", time: "1:05 PM" },
          { sender: "Girl", text: "you spent ₹3000 on a moisturizer last week", time: "1:08 PM" },
          { sender: "Meera", text: "that moisturizer understood my skin on a molecular level", time: "1:10 PM" },
          { sender: "Girl", text: "it's water and shea butter", time: "1:12 PM" },
          { sender: "Meera", text: "it's LUXURY water and ORGANIC shea butter there's a difference 💅", time: "1:15 PM" },
          { sender: "Girl", text: "you're insane", time: "1:17 PM" },
          { sender: "Meera", text: "insane but moisturized. stay dry bestie 🧴", time: "1:20 PM" }
        ]
      }
    },
    {
      id: 'birthday',
      name: "Meera's Birthday Planning 🎂",
      message: 'thoughts??',
      time: '3 days ago',
      avatar: '🎂',
      color: '#db2777',
      isGroup: true,
      selected: activeSidebarGroup?.id === 'birthday',
      groupData: {
        id: 'birthday',
        name: "Meera's Birthday Planning 🎂",
        desc: "Rooftop dining expectations, matching outfits, custom face-shaped cakes, and complete silence on read receipts from all 4 other members.",
        membersCount: 5,
        narratorComment: "4 people read it. 0 replied. meera if you're reading this i'll come to your party 🥺",
        messages: [
          { sender: "Meera", text: "ok so for MY birthday i was thinking", time: "12:00 PM" },
          { sender: "Meera", text: "rooftop dinner", time: "12:01 PM" },
          { sender: "Meera", text: "fairy lights everywhere", time: "12:02 PM" },
          { sender: "Meera", text: "photo booth with props", time: "12:03 PM" },
          { sender: "Meera", text: "matching outfits for everyone", time: "12:04 PM" },
          { sender: "Meera", text: "a cake that looks like my face", time: "12:05 PM" },
          { sender: "Meera", text: "budget is flexible but my expectations are not", time: "12:06 PM" },
          { sender: "Meera", text: "thoughts??", time: "12:08 PM" },
          { type: "system", text: "— no replies. last message sent 3 days ago. all 4 other members have read receipts on. they all saw it. nobody responded. —" }
        ]
      }
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
        isFavourite={isFavourite}
        mockChats={mockChats}
        setView={setView}
        view={view}
        onChatSelect={(chat) => {
          const oldComment = activeSidebarGroup?.narratorComment;
          if (chat.isMain) {
            setActiveSidebarGroup(null);
            if (oldComment) {
              setNarratorComment(oldComment);
            }
          } else {
            setActiveSidebarGroup(chat.groupData);
            setNarratorComment(null);
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
      ) : (
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
      )}

      {/* 3. Right Panel (Group Info / Contact Info Sidebar) Component */}
      <AnimatePresence>
        {view === 'info' && (
          activeSidebarGroup ? (
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
                setActiveSidebarGroup(null);
              }}
            />
          ) : selectedContact ? (
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
