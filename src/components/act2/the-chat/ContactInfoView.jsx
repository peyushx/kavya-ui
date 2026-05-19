import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Phone, MessageSquare, Video, Shield, Heart, 
  Volume2, VolumeX, Folder, Star, Users, Info, ChevronRight, Lock 
} from 'lucide-react';

export default function ContactInfoView({ memberName, isLight, colors, onClose, onSelectGroup }) {
  const [activeGroupPreview, setActiveGroupPreview] = useState(null);
  const [narratorComment, setNarratorComment] = useState(null);

  // Upgraded Profiles Database containing rich chat logs and foreshadowings
  const profiles = {
    'Riya 🧸': {
      avatar: '🧸',
      avatarColor: '#eb5528',
      about: 'overthinking is my cardio 🏃‍♀️',
      phone: '+91 •••••• 7842',
      lastSeen: '3:02 AM',
      media: '14 photos, 6 videos, 0 documents',
      starred: [
        { sender: 'Riya 🧸', text: 'i love you guys sm 🥺' },
        { sender: 'Meera 💅', text: "riya you're not clingy you're just loving" },
        { sender: 'Arjun 😎', text: 'group trip when??' }
      ],
      groups: [
        { 
          name: 'besties only 💀🫶', 
          desc: 'Riya, Arjun, Meera, You 🫵', 
          membersCount: 4,
          isUntappable: true 
        },
        { 
          name: 'Family Group 🏠', 
          desc: 'Mom, Dad, Riya...', 
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
        },
        { 
          name: 'College Notes Sharing 📚', 
          desc: 'Riya, Random guy, Girl...', 
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
      ],
      notifications: 'LOUD (Every message, full volume)',
      isLoud: true,
      customDP: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #fbcfe8 0%, #f472b6 100%)' }}>
          <span style={{ fontSize: '72px' }}>🧸</span>
          {/* Crying visual indicators: tear drops and red eyes */}
          <div style={{ position: 'absolute', top: '48%', left: '38%', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
          <div style={{ position: 'absolute', top: '48%', right: '38%', width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeIn' }}
            style={{ position: 'absolute', top: '56%', left: '38%', width: '4px', height: '8px', borderRadius: '2px', background: '#60a5fa' }} 
          />
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 0.8 }}
            style={{ position: 'absolute', top: '56%', right: '38%', width: '4px', height: '8px', borderRadius: '2px', background: '#60a5fa' }} 
          />
        </div>
      )
    },
    'Arjun 😎': {
      avatar: '😎',
      avatarColor: '#64748b',
      about: 'i mind my own business',
      phone: '+91 •••••• 2261',
      lastSeen: 'Yesterday',
      media: '2 photos, 1 video, 0 documents',
      starred: [],
      groups: [
        { 
          name: 'besties only 💀🫶', 
          desc: 'Riya, Arjun, Meera, You 🫵', 
          membersCount: 4,
          isUntappable: true 
        },
        { 
          name: 'Boys Only 🏋️', 
          desc: 'Arjun, Karan, Dev...', 
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
        },
        { 
          name: 'FIFA Tournament 🎮', 
          desc: 'Arjun, Sam, Karan...', 
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
        },
        { 
          name: 'Apartment Rent Split 💸', 
          desc: 'Arjun, Vikram...', 
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
      ],
      notifications: 'Muted for 1 year',
      isLoud: false,
      customDP: (
        <div style={{ width: '100%', height: '100%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(3px)', opacity: 0.75, position: 'relative' }}>
          <span style={{ fontSize: '72px' }}>😎</span>
          <div style={{ position: 'absolute', bottom: '6px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', color: 'white', fontSize: '9px', fontWeight: 'bold' }}>TAKEN IN 2019</div>
        </div>
      )
    },
    'Meera 💅': {
      avatar: '💅',
      avatarColor: '#ec4899',
      about: 'ur secrets are safe with me pinky promise 🤞',
      phone: '+91 •••••• 5519',
      lastSeen: '11:58 PM',
      media: '47 photos, 23 videos, 3 documents 📄⚠️',
      starred: [
        { sender: 'Riya 🧸', text: 'meera you look like a literal model omg' },
        { sender: 'Pishu ✨', text: 'did you hear what happened in the library??' },
        { sender: 'You 🫵', text: "don't tell arjun i said this but..." },
        { sender: 'Meera 💅', text: '*archived chat log compliments*' }
      ],
      groups: [
        { 
          name: 'besties only 💀🫶', 
          desc: 'Riya, Arjun, Meera, You 🫵', 
          membersCount: 4,
          isUntappable: true 
        },
        { 
          name: 'Girls Night 💃', 
          desc: 'Meera, Priya, Ananya...', 
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
        },
        { 
          name: 'Office Gossip 👀', 
          desc: 'Meera, Sneha, Tanya...', 
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
        },
        { 
          name: 'Skincare Cult 🧴', 
          desc: 'Meera, Girl...', 
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
        },
        { 
          name: "Meera's Birthday Planning 🎂", 
          desc: "Meera, Ananya, Sneha...", 
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
      ],
      notifications: 'Custom notification tone (Active special sound)',
      isLight: true,
      customDP: (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, #fdf2f8 0%, #f472b6 100%)' }}>
          <span style={{ fontSize: '72px' }}>💅</span>
          {/* Ring light glowing circular reflection overlay */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.7)',
            boxShadow: '0 0 15px rgba(255,255,255,0.9)',
            pointerEvents: 'none'
          }} />
        </div>
      )
    },
    'You 🫵': {
      avatar: '🫵',
      avatarColor: '#10b981',
      about: 'No bio set',
      phone: '+91 •••••• YOURS',
      lastSeen: 'online 🟢',
      media: '3 photos, 1 video, 0 documents',
      starred: [],
      groups: [
        { 
          name: 'besties only 💀🫶', 
          desc: 'Riya, Arjun, Meera, You 🫵', 
          membersCount: 4,
          isUntappable: true 
        }
      ],
      notifications: 'Custom (Default settings)',
      isLoud: true,
      customDP: (
        <div style={{ width: '100%', height: '100%', background: isLight ? '#e2e8f0' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          <Users size={72} strokeWidth={1} />
        </div>
      ),
      isYou: true
    }
  };

  // Find profile details
  const profileName = memberName.replace(' Riya 🧸', 'Riya 🧸').replace(' Arjun 😎', 'Arjun 😎').replace(' Meera 💅', 'Meera 💅').replace(' You 🫵', 'You 🫵');
  const profile = profiles[profileName] || profiles['You 🫵'];

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '320px', opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.2 }}
      style={{
        width: '320px',
        height: '100%',
        background: isLight ? '#ffffff' : '#111b21',
        borderLeft: isLight ? '1px solid #e9edef' : '1px solid #222e35',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 25,
        flexShrink: 0,
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Scrollable details content container */}
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px',
          background: isLight ? '#f0f2f5' : '#202c33',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          color: isLight ? '#111b21' : '#e9edef',
          borderBottom: isLight ? '1px solid #e9edef' : '1px solid #222e35',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div onClick={onClose} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Back to Group Info">
            <ArrowLeft size={20} />
          </div>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Contact info</h2>
        </div>

        {/* Profile Photo */}
        <div style={{
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '3px solid white',
            background: '#64748b',
            marginBottom: '16px'
          }}>
            {profile.customDP}
          </div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef' }}>
            {profileName}
          </h2>
          <span style={{ fontSize: '12px', color: colors.dateText, marginTop: '4px' }}>
            {profile.phone}
          </span>
        </div>

        {/* About & Last Seen */}
        <div style={{
          padding: '16px',
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '11px', color: '#00a884', fontWeight: 600, letterSpacing: '0.5px' }}>ABOUT</span>
            <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef' }}>{profile.about}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35', paddingTop: '10px' }}>
            <span style={{ fontSize: '11px', color: '#00a884', fontWeight: 600, letterSpacing: '0.5px' }}>LAST SEEN</span>
            <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 600 }}>{profile.lastSeen}</span>
          </div>
        </div>

        {/* Media shared in Chat */}
        <div style={{
          padding: '16px',
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Folder size={18} color={colors.dateText} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 500 }}>Media, links and docs</span>
                <span style={{ fontSize: '11px', color: colors.dateText }}>{profile.media}</span>
              </div>
            </div>
            <ChevronRight size={16} color={colors.dateText} />
          </div>
        </div>

        {/* Notifications settings */}
        <div style={{
          padding: '16px',
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {profile.isLoud ? <Volume2 size={18} color={colors.dateText} /> : <VolumeX size={18} color="#ef4444" />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '13.5px', color: isLight ? '#111b21' : '#e9edef', fontWeight: 500 }}>Notifications</span>
              <span style={{ fontSize: '11px', color: profile.isLoud ? '#00a884' : '#ef4444', fontWeight: 600 }}>{profile.notifications}</span>
            </div>
          </div>
        </div>

        {/* Starred Messages */}
        <div style={{
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
        }}>
          <div style={{ padding: '16px 16px 8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: isLight ? '1px solid #f0f2f5' : '1px solid #222e35' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: isLight ? '#111b21' : '#e9edef' }}>
              <Star size={16} color="#eab308" fill="#eab308" />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Starred Messages ({profile.starred.length})</span>
            </div>
          </div>

          {profile.starred.length === 0 ? (
            <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: '12.5px', color: colors.dateText }}>
              No starred messages
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {profile.starred.map((msg, i) => (
                <div key={i} style={{ padding: '10px 16px', borderBottom: i < profile.starred.length - 1 ? (isLight ? '1px solid #f0f2f5' : '1px solid #222e35') : 'none' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#00a884', display: 'block', marginBottom: '2px' }}>{msg.sender}</span>
                  <span style={{ fontSize: '12px', color: isLight ? '#54656f' : '#cbd5e1', fontStyle: 'italic' }}>"{msg.text}"</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Groups in Common */}
        <div style={{
          background: isLight ? '#ffffff' : '#111b21',
          borderBottom: isLight ? '8px solid #f0f2f5' : '8px solid #0c1317'
        }}>
          <div style={{ padding: '16px 16px 8px 16px', fontSize: '12.5px', color: colors.dateText, fontWeight: 600 }}>
            Groups in common ({profile.groups.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {profile.groups.map((group, i) => {
              const isClickable = !group.isUntappable;
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    if (isClickable && onSelectGroup) {
                      onSelectGroup(group.name);
                    }
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px', 
                    padding: '12px 16px', 
                    borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35',
                    cursor: isClickable ? 'pointer' : 'default',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (isClickable) {
                      e.currentTarget.style.background = isLight ? '#f0f2f5' : '#1f2c34';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isClickable) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: 'white' }}>
                    👥
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: isLight ? '#111b21' : '#e9edef', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{group.name}</span>
                    <span style={{ fontSize: '11px', color: colors.dateText, marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {group.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special You 🫵 foreshadowing footnote */}
          {profile.isYou && (
            <div style={{
              padding: '12px 16px 16px 16px',
              fontSize: '11.5px',
              color: colors.dateText,
              fontStyle: 'italic',
              borderTop: isLight ? '1px solid #f0f2f5' : '1px solid #222e35'
            }}>
              only 1 group in common. interesting.
            </div>
          )}
        </div>

        {/* Encryption Warning (Crucial BOMBSHELL clue for YOU 🫵) */}
        <div style={{
          padding: '24px 16px 40px 16px',
          textAlign: 'center',
          background: isLight ? '#ffffff' : '#111b21',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={16} color={colors.dateText} />
          {profile.isYou ? (
            <span style={{ fontSize: '11.5px', color: '#ef4444', lineHeight: '1.4', fontWeight: 600, border: '1px dashed rgba(239,68,68,0.3)', padding: '6px 12px', borderRadius: '8px' }}>
              Encryption: Messages are end-to-end encrypted. Except the ones you forwarded 📤
            </span>
          ) : (
            <span style={{ fontSize: '10.5px', color: colors.dateText, lineHeight: '1.4' }}>
              Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
            </span>
          )}
        </div>
      </div>

      {/* Absolute Overlays Area */}
      <AnimatePresence>
        {activeGroupPreview && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: isLight ? '#efeae2' : '#0b141a', // WhatsApp chat screen background
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {/* Overlay Header */}
            <div style={{
              padding: '12px 16px',
              background: isLight ? '#f0f2f5' : '#202c33',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: isLight ? '#111b21' : '#e9edef',
              borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #222e35',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div 
                onClick={() => {
                  const comment = activeGroupPreview.narratorComment;
                  setActiveGroupPreview(null);
                  if (comment) {
                    setNarratorComment(comment);
                  }
                }} 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Back to Contact Info"
              >
                <ArrowLeft size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '220px' }}>
                  {activeGroupPreview.name}
                </h4>
                <span style={{ fontSize: '11px', color: colors.dateText }}>
                  {activeGroupPreview.membersCount} members
                </span>
              </div>
            </div>

            {/* Chat Body view */}
            <div 
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative'
              }}
            >
              {/* WhatsApp background visual pattern */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: isLight ? 0.04 : 0.02,
                pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle at 10px 10px, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />

              {activeGroupPreview.messages.map((m, idx) => {
                if (m.type === 'system') {
                  return (
                    <div 
                      key={idx}
                      style={{
                        alignSelf: 'center',
                        background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.07)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        color: isLight ? '#54656f' : '#8696a0',
                        textAlign: 'center',
                        maxWidth: '90%',
                        margin: '4px 0',
                        lineHeight: '1.4',
                        zIndex: 5
                      }}
                    >
                      {m.text}
                    </div>
                  );
                }

                // Identify if it's sent by the primary contact we are examining
                const cleanName = profileName.split(' ')[0];
                const isOutgoing = m.sender.startsWith(cleanName);

                const senderColor = isOutgoing 
                  ? (isLight ? '#075E54' : '#00a884')
                  : (isLight ? '#ca8a04' : '#f59e0b');

                return (
                  <div 
                    key={idx}
                    style={{
                      alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      background: isOutgoing 
                        ? (isLight ? '#dcf8c6' : '#005c4b') 
                        : (isLight ? '#ffffff' : '#202c33'),
                      borderRadius: isOutgoing ? '8px 0 8px 8px' : '0 8px 8px 8px',
                      padding: '6px 10px',
                      boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 5
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: senderColor, marginBottom: '2px' }}>
                      {m.sender}
                    </span>

                    {/* Custom asset renderers */}
                    {m.type === 'good_morning_img' ? (
                      <div style={{
                        width: '150px',
                        background: isLight ? '#f1f5f9' : '#1e293b',
                        borderRadius: '6px',
                        padding: '6px',
                        marginTop: '4px',
                        border: isLight ? '1px solid #cbd5e1' : '1px solid #334155'
                      }}>
                        <div style={{ 
                          height: '90px', 
                          background: 'linear-gradient(135deg, #fef08a 0%, #f472b6 100%)', 
                          borderRadius: '4px', 
                          display: 'flex', 
                          flexDirection: 'column',
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <span style={{ fontSize: '28px' }}>🌹🌻</span>
                          <span style={{ fontSize: '8px', color: '#1e293b', fontWeight: 'bold', background: 'rgba(255,255,255,0.7)', padding: '2px 6px', borderRadius: '4px', marginTop: '4px' }}>
                            GOOD MORNING
                          </span>
                        </div>
                        <div style={{ fontSize: '9px', color: colors.dateText, marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          Good_Morning_Minion_Roses.jpg
                        </div>
                      </div>
                    ) : m.type === 'pdf_file' ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                        borderRadius: '6px',
                        padding: '8px',
                        marginTop: '4px',
                        border: isLight ? '1px solid #e2e8f0' : '1px solid #334155',
                        width: '180px'
                      }}>
                        <div style={{ width: '30px', height: '30px', background: '#ef4444', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '9px' }}>
                          PDF
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: isLight ? '#111b21' : '#e9edef' }}>
                            Unit_4_Complete_Notes...
                          </span>
                          <span style={{ fontSize: '9px', color: colors.dateText }}>
                            43 pages · 2.4 MB
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12.5px', color: isOutgoing ? colors.bubbleOutgoingText : colors.bubbleIncomingText, lineHeight: '1.45' }}>
                        {m.text}
                      </span>
                    )}

                    <span style={{ fontSize: '8.5px', color: colors.dateText, textAlign: 'right', marginTop: '3px' }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrator Pop-up Toast Overlay */}
      <AnimatePresence>
        {narratorComment && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              background: '#1f2c34', // standard elegant narration bubble theme
              color: '#ffffff',
              padding: '12px 14px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              zIndex: 100,
              border: '1.5px solid #00a884'
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
    </motion.div>
  );
}
