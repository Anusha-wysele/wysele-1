import React, { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HoverTiltCard } from "../../common/Parallax3D";
import { fadeSlideUp, staggerContainer, viewportSettings } from "../../common/animations";
import { SERVICES_LIST } from "../../common/data";
import HeadingBracket from "../../common/HeadingBracket";

const services = SERVICES_LIST;

function useVisibleSlides() {
  const [visible, setVisible] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth <= 640) setVisible(1);
      else if (window.innerWidth <= 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export default function Services() {
  const visibleSlides = useVisibleSlides();
  const extendedServices = [...services, ...services.slice(0, visibleSlides)];
  const totalSlides = services.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const trackRef = useRef(null);
  const slideRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const interval = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, currentIndex]);

  useEffect(() => {
    if (currentIndex >= totalSlides) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(currentIndex - totalSlides);
      }, 1050);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalSlides]);

  useEffect(() => {
    if (!isAnimating) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isAnimating]);

  const getTranslate = useCallback(() => {
    if (!slideRef.current || !trackRef.current) return 0;
    const slideWidth = slideRef.current.getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(trackRef.current).gap) || 0;
    let baseTranslate = currentIndex * (slideWidth + gap);
    if (isDragging) baseTranslate -= dragOffset;
    return baseTranslate;
  }, [currentIndex, isDragging, dragOffset]);

  const goNext = () => {
    setIsAnimating(true);
    setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    setIsAnimating(true);
    setCurrentIndex((i) => (i <= 0 ? totalSlides - 1 : i - 1));
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes("mouse") ? e.pageX : e.touches[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    setDragOffset(currentX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 75) goPrev();
    else if (dragOffset < -75) goNext();
    setDragOffset(0);
  };

  const gapVw = "2vw";
  const slideWidth =
    visibleSlides === 1
      ? "100%"
      : visibleSlides === 2
        ? `calc((100% - ${gapVw}) / 2)`
        : `calc((100% - calc(${gapVw} * 2)) / 3)`;

  return (
    <div style={{
      fontFamily: "Outfit, Inter, sans-serif",
      backgroundColor: "#ffffff",
      overflow: "hidden",
      minHeight: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px 0 60px 0"
    }}>

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainer}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          zIndex: 20,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 5vw"
        }}
      >
        <motion.div
          variants={fadeSlideUp}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            width: "100%",
            marginBottom: "16px"
          }}
        >
          <HeadingBracket size={56} style={{ transform: "translate(40px, -20px)" }} />
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              lineHeight: 1.1,
              fontWeight: "500",
              letterSpacing: "-0.03em",
              color: "#1a0b1d",
              textTransform: "capitalize",
              maxWidth: "1000px",
              margin: 0
            }}
          >
            Services
          </h1>
        </motion.div>
        <motion.h3
          variants={fadeSlideUp}
          style={{
            fontSize: "clamp(1.2rem, 2.8vw, 2rem)",
            lineHeight: 1.3,
            fontWeight: "400",
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            color: "#475569",
            maxWidth: "800px"
          }}
        >
          Delivering Excellence Through Partnership
        </motion.h3>
        {/* <motion.p
          variants={fadeSlideUp}
          style={{
            fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
            color: "#64748b",
            lineHeight: "1.7",
            maxWidth: "850px",
            fontWeight: "400",
            letterSpacing: "0.01em"
          }}
        >
          Our IT solutions are crafted to drive performance and growth—blending innovation with expertise to help businesses scale smarter and operate more efficiently. From strategy and design to development and deployment, we deliver end-to-end solutions tailored to your unique business needs.
        </motion.p> */}
      </motion.div>

      {/* SVG Clip Path */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="slider-cylinder-curve" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 Q 0.5 0.18 1 0 L 1 1 Q 0.5 0.82 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <section style={{ position: "relative", width: "100%", paddingTop: 0, margin: 0 }}>
        <div style={{
          position: "relative",
          margin: "0 auto",
          width: "100%",
          height: "50vh",
          minHeight: "280px",
          clipPath: "url(#slider-cylinder-curve)",
          WebkitClipPath: "url(#slider-cylinder-curve)",
          overflow: "visible",
          zIndex: 5
        }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "0 5vw",
              overflow: "visible",
              cursor: isDragging ? "grabbing" : "grab",
              zIndex: 10
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: gapVw,
                height: "100%",
                transform: `translateX(-${getTranslate()}px)`,
                transition: isDragging || !isAnimating
                  ? "none"
                  : "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {extendedServices.map((service, i) => (
                <SlideCard
                  key={i}
                  service={service}
                  slideWidth={slideWidth}
                  isActive={i === currentIndex + 1}
                  ref={i === 0 ? slideRef : null}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "3vh",
        }}
      >
        <NavButton onClick={goPrev} direction="left" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: "50px", height: "50px", borderRadius: "50%",
            border: "1.5px solid #1a0b1d", background: "transparent",
            color: "#1a0b1d", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", outline: "none",
            transition: "all 0.3s ease"
          }}
        >
          {isPlaying ? <Pause size={20} strokeWidth={1.5} /> : <Play size={20} strokeWidth={1.5} style={{ marginLeft: "2px" }} />}
        </button>
        <NavButton onClick={goNext} direction="right" />
      </motion.div>
    </div>
  );
}

const SlideCard = forwardRef(function SlideCard({ service, slideWidth, isActive }, ref) {
  const [hovered, setHovered] = useState(false);

  return (
    <HoverTiltCard
      ref={ref}
      tiltMultiplier={6}
      glareOpacity={0.15}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: `0 0 ${slideWidth}`,
        height: "100%",
        position: "relative",
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
        borderRadius: "12px",
        transformStyle: "preserve-3d"
      }}>
        <motion.img
          src={service.img}
          alt={service.title}
          draggable={false}
          animate={{
            filter: shadowed => hovered ? "grayscale(0)" : "grayscale(0.8)",
            scale: hovered ? 1.1 : 1.05,
            z: hovered ? -15 : 0
          }}
          transition={{ duration: 0.6 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: hovered ? 1 : 0.9,
          }}
        />

        {/* Subtle baseline gradient */}
        <motion.div
          animate={{ z: hovered ? 10 : 0 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60%",
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* The Dynamic Black/Grey Blur Overlay */}
        <motion.div
          initial={{ translateY: "100%" }}
          animate={{
            translateY: hovered ? "0%" : "100%",
            z: hovered ? 15 : 0
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(17, 24, 39, 0.3)",
            backdropFilter: "blur(6px)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* The Content Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "80px 3vw 18%",
            color: "#ffffff",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            zIndex: 3,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.h3
            animate={{
              y: hovered ? -5 : 0,
              z: hovered ? 35 : 0
            }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              fontWeight: "600",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {service.title}
          </motion.h3>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontSize: "0.9rem",
                  color: "#d1d5db",
                  lineHeight: 1.5,
                  fontWeight: "300",
                  margin: 0,
                  marginTop: "12px",
                  overflow: "visible"
                }}
              >
                {service.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </HoverTiltCard>
  );
});

function NavButton({ onClick, disabled, direction }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.1, backgroundColor: "#1a0b1d", color: "#ffffff" }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "1.5px solid #1a0b1d",
        background: "transparent",
        color: "#1a0b1d",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.3 : 1,
        transition: "all 0.3s ease",
        outline: "none",
      }}
    >
      {direction === "left" ? <ArrowLeft size={20} strokeWidth={1.5} /> : <ArrowRight size={20} strokeWidth={1.5} />}
    </motion.button>
  );
}
