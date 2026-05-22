import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeadingBracket from "../../common/HeadingBracket";


import GeethikaImg from "../../../assets/GeethikaKarrayoula.jpg";
import MadhuImg from "../../../assets/Madhu.png";
import ManikantaImg from "../../../assets/Manikanta.png";
import SaiSudhaImg from "../../../assets/RajoliSaiSudha.jpg";
import SatishImg from "../../../assets/Satish.png";
import SamyuktaImg from "../../../assets/BondiliSamyukta.png";
import LegalAdvisorImg from "../../../assets/legaladvisor.png";

const localTeamMembers = [
  {
    name: "Legal Advisor",
    img: LegalAdvisorImg,
  },
  {
    name: "Geethika Karrayoula",
    img: GeethikaImg,
  },
  {
    name: "Bondili Samyukta",
    img: SamyuktaImg,
  },
  {
    name: "Rajoli Sai Sudha",
    img: SaiSudhaImg,
  },
  {
    name: "Satish",
    img: SatishImg,
  },
  {
    name: "Madhu",
    img: MadhuImg,
  },
  {
    name: "Manikanta",
    img: ManikantaImg,
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const DribbbleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
);

const socialIcons = [
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <LinkedInIcon />, label: "LinkedIn" },
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <DribbbleIcon />, label: "Dribbble" },
];

const TRANSITION = { duration: 0.35, ease: "easeInOut" };

export default function MeetOurPeople() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsHovered(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % localTeamMembers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    // Determine target widths for calculation to prevent transition race conditions
    const isMobileDevice = width < 768;
    const isTablet = width >= 768 && width < 1024;
    
    let activeWidth, collapsedWidth;
    if (isMobileDevice) {
      activeWidth = Math.max(240, Math.min(300, width * 0.75));
      collapsedWidth = Math.max(55, Math.min(80, width * 0.15));
    } else if (isTablet) {
      activeWidth = 350;
      collapsedWidth = 90;
    } else {
      activeWidth = 450;
      collapsedWidth = 110;
    }
    
    const gap = 16; // gap-4 is 16px
    const targetLeft = activeIndex * (collapsedWidth + gap);
    const scrollTarget = targetLeft + (activeWidth / 2) - (containerWidth / 2);

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: "smooth"
    });
  }, [activeIndex, width]);

  return (
    <section className="py-6 md:py-8 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full"
        >
          {/* Left Column */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:w-[30%] w-full flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/10 text-teal-950 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
              <span>👥</span> Our Team
            </div>

            {/* Heading with Bracket */}
            <div className="relative mb-6">
              <div className="absolute -left-10 -top-8 pointer-events-none opacity-40 hidden lg:block">
                <HeadingBracket size={48} />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-gray-900 tracking-tight leading-tight relative z-10 text-center lg:text-left">
                Meet Our <br className="hidden lg:block" /> People
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm md:text-base leading-relaxed text-center lg:text-left max-w-md lg:max-w-none">
              Our dedicated team of professionals is committed to delivering excellence and innovation in every project we undertake.
            </p>
          </motion.div>

          {/* Right Column / Accordion Wrapper */}
          <div className="lg:w-[70%] w-full flex flex-col gap-6">
            <motion.div
              ref={containerRef}
              variants={fadeUpVariants}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full flex flex-row gap-4 h-[420px] lg:h-[500px] overflow-x-auto scrollbar-none relative pb-2"
            >
              {localTeamMembers.map((member, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={idx}
                    id={`team-card-${idx}`}
                    onMouseEnter={() => !isMobile && setActiveIndex(idx)}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsHovered(true);
                    }}
                    className={`relative overflow-hidden rounded-[24px] cursor-pointer transition-all duration-500 ease-in-out shadow-sm hover:shadow-md flex-shrink-0 h-full ${
                      isActive
                        ? "w-[75vw] min-w-[240px] max-w-[300px] sm:max-w-none sm:w-[280px] md:w-[350px] lg:w-[450px]"
                        : "w-[15vw] min-w-[55px] max-w-[80px] sm:max-w-none sm:w-[75px] md:w-[90px] lg:w-[110px]"
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={member.img}
                      alt={member.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                        isActive ? "scale-105 saturate-100" : "scale-100 saturate-50 brightness-75 hover:brightness-90"
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-t from-black/90 via-black/40 to-black/10"
                          : "bg-black/40"
                      }`}
                    />

                    {/* Active Details (fades and slides up) */}
                    <div
                      className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-left z-10 transition-all duration-500 delay-100 transform ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-inter font-bold text-white mb-4 leading-tight break-words">
                        {member.name}
                      </h3>

                      {/* Social icons */}
                      <div className="flex gap-2.5">
                        {socialIcons.map((social, i) => (
                          <button
                            key={social.label}
                            aria-label={social.label}
                            onClick={(e) => e.stopPropagation()} // Prevent card click trigger
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 hover:scale-105 active:scale-95 flex items-center justify-center text-white transition-all duration-200"
                          >
                            {social.icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Collapsed Badge (rotated -90deg, vertical layout) */}
                    <div
                      className={`absolute bottom-6 left-1/2 -translate-x-1/2 items-center justify-center transition-all duration-300 flex ${
                        isActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                      }`}
                    >
                      <div className="w-8 h-28 md:w-10 md:h-36 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg">
                        <span className="transform -rotate-90 origin-center whitespace-nowrap text-white text-[9px] md:text-sm font-semibold tracking-wider md:tracking-widest uppercase">
                          {member.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Scroll Navigation Buttons Below */}
            <div className="flex justify-center lg:justify-start items-center gap-4 mt-2">
              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev - 1 + localTeamMembers.length) % localTeamMembers.length);
                  setIsHovered(true);
                }}
                className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                aria-label="Previous Team Member"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>

              <button
                onClick={() => {
                  setActiveIndex((prev) => (prev + 1) % localTeamMembers.length);
                  setIsHovered(true);
                }}
                className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                aria-label="Next Team Member"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}