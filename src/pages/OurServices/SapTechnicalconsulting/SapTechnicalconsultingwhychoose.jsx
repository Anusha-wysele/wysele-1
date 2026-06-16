import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Headset, Layers, Puzzle, RefreshCw, TrendingUp } from 'lucide-react';

const WHY_CHOOSE_DATA = [
    {
        id: 1,
        title: "Expertise Across All SAP Modules",
        description: "Our consultants possess extensive knowledge and deep expertise across a broad array of SAP modules, including SAP S/4HANA, SAP SuccessFactors, SAP Ariba, SAP Concur, and SAP C/4HANA. Whether your needs focus on functional or technical aspects, we have the right specialists ready to assist.",
        icon: Layers
    },
    {
        id: 2,
        title: "Tailored Solutions",
        description: "Recognizing that each business is unique, we design customized SAP solutions that specifically align with your industry’s nuances, organizational goals, and operational challenges. Our personalized approach sets the foundation for effective implementation.",
        icon: Puzzle
    },
    {
        id: 3,
        title: "Proven Track Record",
        description: "With years of delivering successful SAP projects across various industries, our firm boasts a solid track record of transforming business processes and delivering measurable results. Our case studies and client testimonials illustrate our capability to drive significant improvements.",
        icon: TrendingUp
    },
    {
        id: 4,
        title: "End-to-End Services",
        description: "We provide comprehensive SAP services covering the full spectrum from initial consultation and detailed planning through successful implementation to continuous support and optimization. Our commitment is to be your dependable partner throughout your entire SAP journey.",
        icon: RefreshCw
    },
    {
        id: 5,
        title: "Continuous Support and Training",
        description: "After implementation, our dedication to your success continues. We offer ongoing support, regular monitoring, and tailored training programs to ensure that your team can fully leverage your SAP systems. Our consultants remain accessible to help your business adapt and evolve continually.",
        icon: Headset
    }
];

export default function SapTechnicalconsultingwhychoose() {
    return (
        <section className="py-4 md:py-6 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    
                    {/* Left Column: Features List */}
                    <div className="lg:col-span-7">
                        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
                            Why Choose <span className="text-[#800000] font-normal">SAP Consulting Services</span> with Us?
                        </h2>

                        <div className="space-y-2 md:space-y-3">
                            {WHY_CHOOSE_DATA.map((item, index) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-3 items-start group"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FFB703]/20 flex items-center justify-center border border-[#FFB703]/30 group-hover:bg-[#FFB703] transition-colors duration-300">
                                        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[#FFB703] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div>
                                        <h4 className="text-sm md:text-base font-medium text-gray-900 mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-xs md:text-[13px] leading-snug">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Call to Action Card */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#FFB703] rounded-2xl p-5 md:p-6 shadow-xl"
                        >
                            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 leading-tight">
                                Ensure Technical Excellence in SAP
                            </h3>
                            
                            <p className="text-gray-800 text-xs md:text-sm mb-5 leading-snug font-medium">
                                From seamless migrations to complex custom developments, our technical experts guarantee your SAP ecosystem is robust, secure, and optimized for scale.
                            </p>

                            <div className="mb-2">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-gray-900 text-sm font-semibold">System Uptime & Stability</span>
                                    <span className="text-gray-900 text-sm font-semibold">99.9%</span>
                                </div>
                                <div className="w-full h-[2px] bg-white/50 relative">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '99.9%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                        className="absolute top-0 left-0 h-full bg-gray-900"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
