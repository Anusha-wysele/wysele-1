import { useEffect, useState } from "react";

const ScrollNavigation = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeSection;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;

          const distanceToTop = Math.abs(rect.top - viewportCenter);
          const distanceToBottom = Math.abs(rect.bottom - viewportCenter);
          const distance = Math.min(distanceToTop, distanceToBottom);

          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentSection = section.id;
            minDistance = 0;
          } else if (distance < minDistance && rect.top < window.innerHeight && rect.bottom > 0) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, activeSection]);

  const handleDotClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-4 top-1/2 transform -translate-y-1/2 z-[100] flex-col gap-5 items-end">
      {sections.filter(s => !s.hideDot).map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;
        const showFull = isActive || isHovered;

        return (
          <div
            key={section.id}
            className="flex items-center gap-4 group cursor-pointer relative"
            onClick={() => handleDotClick(section.id)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Label Preview */}
            <div
              className={`flex items-center bg-[#94a3b8] shadow-2xl rounded-lg py-1.5 px-4 border border-[#64748b] transition-all duration-500 ease-out absolute right-8 transform origin-right ${showFull ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 translate-x-4 pointer-events-none"
                }`}
            >
              <span className="text-white font-bold text-[11px] whitespace-nowrap uppercase tracking-widest">
                {section.label}
              </span>
            </div>

            {/* The Dot */}
            <div className="flex items-center justify-center w-6 h-6 z-10">
              <div
                className={`transition-all duration-500 rounded-full flex items-center justify-center ${showFull
                    ? "w-6 h-6 border-[1.5px] border-transparent bg-transparent"
                    : "w-2.5 h-2.5 bg-transparent border-[1.5px] border-transparent group-hover:bg-[#C9184A] group-hover:border-[#C9184A] group-hover:scale-125"
                  }`}
              >
                {showFull && <div className="w-2 h-2 bg-[#C9184A] rounded-full shadow-[0_0_8px_rgba(201,24,74,0.4)]"></div>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScrollNavigation;


