import React from 'react';
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';

const DataSupport = () => {
    return (
        <section className="pt-16 pb-4 bg-white">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left side — text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full lg:w-1/2"
                    >
                        {/* Heading with Cylinderr accent */}
                        <div className="flex items-center gap-3 mb-6">
                            <Cylinderr className="w-4 h-10 rounded-sm" />
                            <h2 className="text-2xl md:text-3xl font-normal text-gray-900 leading-tight">
                                Comprehensive SAP Datasphere<br />
                                <span className="font-semibold">Support &amp; Optimization</span>
                            </h2>
                        </div>

                        {/* Thin divider */}
                        <div className="w-12 h-[1.5px] bg-gray-300 mb-6" />

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed font-light">
                            Our commitment to your success extends beyond implementation. We offer ongoing support services to ensure your SAP Datasphere environment remains efficient and effective. This includes continuous monitoring, troubleshooting, and optimization, ensuring that your data management platform evolves with your business needs while remaining scalable and aligned with your organizational objectives.
                        </p>
                    </motion.div>

                    {/* Right side — decorative visual block */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                        className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
                    >
                        {[
                            { label: "Continuous Monitoring", desc: "Proactive health checks to catch issues before they affect operations." },
                            { label: "Performance Optimization", desc: "Tuning your platform to deliver maximum speed and efficiency." },
                            { label: "Issue Resolution", desc: "Rapid troubleshooting and expert fixes to minimize downtime." },
                            { label: "Scalable Growth", desc: "Adapting your data environment as your business evolves." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                className="p-5 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md hover:border-gray-200 transition-all duration-300"
                            >
                                <h3 className="text-base font-semibold text-gray-900 mb-2 tracking-tight">{item.label}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DataSupport;
