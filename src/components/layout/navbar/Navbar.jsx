import { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {

  ChevronRight,

  Cpu,

  Cloud,

  ShieldCheck,

  Layout,

  Globe,

  Smartphone,

  Factory,

  Landmark,

  ShoppingBag,

  Truck,

  HeartPulse,

  Zap,

  CloudLightning,

  Brain,

  Code,

  Database,

  Terminal,

  Radio,

  ArrowRight,

  Plus,

  Linkedin

} from "lucide-react";

import Menu from "./Menu";

import Logo from "./Logo";

import LogoMobile from "./LogoMobile";

import Button from "../../common/Button";

import { WEB_DEVELOPMENT_IMAGES } from "../../common/data";




// ─── Mega Menu Data ──────────────────────────────────────────────────────────



const SAP_SERVICES = [

  { label: "SAP Consulting Services", desc: "Expert strategy and implementation.", icon: "⚙", path: "/services/sap-consulting" },

  { label: "SAP Signavio Solutions", desc: "Process mining and transformation.", icon: "📊", path: "/services/sap-signavio" },

  { label: "SAP Datasphere Support", desc: "Modern unified data experience.", icon: "🗄", path: "/services/sap-datasphere" },

  { label: "RISE with SAP", desc: "Simplified path to cloud ERP.", icon: "🚀", path: "/services/rise-with-sap" },

  { label: "BTP services", desc: "Integration and application platform.", icon: "☁", path: "/services/sap-btp" },

  { label: "SAP Integration Services", desc: "Seamless cross-system connectivity.", icon: "🔗", path: "/services/sap-integration" },

  { label: "SAP VIM & BRIM Services", desc: "Digital billing and invoice management.", icon: "📋", path: "/services/sap-vim-brim" },

  { label: "Migration Services", desc: "Secure data and system transition.", icon: "📦", path: "/services/sap-migration" },

  { label: "S/4 HANA Conversion", desc: "Intelligent ERP for the digital age.", icon: "⚡", path: "/services/sap-s4hana" },

  { label: "Gen AI Services", desc: "Next-gen AI for SAP workflows.", icon: "🤖", path: "/services/sap-genai" },

  { label: "Master Data Governance", desc: "Single source of truth for your data.", icon: "📊", path: "/services/sap-masterdata" },

  { label: "SAP BTP & API Mgmt", desc: "Build, manage and scale APIs.", icon: "🔌", path: "/services/sap-btp-api-management" },

  { label: "Technical Consulting", desc: "Deep technical SAP expertise.", icon: "🛠", path: "/services/sap-technical-consulting" },

  { label: "OpenText Services", desc: "Content and information management.", icon: "📁", path: "/services/sap-opentext" },

];



const MEGA_MENU_DATA = {

  Services: {

    sidebar: {

      title: "Our Services",

      desc: "End-to-end technology solutions to accelerate your growth.",

      link: "/services"

    },

    items: [

      { label: "SAP Services", desc: "Consulting, BTP, S/4HANA", icon: <Database size={18} />, path: "/sap-services", sublinks: SAP_SERVICES },

      { label: "Salesforce Services", desc: "CRM and multi-cloud solutions", icon: <CloudLightning size={18} />, path: "/services/salesforce" },

      { label: "Cybersecurity", desc: "Modern protection for your enterprise", icon: <ShieldCheck size={18} />, path: "/services/cybersecurityhome" },

      { label: "IT Infrastructure", desc: "Managed networks and data centers", icon: <Radio size={18} />, path: "/services/itinfrastructure" },

      { label: "Web Development", desc: "Scalable and secure web apps", icon: <Code size={18} />, path: "/services/web-development", img: WEB_DEVELOPMENT_IMAGES[0] },

      { label: "App Development", desc: "Native and hybrid mobile experiences", icon: <Smartphone size={18} />, path: "/services/app-development", img: WEB_DEVELOPMENT_IMAGES[1] },

      { label: "IoT Services", desc: "Smart connected solutions", icon: <Cpu size={18} />, path: "/services/iot-services" },

      { label: "AI/ML Services", desc: "Enterprise intelligence solutions", icon: <Brain size={18} />, path: "/services/aiml-services" },

    ],

    featured: {

      tag: "Case Study",

      title: "Digital Transformation in Logistics",

      desc: "How we helped a global shipping firm scale with SAP BTP.",

      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",

      link: "/#blogs"

    }

  },

  Industries: {

    sidebar: {

      title: "Industries",

      desc: "Specialized expertise for industry-leading outcomes.",

      link: "/industries"

    },

    items: [

      { label: "Manufacturing", desc: "Smart factories and IoT", icon: <Factory size={18} />, path: "/industries" },

      { label: "Banking & Finance", desc: "Secure and agile fintech", icon: <Landmark size={18} />, path: "/industries" },

      { label: "Retail & Commerce", desc: "Omnichannel customer success", icon: <ShoppingBag size={18} />, path: "/industries" },

      { label: "Logistics", desc: "Supply chain visibility", icon: <Truck size={18} />, path: "/industries" },

      { label: "Healthcare", desc: "Patient-centric digital health", icon: <HeartPulse size={18} />, path: "/industries" },

      { label: "Utilities", desc: "Energy efficiency and renewables", icon: <Zap size={18} />, path: "/industries" },

    ],

    featured: {

      tag: "Insight",

      title: "The Industrial Metaverse",

      desc: "Harnessing Digital Twins for manufacturing excellence.",

      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",

      link: "/#blogs"

    }

  },

  Technologies: {

    sidebar: {

      title: "Technologies",

      desc: "Powering solutions with the latest tech stacks.",

      link: "/#technologies"

    },

    items: [

      { label: "Cloud & DevOps", desc: "AWS, Azure, Google Cloud", icon: <CloudLightning size={18} />, path: "/#technologies" },

      { label: "AI & ML", desc: "Generative AI and custom LLMs", icon: <Brain size={18} />, path: "/#technologies" },

      { label: "Modern Frontend", desc: "Next.js, React, TypeScript", icon: <Code size={18} />, path: "/#technologies" },

      { label: "Data & Analytics", desc: "BI, Data Lakes, Engineering", icon: <Database size={18} />, path: "/#technologies" },

      { label: "Backend Systems", desc: "Golang, Node.js, Python", icon: <Terminal size={18} />, path: "/#technologies" },

      { label: "Mobile Tech", desc: "iOS, Android, React Native", icon: <Radio size={18} />, path: "/#technologies" },

    ],

    featured: {

      tag: "Tech Focus",

      title: "AI Integration Guide",

      desc: "Practical steps to embedding AI in your business.",

      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",

      link: "/#blogs"

    }

  }

};



// ─── Mega Menu Component ─────────────────────────────────────────────────────



function MegaMenu({ type, open, onClose }) {

  const navigate = useNavigate();

  const data = MEGA_MENU_DATA[type];

  const [hoveredItem, setHoveredItem] = useState(null);

  const leaveTimerRef = useRef(null);

  const [topPos, setTopPos] = useState(112);



  useEffect(() => {

    const updatePosition = () => {

      const navbar = document.getElementById("main-navbar");

      if (navbar) {

        const rect = navbar.getBoundingClientRect();

        setTopPos(rect.bottom);

      }

    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    window.addEventListener("scroll", updatePosition);

    return () => {

      window.removeEventListener("resize", updatePosition);

      window.removeEventListener("scroll", updatePosition);

    };

  }, []);



  if (!data) return null;



  const handleItemEnter = (item) => {

    clearTimeout(leaveTimerRef.current);

    setHoveredItem(item);

  };



  const handleItemLeave = () => {

    leaveTimerRef.current = setTimeout(() => {

      setHoveredItem(null);

    }, 150);

  };



  const handlePanelEnter = () => {

    clearTimeout(leaveTimerRef.current);

  };



  const menuVariants = {

    hidden: { opacity: 0, y: -10 },

    visible: {

      opacity: 1,

      y: 0,

      transition: {

        duration: 0.4,

        ease: [0.25, 0.1, 0.25, 1],

        staggerChildren: 0.05

      }

    },

    exit: { opacity: 0, y: -5, transition: { duration: 0.2 } }

  };



  const itemVariants = {

    hidden: { opacity: 0, y: 10 },

    visible: { opacity: 1, y: 0 }

  };



  return (

    <>

      <style>{`

        .sublinks-scroll::-webkit-scrollbar { width: 3px; }

        .sublinks-scroll::-webkit-scrollbar-track { background: transparent; }

        .sublinks-scroll::-webkit-scrollbar-thumb { background: rgba(201, 24, 74, 0.2); border-radius: 10px; }

        .sublinks-scroll::-webkit-scrollbar-thumb:hover { background: rgba(201, 24, 74, 0.4); }

      `}</style>



      <motion.div

        initial="hidden"

        animate={open ? "visible" : "hidden"}

        exit="exit"

        variants={menuVariants}

        className="fixed left-0 w-full bg-white z-[1000] border-b border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden"

        style={{ top: `${topPos}px` }}

      >

        <div className="w-full flex px-6 md:px-8 lg:px-16" onMouseLeave={handleItemLeave}>

          {/* Section 1: Sidebar (Left) */}

          <div className="w-[220px] lg:w-[260px] p-8 bg-gray-50/10 border-r border-gray-50 flex flex-col justify-between shrink-0 h-[480px]">

            <div>

              <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{data.sidebar.title}</h2>

              <p className="text-gray-500 text-[11px] leading-relaxed mb-6 font-medium">

                {data.sidebar.desc}

              </p>

            </div>



            {type !== "Services" && (
              <Button

                text="EXPLORE"

                variant="secondary"

                onClick={() => { navigate(data.sidebar.link); onClose(); }}

                className="!px-5 !py-2.5"

              />
            )}

          </div>



          {/* Section 2: Dropdown Links (Middle) */}

          <div

            className="w-[300px] lg:w-[360px] pt-6 pb-4 px-6 border-r border-gray-50 bg-white shrink-0 h-[480px] flex flex-col"

            onMouseEnter={handlePanelEnter}

          >

            <div className="space-y-1 flex-grow overflow-y-auto pr-2 sublinks-scroll">

              {data.items.map((item) => {

                const isHovered = hoveredItem?.label === item.label;

                const hasSub = !!item.sublinks;



                return (

                  <motion.div

                    key={item.label}

                    variants={itemVariants}

                    onMouseEnter={() => handleItemEnter(item)}

                    className={`group flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all duration-300 ${isHovered ? 'bg-[#C9184A]/5' : 'hover:bg-gray-50'}`}

                    onClick={() => {

                      if (item.path) {

                        navigate(item.path);

                        window.scrollTo(0, 0);

                        onClose();

                      }

                    }}

                  >

                    <div className="flex items-center gap-3.5">

                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-transparent text-[#C9184A] scale-110' : 'bg-transparent text-gray-700 group-hover:text-[#C9184A]'}`}>

                        {item.icon}

                      </div>

                      <div>

                        <h3 className={`text-xs font-bold transition-colors ${isHovered ? 'text-[#C9184A]' : 'text-gray-900'}`}>

                          {item.label}

                        </h3>

                        <p className="text-[10px] text-gray-400 font-medium truncate w-[160px] mt-0.5">{item.desc}</p>

                      </div>

                    </div>

                    {hasSub ? (

                      <motion.div animate={{ rotate: isHovered ? 90 : 0 }} className={isHovered ? 'text-[#C9184A]' : 'text-gray-200'}>

                        <Plus size={16} />

                      </motion.div>

                    ) : (

                      <ChevronRight size={14} className={`transition-all ${isHovered ? 'text-[#C9184A] opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`} />

                    )}

                  </motion.div>

                );

              })}

            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 shrink-0">

              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-4">Need help?</span>

              <p className="text-[10px] text-gray-500 pl-4 mt-2">Connect with our specialists for a free consultation.</p>

            </div>

          </div>



          {/* Section 3 & 4: Dynamic Sublinks & Image Panel */}

          <div className="flex-grow flex h-[480px] bg-gray-950 relative overflow-hidden" onMouseEnter={handlePanelEnter}>

            {/* Background Image Container */}

            <motion.div

              initial={false}

              animate={{ width: hoveredItem?.sublinks ? '35%' : '100%' }}

              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

              className="relative h-full overflow-hidden ml-auto border-l border-white/5"

            >

              <img

                src={hoveredItem?.img || data.featured.img}

                alt="Featured"

                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover:scale-110 opacity-70"

              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />



              <AnimatePresence mode="wait">

                {!hoveredItem?.sublinks && (

                  <motion.div

                    key="featured-content"

                    initial={{ opacity: 0, x: 20 }}

                    animate={{ opacity: 1, x: 0 }}

                    exit={{ opacity: 0, x: 20 }}

                    className="absolute inset-0 p-12 flex flex-col justify-end"

                  >

                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#4BDE7B] mb-4">

                      {data.featured.tag}

                    </span>

                    <h3 className="text-4xl font-black text-white mb-4 leading-tight tracking-tighter max-w-[450px]">

                      {data.featured.title}

                    </h3>

                    <p className="text-white/70 text-sm mb-10 leading-relaxed font-medium max-w-[400px]">

                      {data.featured.desc}

                    </p>

                    <button

                      onClick={() => { navigate(data.featured.link); onClose(); }}

                      className="flex items-center gap-3 text-xs font-bold text-white group/btn border-b border-[#C9184A] pb-2 w-fit"

                    >

                      READ FULL STUDY

                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />

                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>



            {/* Sublinks Panel (Beside Dropdown Links, Overlaying Dynamic Area) */}

            <AnimatePresence>

              {hoveredItem?.sublinks && (

                <motion.div

                  initial={{ width: 0, opacity: 0 }}

                  animate={{ width: '65%', opacity: 1 }}

                  exit={{ width: 0, opacity: 0 }}

                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

                  onMouseEnter={handlePanelEnter}

                  className="absolute left-0 top-0 h-full bg-white border-r border-gray-50 flex flex-col overflow-hidden shadow-[30px_0_60px_-15px_rgba(0,0,0,0.05)]"

                >

                  <div className="p-10 h-full flex flex-col">

                    <div className="mb-8">

                      <h4 className="text-[10px] font-bold tracking-[0.3em] text-[#C9184A] uppercase flex items-center gap-3 mb-2">

                        <span className="w-4 h-[1px] bg-[#C9184A]" /> {hoveredItem.label}

                      </h4>

                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Technical Portfolio</h3>

                    </div>



                    <div className="flex-grow overflow-y-auto pr-6 sublinks-scroll">

                      <div className="grid grid-cols-2 gap-x-8 gap-y-3 pb-6">

                        {hoveredItem.sublinks.map((sub, idx) => (

                          <motion.div

                            key={sub.label}

                            initial={{ opacity: 0, y: 15 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.1 + (idx * 0.02) }}

                            className="group/sub flex flex-col gap-1 cursor-pointer p-2.5 rounded-lg transition-all duration-300 hover:bg-[#C9184A]/5"

                            onClick={() => { navigate(sub.path); onClose(); }}

                          >

                            <div className="flex items-center gap-2.5">

                              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/sub:bg-[#C9184A] transition-all transform group-hover/sub:scale-125" />

                              <span className="text-[11px] font-bold text-gray-800 group-hover/sub:text-[#C9184A] transition-colors">{sub.label}</span>

                            </div>

                            <p className="text-[10px] text-gray-400 leading-relaxed pl-4 font-medium transition-colors group-hover/sub:text-gray-600">{sub.desc}</p>

                          </motion.div>

                        ))}

                      </div>

                    </div>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </motion.div>

    </>

  );

}





export default function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [hidden, setHidden] = useState(false);

  const [openDrop, setOpenDrop] = useState(null);

  const [hoveredLink, setHoveredLink] = useState(null);

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



  const isAbout = location.pathname.startsWith("/about");



  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY = window.scrollY;

      const threshold = isAbout ? window.innerHeight * 0.8 : 50;

      setScrolled(currentScrollY >= threshold);

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, [isAbout]);



  const NAV_LINKS = [

    { label: "Home", path: "/" },

    { label: "About Us", path: "/about" },

    { label: "Services", dropdown: "Services" },

    { label: "Industries", path: "/industries" },

    { label: "Careers", path: "/careers" },

  ];



  const textColor = "#111827";

  const bgClass = "bg-white border-b border-gray-100 shadow-sm";

  const transitionClass = "transition-all duration-300 ease-in-out";



  return (

    <>

      {/* Top Info Bar */}

      <motion.div

        initial={{ y: 0, opacity: 1 }}

        animate={{ y: 0, opacity: 1 }}

        className="w-full bg-black fixed top-0 z-[991]  overflow-hidden hidden md:block"

        style={{ height: '44px' }}

      >

        {/* Grid Background Pattern */}

        {/* <div

          className="absolute inset-0 pointer-events-none"

          style={{

            backgroundImage: `

              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),

              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)

            `,

            backgroundSize: '28px 28px',

          }}

        /> */}

        {/* Shimmer scan line */}

        <motion.div

          className="absolute inset-y-0 w-[120px] pointer-events-none"

          style={{

            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',

          }}

          animate={{ x: ['-120px', '110vw'] }}

          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}

        />



        <div className="w-full px-6 md:px-8 lg:px-16 h-full hidden md:grid md:grid-cols-[auto_1fr] items-center gap-12 relative z-10">



          {/* Logo on Top Bar - Small */}

          <motion.div

            initial={{ opacity: 0, x: -24 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}

            className="cursor-pointer flex-shrink-0"

            style={{ transform: 'scale(0.65)', transformOrigin: 'left center' }}

            onClick={() => navigate("/")}

          >

            <Logo white={true} />

          </motion.div>



          {/* Info Items Grid */}

          <div className="flex items-center justify-end gap-0">

            {[

              {

                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,

                text: "Hyderabad, Telangana, India"

              },

              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                text: "info@wysele.com"
              },

              {

                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>,

                text: "+91 9100042919"

              }

            ].map((item, i) => (

              <motion.div

                key={i}

                initial={{ opacity: 0, y: -14 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}

                className="flex items-center"

              >

                {i > 0 && <div className="w-[1px] h-5 bg-teal-800/60 mx-6" />}

                <motion.div

                  className="flex items-center gap-2.5 group cursor-default"

                  whileHover={{ y: -1 }}

                  transition={{ duration: 0.2 }}

                >

                  <motion.span

                    className="text-[#4BDE7B] flex-shrink-0"

                    whileHover={{ scale: 1.2, rotate: 5 }}

                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}

                  >

                    {item.icon}

                  </motion.span>

                  <span

                    className="text-[10.5px] font-medium tracking-[0.055em] text-teal-100/90 group-hover:text-white transition-colors duration-300 whitespace-nowrap"

                  >

                    {item.text}

                  </span>

                </motion.div>

              </motion.div>

            ))}

          </div>

        </div>

      </motion.div>



      <nav
        id="main-navbar"
        className={`w-full fixed z-[990] bg-white px-3 py-2 md:py-0 transition-all duration-300 top-0 md:top-[40px]`}
      >

        <div className="w-full h-full flex items-center justify-between">

          {/* Mobile Logo */}

          <div className="flex md:hidden flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>

            <LogoMobile white={false} />

          </div>

          {/* Desktop Nav Links - Left Aligned */}

          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 mr-auto">

            {NAV_LINKS.map((link) => {

              const isActive = link.path

                ? location.pathname === link.path

                : (link.dropdown === "Services"

                  ? (location.pathname.startsWith("/services/") || location.pathname === "/sap-services" || openDrop === "Services")

                  : openDrop === link.dropdown);

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

                    className="text-[12px] uppercase font-medium px-5 py-4 flex items-center gap-1.5 relative"

                    style={{ color: textColor }}

                  >

                    <AnimatePresence>

                      {isHovered && !isActive && (

                        <motion.span

                          layoutId="navHoverBg"

                          className="absolute inset-0 bg-red-100 border border-teal-100/50 -z-10"

                          initial={{ opacity: 0, scale: 0.95 }}

                          animate={{ opacity: 1, scale: 1 }}

                          exit={{ opacity: 0, scale: 0.95 }}

                          transition={{ type: "spring", stiffness: 380, damping: 30 }}

                        />

                      )}

                    </AnimatePresence>



                    <AnimatePresence>

                      {isActive && (

                        <motion.span

                          layoutId="navActiveBg"

                          className="absolute inset-0 bg-yellow-100   -z-10"

                          initial={{ opacity: 0 }}

                          animate={{ opacity: 1 }}

                          exit={{ opacity: 0 }}

                          transition={{ duration: 0.2 }}

                        />

                      )}

                    </AnimatePresence>

                    <span className="relative inline-block overflow-hidden" style={{ height: '1.5em' }}>

                      {link.label.split('').map((char, idx) => (

                        <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>

                          <motion.span

                            className="inline-block"

                            initial={false}

                            animate={{

                              y: isHovered ? '100%' : '0%',

                              opacity: isHovered ? 0 : 1

                            }}

                            transition={{

                              duration: 0.4,

                              delay: idx * 0.025,

                              ease: [0.33, 1, 0.68, 1]

                            }}

                          >

                            {char}

                          </motion.span>

                          <motion.span

                            className="inline-block absolute left-0 top-0"

                            initial={false}

                            animate={{

                              y: isHovered ? '0%' : '-100%',

                              opacity: isHovered ? 1 : 0

                            }}

                            transition={{

                              duration: 0.4,

                              delay: idx * 0.025,

                              ease: [0.33, 1, 0.68, 1]

                            }}

                          >

                            {char}

                          </motion.span>

                        </span>

                      ))}

                    </span>

                    {link.dropdown && (

                      <span className={`text-[10px] opacity-40 transition-transform duration-300 ${openDrop === link.dropdown ? "rotate-180" : ""}`}>▼</span>

                    )}

                  </button>

                </div>

              );

            })}

          </div>



          {/* Contact Us Button */}

          <div
            className="hidden md:block ml-auto mr-8 relative"
            onMouseEnter={() => setHoveredLink("Contact Us")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo(0, 0);
              }}
              className="text-[12px] uppercase font-semibold px-6 py-4 flex items-center gap-1.5 relative bg-[#FFD700] hover:bg-[#fbbf24] text-black transition-colors duration-300"
            >
              <span className="relative inline-block overflow-hidden" style={{ height: '1.5em' }}>
                {"Contact Us".split('').map((char, idx) => (
                  <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                    <motion.span
                      className="inline-block"
                      initial={false}
                      animate={{
                        y: hoveredLink === "Contact Us" ? '100%' : '0%',
                        opacity: hoveredLink === "Contact Us" ? 0 : 1
                      }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.025,
                        ease: [0.33, 1, 0.68, 1]
                      }}
                    >
                      {char}
                    </motion.span>
                    <motion.span
                      className="inline-block absolute left-0 top-0"
                      initial={false}
                      animate={{
                        y: hoveredLink === "Contact Us" ? '0%' : '-100%',
                        opacity: hoveredLink === "Contact Us" ? 1 : 0
                      }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.025,
                        ease: [0.33, 1, 0.68, 1]
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            </button>
          </div>



          {/* LinkedIn Icon */}

          <a

            href="https://www.linkedin.com/company/wysele"

            target="_blank"

            rel="noopener noreferrer"

            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:border-[#0A66C2] hover:bg-[#0A66C2] text-gray-700 hover:text-white transition-all duration-300 ml-7 mr-4"

            onMouseEnter={() => setHoveredLink("linkedin")}

            onMouseLeave={() => setHoveredLink(null)}

          >

            <Linkedin size={18} />

          </a>



          {/* Hamburger Menu Icon */}

          <button

            onClick={() => setMenuOpen(!menuOpen)}

            onMouseEnter={() => setHoveredLink("menuIcon")}

            onMouseLeave={() => setHoveredLink(null)}

            className="transition flex flex-col justify-center items-center ml-4 w-10 h-10 relative group"

            style={{ color: textColor }}

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

                  transform: menuOpen ? "rotate(45deg) translateY(-50%)" : `translateY(-50%)`,

                }}

              />

              <span

                style={{

                  position: "absolute",

                  left: 0,

                  bottom: menuOpen ? "50%" : "30%",

                  width: "100%",

                  height: "1.5px",

                  background: "currentColor",

                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",

                  transform: menuOpen ? "rotate(-45deg) translateY(50%)" : `translateY(50%)`,

                }}

              />

            </div>

          </button>

        </div>

      </nav>



      {/* Mega Menu Dropdown */}

      <AnimatePresence>

        {openDrop && (

          <div

            onMouseEnter={handleMegaMenuEnter}

            onMouseLeave={handleMegaMenuLeave}

          >

            <MegaMenu

              key={openDrop}

              type={openDrop}

              open={!!openDrop}

              onClose={() => setOpenDrop(null)}

            />

          </div>

        )}

      </AnimatePresence>



      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

    </>

  );

}

