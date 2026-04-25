import React from 'react';
import { motion } from 'framer-motion';
import {
    Check,
    Share2,
    Cloud,
    Workflow,
    Zap,
    Database,
    Globe,
    ArrowUpRight,
    Users
} from 'lucide-react';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import Button from '../../../components/common/Button';

const SapIntegrationServices = () => {
    const bulletPoints = [
        "Seamless Integration with External Systems",
        "Unified Cloud and On-Premise Connectivity",
        "Efficient Process Integration and Orchestration",
        "Advanced Integration with SAP BTP",
        "Real-Time Data Synchronization and Accuracy",
        "Scalable API-Driven Connectivity"
    ];

    const services = [
        {
            title: "Third-Party Integration",
            desc: "Seamlessly connect SAP with external applications, legacy systems, and cloud platforms.",
            icon: <Users className="w-6 h-6" />
        },
        {
            title: "Cloud & On-Premise Integration",
            desc: "Ensure consistent communication between cloud and on-premise systems.",
            icon: <Cloud className="w-6 h-6" />
        },
        {
            title: "Process Integration (PI/PO)",
            desc: "Leverage SAP PI/PO to streamline processes and operational performance.",
            icon: <Workflow className="w-6 h-6" />
        },
        {
            title: "SAP BTP Integration",
            desc: "Integrate SAP applications with analytics platforms to unlock real-time insights.",
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: "Data Synchronization",
            desc: "Enable real-time data exchange across systems to maintain accuracy.",
            icon: <Database className="w-6 h-6" />
        },
        {
            title: "API Management",
            desc: "Implement API-driven integrations to connect systems efficiently and scalably.",
            icon: <Globe className="w-6 h-6" />
        }
    ];

    return (
        <section className="w-full bg-white font-inter">

            {/* Top Section: Split Layout (Image Left, Text Right) */}
            <div className="flex flex-col lg:flex-row w-full bg-[#0B0B0B] overflow-hidden border-b border-gray-800">
                {/* Left: Image */}
                <div className="w-full lg:w-[40%] h-[300px] lg:h-[450px] relative">
                    <img
                        src={SERVICES_PAGE_IMAGES.sapIntegrationServices}
                        alt="Integration Excellence"
                        className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#0B0B0B]/40" />
                </div>

                {/* Right: Content */}
                <div className="w-full lg:w-[60%] flex items-center p-10 md:p-16 lg:p-20 bg-[#0B0B0B] text-white">
                    <div className="max-w-xl">
                        <h2 className="text-2xl md:text-3xl font-normal mb-6 tracking-tight leading-tight">
                            Our Integration Services
                        </h2>

                        <p className="text-white text-sm md:text-base font-light opacity-90 leading-relaxed mb-8">
                            We help businesses seamlessly integrate their SAP systems with diverse platforms to ensure smooth data flow and efficient operations. At Wysele, we deliver reliable solutions that enhance system communication, reduce complexity, and create a connected ecosystem that supports scalability and real-time decision-making.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {[
                                "Seamless System Connectivity",
                                "Real-Time Data Synchronization",
                                "Scalable Integration Architecture",
                                "Secure and Reliable Data Exchange"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 border-l border-[#C9184A] pl-4 py-0.5 group hover:border-white transition-colors">
                                    <span className="text-xs md:text-sm font-light tracking-wide text-white group-hover:text-white transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Split Content (Bullets & Service Grid) */}
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 pt-12 pb-8">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left: Core Capabilities */}
                    <div className="w-full lg:w-[30%]">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9184A] mb-6 block">Core Capabilities</span>
                        <ul className="space-y-3.5">
                            {bulletPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3.5">
                                    <div className="mt-1 w-3.5 h-3.5 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                                        <Check size={8} className="text-[#C9184A]" />
                                    </div>
                                    <span className="text-sm text-gray-600 font-light leading-snug">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Service Grid */}
                    <div className="w-full lg:w-[70%]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 lg:gap-y-10">
                            {services.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.1, margin: "-50px" }}
                                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.215, 0.610, 0.355, 1.000] }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100 group-hover:bg-[#C9184A] group-hover:text-white transition-all duration-300">
                                        {React.cloneElement(service.icon, { size: 18 })}
                                    </div>
                                    <div className="max-w-[280px]">
                                        <h3 className="text-[14px] font-bold text-gray-900 mb-1.5 tracking-tight group-hover:text-[#C9184A] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-[13px] text-gray-500 font-light leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default SapIntegrationServices;
