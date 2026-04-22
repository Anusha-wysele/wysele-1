import React from 'react';
import { TrainRegional, Target, Handshake, ChalkboardTeacher } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const cards = [
    { icon: <TrainRegional size={24} weight="thin" />, title: "Adaptability", desc: "Flexible solutions that evolve with your business needs, ensuring seamless transitions across changing technology landscapes." },
    { icon: <Target size={24} weight="thin" />, title: "Strategic Planning", desc: "Purpose-driven roadmaps that align technology initiatives with business objectives for sustainable growth." },
    { icon: <Handshake size={24} weight="thin" />, title: "Client Excellence", desc: "Building lasting partnerships through transparent communication, ethical practices, and consistent delivery." },
    { icon: <ChalkboardTeacher size={24} weight="thin" />, title: "Data-Driven Insights", desc: "Transforming complex data into actionable intelligence that drives informed decision-making and innovation." }
];

export default function WhatWeDo() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="border-t border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            className="relative p-5 md:p-6 border-b border-gray-200 sm:border-b-0 sm:border-r last:border-b-0 sm:last:border-r-0 lg:border-r lg:last:border-r-0 cursor-pointer group flex flex-col items-start"
                            whileHover="hover"
                            initial="initial"
                        >
                            <motion.div
                                variants={{
                                    initial: { clipPath: "inset(0 100% 0 0)" },
                                    hover: { clipPath: "inset(0 0 0 0)" }
                                }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 bg-[#455982]"
                            />
                            <div className="relative z-10 flex flex-col items-start h-full">
                                <div className="mb-2 text-gray-700 group-hover:text-white transition-colors duration-300">
                                    {card.icon}
                                </div>
                                <h3 className="text-[1.05rem] font-medium mb-1.5 text-gray-900 group-hover:text-white transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-[13px] leading-snug font-light group-hover:text-white transition-colors duration-300 line-clamp-3">
                                    {card.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
