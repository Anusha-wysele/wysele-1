import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

import HanaMigrationImg from '../../../assets/Saptechnicalhanamigration.jpg';
import CustomDevImg from '../../../assets/Saptechnicalcustomdev.jpg';
import InfraImg from '../../../assets/Saptechnicalinfra.jpg';
import DataMigrationImg from '../../../assets/Saptechnicaldatamigration.jpg';
import CloudImg from '../../../assets/Saptechnicalcloud.jpg';
import OptimisationImg from '../../../assets/Saptechnicaloptimisation.jpg';

const SERVICES = [
    {
        id: 1,
        tag: "Migration",
        title: "SAP S/4HANA Migration and Upgrades",
        description: "Transitioning to SAP S/4HANA can be a game-changer, and our experts ensure that this migration is seamless. We guide you through every phase of the process, starting with comprehensive system analysis and planning, moving through the technical setup, and continuing with robust post-migration support to guarantee that your organization maximizes the benefits of the new system.",
        sideTitle: "Seamless S/4HANA Transition",
        sideDesc: "Our structured migration approach minimizes disruption and ensures every phase — from planning to go-live — is executed with precision.",
        image: HanaMigrationImg
    },
    {
        id: 2,
        tag: "Development",
        title: "Custom Development and Integration",
        description: "Our team specializes in creating custom solutions, including ABAP programming tailored to your specifications, Fiori app development for user-friendly interfaces, and SAP Cloud Platform integrations that connect disparate systems. We work closely with you to ensure our developments align perfectly with your unique operational requirements.",
        sideTitle: "Tailored SAP Solutions",
        sideDesc: "From ABAP to Fiori and cloud integrations, every solution is purpose-built to match your specific business workflows and goals.",
        image: CustomDevImg
    },
    {
        id: 3,
        tag: "Infrastructure",
        title: "SAP Infrastructure Management",
        description: "We design, deploy, and maintain high-performance SAP infrastructures that are secure, scalable, and optimized for efficiency. Our consultants leverage best practices and the latest technologies to ensure that your SAP systems perform at their best, adapting to the evolving landscape of your business.",
        sideTitle: "Reliable & Scalable SAP Environments",
        sideDesc: "We build and maintain infrastructures that keep your SAP systems secure, high-performing, and ready to scale with your business.",
        image: InfraImg
    },
    {
        id: 4,
        tag: "Data",
        title: "Data Migration",
        description: "Transitioning data from legacy systems can be daunting. We execute data migration strategies that ensure a smooth transition without data loss or integrity issues, maintaining the reliability and accuracy of your crucial business information.",
        sideTitle: "Zero Data Loss Migration",
        sideDesc: "Our proven data migration strategies safeguard the integrity and accuracy of your business-critical information throughout the transition.",
        image: DataMigrationImg
    },
    {
        id: 5,
        tag: "Cloud",
        title: "SAP Cloud Solutions",
        description: "As businesses increasingly adopt cloud technologies, we offer a range of cloud-based SAP solutions, including SAP Cloud Platform and SAP Business Technology Platform (BTP). Our solutions are designed to enhance flexibility and scalability, meeting the diverse demands of your growing organization.",
        sideTitle: "Future-Ready Cloud SAP",
        sideDesc: "Leverage the full power of SAP BTP and Cloud Platform to gain the flexibility and scalability your enterprise needs to grow.",
        image: CloudImg
    },
    {
        id: 6,
        tag: "Optimization",
        title: "Performance Optimization",
        description: "Our consultants conduct thorough evaluations to identify performance bottlenecks within your SAP systems. We implement optimization strategies to improve response times and efficiency, enabling faster decision-making and improved overall productivity.",
        sideTitle: "Maximum SAP Efficiency",
        sideDesc: "We identify and resolve performance bottlenecks to ensure your SAP systems deliver fast, reliable results across all operations.",
        image: OptimisationImg
    }
];

export default function SapTechnicalconsultingservices() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowStart, setWindowStart] = useState(0);

    const nextSlide = React.useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, []);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    };

    // Slide the thumbnail window when activeIndex moves beyond visible slots
    React.useEffect(() => {
        if (activeIndex === 0) {
            setWindowStart(0);
        } else if (activeIndex > windowStart + 2) {
            setWindowStart(activeIndex - 2);
        } else if (activeIndex < windowStart) {
            setWindowStart(activeIndex);
        }
    }, [activeIndex, windowStart]);

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
                        Our SAP Technical Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left: Main Feature Card */}
                    <div className="lg:col-span-7 relative">
                        <div className="group rounded-none overflow-hidden aspect-[16/10] shadow-2xl bg-gray-900 relative">
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
                                    <img
                                        src={currentService.image}
                                        alt={currentService.title}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* Decorative Circle (Full & Responsive) */}
                        <div className="absolute top-1/2 right-[-1rem] md:right-[-1.5rem] lg:right-[-2rem] -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-[#FFB703] shadow-xl z-10 flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 text-center border-4 border-white">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <h3 className="text-gray-900 font-bold text-xs md:text-sm lg:text-lg leading-tight">
                                        {currentService.title}
                                    </h3>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Side Info and Nav */}
                    <div className="lg:col-span-5 flex flex-col h-full justify-between">

                        {/* Info Box — syncs with active image */}
                        <div className="mb-8 mt-8 lg:mt-12">
                            <div className="bg-[#f8f9fa] border border-black rounded-none p-5 md:p-6 relative overflow-hidden max-w-xl lg:max-w-lg min-h-[160px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <h4 className="text-base font-bold text-gray-900 mb-1">
                                            {currentService.title}
                                        </h4>
                                        <p className="text-gray-500 text-[11px] leading-relaxed">
                                            {currentService.description}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Thumbnails — smooth sliding strip */}
                        <div className="mt-auto">
                            <div className="overflow-hidden mb-8">
                                <motion.div
                                    className="flex"
                                    animate={{ x: `-${windowStart * (100 / SERVICES.length)}%` }}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ width: `${(SERVICES.length / 3) * 100}%` }}
                                >
                                    {SERVICES.map((service, idx) => (
                                        <div
                                            key={service.id}
                                            style={{ width: `${100 / SERVICES.length}%` }}
                                            className="px-1.5"
                                        >
                                            <button
                                                onClick={() => setActiveIndex(idx)}
                                                className={`relative w-full rounded-none overflow-hidden aspect-video transition-all duration-300 ${
                                                    activeIndex === idx
                                                        ? 'ring-4 ring-[#FFB703]'
                                                        : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0'
                                                }`}
                                            >
                                                <img src={service.image} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                                                        {service.tag}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    ))}
                                </motion.div>
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
