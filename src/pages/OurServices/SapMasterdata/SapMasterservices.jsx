import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldCheck, Wrench, ArrowRightLeft, Database, BarChart2, HeadphonesIcon, ArrowLeft, ArrowRight } from 'lucide-react';

import SapMDGservicesImg from '../../../assets/SapMDGservices.jpg';

import SapMDGanalysis from '../../../assets/SapMDGanalysis.jpg';
import SapMDGcentralised from '../../../assets/SapMDGcentralised.jpg';
import SapMDGdatagovernance from '../../../assets/SapMDGdatagovernance.jpg';
import SapMDGenhancement from '../../../assets/SapMDGenhancement.jpg';
import SapMDGimplementation from '../../../assets/SapMDGimplementation.jpg';
import SapMDGmigration from '../../../assets/SapMDGmigration.jpg';
import SapMDGsupport from '../../../assets/SapMDGsupport.jpg';

const services = [
    { icon: <Settings size={28} />, title: "SAP MDG Implementation & Configuration", shortTitle: "Implementation", description: "Transform your enterprise data strategy with our end-to-end SAP MDG implementation services. We go beyond technical setup, taking the time to understand your unique business processes to build a seamlessly integrated governance framework that establishes a true single source of truth.", image: SapMDGimplementation, location: "Data Governance" },
    { icon: <ShieldCheck size={28} />, title: "Data Governance & Quality Management", shortTitle: "Data Governance", description: "High-quality data is the lifeblood of modern business decisions. We partner with you to establish robust, automated frameworks that proactively monitor data accuracy and ensure compliance, helping your organization build lasting trust in its digital assets without the manual overhead.", image: SapMDGdatagovernance, location: "Quality Management" },
    { icon: <Wrench size={28} />, title: "SAP MDG Customization & Enhancements", shortTitle: "Customization", description: "We know that out-of-the-box solutions rarely fit every business perfectly. From extending complex data models to designing intuitive, role-based Fiori applications, our tailored enhancements empower your teams with a smooth, frustration-free data management experience.", image: SapMDGenhancement, location: "Fiori & Workflows" },
    { icon: <ArrowRightLeft size={28} />, title: "SAP MDG Data Migration & Integration", shortTitle: "Migration", description: "Moving critical business data can be daunting, but our expert teams ensure a secure, zero-disruption transition. We meticulously cleanse, map, and validate your data, synchronizing legacy platforms with SAP MDG to guarantee absolute consistency from day one.", image: SapMDGmigration, location: "Data Integration" },
    { icon: <Database size={28} />, title: "SAP MDG for Centralized Data Management", shortTitle: "Centralized Data", description: "Siloed information slows down growth and leads to costly miscommunications. We help you tear down those barriers by centralizing your master data into a unified, secure hub, giving your enterprise unparalleled control, agility, and visibility with real-time updates.", image: SapMDGcentralised, location: "Enterprise Control" },
    { icon: <BarChart2 size={28} />, title: "SAP MDG Analytics & Reporting", shortTitle: "Analytics", description: "Data is only as valuable as the insights you can draw from it. We leverage powerful analytics within SAP MDG to provide crystal-clear visibility into your data quality metrics, enabling leadership to make confident, proactive decisions that drive continuous improvement.", image: SapMDGanalysis, location: "Business Intelligence" },
    { icon: <HeadphonesIcon size={28} />, title: "SAP MDG Support & Optimization", shortTitle: "Support", description: "Our commitment to your success doesn't end on go-live day. We provide proactive, dedicated support to ensure your SAP MDG environment remains highly performant and secure. Whether it's rapid troubleshooting or strategic optimization, our experts are always here to help.", image: SapMDGsupport, location: "Post Go-Live" }
];

const TOTAL = services.length;

const imgVariants = {
    enter: (d) => ({ 
        rotateY: d > 0 ? 90 : -90, 
        opacity: 0, 
        scale: 0.95,
        transformPerspective: 1500 
    }),
    center: { 
        rotateY: 0, 
        opacity: 1, 
        scale: 1,
        transformPerspective: 1500, 
        transition: { duration: 1.2, ease: [0.64, 0, 0.36, 1] } 
    },
    exit: (d) => ({ 
        rotateY: d > 0 ? -90 : 90, 
        opacity: 0, 
        scale: 0.95,
        transformPerspective: 1500, 
        transition: { duration: 1.2, ease: [0.64, 0, 0.36, 1] } 
    })
};

const contentVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const SapMasterservices = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = (idx) => {
        setDirection(idx > current ? 1 : -1);
        setCurrent(idx);
    };

    const next = useCallback(() => {
        setDirection(1);
        setCurrent(prev => prev === TOTAL - 1 ? 0 : prev + 1);
    }, []);

    const prev = () => {
        setDirection(-1);
        setCurrent(c => c === 0 ? TOTAL - 1 : c - 1);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 8000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = services[current];

    return (
        <section className="w-full min-h-screen md:min-h-[82vh] md:h-[82vh] flex flex-col md:flex-row overflow-hidden relative bg-white">
            
            {/* ── LEFT: Main Static Image ── */}
            <div className="w-full h-[45vh] md:h-auto md:flex-1 relative z-20">
                <img
                    src={SapMDGservicesImg}
                    alt="SAP MDG Services"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Color Overlay */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Square Box Overlaid on Image */}
                <div className="absolute -bottom-16 left-6 md:bottom-auto md:left-auto md:-right-6 lg:-right-8 top-auto md:top-1/2 md:-translate-y-1/2 w-32 sm:w-48 md:w-72 lg:w-96 aspect-square shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-30 overflow-hidden rounded-2xl bg-white">
                    <AnimatePresence custom={direction} initial={false}>
                        <motion.img
                            key={`small-img-${current}`}
                            custom={direction}
                            variants={imgVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            src={slide.image}
                            alt={slide.title}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    </AnimatePresence>
                </div>

                {/* Gradient blending into white right panel */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ── RIGHT: Sliding Content Panel ── */}
            <div className="w-full md:w-[45%] lg:w-[42%] relative flex flex-col justify-center md:justify-between p-6 pt-24 md:p-10 lg:p-12 overflow-hidden shrink-0 bg-white">
                
                {/* Icon + Title + Description */}
                <div className="relative z-10 flex-1 flex flex-col justify-center mt-4 md:mt-0">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`content-${current}`}
                            custom={direction}
                            variants={contentVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <div className="text-gray-400 mb-3">{slide.icon}</div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4">
                                {slide.title}
                            </h2>
                            <div className="bg-gray-100 rounded-sm p-4">
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {slide.description}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    {services.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`w-1.5 rounded-full transition-all duration-300 ${i === current ? 'h-6 bg-gray-800' : 'h-1.5 bg-gray-300'}`}
                        />
                    ))}
                </div>

                {/* Bottom: Arrows + counter */}
                <div className="relative z-10 flex items-center justify-between mt-8">
                    <div className="flex gap-4">
                        <button onClick={prev} className="w-10 h-10 border border-gray-300 rounded-sm flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300">
                            <ArrowLeft size={16} />
                        </button>
                        <button onClick={next} className="w-10 h-10 border border-gray-300 rounded-sm flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-all duration-300">
                            <ArrowRight size={16} />
                        </button>
                    </div>
                    <span className="text-gray-400 text-sm font-mono tracking-widest">
                        {String(current + 1).padStart(2, '0')}
                        <span className="text-gray-300"> / </span>
                        {String(TOTAL).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default SapMasterservices;
