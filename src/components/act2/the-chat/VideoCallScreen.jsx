import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, VideoOff, Mic, MicOff, PhoneOff } from 'lucide-react';

export default function VideoCallScreen({ isLight, onClose }) {
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [cameraToast, setCameraToast] = useState('');

  const triggerMicToast = () => {
    setCameraToast("you're on mute bestie. and honestly? keep it that way 🤫");
    setTimeout(() => setCameraToast(''), 3500);
  };

  // Interrogation States
  const [interrogationType, setInterrogationType] = useState(null); // 'jiya', 'arjun_cat', 'arjun_vacuum', 'arjun_spotify', 'meera'
  const [jiyaDropped, setJiyaDropped] = useState(false);
  const [arjunClicks, setArjunClicks] = useState(0);
  const [meeraClicks, setMeeraClicks] = useState(0);
  const [meeraIntensity, setMeeraIntensity] = useState(1);

  // Climax / Exit States
  const [narratorSlide, setNarratorSlide] = useState(0); // 0 = none, 1, 2, 3, 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCameraToast = () => {
    setCameraToast("Nice try, but you're not turning your camera on today! 📷❌");
    setTimeout(() => setCameraToast(''), 3000);
  };

  const isConnecting = callTime < 3;
  const isJiyaFrozen = !jiyaDropped && ((callTime >= 7 && callTime < 11) || (callTime >= 24 && callTime < 28));
  const hasMeeraJoined = callTime >= 10;
  const hasArjunJoined = callTime >= 14;

  // Climax Exit Timings
  const isArjunLeft = callTime >= 34;
  const isJiyaLeft = callTime >= 38;
  const isMeeraLeft = callTime >= 42;

  useEffect(() => {
    if (callTime >= 44 && narratorSlide === 0) {
      setNarratorSlide(1);
    }
  }, [callTime, narratorSlide]);

  // Interrogation Trigger Handlers (Blocked if Climax has started at callTime >= 30)
  const handleJiyaClick = () => {
    if (isConnecting || isJiyaFrozen || jiyaDropped || interrogationType || callTime >= 30) return;
    setJiyaDropped(true);
    setInterrogationType('jiya');
    setTimeout(() => {
      setJiyaDropped(false);
      setInterrogationType(null);
    }, 5000);
  };

  const handleArjunClick = () => {
    if (isConnecting || !hasArjunJoined || interrogationType || callTime >= 30) return;
    const nextClick = arjunClicks + 1;
    setArjunClicks(nextClick);
    
    let type = 'arjun_cat';
    let duration = 4000;
    
    if (nextClick % 3 === 1) {
      type = 'arjun_cat';
      duration = 4000;
    } else if (nextClick % 3 === 2) {
      type = 'arjun_vacuum';
      duration = 4000;
    } else {
      type = 'arjun_spotify';
      duration = 6000;
    }
    
    setInterrogationType(type);
    setTimeout(() => {
      setInterrogationType(null);
    }, duration);
  };

  const handleMeeraClick = () => {
    if (isConnecting || !hasMeeraJoined || interrogationType || callTime >= 30) return;
    const nextClick = meeraClicks + 1;
    setMeeraClicks(nextClick);
    setInterrogationType('meera');
    
    // Cycle ring light intensities (1 to 3)
    setMeeraIntensity((nextClick % 3) + 1);
    
    setTimeout(() => {
      setInterrogationType(null);
    }, 4500);
  };

  const getMeeraResponse = () => {
    if (meeraClicks % 3 === 1) return "i have nothing to hide. I was literally doing skincare.";
    if (meeraClicks % 3 === 2) return "i have nothing to hide. As a Capricorn, I'm simply too organized to leak.";
    return "i have nothing to hide. My schedule is perfectly documented.";
  };

  // Timed & click-based subtitles script
  const getSubtitles = () => {
    if (isConnecting) return 'Group Video Call: Connecting...';
    
    // Climax Timeline Override
    if (callTime >= 30 && callTime < 33) {
      return 'Arjun\'s Mom 🚪: "ARJUN KHANA KHA LE!!!"';
    }
    if (callTime >= 33 && callTime < 35) {
      return 'Arjun 😎: "Oh shoot, she walked in! I gotta go, panic! Bye guys!"';
    }
    if (callTime >= 35 && callTime < 38) {
      return 'Jiya 🧸: "Wait my router is literally smoking... hello?? guy--"';
    }
    if (callTime >= 38 && callTime < 39) {
      return 'Narrator: Jiya\'s WiFi died permanently. RIP.';
    }
    if (callTime >= 39 && callTime < 42) {
      return 'Meera 💅: "well this was productive 💅" (hangs up)';
    }
    if (callTime >= 42 && callTime < 44) {
      return 'Narrator: You are left completely alone staring at 3 empty black tiles.';
    }
    if (callTime >= 44) {
      return 'Narrator: ...';
    }

    // Interrogation subtitles override
    if (interrogationType === 'jiya') {
      return jiyaDropped && callTime % 2 === 0
        ? 'Jiya 🧸: "HELLO?? CAN YOU HEAR ME?? GUYS?? HELLO???"'
        : 'Narrator: Jiya\'s connection dropped for 5 seconds... classic move.';
    }
    if (interrogationType === 'arjun_cat') {
      return 'Arjun 😎: "Wait, the cat is on my keyboard! Get off! kjasdhf!"';
    }
    if (interrogationType === 'arjun_vacuum') {
      return '(LOUD VACUUMING IN BACKGROUND) Arjun 😎: "Hold on! My mom is vacuuming, wait!"';
    }
    if (interrogationType === 'arjun_spotify') {
      return 'Arjun 😎: "Wait, did I screen share Spotify?! No, turn it off! it wasn\'t me! literally!"';
    }
    if (interrogationType === 'meera') {
      return `Meera 💅: "${getMeeraResponse()}" (perfectly rehearsed, podcast smile)`;
    }

    // Default timer subtitles
    if (callTime >= 3 && callTime < 7) {
      return 'Jiya 🧸: "no i\'m fine guys what\'s up 🙂" (clearly been crying)';
    }
    if (callTime >= 7 && callTime < 10) {
      return 'Narrator: Jiya\'s WiFi signal collapsed.';
    }
    if (callTime >= 10 && callTime < 14) {
      return 'Meera 💅: "okay so i\'ve been WAITING to talk about this!"';
    }
    if (callTime >= 14 && callTime < 18) {
      return 'Arjun 😎: ...joins 4 minutes late, lying sideways in bed...';
    }
    if (callTime >= 18 && callTime < 22) {
      return 'Arjun 😎: "bro i just woke up..."';
    }
    if (callTime >= 22 && callTime < 26) {
      return 'Arjun 😎: "wait what are we talking about."';
    }
    if (callTime >= 26 && callTime < 30) {
      return 'Meera 💅: "Like I was saying, it\'s basically a classic leak saga! Direct podcast energy."';
    }
    return 'Tap on any suspect to ask them a serious question... 🕵️‍♀️💬';
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#090d10',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontFamily: "'Outfit', sans-serif",
      overflow: 'hidden'
    }}>
      {/* Keyframes style tag */}
      <style>{`
        @keyframes spinFan {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes tearFall {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes sparkles {
          0% { transform: scale(0.6) translateY(0px); opacity: 0.2; }
          50% { transform: scale(1.1) translateY(-10px); opacity: 1; }
          100% { transform: scale(0.6) translateY(-20px); opacity: 0; }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0px rgba(236, 72, 153, 0.4); }
          100% { box-shadow: 0 0 0 15px rgba(236, 72, 153, 0); }
        }
        @keyframes floatZ {
          0% { transform: translate(0, 0) scale(0.8); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translate(15px, -30px) scale(1.2); opacity: 0; }
        }
        @keyframes vacuumShake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-0.5deg); }
          20% { transform: translate(-2px, 0px) rotate(0.5deg); }
          30% { transform: translate(0px, 1.5px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(0.5deg); }
          50% { transform: translate(-1px, 1.5px) rotate(-0.5deg); }
          60% { transform: translate(-2px, 1px) rotate(0deg); }
          70% { transform: translate(1.5px, 1px) rotate(-0.5deg); }
          80% { transform: translate(-1px, -1px) rotate(0.5deg); }
          90% { transform: translate(1.5px, 1.5px) rotate(0deg); }
          100% { transform: translate(1px, -1.5px) rotate(-0.5deg); }
        }
      `}</style>

      {/* Top Banner Hint */}
      {!isConnecting && (
        <div style={{
          background: '#111b21',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#aebac1',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Star size={14} color="#eab308" className="animate-pulse" style={{ animation: 'sparkles 1.5s infinite' }} />
          <span>Tap on a suspect's tile to interrogate them! 🕵️‍♀️🔍</span>
        </div>
      )}

      {/* Camera shy warning notification toast */}
      <AnimatePresence>
        {cameraToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(239, 68, 68, 0.95)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              zIndex: 120,
              whiteSpace: 'nowrap'
            }}
          >
            {cameraToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ringing / Connecting State */}
      {isConnecting ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid #00a884',
              animation: 'pulseRing 1.5s infinite ease-out'
            }} />
            <Users size={48} color="#00a884" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 6px 0', fontWeight: 600 }}>The Baddies 💅</h2>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
              VIDEO CALL CONNECTING...
            </span>
          </div>
        </div>
      ) : (
        /* Active 2x2 Call Grid */
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '12px',
          padding: '16px',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          {/* TILE 1: PLAYER (You) */}
          <div style={{
            background: '#131b20',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#202c33',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '10px'
            }}>
              <VideoOff size={28} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>You</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
              camera shy as always 📷❌
            </span>
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', opacity: isMuted ? 0.3 : 1 }}>
              <Mic size={16} color={isMuted ? '#ef4444' : '#00a884'} />
            </div>
          </div>

          {/* TILE 2: JIYA 🧸 */}
          <div 
            onClick={handleJiyaClick}
            style={{
              background: (isJiyaFrozen || jiyaDropped || isJiyaLeft) ? '#131210' : '#23201f',
              borderRadius: '12px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: (isJiyaFrozen || jiyaDropped || isJiyaLeft) ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: (interrogationType || callTime >= 30) ? 'not-allowed' : 'pointer'
            }}
          >
            {isJiyaLeft ? (
              /* Jiya Permanently Gone */
              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#090d10',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: 'bold',
                zIndex: 30,
                textAlign: 'center'
              }}>
                <VideoOff size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <span>Jiya disconnected (WiFi RIP) 🧸❌</span>
              </div>
            ) : (
              <>
                {/* Spinning Ceiling Fan */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '8px',
                  opacity: 0.15,
                  zIndex: 5
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    borderRadius: '4px',
                    animation: 'spinFan 0.15s infinite linear'
                  }} />
                </div>

                {/* Video glitched / blurred overlay */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  filter: (isJiyaFrozen || jiyaDropped) ? 'blur(2.5px) contrast(1.5) saturate(0.5)' : 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}>
                  {/* Awkward face avatar */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: '#f43f5e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    position: 'relative',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}>
                    {(isJiyaFrozen || jiyaDropped) ? '🤪' : '💁‍♀️'}
                    
                    {/* Tears cascading */}
                    {!(isJiyaFrozen || jiyaDropped) && (
                      <>
                        <div style={{ position: 'absolute', left: '15px', top: '45px', fontSize: '10px', animation: 'tearFall 1.2s infinite linear' }}>💧</div>
                        <div style={{ position: 'absolute', right: '15px', top: '45px', fontSize: '10px', animation: 'tearFall 1.2s infinite linear', animationDelay: '0.6s' }}>💧</div>
                      </>
                    )}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, marginTop: '12px' }}>Jiya 🧸</span>
                  <span style={{ fontSize: '11px', color: '#f43f5e', opacity: 0.8, marginTop: '2px', fontWeight: 500 }}>
                    {(isJiyaFrozen || jiyaDropped) ? 'CONNECTION FROZEN' : '"no i\'m fine guys what\'s up 🙂"'}
                  </span>
                </div>

                {/* Jiya's WiFi COLLAPSED / DROPPED Overlay */}
                {(isJiyaFrozen || jiyaDropped) && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.75)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 20
                    }}
                  >
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.9)',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      letterSpacing: '0.5px',
                      textAlign: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}>
                      {jiyaDropped ? '⚠️ INTERROGATION GLITCH' : "jiya's WiFi said ✌️"}
                    </div>
                    <span style={{ fontSize: '10px', color: '#ef4444', marginTop: '6px', fontWeight: 600, animation: 'sparkles 1.5s infinite' }}>
                      {jiyaDropped ? 'HELLO?? GUYS?? HELLO??' : 'RECONNECTING...'}
                    </span>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTopColor: '#ef4444',
                      borderRadius: '50%',
                      marginTop: '10px',
                      animation: 'spinFan 0.8s infinite linear'
                    }} />
                  </motion.div>
                )}

                {/* WiFi Signal Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  color: (isJiyaFrozen || jiyaDropped) ? '#ef4444' : '#00a884',
                  fontWeight: 'bold'
                }}>
                  WiFi: {(isJiyaFrozen || jiyaDropped) ? 'OFFLINE' : 'STABLE-ISH'}
                </div>

                {/* Hover interrogation tag */}
                {!isJiyaFrozen && !jiyaDropped && !interrogationType && callTime < 30 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    background: 'rgba(0, 168, 132, 0.9)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none'
                  }} className="ask-tag">
                    ASK Suspect 💬
                  </div>
                )}
              </>
            )}
            <style>{`
              div:hover > .ask-tag { opacity: 1 !important; }
            `}</style>
          </div>

          {/* TILE 3: MEERA 💅 */}
          <div 
            onClick={handleMeeraClick}
            style={{
              background: hasMeeraJoined ? (isMeeraLeft ? '#090d10' : '#1b1420') : '#101315',
              borderRadius: '12px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: hasMeeraJoined && !isMeeraLeft
                ? (meeraIntensity === 3 
                    ? '2.5px solid rgba(236, 72, 153, 1)' 
                    : meeraIntensity === 2 
                      ? '2px solid rgba(236, 72, 153, 0.7)' 
                      : '1.5px solid rgba(236, 72, 153, 0.4)')
                : '1px solid rgba(255,255,255,0.03)',
              boxShadow: hasMeeraJoined && !isMeeraLeft
                ? (meeraIntensity === 3
                    ? '0 0 35px rgba(236, 72, 153, 0.4), inset 0 0 25px rgba(236,72,153,0.3)'
                    : meeraIntensity === 2
                      ? '0 0 20px rgba(236, 72, 153, 0.25), inset 0 0 15px rgba(236,72,153,0.2)'
                      : 'inset 0 0 15px rgba(236, 72, 153, 0.1)')
                : 'none',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: (!hasMeeraJoined || interrogationType || callTime >= 30) ? 'not-allowed' : 'pointer'
            }}
          >
            {isMeeraLeft ? (
              /* Meera Left */
              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#090d10',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '13px',
                fontWeight: 'bold',
                zIndex: 30,
                textAlign: 'center'
              }}>
                <VideoOff size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <span>Meera left the call 💅❌</span>
              </div>
            ) : !hasMeeraJoined ? (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
                Waiting for Meera...
              </span>
            ) : (
              <>
                {/* Ring Light Ring representation */}
                <div style={{
                  position: 'absolute',
                  inset: '8px',
                  border: '1.5px solid rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  pointerEvents: 'none',
                  boxShadow: meeraIntensity === 3
                    ? 'inset 0 0 25px rgba(236, 72, 153, 0.6)'
                    : meeraIntensity === 2
                      ? 'inset 0 0 15px rgba(236, 72, 153, 0.4)'
                      : 'inset 0 0 10px rgba(236, 72, 153, 0.2)'
                }} />

                {/* Sparkling elements */}
                <div style={{ position: 'absolute', left: '15%', top: '30%', fontSize: '12px', animation: 'sparkles 1.5s infinite ease-in-out' }}>✨</div>
                <div style={{ position: 'absolute', right: '20%', bottom: '25%', fontSize: '10px', animation: 'sparkles 1.5s infinite ease-in-out', animationDelay: '0.7s' }}>💅</div>

                {/* Ring lit face */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  boxShadow: meeraIntensity === 3
                    ? '0 0 30px rgba(236, 72, 153, 0.7)'
                    : meeraIntensity === 2
                      ? '0 0 20px rgba(236, 72, 153, 0.5)'
                      : '0 0 15px rgba(236, 72, 153, 0.3)'
                }}>
                  🤫
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, marginTop: '12px' }}>Meera 💅</span>
                
                {interrogationType === 'meera' ? (
                  <span style={{ fontSize: '10px', color: '#ff79c6', fontWeight: 'bold', letterSpacing: '0.5px', marginTop: '3px', animation: 'sparkles 1s infinite' }}>
                    💡 RING LIGHT PULSE LEVEL {meeraIntensity}
                  </span>
                ) : (
                  <span style={{ fontSize: '10px', color: '#ec4899', fontWeight: 500, letterSpacing: '0.5px', marginTop: '3px' }}>
                    STUDIO RING LIGHT ACTIVE 💡
                  </span>
                )}

                {/* Hover interrogation tag */}
                {!interrogationType && callTime < 30 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    background: 'rgba(0, 168, 132, 0.9)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none'
                  }} className="ask-tag">
                    ASK Suspect 💬
                  </div>
                )}
              </>
            )}
          </div>

          {/* TILE 4: ARJUN 😎 */}
          <div 
            onClick={handleArjunClick}
            style={{
              background: hasArjunJoined ? (isArjunLeft ? '#090d10' : '#121920') : '#101315',
              borderRadius: '12px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: interrogationType === 'arjun_vacuum' || (callTime >= 30 && callTime < 34) ? '1.5px solid #ef4444' : '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              transition: 'all 0.4s ease',
              cursor: (!hasArjunJoined || interrogationType || callTime >= 30) ? 'not-allowed' : 'pointer',
              animation: (interrogationType === 'arjun_vacuum' || (callTime >= 30 && callTime < 34)) ? 'vacuumShake 0.1s infinite' : 'none'
            }}
          >
            {isArjunLeft ? (
              /* Arjun Left */
              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#090d10',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '13px',
                fontWeight: 'bold',
                zIndex: 30,
                textAlign: 'center'
              }}>
                <VideoOff size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <span>Arjun left the call 😎❌</span>
              </div>
            ) : !hasArjunJoined ? (
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
                Waiting for Arjun...
              </span>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}>
                {/* Horizontal sleep layout */}
                <div style={{
                  transform: 'rotate(-90deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  filter: (interrogationType === 'arjun_vacuum' || callTime >= 30) ? 'blur(0.5px)' : 'none'
                }}>
                  {/* Sleeping horizontal avatar */}
                  <div style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '50%',
                    background: '#eab308',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    position: 'relative'
                  }}>
                    {(interrogationType === 'arjun_vacuum' || callTime >= 30) ? '🤯' : interrogationType === 'arjun_cat' ? '🙀' : '😴'}
                    {/* Floating Zzz */}
                    {!interrogationType && callTime < 30 && (
                      <>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '10px', animation: 'floatZ 2s infinite linear' }}>z</div>
                        <div style={{ position: 'absolute', top: '-18px', right: '-4px', fontSize: '12px', animation: 'floatZ 2s infinite linear', animationDelay: '0.7s' }}>Z</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Animated Cat walks across his face tile horizontally */}
                {callTime < 30 && (
                  <motion.div
                    animate={{ x: ['-20%', '120%'] }}
                    transition={{ 
                      duration: interrogationType === 'arjun_cat' ? 1.5 : 6, 
                      ease: 'linear', 
                      repeat: Infinity, 
                      repeatDelay: interrogationType === 'arjun_cat' ? 0.2 : 3 
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '25px',
                      fontSize: interrogationType === 'arjun_cat' ? '32px' : '22px',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  >
                    🐈‍⬛
                  </motion.div>
                )}

                {/* INTERROGATION OVERLAY: CAT WALK ON KEYBOARD */}
                {interrogationType === 'arjun_cat' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#10b981',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    padding: '12px',
                    textAlign: 'center',
                    zIndex: 20
                  }}>
                    <span style={{ fontWeight: 'bold', color: '#eab308', fontSize: '11px', marginBottom: '4px' }}>🐈‍⬛ CAT WALK OVERRIDE</span>
                    <span style={{ fontSize: '13px', wordBreak: 'break-all', color: '#10b981' }}>
                      "kjasdhf83hdsfjkhksdfjhksdfj"
                    </span>
                  </div>
                )}

                {/* INTERROGATION OVERLAY: VACUUM SHAKE INDICATOR */}
                {interrogationType === 'arjun_vacuum' && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(239, 68, 68, 0.95)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    zIndex: 20
                  }}>
                    ⚠️ LOUD VACUUMING NOISE
                  </div>
                )}

                {/* INTERROGATION OVERLAY: SPOTIFY SCREENSHARE */}
                {interrogationType === 'arjun_spotify' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(9, 13, 16, 0.85)',
                    zIndex: 20,
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      background: 'rgba(239, 68, 68, 0.9)',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      textAlign: 'center'
                    }}>
                      the playlist is giving confession bestie 💀
                    </div>

                    {/* Spotify Glassmorphic Player */}
                    <div style={{
                      background: 'rgba(30, 215, 96, 0.12)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(30, 215, 96, 0.4)',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                    }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        background: '#1ed760',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        📻
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>It Wasn't Me</span>
                        <span style={{ fontSize: '8px', color: '#1ed760', fontWeight: 'bold' }}>Shaggy</span>
                      </div>
                      <span style={{ fontSize: '9px', color: '#1ed760', fontWeight: 'bold' }}>🟢 PLAYING</span>
                    </div>
                  </div>
                )}

                {/* CLIMAX DOOR OVERLAY: MOM YELLING */}
                {callTime >= 30 && callTime < 34 && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(239, 68, 68, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    padding: '12px',
                    textAlign: 'center',
                    zIndex: 30,
                    fontWeight: 'bold',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                  }}>
                    <span style={{ fontSize: '18px', display: 'block', animation: 'vacuumShake 0.08s infinite', color: '#ffe066' }}>📢 "ARJUN KHANA KHA LE!"</span>
                    <span style={{ fontSize: '11px', marginTop: '6px', color: 'white', opacity: 0.9 }}>MOM INTRUSION DETECTED 🚪</span>
                  </div>
                )}

                <span style={{ fontSize: '14px', fontWeight: 600, marginTop: '8px', zIndex: 12 }}>Arjun 😎</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', zIndex: 12 }}>
                  {callTime >= 30 && callTime < 34
                    ? '"SHE IS AT THE DOOR!"'
                    : interrogationType === 'arjun_cat' 
                      ? '"cat is on keyboard!"' 
                      : interrogationType === 'arjun_vacuum' 
                        ? '"vacuum cleaner is active"' 
                        : interrogationType === 'arjun_spotify' 
                          ? '"wait, Spotify screen share?!"' 
                          : '"bro i just woke up" (6:00 PM)'}
                </span>

                {/* Hover interrogation tag */}
                {!interrogationType && callTime < 30 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    background: 'rgba(0, 168, 132, 0.9)',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    pointerEvents: 'none'
                  }} className="ask-tag">
                    ASK Suspect 💬
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULLSCREEN GLASSMORPHIC NARRATOR OVERLAY AT CLIMAX END */}
      <AnimatePresence>
        {narratorSlide > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(9, 13, 16, 0.95)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 150,
              padding: '24px',
              textAlign: 'center'
            }}
          >
            {/* Cute narrator detective glass badge */}
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'rgba(0, 168, 132, 0.1)', 
              border: '2px dashed #00a884', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '36px', 
              marginBottom: '24px',
              animation: 'spinFan 6s infinite linear'
            }}>
              🔍
            </div>

            <motion.div
              key={narratorSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: '22px',
                fontWeight: 600,
                color: '#e9edef',
                maxWidth: '600px',
                lineHeight: '1.6',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {narratorSlide === 1 && "well that was useless 💀"}
              {narratorSlide === 2 && "you learned absolutely nothing"}
              {narratorSlide === 3 && "but at least meera looked great doing it"}
              {narratorSlide === 4 && "back to the chat bestie. keep investigating 🔍"}
            </motion.div>

            {/* Stepper Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '30px' }}>
              {[1, 2, 3, 4].map(idx => (
                <div 
                  key={idx}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: idx === narratorSlide ? '#00a884' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            {/* Next / Close Trigger Button */}
            <button
              onClick={() => {
                if (narratorSlide < 4) {
                  setNarratorSlide(prev => prev + 1);
                } else {
                  onClose(callTime); // Exit group call smoothly back to active stalk chat
                }
              }}
              style={{
                marginTop: '40px',
                background: '#00a884',
                color: 'white',
                border: 'none',
                padding: '12px 36px',
                borderRadius: '24px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 168, 132, 0.4)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {narratorSlide === 4 ? "Return to Chat 🔍" : "Next ➡️"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtitles / Group Chat Captions */}
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        padding: '16px 20px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#00a884',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        fontWeight: 500,
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getSubtitles()}
      </div>

      {/* Video Call Controls bar */}
      <div style={{
        padding: '18px 24px 30px 24px',
        background: '#111b21',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Toggle Mic */}
        <button 
          onClick={triggerMicToast}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: '#ef4444',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Toggle Camera (Fake restriction) */}
        <button 
          onClick={triggerCameraToast}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <VideoOff size={20} />
        </button>

        {/* End Call Button */}
        <button 
          onClick={() => onClose(callTime)}
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: '#ef4444',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
}
