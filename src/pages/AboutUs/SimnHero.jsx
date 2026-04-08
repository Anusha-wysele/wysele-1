import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OTHER_PAGE_IMAGES } from '../../components/common/data';

const SimnHero = () => {
    const heroImage = OTHER_PAGE_IMAGES.simnHero;
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        // Gradually increase line height
        const timer = setTimeout(() => {
            setLineHeight(100);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Background Image */}
            <div className="relative w-full h-screen overflow-hidden">
                <img
                    src={heroImage}
                    alt="About Us"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
                        <div className="flex gap-8 items-end">
                            <motion.div 
                                className="flex gap-6 items-start flex-1 pb-20"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Animated Vertical Line */}
                                <motion.div 
                                    className="w-0.5 bg-red-600 flex-shrink-0 mt-12"
                                    initial={{ height: 0 }}
                                    animate={{ height: "150px" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                
                                {/* Text Content */}
                                <div className="max-w-2xl">
                                    {/* Main Heading */}
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white leading-tight mb-4">
                                        Empowering Businesses<br />
                                        Through<br />
                                        Strategic Innovation
                                    </h1>
                                    
                                    {/* Description */}
                                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
                                        Welcome to Wysele. Founded on the principles of adaptability, client excellence, and data-driven insights, we are dedicated to delivering technology solutions that create sustainable growth and competitive advantage.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right Side - Vision, Mission, Values Box */}
                            <motion.div 
                                className="w-96 p-6 space-y-4"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Our Vision */}
                                <div className="space-y-2 pb-4 relative">
                                    <h3 className="text-lg font-semibold text-white uppercase">Our vision</h3>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        To deliver cost-effective, cutting-edge solutions that help our clients achieve their goals. We continuously invest in R&D to stay ahead of technological advancements.
                                    </p>
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-px bg-red-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                                    />
                                </div>

                                {/* Our Mission */}
                                <div className="space-y-2 pb-4 relative">
                                    <h3 className="text-lg font-semibold text-white uppercase">Our mission</h3>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        To be a trusted technology partner, collaborating with clients to achieve strategic objectives and deliver long-term business value.
                                    </p>
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-px bg-red-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
                                    />
                                </div>

                                {/* Our Values */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white uppercase">Our values</h3>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        We build strong connections with clients and communities to create a better tomorrow. Our guiding principles help us stay different and better.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SimnHero;
