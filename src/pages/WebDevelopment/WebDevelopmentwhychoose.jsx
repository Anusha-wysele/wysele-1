import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../components/common/data';
import { RocketLaunch, ChartLineUp, ShieldCheck, Headset, ArrowUpRight } from '@phosphor-icons/react';

const WebDevelopmentwhychoose = () => {
    return (
        <>
            <section className="relative z-10 w-full bg-white pt-8 md:pt-12 pb-8 md:pb-12">
            
            {/* Text content (Top) */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-start mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight tracking-tight mb-3">
                        Why Choose Us
                    </h2>
                    <div className="h-[1px] w-16 bg-[#4BDE7B] mb-4" />
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
                        We deliver reliable, high-quality solutions tailored to your business needs. Our focus on performance, security, and scalability ensures long-term success and measurable results.
                    </p>
                </motion.div>
            </div>

            {/* 4 boxes grid (Bottom) */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#800000] border border-white/10 hover:border-[#4BDE7B]/50 transition-all duration-300 p-6 shadow-xl"
                    >
                        <RocketLaunch weight="light" className="w-8 h-8 text-white mb-5" />
                        <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                            Fast Delivery
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                            We follow efficient workflows and agile methodologies to deliver projects on time without compromising on quality.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-[#800000] border border-white/10 hover:border-[#4BDE7B]/50 transition-all duration-300 p-6 shadow-xl"
                    >
                        <ChartLineUp weight="light" className="w-8 h-8 text-white mb-5" />
                        <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                            Scalable Architecture
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                            Our solutions are built to grow with your business, ensuring flexibility and seamless performance as your needs evolve.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#800000] border border-white/10 hover:border-[#4BDE7B]/50 transition-all duration-300 p-6 shadow-xl"
                    >
                        <ShieldCheck weight="light" className="w-8 h-8 text-white mb-5" />
                        <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                            Secure Applications
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                            We implement industry-standard security practices to protect your data and ensure safe, reliable applications.
                        </p>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-[#800000] border border-white/10 hover:border-[#4BDE7B]/50 transition-all duration-300 p-6 shadow-xl"
                    >
                        <Headset weight="light" className="w-8 h-8 text-white mb-5" />
                        <h3 className="text-white font-medium text-sm md:text-base mb-3 leading-snug">
                            Dedicated Support
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                            Our team provides continuous assistance and proactive support to ensure smooth operations and quick issue resolution.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Call To Action Section */}
        <section className="w-full bg-white pt-4 md:pt-6 pb-8 md:pb-12 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-2 tracking-wide">
                Ready to Elevate Your Digital Presence?
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl font-light">
                Partner with our experts today to launch a high-performing website tailored to your business goals.
            </p>
            
            <Link to="/contact">
                <button className="group relative inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-[#800000] uppercase pb-2 border-b border-[#800000]/30 hover:border-[#800000] transition-colors duration-300 px-6">
                    START YOUR PROJECT
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
            </Link>
        </section>
        </>
    );
};

export default WebDevelopmentwhychoose;
