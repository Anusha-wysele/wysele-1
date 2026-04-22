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
        title: "Expertise and Experience",
        description: "Our team possesses a wealth of experience in SAP Signavio and business process management. We excel at tailoring the platform to meet your specific business needs, ensuring that the implementation process is both seamless and effective, setting a strong foundation for long-term success.",
        icon: <Lightbulb size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "End-to-End Services",
        description: "We offer a holistic suite of SAP Signavio services, encompassing everything from initial consulting and implementation to ongoing process optimization and support. Our commitment to partnership means we are by your side at every step of your journey, guiding you towards sustained success and continuous improvement.",
        icon: <PuzzlePiece size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Data-Driven Decision Making",
        description: "By leveraging SAP Signavio’s robust process mining and analytics capabilities, we empower your organization to make smarter, data-driven decisions that lead to superior business outcomes. Our approach fosters a culture of analytical thinking, enabling you to respond proactively to emerging challenges and opportunities.",
        icon: <TrendUp size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Collaboration and Transparency",
        description: "We prioritize collaboration and transparency within your organization, ensuring that the process management framework is engaging and inclusive. SAP Signavio provides the necessary tools to keep all stakeholders informed and aligned, facilitating small wins that build momentum for broader organizational change.",
        icon: <Handshake size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Scalability and Flexibility",
        description: "Regardless of whether you are a small business or a large enterprise, SAP Signavio scales to accommodate your evolving needs. As your organization grows and your processes adapt, SAP Signavio remains a vital ally, facilitating ongoing optimization, automation, and continuous improvement.",
        icon: <CornersOut size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Compliance and Governance",
        description: "We ensure that your processes are optimized and compliant with relevant regulatory and industry standards. With SAP Signavio, we help you establish and maintain robust governance frameworks while driving process excellence through best practices and innovative solutions.",
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
                        className="text-3xl md:text-4xl font-normal text-gray-900 mb-2 z-10 flex items-center justify-center gap-3"
                    >
                        <Cylinderr className="w-4 h-10 rounded-sm" /> 
                        Why Choose Us
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

export default SapSignavioWhyChooseUs;
