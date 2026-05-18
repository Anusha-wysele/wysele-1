import React from 'react';
import { motion } from 'framer-motion';
import SapMasterImg from '../../../assets/SapMaster.jpg';
import Cylinders from '../../../components/common/Cylinders';

export default function SapMasterhero() {
    return (
        <div className="w-full min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] overflow-hidden relative flex flex-col pt-[68px] lg:pt-0">
            {/* Full screen image */}
            <img
                src={SapMasterImg}
                alt="SAP Master Data Governance"
                className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content */}
            <div className="relative lg:absolute inset-0 flex items-end pb-20 z-20 flex-1">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
                    <div className="max-w-lg">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="text-lg lg:text-xl font-normal text-white leading-tight mb-5"
                        >
                            Master Your Data.<br />
                            Govern with Confidence.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs text-white/90 leading-relaxed mb-4"
                        >
                            At Wysele, we help organizations establish a single source of truth across their enterprise with robust SAP Master Data Governance solutions — ensuring data quality, consistency, and compliance at every level.
                        </motion.p>
                        <div className="w-full h-[0.5px] bg-white/20 my-4" />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs text-white/90 leading-relaxed"
                        >
                            From data harmonization and workflow automation to change request management and regulatory compliance, our SAP MDG services empower your teams to make faster, more informed decisions with trusted data.
                        </motion.p>
                    </div>
                </div>
            </div>

        </div>
    );
}
