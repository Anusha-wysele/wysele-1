import { AlignCenterVertical, BoundingBox, CraneTower } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import missionImg from "../../../assets/wysele-mission.webp";
import valuesImg from "../../../assets/wysele-values.webp";
import visionImg from "../../../assets/wysele-vission.webp";

const images = [visionImg, missionImg, valuesImg];

const textItems = [
    {
        number: "01",
        title: "Our Vision",
        description: "To deliver cost-effective, cutting-edge solutions that help our clients achieve their goals. We continuously invest in R&D to stay ahead of technological advancements.",
        Icon: AlignCenterVertical,
    },
    {
        number: "02",
        title: "Our Mission",
        description: "To be a trusted technology partner, collaborating with clients to achieve strategic objectives and deliver long-term business value.",
        Icon: BoundingBox,
    },
    {
        number: "03",
        title: "Our Values",
        description: "We build strong connections with clients and communities to create a better tomorrow. Our guiding principles help us stay different and better.",
        Icon: CraneTower,
    }
];

const aboutImageMeta = [
    { alt: "About Wysele Technologies", title: "About Wysele" },
    { alt: "Our Mission", title: "Wysele Mission" },
    { alt: "Our Values", title: "Wysele Values" }
];

const LIQUID_EASE = [0.32, 0.72, 0, 1];

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

