import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Desktop,
    CloudArrowUp,
    Database,
    Cpu,
    Buildings,
    HardDrives,
    ArrowsLeftRight,
    ArrowsMerge
} from "@phosphor-icons/react";

const MIGRATION_SERVICES = [
    { title: "Software Migration", color: "#E11D48", icon: <Code size={24} /> },
    { title: "Server Migration", color: "#DB2777", icon: <Desktop size={24} /> },
    { title: "Cloud Migration", color: "#7C3AED", icon: <CloudArrowUp size={24} /> },
    { title: "Storage Migration", color: "#2563EB", icon: <HardDrives size={24} /> },
    { title: "Application Migration", color: "#16A34A", icon: <Cpu size={24} /> },
    { title: "Enterprise Platform", color: "#CA8A04", icon: <Buildings size={24} /> },
    { title: "Database Migration", color: "#EA580C", icon: <Database size={24} /> },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = (angle, radius) => ({
    hidden: {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0
    },
    show: {
        opacity: 1,
        scale: 1,
        x: Math.cos((angle * Math.PI) / 180) * radius,
        y: Math.sin((angle * Math.PI) / 180) * radius,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
        }
    }
});

export default function SapMigrationofferings() {
    return (
        <section className="pt-0 pb-8 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col xl:flex-row items-center gap-16 w-full">

                    {/* Left: Geometric Content Group with Background Image */}
                    <div className="w-full xl:w-[60%] relative group">
                        {/* Background Image Wrapper */}
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
                            <img
                                src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
                                alt="Migration Strategy"
                                className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        </div>

                        <div className="relative z-10 flex items-center justify-center w-full min-h-[350px] md:min-h-[420px]">
                            {/* Hollow Vertical Box */}
                            <div className="absolute left-4 md:left-10 lg:left-16 w-32 md:w-40 lg:w-44 h-56 md:h-72 lg:h-80 border-2 border-white/40 rounded-[2.5rem] z-0" />

                            {/* Horizontal Content Box - Absolutely Positioned for Precision */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10 w-full max-w-[500px] bg-[#5C6370]/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white/10 ml-12 md:ml-24"
                            >
                                <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">
                                    Expert-Led Migrations for a Smooth Digital Transition
                                </h3>
                                <p className="text-xs md:text-sm text-gray-100 leading-relaxed font-light">
                                    In the fast-paced digital landscape of today, businesses must leverage the latest SAP solutions to remain competitive. Our SAP Migration Services enable enterprises to transition smoothly from legacy systems to modern SAP environments, ensuring minimal disruption and maximizing operational efficiency.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Circular Expertise Diagram */}
                    <div className="w-full xl:w-[40%] flex justify-center items-center py-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.3 }}
                            className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] flex items-center justify-center"
                        >

                            {/* Central Hub */}
                            <motion.div
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    show: { scale: 1, opacity: 1 }
                                }}
                                className="z-20 w-28 h-28 md:w-36 md:h-36 rounded-full bg-white border-4 md:border-8 border-[#2D3E50] shadow-2xl flex items-center justify-center text-center p-3"
                            >
                                <span className="text-[9px] md:text-xs font-black text-[#2D3E50] leading-tight uppercase tracking-tighter">
                                    Our Expertise in<br />
                                    <span className="text-[#5C6370]">Data Migration</span><br />
                                    Services
                                </span>
                            </motion.div>

                            {/* Orbiting Circles */}
                            {MIGRATION_SERVICES.map((service, index) => {
                                const angle = (index * (360 / MIGRATION_SERVICES.length)) - 90;
                                const radius = 160;

                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants(angle, radius)}
                                        className="absolute z-10 flex flex-col items-center"
                                    >
                                        <div
                                            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg border-[3px] md:border-4 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                                            style={{ borderColor: service.color, color: service.color }}
                                        >
                                            {React.cloneElement(service.icon, { size: 20 })}
                                        </div>
                                        <div className="absolute -bottom-9 md:-bottom-11 w-24 md:w-28 text-center">
                                            <span
                                                className="text-[8px] md:text-[9px] font-bold uppercase tracking-tight leading-none"
                                                style={{ color: service.color }}
                                            >
                                                {service.title}<br />
                                                Service
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Decorative Orbit Lines */}
                            <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-full scale-[0.85] opacity-50" />
                        </motion.div>
                    </div>
                </div>

                {/* New Service Offerings Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {[
                        {
                            title: "SAP ECC to S/4HANA Migration",
                            desc: "Comprehensive evaluation of your current SAP ecosystem.",
                            icon: <ArrowsLeftRight size={32} weight="light" />
                        },
                        {
                            title: "Cloud Migration",
                            desc: "Seamlessly transition to a future-ready cloud environment with minimal downtime and optimized performance.",
                            icon: <CloudArrowUp size={32} weight="light" />
                        },
                        {
                            title: "SAP Database Migration",
                            desc: "Harness data-driven insights through real-time analytics and intuitive visualizations for informed decision-making.",
                            icon: <Database size={32} weight="light" />
                        },
                        {
                            title: "Hybrid Migration",
                            desc: "Comprehensive evaluation of your current SAP ecosystem.",
                            icon: <ArrowsMerge size={32} weight="light" />
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            className="flex flex-col items-center group"
                        >
                            {/* Icon Container */}
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-[#800000] border border-gray-100 group-hover:bg-[#800000] group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                                {item.icon}
                            </div>

                            {/* Connecting Line */}
                            <div className="w-[1px] h-10 bg-gradient-to-b from-[#800000] to-transparent opacity-30" />

                            {/* Content Box */}
                            <div className="w-full bg-[#fcfcfc] border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[160px] flex flex-col text-center">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">
                                    {item.title}
                                </h4>
                                <p className="text-[11px] text-gray-600 leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
