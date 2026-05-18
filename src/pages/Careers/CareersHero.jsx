import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Globe, Rocket, Award } from 'lucide-react';

const CareersHero = () => {
  const metrics = [
    { label: "50+ Team Members", icon: <Users className="w-4 h-4" /> },
    { label: "Remote Friendly", icon: <Globe className="w-4 h-4" /> },
    { label: "Career Growth", icon: <Rocket className="w-4 h-4" /> },
    { label: "Enterprise Projects", icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <section className="relative w-full min-h-[560px] lg:h-[600px] overflow-hidden font-sans pt-20">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.pexels.com/photos/3184420/pexels-photo-3184420.jpeg" 
          alt="Enterprise Collaboration" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="space-y-8"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ffcc00] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 flex items-center gap-2">
                  <span className="text-[#ffcc00]">✨</span> We're hiring
                </span>
              </div>
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-xl md:text-3xl lg:text-4xl font-normal leading-[1.1] text-white"
            >
              Your Next Big {" "}
              <span className="text-[#ffcc00] font-normal">Opportunity</span>{" "}
              Starts Here
            </motion.h1>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
            >
              Join a team of visionaries dedicated to architecting the next generation of scalable technology solutions. We foster innovation, collaboration, and growth to build a future-ready digital world.
            </motion.p>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
            >
              <button 
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 py-4 bg-[#800000] text-white text-sm font-bold  hover:bg-[#C9184A] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group"
              >
                View Open Positions
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white text-sm font-bold  hover:bg-white/10 transition-all duration-300">
                Life at Wysele
              </button>
            </motion.div>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4
                }
              }
            }}
            className="pt-6 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-white/10"
          >
            {metrics.map((metric, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 border-white/10 flex items-center justify-center text-[#ffcc00] group-hover:bg-[#ffcc00] group-hover:text-[#800000] transition-all duration-500">
                  {metric.icon}
                </div>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white to-white/0" />
      </motion.div>

    </section>
  );
};

export default CareersHero;
