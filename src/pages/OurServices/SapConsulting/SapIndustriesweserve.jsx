import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Factory, ShoppingCart, Heart, Landmark, Truck, Briefcase } from 'lucide-react';

const industries = [
    {
        title: "Manufacturing",
        description: "Improve production planning, inventory visibility, procurement management, and operational control.",
        icon: <Factory className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Retail & eCommerce",
        description: "Enhance order management, customer visibility, warehouse operations, and sales reporting.",
        icon: <ShoppingCart className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Healthcare",
        description: "Support compliant operations, patient data workflows, and resource planning systems.",
        icon: <Heart className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Finance & Banking",
        description: "Improve reporting accuracy, compliance management, financial operations, and audit readiness.",
        icon: <Landmark className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Logistics & Supply Chain",
        description: "Strengthen supply chain visibility, inventory movement, procurement, and fulfillment efficiency.",
        icon: <Truck className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Professional Services",
        description: "Simplify project tracking, billing workflows, resource planning, and operational reporting.",
        icon: <Briefcase className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    }
];

const SapIndustriesweserve = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <div className="bg-white pt-2 pb-14 border-t border-gray-100" ref={containerRef}>
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Industries We Serve
                    </h2>
                </div>

                {/* Grid of 6 Cards - Styled exactly like CybersecurityServices.jsx */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                            className="relative overflow-hidden bg-white/90 p-4 rounded-lg transition-all duration-500 flex flex-col items-start text-left group border border-gray-200"
                        >
                            {/* Animated Bottom Border */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#800000] transition-all duration-500 ease-out group-hover:w-full"></div>

                            {/* Header: Icon and Title side-by-side */}
                            <div className="flex items-center gap-3 mb-4 w-full">
                                {/* Circular Icon Container */}
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[#ffcc00]/30">
                                    {React.cloneElement(industry.icon, { 
                                        className: "w-4.5 h-4.5 text-[#C9184A] transition-colors duration-500 group-hover:text-[#C9184A]" 
                                    })}
                                </div>

                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0A0A0A] leading-snug transition-colors duration-500 group-hover:text-[#380816]">
                                    {industry.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-gray-600 leading-relaxed font-normal transition-colors duration-500 group-hover:text-[#380816]">
                                {industry.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SapIndustriesweserve;
