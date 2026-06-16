import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeadingBracket from "../../common/HeadingBracket";


import SamyuktaImg from "../../../assets/wysele-imgi_21_bondili-samyukta.webp";
import GeethikaImg from "../../../assets/wysele-imgi_20_geethika-karrayoula.webp";
import MadhuImg from "../../../assets/wysele-imgi_24_madhu-megavath.webp";
import ManikantaImg from "../../../assets/wysele-imgi_26_sattu-manikanta.webp";
import RamyaImg from "../../../assets/wysele-imgi_22_ramya-goruganti.webp";
import SatishImg from "../../../assets/wysele-imgi_25_satish-thirumani.webp";
import LegalAdvisorImg from "../../../assets/wysele-imgi_19_ravinder-rao-chirumamilla.webp";

const localTeamMembers = [
  {
    name: "Ravinder Rao Chirumamilla",
    role: "Legal Advisor",
    img: LegalAdvisorImg,
    alt: "Ravinder Rao Chirumamilla",
    title: "Legal Advisor"
  },
  {
    name: "Geethika Karrayoula",
    role: "Director of Operations",
    img: GeethikaImg,
    alt: "Geethika Karrayoula",
    title: "Team Member"
  },
  {
    name: "Bondili Samyukta",
    role: "Project Manager",
    img: SamyuktaImg,
    alt: "Bondili Samyukta",
    title: "Team Member"
  },
  {
    name: "Ramya Goruganti",
    role: "Admin & Facilities",
    img: RamyaImg,
    alt: "Ramya Goruganti",
    title: "Team Member"
  },
  {
    name: "Madhu Megavath",
    role: "Solution Architect",
    img: MadhuImg,
    alt: "Madhu Megavath",
    title: "Team Member"
  },
  {
    name: "Satish Thirumani",
    role: "Digital Transformation Expert",
    img: SatishImg,
    alt: "Satish Thirumani",
    title: "Team Member"
  },
  {
    name: "Sattu Manikanta",
    role: "Sales Head",
    img: ManikantaImg,
    alt: "Sattu Manikanta",
    title: "Team Member"
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
                    className={`relative overflow-hidden rounded-[24px] cursor-pointer transition-all duration-500 ease-in-out shadow-sm hover:shadow-md flex-shrink-0 h-full ${isActive
                      ? "w-[75vw] min-w-[240px] max-w-[300px] sm:max-w-none sm:w-[280px] md:w-[350px] lg:w-[450px]"
                      : "w-[15vw] min-w-[55px] max-w-[80px] sm:max-w-none sm:w-[75px] md:w-[90px] lg:w-[110px]"
                      }`}
                  >
                    {/* Image */}
                    <img loading="lazy" src={member.img}
                      alt={member.alt}
                      title={member.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isActive ? "scale-105 saturate-100" : "scale-100 saturate-50 brightness-75 hover:brightness-90"
                        }`}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${isActive
                        ? "bg-gradient-to-t from-black/90 via-black/40 to-black/10"
                        : "bg-black/40"
                        }`}
                    />

                    {/* Active Details (fades and slides up) */}
                    <div
                      className={`absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-left z-10 transition-all duration-500 delay-100 transform ${isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                    >
                      <h3 className="text-lg sm:text-2xl md:text-2xl font-inter font-medium text-white mb-1 leading-tight break-words">
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-xs font-inter font-medium text-teal-300 mb-4 tracking-wide uppercase">
                        {member.role}
                      </p>

                      {/* Social icons */}
                      {/* <div className="flex gap-2.5">
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
                      </div> */}
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
                  <path d="M19 12H5M12 19l-7-7 7-7" />
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}