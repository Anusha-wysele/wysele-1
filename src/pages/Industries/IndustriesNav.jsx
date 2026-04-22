import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { industryImages } from "../../components/common/data";

const IndustriesNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = industryImages.map(img => img.alt.toLowerCase().split(' ')[0]);
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section's top is near the top of the viewport
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-[68px] z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center overflow-x-auto no-scrollbar py-0">
          {industryImages.map((industry, index) => {
            const id = industry.alt.toLowerCase().split(' ')[0];
            const isActive = activeSection === id;
            
            return (
              <React.Fragment key={industry.alt}>
                <motion.button
                  whileHover={{ backgroundColor: "#fafafa" }}
                  onClick={() => {
                    const element = document.getElementById(id);
                    if (element) {
                      const offset = 120;
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
                  className={`relative px-3.5 py-4 text-[12px] font-bold tracking-[0.05em] uppercase whitespace-nowrap transition-all duration-300 flex-shrink-0
                    ${isActive ? 'bg-[#D4AF37] text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {industry.alt}
                  {/* Active Indicator Line if not using full box background */}
                  {/* isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9184A]" 
                    />
                  ) */}
                </motion.button>
                
                {/* Border Line after each item except the last one */}
                {index < industryImages.length - 1 && (
                  <div className="h-3 w-[1px] bg-gray-200 flex-shrink-0 hidden md:block" />
                )}
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
