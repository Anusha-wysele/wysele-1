import React from 'react';
import { motion } from 'framer-motion';
import Cylinderr from '../../../components/common/Cylinderr';

const steps = [
    {
        title: "Assessment & Strategy Development",
        description: "Our process begins with a thorough assessment of your business requirements. We collaborate closely with stakeholders to identify specific integration goals, ensuring that the strategy aligns with your overall business objectives."
    },
    {
        title: "Design & Implementation",
        description: "With a clear strategy in place, we move on to architecting integration solutions that follow industry best practices. This phase involves designing the technical framework and processes that support effective data flow and functionality across platforms."
    },
    {
        title: "Testing & Validation",
        description: "Before deployment, we conduct rigorous testing and validation to ensure that data flows smoothly and accurately between systems. Our comprehensive testing protocols help identify and resolve any issues, resulting in a reliable integration solution."
    },
    {
        title: "Deployment & Monitoring",
        description: "We provide expert support during the go-live phase, ensuring a seamless transition to the new integrated system. Continuous monitoring follows to swiftly address any issues that may arise post-deployment, guaranteeing system reliability and performance."
    },
    {
        title: "Optimization & Support",
        description: "Integration doesn't end at deployment. We offer ongoing maintenance and support to fine-tune performance, enhance scalability, and adapt to evolving business needs, ensuring your integration solution continues to deliver value over time."
    }
];

export default function SapBtpapiintegration() {
    return (
        <section className="pt-6 md:pt-8 pb-6 md:pb-8 bg-gray-50">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-2 flex items-center justify-center gap-4"
                    >
                        <Cylinderr className="w-4 h-10 rounded-sm" />
                        Our Integration Process
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
                    >
                        A structured, end-to-end approach to delivering seamless SAP BTP API integrations that drive business value
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-lg relative flex flex-col h-full overflow-hidden group shadow-md hover:shadow-xl cursor-pointer bg-[#1C1216]"
                        >
                            {/* Visual Layer - Colored Background (Animates to fill on hover) */}
                            <div className="absolute top-5 left-5 right-0 bottom-0 bg-[#8B3A5E] border border-[#8B3A5E] rounded-tl-lg lg:rounded-br-lg transition-all duration-300 ease-in-out group-hover:top-0 group-hover:left-0 group-hover:rounded-none z-10" />

                            {/* Content Layout */}
                            <div className="pt-5 pl-5 relative z-20 flex flex-col h-full">
                                <div className="p-4 lg:p-5 flex-1 flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-x-5 group-hover:-translate-y-5">
                                    <h3 className="text-[15px] font-semibold text-white mb-2 leading-tight transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/80 text-[10.5px] leading-snug font-normal mb-4 flex-1">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
