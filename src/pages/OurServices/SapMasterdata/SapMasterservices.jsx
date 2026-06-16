import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightLeft, BarChart2, Database, HeadphonesIcon, Settings, ShieldCheck, Wrench } from 'lucide-react';

import SapMDGanalysis from '../../../assets/wysele-SapMDGanalysis.webp';
import SapMDGcentralised from '../../../assets/wysele-SapMDGcentralised.webp';
import SapMDGdatagovernance from '../../../assets/wysele-SapMDGdatagovernance.webp';
import SapMDGenhancement from '../../../assets/wysele-SapMDGenhancement.webp';
import SapMDGimplementation from '../../../assets/wysele-SapMDGimplementation.webp';
import SapMDGmigration from '../../../assets/wysele-SapMDGmigration.webp';
import SapMDGsupport from '../../../assets/wysele-SapMDGsupport.webp';

const services = [
    {
        icon: <Settings size={20} />,
        title: "SAP MDG Implementation & Configuration",
        description: "Transform your enterprise data strategy with our end-to-end SAP MDG implementation services. We build a seamlessly integrated governance framework that establishes a true single source of truth.",
        image: SapMDGimplementation,
        tag: "Data Governance"
    },
    {
        icon: <ShieldCheck size={20} />,
        title: "Data Governance & Quality Management",
        description: "We establish robust, automated frameworks that proactively monitor data accuracy and ensure compliance, helping your organization build lasting trust in its digital assets.",
        image: SapMDGdatagovernance,
        tag: "Quality Management"
    },
    {
        icon: <Wrench size={20} />,
        title: "SAP MDG Customization & Enhancements",
        description: "From extending complex data models to designing intuitive Fiori applications, our tailored enhancements empower your teams with a smooth, frustration-free data management experience.",
        image: SapMDGenhancement,
        tag: "Fiori & Workflows"
    },
    {
        icon: <ArrowRightLeft size={20} />,
        title: "SAP MDG Data Migration & Integration",
        description: "Our expert teams ensure a secure, zero-disruption transition. We meticulously cleanse, map, and validate your data, synchronizing legacy platforms with SAP MDG for absolute consistency.",
        image: SapMDGmigration,
        tag: "Data Integration"
    },
    {
        icon: <Database size={20} />,
        title: "SAP MDG for Centralized Data Management",
        description: "We help you centralize your master data into a unified, secure hub, giving your enterprise unparalleled control, agility, and visibility with real-time updates across all systems.",
        image: SapMDGcentralised,
        tag: "Enterprise Control"
    },
    {
        icon: <BarChart2 size={20} />,
        title: "SAP MDG Analytics & Reporting",
        description: "We leverage powerful analytics within SAP MDG to provide crystal-clear visibility into your data quality metrics, enabling leadership to make confident, proactive decisions.",
        image: SapMDGanalysis,
        tag: "Business Intelligence"
    },
    {
        icon: <HeadphonesIcon size={20} />,
        title: "SAP MDG Support & Optimization",
        description: "Our commitment doesn't end on go-live day. We provide proactive, dedicated support to ensure your SAP MDG environment remains highly performant, secure, and continuously optimized.",
        image: SapMDGsupport,
        tag: "Post Go-Live"
    }
];

const SapMasterservices = () => {
    return (
        <section className="w-full bg-white pt-6 pb-16 md:pt-8 md:pb-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="mb-12"
                >
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#800000] mb-3 block">
                        Our Expertise
                    </span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                        SAP Master Data Governance <span className="text-gray-400 italic font-light">Services</span>
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                            className="group flex flex-col bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#800000] transition-all duration-300 cursor-default"
                        >
                            {/* Card Image */}
                            <div className="w-full h-44 overflow-hidden relative">
                                <img loading="lazy" src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Tag Badge */}
                                <span className="absolute top-3 left-3 bg-[#800000] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1">
                                    {service.tag}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="flex flex-col flex-1 p-5">
                                {/* Icon */}
                                <div className="text-[#800000] mb-3">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-sm md:text-[15px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#800000] transition-colors duration-300">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-500 leading-relaxed font-light flex-1">
                                    {service.description}
                                </p>

                                {/* Bottom Accent Line */}
                                <div className="mt-4 h-[2px] w-0 bg-[#800000] group-hover:w-full transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SapMasterservices;
