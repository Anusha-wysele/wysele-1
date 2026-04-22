import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Cylinders from '../../../components/common/Cylinders';

const RiseWithsaphero = () => {
    const lineVariants = {
        hidden: { scaleX: 0, originX: 0 },
        visible: { scaleX: 1, transition: { duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
    };

    const slideUp = {
        hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
    };

    return (
        <section className="sticky top-[68px] z-0 w-full h-[calc(100vh-68px)] overflow-hidden">
            {/* Background Image Area */}
            <div className="absolute inset-0">
                <motion.img
                    src={SERVICES_PAGE_IMAGES.riseWithSapHero}
                    alt="RISE with SAP"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8, ease: 'easeOut' }}
                />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent pointer-events-none" />

            {/* Cylinders */}
            <Cylinders />

            {/* Main text content */}
            <motion.div
                className="absolute inset-0 flex flex-col justify-end px-10 md:px-20 pb-4 max-w-5xl"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Label row */}
                <motion.div className="flex items-center gap-3 mb-4" variants={slideUp}>
                    <motion.div
                        className="h-[1px] w-10 bg-[#C9184A] origin-left"
                        variants={lineVariants}
                    />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-[#C9184A] uppercase">
                        RISE with SAP
                    </span>
                </motion.div>

                {/* Heading */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        className="text-3xl md:text-5xl font-light text-white leading-tight tracking-tight drop-shadow-lg"
                        variants={slideUp}
                    >
                        Welcome to the Future of
                    </motion.h1>
                </div>
                <div className="overflow-hidden mb-6">
                    <motion.h1
                        className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight drop-shadow-lg"
                        variants={slideUp}
                    >
                        Business Transformation
                    </motion.h1>
                </div>

                {/* Expanding divider */}
                <motion.div
                    className="h-[0.5px] bg-white/20 mb-6 origin-left"
                    variants={lineVariants}
                />

                {/* Three-column paragraphs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            text: "At Wysele, we help organizations navigate the evolving digital landscape by delivering agile and adaptive solutions that enable them to innovate, stay competitive, and unlock new opportunities for growth.",
                            border: false,
                        },
                        {
                            text: "RISE with SAP empowers businesses to rethink and transform their operations through intelligent cloud solutions, streamlined processes, and integrated services—allowing for seamless scalability and improved efficiency across the enterprise.",
                            border: true,
                        },
                        {
                            text: "Whether your focus is on optimizing existing processes, driving innovation, or accelerating sustainable growth, our RISE with SAP approach is designed to deliver a comprehensive, future-ready solution tailored to your unique business needs.",
                            border: true,
                        },
                    ].map(({ text, border }, i) => (
                        <motion.p
                            key={i}
                            variants={fadeIn}
                            className={`text-sm text-white/80 leading-relaxed ${border ? 'border-l border-white/20 pl-4' : ''}`}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default RiseWithsaphero;
