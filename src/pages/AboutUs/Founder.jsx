import React, { useState, useEffect } from 'react';
import { Target, Shield, Cloud, Users, Award, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrainRegional, ChalkboardTeacher, FramerLogo, AirTrafficControl, SlackLogo } from '@phosphor-icons/react';
import { OTHER_PAGE_IMAGES } from '../../components/common/data';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const Founder = () => {
    const [scrollY, setScrollY] = useState(0);
    const width = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const lineWidth = Math.min(40, (scrollY / 10));

    // Custom SVG Icons
    const StrategyIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 3v6m0 6v6m6-9h-6m-6 0h6"></path>
            <circle cx="12" cy="12" r="2" fill="none"></circle>
        </svg>
    );

    const ClientServiceIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
    );

    return (
        <>
            {/* First Section - Four Cards */}
            <section className="bg-white">
                <div className="w-full">
                    <div className="border-t border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        
                        {/* Card Component internal helper to avoid duplication */}
                        {[
                            { icon: <TrainRegional size={32} weight="thin" />, title: "Adaptability", desc: "Flexible solutions that evolve with your business needs, ensuring seamless transitions across changing technology landscapes." },
                            { icon: <StrategyIcon />, title: "Strategic Planning", desc: "Purpose-driven roadmaps that align technology initiatives with business objectives for sustainable growth." },
                            { icon: <ClientServiceIcon />, title: "Client Excellence", desc: "Building lasting partnerships through transparent communication, ethical practices, and consistent delivery." },
                            { icon: <ChalkboardTeacher size={32} weight="thin" />, title: "Data-Driven Insights", desc: "Transforming complex data into actionable intelligence that drives informed decision-making and innovation." }
                        ].map((card, i) => (
                            <motion.div 
                                key={i}
                                className={`relative p-8 md:p-10 border-b border-gray-200 sm:border-b-0 sm:border-r border-gray-200 last:border-b-0 sm:last:border-r-0 lg:border-r lg:last:border-r-0 cursor-pointer group flex flex-col items-start min-h-[220px] md:min-h-[260px]`}
                                whileHover="hover"
                                initial="initial"
                            >
                                <motion.div
                                    variants={{
                                        initial: { clipPath: "inset(0 100% 0 0)" },
                                        hover: { clipPath: "inset(0 0 0 0)" }
                                    }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 bg-[#455982]"
                                />
                                <div className="relative z-10 flex flex-col items-start h-full">
                                    <div className="mb-4 text-gray-700 group-hover:text-white transition-colors duration-300">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-gray-600 text-[14px] leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                        {card.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Second Section - What We Deliver */}
            <section className="bg-white py-16 md:py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        
                        {/* Right Side (Higher Importance for Mobile) - Company Description */}
                        <div className="lg:w-[45%] order-1 lg:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                                Transforming Complexity into Confident Solutions
                            </h2>
                            {/* Animated line */}
                            <motion.div 
                                className="h-0.5 bg-gray-900 mb-8"
                                initial={{ width: 0 }}
                                animate={{ width: isMobile ? "60px" : `${lineWidth}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                            <p className="text-gray-600 text-base md:text-[17px] leading-relaxed font-light">
                                Since its inception in 2021, Wysele has focused on bringing clarity and purpose to every challenge—prioritizing meaningful execution over noise and real impact over empty promises. Our approach is grounded in transparency, strong values, and a commitment to building lasting partnerships. At Wysele, success is defined by the long-term value we create and the trust we build with every client we serve.
                            </p>
                        </div>

                        {/* Left Side - Heading and Content */}
                        <div className="lg:w-[55%] lg:pr-12 order-2 lg:order-1">
                            <h2 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-8">
                                What We Do
                            </h2>
                            
                            <div className="space-y-8">
                                {/* Approach 1 */}
                                <div className="flex items-start gap-5">
                                    <div className="flex-shrink-0 mt-1">
                                        <AirTrafficControl size={24} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Purpose-Driven Approach, Precision in Delivery
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                                            At Wysele, we focus on solving challenges before speaking—bringing clarity, speed, and effective execution. We prioritize outcomes over noise and action over hierarchy.
                                        </p>
                                    </div>
                                </div>

                                {/* Approach 2 */}
                                <div className="flex items-start gap-5">
                                    <div className="flex-shrink-0 mt-1">
                                        <SlackLogo size={24} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Beyond IT — Building Trust That Endures
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                                            We don't just pursue clients—we cultivate long-term partnerships. Through ethical practices and transparent communication, we create trust that goes beyond agreements.
                                        </p>
                                    </div>
                                </div>

                                {/* Approach 3 */}
                                <div className="flex items-start gap-5">
                                    <div className="flex-shrink-0 mt-1">
                                        <Cloud size={24} strokeWidth={1} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                            Cloud. SAP. Innovation. Seamlessly Executed
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                                            From SAP ECC to S/4HANA and On-Premise to RISE, we simplify complex transitions. Our team leverages AWS, Azure, GCP, and modern app development.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Third Section - Meet Our Founder */}
            <section className="bg-white py-12 px-6 md:px-12 lg:px-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center overflow-visible`}>
                        
                        {/* Left Side - Founder Image */}
                        <div className="w-full lg:w-[40%]">
                            <h2 className="text-2xl font-semibold text-red-600 mb-10 flex items-center gap-4">
                                <FramerLogo size={36} weight="thin" />
                                <span className="tracking-tight">Meet Our Founder</span>
                            </h2>
                            <div className="relative mx-4 md:mx-0">
                                {/* Red border frame */}
                                <div className={`absolute -top-4 -left-4 w-full h-full border-2 border-red-600 rounded-lg hidden md:block`}></div>
                                
                                {/* Image container */}
                                <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                                    <img
                                        src={OTHER_PAGE_IMAGES.founder}
                                        alt="Michael Thompson - Founder & CEO"
                                        className="w-full h-[400px] md:h-[480px] object-cover"
                                    />
                                    {/* Name overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#C9184A] text-white p-6">
                                        <h3 className="text-xl font-medium tracking-tight">
                                            - Michael Thompson
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Mobile frame - cleaner */}
                                <div className="absolute inset-0 border border-red-600/20 rounded-lg pointer-events-none md:hidden"></div>
                            </div>
                        </div>

                        {/* Right Side - Founder Details */}
                        <div className="w-full lg:w-[60%] flex flex-col justify-center">
                            <div className="max-w-2xl">
                                <h3 className="text-3xl md:text-4xl font-semibold text-[#111] mb-2 tracking-tight">
                                    Michael Thompson
                                </h3>
                                <p className="text-red-600 text-lg font-medium mb-6">Founder, CEO</p>
                                
                                {/* Underline */}
                                <div className="w-16 h-1 bg-[#C9184A] mb-8"></div>
                                
                                <div className="space-y-6 mb-10">
                                    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-light">
                                        With over twenty years of comprehensive technical and operational expertise, including more than ten years at a premier multinational corporation, Michael brings profound knowledge across various technology ecosystems.
                                    </p>
                                    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-light">
                                        He demonstrates exceptional proficiency in orchestrating large-scale initiatives and delivering sophisticated solutions. An accomplished SAP Technical and Functional Architect with a strategic methodology that prioritizes operational excellence and intelligent automation.
                                    </p>
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { icon: <Users size={20} className="text-red-600" />, title: "Visionary", desc: "Strategic thinking and planning" },
                                        { icon: <Award size={20} className="text-red-600" />, title: "Excellence", desc: "Quality-driven approach" },
                                        { icon: <Lightbulb size={20} className="text-red-600" />, title: "Innovation", desc: "Creative problem solving" },
                                        { icon: <TrendingUp size={20} className="text-red-600" />, title: "Growth", desc: "Scaling business success" }
                                    ].map((skill, si) => (
                                        <div key={si} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                {skill.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{skill.title}</h4>
                                                <p className="text-gray-500 text-xs md:text-sm">{skill.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Founder;
