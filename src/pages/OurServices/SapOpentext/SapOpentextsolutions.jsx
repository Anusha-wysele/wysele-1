import React from 'react';
import { motion } from 'framer-motion';
import { 
    Database, 
    FileText, 
    ShieldCheck, 
    MapTrifold,
    Lightbulb
} from '@phosphor-icons/react';

const solutions = [
    {
        title: "SAP Data Archiving",
        subtitle: "Optimize Database Space",
        description: "Optimize your SAP environment by freeing up valuable database space with our SAP data archiving services. Our team assists in efficiently moving historical and inactive data to a secure, well-organized archive.",
        bullets: [
            "Free up database space",
            "Maintain system performance",
            "Lower operational costs"
        ],
        impact: "Maintain system performance, meet compliance requirements, and lower operational costs.",
        icon: <Database size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "SAP Document Archiving",
        subtitle: "Secure Document Management",
        description: "Ensure the long-term security, accessibility, and management of your crucial business documents with our SAP Document Archiving services utilizing OpenText technologies.",
        bullets: [
            "Secure document archiving",
            "Easy retrieval and access",
            "Simplified document management"
        ],
        impact: "Ensure long-term security and compliance with regulatory standards for all documents.",
        icon: <FileText size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Compliance and Records",
        subtitle: "Meet Industry Regulations",
        description: "Navigating the complexities of regulatory compliance can be challenging. Our SAP archiving solutions are designed to ensure that your data and documents meet industry regulations.",
        bullets: [
            "Establish retention policies",
            "Secure disposal options",
            "Maintain records legally"
        ],
        impact: "Ensure data and documents meet industry regulations and legal standards.",
        icon: <ShieldCheck size={22} weight="light" className="text-gray-700" />
    },
    {
        title: "Strategy and Migration",
        subtitle: "Smooth Data Transition",
        description: "Whether transitioning from outdated systems or developing a new archiving strategy, our migration services guarantee a smooth transition of data to your SAP environment.",
        bullets: [
            "Evaluate existing practices",
            "Comprehensive archiving strategy",
            "Optimize data retention"
        ],
        impact: "Optimize data retention, access, and security across your organization.",
        icon: <MapTrifold size={22} weight="light" className="text-gray-700" />
    }
];

export default function SapOpentextsolutions() {
    return (
        <section className="relative z-10 w-full bg-[#f9f9fb] pt-10 pb-10">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="text-center mb-8">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-4"
                    >
                        SAP Archiving <span className="font-semibold px-2">Solutions</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 justify-center">
                    {solutions.map((item, index) => {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group flex flex-col h-full relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#800000] transition-colors duration-500"
                            >

                                <div className="p-4 lg:p-5 flex flex-col flex-grow">
                                    {/* Icon Header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-900 group-hover:bg-[#800000] group-hover:text-white transition-colors duration-500">
                                            {React.cloneElement(item.icon, { weight: "regular", size: 16 })}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-[10px] font-semibold text-[#800000] tracking-wide uppercase mt-1">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 leading-tight mb-3">
                                        {item.description}
                                    </p>

                                    <div className="flex-grow">
                                        <ul className="space-y-1.5">
                                            {item.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <div className="mt-1 w-1 h-1 rounded-full bg-[#800000] shrink-0" />
                                                    <span className="leading-tight">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Impact Footer Segment */}
                                <div className="bg-gray-50 border-t border-gray-100 p-3 lg:p-4 flex items-start gap-2.5 group-hover:bg-[#FFF0F3] transition-colors duration-500">
                                    <Lightbulb size={16} weight="duotone" className="text-[#800000] shrink-0 mt-0.5" />
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-900 mb-0.5 uppercase tracking-wider">Business Impact</span>
                                        <span className="text-xs text-gray-600 leading-tight">
                                            {item.impact}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
