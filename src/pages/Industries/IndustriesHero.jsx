import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg1 from "../../assets/wysele-industrieshero1.webp";
import heroImg2 from "../../assets/wysele-industrieshero2.webp";
import heroImg3 from "../../assets/wysele-industrieshero3.webp";
import heroImg4 from "../../assets/wysele-industrieshero4.webp";
import heroImg5 from "../../assets/wysele-industrieshero5.webp";

const INDUSTRIES_HERO_SLIDER = [heroImg1, heroImg2, heroImg3, heroImg4, heroImg5];

const IndustriesHero = () => {
  const [imageCount, setImageCount] = useState(0);
  const currentImageIndex = imageCount % INDUSTRIES_HERO_SLIDER.length;

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

  const sliderMeta = [
    {
      alt: "Digital transformation solutions for modern industries by Wysele",
      title: "Industry Digital Solutions | Wysele"
    },
    {
      alt: "Enterprise industry services and digital innovation",
      title: "Industry Consulting Services | Wysele"
    },
    {
      alt: "Advanced industrial operations and business technology solutions",
      title: "Industry Technology Solutions | Wysele"
    },
    {
      alt: "Smart industrial automation and enterprise technology services",
      title: "Industry Automation Services | Wysele"
    },
    {
      alt: "Industrial digital transformation and IT infrastructure solutions",
      title: "Industry IT Solutions | Wysele"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setImageCount((prevCount) => prevCount + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen lg:h-screen overflow-hidden m-0 p-0 bg-black font-inter">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={imageCount}
            src={INDUSTRIES_HERO_SLIDER[currentImageIndex]}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ 
              opacity: { duration: 2.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" } 
            }}
            alt={sliderMeta[currentImageIndex]?.alt || `Industry ${currentImageIndex}`}
            title={sliderMeta[currentImageIndex]?.title || ""}
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </AnimatePresence>
        {/* Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 z-10" />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-20 w-full min-h-screen lg:h-screen flex flex-col justify-end pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageCount}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                },
                exit: { opacity: 0, transition: { duration: 0.5 } }
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end w-full"
            >
              {/* Left Column: Tags and Heading */}
              <div className="lg:col-span-8 space-y-4 md:space-y-6">
                {/* Tags */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {heroContent[currentImageIndex].tags.map((tag, i) => (
                    <span key={i} className="px-3.5 py-1 rounded-full border border-white/20 text-[9px] font-bold text-white/90 backdrop-blur-sm hover:bg-white hover:text-black transition-colors cursor-default whitespace-nowrap uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-light text-white leading-[1.1] tracking-tight max-w-3xl"
                >
                  {heroContent[currentImageIndex].title}
                </motion.h1>

                {/* Progress Bar & Arrow (Desktop/Tablet layout) */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.6 } }
                  }}
                  className="hidden sm:flex items-center gap-6 pt-2"
                >
                  <div className="opacity-80 text-white">
                    <ArrowUpRight className="w-10 h-10 font-thin" strokeWidth={0.5} />
                  </div>
                  <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
                    <motion.div
                      key={imageCount}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 8, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-white/80"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Description */}
              <div className="lg:col-span-4 space-y-4 lg:pb-3">
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                  className="text-white/80 text-[11px] sm:text-xs md:text-xs font-normal leading-relaxed tracking-wide max-w-md lg:max-w-sm"
                >
                  {heroContent[currentImageIndex].desc}
                </motion.p>
                
                {/* Progress Bar on Mobile (when sm:hidden) */}
                <div className="sm:hidden w-28 h-[1px] bg-white/20 relative overflow-hidden pt-0.5">
                  <motion.div
                    key={imageCount}
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
      </div>
    </section>
  );
};

export default IndustriesHero;
