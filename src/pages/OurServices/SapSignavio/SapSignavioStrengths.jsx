import {
  ArrowsMerge,
  CheckCircle,
  MagnifyingGlass,
  TreeStructure,
  UsersThree
} from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import sapSignavioImplementationImg from "../../../assets/wysele-sapsignavioimplementation.webp";

const SapSignavioStrengths = () => {
    const strengths = [
        {
            text: "End-to-end SAP Signavio Implementations for process excellence",
            icon: <CheckCircle size={20} weight="light" className="text-[#800000] mt-0.5" />
        },
        {
            text: "Business Process Modeling, Analysis & Optimization",
            icon: <TreeStructure size={20} weight="light" className="text-[#800000] mt-0.5" />
        },
        {
            text: "Process Mining & Real-Time Insights for Data-Driven Decisions",
            icon: <MagnifyingGlass size={20} weight="light" className="text-[#800000] mt-0.5" />
        },
        {
            text: "Agile, Scalable Delivery Teams with Industry Expertise",
            icon: <UsersThree size={20} weight="light" className="text-[#800000] mt-0.5" />
        },
        {
            text: "Seamless Integration, Enhanced Visibility & Faster Business Outcomes",
            icon: <ArrowsMerge size={20} weight="light" className="text-[#800000] mt-0.5" />
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left side content box */}
                    <div className="w-full lg:w-1/2">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="border-[0.5px] border-gray-200 rounded-sm p-6 bg-gray-50/30 shadow-sm"
                        >
                            <h2 className="text-xl font-light text-gray-900 mb-5 tracking-tight">
                                Our Core <span className="font-semibold">Implementation Strengths</span>
                            </h2>
                            
                            <ul className="space-y-3">
                                {strengths.map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-4 group cursor-pointer"
                                    >
                                        <div className="shrink-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:-rotate-45">
                                            {item.icon}
                                        </div>
                                        <p className="text-sm text-gray-800 leading-relaxed font-normal">
                                            {item.text}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right side - Image */}
                    <div className="hidden lg:block lg:w-1/2 relative h-full min-h-[300px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full rounded-sm overflow-hidden"
                        >
                            <img loading="lazy" src={sapSignavioImplementationImg} 
                                alt="Business people meeting outdoors" 
                                className="w-full h-full object-cover rounded-sm absolute inset-0"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SapSignavioStrengths;
