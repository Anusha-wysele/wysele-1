import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroVideo from '../../../assets/Hero.mp4';

const partnerSets = [
  [
    <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 900, color: "white", fontSize: "1.2rem", letterSpacing: "1px", display: "flex", flexDirection: "column", alignItems: "center", fontStyle: "italic" }}><span>SCHNEIDER</span><div style={{ width: "100%", height: "2px", backgroundColor: "white", marginTop: "1px" }} /></div>,
    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, color: "white", fontSize: "1.4rem", letterSpacing: "-0.5px" }}>job&talent</div>,
    <div style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, color: "white", fontSize: "1.3rem", letterSpacing: "0.5px", textAlign: "center", lineHeight: 1.1 }}>WERNER<br /><span style={{ fontSize: "0.75rem", fontWeight: 400, letterSpacing: "2.5px", display: "block", marginTop: "2px" }}>ENTERPRISES</span></div>,
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.4rem", display: "flex", alignItems: "center", gap: "6px" }}>Naturgy<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "4px" }}><path d="M11 12C11 12 17 2 22 2C22 10 18 12 11 12Z" fill="white" opacity="0.9" /><path d="M11 12C11 12 17 22 22 22C22 14 18 12 11 12Z" fill="white" opacity="0.6" /></svg></div>,
    <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.3rem", letterSpacing: "1px", position: "relative" }}>CMA CGM<div style={{ position: "absolute", top: "-6px", right: "-8px", width: "100%", height: "100%", borderTop: "2px solid rgba(255,255,255,0.7)", borderRight: "2px solid rgba(255,255,255,0.7)", borderRadius: "0 10px 0 0" }}></div></div>
  ],
  [
    <div style={{ fontFamily: "Verdana, sans-serif", fontWeight: 700, color: "white", fontSize: "1.3rem", letterSpacing: "2px", textTransform: "uppercase" }}>NVIDIA</div>,
    <div style={{ fontFamily: "Georgia, serif", fontWeight: 400, color: "white", fontSize: "1.4rem", fontStyle: "italic" }}>Salesforce</div>,
    <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 800, color: "white", fontSize: "1.5rem", letterSpacing: "-1px" }}>ORACLE</div>,
    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: "white", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "8px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" opacity="0.8" /></svg>Spotify</div>,
    <div style={{ fontFamily: "Courier New, monospace", fontWeight: 700, color: "white", fontSize: "1.3rem" }}>&lt;STRIPE/&gt;</div>
  ],
  [
    <div style={{ fontFamily: "Impact, sans-serif", fontWeight: 400, color: "white", fontSize: "1.5rem", letterSpacing: "1px" }}>TESLA</div>,
    <div style={{ fontFamily: "Arial, sans-serif", fontWeight: 600, color: "white", fontSize: "1.3rem" }}>Microsoft</div>,
    <div style={{ fontFamily: "Arial Black, sans-serif", fontWeight: 900, color: "white", fontSize: "1.1rem", letterSpacing: "-0.5px" }}>AMAZON</div>,
    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 300, color: "white", fontSize: "1.4rem", letterSpacing: "3px" }}>INTEL</div>,
    <div style={{ fontFamily: "Trebuchet MS, sans-serif", fontWeight: 700, color: "white", fontSize: "1.4rem", display: "flex", alignItems: "center" }}>CISCO<span style={{ color: "#4BDE7B", marginLeft: "2px" }}>.</span></div>
  ]
];

export default function HeroSection() {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerIndex((prev) => (prev + 1) % partnerSets.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: "calc(100% - 20px)", // mathematically precise: 100% width minus (10px left + 10px right)
      margin: "60px 10px 30px 10px",
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
          height: "calc(100vh - 60px)",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.6) grayscale(0.3)",
        }}
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>

      {/* Center Text Content */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 20px",
        marginTop: "-120px",
      }}>
        <h1 style={{
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          fontWeight: 400,
          color: "#fff",
          lineHeight: 1.05,
          marginBottom: "20px",
          maxWidth: "1100px",
          letterSpacing: "-0.01em"
        }}>
          Driving Business Transformation <br />
          <span style={{ display: "inline-block", marginTop: "5px" }}>with Tailored Digital Solutions</span>
        </h1>
        <p style={{
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.95)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
          lineHeight: 1.6,
          maxWidth: "750px",
          marginBottom: "36px",
        }}>
          A powerful foundation for enterprises to design and manage workflows that handle complex tasks at scale, generate meaningful insights, and continuously evolve to improve performance.
        </p>

        {/* Action Button */}
        <button
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="group"
          style={{
            color: "#ffffff",
            backgroundColor: btnHover ? "#C9184A" : "transparent",
            backdropFilter: "none",
            border: "1px solid #C9184A",
            padding: "10px 24px",
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
        </button>
      </div>

      {/* Grid Logos Section */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        display: "flex",
        height: "72px",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        backgroundColor: "transparent",
      }}>
        {Array.from({ length: 5 }).map((_, colIndex) => (
          <div
            key={colIndex}
            style={{
              flex: 1,
              borderRight: colIndex < 4 ? "1px solid rgba(255, 255, 255, 0.15)" : "none",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPartnerIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%"
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
