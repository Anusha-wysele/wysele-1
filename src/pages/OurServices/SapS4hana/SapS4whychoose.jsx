import React from 'react';
import { motion } from 'framer-motion';

export default function SapS4whychoose() {
    const reasons = [
        {
            title: "Expert Guidance",
            description: "Our certified consultants bring in-depth knowledge and experience to facilitate a smooth transition with minimal downtime.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
            )
        },
        {
            title: "Proven Methodology",
            description: "Utilizing industry best practices, our structured approach ensures an efficient and seamless conversion process.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "End-to-End Services",
            description: "From the initial assessment through to ongoing support, we provide comprehensive services tailored to your unique SAP S/4HANA journey.",
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    const sidebarItems = [
        {
            title: "CERTIFIED EXPERTS",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
            )
        },
        {
            title: "PROVEN SUCCESS",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "SEAMLESS TRANSITION",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: "24/7 SUPPORT",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-10 lg:py-12 bg-white">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e293b] uppercase tracking-wide">
                        Why Choose Us for Your SAP S/4HANA Conversion?
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-stretch">
                    
                    {/* Left Column: Reasons List */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.3
                                }
                            }
                        }}
                        className="flex-1 flex flex-col gap-8 lg:pr-8 justify-center"
                    >
                        {reasons.map((reason, index) => (
                            <motion.div 
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                                className="flex flex-col sm:flex-row items-start gap-4"
                            >
                                <div className="bg-[#800000] w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg border-[3px] border-white">
                                    {reason.icon}
                                </div>
                                <div className="mt-1 sm:mt-0">
                                    <h3 className="text-xl font-bold text-[#1e293b] uppercase mb-1.5 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#800000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {reason.title}
                                    </h3>
                                    <ul className="list-disc pl-5 text-[#1e293b] text-sm md:text-base leading-relaxed font-medium ml-2 marker:text-[#800000]">
                                        <li>{reason.description}</li>
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column: Highlight Panel */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-[300px] shrink-0"
                    >
                        <div className="bg-[#1e293b] rounded-[2rem] p-6 h-full flex flex-col shadow-2xl relative overflow-hidden">
                            {/* Decorative background shape */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="flex flex-col items-center text-center mb-6 relative z-10">
                                <div className="mb-4">
                                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-1">YOUR SUCCESS.</h3>
                                <h4 className="text-xl font-bold text-white uppercase tracking-tight">OUR PRIORITY.</h4>
                            </div>

                            <div className="w-full h-px border-t border-dashed border-white/30 mb-6 relative z-10"></div>

                            <div className="flex flex-col gap-4 relative z-10">
                                {sidebarItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="bg-white/10 p-1.5 rounded-lg text-white shrink-0">
                                            {item.icon}
                                        </div>
                                        <span className="text-white font-semibold tracking-wide text-xs">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
