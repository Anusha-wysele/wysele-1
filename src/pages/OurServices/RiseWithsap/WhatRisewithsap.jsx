import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import { Lightbulb, ChartLineUp, RocketLaunch } from '@phosphor-icons/react';

const leftPoints = [
    "Businesses today must go beyond keeping pace and focus on continuous innovation and excellence",
    "Increasing demand for agile and adaptive solutions to stay competitive",
    "Need for faster value delivery while maintaining operational efficiency",
    "RISE with SAP enables organizations to rethink and transform their operations",
    "Supports seamless scalability through intelligent cloud solutions and optimized processes",
    "Helps drive innovation, process optimization, and sustainable business growth",
    "Offers a comprehensive, end-to-end solution tailored to unique business needs",
];

const rightPoints = [
    "A unified solution designed to simplify and accelerate business transformation",
    "Combines SAP cloud technologies, integrated services, and intelligent tools",
    "Enables smooth and efficient migration to the cloud",
    "Supports modernization of core business processes",
    "Leverages data-driven insights for better decision-making",
    "Provides a complete foundation for scalable and future-ready business operations",
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function WhatRisewithsap() {
    return (
        <section className="relative z-10 w-full bg-white pt-10 pb-16 md:pb-24">
            {/* Inner container for max-width content */}
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                {/* Section label */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[1.5px] bg-[#C9184A]" />
                    <span className="text-[11px] font-bold tracking-[0.3em] text-[#C9184A] uppercase">
                        Overview
                    </span>
                </div>

                {/* Grid wrapper */}
                <div className="max-w-5xl mx-auto">

                    {/* Two-column cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

                        {/* LEFT CARD */}
                        <motion.div
                            custom={0}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="border border-gray-200 relative group md:mx-0 -mx-2"
                        >
                            {/* Outer background box that shrinks on hover */}
                            <div className="hidden md:block absolute -inset-4 border-2 border-[#800000] opacity-30 group-hover:inset-0 transition-all duration-500 ease-out pointer-events-none" />
                            <div className="p-4 relative z-10">
                                <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2 tracking-tight">
                                    Driving the Next Era of{' '}
                                    <span className="text-[#C9184A]">Business Transformation</span>
                                </h2>
                                <div className="h-[1px] w-full bg-gray-100 mb-2" />
                                <ul className="space-y-1">
                                    {leftPoints.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed"
                                        >
                                            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-[#C9184A]" />
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>

                        {/* RIGHT CARD */}
                        <motion.div
                            custom={1}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="border border-gray-200 relative group"
                        >
                            {/* Outer background box that shrinks on hover */}
                            <div className="absolute -inset-4 border-2 border-[#800000] opacity-30 group-hover:inset-0 transition-all duration-500 ease-out pointer-events-none" />
                            <div className="p-4 relative z-10">
                                <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2 tracking-tight">
                                    What is <span className="text-[#C9184A]">RISE with SAP?</span>
                                </h2>
                                <div className="h-[1px] w-full bg-gray-100 mb-2" />
                                <ul className="space-y-1">
                                    {rightPoints.map((point, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed"
                                        >
                                            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-[#C9184A]" />
                                            {point}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Overview image with text & cards overlay */}
            <div className="mt-12 w-full relative h-auto md:h-96">
                {/* Background image & gradient layer (constrained to container) */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                        src={SERVICES_PAGE_IMAGES.riseWithSapOverview}
                        alt="RISE with SAP Overview"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.05 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Text content (Top) */}
                <div className="relative z-10 w-full max-w-6xl mx-auto md:px-4 flex flex-col justify-start pt-8 md:pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-xl md:text-2xl font-medium text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
                            Driving Innovation,<br />Value & Growth
                        </h2>
                        <div className="h-[1px] w-16 bg-white/30 mb-4" />
                        <p className="text-sm text-white/80 leading-relaxed max-w-md">
                            Empower your organization to innovate faster, unlock meaningful business value, and scale efficiently in a rapidly evolving market.
                        </p>
                    </motion.div>
                </div>

                {/* 3 cards overlay (Bottom - Spilling out) */}
                <div className="relative md:absolute inset-x-0 top-0 md:top-[60%] z-20 w-full max-w-6xl mx-auto px-6 md:px-4 mt-8 md:mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 p-6 md:p-8"
                        >
                            <Lightbulb weight="light" className="w-8 h-8 text-white mb-5" />
                            <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug max-w-[85%]">
                                Innovate Business Models
                            </h3>
                            <p className="text-white/60 text-xs leading-relaxed">
                                Develop cutting-edge products, innovative services, and agile business processes that resonate with future customer expectations, enabling you to stay ahead of the curve.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 p-6 md:p-8"
                        >
                            <ChartLineUp weight="light" className="w-8 h-8 text-white mb-5" />
                            <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug max-w-[85%]">
                                Unlock<br />Business Value
                            </h3>
                            <p className="text-white/60 text-xs leading-relaxed">
                                Utilize real-time data analytics and insights to inform decision-making, enhance productivity, and significantly reduce operational costs.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 p-6 md:p-8"
                        >
                            <RocketLaunch weight="light" className="w-8 h-8 text-white mb-5" />
                            <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug max-w-[85%]">
                                Accelerate<br />Growth
                            </h3>
                            <p className="text-white/60 text-xs leading-relaxed">
                                Boost your organizational scalability and responsiveness, enabling rapid adaptation to market changes and the ability to seize new opportunities as they arise.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
