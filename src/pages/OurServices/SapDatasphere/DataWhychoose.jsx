import React from 'react';
import { motion } from 'framer-motion';
import { 
    Gear, 
    Monitor, 
    ArrowsMerge, 
    CornersOut, 
    Target,
    Brain,
    Database,
    ArrowsOut,
    ChartPieSlice,
    ShieldCheck
} from "@phosphor-icons/react";
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const DataWhychoose = () => {
    const points = [
        {
            text: "Continuous SAP Datasphere Support & Enhancement for sustained performance",
            icon: <Gear size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Proactive Monitoring & Optimization to ensure system efficiency and reliability",
            icon: <Monitor size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Seamless Data Integration & Management for unified and actionable insights",
            icon: <ArrowsMerge size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Scalable Support Model aligned with evolving business and data needs",
            icon: <CornersOut size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Outcome-Driven Approach focused on performance, agility, and long-term value",
            icon: <Target size={20} weight="light" className="text-white mt-0.5" />
        }
    ];

    const cardsData = [
        {
            title: "Expertise Across All SAP Modules",
            desc: "Our team possesses extensive experience in SAP technologies and a profound understanding of SAP Datasphere’s capabilities. We provide expert consultation and customized solutions to ensure the success of your data management strategies.",
            icon: <Brain size={24} weight="light" />
        },
        {
            title: "End-to-End Data Solutions",
            desc: "We offer a comprehensive range of services that cover every aspect of your SAP Datasphere journey—from initial implementation to integration, optimization, and ongoing support—ensuring you maximize the value of your data assets at every stage.",
            icon: <Database size={24} weight="light" />
        },
        {
            title: "Scalability & Flexibility",
            desc: "SAP Datasphere is designed to be a highly scalable solution, making it suitable for organizations of all sizes. We work with you to design and implement solutions that not only meet your current needs but can also grow and evolve with your business.",
            icon: <ArrowsOut size={24} weight="light" />
        },
        {
            title: "Data-Driven Decision Making",
            desc: "By leveraging SAP Datasphere’s advanced analytics and integration capabilities, we empower you with the tools necessary for informed, data-driven decision-making, enhancing your competitive advantage in the marketplace.",
            icon: <ChartPieSlice size={24} weight="light" />
        },
        {
            title: "Compliance & Security",
            desc: "We prioritize your data’s safety by ensuring that our management practices adhere to the highest standards of security, privacy, and regulatory compliance. SAP Datasphere’s built-in governance features enable full control over your data, significantly reducing the risks associated with data mismanagement.",
            icon: <ShieldCheck size={24} weight="light" />
        }
    ];

    return (
        <section className="pt-4 pb-12 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Left side label/description - matching Signavio layout logic */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-sm py-8 px-6 shadow-sm relative overflow-hidden group h-full flex flex-col justify-center min-h-[300px]"
                        >
                            {/* Background Image with dark overlay for text readability */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={SERVICES_PAGE_IMAGES.sapDatasphereWhyChooseLeft} 
                                    className="w-full h-full object-cover object-[center_75%] transition-transform duration-700 group-hover:scale-110" 
                                    alt="Partner Background" 
                                />
                                <div className="absolute inset-0 bg-black/50 transition-colors duration-700 group-hover:bg-black/60" />
                            </div>

                            <div className="relative z-10 w-full mt-20">
                                <span className="text-white drop-shadow-md text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
                                    Strategic Partnership
                                </span>
                                <h2 className="text-xl md:text-2xl font-light text-white drop-shadow-lg leading-tight mb-4 tracking-tight max-w-[260px]">
                                    Maximizing Value with<br />
                                    <span className="font-semibold text-white drop-shadow-lg">SAP Datasphere Support</span>
                                </h2>
                                <p className="text-white drop-shadow-md text-sm font-medium leading-relaxed max-w-md">
                                    We help you unlock the full potential of your data landscape through tailored support models that grow with your organizational needs.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: The Boxed Content - exact size/padding matching Signavio Strengths */}
                    <div className="w-full lg:w-1/2 lg:mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-sm py-4 px-5 shadow-sm relative overflow-hidden group"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={SERVICES_PAGE_IMAGES.sapDatasphereWhyChoose} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt="Background" 
                                />
                                <div className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/40" />
                            </div>

                            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                                <h2 className="text-lg font-light text-white drop-shadow-lg mb-2 tracking-tight">
                                    Why <span className="font-semibold text-[#8B3A5E]">Wysele</span> for SAP Datasphere?
                                </h2>
                                
                                <ul className="space-y-1.5">
                                    {points.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="shrink-0 drop-shadow-md">
                                                {item.icon}
                                            </div>
                                            <p className="text-xs text-white drop-shadow-md leading-snug font-medium">
                                                {item.text}
                                            </p>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Added Features Grid - 2 Column Layout */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cardsData.map((card, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className={`bg-gray-50/50 border border-gray-100 rounded-sm p-5 shadow-sm hover:border-[#8B3A5E]/20 transition-colors duration-300 group cursor-pointer ${
                                index === 4 ? "md:col-span-2 md:w-[calc(50%-12px)] mx-auto" : ""
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 shrink-0 cursor-default" style={{ perspective: '1000px' }}>
                                    <div 
                                        className="relative w-8 h-8 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:[transform:rotateY(180deg)]"
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div className="absolute inset-0 flex items-start justify-center" style={{ backfaceVisibility: 'hidden' }}>
                                            <span className="text-[#8B3A5E] font-medium text-xl leading-none opacity-80">0{index + 1}</span>
                                        </div>
                                        <div className="absolute inset-0 flex items-start justify-center text-[#8B3A5E] opacity-80" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base text-gray-900 font-semibold mb-1.5 tracking-tight group-hover:text-[#8B3A5E] transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-snug font-light">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DataWhychoose;