export default function AboutUs() {
    const [cycleCount, setCycleCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const width = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (!entry.isIntersecting) {
                    setCycleCount(0);
                }
            },
            { threshold: 0.1 }
        );

        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const interval = setInterval(() => {
            setCycleCount((prev) => prev + 1);
        }, 7000);

        return () => clearInterval(interval);
    }, [isInView]);

    const activeIndex = cycleCount % images.length;
    const activeLineIndex = cycleCount % textItems.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.2, ease: LIQUID_EASE }
        }
    };

    const imageWrapperVariants = {
        hidden: { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 30 : 0, filter: "blur(10px)", scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: { duration: 1.6, ease: LIQUID_EASE }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '45fr 55fr',
                minHeight: isMobile ? 'auto' : '85vh',
                background: '#fff',
                overflow: 'hidden',
            }}
        >
            {/* Left Side - Image */}
            <motion.div
                variants={imageWrapperVariants}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: isMobile ? '24px 20px 16px 20px' : isTablet ? '30px 16px 30px 30px' : '41px 20px 40px 40px',
                    minHeight: isMobile ? '280px' : isTablet ? '360px' : 'auto',
                }}
                className="group"
            >
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: isMobile ? '260px' : '100%',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.12)',
                    background: '#fcfcfc',
                }}>
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={cycleCount}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.6, ease: "easeInOut" }}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0, left: 0,
                                zIndex: cycleCount
                            }}
                        >
                            <motion.img
                                src={images[activeIndex]}
                                alt={aboutImageMeta[activeIndex]?.alt || "About Wysele Technologies"}
                                title={aboutImageMeta[activeIndex]?.title || "About Wysele"}
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "easeOut" }}
                                className="transition-all duration-700 group-hover:grayscale-[30%]"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    willChange: 'transform'
                                }}
                            />

                            {/* Diagonal Overlay Transition - Top Left */}
                            <div
                                className="absolute top-0 left-0 w-0 h-0 bg-black/10 transition-all duration-700 group-hover:w-full group-hover:h-full"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                                }}
                            ></div>

                            {/* Diagonal Overlay Transition - Bottom Right */}
                            <div
                                className="absolute bottom-0 right-0 w-0 h-0 bg-black/10 transition-all duration-700 group-hover:w-full group-hover:h-full"
                                style={{
                                    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                }}
                            ></div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Inner Subtle Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.03)',
                        pointerEvents: 'none'
                    }} />
                </div>
            </motion.div>

            {/* Right Side - Content */}
            <div
                style={{
                    background: '#ffffff',
                    padding: isMobile
                        ? '28px 20px 40px 20px'
                        : isTablet
                            ? '40px 30px 40px 24px'
                            : '60px 80px 60px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                    }}
                >
                    <h2 style={{
                        fontSize: isMobile ? '1.15rem' : '1.4rem',
                        fontWeight: 600,
                        color: '#111',
                        margin: 0,
                        fontFamily: 'Inter Tight, sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        What We Do
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 52 }}
                        transition={{ duration: 1.2, ease: LIQUID_EASE, delay: 0.9 }}
                        style={{
                            height: 2,
                            background: "#111",
                            borderRadius: 2
                        }}
                    />
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: isMobile ? '0.82rem' : '0.9rem',
                        color: '#555',
                        marginBottom: isMobile ? '28px' : '45px',
                        lineHeight: 1.8,
                        maxWidth: '580px',
                        fontFamily: 'Jost, sans-serif'
                    }}
                >
                    Wysele partners with enterprises to engineer intelligent SAP ecosystems, cloud-native solutions, and AI-driven strategies — delivering outcomes that create lasting competitive advantage across every market we serve.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '24px' : '35px',
                        paddingLeft: isMobile ? '24px' : '35px',
                    }}>
                    {/* Vertical Line System */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '5%',
                        bottom: '5%',
                        width: '1px',
                        background: '#f0f0f0',
                    }} />

                    {/* Active Track Overlay */}
                    <motion.div
                        animate={{ top: `${(activeLineIndex * 33.33) + (33.33 * 0.05)}%` }}
                        transition={{ duration: 0.8, ease: LIQUID_EASE }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '1px',
                            background: '#111',
                            height: '30%',
                            zIndex: 1
                        }}
                    />

                    {textItems.map((item, idx) => {
                        const IconComponent = item.Icon;
                        const isActive = idx === activeLineIndex;

                        return (
                            <motion.div
                                key={item.number}
                                variants={itemVariants}
                                style={{
                                    display: 'flex',
                                    gap: isMobile ? '16px' : '24px',
                                    alignItems: 'flex-start',
                                    transition: 'opacity 0.6s ease',
                                    opacity: isActive ? 1 : 0.35,
                                }}
                            >
                                {/* Icon Container */}
                                <div style={{
                                    width: isMobile ? '42px' : '52px',
                                    height: isMobile ? '42px' : '52px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    background: isActive ? '#f9f9f9' : 'transparent',
                                    boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.03)' : 'none',
                                    transition: 'all 0.6s ease'
                                }}>
                                    <IconComponent
                                        size={isMobile ? (isActive ? 26 : 24) : (isActive ? 34 : 32)}
                                        color={isActive ? "#111" : "#aaa"}
                                        weight="thin"
                                        style={{ transition: 'all 0.6s ease' }}
                                    />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontSize: '11px',
                                        color: isActive ? '#333' : '#ccc',
                                        marginBottom: '6px',
                                        fontWeight: 600,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase'
                                    }}>
                                        {item.number}
                                    </div>

                                    <h3 style={{
                                        fontSize: isMobile ? '0.9rem' : '1rem',
                                        fontWeight: 600,
                                        color: '#111',
                                        margin: '0 0 8px 0',
                                        fontFamily: 'Inter Tight, sans-serif',
                                    }}>
                                        {item.title}
                                    </h3>

                                    <p style={{
                                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                                        lineHeight: 1.6,
                                        color: '#666',
                                        margin: 0,
                                        fontFamily: 'Jost, sans-serif',
                                    }}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    );
}


