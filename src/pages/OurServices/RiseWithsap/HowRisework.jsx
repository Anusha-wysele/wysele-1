import {
  ArrowsClockwise,
  GearSix,
  MagnifyingGlass,
  MapTrifold
} from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import riseHowBusinessTransformImg from "../../../assets/wysele-risehowbusinesstransform.webp";

const steps = [
    {
        title: "Business Assessment",
        icon: <MagnifyingGlass size={24} weight="light" />,
        description: "The process begins with understanding your current operational structure, workflows, and business challenges. Our consultants evaluate existing systems and identify improvement opportunities aligned with business objectives."
    },
    {
        title: "Transformation Planning",
        icon: <MapTrifold size={24} weight="light" />,
        description: "Based on operational requirements, we create a customized roadmap that outlines migration priorities, cloud strategies, workflow improvements, and implementation phases. This structured roadmap helps businesses move through transformation initiatives with better visibility and operational alignment."
    },
    {
        title: "Implementation and Integration",
        icon: <GearSix size={24} weight="light" />,
        description: "Wysele implements SAP solutions and cloud services while ensuring smooth integration with existing business systems and workflows. Our implementation approach focuses on reducing disruptions while improving operational performance and workflow coordination."
    },
    {
        title: "Ongoing Optimization and Support",
        icon: <ArrowsClockwise size={24} weight="light" />,
        description: "After implementation, we continue supporting businesses through monitoring, optimization, and operational improvement services that help maintain long-term system performance and scalability. This ongoing support helps organizations adapt to changing business requirements while maintaining operational stability."
    }
];

const Card = ({ step, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="transition-all duration-300 group flex flex-col h-full hover:-translate-y-1"
    >
        <div className="p-3 lg:p-4 relative flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="text-white opacity-80 shrink-0">
                    {step.icon}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{step.title}</h3>
            </div>
            <p className="text-xs text-white/95 font-light leading-relaxed flex-grow">{step.description}</p>
        </div>
    </motion.div>
);

const HowRisework = () => {
    const navigate = useNavigate();
    return (
        <>
            <section
                className="relative z-10 w-full px-6 md:px-16 pt-12 pb-8 md:pt-16 md:pb-10 flex items-center justify-center bg-white"
                style={{
                    backgroundImage: `url("${riseHowBusinessTransformImg}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Moderate dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black/60" />
                
                <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8 max-w-3xl drop-shadow-md"
                    >
                        <h2 className="text-2xl md:text-3xl font-light text-white">
                            How <span className="font-semibold text-white">RISE with SAP</span> Works
                        </h2>
                    </motion.div>

                    {/* Grid layout spanning 2 columns - tighter gaps for closer alignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full max-w-4xl relative">
                        {/* Vertical separator line for Desktop (between columns) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 z-0" />
                        
                        {/* Horizontal separator line for Desktop (between rows) */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
                        {steps.map((step, index) => (
                            <Card key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section (placed below the image section) */}
            <section className="bg-[#f9f9fb] pt-8 pb-12 md:pt-10 md:pb-16 px-6 md:px-16 w-full flex justify-center border-t border-gray-100">
                <div className="w-full max-w-4xl text-center flex flex-col items-center">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-normal text-gray-900 mb-4"
                    >
                        Build a Future-Ready Business with <span className="font-semibold text-[#800000]">RISE with SAP</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 max-w-3xl font-light"
                    >
                        Businesses need scalable systems, connected workflows, and flexible infrastructure to support long-term growth and operational efficiency. Wysele helps organizations modernize operations, improve process visibility, and simplify enterprise transformation through RISE with SAP consulting and implementation services.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs md:text-sm text-gray-800 leading-relaxed mb-6 max-w-3xl font-medium"
                    >
                        Connect with our consultants to discuss your cloud migration, SAP modernization, and business transformation requirements.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                            onClick={() => navigate('/contact')}
                            className="group relative inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-[#800000] uppercase pb-2 border-b border-[#800000]/30 hover:border-[#800000] transition-colors duration-300 px-6"
                        >
                            Connect with Us
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default HowRisework;
