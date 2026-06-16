import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
import img1 from '../../../assets/wysele-sapvimservices1.webp';
import img2 from '../../../assets/wysele-sapvimservices2.webp';
import img3 from '../../../assets/wysele-sapvimservices3.webp';
import img4 from '../../../assets/wysele-sapvimservices4.webp';
import img5 from '../../../assets/wysele-sapvimservices5.webp';
import img6 from '../../../assets/wysele-sapvimservices6.webp';

const VIM_SERVICES = [
    {
        id: 1,
        tag: "Implementation",
        title: "SAP VIM Implementation & Integration",
        description: "Efficient invoice management is crucial for an organization’s success. With SAP VIM, we automate and integrate invoicing into your SAP S/4HANA or SAP ECC environment, ensuring seamless ERP synchronization for better visibility and control over accounts payable. Our team supports you through every phase, from strategy to execution, helping you understand key features and functionalities.",
        sideTitle: "Seamless ERP Connectivity",
        sideDesc: "Ensure smooth synchronization between SAP systems and invoicing processes for consistent and reliable data flow.",
        image: img1,
        icon: <Plus className="w-6 h-6" />
    },
    {
        id: 2,
        tag: "Automation",
        title: "Invoice Automation",
        description: "Our SAP VIM solution minimizes manual intervention, reducing human error and speeding up invoice processing. Automation streamlines capture, validation, approval, and matching with purchase orders and goods receipts, enhancing efficiency and accelerating payments to improve cash flow.",
        sideTitle: "Faster Processing Cycles",
        sideDesc: "Accelerate invoice handling with automated workflows that improve efficiency and enhance cash flow.",
        image: img2,
        icon: <Plus className="w-6 h-6" />
    },
    {
        id: 3,
        tag: "Workflows",
        title: "Approval Workflows",
        description: "With SAP VIM, we streamline invoice approval workflows to ensure timely payments and accountability. Our tailored approval hierarchy enhances compliance, reduces late payments, and strengthens vendor relationships.",
        sideTitle: "Enhanced Compliance Control",
        sideDesc: "Maintain approval transparency and enforce policies to reduce delays and ensure regulatory compliance.",
        image: img3,
        icon: <Plus className="w-6 h-6" />
    },
    {
        id: 4,
        tag: "Vendors",
        title: "Vendor Management",
        description: "Our SAP VIM solution streamlines vendor management by tracking vendor details, monitoring payments, and improving communication. Enhanced transparency strengthens supplier relationships, enabling better negotiations and smoother workflows.",
        sideTitle: "Improved Vendor Collaboration",
        sideDesc: "Enable better coordination and transparency with vendors for smoother operations and stronger partnerships.",
        image: img4,
        icon: <Plus className="w-6 h-6" />
    },
    {
        id: 5,
        tag: "Compliance",
        title: "Compliance & Reporting",
        description: "SAP VIM ensures compliance with global regulations by standardizing invoicing processes and maintaining audit-ready documentation. We help implement robust policies to meet tax requirements, enhancing reporting accuracy and reducing regulatory risks.SAP VIM ensures compliance with global regulations by standardizing invoicing processes and maintaining audit-ready documentation. We help implement robust policies to meet tax requirements, enhancing reporting accuracy and reducing regulatory risks.",
        sideTitle: "Accurate Financial Insights",
        sideDesc: "Gain better visibility into financial data with reliable reporting and improved decision-making.",
        image: img5,
        icon: <Plus className="w-6 h-6" />
    },
    {
        id: 6,
        tag: "Optimization",
        title: "Support & Optimization",
        description: "We provide ongoing support and optimization for SAP VIM, ensuring efficient, secure invoice management. Our team offers continuous monitoring, troubleshooting, and enhancements to help you maximize its benefits for sustainable growth.",
        sideTitle: "Sustained System Performance",
        sideDesc: "Maintain high efficiency with ongoing improvements, updates, and proactive issue resolution.",
        image: img6,
        icon: <Plus className="w-6 h-6" />
    }
];

export default function SapVimservices() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % VIM_SERVICES.length);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + VIM_SERVICES.length) % VIM_SERVICES.length);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const currentService = VIM_SERVICES[activeIndex];
    const nextService = VIM_SERVICES[(activeIndex + 1) % VIM_SERVICES.length];

    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                        SAP VIM Implementation & Integration
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
                        Our SAP VIM services streamline invoice management by automating and integrating invoicing within your SAP environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Main Feature Card */}
                    <div className="lg:col-span-7">
                        <div className="relative group rounded-none overflow-hidden aspect-[4/3] sm:aspect-[16/10] shadow-2xl bg-gray-900">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img loading="lazy" src={currentService.image}
                                        alt={currentService.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Black Color Overlay */}
                                    <div className="absolute inset-0 bg-black/40" />
                                    {/* Dark Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-left">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.15 }}
                                            className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4 leading-tight"
                                        >
                                            {currentService.title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.25 }}
                                            className="text-gray-200 text-[10px] sm:text-xs md:text-sm max-w-xl leading-relaxed"
                                        >
                                            {currentService.description}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Side Info and Nav */}
                    <div className="lg:col-span-5 flex flex-col h-full justify-between">

                        {/* Static Info Box Container */}
                        <div className="mb-8">
                            <div 
                                onClick={nextSlide}
                                className="bg-[#f8f9fa] border border-black rounded-none p-5 md:p-6 relative overflow-hidden max-w-xl lg:max-w-lg min-h-[120px] flex items-center justify-between cursor-pointer group transition-all duration-300 hover:bg-[#800000] hover:border-[#800000]"
                            >
                                <div className="flex-1 pr-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <h4 className="text-base font-bold text-gray-900 group-hover:text-white transition-colors duration-300 mb-1">
                                                {nextService.sideTitle}
                                            </h4>
                                            <p className="text-gray-500 group-hover:text-gray-200 transition-colors duration-300 text-[11px] leading-relaxed">
                                                {nextService.sideDesc}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-black/20 group-hover:border-white/40 group-hover:bg-white group-hover:text-[#800000] transition-all duration-300">
                                    <ArrowRight className="w-4 h-4 text-gray-900 group-hover:text-[#800000] transition-colors duration-300" />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails and Navigation */}
                        <div className="mt-auto">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 sm:mb-8">
                                {VIM_SERVICES.map((service, idx) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`relative rounded-none p-2 sm:p-3 border transition-all duration-300 flex items-center justify-center min-h-[48px] sm:min-h-[56px]
                                            ${activeIndex === idx 
                                                ? 'bg-[#800000] text-white border-[#800000] shadow-md' 
                                                : 'bg-[#f8f9fa] text-gray-800 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-center leading-tight">
                                            {service.tag}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-gray-300 font-bold tracking-widest text-sm">
                                    <span className="text-gray-900">{activeIndex + 1}</span> / {VIM_SERVICES.length}
                                </div>
                                <div className="flex gap-6 items-center">
                                    <button
                                        onClick={prevSlide}
                                        className="text-gray-400 hover:text-[#800000] transition-colors duration-300"
                                    >
                                        <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="text-gray-400 hover:text-[#800000] transition-colors duration-300"
                                    >
                                        <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
