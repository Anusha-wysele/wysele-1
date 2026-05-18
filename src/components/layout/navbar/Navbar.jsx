// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Menu from "./Menu";
// import Logo from "./Logo";

// // ─── Dropdown Data ──────────────────────────────────────────────────────────

// const SAP_SERVICES = [
//   { label: "SAP Consulting Services", desc: "Tailored SAP solutions to drive business efficiency and innovation.", icon: "⚙" },
//   { label: "SAP Signavio Solutions", desc: "Optimize business processes with advanced Signavio analytics.", icon: "📊" },
//   { label: "SAP Datasphere Support", desc: "Seamless data integration and management across your enterprise.", icon: "🗄" },
//   { label: "RISE with SAP", desc: "Accelerate your digital transformation with cloud-based SAP solutions.", icon: "🚀" },
//   { label: "BTP services", desc: "Enhance agility with SAP Business Technology Platform capabilities.", icon: "☁" },
//   { label: "SAP Integration Services", desc: "Connect SAP and non-SAP systems for seamless data flow.", icon: "🔗" },
//   { label: "SAP VIM & BRIM Services", desc: "Streamline invoicing and billing with automation using SAP solutions.", icon: "📋" },
//   { label: "Migration Services", desc: "Hassle-free SAP migration for smooth business continuity.", icon: "📦" },
//   { label: "SAP S/4 HANA Conversion Services", desc: "Upgrade to S/4HANA for enhanced speed and intelligence.", icon: "⚡" },
//   { label: "Gen AI Services", desc: "Unlock AI-driven insights and automation with SAP solutions.", icon: "🤖" },
//   { label: "SAP OpenText Services & Archiving Services", desc: "Secure, store, and manage enterprise documents efficiently.", icon: "📁" },
//   { label: "SAP BTP & API Management", desc: "Integrate and scale applications with SAP API tools.", icon: "🔌" },
//   { label: "Technical SAP Consulting Services", desc: "Expert guidance for optimizing your SAP landscape.", icon: "🛠" },
//   { label: "Master Data Governance (MDG) Services", desc: "Ensure data accuracy and consistency across your systems.", icon: "📊" },
// ];

// const SERVICES = [
//   {
//     category: "SAP & Enterprise",
//     items: [
//       { label: "SAP Services", desc: "Comprehensive SAP solutions including S/4HANA, BTP, and Migration", icon: "⬡", hasSubmenu: true },
//       { label: "Salesforce Services", desc: "Boost customer engagement with tailored Salesforce solutions", icon: "☁" },
//       { label: "Enterprise Digital Transformation", desc: "Future-proof your business with end-to-end digital transformation", icon: "⟳" },
//     ],
//   },
//   {
//     category: "Infrastructure & Security",
//     items: [
//       { label: "IT Infrastructure – SOC & NOC", desc: "24/7 monitoring and security for your IT infrastructure", icon: "◈" },
//       { label: "IT Infrastructure Services", desc: "Scalable IT solutions to support business growth", icon: "◫" },
//       { label: "Cybersecurity Services", desc: "Protect your digital assets with cutting-edge security solutions", icon: "⌬" },
//     ],
//   },
//   {
//     category: "Development",
//     items: [
//       { label: "Web Development", desc: "Build scalable, responsive, and high-performance web applications", icon: "✦" },
//       { label: "App Development", desc: "Create intuitive, feature-rich mobile experiences for iOS and Android", icon: "◉" },
//     ],
//   }
// ];

// const TECHNOLOGIES = [
//   {
//     category: "Frontend",
//     items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
//   },
//   {
//     category: "Backend",
//     items: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL", "Redis"],
//   },
//   {
//     category: "Cloud & AI",
//     items: ["AWS", "Docker", "Kubernetes", "OpenAI", "LangChain", "PyTorch"],
//   },
// ];

// const FEATURED_CONTENT = {
//   Services: {
//     tag: "Case Study",
//     title: "Revolutionizing Global Finance with AI-Driven Analytics",
//     img: "/assets/navbar/featured_services.png",
//     link: "/services"
//   },
//   Technologies: {
//     tag: "Insights",
//     title: "Building Scalable Systems for the Next Generation",
//     img: "/assets/navbar/featured_tech.png",
//     link: "/technologies"
//   }
// };

