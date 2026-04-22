import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Cylinders from '../../../components/common/Cylinders';

const BtpHero = () => {
    const slideUp = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black text-white">
            {/* Background Image Container */}
            <div className="absolute inset-0">
                <img
                    src={SERVICES_PAGE_IMAGES.btpHero}
                    alt="SAP BTP Services"
                    className="w-full h-full object-cover object-[center_45%]"
                />
            </div>

            {/* Subtle cinematic overlays removed as per previous request, but keeping shadow for legibility */}
            <div className="absolute inset-0 bg-transparent pointer-events-none" />

            <Cylinders />

            {/* Reverting to Centered Content Design (as requested by 'how it is previous') */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-32 pb-4">
                <motion.div 
                    className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full flex flex-col items-center"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Minimal Label */}
                    <motion.div variants={slideUp} className="mb-8">
                         <span className="text-[10px] font-bold tracking-[0.5em] text-white/60 uppercase">
                            Digital Transformation
                         </span>
                    </motion.div>

                    {/* Headline - Restored to original requested text */}
                    <div className="mb-12">
                        <motion.h1 
                            variants={slideUp}
                            className="text-2xl md:text-3xl font-light text-white tracking-tight leading-tight"
                        >
                            Transform Your <br />
                            Business with <br />
                            <span className="text-[#800000]">SAP BTP</span>
                        </motion.h1>
                    </div>

                    {/* Horizontal Content Strip - Restoring Detailed Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                        {[
                            "At Wysele, we enable organizations to unlock the true value of their data by delivering robust SAP BTP solutions that drive innovation, improve efficiency, and support scalable growth.",
                            "SAP BTP brings together analytics, AI, and cloud capabilities into a unified ecosystem—helping businesses integrate systems, streamline processes, and gain meaningful data insights.",
                            "Our SAP BTP services provide a flexible, future-ready foundation that evolves with your business needs, modernizing operations and building intelligent applications."
                        ].map((text, i) => (
                            <motion.div 
                                key={i} 
                                variants={slideUp}
                                className="flex flex-col items-center"
                            >
                                <div className="h-[1px] w-8 bg-[#800000] mb-6" />
                                <p className="text-[13px] text-white leading-relaxed font-light max-w-xs">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default BtpHero;
