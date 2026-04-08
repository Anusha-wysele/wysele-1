import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WYSELE_LOGOS } from "../components/common/data";

export default function LoadingScreen({ onDone }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hidden progress simulation to drive atmospheric changes
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 2; 
        return Math.min(prev + step, 100);
      });
    }, 150);

    // Timing for cinematic transition
    const tExit = setTimeout(() => setLoading(false), 3800);
    const tDone = setTimeout(() => onDone(), 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [onDone]);

  // High-speed mechanical easing for the shutter split
  const shutterTransition = { duration: 1.1, ease: [0.95, 0.05, 0.795, 0.035] };

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden bg-transparent pointer-events-none">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader-container"
            className="absolute inset-0 z-20 overflow-hidden"
            exit={{ opacity: 1 }} // Prevent container from fading early
          >
            {/* Snap Shutter Panels (Top/Bottom) */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={shutterTransition}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#050505] z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
            />
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={shutterTransition}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505] z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t border-white/5"
            />

            {/* Focal Point (Logo Only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                filter: "blur(40px)",
                transition: { duration: 0.7, ease: "easeIn" } 
              }}
              className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-auto"
            >
              <div className="relative flex flex-col items-center">
                
                {/* Logo Focus Reveal */}
                <motion.div
                  animate={{ 
                    filter: `blur(${(100 - progress) / 6}px) drop-shadow(0 0 15px rgba(255,255,255,${progress / 200}))`,
                    opacity: (progress / 100) + 0.1,
                    scale: 0.98 + (progress / 400) // subtle breathe zoom
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative group overflow-hidden"
                >
                  {/* The actual logo - very small (w-28) */}
                  <img
                    src={WYSELE_LOGOS.white}
                    alt="Wysele"
                    className="w-28 md:w-32 object-contain brightness-150 contrast-125"
                  />
                  
                  {/* Optical Glint - a single pass once nearly sharp */}
                  {progress > 85 && (
                    <motion.div 
                      key="glint"
                      initial={{ top: "-10%", opacity: 0 }}
                      animate={{ top: "110%", opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-x-0 h-[1.5px] bg-white/40 blur-[2px] z-50 pointer-events-none"
                    />
                  )}
                </motion.div>

                {/* Subtle light pulse behind logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.03, 0.06, 0.03],
                    scale: [1, 1.1, 1] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white rounded-full blur-[80px] -z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Shutter Grain */}
      <motion.div 
        animate={{ opacity: loading ? 0.015 : 0 }}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
