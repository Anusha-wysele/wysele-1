import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Cylinders from '../../../components/common/Cylinders';

const SapDatahero = () => {
    return (
        <div className="w-full min-h-screen lg:h-screen overflow-hidden relative">
            {/* Full screen background image */}
            <img
                src={SERVICES_PAGE_IMAGES.sapDatasphereHero}
                alt="SAP Datasphere"
                className="w-full h-full object-cover"
            />

            {/* Bottom black gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, transparent 70%)'
                }}
            />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content anchored at the bottom center */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full flex flex-col items-center">

                {/* Heading centered */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    className="text-xl lg:text-2xl font-normal text-white text-center leading-tight mb-8"
                >
                    Continuous SAP Datasphere Support &amp; Enhancement
                </motion.h1>

                {/* Row: paragraphs 1 and 2 side by side */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                        className="text-xs text-white/80 leading-relaxed"
                    >
                        At Wysele, we go beyond initial implementation by delivering continuous SAP Datasphere support services that help organizations maintain high-performing, reliable, and scalable data environments.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                        className="text-xs text-white/80 leading-relaxed border-l border-white/20 pl-4"
                    >
                        SAP Datasphere enables businesses to unify, manage, and leverage their data across systems, ensuring seamless access to accurate and meaningful insights. Our approach focuses on proactive monitoring, issue resolution, and performance enhancement to keep your platform running efficiently.
                    </motion.p>
                </div>

                {/* Divider */}
                <div className="w-full max-w-5xl h-[0.5px] bg-white/15 mb-6" />

                {/* Paragraph 3 centered full width */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                    className="text-xs text-white/70 leading-relaxed text-center max-w-3xl"
                >
                    Whether your objective is to strengthen data management, improve system performance, or scale your data ecosystem with evolving business demands, our SAP Datasphere solutions are designed to ensure long-term efficiency, flexibility, and alignment with your organizational goals.
                </motion.p>
                </div>
            </div>
        </div>
    );
};

export default SapDatahero;