// // ─── Mega Menu Component ─────────────────────────────────────────────────────

// function MegaMenu({ type, open, scrolled }) {
//   const data = type === "Services" ? SERVICES : TECHNOLOGIES;
//   const [hoveredService, setHoveredService] = useState(null);
//   const submenuTimerRef = useRef(null);

//   const handleServiceEnter = (label) => {
//     clearTimeout(submenuTimerRef.current);
//     setHoveredService(label);
//   };

//   const handleServiceLeave = () => {
//     submenuTimerRef.current = setTimeout(() => {
//       setHoveredService(null);
//     }, 200);
//   };

//   const handleSubmenuEnter = () => {
//     clearTimeout(submenuTimerRef.current);
//   };

//   const handleSubmenuLeave = () => {
//     setHoveredService(null);
//   };

//   const menuVariants = {
//     hidden: { 
//       opacity: 0, 
//       scaleY: 0,
//       rotateX: -45,
//       transformOrigin: "top center",
//       pointerEvents: "none",
//       y: -50,
//       filter: "blur(15px)"
//     },
//     visible: { 
//       opacity: 1, 
//       scaleY: 1,
//       rotateX: 0,
//       transformOrigin: "top center",
//       pointerEvents: "auto",
//       y: 0,
//       filter: "blur(0px)",
//       transition: { 
//         duration: 1.0, 
//         ease: [0.16, 1.0, 0.3, 1.0],
//         opacity: { duration: 0.6, delay: 0.15, ease: [0.16, 1.0, 0.3, 1.0] },
//         scaleY: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
//         rotateX: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
//         y: { duration: 1.0, ease: [0.16, 1.0, 0.3, 1.0] },
//         filter: { duration: 0.7, ease: [0.16, 1.0, 0.3, 1.0] },
//         staggerChildren: 0.08,
//         delayChildren: 0.35
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       scaleY: 0,
//       rotateX: -30,
//       transformOrigin: "top center",
//       y: -30,
//       filter: "blur(12px)",
//       transition: { 
//         duration: 0.5, 
//         ease: [0.4, 0, 0.2, 1],
//         opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
//         scaleY: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
//         rotateX: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
//         filter: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
//       } 
//     }
//   };

//   const itemVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: -30, 
//       scale: 0.85,
//       rotateX: -15,
//       filter: "blur(6px)"
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       rotateX: 0,
//       filter: "blur(0px)",
//       transition: { 
//         duration: 0.7,
//         ease: [0.16, 1.0, 0.3, 1.0],
//         filter: { duration: 0.6 }
//       } 
//     }
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate={open ? "visible" : "hidden"}
//       exit="exit"
//       variants={menuVariants}
//       style={{ 
//         perspective: "2000px",
//         transformStyle: "preserve-3d"
//       }}
//       className="fixed top-[60px] left-0 w-full backdrop-blur-lg z-[1000] bg-white border-b border-gray-200 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.4)]"
//     >
//       <div className="max-w-[1200px] 3xl:max-w-[1400px] 4xl:max-w-[1600px] mx-auto px-6 py-8">
//         {type === "Services" ? (
//           <div className="relative">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {data.map((col) => (
//                 <motion.div key={col.category} variants={itemVariants} className="space-y-4">
//                   <h3 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">
//                     {col.category}
//                   </h3>
//                   <div className="space-y-2">
//                     {col.items.map((item) => (
//                       <div 
//                         key={item.label}
//                         className="group relative p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
//                         onMouseEnter={() => item.hasSubmenu && handleServiceEnter(item.label)}
//                         onMouseLeave={() => item.hasSubmenu && handleServiceLeave()}
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="text-lg mt-0.5 text-gray-400 group-hover:text-[#C9184A] transition-colors">
//                             {item.icon}
//                           </div>
//                           <div className="flex-1">
//                             <div className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#C9184A] transition-colors flex items-center gap-1">
//                               {item.label}
//                               {item.hasSubmenu && <span className="text-xs">→</span>}
//                             </div>
//                             <div className="text-xs text-gray-500 leading-relaxed">
//                               {item.desc}
//                             </div>
//                           </div>
//                         </div>

