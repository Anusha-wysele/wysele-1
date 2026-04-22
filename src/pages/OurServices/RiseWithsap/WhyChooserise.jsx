import React from 'react';
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';
import {
    ArrowsMerge,
    Brain,
    Cloud,
    Users
} from "@phosphor-icons/react";

const reasons = [
    {
        title: "End-to-End Transformation",
        description: "With RISE with SAP, businesses can leverage a comprehensive suite of tools that encompass cloud infrastructure, business processes, and advanced analytics. This all-in-one platform is engineered for flexibility and exceptional performance, allowing for a holistic transformation across the organization.",
        icon: <ArrowsMerge size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Business Process Intelligence",
        description: "Gain valuable insights into your operational activities through SAP’s process intelligence features. By understanding, optimizing, and reimagining your business processes, you can enhance efficiency, drive profitability, and create sustainable improvements over time.",
        icon: <Brain size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Cloud-First Approach",
        description: "Equip your enterprise for the future with robust, cloud-first solutions. Capitalize on SAP’s cloud-native tools to scale operations dynamically, bolster security measures, and seamlessly integrate with the latest emerging technologies, ensuring that your business remains agile and secure in an ever-changing environment.",
        icon: <Cloud size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Personalized Support",
        description: "Receive bespoke guidance from SAP’s team of transformation experts, who will collaborate with you to navigate your distinct journey. RISE with SAP offers customized advice and services tailored for every stage of your transition, ensuring that the process is smooth, effective, and aligned with your specific business objectives.",
        icon: <Users size={22} weight="regular" className="text-gray-900" />
    }
];

const WhyChooserise = () => {
    return (
        <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-white relative">
            <div className="max-w-6xl mx-auto px-6 md:px-20">

                {/* Header Section matching the screenshot style */}
                <div className="relative mb-8 flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-normal text-gray-900 mb-2 z-10 flex items-center justify-center gap-3"
                    >
                        <Cylinderr className="w-[3px] h-10 rounded-sm" />
                        Why Choose Rise With SAP
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-500 font-light z-10"
                    >
                        A dedicated partnership to minimize risk while maximizing your transformation impact
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                <p className="mt-2 text-[12px] text-gray-500 font-light leading-relaxed">
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

export default WhyChooserise;
