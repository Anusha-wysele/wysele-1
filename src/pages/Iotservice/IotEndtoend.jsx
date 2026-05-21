import React from 'react';
import { motion } from 'framer-motion';

export default function IotEndtoend() {
    return (
        <section className="pt-0 pb-16 md:pb-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

                    {/* Left Column */}
                    <motion.div
                        id="end-to-end"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:pl-8 xl:pl-12 text-center lg:text-left scroll-mt-24"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
                            End-to-End IoT Development Services
                        </h2>
                        <div className="space-y-4 text-gray-600 text-[15px] sm:text-base leading-relaxed">
                            <p>
                                IoT environments require reliable communication between hardware devices, software platforms, cloud systems, and operational applications. Wysele delivers IoT development services that simplify device integration and improve operational coordination across connected systems.
                            </p>
                            <p>
                                Our services include embedded hardware integration, cloud connectivity, IoT application development, data monitoring, automation systems, and analytics platforms. We help organizations build connected ecosystems that improve efficiency, reduce delays, and support real-time operational visibility.
                            </p>
                            <p>
                                Whether businesses need industrial monitoring systems, connected healthcare devices, smart automation, or fleet management platforms, our IoT solutions are designed to support stable and scalable digital operations.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        id="architecture"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col lg:mt-16 lg:pr-8 xl:pr-12 text-center lg:text-left scroll-mt-24"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
                            Complete IoT Architecture for Modern Enterprises
                        </h2>
                        <div className="space-y-4 text-gray-600 text-[15px] sm:text-base leading-relaxed">
                            <p>
                                A successful IoT ecosystem depends on secure communication between devices, connectivity layers, cloud platforms, and operational applications. Wysele develops structured IoT architectures that support real-time monitoring, centralized management, and secure data exchange across enterprise operations.
                            </p>
                            <p>
                                Our IoT environments are designed to handle device communication, operational analytics, automation workflows, and cloud-based monitoring without disrupting existing infrastructure.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
