import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PROCESS_STEPS = [
    {
        number: "01",
        title: "Business Requirements",
        description: "Defining objectives and challenges to ensure strategic alignment from the start.",
        image: "https://images.pexels.com/photos/4872025/pexels-photo-4872025.jpeg"
    },
    {
        number: "02",
        title: "Planning & Design",
        description: "Strategic planning and intuitive UI/UX design focused on flow and visual excellence.",
        image: "https://images.pexels.com/photos/36747234/pexels-photo-36747234.jpeg"
    },
    {
        number: "03",
        title: "Development",
        description: "Engineering scalable, high-performance solutions using modern tech and best practices.",
        image: "https://images.pexels.com/photos/6804613/pexels-photo-6804613.jpeg"
    },
    {
        number: "04",
        title: "Testing",
        description: "Rigorous testing to ensure functional perfection and a flawless user experience.",
        image: "https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg"
    },
    {
        number: "05",
        title: "Deployment",
        description: "Seamless live deployment with expert configuration for minimal disruption.",
        image: "https://images.pexels.com/photos/17115909/pexels-photo-17115909.jpeg"
    },
    {
        number: "06",
        title: "Maintenance",
        description: "Continuous support and updates to keep your system secure and optimized.",
        image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg"
    }
];

export default function WebDevelopmentProcess() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-sliding logic
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % PROCESS_STEPS.length);
        }, 8000); // Change every 8 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="pt-2 pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto pl-10 md:pl-20 pr-6">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
                    {/* Left Column: Sliding Image Showcase with Content on Image */}
                    <div className="lg:w-1/2 w-full lg:-mt-24">
                        <div className="sticky top-4 h-[400px] md:h-[480px] w-full">
                            <AnimatePresence>
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    {/* Image Container */}
                                    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
                                        <img 
                                            src={PROCESS_STEPS[activeIndex].image} 
                                            alt={PROCESS_STEPS[activeIndex].title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Floating Content Box - Further reduced height */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                        className="absolute -right-8 -bottom-6 md:-right-24 md:-bottom-10 w-[85%] md:w-[85%] bg-[#1A222E]/95 backdrop-blur-sm p-4 md:p-6 rounded-none shadow-2xl z-20 border border-white/5"
                                    >
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[#4BDE7B] font-bold text-[10px] tracking-widest uppercase">
                                                    Step {PROCESS_STEPS[activeIndex].number}
                                                </span>
                                                <div className="h-[1px] w-6 bg-[#4BDE7B]/30" />
                                            </div>
                                            
                                            <h4 className="text-white text-lg md:text-xl font-semibold">
                                                {PROCESS_STEPS[activeIndex].title}
                                            </h4>
                                            
                                            <p className="text-gray-300 text-[13px] md:text-sm leading-relaxed max-w-md">
                                                {PROCESS_STEPS[activeIndex].description}
                                            </p>
                                        </div>

                                        {/* Corner Accent */}
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="w-2 h-2 rounded-full bg-[#4BDE7B]/20 animate-pulse" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: EXACT minimalist design */}
                    <div className="w-full lg:w-[40%] shrink-0">
                        {/* Section Header - Moved to right side */}
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <span className="text-gray-400 font-bold tracking-widest uppercase text-[10px] mb-3 block">
                                Our Methodology
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Web Development <span className="text-gray-400 font-light italic">Process</span>
                            </h2>
                        </motion.div>

                        <div className="relative">
                            {/* Vertical Line - Exact Design */}
                            <div className="absolute left-0 top-2 bottom-2 w-3 flex justify-center hidden md:flex">
                                <div className="w-[1.5px] bg-gray-200 h-full" />
                                <div className="absolute top-0 w-[1.5px] bg-black h-full" />
                            </div>

                            <div className="space-y-5">
                                {PROCESS_STEPS.map((step, index) => (
                                    <StepItem 
                                        key={step.number} 
                                        step={step} 
                                        index={index} 
                                        isActive={activeIndex === index}
                                        onInView={() => setActiveIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepItem({ step, index, isActive, onInView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            className="relative flex items-center group pl-0 md:pl-10 cursor-pointer"
            onClick={() => onInView()}      // Manual interaction only
        >
            {/* Circle Marker - EXACT Design with Active State ONLY */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 flex justify-center z-10 hidden md:flex">
                <div className={`w-[10px] h-[10px] rounded-full bg-white border-[1.5px] flex items-center justify-center transition-all duration-300 shadow-sm ${isActive ? 'border-black' : 'border-gray-400 group-hover:border-black'}`}>
                    {/* Dot only appears when isActive is true */}
                    <div className={`w-1.5 h-1.5 rounded-full bg-black transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                
                {/* Pulse Effect on Active ONLY */}
                <div className={`absolute inset-0 rounded-full bg-gray-200 scale-150 animate-pulse transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Heading Title - EXACT Design with Active State */}
            <div className="relative">
                <h3 className={`text-sm md:text-[15px] font-semibold transition-colors duration-300 py-1 ${isActive ? 'text-black' : 'text-gray-800 group-hover:text-black'}`}>
                    {step.title}
                </h3>
            </div>
        </motion.div>
    );
}
