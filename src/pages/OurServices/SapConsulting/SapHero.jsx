import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import SapOverview from './SapOverview';
import FunctionalConsulting from './FunctionalConsulting';
import TechnicalConsulting from './TechnicalConsulting';
import WhyChooseWysele from './WhyChooseWysele';
import Footer from '../../../components/layout/section/Footer';

const SapConsulting = () => {
    return (
        <>
        <div className="min-h-screen bg-white">
            <div className="relative w-full h-screen overflow-hidden">
                {/* Full Background Image */}
                <img 
                    src={SERVICES_PAGE_IMAGES.sapConsulting} 
                    alt="SAP Consulting Services" 
                    className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end pb-8 px-16 z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-semibold mb-8 leading-tight">
                            <span className="text-white inline-block overflow-hidden" style={{ height: '1.2em' }}>
                                {'Transform'.split('').map((char, idx) => (
                                    <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                                        <motion.span
                                            className="inline-block"
                                            initial={{ y: '-100%', opacity: 0 }}
                                            animate={{ y: '0%', opacity: 1 }}
                                            transition={{ 
                                                duration: 0.4,
                                                delay: idx * 0.025,
                                                ease: [0.33, 1, 0.68, 1]
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            <br />
                            <span className="text-white inline-block overflow-hidden" style={{ height: '1.2em' }}>
                                {'Your Business'.split('').map((char, idx) => (
                                    <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                                        <motion.span
                                            className="inline-block"
                                            initial={{ y: '-100%', opacity: 0 }}
                                            animate={{ y: '0%', opacity: 1 }}
                                            transition={{ 
                                                duration: 0.4,
                                                delay: (9 + idx) * 0.025,
                                                ease: [0.33, 1, 0.68, 1]
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            <br />
                            <span className="text-[#C9184A] inline-block overflow-hidden" style={{ height: '1.2em' }}>
                                {'with Expert Guidance'.split('').map((char, idx) => (
                                    <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                                        <motion.span
                                            className="inline-block"
                                            initial={{ y: '-100%', opacity: 0 }}
                                            animate={{ y: '0%', opacity: 1 }}
                                            transition={{ 
                                                duration: 0.4,
                                                delay: (21 + idx) * 0.025,
                                                ease: [0.33, 1, 0.68, 1]
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                        </h1>
                        <div className="bg-white p-2.5 rounded-lg shadow-lg max-w-2xl">
                            <h3 className="text-xs font-bold text-[#C9184A] mb-1">WE GUIDE YOU!</h3>
                            <h4 className="text-xs font-bold text-gray-900 mb-1">Elevate Your Business with SAP Expertise</h4>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                Our consulting team helps you unlock the full potential of SAP solutions by identifying opportunities, streamlining processes, and driving measurable outcomes. With the right strategies and insights, we empower your business to move beyond adaptation and achieve lasting growth and performance.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div 
                    className="absolute bottom-0 left-0 w-full h-32 bg-gray-700"
                    style={{
                        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
                    }}
                ></div>
            </div>
        </div>
        <SapOverview />
        <FunctionalConsulting />
        <TechnicalConsulting />
        <WhyChooseWysele />
        <Footer />
        </>
    );
};

export default SapConsulting;
