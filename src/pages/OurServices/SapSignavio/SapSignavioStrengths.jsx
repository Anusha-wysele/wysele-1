import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const SapSignavioStrengths = () => {
    const strengths = [
        "End-to-end SAP Signavio Implementations for process excellence",
        "Business Process Modeling, Analysis & Optimization",
        "Process Mining & Real-Time Insights for Data-Driven Decisions",
        "Agile, Scalable Delivery Teams with Industry Expertise",
        "Seamless Integration, Enhanced Visibility & Faster Business Outcomes"
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left side content box */}
                    <div className="w-full lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="border-[0.5px] border-gray-200 rounded-sm p-6 bg-gray-50/30 shadow-sm"
                        >
                            <h2 className="text-xl font-light text-gray-900 mb-5 tracking-tight">
                                Our Core <span className="font-semibold text-[#800000]">Implementation Strengths</span>
                            </h2>
                            
                            <ul className="space-y-3">
                                {strengths.map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9184A] shrink-0" />
                                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right side - Image */}
                    <div className="hidden lg:block lg:w-1/2 relative h-full min-h-[300px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full rounded-sm overflow-hidden"
                        >
                            <img 
                                src={SERVICES_PAGE_IMAGES.sapSignavioStrengths} 
                                alt="Business people meeting outdoors" 
                                className="w-full h-full object-cover rounded-sm absolute inset-0"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SapSignavioStrengths;
