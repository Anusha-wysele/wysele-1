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
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 80);

    // Timing for cinematic transition
    const tExit = setTimeout(() => {
      console.log("LoadingScreen: setLoading(false)");
      setLoading(false);
    }, 1800);
    const tDone = setTimeout(() => {
      console.log("LoadingScreen: calling onDone()");
      onDone();
    }, 2600);

    console.log("LoadingScreen: Timers started");

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
              <div className="relative flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56">

                {/* 3D Atom Orbit 1 (Maroon) */}
                <div className="absolute inset-0" style={{ transform: "rotateX(65deg) rotateY(0deg)" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border-[2.5px] border-white/5 border-t-[#800000] border-b-[#800000] shadow-[0_0_15px_rgba(128,0,0,0.5)]"
                  />
                </div>

                {/* 3D Atom Orbit 2 (Gold) */}
                <div className="absolute inset-0" style={{ transform: "rotateX(65deg) rotateY(60deg)" }}>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border-[2.5px] border-white/5 border-t-[#FFB703] border-b-[#FFB703] shadow-[0_0_15px_rgba(255,183,3,0.5)]"
                  />
                </div>

                {/* 3D Atom Orbit 3 (White) */}
                <div className="absolute inset-0" style={{ transform: "rotateX(65deg) rotateY(-60deg)" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full rounded-full border-[2px] border-white/10 border-t-white border-b-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  />
                </div>

                {/* Nucleus Energy Glow */}
                <motion.div
                  animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-10 md:inset-12 bg-white/10 rounded-full blur-xl"
                />

                {/* Center Logo */}


                {/* Progress Text */}
                <motion.div
                  className="absolute -bottom-10 md:-bottom-12 text-white/60 text-[10px] md:text-xs tracking-[0.3em] font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  LOADING {progress}%
                </motion.div>
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
