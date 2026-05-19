import { motion } from 'framer-motion';

export default function NarratorOverlay({
  showNarrator,
  setShowNarrator
}) {
  return (
    <>
      {showNarrator && (
        <motion.div
          key="narrator"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            color: 'white',
            textAlign: 'center',
            fontFamily: "'Outfit', sans-serif",
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.03 } }
            }}
            style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: 500, marginBottom: '30px', maxWidth: '600px' }}
          >
            {"Alright baddie, time to put on your detective hat 🕵️‍♀️. Tap the group info above and stalk every single member. Check their bios. Check their last seens. Find out who leaked it. Trust NO ONE. 💅"
              .split('')
              .map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {char}
                </motion.span>
              ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            onClick={() => {
              setShowNarrator(false);
              localStorage.setItem('kavvs_stalking_unlocked', 'true');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'white',
              color: 'black',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            Time to stalk ➔
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
