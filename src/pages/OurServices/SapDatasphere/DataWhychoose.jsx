import React from 'react';
import { motion } from 'framer-motion';
import { 
    Gear, 
    Monitor, 
    Brain,
    ArrowsOut,
    ShieldCheck
} from "@phosphor-icons/react";

const DataWhychoose = () => {
    const cardsData = [
        {
            title: "Proactive SAP Support",
            desc: "We identify operational risks and system issues before they affect business performance, helping organizations maintain reliable SAP operations.",
            icon: <Monitor size={24} weight="light" />
        },
        {
            title: "Long-Term Optimization Focus",
            desc: "Our consultants continuously improve workflows, reporting, integrations, and system performance to support long-term operational efficiency.",
            icon: <Gear size={24} weight="light" />
        },
        {
            title: "Functional and Technical Expertise",
            desc: "Wysele provides complete SAP support across functional consulting, technical optimization, enhancement services, integrations, migrations, and performance management.",
            icon: <Brain size={24} weight="light" />
        },
        {
            title: "Scalable SAP Support Models",
            desc: "Our support services adapt to changing operational requirements, business growth, and evolving enterprise environments.",
            icon: <ArrowsOut size={24} weight="light" />
        },
        {
            title: "Reliable Business Continuity",
            desc: "We help businesses maintain uninterrupted operations through continuous monitoring, optimization, and proactive SAP support services.",
            icon: <ShieldCheck size={24} weight="light" />
        }
    ];

    return (
        <section className="pt-4 pb-16 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                
                {/* Section Title */}
                <div className="text-left mb-10 max-w-3xl">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight leading-tight">
                        Why Businesses Choose Wysele for SAP Support Services
                    </h2>
                </div>

                {/* Added Features Grid - 5 Column Row Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {cardsData.map((card, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="bg-gray-50/50 border border-gray-100 rounded-sm p-5 shadow-sm hover:border-[#8B3A5E]/20 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-4 h-full justify-between">
                                <div className="flex items-center justify-between">
                                    <div className="shrink-0 cursor-default" style={{ perspective: '1000px' }}>
                                        <div 
                                            className="relative w-8 h-8 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateY(180deg)]"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <div className="absolute inset-0 flex items-start justify-center" style={{ backfaceVisibility: 'hidden' }}>
                                                <span className="text-[#8B3A5E] font-medium text-xl leading-none opacity-80">0{index + 1}</span>
                                            </div>
                                            <div className="absolute inset-0 flex items-start justify-center text-[#8B3A5E] opacity-80" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                                {card.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow flex flex-col gap-2">
                                    <h3 className="text-sm sm:text-base text-gray-900 font-semibold tracking-tight group-hover:text-[#8B3A5E] transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed font-light">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DataWhychoose;
