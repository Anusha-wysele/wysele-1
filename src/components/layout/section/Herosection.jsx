import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroVideo from '../../../assets/Hero.mp4';
import Button from '../../common/Button';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  React.useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
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

  return (
    <div style={{
      width: isMobile ? "100%" : "calc(100% - 20px)",
      margin: isMobile ? "60px 0 0 0" : "60px 10px 30px 10px",
      position: "relative",
      overflow: "hidden",
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: isMobile ? "60vh" : "calc(100vh - 60px)",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.6) grayscale(0.2)",
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{
          position: isMobile ? "relative" : "absolute",
          inset: isMobile ? "auto" : 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: isMobile ? "flex-start" : "center",
          textAlign: "left",
          padding: isMobile ? "40px 20px 60px" : "0 5%",
          marginTop: isMobile ? "0px" : "0",
          background: isMobile ? "#111" : "transparent",
        }}
      >
        <div className="max-w-7xl w-full mx-auto">
          <div className="max-w-3xl">
            {/* Insights Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-1.5 bg-[#FFD700]" />
              <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Digital Excellence</span>
            </motion.div>

            {/* Headline */}
            <h1
              style={{
                fontSize: isMobile ? "1.5rem" : "clamp(1.8rem, 3.8vw, 2.6rem)",
                fontWeight: 500,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "24px",
                letterSpacing: "-0.01em"
              }}
            >
              Driving Business Transformation <br />
              with Tailored Digital & AI Solutions
            </h1>

            {/* Description with Accent Line */}
            <div className="flex gap-5 mb-10">
              <div className="w-[1px] bg-[#FFD700] shrink-0" />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                style={{
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  maxWidth: "520px",
                }}
              >
                A powerful foundation for enterprises to design and manage workflows that handle complex tasks at scale, generate meaningful insights, and continuously evolve to improve performance.
              </motion.p>
            </div>

            {/* Action Button */}
            <div className="mt-4">
              <Button
                text="Get In Touch"
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo(0, 0);
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Grid Border Design (Logos Removed) */}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: "flex",
        height: isMobile ? "60px" : "72px",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        backgroundColor: isMobile ? "#111" : "transparent",
      }}>
        {Array.from({ length: numVisibleLogos }).map((_, colIndex) => (
          <div
            key={colIndex}
            style={{
              flex: 1,
              borderRight: colIndex < numVisibleLogos - 1 ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
