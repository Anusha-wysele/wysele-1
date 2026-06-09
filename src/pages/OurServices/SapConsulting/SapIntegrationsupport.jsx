import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Box,
  Calculator,
  Cloud,
  Network,
  Plus,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Users
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const integrations = [
    {
        title: "CRM Platforms",
        icon: <Users className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "HR Management Systems",
        icon: <UserCheck className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "Finance & Accounting Tools",
        icon: <Calculator className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "Inventory Management Platforms",
        icon: <Box className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "eCommerce Systems",
        icon: <ShoppingCart className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "Supply Chain Software",
        icon: <Network className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "Analytics & Reporting Tools",
        icon: <TrendingUp className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    },
    {
        title: "Cloud Infrastructure Platforms",
        icon: <Cloud className="w-7 h-7 text-[#1C5C3B]" strokeWidth={1.8} />
    }
];

const faqItems = [
    {
        key: "faq1",
        question: "What are SAP consulting services?",
        answer: "SAP consulting services help businesses implement, optimize, manage, and improve SAP systems to support operations, reporting, and business growth."
    },
    {
        key: "faq2",
        question: "How long does SAP implementation take?",
        answer: "Implementation timelines depend on business size, project scope, integrations, and customization requirements. Most projects range from a few weeks to several months."
    },
    {
        key: "faq3",
        question: "Do you provide SAP S/4HANA migration services?",
        answer: "Yes. We support SAP ECC to SAP S/4HANA migration projects, including planning, testing, data migration, deployment, and optimization."
    },
    {
        key: "faq4",
        question: "Can SAP integrate with existing business software?",
        answer: "Yes. SAP systems can integrate with CRM tools, HR platforms, finance systems, inventory tools, and third-party applications."
    },
    {
        key: "faq5",
        question: "Which industries benefit from SAP consulting?",
        answer: "Manufacturing, retail, healthcare, logistics, finance, professional services, and enterprise organizations commonly use SAP consulting services."
    },
    {
        key: "faq6",
        question: "Do you offer post-implementation support?",
        answer: "Yes. We provide ongoing SAP support, optimization, monitoring, troubleshooting, and user assistance after deployment."
    }
];

const SapIntegrationsupport = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [openKey, setOpenKey] = useState(null);

    const toggle = (key) => {
        setOpenKey((prev) => (prev === key ? null : key));
    };

    return (
        <>
            {/* Integrations Section */}
            <div className="bg-[#FAF9F6] pt-2 pb-14 border-t border-gray-100" ref={containerRef}>
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 text-center">
                    
                    {/* Heading */}
                    <div className="mb-12">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                            SAP Integrations We Support
                        </h2>
                    </div>

                    {/* 8 Columns Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 justify-center items-start mb-10">
                        {integrations.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                                className="flex flex-col items-center group"
                            >
                                {/* Icon Container with slight hover zoom */}
                                <div className="mb-3 p-2 rounded-full bg-emerald-50/40 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-xs font-bold text-gray-800 leading-snug max-w-[120px] mx-auto">
                                    {item.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Paragraph */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed border-t border-gray-200/60 pt-6"
                    >
                        Our integration approach focuses on data consistency, operational visibility, and process continuity.
                    </motion.p>

                </div>
            </div>

            {/* FAQ Section */}
            <section className="bg-white pt-2 pb-6 px-6 lg:px-12 w-full flex flex-col items-center font-inter border-t border-gray-100">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full">
                    
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    {/* Accordion - Two Column Layout */}
                    <div className="w-full flex flex-col lg:flex-row gap-8">
                        {/* Left Column */}
                        <div className="flex-1">
                            {faqItems.filter((_, index) => index % 2 === 0).map((item) => {
                                const isOpen = openKey === item.key;

                                return (
                                    <div key={item.key} className="border-b border-[#e2e8f0]">
                                        <button
                                            onClick={() => toggle(item.key)}
                                            className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                                        >
                                            <span className="text-[15px] sm:text-[17px] md:text-lg font-normal text-[#111827] pr-8">
                                                {item.question}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="flex-shrink-0 text-[#111827]"
                                            >
                                                <Plus size={22} strokeWidth={1.5} />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-6 text-[#4b5563] text-sm md:text-base leading-relaxed pr-8">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Column */}
                        <div className="flex-1">
                            {faqItems.filter((_, index) => index % 2 === 1).map((item) => {
                                const isOpen = openKey === item.key;

                                return (
                                    <div key={item.key} className="border-b border-[#e2e8f0]">
                                        <button
                                            onClick={() => toggle(item.key)}
                                            className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                                        >
                                            <span className="text-[15px] sm:text-[17px] md:text-lg font-normal text-[#111827] pr-8">
                                                {item.question}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="flex-shrink-0 text-[#111827]"
                                            >
                                                <Plus size={22} strokeWidth={1.5} />
                                            </motion.span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pb-6 text-[#4b5563] text-sm md:text-base leading-relaxed pr-8">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#E2EBDC] pt-6 pb-6 px-6 lg:px-12 w-full flex flex-col items-center border-t border-gray-100">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    
                    {/* Left Column: Heading and Paragraphs */}
                    <div className="lg:max-w-[65%] text-left space-y-4">
                        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-950 leading-tight">
                            Build a More Efficient Business with <Link to="/services/sap-consulting" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Consulting</Link></Link> Experts
                        </h2>
                        <div className="space-y-2">
                            <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal">
                                Whether you're planning SAP implementation, migration, optimization, or integration, Wysele helps businesses create stable and scalable SAP environments that support long-term growth.
                            </p>
                            <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal">
                                Talk to our SAP consulting team today to discuss your business goals and implementation requirements.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Button styled like <Link to="/services/web-development" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/web-development" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">Web Development</Link></Link> */}
                    <div className="w-full lg:w-auto flex justify-start lg:justify-end flex-shrink-0 pt-4 lg:pt-0">
                        <Link to="/contact">
                            <button className="group relative inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-[#800000] uppercase pb-2 border-b border-[#800000]/30 hover:border-[#800000] transition-colors duration-300 px-6">
                                TALK TO OUR SAP TEAM
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SapIntegrationsupport;
