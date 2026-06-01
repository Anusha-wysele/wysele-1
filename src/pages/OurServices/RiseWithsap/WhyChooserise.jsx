import {
  ArrowsMerge,
  Brain,
  Cloud,
  Users
} from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';

const reasons = [
    {
        title: "SAP Transformation Experience",
        description: "Our consultants bring experience in SAP cloud migration, SAP S/4HANA implementation, workflow optimization, and enterprise modernization projects across industries. We help organizations create practical transformation strategies that support operational goals while reducing implementation complexity.",
        icon: <Brain size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "End-to-End Support",
        description: "Wysele provides complete RISE with SAP consulting services, including:",
        list: [
            "Business assessments",
            "Transformation planning",
            "Cloud migration support",
            "SAP implementation",
            "Workflow optimization",
            "Ongoing support and monitoring"
        ],
        descriptionSec: "Our consultants work closely with businesses throughout the transformation process to ensure smooth implementation and operational alignment.",
        icon: <ArrowsMerge size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Business-Focused Approach",
        description: "Technology transformation should improve business performance, not create additional complexity. Our approach focuses on improving operational efficiency, process visibility, and workflow management while supporting long-term business growth. We help organizations align SAP transformation initiatives with operational priorities and measurable business outcomes.",
        icon: <Users size={22} weight="regular" className="text-gray-900" />
    },
    {
        title: "Scalable Solutions for Long-Term Growth",
        description: "Business requirements continue to evolve as organizations grow and expand operations. Wysele provides scalable RISE with SAP solutions designed to support changing operational demands and future business expansion. Our solutions help organizations maintain operational flexibility while improving system performance and business continuity.",
        icon: <Cloud size={22} weight="regular" className="text-gray-900" />
    }
];

const WhyChooserise = () => {
    return (
        <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-white relative">
            <div className="max-w-6xl mx-auto px-6 md:px-20">

                {/* Header Section */}
                <div className="relative mb-8 flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-normal text-gray-900 mb-2 z-10 flex items-center justify-center gap-3"
                    >
                        <Cylinderr className="w-[3px] h-10 rounded-sm" />
                        Why Businesses Choose Wysele for RISE with SAP Services
                    </motion.h2>
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
                                className="border border-gray-200 rounded-xl p-4 lg:p-5 bg-white hover:shadow-xl transition-shadow duration-300 group flex flex-col justify-between"
                            >
                                <div>
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
                                    {item.list && (
                                        <ul className="mt-2 pl-4 list-disc text-[12px] text-gray-700 space-y-0.5">
                                            {item.list.map((listItem, i) => (
                                                <li key={i}>{listItem}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {item.descriptionSec && (
                                        <p className="mt-2 text-[12px] text-gray-700 font-normal leading-relaxed">
                                            {item.descriptionSec}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooserise;