//                         {/* SAP Services Submenu */}
//                         {item.hasSubmenu && hoveredService === item.label && (
//                           <>
//                             {/* Invisible bridge to prevent gap */}
//                             <div 
//                               className="absolute left-full top-0 w-4 h-full z-40"
//                               onMouseEnter={handleSubmenuEnter}
//                               onMouseLeave={handleServiceLeave}
//                             />
//                             <motion.div
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               exit={{ opacity: 0, x: -10 }}
//                               className="absolute left-[calc(100%+8px)] top-0 w-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50"
//                               onMouseEnter={handleSubmenuEnter}
//                               onMouseLeave={handleSubmenuLeave}
//                             >
//                               <h4 className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-3">SAP Services</h4>
//                               <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
//                                 {SAP_SERVICES.map((sapService) => (
//                                   <div
//                                     key={sapService.label}
//                                     className="p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
//                                   >
//                                     <div className="flex items-start gap-2">
//                                       <div className="text-sm mt-0.5 text-gray-400">
//                                         {sapService.icon}
//                                       </div>
//                                       <div>
//                                         <div className="text-xs font-semibold text-gray-900 mb-0.5">
//                                           {sapService.label}
//                                         </div>
//                                         <div className="text-[10px] text-gray-500 leading-relaxed">
//                                           {sapService.desc}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </motion.div>
//                           </>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {data.map((col) => (
//               <motion.div key={col.category} variants={itemVariants}>
//                 <div className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4">
//                   {col.category}
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {col.items.map((t) => (
//                     <div 
//                       key={t}
//                       className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-[#C9184A] hover:text-white transition-all duration-200 cursor-pointer font-medium"
//                     >
//                       {t}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


// export default function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hidden, setHidden] = useState(false);
//   const [openDrop, setOpenDrop] = useState(null);
//   const timerRef = useRef(null);

//   const handleDropEnter = (name) => {
//     clearTimeout(timerRef.current);
//     setOpenDrop(name);
//   };
//   const handleDropLeave = () => {
//     timerRef.current = setTimeout(() => setOpenDrop(null), 300);
//   };
//   const handleMegaMenuEnter = () => {
//     clearTimeout(timerRef.current);
//   };
//   const handleMegaMenuLeave = () => {
//     setOpenDrop(null);
//   };

//   const location = useLocation();
//   const isAbout = location.pathname.startsWith("/about");

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const threshold = isAbout ? window.innerHeight * 0.8 : 50;

//       if (currentScrollY < threshold) {
//         setScrolled(false);
//         setHidden(false);
//       } else {
//         setScrolled(true);
//         setHidden(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isAbout]);

//   const textColor = "#111827";
//   const bgClass = "bg-white shadow-sm";
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const NAV_LINKS = [
//     { label: "About Us", path: "/about" },
//     { label: "Services", dropdown: "Services" },
//     { label: "Industries", path: "/industries" },
//     { label: "Technologies", dropdown: "Technologies" },
//     { label: "Careers", path: "/careers" },
//   ];

//   const transitionClass = hidden ? "transition-none" : "transition-transform duration-500 ease-in-out";

//   return (
//     <>
//       <nav
//         className={`w-full px-4 sm:px-6 h-[60px] flex items-center justify-between fixed top-0 z-[990] ${bgClass} ${hidden ? "-translate-y-full" : "translate-y-0"
//           } ${transitionClass}`}
//         style={{
//           borderBottom: "0.5px solid transparent",
//         }}
//       >
//         {/* Logo */}
//         <div
//           className="text-3xl font-light tracking-wider cursor-pointer"
//           style={{
//             color: textColor,
//           }}
//           onClick={() => navigate("/")}
//         >
//           <Logo scrolled={scrolled} />
//         </div>

//         {/* Desktop nav links — hidden on mobile */}
//         <nav className="hidden md:flex items-center gap-6 lg:gap-10 ml-auto">
//           <div className="flex items-center gap-1 lg:gap-2">
//             {NAV_LINKS.map((link) => {
//               const isActive = link.path ? location.pathname === link.path : openDrop === link.dropdown;
//               const isHovered = hoveredLink === link.label;

//               return (
//                 <div 
//                   key={link.label}
//                   className="relative"
//                   onMouseEnter={() => {
//                     if (link.dropdown) handleDropEnter(link.dropdown);
//                     setHoveredLink(link.label);
//                   }}
//                   onMouseLeave={() => {
//                     if (link.dropdown) handleDropLeave();
//                     setHoveredLink(null);
//                   }}
//                 >
//                   <button
//                     onClick={() => {
//                       if (link.path) {
//                         navigate(link.path);
//                         window.scrollTo(0, 0);
//                       }
//                     }}
//                     className="text-sm font-medium transition px-2 lg:px-3 py-2 rounded-lg flex items-center gap-1.5"
//                     style={{ color: textColor }}
//                   >
//                     {link.label}
//                     {link.dropdown && (
//                       <span className={`text-[10px] opacity-40 transition-transform duration-300 ${openDrop === link.dropdown ? "rotate-180" : ""}`}>▼</span>
//                     )}
//                   </button>

//                   {/* Animated Underline */}
//                   <motion.div
//                     initial={false}
//                     animate={{ 
//                       width: (isActive || isHovered) ? "calc(100% - 16px)" : "0%" 
//                     }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="absolute bottom-1 left-2 lg:left-3 h-[1.5px] bg-[#4BDE7B]"
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </nav>

//         {/* Hamburger — always visible (desktop + mobile) */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           onMouseEnter={() => setHoveredLink("menuIcon")}
//           onMouseLeave={() => setHoveredLink(null)}
//           className="transition flex flex-col justify-center items-center ml-2 md:ml-4 w-10 h-10 relative group flex-shrink-0"
//           style={{ color: textColor }}
//           aria-label={menuOpen ? "Close menu" : "Open menu"}
//         >
//           <div className="relative w-7 h-5 overflow-hidden">
//             <span
//               style={{
//                 position: "absolute",
//                 left: 0,
//                 top: menuOpen ? "50%" : "30%",
//                 width: "100%",
//                 height: "1.5px",
//                 background: "currentColor",
//                 transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//                 transform: menuOpen
//                   ? "rotate(45deg) translateY(-50%)"
//                   : `translateY(-50%) translateX(${!menuOpen && hoveredLink === "menuIcon" ? "100%" : "0"})`,
//                 opacity: !menuOpen && hoveredLink === "menuIcon" ? 0 : 1,
//               }}
//             />
//             {!menuOpen && (
//               <span
//                 style={{
//                   position: "absolute",
//                   left: "-100%",
//                   top: "30%",
//                   width: "100%",
//                   height: "1.5px",
//                   background: "currentColor",
//                   transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//                   transform: `translateY(-50%) translateX(${hoveredLink === "menuIcon" ? "100%" : "0"})`,
//                   opacity: hoveredLink === "menuIcon" ? 1 : 0,
//                 }}
//               />
//             )}
//             <span
//               style={{
//                 position: "absolute",
//                 left: 0,
//                 bottom: menuOpen ? "50%" : "30%",
//                 width: "100%",
//                 height: "1.5px",
//                 background: "currentColor",
//                 transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//                 transitionDelay: !menuOpen && hoveredLink === "menuIcon" ? "0.1s" : "0s",
//                 transform: menuOpen
//                   ? "rotate(-45deg) translateY(50%)"
//                   : `translateY(50%) translateX(${!menuOpen && hoveredLink === "menuIcon" ? "100%" : "0"})`,
//                 opacity: !menuOpen && hoveredLink === "menuIcon" ? 0 : 1,
//               }}
//             />
//             {!menuOpen && (
//               <span
//                 style={{
//                   position: "absolute",
//                   left: "-100%",
//                   bottom: "30%",
//                   width: "100%",
//                   height: "1.5px",
//                   background: "currentColor",
//                   transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//                   transitionDelay: hoveredLink === "menuIcon" ? "0.1s" : "0s",
//                   transform: `translateY(50%) translateX(${hoveredLink === "menuIcon" ? "100%" : "0"})`,
//                   opacity: hoveredLink === "menuIcon" ? 1 : 0,
//                 }}
//               />
//             )}
//           </div>
//         </button>
//       </nav>

//       <AnimatePresence>
//         {(openDrop === "Services" || openDrop === "Technologies") && (
//           <div
//             onMouseEnter={handleMegaMenuEnter}
//             onMouseLeave={handleMegaMenuLeave}
//           >
//             <MegaMenu 
//               key={openDrop}
//               type={openDrop} 
//               open={!!openDrop} 
//               scrolled={scrolled} 
//             />
//           </div>
//         )}
//       </AnimatePresence>

//       <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
//     </>
//   );
// }


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
      { label: "Salesforce Services", desc: "CRM and multi-cloud solutions", icon: <CloudLightning size={18} />, path: "/services" },
      { label: "Cybersecurity", desc: "Modern protection for your enterprise", icon: <ShieldCheck size={18} />, path: "/services" },
      { label: "IT Infrastructure", desc: "Managed networks and data centers", icon: <Radio size={18} />, path: "/services" },
      { label: "Web Development", desc: "Scalable and secure web apps", icon: <Code size={18} />, path: "/services/web-development", img: WEB_DEVELOPMENT_IMAGES[0] },
      { label: "App Development", desc: "Native and hybrid mobile experiences", icon: <Smartphone size={18} />, path: "/services/app-development", img: WEB_DEVELOPMENT_IMAGES[1] },
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
        className="fixed top-[112px] left-0 w-full bg-white z-[1000] border-b border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto flex" onMouseLeave={handleItemLeave}>
          {/* Section 1: Sidebar (Left) */}
          <div className="w-[220px] lg:w-[260px] p-8 bg-gray-50/10 border-r border-gray-50 flex flex-col justify-between shrink-0 h-[480px]">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{data.sidebar.title}</h2>
              <p className="text-gray-500 text-[11px] leading-relaxed mb-6 font-medium">
                {data.sidebar.desc}
              </p>
            </div>

            <Button
              text="EXPLORE"
              variant="secondary"
              onClick={() => { navigate(data.sidebar.link); onClose(); }}
              className="!px-5 !py-2.5"
            />
          </div>

          {/* Section 2: Dropdown Links (Middle) */}
          <div
            className="w-[300px] lg:w-[360px] p-6 border-r border-gray-50 bg-white shrink-0 h-[480px]"
            onMouseEnter={handlePanelEnter}
          >
            <div className="space-y-1">
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
            <div className="mt-8 pt-6 border-t border-gray-50">
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
        className="w-full bg-white fixed top-0 z-[991] border-b border-gray-100 overflow-hidden"
        style={{ height: '44px' }}
      >
        {/* Grid Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(75,222,123,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(75,222,123,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
          }}
        />
        {/* Shimmer scan line */}
        <motion.div
          className="absolute inset-y-0 w-[120px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(75,222,123,0.08), transparent)',
          }}
          animate={{ x: ['-120px', '110vw'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 h-full hidden md:grid md:grid-cols-[auto_1fr] items-center gap-12 relative z-10">

          {/* Logo on Top Bar - Small */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-pointer flex-shrink-0"
            style={{ transform: 'scale(0.65)', transformOrigin: 'left center' }}
            onClick={() => navigate("/")}
          >
            <Logo white={false} />
          </motion.div>

          {/* Info Items Grid */}
          <div className="flex items-center justify-end gap-0">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                text: "Hyderabad, Telangana, India"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                text: "Mon–Sat  9:00–18:00  |  Sunday CLOSED"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>,
                text: "+91 9391 558 580"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center"
              >
                {i > 0 && <div className="w-[1px] h-5 bg-gray-200 mx-6" />}
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
                    className="text-[10.5px] font-medium tracking-[0.055em] text-gray-500 group-hover:text-gray-800 transition-colors duration-300 whitespace-nowrap"
                    style={{ fontFamily: "'Inter', sans-serif" }}
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
        className={`w-full py-2 fixed z-[990] ${bgClass} transition-all duration-300`}
        style={{ top: '44px' }}
      >
        <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full h-full flex items-center justify-between">
          {/* Desktop Nav Links - Left Aligned */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1 mr-auto">
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
                    className="text-[11px] uppercase font-medium px-2 py-1 rounded-lg flex items-center gap-1.5 relative overflow-hidden"
                    style={{ color: textColor }}
                  >
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

                  {/* Animated Underline */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: (isActive || isHovered) ? "calc(100% - 16px)" : "0%"
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute -bottom-1 left-2 h-[2px] bg-[#4BDE7B]"
                  />
                </div>
              );
            })}
          </div>

          {/* Contact Us Button */}
          <div className="hidden md:block ml-auto mr-8">
            <Button
              text="Contact Us"
              onClick={() => navigate("/contact")}
              className="!px-5 !py-2.5"
            />
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

