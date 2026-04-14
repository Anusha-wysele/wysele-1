import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import Logo from "./Logo";

// ─── Dropdown Data ──────────────────────────────────────────────────────────

const SAP_SERVICES = [
  { label: "SAP Consulting Services", desc: "Tailored SAP solutions to drive business efficiency and innovation.", icon: "⚙" },
  { label: "SAP Signavio Solutions", desc: "Optimize business processes with advanced Signavio analytics.", icon: "📊" },
  { label: "SAP Datasphere Support", desc: "Seamless data integration and management across your enterprise.", icon: "🗄" },
  { label: "RISE with SAP", desc: "Accelerate your digital transformation with cloud-based SAP solutions.", icon: "🚀" },
  { label: "BTP services", desc: "Enhance agility with SAP Business Technology Platform capabilities.", icon: "☁" },
  { label: "SAP Integration Services", desc: "Connect SAP and non-SAP systems for seamless data flow.", icon: "🔗" },
  { label: "SAP VIM & BRIM Services", desc: "Streamline invoicing and billing with automation using SAP solutions.", icon: "📋" },
  { label: "Migration Services", desc: "Hassle-free SAP migration for smooth business continuity.", icon: "📦" },
  { label: "SAP S/4 HANA Conversion Services", desc: "Upgrade to S/4HANA for enhanced speed and intelligence.", icon: "⚡" },
  { label: "Gen AI Services", desc: "Unlock AI-driven insights and automation with SAP solutions.", icon: "🤖" },
  { label: "SAP OpenText Services & Archiving Services", desc: "Secure, store, and manage enterprise documents efficiently.", icon: "📁" },
  { label: "SAP BTP & API Management", desc: "Integrate and scale applications with SAP API tools.", icon: "🔌" },
  { label: "Technical SAP Consulting Services", desc: "Expert guidance for optimizing your SAP landscape.", icon: "🛠" },
  { label: "Master Data Governance (MDG) Services", desc: "Ensure data accuracy and consistency across your systems.", icon: "📊" },
];

