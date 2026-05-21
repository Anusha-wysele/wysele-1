import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import { Lightbulb, ChartLineUp, RocketLaunch } from '@phosphor-icons/react';





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
                                <h2 className="text-base font-semibold text-gray-900 leading-snug mb-1 tracking-tight">
                                    How RISE with SAP Supports <span className="text-[#C9184A]">Business Transformation</span>
                                </h2>
                                <h3 className="text-xs font-bold text-gray-800 mb-2">
                                    Improve Operational Efficiency
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed font-normal mb-3">
                                    Operational inefficiencies often reduce productivity and create delays across departments. RISE with SAP helps organizations improve workflow management, streamline business processes, and reduce operational complexity.
                                </p>
                                <div className="h-[1px] w-full bg-gray-100 mb-3" />
                                <p className="text-xs font-semibold text-gray-700 mb-2">
                                    Wysele helps businesses improve:
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        "Process coordination",
                                        "Workflow visibility",
                                        "Resource utilization",
                                        "Operational consistency",
                                        "Team collaboration",
                                        "Reporting efficiency"
                                    ].map((point, i) => (
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
                                <p className="text-xs text-gray-600 leading-relaxed font-normal mb-3">
                                    RISE with SAP is a business transformation solution that combines SAP cloud infrastructure, SAP S/4HANA, process intelligence, analytics, and operational tools into a unified framework. The solution helps businesses modernize enterprise systems, improve operational visibility, and simplify digital transformation initiatives.
                                </p>
                                <div className="h-[1px] w-full bg-gray-100 mb-3" />
                                <p className="text-xs font-semibold text-gray-700 mb-2">
                                    RISE with SAP supports organizations by helping them:
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        "Move enterprise systems to cloud environments",
                                        "Simplify IT infrastructure management",
                                        "Improve workflow coordination",
                                        "Increase operational flexibility",
                                        "Improve reporting and business visibility",
                                        "Support scalable business operations",
                                        "Optimize core business processes"
                                    ].map((point, i) => (
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
                            How RISE with SAP Supports<br />Business Transformation
                        </h2>
                    </motion.div>
                </div>

                {/* 3 cards overlay (Bottom - Spilling out) */}
                <div className="relative md:absolute inset-x-0 top-0 md:top-[40%] z-20 w-full max-w-6xl mx-auto px-6 md:px-4 mt-8 md:mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 pt-4 pb-4 px-6 md:pt-5 md:pb-5 md:px-8 flex flex-col justify-between"
                        >
                            <div>
                                <Lightbulb weight="light" className="w-6 h-6 text-white mb-2" />
                                <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                                    Improve Operational Efficiency
                                </h3>
                                <p className="text-white/90 text-xs leading-relaxed mb-4">
                                    RISE with SAP helps organizations improve workflow management, streamline business processes, and reduce operational complexity.
                                </p>
                                <div className="h-[1px] w-full bg-white/10 my-3" />
                                <p className="text-xs font-semibold text-white mb-2">
                                    Wysele helps businesses improve:
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        "Process coordination",
                                        "Workflow visibility",
                                        "Resource utilization",
                                        "Operational consistency"
                                    ].map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-xs text-white/90 leading-relaxed"
                                        >
                                            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-white/70" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 pt-4 pb-4 px-6 md:pt-5 md:pb-5 md:px-8 flex flex-col justify-between"
                        >
                            <div>
                                <ChartLineUp weight="light" className="w-6 h-6 text-white mb-2" />
                                <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                                    Support Cloud-Based Business Operations
                                </h3>
                                <p className="text-white/90 text-xs leading-relaxed mb-4">
                                    RISE with SAP supports cloud transformation by helping organizations move critical business operations into secure and scalable cloud environments.
                                </p>
                                <div className="h-[1px] w-full bg-white/10 my-3" />
                                <p className="text-xs font-semibold text-white mb-2">
                                    Our consultants help businesses implement cloud solutions that support:
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        "Scalable infrastructure",
                                        "Improved operational flexibility",
                                        "Better system accessibility"
                                    ].map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-xs text-white/90 leading-relaxed"
                                        >
                                            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-white/70" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#800000] border border-white/10 hover:border-white transition-all duration-300 pt-4 pb-4 px-6 md:pt-5 md:pb-5 md:px-8 flex flex-col justify-between"
                        >
                            <div>
                                <RocketLaunch weight="light" className="w-6 h-6 text-white mb-2" />
                                <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                                    Accelerate Growth
                                </h3>
                                <p className="text-white/90 text-xs leading-relaxed mb-4">
                                    Boost your organizational scalability and responsiveness, enabling rapid adaptation to market changes and the ability to seize new opportunities as they arise. RISE with SAP includes analytics and process intelligence tools that help organizations monitor performance, identify inefficiencies, and improve reporting visibility.
                                </p>
                                <div className="h-[1px] w-full bg-white/10 my-3" />
                                <p className="text-xs font-semibold text-white mb-2">
                                    Wysele helps organizations use operational data to:
                                </p>
                                <ul className="space-y-1">
                                    {[
                                        "Improve planning accuracy",
                                        "Monitor workflow performance",
                                        "Reduce process inefficiencies"
                                    ].map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-xs text-white/90 leading-relaxed"
                                        >
                                            <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-white/70" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
