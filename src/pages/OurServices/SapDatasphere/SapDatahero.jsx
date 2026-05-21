import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Cylinders from '../../../components/common/Cylinders';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SapDatahero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-screen lg:h-[calc(100vh-68px)] flex items-end overflow-hidden font-sans bg-black pt-[68px] lg:pt-0">
            {/* Full screen background image */}
            <img
                src={SERVICES_PAGE_IMAGES.sapDatasphereHero}
                alt="SAP Landscape Support"
                className="absolute inset-0 w-full h-full object-cover object-[70%] lg:object-center z-0"
            />

            {/* Left to right gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent z-10" />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content Container */}
            <div className="relative z-20 w-full pb-4 md:pb-6 lg:pb-8 pt-32">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
                    <div className="max-w-2xl text-left flex flex-col gap-3">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold text-white leading-tight tracking-tight"
                        >
                            Continuous SAP Landscape Support and Enhancement
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                            className="text-base sm:text-lg lg:text-xl font-bold text-white/95 leading-snug"
                        >
                            Keep Your SAP Environment Stable, Secure, and Optimized
                        </motion.h2>

                        <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            >
                                Wysele provides continuous SAP landscape support and enhancement services that help businesses maintain stable, high-performing, and future-ready SAP environments.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                            >
                                Our SAP consultants work closely with organizations to monitor system health, optimize workflows, improve user experience, strengthen security, and support changing operational requirements. From SAP system monitoring and performance optimization to enhancement services and technical support, we help businesses reduce downtime, improve operational visibility, and maintain reliable SAP operations across departments.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
                            >
                                Whether your organization uses SAP S/4HANA, SAP ECC, SAP cloud environments, or integrated enterprise applications, our SAP support specialists ensure your systems remain secure, responsive, and aligned with business goals.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.75, ease: [0.33, 1, 0.68, 1] }}
                            className="pt-2"
                        >
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg w-fit group/btn"
                            >
                                Talk to Our SAP Support Team
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SapDatahero;
