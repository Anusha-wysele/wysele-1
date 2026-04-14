import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroVideo from '../../../assets/Hero.mp4';

const partnerSets = [
  [
    <div key="p1" style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, color: "white", fontSize: "1.1rem", letterSpacing: "1px", display: "flex", flexDirection: "column", alignItems: "center", fontStyle: "italic" }}><span>SCHNEIDER</span><div style={{ width: "100%", height: "2px", backgroundColor: "white", marginTop: "1px" }} /></div>,
    <div key="p2" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: "white", fontSize: "1.2rem", letterSpacing: "-0.5px" }}>job&talent</div>,
    <div key="p3" style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, color: "white", fontSize: "1.2rem", letterSpacing: "0.5px", textAlign: "center", lineHeight: 1.1 }}>WERNER<br /><span style={{ fontSize: "0.65rem", fontWeight: 400, letterSpacing: "2px", display: "block", marginTop: "2px" }}>ENTERPRISES</span></div>,
    <div key="p4" style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "6px" }}>Naturgy<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "4px" }}><path d="M11 12C11 12 17 2 22 2C22 10 18 12 11 12Z" fill="white" opacity="0.9" /><path d="M11 12C11 12 17 22 22 22C22 14 18 12 11 12Z" fill="white" opacity="0.6" /></svg></div>,
    <div key="p5" style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.1rem", letterSpacing: "1px", position: "relative" }}>CMA CGM<div style={{ position: "absolute", top: "-6px", right: "-8px", width: "100%", height: "100%", borderTop: "2px solid rgba(255,255,255,0.7)", borderRight: "2px solid rgba(255,255,255,0.7)", borderRadius: "0 10px 0 0" }}></div></div>
  ],
  [
    <div key="p6" style={{ fontFamily: "Verdana, sans-serif", fontWeight: 700, color: "white", fontSize: "1.1rem", letterSpacing: "2px", textTransform: "uppercase" }}>NVIDIA</div>,
    <div key="p7" style={{ fontFamily: "Georgia, serif", fontWeight: 400, color: "white", fontSize: "1.2rem", fontStyle: "italic" }}>Salesforce</div>,
    <div key="p8" style={{ fontFamily: "Arial, sans-serif", fontWeight: 800, color: "white", fontSize: "1.3rem", letterSpacing: "-1px" }}>ORACLE</div>,
    <div key="p9" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "white", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" opacity="0.8" /></svg>Spotify</div>,
    <div key="p10" style={{ fontFamily: "Courier New, monospace", fontWeight: 700, color: "white", fontSize: "1.2rem" }}>&lt;STRIPE/&gt;</div>
  ],
  [
    <div key="p11" style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, color: "white", fontSize: "1.3rem", letterSpacing: "1px" }}>TESLA</div>,
    <div key="p12" style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.2rem" }}>Microsoft</div>,
    <div key="p13" style={{ fontFamily: "Arial Black, sans-serif", fontWeight: 900, color: "white", fontSize: "1rem", letterSpacing: "-0.5px" }}>AMAZON</div>,
    <div key="p14" style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, color: "white", fontSize: "1.2rem", letterSpacing: "2px" }}>INTEL</div>,
    <div key="p15" style={{ fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, color: "white", fontSize: "1.3rem", display: "flex", alignItems: "center" }}>CISCO<span style={{ color: "#4BDE7B", marginLeft: "2px" }}>.</span></div>
  ]
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function HeroSection() {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [btnHover, setBtnHover] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const numVisibleLogos = isMobile ? 3 : (isTablet ? 4 : 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerIndex((prev) => (prev + 1) % partnerSets.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

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

      {/* Center Text Content */}
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
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "center",
          textAlign: "center",
          padding: isMobile ? "40px 20px 60px" : "0 20px",
          marginTop: isMobile ? "0px" : "-120px",
          background: isMobile ? "#111" : "transparent",
        }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          style={{
            fontSize: isMobile ? "2.2rem" : "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: isMobile ? 1.2 : 1.05,
            marginBottom: isMobile ? "16px" : "20px",
            maxWidth: "1100px",
            letterSpacing: "-0.01em"
          }}
        >
          Driving Business Transformation <br className={isMobile ? "hidden" : "block"} />
          <span style={{ display: "inline-block", marginTop: isMobile ? "0" : "5px" }}>with Tailored Digital & AI Solutions</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          style={{
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            color: "rgba(255,255,255,0.95)",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: "750px",
            marginBottom: isMobile ? "30px" : "36px",
          }}
        >
          A powerful foundation for enterprises to design and manage workflows that handle complex tasks at scale, generate meaningful insights, and continuously evolve to improve performance.
        </motion.p>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="group"
          style={{
            color: "#ffffff",
            backgroundColor: btnHover ? "#C9184A" : "transparent",
            backdropFilter: "none",
            border: "1px solid #C9184A",
            padding: isMobile ? "12px 28px" : "10px 24px",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: "400",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span style={{ position: "relative", zIndex: 10 }}>Get In Touch</span>
          <svg
            width="16" height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "transform 0.3s ease",
              transform: btnHover ? "rotate(45deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Grid Logos Section */}
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
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 10px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPartnerIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  transform: isMobile ? "scale(0.85)" : "scale(1)"
                }}
              >
                {partnerSets[currentPartnerIndex][colIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
