import React from "react";
import { motion } from "framer-motion";

const BENEFITS = [
    "Cost Savings , Access to Expertise ,Scalability & Flexibility",
    "Improved Service Quality, Risk Reduction ,Faster Time to Market",
    "24/7 Availability, Long-Term Partnerships",
    "Unique, custom design tailored to your brand identity.",
    "Fully responsive across mobile, tablet, and desktop.",
    "Fast load times and optimized for search engines.",
    "Enhanced security measures to protect your data and customers.",
    "Easy-to-manage CMS options for simple content updates."
];

export default function WebDevBenefits() {
    return (
        <section className="py-24 bg-[#f8f9fb]">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <div className="relative pl-12 py-8">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-300" />
                    
                    <div className="flex flex-col gap-y-6">
                        {BENEFITS.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                            >
                                <p className="text-gray-500 text-base md:text-lg font-normal leading-relaxed tracking-tight">
                                    {benefit}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
