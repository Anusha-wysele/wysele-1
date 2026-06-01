import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const INDUSTRIES = [
  "Manufacturing", "Utilities", "Logistics", "Pharmaceutical", 
  "Agribusiness", "Aerospace", "Automotive", "Banking", 
  "Retail", "Textiles", "Mining"
];

const IndustriesNav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [stickyTop, setStickyTop] = useState(68);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.getElementById("main-navbar") || document.querySelector("nav.fixed");
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        setStickyTop(rect.bottom);
      }
    };

    updateNavbarHeight();
    const timer = setTimeout(updateNavbarHeight, 100);

    window.addEventListener("resize", updateNavbarHeight);
    window.addEventListener("scroll", updateNavbarHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateNavbarHeight);
      window.removeEventListener("scroll", updateNavbarHeight);
    };
  }, []);

  // Update horizontal scroll indicators (fades)
  const handleScrollIndicators = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollIndicators);
      handleScrollIndicators();
    }
    window.addEventListener("resize", handleScrollIndicators);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScrollIndicators);
      }
      window.removeEventListener("resize", handleScrollIndicators);
    };
  }, []);

  // Scroll active tab into view
  useEffect(() => {
    if (activeSection) {
      const activeBtn = scrollContainerRef.current?.querySelector(`.tab-btn-${activeSection}`);
      if (activeBtn && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeBtn.offsetLeft;
        const buttonWidth = activeBtn.offsetWidth;
        
        container.scrollTo({
          left: buttonLeft - (containerWidth / 2) + (buttonWidth / 2),
          behavior: "smooth"
        });
      }
    }
    // Re-verify indicators after smooth scroll finishes
    const timer = setTimeout(handleScrollIndicators, 300);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = INDUSTRIES.map(alt => alt.toLowerCase().split(' ')[0]);
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust intersection threshold based on header height
          if (rect.top <= stickyTop + 85) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyTop]);

  return (
    <nav 
      className="sticky z-[900] bg-white border-b border-gray-100 shadow-sm py-1.5 md:py-2"
      style={{ top: `${stickyTop}px` }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative">
        {/* Left Fade Overlay */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 z-30 ${showLeftArrow ? "opacity-100" : "opacity-0"}`} 
        />
        
        {/* Right Fade Overlay */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300 z-30 ${showRightArrow ? "opacity-100" : "opacity-0"}`} 
        />

        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto no-scrollbar py-1 relative scroll-smooth gap-1 md:gap-2"
        >
          {INDUSTRIES.map((alt, index) => {
            const id = alt.toLowerCase().split(' ')[0];
            const isActive = activeSection === id;
            
            return (
              <React.Fragment key={alt}>
                <motion.button
                  whileHover={{ backgroundColor: isActive ? "" : "#fafafa" }}
                  onClick={() => {
                    const element = document.getElementById(id);
                    if (element) {
                      const offset = stickyTop + 55;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`tab-btn-${id} relative px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11.5px] font-bold tracking-[0.05em] uppercase whitespace-nowrap transition-colors duration-300 flex-shrink-0 z-20 rounded-full
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <span className="relative z-20">{alt}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#D4AF37] rounded-full z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default IndustriesNav;
