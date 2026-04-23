import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES_HERO_SLIDER } from "../../components/common/data";

const IndustriesHero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroContent = [
    {
      number: "01",
      title: "Transforming Industries with Wysele Solutions",
      desc: "We drive industry transformation through digital innovation, delivering tailored solutions that enable operational excellence and sustained business growth.",
      tags: ["Digital Innovation", "Growth Strategy"]
    },
    {
      number: "02",
      title: "Driving Innovation Across Industries with Wysele",
      desc: "We empower businesses with cutting-edge digital solutions, helping them enhance efficiency, adapt to change, and achieve long-term growth.",
      tags: ["Cloud Transformation", "Agility"]
    },
    {
      number: "03",
      title: "Enabling Business Excellence Through Wysele Solutions",
      desc: "We deliver tailored digital strategies that streamline operations, improve performance, and accelerate transformation across industries.",
      tags: ["Operational Excellence", "Performance"]
    },
    {
      number: "04",
      title: "Reimagining Industries with Wysele Expertise",
      desc: "We help organizations embrace innovation and modern technologies to optimize processes and unlock new opportunities for growth.",
      tags: ["Technology Integration", "Optimization"]
    },
    {
      number: "05",
      title: "Empowering Enterprises with Digital Transformation",
      desc: "We provide scalable and intelligent solutions that drive efficiency, foster innovation, and support sustainable business success.",
      tags: ["Intelligent Solutions", "Sustainability"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % INDUSTRIES_HERO_SLIDER.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden m-0 p-0 bg-black font-inter">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImageIndex}
            src={INDUSTRIES_HERO_SLIDER[currentImageIndex]}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ 
              opacity: { duration: 2.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" } 
            }}
            alt={`Industry ${currentImageIndex}`}
            className="absolute inset-0 w-full h-full object-fill block"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 w-full h-full">
        <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20 h-full relative">
          
          {/* Top Left Content: Heading, Arrow & Progress */}
          <div className="absolute top-[45%] left-6 md:left-12 lg:left-20 max-w-2xl w-full h-[400px]">
            <AnimatePresence>
              <motion.div 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                {/* Sliding Heading */}
                <motion.h1
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-4xl lg:text-[45px] font-light text-white leading-[1.05] mb-8 tracking-tight"
                >
                  {heroContent[currentImageIndex].title.split(' ').map((word, i) => (
                    <span key={i}>
                      {word}{' '}
                    </span>
                  ))}
                </motion.h1>
                
                <div className="flex flex-col gap-10">
                  {/* Sliding Arrow */}
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="opacity-80 text-white"
                  >
                    <ArrowUpRight className="w-16 h-16 font-thin" strokeWidth={0.5} />
                  </motion.div>
                  
                  {/* Static Progress Bar (Fades only) */}
                  <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden ml-12">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-white/80"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Left: Tags */}
          <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 w-fit h-12">
            <AnimatePresence>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <div className="flex gap-3">
                  {heroContent[currentImageIndex].tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full border border-white/20 text-[10px] text-white/90 backdrop-blur-md hover:bg-white hover:text-black transition-colors cursor-default whitespace-nowrap uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Center/Right: Description */}
          <div className="absolute bottom-12 left-[40%] md:left-[35%] lg:left-[30%] max-w-sm w-full h-12">
            <AnimatePresence>
              <motion.p
                key={currentImageIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 text-white text-[11px] md:text-xs font-normal leading-relaxed tracking-wide"
              >
                {heroContent[currentImageIndex].desc}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustriesHero;
