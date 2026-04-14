import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OTHER_PAGE_IMAGES } from '../../components/common/data';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const SimnHero = () => {
    const heroImage = OTHER_PAGE_IMAGES.simnHero;
    const width = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Background Image */}
            <div className={`relative w-full ${isMobile ? 'h-[85vh]' : 'h-screen'} overflow-hidden`}>
                <img
                    src={heroImage}
                    alt="About Us"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

                {/* Content Overlay */}
                <div className={`absolute inset-0 flex items-end pb-25 md:pb-30 ${isMobile ? 'pt-20' : ''}`}>
                    <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 w-full">
                        <div className={`flex ${isMobile ? 'flex-col gap-10' : 'flex-row gap-8 items-end'}`}>

                            <motion.div
                                className={`flex gap-4 md:gap-6 items-start flex-1 ${isMobile ? 'pb-0' : 'pb-20'}`}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {/* Animated Vertical Line */}
                                {!isMobile && (
                                    <motion.div
                                        className="w-0.5 bg-red-600 flex-shrink-0 mt-12"
                                        initial={{ height: 0 }}
                                        animate={{ height: "150px" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                )}

                                {/* Text Content */}
                                <div className="max-w-2xl">
                                    {/* Main Heading */}
                                    <h1 className="text-3xl md:text-3xl lg:text-5xl font-extralight text-white leading-tight mb-4 tracking-tight">
                                        Empowering Businesses<br />
                                        Through<br />
                                        Strategic Innovation
                                    </h1>

                                    {/* Description */}
                                    <p className="text-gray-200 text-sm md:text-lg leading-relaxed font-light">
                                        Welcome to Wysele. Founded on the principles of adaptability, client excellence, and data-driven insights, we are dedicated to delivering technology solutions that create sustainable growth and competitive advantage.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right Side - Vision, Mission, Values Box */}
                            <motion.div
                                className={`${isMobile ? 'w-full grid grid-cols-1 gap-6' : 'w-96 space-y-4'} p-0 md:p-6`}
                                initial={{ x: isMobile ? 0 : 100, y: isMobile ? 50 : 0, opacity: 0 }}
                                animate={{ x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            >
                                {/* Our Vision */}
                                <div className="space-y-1 md:space-y-2 pb-4 relative">
                                    <h3 className="text-xs md:text-lg font-semibold text-white uppercase tracking-widest">Our vision</h3>
                                    <p className="text-gray-300 md:text-gray-200 text-[13px] md:text-sm leading-relaxed">
                                        To deliver cost-effective, cutting-edge solutions that help our clients achieve their goals. We continuously invest in R&D.
                                    </p>
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-px bg-red-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                                    />
                                </div>

                                {/* Our Mission */}
                                <div className="space-y-1 md:space-y-2 pb-4 relative">
                                    <h3 className="text-xs md:text-lg font-semibold text-white uppercase tracking-widest">Our mission</h3>
                                    <p className="text-gray-300 md:text-gray-200 text-[13px] md:text-sm leading-relaxed">
                                        To be a trusted technology partner, collaborating with clients to achieve strategic objectives.
                                    </p>
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-px bg-red-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
                                    />
                                </div>

                                {/* Our Values */}
                                <div className="space-y-1 md:space-y-2">
                                    <h3 className="text-xs md:text-lg font-semibold text-white uppercase tracking-widest">Our values</h3>
                                    <p className="text-gray-300 md:text-gray-200 text-[13px] md:text-sm leading-relaxed">
                                        We build strong connections with clients and communities to create a better tomorrow.
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
