import React from 'react';
import { motion } from 'framer-motion';
import AppDev1 from '../../assets/App-Development1.png';
import AppDev2 from '../../assets/App-Development2.png';

const AppDevelopmenthero = () => {
    return (
        <section className="relative w-full bg-[#1A222E] flex items-center justify-center overflow-hidden py-8 md:py-12 lg:py-16">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-1/2 flex flex-col z-20 mt-8 lg:mt-24"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-[1.5px] bg-white opacity-60" />
                        <span className="text-[10px] font-normal tracking-[0.3em] text-white opacity-60 uppercase">
                            Mobile App Development
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-[1.2] mb-5 tracking-tight">
                        Reliable, Feature-Rich Mobile Apps
                    </h1>

                    <p className="text-sm md:text-base text-gray-200 mb-5 max-w-lg leading-relaxed font-light">
                        Leverage modern technologies to build reliable, feature-rich mobile applications. Our approach focuses on performance, scalability, and intuitive design to deliver a smooth and engaging user experience.
                    </p>

                    <p className="text-sm md:text-base text-gray-200 mb-8 max-w-lg leading-relaxed font-light">
                        Our solutions are tailored to adapt to diverse business needs, ensuring flexibility, efficiency, and long-term growth.
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="bg-[#800000] text-white text-sm font-medium tracking-[0.15em] px-8 py-4 uppercase hover:bg-[#600000] transition-colors duration-300">
                            Get Started
                        </button>
                    </div>
                </motion.div>

                {/* Right Side: Overlapping Images */}
                <div className="w-full lg:w-1/2 relative h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center lg:justify-end z-10 mt-8 lg:mt-0">

                    {/* AppDev1 (Front, Leftish) - Increased Size */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 -left-12 md:-left-32 lg:-left-64 z-20 mt-8 md:mt-12 lg:mt-16"
                    >
                        <div className="-translate-y-1/2 relative">
                            <img
                                src={AppDev1}
                                alt="App Development Mockup 1"
                                className="w-[300px] md:w-[650px] lg:w-[900px] max-w-none object-contain relative z-20"
                            />
                        </div>
                    </motion.div>

                    {/* AppDev2 (Back, Rightish) - Reduced Size, Moved Down */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 right-0 md:-right-8 lg:-right-12 z-10 mt-8 md:mt-12 lg:mt-16"
                    >
                        <div className="-translate-y-1/2 relative mt-10 md:mt-16 lg:mt-24">
                            <img
                                src={AppDev2}
                                alt="App Development Mockup 2"
                                className="w-[200px] md:w-[400px] lg:w-[550px] max-w-none object-contain relative z-10"
                            />
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AppDevelopmenthero;
