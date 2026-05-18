import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, TrendingUp, Scale, HeadphonesIcon } from 'lucide-react';
// Removed unused background image import

const reasons = [
    {
        icon: <Award size={22} className="text-[#C9184A]" />,
        title: "Expertise & Experience",
        description: "Our team of experienced SAP MDG consultants has a deep understanding of master data management best practices and industry-specific requirements. We provide customized solutions tailored to your business needs."
    },
    {
        icon: <CheckCircle size={22} className="text-[#C9184A]" />,
        title: "End-to-End Data Governance",
        description: "From implementation to ongoing optimization, our SAP MDG services provide end-to-end data governance solutions to ensure your master data remains accurate, consistent, and compliant."
    },
    {
        icon: <TrendingUp size={22} className="text-[#C9184A]" />,
        title: "Improved Data Quality & Compliance",
        description: "With our SAP MDG services, you'll experience enhanced data quality, improved compliance with regulatory standards, and better decision-making based on reliable data."
    },
    {
        icon: <Scale size={22} className="text-[#C9184A]" />,
        title: "Scalable Solutions",
        description: "Whether you're a small business or a large enterprise, we design scalable SAP MDG solutions that grow with your business needs, ensuring long-term success and sustainability."
    },
    {
        icon: <HeadphonesIcon size={22} className="text-[#C9184A]" />,
        title: "Ongoing Support & Optimization",
        description: "We don't just implement SAP MDG — we provide continuous support to optimize your data governance system, address emerging challenges, and drive improvements over time."
    }
];

export default function SapMasterwhychoose() {
    return (
        <section className="relative w-full min-h-[80vh] bg-white overflow-hidden">


            {/* Content */}
            <div className="relative z-10 pt-16 pb-16 px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-12">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4"
                    >
                        Why Choose Our SAP MDG Services?
                    </motion.h2>

                </div>

                {/* Cards — zigzag staircase layout */}
                <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-stretch md:items-start gap-8 md:gap-4">
                    {/* Connecting Curved Lines */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 272">
                            {/* Arc 1: Top of 1 to Top of 2 */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                                d="M 100 20 C 200 20, 200 84, 300 84"
                                stroke="#14B8A6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" opacity="0.9"
                            />
                            {/* Arc 2: Bottom of 2 to Bottom of 3 */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                                d="M 300 252 C 400 252, 400 188, 500 188"
                                stroke="#14B8A6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" opacity="0.9"
                            />
                            {/* Arc 3: Top of 3 to Top of 4 */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
                                d="M 500 20 C 600 20, 600 84, 700 84"
                                stroke="#cbd5e1" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" opacity="0.8"
                            />
                            {/* Arc 4: Bottom of 4 to Bottom of 5 */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
                                d="M 700 252 C 800 252, 800 188, 900 188"
                                stroke="#cbd5e1" strokeWidth="2.5" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" opacity="0.8"
                            />
                        </svg>
                    </div>

                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, rotateX: 30, y: 60, scale: 0.9, transformPerspective: 1000 }}
                            whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1, transformPerspective: 1000 }}
                            whileHover={{ y: -12, scale: 1.03, rotateX: 8, rotateY: -5, transformPerspective: 1000, boxShadow: "0 30px 60px -12px rgba(0,0,0,0.3)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative z-10 bg-[#800000]/85 rounded-sm p-4 flex-1 h-auto md:h-52 flex flex-col shadow-xl border-b-4 border-black/20 ${index % 2 === 0 ? 'mt-0' : 'mt-0 md:mt-16'}`}
                        >
                            <div className="mb-2 text-white/90">{reason.icon}</div>
                            <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">{reason.title}</h3>
                            <p className="text-[11px] text-gray-200 leading-relaxed overflow-hidden">{reason.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
