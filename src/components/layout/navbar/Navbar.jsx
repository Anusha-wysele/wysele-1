import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import Logo from "./Logo";

// ─── Dropdown Data ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    category: "Product Design",
    items: [
      { label: "UI/UX Design", desc: "User-centric interface design systems", icon: "✦" },
      { label: "Strategy & Audit", desc: "Product discovery and UX research", icon: "◈" },
      { label: "Prototyping", desc: "High-fidelity interactive prototypes", icon: "◉" },
    ],
  },
  {
    category: "Engineering",
    items: [
      { label: "Web Development", desc: "Modern full-stack web applications", icon: "⬡" },
      { label: "Mobile Apps", desc: "Native iOS & Android development", icon: "◫" },
      { label: "E-Commerce", desc: "Scalable online shopping experiences", icon: "⟳" },
    ],
  },
  {
    category: "Growth",
    items: [
      { label: "SEO & Content", desc: "Search engine optimization and strategy", icon: "⌬" },
      { label: "Data Analytics", desc: "Custom dashboards and insights", icon: "📊" },
      { label: "AI Integration", desc: "Language models and ML pipelines", icon: "🤖" },
    ],
  }
];

const TECHNOLOGIES = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & AI",
    items: ["AWS", "Docker", "Kubernetes", "OpenAI", "LangChain", "PyTorch"],
  },
];

const FEATURED_CONTENT = {
  Services: {
    tag: "Case Study",
    title: "Revolutionizing Global Finance with AI-Driven Analytics",
    img: "/assets/navbar/featured_services.png",
    link: "/services"
  },
  Technologies: {
    tag: "Insights",
    title: "Building Scalable Systems for the Next Generation",
    img: "/assets/navbar/featured_tech.png",
    link: "/technologies"
  }
};

// ─── Mega Menu Component ─────────────────────────────────────────────────────

