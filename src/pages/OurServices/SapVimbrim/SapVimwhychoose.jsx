import {
  ArrowsOut,
  Brain,
  Briefcase,
  ChartLine,
  CheckCircle,
  ShieldCheck
} from "@phosphor-icons/react";
import { motion } from 'framer-motion';

const SapVimwhychoose = () => {
    const whyChooseData = [
        {
            title: "Expert Knowledge and Experience",
            desc: "Our team brings deep expertise in SAP VIM and BRIM, enabling us to understand complex business requirements and deliver solutions tailored to your operational needs.",
            icon: <Brain size={24} weight="light" />
        },
        {
            title: "Comprehensive Service Offering",
            desc: "We provide end-to-end services—from initial consultation and implementation to continuous support—ensuring a seamless transition and ongoing optimization.",
            icon: <Briefcase size={24} weight="light" />
        },
        {
            title: "Enhanced Efficiency and Accuracy",
            desc: "Our solutions automate key workflows, reduce manual errors, and improve financial accuracy, helping accelerate processes and strengthen cash flow management.",
            icon: <ChartLine size={24} weight="light" />
        },
        {
            title: "Scalability and Flexibility",
            desc: "Designed to grow with your business, our solutions support evolving billing models, invoice processes, and changing operational demands.",
            icon: <ArrowsOut size={24} weight="light" />
        },
        {
            title: "Compliance and Assurance",
            desc: "We ensure adherence to regulatory standards through audit-ready systems, accurate reporting, and robust processes that minimize financial risks.",
            icon: <ShieldCheck size={24} weight="light" />
        }
    ];

    return (
        <section className="py-6 bg-white overflow-hidden border-t border-gray-50">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20">
                
                {/* Simplified Header Section */}
                <div className="text-center mb-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight">
                            Why <span className="text-[#800000] font-medium">Wysele</span> for your Transformation?
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                            Choosing the right partner is critical for the success of your SAP implementation. We combine industry best practices with deep technical mastery to ensure your business stays ahead.
                        </p>
                    </motion.div>

                    {/* Lead Focus Areas */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Deep Domain Mastery", desc: "Specialized focus on VIM and BRIM modules." },
                            { title: "Agile Implementation", desc: "Faster time-to-value with proven methodologies." },
                            { title: "Global Compliance", desc: "Ensuring adherence to international standards." }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center px-4"
                            >
                                <div className="w-12 h-12 rounded-none bg-gray-50 flex items-center justify-center border border-gray-100 mb-4 text-[#800000]">
                                    <CheckCircle size={24} weight="light" />
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-wider">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Features Grid - Centered Flex Layout */}
                <div className="flex flex-wrap justify-center gap-8">
                    {whyChooseData.map((card, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -8 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#E8D08A] border border-[#d4be7d] p-5 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-3xl w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
                        >
                            <div className="flex flex-col h-full">
                                <div className="mb-3 text-[#800000] opacity-80 group-hover:scale-110 transition-transform duration-500">
                                    <div className="w-10 h-10 bg-white/20 flex items-center justify-center rounded-2xl border border-black/5">
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black text-[#800000] opacity-40 tracking-widest uppercase">0{index + 1}</span>
                                    <h3 className="text-sm text-gray-900 font-bold tracking-tight">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="text-gray-800 text-[11px] leading-relaxed font-light">
                                    {card.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SapVimwhychoose;