// import React, { useState, useEffect } from 'react';
// import { CaretRight, HandsClapping, Star } from '@phosphor-icons/react';
// import { OTHER_PAGE_IMAGES } from '../../common/data';
// import { motion, AnimatePresence } from 'framer-motion';
// 
// const tabs = [
//     "Our Mission",
//     "Our Vision",
//     "Our Objective",
//     "Our Goal",
//     "Future Ventures"
// ];
// 
// const tabContent = {
//     "Our Mission": [
//         {
//             title: "Empowering Businesses",
//             description: "We bridge the gap between talent and technology to help clients transition to seamless growth and innovation.",
//             Icon: HandsClapping
//         },
//         {
//             title: "Render Excellence",
//             description: "Top-tier staffing and technology services that help companies propel business operations to an advanced degree.",
//             Icon: Star
//         }
//     ],
//     "Our Vision": [
//         {
//             title: "Global Leadership",
//             description: "To be recognized as a leading force in modern digital transformation, driving innovation worldwide.",
//             Icon: Star
//         },
//         {
//             title: "Inspiring Trust",
//             description: "Building transparent, reliable, and secure platforms that foster deep trust across enterprise ecosystems.",
//             Icon: HandsClapping
//         }
//     ],
//     "Our Objective": [
//         {
//             title: "Client Success",
//             description: "Focusing on delivering measurable value and achieving long-term partnerships with clients.",
//             Icon: HandsClapping
//         },
//         {
//             title: "Operational Excellence",
//             description: "Streamlining processes and workflows to ensure maximum efficiency and sustained competitive advantages.",
//             Icon: Star
//         }
//     ],
//     "Our Goal": [
//         {
//             title: "Sustainable Growth",
//             description: "Ensuring consistent progress without compromising our core values or quality of service.",
//             Icon: Star
//         },
//         {
//             title: "Empowering Talent",
//             description: "Creating a culture of continuous learning and organizational development to nurture next-gen digital leaders.",
//             Icon: HandsClapping
//         }
//     ],
//     "Future Ventures": [
//         {
//             title: "Emerging Technologies",
//             description: "Exploring AI, cloud ecosystems, and advanced data analytics to stay ahead of the curve.",
//             Icon: HandsClapping
//         },
//         {
//             title: "Strategic Advisory",
//             description: "Expanding our capabilities to navigate clients safely through complex future market disruptions.",
//             Icon: Star
//         }
//     ]
// };
// 
// export default function AboutUs() {
//     const [activeTab, setActiveTab] = useState("Our Mission");
// 
//     // Preload all background images with tiered priority
//     useEffect(() => {
//         const tier1 = [
//             OTHER_PAGE_IMAGES.aboutUsBackground,
//             OTHER_PAGE_IMAGES.visionBackground,
//             OTHER_PAGE_IMAGES.objectiveBackground,
//             OTHER_PAGE_IMAGES.goalBackground,
//             OTHER_PAGE_IMAGES.futureBackground
//         ];
// 
//         const tier2 = [
//             OTHER_PAGE_IMAGES.visionContentBackground,
//             OTHER_PAGE_IMAGES.objectiveContentBackground,
//             OTHER_PAGE_IMAGES.goalContentBackground,
//             OTHER_PAGE_IMAGES.futureContentBackground,
//             OTHER_PAGE_IMAGES.missionBg
//         ];
// 
//         // Immediately load Tier 1 (Main Backgrounds)
//         tier1.forEach((url) => {
//             const img = new Image();
//             img.src = url;
//         });
// 
//         // Delay Tier 2 (Content Box Backgrounds) to give Tier 1 full priority
//         const timer = setTimeout(() => {
//             tier2.forEach((url) => {
//                 const img = new Image();
//                 img.src = url;
//             });
//         }, 800);
// 
//         return () => clearTimeout(timer);
//     }, []);
// 
//     const content = tabContent[activeTab] || tabContent["Our Mission"];
// 
//     return (
//         <section className="relative w-full min-h-[500px] bg-gray-800 flex">
//             {/* Left Sidebar (Dark Background) */}
//             <div className="w-[35%] min-w-[300px] h-full bg-transparent flex flex-col pt-48 pb-12 relative z-10">
//                 {/* Badge */}
//                 <div className="pl-28 pr-4 lg:pl-48 lg:pr-8 mb-6">
//                     <span
//                         className="bg-[#f27e1f] text-black font-medium text-[0.65rem] uppercase tracking-widest px-4 py-1 rounded-full inline-block"
//                     >
//                         Company Overview
//                     </span>
//                 </div>
// 
//                 {/* Vertical Menu */}
//                 <ul className="w-full flex flex-col mt-auto mb-auto">
//                     {tabs.map((tab, index) => {
//                         const isActive = activeTab === tab;
//                         return (
//                             <li
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className="w-full cursor-pointer flex transition-all duration-200"
//                             >
//                                 {/* Invisible Spacer for Left Padding */}
//                                 <div className="w-24 lg:w-44 flex-shrink-0"></div>
// 
//                                 {/* Highlightable Container starting from Arrow */}
//                                 <div className={`
//                                     flex items-center w-full pl-4 pr-4 lg:pr-8 py-3
//                                     ${index === 0 ? 'border-t' : ''} border-b border-white/10
//                                     ${isActive ? 'bg-[#f47d20] border-[#f47d20]' : 'bg-transparent hover:bg-white/5'}
//                                 `}>
//                                     <CaretRight
//                                         weight="bold"
//                                         size={12}
//                                         className={`mr-3 ${isActive ? 'text-black' : 'text-white'}`}
//                                     />
//                                     <span
//                                         className={`text-[0.85rem] font-medium tracking-[0.02em] ${isActive ? 'text-black' : 'text-white/90'}`}
//                                     >
//                                         {tab}
//                                     </span>
//                                 </div>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
// 
//             {/* Right Side Image Container */}
//             <div className="w-[65%] self-stretch my-6 bg-white relative overflow-hidden rounded-l-md">
//                 <AnimatePresence>
//                     <motion.div
//                         key={activeTab}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.8 }}
//                         className="absolute inset-0 w-full h-full"
//                         style={{
//                             backgroundImage: `url('${
//                                 activeTab === "Our Vision" 
//                                 ? OTHER_PAGE_IMAGES.visionBackground 
//                                 : activeTab === "Our Objective" 
//                                 ? OTHER_PAGE_IMAGES.objectiveBackground 
//                                 : activeTab === "Our Goal" 
//                                 ? OTHER_PAGE_IMAGES.goalBackground 
//                                 : activeTab === "Future Ventures" 
//                                 ? OTHER_PAGE_IMAGES.futureBackground 
//                                 : OTHER_PAGE_IMAGES.aboutUsBackground
//                             }')`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                             backgroundRepeat: 'no-repeat',
//                             zIndex: 1
//                         }}
//                     />
//                 </AnimatePresence>
//             </div>
// 
//             {/* Floating Overlapping Card */}
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={activeTab}
//                     initial={{ opacity: 0, x: 50, y: '-50%' }}
//                     animate={{ opacity: 1, x: 0, y: '-50%' }}
//                     exit={{ opacity: 0, x: 50, y: '-50%' }}
//                     transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
//                     className="absolute top-[75%] left-[35%] w-[40%] max-w-[480px] shadow-xl text-white pt-8 pb-4 px-8 z-20 rounded-sm overflow-hidden flex flex-col"
//                     style={{
//                         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('${
//                             activeTab === "Our Vision" 
//                             ? OTHER_PAGE_IMAGES.visionContentBackground 
//                             : activeTab === "Our Objective" 
//                             ? OTHER_PAGE_IMAGES.objectiveContentBackground 
//                             : activeTab === "Our Goal" 
//                             ? OTHER_PAGE_IMAGES.goalContentBackground 
//                             : activeTab === "Future Ventures" 
//                             ? OTHER_PAGE_IMAGES.futureContentBackground 
//                             : OTHER_PAGE_IMAGES.missionBg
//                         }')`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center'
//                     }}
//                 >
//                     <h3 className="text-2xl font-semibold mb-2 tracking-tight">{activeTab}</h3>
//                     <div className="w-10 h-[2px] bg-white mb-6"></div>
// 
//                     <div className="flex flex-col gap-6">
//                         {content.map((item, idx) => {
//                             const Icon = item.Icon;
//                             return (
//                                 <div key={idx} className="flex gap-4 items-start">
//                                     <div className="mt-1 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/80 bg-transparent">
//                                         <Icon size={20} color="#fff" />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <h4 className="text-lg font-semibold mb-1 tracking-tight">{item.title}</h4>
//                                         <p className="text-white text-[0.85rem] leading-relaxed">
//                                             {item.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </motion.div>
//             </AnimatePresence>
// 
//         </section>
//     );
// }
// 