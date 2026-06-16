import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

import DesignImg from '../../assets/wysele-appdevelopmentdesign.webp';
import DevelopmentImg from '../../assets/wysele-appdevelopmentdevelopment.webp';
import ideaImg from '../../assets/wysele-appdevelopmentidea.webp';
import PlanningImg from '../../assets/wysele-appdevelopmentplanning.webp';
import ReleaseImg from '../../assets/wysele-appdevelopmentrelease.webp';
import TestingImg from '../../assets/wysele-appdevelopmenttesting.webp';

const PROCESS_STEPS = [
    {
        id: 1,
        tag: "Idea",
        title: "Idea & Conceptualization",
        description: "At Wysele, we believe every successful application begins with a meaningful idea. We work closely with our clients to understand their business goals, identify real-world challenges, and explore how technology can provide effective solutions. Through collaboration, research, and innovation, we shape app concepts that are practical, user-focused, and capable of delivering long-term value.",
        sideTitle: "Meaningful App Concepts",
        sideDesc: "We collaborate closely to explore practical and user-focused technology solutions.",
        image: ideaImg
    },
    {
        id: 2,
        tag: "Planning",
        title: "Strategic Planning",
        description: "Once the idea is finalized, we at Wysele transform the concept into a well-structured development roadmap. Our team carefully plans the project by defining timelines, selecting the right technologies, allocating resources, and prioritizing features. By establishing clear workflows and technical requirements, we ensure that the entire development process remains organized, efficient, and aligned with the client’s vision.",
        sideTitle: "Structured Development Roadmap",
        sideDesc: "We define timelines, technologies, and features to keep the process organized and efficient.",
        image: PlanningImg
    },
    {
        id: 3,
        tag: "Design",
        title: "UI/UX Design",
        description: "At Wysele, we focus on creating visually appealing and user-friendly applications that deliver exceptional user experiences. Our design team develops wireframes, prototypes, and intuitive interfaces that combine creativity with functionality. We ensure that every screen is designed to be simple, engaging, and easy to navigate, allowing users to interact with the application effortlessly.",
        sideTitle: "Intuitive App Interfaces",
        sideDesc: "We create visually appealing prototypes and interfaces focused on exceptional user experience.",
        image: DesignImg
    },
    {
        id: 4,
        tag: "Development",
        title: "Robust Development",
        description: "During the development phase, we bring ideas and designs to life through robust and scalable solutions. Our developers at Wysele build responsive user interfaces, secure backend systems, APIs, and database integrations that ensure seamless application performance. By following modern development practices and industry standards, we create applications that are reliable, efficient, and future-ready.",
        sideTitle: "Robust & Scalable Solutions",
        sideDesc: "We build reliable and secure applications using modern development practices and standards.",
        image: DevelopmentImg
    },
    {
        id: 5,
        tag: "Testing",
        title: "Quality Assurance & Testing",
        description: "Quality is a key priority at Wysele. Before release, we conduct thorough testing to ensure that the application performs smoothly across different devices and platforms. Our testing process includes functionality checks, security validation, performance analysis, and bug fixing to guarantee a stable and reliable user experience. We strive to deliver applications that meet the highest quality standards.",
        sideTitle: "Comprehensive Quality Assurance",
        sideDesc: "We conduct rigorous functionality, security, and performance checks to guarantee reliability.",
        image: TestingImg
    },
    {
        id: 6,
        tag: "Release",
        title: "Release & Maintenance",
        description: "After successful testing and final approval, we deploy the application to the appropriate platforms, including mobile app stores and cloud environments. At Wysele, our support does not end with the launch. We continue to monitor application performance, provide updates, implement improvements, and offer ongoing maintenance to ensure the app evolves with business and user needs.",
        sideTitle: "Seamless Deployment & Support",
        sideDesc: "We manage platform releases and provide ongoing maintenance to ensure long-term success.",
        image: ReleaseImg
    }
];

export default function Appdevelopmentprocess() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const currentService = PROCESS_STEPS[activeIndex];

    return (
        <section className="py-10 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 tracking-tight">
                        App Development Process
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
                        From conceptualization to deployment and beyond, our structured approach ensures high-quality applications that meet your business goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Main Feature Card */}
                    <div className="lg:col-span-7">
                        <div className="relative group rounded-none overflow-hidden aspect-[16/10] shadow-2xl bg-gray-900">
                            <AnimatePresence initial={false}>
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{
                                        opacity: { duration: 1.2, ease: "easeInOut" },
                                        scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                                    }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img loading="lazy" src={currentService.image}
                                        alt={currentService.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Side Info and Nav */}
                    <div className="lg:col-span-5 flex flex-col h-full justify-between">

                        {/* Static Info Box Container */}
                        <div className="mb-8">
                            <div className="bg-[#f8f9fa] border border-black rounded-none p-5 md:p-6 relative overflow-hidden max-w-xl lg:max-w-lg min-h-[120px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="pr-8"
                                    >
                                        <h4 className="text-base font-bold text-gray-900 mb-1">
                                            {currentService.title}
                                        </h4>
                                        <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed">
                                            {currentService.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Right Arrow */}
                                <div onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-[#800000] text-white hover:bg-[#600000] active:scale-95 transition-all duration-300 cursor-pointer">
                                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails (Only boxes with step tags, no images) */}
                        <div className="mt-auto">
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {PROCESS_STEPS.map((service, idx) => (
                                    <button
                                        key={service.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`relative rounded-none p-2 h-12 flex items-center justify-center transition-all duration-300 border ${activeIndex === idx
                                                ? 'bg-[#800000] border-[#800000] text-white ring-2 ring-[#FFB703]'
                                                : 'bg-[#f8f9fa] border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
                                            }`}
                                    >
                                        <span className={`text-[10px] font-black uppercase tracking-wider text-center ${activeIndex === idx ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {service.tag}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-gray-300 font-bold tracking-widest text-sm">
                                    <span className="text-gray-900">{activeIndex + 1}</span> / {PROCESS_STEPS.length}
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
