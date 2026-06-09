import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Award, Building2, Check, RefreshCw, Settings, Target } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const FunctionalConsulting = () => {
    const [activeStep, setActiveStep] = useState(-1);
    const [lineProgress, setLineProgress] = useState(-1);
    const processRef = useRef(null);
    const isInView = useInView(processRef, { once: false, margin: "-100px" });

    const headingRef = useRef(null);
    const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });
    const headingWords = "Functional SAP Consulting".split(" ");

    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) {
            setActiveStep(-1);
            setLineProgress(-1);
            return;
        }
        
        const timer = setTimeout(() => {
            // First activate step 0 (number 1)
            setActiveStep(0);
            setLineProgress(-1);
            
            // Step 1 to 2
            setTimeout(() => {
                setLineProgress(0);
                setTimeout(() => setActiveStep(1), 800);
            }, 1500);
            
            // Step 2 to 3
            setTimeout(() => {
                setLineProgress(1);
                setTimeout(() => setActiveStep(2), 800);
            }, 3000);
            
            // Step 3 to 4
            setTimeout(() => {
                setLineProgress(2);
                setTimeout(() => setActiveStep(3), 800);
            }, 4500);
            
            // Step 4 to 5
            setTimeout(() => {
                setLineProgress(3);
                setTimeout(() => setActiveStep(4), 800);
            }, 6000);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isInView]);
    const services = [
        {
            title: "SAP S/4HANA Implementation",
            description: "We help businesses implement SAP S/4HANA with structured planning, configuration, testing, and deployment support. Our implementation approach focuses on minimizing disruption while improving operational efficiency.",
            icon: <Settings size={40} strokeWidth={1} />
        },
        {
            title: "Business Process Optimization",
            description: "Our consultants analyze existing workflows across finance, procurement, inventory, sales, supply chain, and operations to identify process improvements and automation opportunities.",
            icon: <Target size={40} strokeWidth={1} />
        },
        {
            title: "SAP Best Practices Alignment",
            description: "We configure SAP environments based on industry best practices to improve productivity, reduce process inconsistencies, and support better decision-making.",
            icon: <Award size={40} strokeWidth={1} />
        },
        {
            title: "Change Management and User Adoption",
            description: "Successful SAP implementation depends on user adoption. We provide onboarding support, training programs, documentation, and transition planning to help teams adapt faster.",
            icon: <RefreshCw size={40} strokeWidth={1} />
        },
        {
            title: "Industry-Specific SAP Solutions",
            description: "Different industries require different SAP strategies. We tailor consulting services based on business models, compliance requirements, operational workflows, and reporting needs.",
            icon: <Building2 size={40} strokeWidth={1} />
        }
    ];

    const processSteps = [
        {
            number: "1",
            title: "Business Assessment",
            description: "We evaluate your existing systems, operational challenges, and business goals to identify improvement opportunities."
        },
        {
            number: "2",
            title: "Solution Planning",
            description: "We develop a practical SAP strategy tailored to your business objectives, operational workflows, growth plans, and implementation timelines."
        },
        {
            number: "3",
            title: "Implementation and Integration",
            description: "We configure, deploy, and integrate SAP solutions while ensuring system stability and workflow continuity."
        },
        {
            number: "4",
            title: "Training and Change Support",
            description: "Teams receive onboarding support, documentation, and training sessions to improve user adoption and operational readiness."
        },
        {
            number: "5",
            title: "Ongoing Optimization",
            description: "After implementation, we continue monitoring system performance, resolving issues, and identifying optimization opportunities."
        }
    ];

    return (
        <div className="bg-white">
            <div className="pt-2 pb-1">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-normal text-center mb-8 text-gray-900 flex flex-wrap justify-center gap-x-2" ref={headingRef}>
                        {headingWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4" ref={gridRef}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                            animate={isGridInView ? { opacity: 1, clipPath: "inset(0 0 0 0)" } : {}}
                            transition={{ duration: 2.5, delay: index * 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-black rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-[#C9184A]/10 transition-colors duration-300">
                                <div className="text-[#C9184A]">
                                    {React.cloneElement(service.icon, { size: 24 })}
                                </div>
                            </div>
                            <h3 className="text-sm font-bold mb-2 text-gray-900">
                                {service.title}
                            </h3>
                            <p className="text-xs leading-relaxed text-gray-700 font-normal">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* Challenges Section - Full Width */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-[#FFF5F5] py-12 md:py-16 mt-2 mb-6 border-y border-[#FFE3E3] w-full"
            >
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Left Side: Title & Description */}
                        <div className="lg:col-span-5 space-y-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                The Challenges Businesses <br className="hidden sm:block" />
                                Face with SAP Adoption
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                                Many organizations invest in SAP expecting better efficiency and visibility. But implementation delays, disconnected systems, poor user adoption, and outdated processes often reduce the expected value.
                            </p>
                        </div>
                        
                        {/* Right Side: Bullets Grid (2 Columns) */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 pt-1">
                            {/* Column 1 */}
                            <div className="space-y-4">
                                {[
                                    "Complex implementation planning",
                                    "Data migration risks during upgrades",
                                    "Low process visibility across departments",
                                    "Manual workflows slowing operations"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#C9184A] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Column 2 */}
                            <div className="space-y-4">
                                {[
                                    "Limited internal SAP expertise",
                                    "Integration issues with third-party platforms",
                                    "Difficulty scaling systems as operations grow"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#C9184A] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="pt-2 pb-6">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                    {/* <Link to="/services/sap-consulting" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Consulting</Link></Link> Process Section */}
                    <div className="mt-10" ref={processRef}>
                    <div className="flex flex-col lg:flex-row items-start gap-8">
                        {/* Left side heading */}
                        <div className="flex-shrink-0 mt-16 lg:w-48">
                            <h2 className="text-2xl font-normal text-gray-900 leading-tight">
                                How Our<br />
                                <Link to="/services/sap-consulting" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Consulting</Link></Link><br />
                                Process Works
                            </h2>
                        </div>

                        {/* Right side timeline */}
                        <div className="flex-grow">
                            <div className="relative">
                                {/* Base gray line */}
                                <div className="hidden lg:block absolute top-6 h-0.5 bg-gray-300" style={{ left: '10%', right: '10%' }}></div>
                                
                                {/* Animated green progress line */}
                                <motion.div 
                                    className="hidden lg:block absolute top-6 h-0.5 bg-[#4BDE7B]" 
                                    style={{ left: '10%' }}
                                    initial={{ width: '0%' }}
                                    animate={{ 
                                        width: lineProgress === -1 ? '0%' : 
                                               lineProgress === 0 ? '20%' :
                                               lineProgress === 1 ? '40%' :
                                               lineProgress === 2 ? '60%' :
                                               lineProgress === 3 ? '80%' :
                                               lineProgress === 4 ? '80%' :
                                               '0%'
                                    }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                                
                                {/* Steps */}
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
                                    {processSteps.map((step, index) => {
                                        const isActive = index <= activeStep;
                                        return (
                                        <div key={index} className="relative">
                                            {/* Circle with number */}
                                            <div className="flex justify-center mb-6">
                                                <motion.div 
                                                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold relative z-10"
                                                    initial={{ backgroundColor: '#8B3A3A' }}
                                                    animate={{ 
                                                        backgroundColor: isActive ? '#4BDE7B' : '#8B3A3A',
                                                        boxShadow: isActive ? '0 4px 12px rgba(75, 222, 123, 0.4)' : '0 0 0 rgba(0,0,0,0)'
                                                    }}
                                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                                >
                                                    {step.number}
                                                </motion.div>
                                            </div>
                                            
                                            {/* Content */}
                                            <motion.div 
                                                className="text-left p-3"
                                                initial={{ y: 0, scale: 1 }}
                                                animate={{ 
                                                    y: isActive ? -8 : 0,
                                                    scale: isActive ? 1.02 : 1
                                                }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            >
                                                <h3 className="text-sm font-bold text-gray-900 mb-2">
                                                    {step.title}
                                                </h3>
                                                <p className="text-xs text-gray-800 leading-snug font-normal">
                                                    {step.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default FunctionalConsulting;
