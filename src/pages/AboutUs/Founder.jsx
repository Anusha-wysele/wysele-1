import React, { useState, useEffect } from 'react';
import { Target, Shield, Cloud, Users, Award, Lightbulb, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrainRegional, ChalkboardTeacher, FramerLogo, AirTrafficControl, SlackLogo } from '@phosphor-icons/react';
import { OTHER_PAGE_IMAGES } from '../../components/common/data';

const Founder = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate line width based on scroll position
    const lineWidth = Math.min(40, (scrollY / 10));

    // Custom SVG Icons - Thinned
    const AdaptabilityIcon = () => (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <circle cx="12" cy="12" r="0.5" fill="currentColor"></circle>
            <line x1="12" y1="2" x2="12" y2="6"></line>
        </svg>
    );

    const StrategyIcon = () => (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 3v6m0 6v6m6-9h-6m-6 0h6"></path>
            <circle cx="12" cy="12" r="2" fill="none"></circle>
        </svg>
    );

    const ClientServiceIcon = () => (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
    );

    const DataStudioIcon = () => (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            <line x1="18" y1="18" x2="21" y2="21"></line>
        </svg>
    );

    return (
        <>
            {/* First Section - Four Cards */}
            <section className="bg-white">
                <div className="w-full">
                    <div className="border-t border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        
                        {/* Adaptability */}
                        <motion.div 
                            className="relative p-4 border-r border-gray-200 last:border-r-0 lg:border-r lg:last:border-r-0 cursor-pointer group"
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
                                <div className="mb-2 text-gray-700 group-hover:text-white transition-colors duration-300">
                                    <TrainRegional size={32} weight="thin" />
                                </div>
                                <h3 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                                    Adaptability
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                    Flexible solutions that evolve with your business needs, ensuring seamless transitions across changing technology landscapes
                                </p>
                            </div>
                        </motion.div>

                        {/* New Strategy */}
                        <motion.div 
                            className="relative p-4 border-r border-gray-200 last:border-r-0 lg:border-r lg:last:border-r-0 cursor-pointer group"
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
                                <div className="mb-2 text-gray-700 group-hover:text-white transition-colors duration-300">
                                    <StrategyIcon />
                                </div>
                                <h3 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                                    Strategic Planning
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                    Purpose-driven roadmaps that align technology initiatives with business objectives for sustainable growth
                                </p>
                            </div>
                        </motion.div>

                        {/* Client Service */}
                        <motion.div 
                            className="relative p-4 border-r border-gray-200 last:border-r-0 lg:border-r lg:last:border-r-0 cursor-pointer group"
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
                                <div className="mb-2 text-gray-700 group-hover:text-white transition-colors duration-300">
                                    <ClientServiceIcon />
                                </div>
                                <h3 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                                    Client Excellence
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                    Building lasting partnerships through transparent communication, ethical practices, and consistent delivery
                                </p>
                            </div>
                        </motion.div>

                        {/* Data Studio */}
                        <motion.div 
                            className="relative p-4 cursor-pointer group"
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
                                <div className="mb-2 text-gray-700 group-hover:text-white transition-colors duration-300">
                                    <ChalkboardTeacher size={32} weight="thin" />
                                </div>
                                <h3 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-white transition-colors duration-300">
                                    Data-Driven Insights
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                                    Transforming complex data into actionable intelligence that drives informed decision-making and innovation
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Second Section - What We Deliver */}
            <section className="bg-white py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Left Side - Heading and Content */}
                        <div className="lg:w-1/2 lg:pl-16">
                            <h2 className="text-xl font-medium text-gray-700 mb-6">
                                What We Do
                            </h2>
                            
                            <div className="space-y-5">
                                {/* Purpose-Driven Approach */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <AirTrafficControl size={18} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-1 text-gray-900">
                                            Purpose-Driven Approach, Precision in Delivery
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-normal">
                                            At Wysele, we focus on solving challenges before speaking—bringing clarity, speed, and effective execution. We prioritize outcomes over noise and action over hierarchy, ensuring every project delivers meaningful and measurable impact.
                                        </p>
                                    </div>
                                </div>

                                {/* Beyond IT */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <SlackLogo size={18} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-1 text-gray-900">
                                            Beyond IT — Building Trust That Endures
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-normal">
                                            We don't just pursue clients—we cultivate long-term partnerships. Through ethical practices and transparent communication, we create trust that goes beyond agreements and grows through consistent results.
                                        </p>
                                    </div>
                                </div>

                                {/* Cloud. SAP. Innovation */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <Cloud size={18} strokeWidth={1.5} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold mb-1 text-gray-900">
                                            Cloud. SAP. Innovation. Seamlessly Executed
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-normal">
                                            From SAP ECC to S/4HANA and On-Premise to RISE, we simplify complex transitions. Our team leverages AWS, Azure, GCP, and modern application development to transform your ideas into scalable, real-world solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Company Description */}
                        <div className="lg:w-1/2 lg:pl-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
                                Transforming Complexity into Confident Solutions
                            </h2>
                            {/* Animated line */}
                            <motion.div 
                                className="h-0.5 bg-gray-900 mb-6"
                                initial={{ width: 0 }}
                                animate={{ width: `${lineWidth}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                            <p className="text-gray-600 text-[15px] leading-relaxed">
                                Since its inception in 2021, Wysele has focused on bringing clarity and purpose to every challenge—prioritizing meaningful execution over noise and real impact over empty promises. Our approach is grounded in transparency, strong values, and a commitment to building lasting partnerships. From SAP environments—whether On-Premise, Cloud, or RISE—to enterprise-grade application and product development across AWS, Azure, and GCP, we deliver with precision and confidence. Whether it's ECC to S/4HANA transformations, system migrations, or modern implementations, our focus remains the same: creating measurable outcomes, not just delivering solutions. At Wysele, success is defined by the long-term value we create and the trust we build with every client we serve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Third Section - Meet Our Founder */}
            <section className="bg-white py-4 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 lg:pl-32">
                        
                        {/* Left Side - Founder Image */}
                        <div className="lg:w-2/5">
                            <h2 className="text-2xl font-semibold text-red-600 mb-8 flex items-center gap-3">
                                <FramerLogo size={32} weight="thin" />
                                Meet Our Founder
                            </h2>
                            <div className="relative">
                                {/* Red border frame */}
                                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-red-600 rounded-lg"></div>
                                
                                {/* Image container */}
                                <div className="relative bg-white rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={OTHER_PAGE_IMAGES.founder}
                                        alt="Michael Thompson - Founder & CEO"
                                        className="w-full h-[380px] object-cover"
                                    />
                                    {/* Name overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-red-800 text-white p-4">
                                        <h3 className="text-lg font-semibold">
                                            - Michael Thompson
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Founder Details */}
                        <div className="lg:w-3/5 lg:pl-16 flex flex-col justify-center" style={{ minHeight: '380px' }}>
                            <div className="max-w-lg lg:ml-8">
                                <h3 className="text-3xl font-semibold text-red-600 mb-2">
                                    Michael Thompson
                                </h3>
                                <p className="text-gray-600 text-lg mb-4">Founder, CEO</p>
                                
                                {/* Yellow underline */}
                                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                                
                                <div className="space-y-4 mb-6">
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        With over twenty years of comprehensive technical and operational expertise, including more than ten years at a premier multinational corporation, Michael brings profound knowledge across various technology ecosystems. As a former executive and startup co-founder with senior-level leadership experience, he possesses extensive capabilities in product innovation, strategic methodologies, advanced tools, and comprehensive solution design.
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        He demonstrates exceptional proficiency in orchestrating large-scale initiatives and delivering sophisticated solutions with a solid foundation in technology leadership and strategic vision. An accomplished SAP Technical and Functional Architect with expertise in multi-technology environments, utilizing a strategic methodology that prioritizes risk mitigation, operational excellence, and intelligent automation.
                                    </p>
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Users size={16} className="text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Visionary</h4>
                                            <p className="text-gray-600 text-xs">Strategic thinking and planning</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Award size={16} className="text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Excellence</h4>
                                            <p className="text-gray-600 text-xs">Quality-driven approach</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Lightbulb size={16} className="text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
                                            <p className="text-gray-600 text-xs">Creative problem solving</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <TrendingUp size={16} className="text-red-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Growth</h4>
                                            <p className="text-gray-600 text-xs">Scaling business success</p>
                                        </div>
                                    </div>
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
