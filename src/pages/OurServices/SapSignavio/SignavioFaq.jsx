import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqItems = [
    {
        key: "faq1",
        question: "What is SAP Signavio?",
        answer: "SAP Signavio is a business process management and process intelligence platform that helps organizations analyze, optimize, automate, and improve operational workflows."
    },
    {
        key: "faq2",
        question: "How does SAP Signavio improve business operations?",
        answer: "SAP Signavio improves process visibility, workflow efficiency, collaboration, and operational performance through process modeling, process mining, automation, and analytics capabilities."
    },
    {
        key: "faq3",
        question: "Can SAP Signavio support SAP S/4HANA transformation?",
        answer: "Yes. SAP Signavio helps organizations prepare for SAP S/4HANA transformation by improving process visibility, workflow optimization, and operational readiness."
    },
    {
        key: "faq4",
        question: "What is process mining in SAP Signavio?",
        answer: "Process mining analyzes operational workflows using system data to identify bottlenecks, inefficiencies, delays, and improvement opportunities."
    },
    {
        key: "faq5",
        question: "Which industries benefit from SAP Signavio services?",
        answer: "Manufacturing, retail, healthcare, logistics, finance, technology, and professional services commonly benefit from SAP Signavio consulting and process optimization solutions."
    },
    {
        key: "faq6",
        question: "Why is process governance important?",
        answer: "Process governance helps organizations maintain workflow consistency, improve accountability, support compliance requirements, and strengthen operational transparency."
    }
];

const SignavioFaq = () => {
    const [openKey, setOpenKey] = useState(null);

    const toggle = (key) => {
        setOpenKey((prev) => (prev === key ? null : key));
    };

    return (
        <>
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
        <section className="bg-white pt-2 pb-12 px-6 lg:px-12 w-full flex flex-col items-center">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                
                {/* Left Column: Heading and Paragraphs */}
                <div className="lg:max-w-[65%] text-left space-y-4">
                    <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-950 leading-tight">
                        Improve Workflow Efficiency with SAP Signavio Solutions
                    </h2>
                    <div className="space-y-2">
                        <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal">
                            Businesses need connected, efficient, and transparent operational workflows to remain competitive in evolving markets.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal">
                            Wysele helps organizations optimize processes, improve collaboration, and support digital transformation through scalable SAP Signavio consulting and implementation services.
                        </p>
                    </div>
                </div>

                {/* Right Column: Button styled like Web Development */}
                <div className="w-full lg:w-auto flex justify-start lg:justify-end flex-shrink-0 pt-4 lg:pt-0">
                    <Link to="/contact">
                        <button className="group relative inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] text-[#800000] uppercase pb-2 border-b border-[#800000]/30 hover:border-[#800000] transition-colors duration-300 px-6">
                            TALK TO OUR SIGNAVIO TEAM
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </Link>
                </div>

            </div>
        </section>
        </>
    );
};

export default SignavioFaq;
