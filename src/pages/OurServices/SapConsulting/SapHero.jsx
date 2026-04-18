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
        <section className="relative min-h-[560px] lg:h-[600px] w-full overflow-hidden bg-[#D5E7B5] flex flex-col lg:flex-row">
            {/* SVG ClipPath Definitions - Precision Path for Rounded-Tip Arrow */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <clipPath id="exactArrowMask" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 1,0
                            L 0.65,0
                            L 0.37,0.38
                            Q 0.27,0.5 0.37,0.62
                            L 0.65,1
                            L 1,1
                            Z
                        " />
                    </clipPath>
                    <clipPath id="exactArrowBgMask" clipPathUnits="objectBoundingBox">
                        <path d="
                            M 1,0
                            L 0.61,0
                            L 0.33,0.38
                            Q 0.23,0.5 0.33,0.62
                            L 0.61,1
                            L 1,1
                            Z
                        " />
                    </clipPath>
                </defs>
            </svg>

            {/* Content Area (Left Side) */}
            <div className="relative w-full lg:w-[60%] h-full flex flex-col justify-end pb-8 px-4 lg:pl-4 xl:pl-6 lg:pr-4 py-16 lg:pb-10 z-20">
                <div className="max-w-xl w-full">
                    <h1 className="text-3xl lg:text-4xl font-semibold mb-8 leading-tight">
                        <span className="text-gray-900 inline-block overflow-hidden" style={{ height: '1.2em' }}>
                            {'Transform'.split('').map((char, idx) => (
                                <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                                    <motion.span
                                        className="inline-block"
                                        initial={{ y: '-100%', opacity: 0 }}
                                        animate={{ y: '0%', opacity: 1 }}
                                        transition={{ duration: 0.4, delay: idx * 0.025, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        {char}
                                    </motion.span>
                                </span>
                            ))}
                        </span>
                        <br />
                        <span className="text-gray-900 inline-block overflow-hidden" style={{ height: '1.2em' }}>
                            {'Your Business'.split('').map((char, idx) => (
                                <span key={idx} className="inline-block relative" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                                    <motion.span
                                        className="inline-block"
                                        initial={{ y: '-100%', opacity: 0 }}
                                        animate={{ y: '0%', opacity: 1 }}
                                        transition={{ duration: 0.4, delay: (9 + idx) * 0.025, ease: [0.33, 1, 0.68, 1] }}
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
                                        transition={{ duration: 0.4, delay: (21 + idx) * 0.025, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        {char}
                                    </motion.span>
                                </span>
                            ))}
                        </span>
                    </h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="bg-white px-4 py-2 rounded-lg border border-gray-100 w-full relative z-10 mt-3"
                    >
                        <h3 className="text-[10px] font-bold text-[#C9184A] mb-0.5">WE GUIDE YOU!</h3>
                        <h4 className="text-xs font-bold text-gray-900 mb-0.5">Elevate Your Business with SAP Expertise</h4>
                        <p className="text-xs text-gray-600 leading-snug">
                            Our consulting team helps you unlock the full potential of SAP solutions by identifying opportunities, streamlining processes, and driving measurable outcomes. With the right strategies and insights, we empower your business to move beyond adaptation and achieve lasting growth and performance.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Visual Area (Right Side - Exact Geometry) */}
            <div className="absolute right-0 top-0 h-full w-full lg:w-[min(1000px,70vw)] z-10 hidden lg:block opacity-90">
                <div className="w-full h-full absolute inset-0">
                    {/* Layer 1 — OUTER GEOMETRIC BORDER */}
                    <div
                        className="absolute inset-0 z-0 bg-[#800000]"
                        style={{ clipPath: "url(#exactArrowBgMask)" }}
                    />
                    
                    {/* Layer 2 — IMAGE + LABELS (Inner) */}
                    <div
                        className="absolute inset-0 overflow-hidden z-10"
                        style={{ clipPath: "url(#exactArrowMask)" }}
                    >
                        <div className="relative w-full h-full">
                            <img
                                src={SERVICES_PAGE_IMAGES.sapHero}
                                alt="SAP Consulting Team"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D5E7B5]/90 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Image Fallback Container */}
            <div className="w-full h-[300px] relative z-10 lg:hidden block">
                 <img
                      src={SERVICES_PAGE_IMAGES.sapHero}
                      alt="SAP Consulting Team"
                      className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#D5E7B5] to-transparent" />
            </div>
        </section>
        <SapOverview />
        <FunctionalConsulting />
        <TechnicalConsulting />
        <WhyChooseWysele />
        <Footer />
        </>
    );
};

export default SapConsulting;
