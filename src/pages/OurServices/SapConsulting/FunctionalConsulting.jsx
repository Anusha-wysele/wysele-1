import React, { useState, useEffect, useRef } from 'react';
import { Settings, Target, Award, RefreshCw, Building2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

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
            description: "We guide you through the transition to SAP's next-generation ERP suite, ensuring a thorough planning process that minimizes operational disruption. Our approach focuses on risk mitigation, data migration strategies, and user training, enabling a smooth and successful migration to the new system.",
            icon: <Settings size={40} strokeWidth={1} />
        },
        {
            title: "Business Process Optimization",
            description: "We analyze and refine your core business processes—such as finance, supply chain, procurement, and human resources—through a data-driven approach. This helps identify bottlenecks, inefficiencies, and areas for improvement, ultimately driving operational efficiency and enhancing your overall productivity.",
            icon: <Target size={40} strokeWidth={1} />
        },
        {
            title: "SAP Best Practices",
            description: "We draw upon industry best practices and standardized configurations to accelerate your implementation process. By aligning your operations with proven methodologies, we help you reduce costs, improve system performance, and maximize your return on investment (ROI) in SAP technologies.",
            icon: <Award size={40} strokeWidth={1} />
        },
        {
            title: "Change Management",
            description: "Navigating organizational change is crucial for success. We offer tailored change management strategies, including stakeholder engagement, communication plans, and training programs, to equip your team with the necessary skills and knowledge. This ensures that your organization successfully adapts to the new systems and processes.",
            icon: <RefreshCw size={40} strokeWidth={1} />
        },
        {
            title: "Industry-Specific Solutions",
            description: "Our consultants possess in-depth experience in key industries, such as retail, manufacturing, finance, and healthcare. By understanding the unique challenges and needs of your sector, we deliver targeted solutions that align with your business environment and support your strategic goals.",
            icon: <Building2 size={40} strokeWidth={1} />
        }
    ];

    const processSteps = [
        {
            number: "1",
            title: "Consultation & Assessment",
            description: "We initiate the process by thoroughly understanding your business objectives and challenges. This includes performing a detailed assessment to unearth areas for improvement and efficiency."
        },
        {
            number: "2",
            title: "Solution Design & Planning",
            description: "In response to your specific needs, we craft a customized SAP solution designed to meet your business objectives. Our consultants produce a clear and actionable roadmap for the implementation, integration, and optimization phases."
        },
        {
            number: "3",
            title: "Implementation & Integration",
            description: "Our highly skilled team meticulously executes the SAP implementation, ensuring all systems are seamlessly integrated and configured according to your particular requirements."
        },
        {
            number: "4",
            title: "Training & Change Management",
            description: "We provide extensive training programs and implement change management strategies to empower your team with the knowledge and tools they need to effectively engage with your new SAP systems."
        },
        {
            number: "5",
            title: "Ongoing Support & Optimization",
            description: "Our support doesn't end once the implementation is complete. We offer continuous assistance, regular performance monitoring, and optimization services to ensure your SAP systems are not only maintained but continually improved."
        }
    ];

    return (
        <div className="bg-white">
            <div className="pt-2 pb-6">
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
                            <p className="text-xs leading-relaxed text-gray-500">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* SAP Consulting Process Section */}
                <div className="mt-20" ref={processRef}>
                    <div className="flex items-start gap-8">
                        {/* Left side heading */}
                        <div className="flex-shrink-0 mt-16">
                            <h2 className="text-2xl font-light text-gray-900 leading-tight">
                                SAP<br />
                                Consulting<br />
                                Process
                            </h2>
                        </div>

                        {/* Right side timeline */}
                        <div className="flex-grow">
                            <div className="relative">
                                {/* Base gray line */}
                                <div className="absolute top-6 h-0.5 bg-gray-300" style={{ left: '10%', right: '10%' }}></div>
                                
                                {/* Animated green progress line */}
                                <motion.div 
                                    className="absolute top-6 h-0.5 bg-[#4BDE7B]" 
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
                                <div className="grid grid-cols-5 gap-4">
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
                                                <p className="text-xs text-gray-600 leading-snug">
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
