import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowsOut, 
    Stack, 
    CurrencyCircleDollar, 
    Heartbeat,
    Lightbulb
} from '@phosphor-icons/react';

const benefits = [
    {
        title: "Flexible Infrastructure",
        subtitle: "Scale on Your Terms",
        description: "RISE with SAP supports public, private, or hybrid cloud environments based on business requirements and operational goals. This flexibility allows organizations to scale operations without disrupting existing workflows.",
        bullets: [
            "Scalable cloud infrastructure",
            "Flexible deployment options",
            "Better operational adaptability",
            "Support for business growth"
        ],
        impact: "Improved scalability and operational flexibility with future-ready infrastructure.",
        icon: <ArrowsOut size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Simplified IT Environment",
        subtitle: "Simplify Your IT Landscape",
        description: "Managing multiple systems and disconnected platforms can increase operational complexity. RISE with SAP helps businesses simplify enterprise environments through integrated tools and connected business processes.",
        bullets: [
            "Reduced infrastructure complexity",
            "Easier system management",
            "Improved operational efficiency",
            "Better process coordination"
        ],
        impact: "Simplified operations with enhanced efficiency and reduced IT overhead.",
        icon: <Stack size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Improved Business Agility",
        subtitle: "Adapt and Thrive",
        description: "Businesses must respond quickly to market changes, operational challenges, and customer expectations. RISE with SAP helps organizations improve flexibility and operational responsiveness through scalable enterprise solutions.",
        bullets: [
            "Faster response to operational changes",
            "Improved business continuity",
            "Better operational resilience",
            "Increased process flexibility"
        ],
        impact: "Greater business agility with long-term resilience and stability.",
        icon: <Heartbeat size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Cost Optimization",
        subtitle: "Maximize Value, Minimize Costs",
        description: "Cloud-based operations help organizations reduce infrastructure costs while improving resource utilization and operational efficiency.",
        bullets: [
            "Lower infrastructure expenses",
            "Improved resource management",
            "Reduced operational overhead",
            "Better cost visibility"
        ],
        impact: "Lower operational costs with improved resource efficiency.",
        icon: <CurrencyCircleDollar size={22} weight="light" className="text-gray-700" />
    }
];

const RiseBenifits = () => {
    return (
        <section className="relative z-10 w-full bg-[#f9f9fb] pt-10 pb-10">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-4"
                    >
                        Benefits of <span className="font-semibold px-2">RISE with SAP</span>
                    </motion.h2>
                </div>

                {/* Using a grid configuration that fits 4 cards cleanly */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 justify-center">
                    {benefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#800000] transition-colors duration-500"
                        >
                            <div className="p-4 lg:p-5 flex flex-col flex-grow">
                                {/* Icon Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-900 group-hover:bg-[#800000] group-hover:text-white transition-colors duration-500">
                                        {React.cloneElement(item.icon, { weight: "regular", size: 16 })}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 leading-none">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] font-semibold text-[#800000] tracking-wide uppercase mt-1">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 leading-tight mb-3">
                                    {item.description}
                                </p>

                                <div className="flex-grow">
                                    <ul className="space-y-1.5">
                                        {item.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                                <div className="mt-1 w-1 h-1 rounded-full bg-[#800000] shrink-0" />
                                                <span className="leading-tight">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Impact Footer Segment */}
                            <div className="bg-gray-50 border-t border-gray-100 p-3 lg:p-4 flex items-start gap-2.5 group-hover:bg-[#FFF0F3] transition-colors duration-500">
                                <Lightbulb size={16} weight="duotone" className="text-[#800000] shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-900 mb-0.5 uppercase tracking-wider">Business Impact</span>
                                    <span className="text-xs text-gray-600 leading-tight">
                                        {item.impact}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RiseBenifits;
