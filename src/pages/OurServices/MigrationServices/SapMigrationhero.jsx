import {
  AppWindow,
  CloudArrowUp,
  Database,
  Globe,
  HardDrives,
  Monitor,
  Stack
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React from 'react';
import Cylinders from '../../../components/common/Cylinders';
import sapMigrationHeroImg from '../../../assets/wysele-sapmigrationhero.webp';

export default function SapMigrationhero() {
    const services = [
        { icon: <Monitor size={22} />, label: "Software" },
        { icon: <HardDrives size={22} />, label: "Server" },
        { icon: <CloudArrowUp size={22} />, label: "Cloud" },
        { icon: <Database size={22} />, label: "Storage" },
        { icon: <AppWindow size={22} />, label: "Application" },
        { icon: <Globe size={22} />, label: "Platform" },
        { icon: <Stack size={22} />, label: "Database" },
    ];

    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden font-sans bg-black pt-[150px] md:pt-0">
            {/* Background Image */}
            <img 
                src={sapMigrationHeroImg} 
                alt="SAP Migration" 
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/60 sm:bg-black/40 z-10" />
            
            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Angled Color Accent at the bottom */}
            <div
                className="absolute bottom-0 right-0 w-full h-32 sm:h-48 md:h-64 lg:h-80 bg-[#800000]/60 backdrop-blur-sm z-10"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
            ></div>

            {/* Content Container */}
            <div className="relative z-20 w-full pt-32 pb-24 sm:pt-40 sm:pb-32">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20 w-full">
                    <div className="max-w-3xl">
                        {/* Main Title */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight tracking-tight"
                        >
                            Seamless SAP Migration for Modern Enterprises
                        </motion.h1>

                        {/* Sub-headline */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-base md:text-lg text-white mb-6 font-normal max-w-2xl"
                        >
                            Adapt to the evolving digital landscape with advanced SAP solutions
                        </motion.p>

                        {/* Bullet Points */}
                        <div className="space-y-3 mb-10">
                            {[
                                "Seamlessly migrate from legacy systems to modern SAP environments",
                                "Ensure minimal disruption during the transition process",
                                "Enhance system performance and operational efficiency",
                                "Enable agility to quickly respond to changing business demands"
                            ].map((bullet, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                                    className="flex items-center gap-3 text-white text-xs md:text-sm font-medium"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB703]" />
                                    <span>{bullet}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Service Icons Row */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            {services.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 + (idx * 0.1) }}
                                    className="flex flex-col items-center group"
                                >
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#800000] shadow-xl hover:bg-[#800000] hover:text-white transition-all duration-300 cursor-pointer border border-white/20">
                                        {React.cloneElement(service.icon, { size: 22 })}
                                    </div>
                                    <span className="sr-only">{service.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
