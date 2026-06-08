import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import fdeMediaImg from '../../assets/wysele-FDEmedia.webp';

const FdeAgenticworkflow = () => {
    const [activeStep, setActiveStep] = useState(-1);
    const [lineProgress, setLineProgress] = useState(-1);
    const processRef = useRef(null);
    const isInView = useInView(processRef, { once: false, margin: "-100px" });

    useEffect(() => {
        if (!isInView) {
            setActiveStep(-1);
            setLineProgress(-1);
            return;
        }
        
        const timer = setTimeout(() => {
            setActiveStep(0);
            setLineProgress(-1);
            
            // Loop for 6 steps
            const stepDelays = [1500, 3000, 4500, 6000, 7500];
            stepDelays.forEach((delay, index) => {
                setTimeout(() => {
                    setLineProgress(index);
                    setTimeout(() => setActiveStep(index + 1), 800);
                }, delay);
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [isInView]);

    const processSteps = [
        {
            number: "1",
            title: "AI-Powered Assistants",
            description: "Assistants that help employees access information faster, automate repetitive tasks, and improve decision-making across departments."
        },
        {
            number: "2",
            title: "Agentic AI Workflows",
            description: "Autonomous AI agents capable of executing business processes, coordinating activities, and increasing operational efficiency."
        },
        {
            number: "3",
            title: "Knowledge Management Platforms",
            description: "Centralized AI-powered systems that transform enterprise knowledge into searchable, actionable insights."
        },
        {
            number: "4",
            title: "Process Automation Solutions",
            description: "Intelligent workflow automation designed to eliminate manual effort, improve accuracy, and increase productivity."
        },
        {
            number: "5",
            title: "Customer Experience Platforms",
            description: "AI-driven customer engagement solutions that enhance responsiveness, improve service quality, and create personalized experiences."
        },
        {
            number: "6",
            title: "Data Intelligence & Analytics",
            description: "Advanced analytics platforms that convert business data into meaningful insights for operational and strategic decision-making."
        }
    ];

    return (
        <div className="relative w-full min-h-[500px] overflow-hidden bg-black py-20 lg:py-32">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={fdeMediaImg} 
                    alt="Agentic AI Workflows" 
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/30 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/30 lg:to-transparent" />
            </div>

            {/* Workflow Timeline Section */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10" ref={processRef}>
                <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Left side heading */}
                    <div className="flex-shrink-0 mt-8 lg:mt-16 lg:w-48">
                        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white leading-tight">
                            Our Agentic<br className="hidden lg:block"/>
                            AI Workflow<br className="hidden lg:block"/>
                            Solutions
                        </h2>
                    </div>

                    {/* Right side timeline */}
                    <div className="flex-grow">
                        <div className="relative">
                            {/* Base gray line */}
                            <div className="hidden lg:block absolute top-6 h-0.5 bg-gray-700" style={{ left: '8.3%', right: '8.3%' }}></div>
                            
                            {/* Animated gold progress line */}
                            <motion.div 
                                className="hidden lg:block absolute top-6 h-0.5 bg-[#FFB703]" 
                                style={{ left: '8.3%' }}
                                initial={{ width: '0%' }}
                                animate={{ 
                                    width: lineProgress === -1 ? '0%' : 
                                            lineProgress === 0 ? '16.6%' :
                                            lineProgress === 1 ? '33.3%' :
                                            lineProgress === 2 ? '50%' :
                                            lineProgress === 3 ? '66.6%' :
                                            lineProgress === 4 ? '83.3%' :
                                            lineProgress === 5 ? '83.3%' :
                                            '0%'
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                            
                            {/* Steps */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-3">
                                {processSteps.map((step, index) => {
                                    const isActive = index <= activeStep;
                                    return (
                                    <div key={index} className="relative">
                                        {/* Circle with number */}
                                        <div className="flex justify-center mb-6">
                                            <motion.div 
                                                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold relative z-10"
                                                initial={{ backgroundColor: '#800000' }}
                                                animate={{ 
                                                    backgroundColor: isActive ? '#FFB703' : '#800000',
                                                    color: isActive ? '#000000' : '#ffffff',
                                                    boxShadow: isActive ? '0 4px 12px rgba(255, 183, 3, 0.4)' : '0 0 0 rgba(0,0,0,0)'
                                                }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                            >
                                                {step.number}
                                            </motion.div>
                                        </div>
                                        
                                        {/* Content */}
                                        <motion.div 
                                            className="text-center lg:text-left px-2"
                                            initial={{ y: 0, opacity: 0 }}
                                            animate={{ 
                                                y: isActive ? -5 : 0,
                                                opacity: isActive ? 1 : 0.4
                                            }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        >
                                            <h3 className="text-[15px] sm:text-[16px] font-bold text-white mb-2 leading-snug">
                                                {step.title}
                                            </h3>
                                            <p className="text-[13px] sm:text-[14px] text-gray-100 leading-relaxed font-normal">
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
    );
};

export default FdeAgenticworkflow;
