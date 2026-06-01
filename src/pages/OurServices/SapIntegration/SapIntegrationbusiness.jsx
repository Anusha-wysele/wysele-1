import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SapIntegrationBusiness = () => {
    const contentBlocks = [
        {
            description: "Wysele delivered a scalable SAP integration solution that connects multiple enterprise systems, enabling seamless data exchange and unified business operations.",
            points: [
                "Real-time data synchronization across systems",
                "Secure API-based integrations",
                "Enhanced system interoperability and visibility"
            ]
        },
        {
            description: "Implemented a robust data platform to unify multiple data sources and provide real-time insights for better decision-making.",
            points: [
                "Centralized data management",
                "Real-time analytics and reporting",
                "Scalable cloud architecture"
            ]
        },
        {
            description: "Streamlined business processes by identifying inefficiencies and enabling continuous improvement through data-driven insights.",
            points: [
                "Process modeling and optimization",
                "Process mining for insights",
                "Improved operational efficiency"
            ]
        }
    ];

    return (
        <section className="pt-12 pb-24 bg-white font-inter">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 text-left">
                {/* Main Heading */}
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-xl md:text-2xl lg:text-3xl font-medium text-black mb-10 tracking-tight max-w-4xl leading-tight"
                >
                    Connected SAP Integration for <br className="hidden md:block" /> Unified Business Operations
                </motion.h2>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-left">
                    {contentBlocks.map((block, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.215, 0.610, 0.355, 1.000] }}
                            className="flex flex-col h-full group"
                        >
                            <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed mb-10 flex-grow border-l border-[#C9184A]/30 pl-6 py-1">
                                {block.description}
                            </p>

                            <ul className="space-y-4">
                                {block.points.map((point, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-3 group/item cursor-default">
                                        <CheckCircle2 className="w-4 h-4 text-[#C9184A] mt-0.5 shrink-0 stroke-[1.5]" />
                                        <span className="text-xs md:text-sm font-light text-gray-800 leading-tight group-hover/item:translate-x-1.5 transition-transform duration-300 ease-out">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SapIntegrationBusiness;
