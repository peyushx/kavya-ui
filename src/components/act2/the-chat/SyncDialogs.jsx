import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function SyncDialogs({
  syncErrorState,
  setSyncErrorState,
  syncAttempts,
  setSyncAttempts,
  handleShowSyncError,
  isLight
}) {
  return (
    <>
      {syncErrorState === 'loading' && (
        <motion.div
          key="sync-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 200,
            background: 'rgba(11, 20, 26, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(0, 168, 132, 0.15)',
            borderTop: '3px solid #00a884',
            borderRadius: '50%',
            animation: 'spinFan 1s infinite linear',
            marginBottom: '20px'
          }} />
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#e9edef' }}>
            Connecting to device...
          </h4>
          <span style={{ fontSize: '12px', color: '#8696a0', marginTop: '6px' }}>
            Retrieving historical chat backup handshake
          </span>
        </motion.div>
      )}

      {syncErrorState === 'error' && (
        <motion.div
          key="sync-dialog"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 201,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "'Outfit', sans-serif",
            padding: '20px'
          }}
        >
          <div style={{
            width: '100%',
            maxWidth: '380px',
            background: isLight ? '#ffffff' : '#3b4a54',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            color: isLight ? '#111b21' : '#e9edef',
            boxSizing: 'border-box'
          }}>
            {syncAttempts === 1 ? (
              <>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 600 }}>
                  Unable to sync older messages
                </h3>
                <p style={{ margin: '0 0 24px 0', fontSize: '13.5px', color: isLight ? '#54656f' : '#8696a0', lineHeight: 1.5 }}>
                  Your target's phone must be unlocked and active to complete the backup handshake. Please make sure the device is nearby.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    onClick={() => setSyncErrorState(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#00a884',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '8px 16px'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleShowSyncError}
                    style={{
                      background: '#00a884',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '8px 20px',
                      boxShadow: '0 2px 8px rgba(0, 168, 132, 0.3)'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', marginBottom: '12px' }}>
                  <AlertTriangle size={24} />
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
                    HACK_COMPROMISED ⚠️
                  </h3>
                </div>
                <p style={{ margin: '0 0 20px 0', fontSize: '13.5px', color: isLight ? '#54656f' : '#8696a0', lineHeight: 1.5 }}>
                  <strong style={{ color: '#ef4444' }}>Warning:</strong> Excessive backup handshakes triggered the device encryption firewalls (Code: ERR_STALK_BLOCKED_802). Sync is permanently locked.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setSyncErrorState('narrator')}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      cursor: 'pointer',
                      padding: '10px 16px',
                      boxShadow: '0 2px 10px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    Explain Error 🤖
                  </button>
                  <button
                    onClick={() => {
                      setSyncErrorState(null);
                      setSyncAttempts(0);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isLight ? '#54656f' : '#8696a0',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      cursor: 'pointer',
                      padding: '8px 16px'
                    }}
                  >
                    Abort connection
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {syncErrorState === 'narrator' && (
        <motion.div
          key="sync-narrator"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            right: '24px',
            zIndex: 202,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '2px dashed #ef4444',
            borderRadius: '16px',
            padding: '20px 24px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            fontFamily: "'Outfit', sans-serif",
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>🕵️‍♂️</span>
            <h4 style={{ margin: 0, fontSize: '15px', color: '#f87171', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              NARRATOR INTRUSION
            </h4>
          </div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6' }}>
            "Whoa! abort mission, Sherlock! Jiya's router might be struggling to keep her video camera spinning, but her chat's cyber-defenses are apparently locked tight. Let's not trigger a security warning. What's already in this chat has enough juicy leaks to solve the crime. Keep it cool and use your stalker board! 💅💀"
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setSyncErrorState(null);
                setSyncAttempts(0);
              }}
              style={{
                background: '#00a884',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '6px 16px',
                boxShadow: '0 2px 8px rgba(0, 168, 132, 0.3)'
              }}
            >
              Okay, okay! ➔
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
