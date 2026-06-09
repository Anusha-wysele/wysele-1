import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  Eye,
  Layers,
  Shield,
  TrendingUp,
  Users,
  Workflow,
  Zap
} from 'lucide-react';
import React, { useRef } from 'react';

// Custom standardization icon if standard standardization icon does not exist
import { Compass } from 'lucide-react';

const expertiseItems = [
    {
        title: "End-to-End Implementation",
        description: "End-to-end SAP Signavio implementation services.",
        icon: <Layers className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Process Modeling & Optimization",
        description: "Business process modeling and workflow optimization.",
        icon: <Workflow className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Process Mining & Analytics",
        description: "Process mining and operational analytics.",
        icon: <BarChart3 className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Real-time Visibility & Monitoring",
        description: "Real-time workflow visibility and monitoring.",
        icon: <Eye className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "SAP S/4HANA Transformation",
        description: "SAP S/4HANA transformation support.",
        icon: <Zap className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Process Automation & Governance",
        description: "Process automation and governance frameworks.",
        icon: <Shield className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Cross-functional Collaboration",
        description: "Cross-functional collaboration solutions.",
        icon: <Users className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Continuous Process Improvement",
        description: "Continuous process improvement strategies.",
        icon: <TrendingUp className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    },
    {
        title: "Enterprise-wide Standardization",
        description: "Enterprise-wide workflow standardization.",
        icon: <Compass className="w-5 h-5 text-[#C9184A]" strokeWidth={1.8} />
    }
];

const SapSignavioexperties = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="bg-white pt-2 pb-8 border-t border-gray-100" ref={containerRef}>
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-4 md:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-6 flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-3">
                        Our <Link to="/services/sap-signavio" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-signavio" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Signavio</Link></Link> Expertise
                    </h2>
                    {/* Centered red line divider like in the screenshot */}
                    <div className="w-12 h-1 bg-[#800000] rounded" />
                </div>

                {/* Grid of 9 Cards - Responsive layouts, 9-column row on large screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-9 gap-2.5 w-full">
                    {expertiseItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                            className="relative overflow-hidden bg-white/90 p-4 rounded-lg transition-all duration-500 flex flex-col items-start text-left group border border-gray-200 h-full"
                        >
                            {/* Animated Bottom Border */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#800000] transition-all duration-500 ease-out group-hover:w-full"></div>

                            {/* Header: Icon and Title side-by-side */}
                            <div className="flex flex-col gap-3 mb-3 w-full">
                                {/* Circular Icon Container */}
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[#ffcc00]/30">
                                    {React.cloneElement(item.icon, { 
                                        className: "w-4.5 h-4.5 text-[#C9184A] transition-colors duration-500 group-hover:text-[#C9184A]" 
                                    })}
                                </div>

                                <h3 className="text-xs sm:text-[13px] font-bold text-[#0A0A0A] leading-snug transition-colors duration-500 group-hover:text-[#380816] min-h-[32px]">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-gray-600 leading-relaxed font-normal transition-colors duration-500 group-hover:text-[#380816]">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Paragraph Info Block */}
                <div className="max-w-3xl mx-auto text-center mt-6">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                        Our consulting approach focuses on helping businesses improve operational consistency, reduce inefficiencies, and make better decisions through process intelligence and workflow visibility.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default SapSignavioexperties;