const SERVICES = [
  {
    category: "SAP & Enterprise",
    items: [
      { label: "SAP Services", desc: "Comprehensive SAP solutions including S/4HANA, BTP, and Migration", icon: "⬡", hasSubmenu: true },
      { label: "Salesforce Services", desc: "Boost customer engagement with tailored Salesforce solutions", icon: "☁" },
      { label: "Enterprise Digital Transformation", desc: "Future-proof your business with end-to-end digital transformation", icon: "⟳" },
    ],
  },
  {
    category: "Infrastructure & Security",
    items: [
      { label: "IT Infrastructure – SOC & NOC", desc: "24/7 monitoring and security for your IT infrastructure", icon: "◈" },
      { label: "IT Infrastructure Services", desc: "Scalable IT solutions to support business growth", icon: "◫" },
      { label: "Cybersecurity Services", desc: "Protect your digital assets with cutting-edge security solutions", icon: "⌬" },
    ],
  },
  {
    category: "Development",
    items: [
      { label: "Web Development", desc: "Build scalable, responsive, and high-performance web applications", icon: "✦" },
      { label: "App Development", desc: "Create intuitive, feature-rich mobile experiences for iOS and Android", icon: "◉" },
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
  const [hoveredService, setHoveredService] = useState(null);
  const submenuTimerRef = useRef(null);

  const handleServiceEnter = (label) => {
    clearTimeout(submenuTimerRef.current);
    setHoveredService(label);
  };

  const handleServiceLeave = () => {
    submenuTimerRef.current = setTimeout(() => {
      setHoveredService(null);
    }, 200);
  };

  const handleSubmenuEnter = () => {
    clearTimeout(submenuTimerRef.current);
  };

  const handleSubmenuLeave = () => {
    setHoveredService(null);
  };

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      scaleY: 0,
      rotateX: -45,
      transformOrigin: "top center",
      pointerEvents: "none",
      y: -50,
      filter: "blur(15px)"
    },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      rotateX: 0,
      transformOrigin: "top center",
      pointerEvents: "auto",
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.0, 
        ease: [0.16, 1.0, 0.3, 1.0],
        opacity: { duration: 0.6, delay: 0.15, ease: [0.16, 1.0, 0.3, 1.0] },
        scaleY: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
        rotateX: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
        y: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
        filter: { duration: 0.7, ease: [0.16, 1.0, 0.3, 1.0] },
        staggerChildren: 0.08,
        delayChildren: 0.35
      }
    },
    exit: { 
      opacity: 0, 
      scaleY: 0,
      rotateX: -30,
      transformOrigin: "top center",
      y: -30,
      filter: "blur(12px)",
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        scaleY: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        rotateX: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        filter: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
      } 
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -30, 
      scale: 0.85,
      rotateX: -15,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.7,
        ease: [0.16, 1.0, 0.3, 1.0],
        filter: { duration: 0.6 }
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      exit="exit"
      variants={menuVariants}
      style={{ 
        perspective: "2000px",
        transformStyle: "preserve-3d"
      }}
      className="fixed top-[60px] left-0 w-full backdrop-blur-lg z-[1000] bg-white border-b border-gray-200 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.4)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {type === "Services" ? (
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((col) => (
                <motion.div key={col.category} variants={itemVariants} className="space-y-4">
                  <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">
                    {col.category}
                  </h3>
                  <div className="space-y-2">
                    {col.items.map((item) => (
                      <div 
                        key={item.label}
                        className="group relative p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
                        onMouseEnter={() => item.hasSubmenu && handleServiceEnter(item.label)}
                        onMouseLeave={() => item.hasSubmenu && handleServiceLeave()}
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-lg mt-0.5 text-gray-400 group-hover:text-[#C9184A] transition-colors">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#C9184A] transition-colors flex items-center gap-1">
                              {item.label}
                              {item.hasSubmenu && <span className="text-xs">→</span>}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        
                        {/* SAP Services Submenu */}
                        {item.hasSubmenu && hoveredService === item.label && (
                          <>
                            {/* Invisible bridge to prevent gap */}
                            <div 
                              className="absolute left-full top-0 w-4 h-full z-40"
                              onMouseEnter={handleSubmenuEnter}
                              onMouseLeave={handleServiceLeave}
                            />
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="absolute left-[calc(100%+8px)] top-0 w-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50"
                              onMouseEnter={handleSubmenuEnter}
                              onMouseLeave={handleSubmenuLeave}
                            >
                              <h4 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-3">SAP Services</h4>
                              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                                {SAP_SERVICES.map((sapService) => (
                                  <div
                                    key={sapService.label}
                                    className="p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
                                  >
                                    <div className="flex items-start gap-2">
                                      <div className="text-sm mt-0.5 text-gray-400">
                                        {sapService.icon}
                                      </div>
                                      <div>
                                        <div className="text-xs font-semibold text-gray-900 mb-0.5">
                                          {sapService.label}
                                        </div>
                                        <div className="text-[10px] text-gray-500 leading-relaxed">
                                          {sapService.desc}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.map((col) => (
              <motion.div key={col.category} variants={itemVariants}>
                <div className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">
                  {col.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {col.items.map((t) => (
                    <div 
                      key={t}
                      className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-[#C9184A] hover:text-white transition-all duration-200 cursor-pointer font-medium"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
    timerRef.current = setTimeout(() => setOpenDrop(null), 300);
  };
  const handleMegaMenuEnter = () => {
    clearTimeout(timerRef.current);
  };
  const handleMegaMenuLeave = () => {
    setOpenDrop(null);
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
        className={`w-full px-4 sm:px-6 h-[60px] flex items-center justify-between fixed top-0 z-[990] ${bgClass} ${hidden ? "-translate-y-full" : "translate-y-0"
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

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 ml-auto">
          <div className="flex items-center gap-1 lg:gap-2">
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
                    className="text-sm font-medium transition px-2 lg:px-3 py-2 rounded-lg flex items-center gap-1.5"
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
                      width: (isActive || isHovered) ? "calc(100% - 16px)" : "0%" 
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-1 left-2 lg:left-3 h-[1.5px] bg-[#4BDE7B]"
                  />
                </div>
              );
            })}
          </div>
        </nav>

        {/* Hamburger — always visible (desktop + mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => setHoveredLink("menuIcon")}
          onMouseLeave={() => setHoveredLink(null)}
          className="transition flex flex-col justify-center items-center ml-2 md:ml-4 w-10 h-10 relative group flex-shrink-0"
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

      <AnimatePresence>
        {(openDrop === "Services" || openDrop === "Technologies") && (
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <MegaMenu 
              key={openDrop}
              type={openDrop} 
              open={!!openDrop} 
              scrolled={scrolled} 
            />
          </div>
        )}
      </AnimatePresence>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
