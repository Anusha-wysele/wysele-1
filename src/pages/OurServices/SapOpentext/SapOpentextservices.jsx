import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SERVICES = [
    {
        id: 1,
        tag: "DMS",
        title: "SAP OpenText Document Management (DMS)",
        description: "We provide seamless integration of SAP OpenText with your existing SAP system, allowing for effective document management and accessibility. Our experts ensure your teams can easily access all necessary documents and records directly within the SAP interface, reducing the risk of errors in workflows and significantly boosting productivity.",
        image: "https://images.pexels.com/photos/5980866/pexels-photo-5980866.jpeg"
    },
    {
        id: 2,
        tag: "ECM",
        title: "Enterprise Content Management (ECM)",
        description: "Our SAP OpenText ECM solutions enable comprehensive management of the entire lifecycle of enterprise content. From document creation to secure archiving, our solutions guarantee compliance with regulatory standards, secure access, and collaborative capabilities. Your content is stored in a centralized, searchable repository, enhancing operational efficiency and minimizing manual effort.",
        image: "https://images.pexels.com/photos/7652037/pexels-photo-7652037.jpeg"
    },
    {
        id: 3,
        tag: "Workflow",
        title: "SAP OpenText Workflow Automation",
        description: "We harness the power of automated workflows to enhance productivity across your organization. Our automation solutions streamline document routing, approval processes, and notifications, effectively reducing bottlenecks and expediently facilitating decision-making through enhanced visibility.",
        image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
    },
    {
        id: 4,
        tag: "SuccessFactors",
        title: "Extended ECM for SAP SuccessFactors",
        description: "Maximize the effectiveness of your SAP SuccessFactors by integrating it with OpenText’s Extended ECM solutions. This integration creates a unified experience for employees by managing HR documents and records alongside SAP SuccessFactors data, thereby improving compliance, collaboration, and the overall employee lifecycle experience.",
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
        id: 5,
        tag: "Server",
        title: "SAP OpenText Content Server",
        description: "The SAP OpenText Content Server is an essential, secure platform for managing business-critical documents and records. We provide tailored solutions that support your implementation of the Content Server, enhancing access control, workflow automation, and compliance management for your critical business data.",
        image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg"
    }
];

export default function SapOpentextservices() {
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
                                    <h3 className="text-gray-900 font-bold text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight">
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
