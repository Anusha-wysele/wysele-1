import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SapTechnicalconsultImg from '../../../assets/SapTechnicalconsult.jpg';

const DURATION = 6000; // ms per card

const cards = [
    {
        title: "Technical Architecture",
        desc: "We design robust SAP system landscapes tailored to your enterprise needs, ensuring seamless performance, scalability, and long-term reliability across all environments."
    },
    {
        title: "Implementation & Support",
        desc: "Our consultants guide you through every phase of SAP implementation, from initial setup to go-live, providing hands-on support and issue resolution at every step."
    },
    {
        title: "Performance Optimization",
        desc: "We analyze and fine-tune your SAP systems for peak efficiency — reducing bottlenecks, improving response times, and ensuring optimal resource utilization across your landscape."
    }
];

export default function SapTechnicalconsultinghero() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % cards.length);
        }, DURATION);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full min-h-screen lg:h-screen overflow-hidden relative flex flex-col pt-[68px] lg:pt-0">

            {/* Full screen image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={SapTechnicalconsultImg}
                    alt="SAP Technical Consulting"
                    className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Top-left Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-12 md:pt-40 pb-12 lg:pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-white/90 text-lg md:text-2xl font-light italic mb-1 tracking-wide">
                        Expert. Reliable.
                    </p>

                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
                        SAP Technical Consulting
                    </h1>

                    <p className="text-white text-sm md:text-base font-light max-w-md leading-relaxed mb-8">
                        We work closely with your teams to solve real SAP challenges —
                        from complex system setups to everyday performance issues —
                        so your business keeps running smoothly and efficiently.
                    </p>
                </motion.div>
            </div>

            {/* Bottom: progress bars + cards */}
            <div className="relative z-20 w-full px-8 md:px-16 lg:px-24 pb-6">

                {/* Progress bars row */}
                <div className="grid grid-cols-3 mb-2">
                    {cards.map((_, i) => (
                        <div key={i} className="flex items-center gap-2 pr-4">
                            <span className="text-white/70 text-xs font-semibold shrink-0">{i + 1}</span>
                            {/* Track */}
                            <div className="relative flex-1 h-[2px] bg-white/30 overflow-hidden">
                                {/* Animated fill — resets when active changes */}
                                {active === i && (
                                    <motion.div
                                        key={active}
                                        className="absolute inset-y-0 left-0 bg-white"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: (DURATION - 200) / 1000, ease: 'linear' }}
                                    />
                                )}
                                {/* Completed bars stay full white */}
                                {active > i && (
                                    <div className="absolute inset-0 bg-white" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 overflow-visible">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: active === i ? -10 : 0,
                                scale: active === i ? 1.02 : 1,
                                boxShadow: active === i
                                    ? '0 16px 40px rgba(0,0,0,0.4)'
                                    : '0 0px 0px rgba(0,0,0,0)'
                            }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="px-8 py-6 bg-[#B8860B]/85 backdrop-blur-sm border-r border-white/10 cursor-pointer"
                            onClick={() => setActive(i)}
                        >
                            <h3 className="text-white font-semibold text-sm md:text-base mb-2 tracking-wide">
                                {card.title}
                            </h3>
                            <p className="text-white/80 text-xs md:text-sm leading-relaxed font-light">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
}
