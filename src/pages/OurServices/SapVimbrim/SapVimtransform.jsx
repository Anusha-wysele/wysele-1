import { Link } from 'react-router-dom';
import {
  CurrencyCircleDollar,
  FileText,
  Lightbulb
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React from 'react';

const vimBrimBenefits = [
    {
        title: "SAP VIM",
        subtitle: "Streamline Invoice Processing",
        description: "Simplify and automate your invoice management processes with SAP VIM. At Wysele, we help organizations reduce manual effort, improve accuracy, and accelerate approval workflows for efficient accounts payable operations.",
        bullets: [
            "Automated invoice processing",
            "Faster approval cycles",
            "Improved financial accuracy",
            "Enhanced compliance and visibility"
        ],
        impact: "Efficient accounts payable operations with reduced errors and faster processing times.",
        icon: <FileText size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "SAP BRIM",
        subtitle: "Optimize Billing and Revenue Management",
        description: "Transform complex billing operations with SAP BRIM. Wysele enables businesses to manage dynamic pricing, automate billing cycles, and gain real-time insights into revenue streams for better financial control.",
        bullets: [
            "Automated and flexible billing processes",
            "Support for complex pricing models",
            "Real-time revenue insights",
            "Improved financial transparency"
        ],
        impact: "Streamlined billing operations with increased revenue efficiency and scalability.",
        icon: <CurrencyCircleDollar size={22} weight="light" className="text-gray-700" />
    }
];

export default function SapVimtransform() {
    return (
        <section className="relative z-10 w-full bg-[#f9f9fb] py-10">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-light text-gray-900 mb-2"
                    >
                        Transforming <span className="font-semibold px-2 text-[#800000]">Financial Operations</span>
                    </motion.h2>
                    <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto">
                        Leverage Wysele's expertise in <Link to="/services/sap-vim-brim" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>SAP VIM</Link> and BRIM to automate complex financial processes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {vimBrimBenefits.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col h-full relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#800000] transition-colors duration-500 shadow-sm"
                        >
                            <div className="p-6 lg:p-8 flex flex-col flex-grow">
                                {/* Icon Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-900 group-hover:bg-[#800000] group-hover:text-white transition-colors duration-500">
                                        {React.cloneElement(item.icon, { weight: "regular", size: 24 })}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 leading-none mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs font-bold text-[#800000] tracking-wider uppercase">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                    {item.description}
                                </p>

                                <div className="flex-grow">
                                    <ul className="space-y-1.5">
                                        {item.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-[#800000] shrink-0" />
                                                <span className="leading-tight">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Impact Footer Segment */}
                            <div className="bg-gray-50 border-t border-gray-100 p-4 lg:p-5 flex items-start gap-3 group-hover:bg-[#FFF0F3] transition-colors duration-500">
                                <Lightbulb size={18} weight="duotone" className="text-[#800000] shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[10px] font-black text-gray-900 mb-0.5 uppercase tracking-widest">Business Impact</span>
                                    <span className="text-xs text-gray-600 leading-tight">
                                        {item.impact}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
