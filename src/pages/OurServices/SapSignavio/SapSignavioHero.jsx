import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Cylinders from '../../../components/common/Cylinders';

const SapSignavioHero = () => {
    return (
        <div className="w-full h-screen overflow-hidden relative">
            {/* Full screen image */}
            <img
                src={SERVICES_PAGE_IMAGES.sapSignavioHero}
                alt="SAP Signavio"
                className="w-full h-full object-cover"
            />

            {/* Left-half dark shade overlay only, even lighter opacity */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-black/25" />

            {/* Soft blend so the shade fades into the clear image */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.25) 40%, transparent 65%)' }} />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content - left aligned on the shaded half, moved down */}
            <div className="absolute inset-0 flex items-end pb-20">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
                    <div className="max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        className="text-lg lg:text-xl font-normal text-white leading-tight mb-5"
                    >
                        Transform Your Business with SAP<br />
                        Signavio
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        className="text-xs text-white/90 leading-relaxed mb-4"
                    >
                        At Wysele, we are dedicated to delivering advanced SAP Signavio services that empower organizations to optimize their business processes, enhance operational efficiency, and achieve greater agility in an ever-evolving market landscape.
                    </motion.p>
                    <div className="w-full h-[0.5px] bg-white/20 my-4" />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        className="text-xs text-white/90 leading-relaxed mb-4"
                    >
                        SAP Signavio stands as a premier business process management (BPM) and process mining platform that enables businesses to understand, manage, and improve their workflows in real time.
                    </motion.p>
                    <div className="w-full h-[0.5px] bg-white/20 my-4" />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        className="text-xs text-white/90 leading-relaxed"
                    >
                        Whether your goal is to streamline operations, spearhead digital transformation initiatives, or gain deep insights into your business processes, our SAP Signavio solutions are specifically designed to revolutionize the way you work.
                    </motion.p>
                </div>
            </div>
        </div>
    </div>
);
};

export default SapSignavioHero;
