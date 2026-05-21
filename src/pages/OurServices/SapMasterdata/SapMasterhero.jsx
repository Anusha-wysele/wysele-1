import React from 'react';
import { motion } from 'framer-motion';
import SapMasterImg from '../../../assets/SapMaster.jpg';
import Cylinders from '../../../components/common/Cylinders';

export default function SapMasterhero() {
    return (
        <div className="w-full min-h-[calc(100vh-68px)] overflow-hidden relative flex flex-col justify-end bg-black">
            {/* Full screen image */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    src={SapMasterImg}
                    alt="SAP Master Data Governance"
                    className="w-full h-full object-cover object-[center_35%]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8, ease: 'easeOut' }}
                />
            </div>

            {/* Dark overlays */}
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0 pointer-events-none" />

            {/* Decorative Cylinders */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Cylinders />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col justify-end flex-1 px-6 sm:px-10 md:px-16 lg:px-20 pt-28 pb-16 sm:pb-20 lg:pb-24">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="mb-4 sm:mb-6"
                        >
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.5em] text-[#800000] uppercase">
                                Data Governance
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-6 sm:mb-8 tracking-tight"
                        >
                            Master Your Data.<br />
                            <span className="font-semibold text-white">Govern with Confidence.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="text-sm md:text-base text-white/90 leading-relaxed mb-6"
                        >
                            At Wysele, we help organizations establish a single source of truth across their enterprise with robust SAP Master Data Governance solutions — ensuring data quality, consistency, and compliance at every level.
                        </motion.p>
                        
                        <div className="w-16 md:w-24 h-[1px] bg-[#800000] my-6 md:my-8" />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className="text-sm md:text-base text-white/90 leading-relaxed"
                        >
                            From data harmonization and workflow automation to change request management and regulatory compliance, our SAP MDG services empower your teams to make faster, more informed decisions with trusted data.
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
}
