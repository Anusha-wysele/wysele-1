import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

const HERO_INDUSTRIES = [
  { name: "Manufacturing", id: "manufacturing" },
  { name: "Utilities", id: "utilities" },
  { name: "Logistics", id: "logistics" },
  { name: "Pharmaceutical", id: "pharmaceutical" },
  { name: "Agribusiness", id: "agribusiness" },
  { name: "Aerospace & Defense", id: "aerospace" },
  { name: "Automotive", id: "automotive" },
  { name: "Banking & Financial", id: "banking" },
  { name: "Retail", id: "retail" },
  { name: "Textiles", id: "textiles" },
  { name: "Mining", id: "mining" },
];

const HERO_SLIDES = [
  {
    tag: "Forward-Deployed Engineering (FDE) Services",
    headline: (
      <>
        Transforming AI Ideas into <br />
        Production-Ready Business Solutions
      </>
    ),
    description: "Bridge the gap between experimental AI and real-world impact. Our embedded engineering teams work alongside your experts to rapidly deploy, customize, and scale AI-driven platforms tailored to your operational needs."
  },
  {
    tag: "Digital Excellence",
    headline: (
      <>
        Driving Business Transformation <br />
        with Tailored Digital & AI Solutions
      </>
    ),
    description: "A powerful foundation for enterprises to design and manage workflows that handle complex tasks at scale, generate meaningful insights, and continuously evolve to improve performance."
  }
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function HeroSection() {
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const numVisibleLogos = isMobile ? 3 : (isTablet ? 4 : 5);
  const [startIndex, setStartIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % HERO_INDUSTRIES.length);
    }, 4500);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(slideInterval);
    };
  }, []);

  const visibleIndustries = Array.from({ length: numVisibleLogos }).map((_, colIndex) => {
    const industryIndex = (startIndex + colIndex) % HERO_INDUSTRIES.length;
    return HERO_INDUSTRIES[industryIndex];
  });

  return (
    <div style={{
      width: isMobile ? "100%" : "calc(100% - 20px)",
      height: "calc(100vh - 60px)",
      margin: isMobile ? "60px 0 0 0" : "60px 10px 30px 10px",
      position: "relative",
      overflow: "hidden",
    }}>
      <video
        key={isMobile ? "mobile-video" : "desktop-video"}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        fetchpriority="high"
        poster={
          isMobile
            ? "https://ik.imagekit.io/czsxw7xki/Hero.mp4/ik-thumbnail.jpg?tr=w-480,q-40,f-webp"
            : "https://ik.imagekit.io/czsxw7xki/Hero.mp4/ik-thumbnail.jpg?tr=w-1200,q-80"
        }
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: isMobile ? "none" : "brightness(0.75) grayscale(0.1)",
        }}
      >
        <source
          src={
            isMobile
              ? "https://ik.imagekit.io/czsxw7xki/Hero.mp4?tr=w-480,q-30"
              : "https://ik.imagekit.io/czsxw7xki/Hero.mp4?tr=w-1280,q-60"
          }
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Mobile when filter is disabled */}
      {isMobile && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          zIndex: 1,
          pointerEvents: "none",
        }} />
      )}

      {/* Content Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          padding: isMobile ? "24px 20px 84px" : "0 64px",
          background: isMobile
            ? "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="max-w-3xl min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {/* Insights Tag */}
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-8 h-1.5 bg-[#FFD700]" />
                  <span className="text-white text-[12px] md:text-[14px] font-bold tracking-[0.2em] uppercase">
                    {HERO_SLIDES[currentSlide].tag}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  style={{
                    fontSize: isMobile ? "1.65rem" : "clamp(1.8rem, 3.8vw, 2.6rem)",
                    fontWeight: 500,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "20px",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {HERO_SLIDES[currentSlide].headline}
                </h1>

                {/* Description with Accent Line */}
                <div className="flex gap-4 md:gap-5 mb-8 md:mb-10">
                  <div className="w-[1px] bg-[#FFD700] shrink-0" />
                  <p
                    style={{
                      fontSize: isMobile ? "0.825rem" : "0.9rem",
                      color: "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.6,
                      maxWidth: "520px",
                    }}
                  >
                    {HERO_SLIDES[currentSlide].description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-2">
                  <Button
                    text="Get In Touch"
                    onClick={() => {
                      navigate('/contact');
                      window.scrollTo(0, 0);
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom Grid Border Design showing Rotating Industries */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
        display: "flex",
        height: isMobile ? "54px" : "72px",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        backgroundColor: isMobile ? "rgba(17, 24, 39, 0.6)" : "transparent",
        backdropFilter: isMobile ? "blur(8px)" : "none",
      }}>
        {visibleIndustries.map((industry, colIndex) => {
          return (
            <div
              key={colIndex}
              style={{
                flex: 1,
                borderRight: colIndex < numVisibleLogos - 1 ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
                height: "100%",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => {
                    navigate(`/industries#${industry.id}`);
                    window.scrollTo(0, 0);
                  }}
                  whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.08)" }}
                  className="absolute inset-0 flex items-center justify-center px-1.5 sm:px-4 md:px-6 cursor-pointer group"
                >
                  <span className="text-white/85 group-hover:text-white font-semibold text-[10.5px] sm:text-[14px] md:text-[16px] lg:text-[18px] tracking-wider uppercase transition-colors duration-300 whitespace-nowrap">
                    {industry.name}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
