import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

import dmsImg from '../../../assets/wysele-SapOpentextdocumentmanagement.webp';
import ecmImg from '../../../assets/wysele-SapOpentextcontentmanagement.webp';
import workflowImg from '../../../assets/wysele-SapOpentextworkflow.webp';
import successFactorsImg from '../../../assets/wysele-SapOpentextsuccessfactor.webp';
import serverImg from '../../../assets/wysele-SapOpentextserver.webp';

const SERVICES = [
    {
        id: 1,
        tag: "DMS",
        title: "SAP OpenText Document Management (DMS)",
        description: "We provide seamless integration of SAP OpenText with your existing SAP system, allowing for effective document management and accessibility. Our experts ensure your teams can easily access all necessary documents and records directly within the SAP interface, reducing the risk of errors in workflows and significantly boosting productivity.",
        sideTitle: "Seamless SAP OpenText DMS",
        sideDesc: "Access critical document files directly inside the SAP interface with DMS integration.",
        image: dmsImg
    },
    {
        id: 2,
        tag: "ECM",
        title: "Enterprise Content Management (ECM)",
        description: "Our SAP OpenText ECM solutions enable comprehensive management of the entire lifecycle of enterprise content. From document creation to secure archiving, our solutions guarantee compliance with regulatory standards, secure access, and collaborative capabilities. Your content is stored in a centralized, searchable repository, enhancing operational efficiency and minimizing manual effort.",
        sideTitle: "Full-Lifecycle Content Management",
        sideDesc: "Manage document lifecycles securely in a searchable, compliant, centralized repository.",
        image: ecmImg
    },
    {
        id: 3,
        tag: "Workflow",
        title: "SAP OpenText Workflow Automation",
        description: "We harness the power of automated workflows to enhance productivity across your organization. Our automation solutions streamline document routing, approval processes, and notifications, effectively reducing bottlenecks and expediently facilitating decision-making through enhanced visibility.",
        sideTitle: "Automated Business Workflows",
        sideDesc: "Accelerate document approval and routing to reduce bottlenecks and speed up decision making.",
        image: workflowImg
    },
    {
        id: 4,
        tag: "SuccessFactors",
        title: "Extended ECM for SAP SuccessFactors",
        description: "Maximize the effectiveness of your SAP SuccessFactors by integrating it with OpenText’s Extended ECM solutions. This integration creates a unified experience for employees by managing HR documents and records alongside SAP SuccessFactors data, thereby improving compliance, collaboration, and the overall employee lifecycle experience.",
        sideTitle: "Extended HR ECM Integration",
        sideDesc: "Connect employee documents directly with SAP SuccessFactors data for complete HR compliance.",
        image: successFactorsImg
    },
    {
        id: 5,
        tag: "Server",
        title: "SAP OpenText Content Server",
        description: "The SAP OpenText Content Server is an essential, secure platform for managing business-critical documents and records. We provide tailored solutions that support your implementation of the Content Server, enhancing access control, workflow automation, and compliance management for your critical business data.",
        sideTitle: "Secure Content Platform",
        sideDesc: "Establish a robust foundation for access control and regulatory compliance of corporate content.",
        image: serverImg
    }
];

export default function SapOpentextservices() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const currentService = SERVICES[activeIndex];
    const nextService = SERVICES[(activeIndex + 1) % SERVICES.length];

    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                        Our SAP OpenText Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

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
                                {SERVICES.map((service, idx) => (
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
                                    <span className="text-gray-900">{activeIndex + 1}</span> / {SERVICES.length}
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
