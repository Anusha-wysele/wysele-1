import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ShieldCheck, UserCircle } from 'lucide-react';

const WHY_CHOOSE_POINTS = [
    {
        title: "Proven Expertise",
        desc: "Our team of certified SAP professionals has extensive experience managing complex migrations across various industries, ensuring your transition is in safe hands."
    },
    {
        title: "End-to-End Solutions",
        desc: "We cover your entire migration journey—from initial assessment and meticulous planning to execution and post-migration support—ensuring nothing is overlooked."
    },
    {
        title: "Minimal Downtime",
        desc: "Our advanced tools and best practices are tailored to provide seamless migration with little to no operational downtime for your business."
    },
    {
        title: "Cost-Effective Approach",
        desc: "We focus on optimizing costs without compromising performance, delivering strategies that enhance system reliability and operational efficiency."
    },
    {
        title: "Security & Compliance",
        desc: "Throughout the migration process, we prioritize data security, regulatory compliance, and effective risk management to protect your assets."
    }
];

export default function SapMigrationWhy() {
    return (
        <section className="py-8 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left Side: Transform Box / Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 order-2 lg:order-1"
                    >
                        <div className="relative rounded-[1.5rem] overflow-hidden p-6 md:pt-10 md:px-8 md:pb-5 shadow-2xl group min-h-[400px] flex flex-col">
                            {/* Decorative background image with full visibility */}
                            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
                                <img
                                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                                    alt="Transformation"
                                    className="w-full h-full object-cover"
                                />
                                {/* Black Color Overlay */}
                                <div className="absolute inset-0 bg-black/50" />
                                {/* Subtle gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            </div>

                            <div className="flex-grow" /> {/* Spacer to push content down */}

                            <div className="relative z-10 text-white">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                                    Ready to Transform Your Enterprise?
                                </h3>
                                <p className="text-white text-xs md:text-sm mb-6 leading-relaxed font-normal">
                                    Join industry leaders who have successfully modernized their SAP landscape with Wysele's specialized migration frameworks.
                                </p>

                                <ul className="space-y-6 mb-12">
                                    <li className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-full">
                                            <Clock className="w-5 h-5 text-[#FFB703]" />
                                        </div>
                                        <span className="text-sm font-medium">Rapid Deployment (Tailored Timelines)</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-full">
                                            <ShieldCheck className="w-5 h-5 text-[#FFB703]" />
                                        </div>
                                        <span className="text-sm font-medium">100% Secure and Compliant</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="bg-white/10 p-2 rounded-full">
                                            <UserCircle className="w-5 h-5 text-[#FFB703]" />
                                        </div>
                                        <span className="text-sm font-medium">Dedicated Strategic Consultant</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Why Choose List */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">
                                Why Choose <span className="font-bold text-[#800000]">Wysele</span>?
                            </h2>

                            <div className="space-y-5">
                                {WHY_CHOOSE_POINTS.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1">
                                            <div className="w-7 h-7 rounded-full bg-[#FFB703]/10 flex items-center justify-center border border-[#FFB703]/20">
                                                <CheckCircle className="w-4 h-4 text-[#FFB703]" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-0.5">
                                                {point.title}
                                            </h4>
                                            <p className="text-gray-950 text-xs md:text-[13px] leading-relaxed font-medium max-w-lg">
                                                {point.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
