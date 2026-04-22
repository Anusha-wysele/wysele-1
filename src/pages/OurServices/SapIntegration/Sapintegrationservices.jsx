import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Cloud, Workflow, Zap, Database, Globe } from 'lucide-react';

const SapIntegrationServices = () => {
    const services = [
        {
            title: "Integration with Third-Party Systems",
            desc: "Our experts facilitate the integration of SAP with a wide array of third-party applications, legacy systems, and cloud-based solutions. This integration ensures that data flows smoothly between systems, enabling effective process automation across your enterprise.",
            icon: <Share2 className="w-6 h-6" />
        },
        {
            title: "Cloud and On-Premise Integration",
            desc: "Streamline and optimize your business processes by utilizing SAP PI/PO. Our services ensure that SAP solutions communicate effectively with other systems, resulting in improved coordination and workflow efficiency.",
            icon: <Cloud className="w-6 h-6" />
        },
        {
            title: "Process Integration (PI) / Process Orchestration (PO)",
            desc: "Streamline and optimize your business processes by utilizing SAP PI/PO. Our services ensure that SAP solutions communicate effectively with other systems, resulting in improved coordination and workflow efficiency.",
            icon: <Workflow className="w-6 h-6" />
        },
        {
            title: "Integration with SAP Business Technology Platform (BTP)",
            desc: "Make the most of SAP BTP’s capabilities by connecting your SAP applications to diverse data sources, analytics platforms, and cloud solutions. This integration equips your organization with real-time insights and facilitates automation, empowering data-driven decision-making.",
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: "Data Integration and Synchronization",
            desc: "We enable real-time data synchronization between SAP and external systems, helping to maintain data accuracy and consistency across all business operations. This feature is crucial for businesses that rely on up-to-date information for strategic decisions.",
            icon: <Database className="w-6 h-6" />
        },
        {
            title: "API Management and Integration",
            desc: "Our team specializes in implementing API-led integrations, connecting your SAP systems with a variety of cloud and on-premise applications. This approach streamlines communication and facilitates real-time data sharing, maximizing the potential of your technology landscape.",
            icon: <Globe className="w-6 h-6" />
        }
    ];

    return (
        <section className="py-24 bg-[#F8F9FA] font-inter">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Our Integration <span className="text-[#C9184A]">Services</span>
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-[#C9184A] group-hover:text-white transition-all duration-300 mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#C9184A] transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-light">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SapIntegrationServices;
