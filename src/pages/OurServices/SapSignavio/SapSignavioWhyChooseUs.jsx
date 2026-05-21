import React from 'react';
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';
import { 
    Lightbulb, 
    PuzzlePiece, 
    TrendUp, 
    Handshake, 
    CornersOut, 
    Scales 
} from "@phosphor-icons/react";

const reasons = [
    {
        title: "Experienced SAP Process Experts",
        description: "Our consultants bring deep expertise in SAP process transformation, workflow optimization, operational governance, and process intelligence solutions.",
        icon: <Lightbulb size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "End-to-End Process Transformation Support",
        description: "From process analysis and implementation to optimization and governance, we provide complete SAP Signavio consulting and support services.",
        icon: <PuzzlePiece size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Data-Driven Decision Making",
        description: "We help organizations use operational analytics and process intelligence to make smarter business decisions and improve workflow efficiency.",
        icon: <TrendUp size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Collaboration and Transparency",
        description: "Our process management approach improves collaboration, accountability, and operational visibility across teams and departments.",
        icon: <Handshake size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Scalable and Flexible Solutions",
        description: "Our SAP Signavio solutions are designed to scale with your business operations while supporting changing process requirements and long-term growth.",
        icon: <CornersOut size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Governance and Compliance Support",
        description: "We help you establish and maintain robust process compliance and governance frameworks while driving operational excellence through best practices.",
        icon: <Scales size={22} weight="regular" className="text-gray-900" />
    }
];

const SapSignavioWhyChooseUs = () => {
    return (
        <section className="pt-6 md:pt-8 pb-12 md:pb-16 bg-white relative">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                
                {/* Header Section matching the screenshot style */}
                <div className="relative mb-8 flex flex-col items-center text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 z-10 flex items-center justify-center gap-3"
                    >
                        <Cylinderr className="w-4 h-10 rounded-sm" /> 
                        Why Businesses Choose Wysele for SAP Signavio Services
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-700 font-normal z-10"
                    >
                        A dedicated partnership to minimize risk while maximizing your transformation impact
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reasons.map((item, index) => {
                        const countNumber = index + 1 < 10 ? `0${index + 1}` : index + 1;
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="border border-gray-200 rounded-xl p-4 lg:p-5 bg-white hover:shadow-xl transition-shadow duration-300 group"
                            >
                                {/* Top container for the absolute gliding number */}
                                <div className="relative w-full h-8">
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#D4AF37] text-[#1C1216] flex items-center justify-center font-semibold text-xs shrink-0 transition-all duration-500 ease-out group-hover:left-[calc(100%-32px)]">
                                        {countNumber}
                                    </div>
                                </div>
                                
                                {/* Content & Icon Header */}
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="shrink-0 max-w-0 opacity-0 overflow-hidden translate-x-[-10px] transition-all duration-500 ease-out group-hover:max-w-[30px] group-hover:opacity-100 group-hover:translate-x-0">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[14px] font-semibold text-gray-900 leading-snug">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-[12px] text-gray-700 font-normal leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SapSignavioWhyChooseUs;