function MegaMenu({ type, open, scrolled }) {
  const data = type === "Services" ? SERVICES : TECHNOLOGIES;
  const featured = FEATURED_CONTENT[type];

  const menuVariants = {
    hidden: { opacity: 0, y: -20, pointerEvents: "none" },
    visible: { 
      opacity: 1, 
      y: 0, 
      pointerEvents: "auto",
      transition: { 
        duration: 0.4, 
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.2, ease: "easeIn" } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      exit="exit"
      variants={menuVariants}
      className={`fixed top-[60px] left-0 w-full backdrop-blur-[32px] z-[1000] overflow-hidden ${
        !scrolled 
          ? "bg-[rgba(10,10,15,0.98)] border-t border-b border-t-white/5 border-b-white/10 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]" 
          : "bg-white/98 border-t border-b border-t-gray-900/5 border-b-gray-900/8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-[60px] py-10 grid grid-cols-[1fr_320px] gap-[60px] items-start">
        {/* Main Links */}
        <div className="grid grid-cols-3 gap-10">
          {data.map((col) => (
            <motion.div key={col.category} variants={itemVariants}>
              <div className="text-[11px] font-extrabold tracking-[2px] uppercase text-[#fbbf24] mb-5">
                {col.category}
              </div>
              <div className="flex flex-col gap-2">
                {type === "Services" ? (
                  col.items.map((it) => (
                    <div 
                      key={it.label} 
                      className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:translate-x-2 ${
                        !scrolled 
                          ? "hover:bg-white/5 hover:border-white/10" 
                          : "hover:bg-[rgba(251,191,36,0.08)] hover:border-[rgba(251,191,36,0.2)]"
                      }`}
                    >
                      <div className="w-11 h-11 bg-[rgba(251,191,36,0.1)] rounded-xl flex items-center justify-center text-xl text-[#fbbf24] flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:-rotate-[5deg]">
                        {it.icon}
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold mb-1">{it.label}</div>
                        <div className={`text-[12.5px] leading-[1.5] ${!scrolled ? "text-white/50" : "text-gray-500/80"}`}>
                          {it.desc}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-1">
                    {col.items.map((t) => (
                      <div 
                        key={t} 
                        className="text-sm py-2.5 px-3.5 rounded-lg cursor-pointer transition-all duration-200 opacity-70 hover:opacity-100 hover:bg-[rgba(251,191,36,0.1)] hover:text-[#fbbf24] hover:translate-x-1.5 flex items-center gap-2.5 before:content-['→'] before:text-xs before:opacity-0 before:-translate-x-2.5 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.div 
          className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden flex flex-col justify-end p-[30px] bg-[#111] border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={featured.img} 
            alt="Featured" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-[600ms] hover:scale-105 hover:opacity-80" 
          />
          <div className="relative z-10">
            <div className="text-[10px] font-bold uppercase text-[#fbbf24] mb-2 tracking-wider">
              {featured.tag}
            </div>
            <div className="text-xl font-bold text-white mb-3 leading-[1.2]">
              {featured.title}
            </div>
            <button className="inline-flex items-center gap-2 text-[13px] font-semibold text-white bg-white/10 backdrop-blur-[10px] py-2.5 px-5 rounded-full border border-white/10 transition-all duration-300 hover:bg-[#fbbf24] hover:text-black hover:border-[#fbbf24]">
              Explore ↗
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const timerRef = useRef(null);

  const handleDropEnter = (name) => {
    clearTimeout(timerRef.current);
    setOpenDrop(name);
  };
  const handleDropLeave = () => {
    timerRef.current = setTimeout(() => setOpenDrop(null), 120);
  };

  const location = useLocation();
  const isAbout = location.pathname.startsWith("/about");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = isAbout ? window.innerHeight * 0.8 : 50;

      if (currentScrollY < threshold) {
        setScrolled(false);
        setHidden(false);
      } else {
        setScrolled(true);
        setHidden(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAbout]);

  const textColor = "#111827";
  const bgClass = "bg-white shadow-sm";
  const [hoveredLink, setHoveredLink] = useState(null);

  const NAV_LINKS = [
    { label: "About Us", path: "/about" },
    { label: "Services", dropdown: "Services" },
    { label: "Industries", path: "/industries" },
    { label: "Technologies", dropdown: "Technologies" },
    { label: "Careers", path: "/careers" },
  ];

  const transitionClass = hidden ? "transition-none" : "transition-transform duration-500 ease-in-out";

  return (
    <>
      <nav
        className={`w-full pl-4 pr-4 h-[60px] flex items-center justify-between fixed top-0 z-[990] ${bgClass} ${hidden ? "-translate-y-full" : "translate-y-0"
          } ${transitionClass}`}
        style={{
          borderBottom: "0.5px solid transparent",
        }}
      >
        {/* Logo */}
        <div
          className="text-3xl font-light tracking-wider cursor-pointer"
          style={{
            color: textColor,
          }}
          onClick={() => navigate("/")}
        >
          <Logo scrolled={scrolled} />
        </div>

        <nav
          className="hidden md:flex items-center gap-10 ml-auto"
        >
          <div className="flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = link.path ? location.pathname === link.path : openDrop === link.dropdown;
              const isHovered = hoveredLink === link.label;

              return (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.dropdown) handleDropEnter(link.dropdown);
                    setHoveredLink(link.label);
                  }}
                  onMouseLeave={() => {
                    if (link.dropdown) handleDropLeave();
                    setHoveredLink(null);
                  }}
                >
                  <button
                    onClick={() => {
                      if (link.path) {
                        navigate(link.path);
                        window.scrollTo(0, 0);
                      }
                    }}
                    className="text-sm font-medium transition px-3 py-2 rounded-lg flex items-center gap-1.5"
                    style={{ color: textColor }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <span className={`text-[10px] opacity-40 transition-transform duration-300 ${openDrop === link.dropdown ? "rotate-180" : ""}`}>▼</span>
                    )}
                  </button>

                  {/* Animated Underline */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      width: (isActive || isHovered) ? "calc(100% - 24px)" : "0%" 
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-1 left-3 h-[1.5px] bg-[#4BDE7B]"
                  />
                </div>
              );
            })}
          </div>
          {/* 2-line menu icon — visible on all screens */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setHoveredLink("menuIcon")}
            onMouseLeave={() => setHoveredLink(null)}
            className="transition flex flex-col justify-center items-center ml-2 w-10 h-10 relative group"
            style={{ color: textColor }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-7 h-5 overflow-hidden">
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: menuOpen ? "50%" : "30%",
                  width: "100%",
                  height: "1.5px",
                  background: "currentColor",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: menuOpen
                    ? "rotate(45deg) translateY(-50%)"
                    : `translateY(-50%) translateX(${!menuOpen && hoveredLink === "menuIcon" ? "100%" : "0"})`,
                  opacity: !menuOpen && hoveredLink === "menuIcon" ? 0 : 1,
                }}
              />
              {!menuOpen && (
                <span
                  style={{
                    position: "absolute",
                    left: "-100%",
                    top: "30%",
                    width: "100%",
                    height: "1.5px",
                    background: "currentColor",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: `translateY(-50%) translateX(${hoveredLink === "menuIcon" ? "100%" : "0"})`,
                    opacity: hoveredLink === "menuIcon" ? 1 : 0,
                  }}
                />
              )}

              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: menuOpen ? "50%" : "30%",
                  width: "100%",
                  height: "1.5px",
                  background: "currentColor",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDelay: !menuOpen && hoveredLink === "menuIcon" ? "0.1s" : "0s",
                  transform: menuOpen
                    ? "rotate(-45deg) translateY(50%)"
                    : `translateY(50%) translateX(${!menuOpen && hoveredLink === "menuIcon" ? "100%" : "0"})`,
                  opacity: !menuOpen && hoveredLink === "menuIcon" ? 0 : 1,
                }}
              />
              {!menuOpen && (
                <span
                  style={{
                    position: "absolute",
                    left: "-100%",
                    bottom: "30%",
                    width: "100%",
                    height: "1.5px",
                    background: "currentColor",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: hoveredLink === "menuIcon" ? "0.1s" : "0s",
                    transform: `translateY(50%) translateX(${hoveredLink === "menuIcon" ? "100%" : "0"})`,
                    opacity: hoveredLink === "menuIcon" ? 1 : 0,
                  }}
                />
              )}
            </div>
          </button>
        </nav>

        {/* Mobile-only fallback */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => setHoveredLink("menuIconMobile")}
          onMouseLeave={() => setHoveredLink(null)}
          className="md:hidden transition ml-auto w-10 h-10 relative flex items-center justify-center group"
          style={{
            color: textColor,
          }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-7 h-5 overflow-hidden">
            <span
              style={{
                position: "absolute",
                left: 0,
                top: menuOpen ? "50%" : "30%",
                width: "100%",
                height: "1.5px",
                background: "currentColor",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: menuOpen
                  ? "rotate(45deg) translateY(-50%)"
                  : `translateY(-50%) translateX(${!menuOpen && hoveredLink === "menuIconMobile" ? "100%" : "0"})`,
                opacity: !menuOpen && hoveredLink === "menuIconMobile" ? 0 : 1,
              }}
            />
            {!menuOpen && (
              <span
                style={{
                  position: "absolute",
                  left: "-100%",
                  top: "30%",
                  width: "100%",
                  height: "1.5px",
                  background: "currentColor",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: `translateY(-50%) translateX(${hoveredLink === "menuIconMobile" ? "100%" : "0"})`,
                  opacity: hoveredLink === "menuIconMobile" ? 1 : 0,
                }}
              />
            )}

            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: menuOpen ? "50%" : "30%",
                width: "100%",
                height: "1.5px",
                background: "currentColor",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: !menuOpen && hoveredLink === "menuIconMobile" ? "0.1s" : "0s",
                transform: menuOpen
                  ? "rotate(-45deg) translateY(50%)"
                  : `translateY(50%) translateX(${!menuOpen && hoveredLink === "menuIconMobile" ? "100%" : "0"})`,
                opacity: !menuOpen && hoveredLink === "menuIconMobile" ? 0 : 1,
              }}
            />
            {!menuOpen && (
              <span
                style={{
                  position: "absolute",
                  left: "-100%",
                  bottom: "30%",
                  width: "100%",
                  height: "1.5px",
                  background: "currentColor",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDelay: hoveredLink === "menuIconMobile" ? "0.1s" : "0s",
                  transform: `translateY(50%) translateX(${hoveredLink === "menuIconMobile" ? "100%" : "0"})`,
                  opacity: hoveredLink === "menuIconMobile" ? 1 : 0,
                }}
              />
            )}
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {(openDrop === "Services" || openDrop === "Technologies") && (
          <MegaMenu 
            key={openDrop}
            type={openDrop} 
            open={!!openDrop} 
            scrolled={scrolled} 
          />
        )}
      </AnimatePresence>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
