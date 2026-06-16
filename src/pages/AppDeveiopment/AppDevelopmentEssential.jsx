import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import appDevGlobalMarket from '../../assets/wysele-appdevelopmentglobalmarket.webp';
import appDevFlexible from '../../assets/wysele-appdevelopmentflexible.webp';
import appDevCostEfficient from '../../assets/wysele-appdevelopmentcostefficient.webp';
import appDevRobust from '../../assets/wysele-appdevelopmentrobust.webp';
import appDevAdvanced from '../../assets/wysele-appdevelopmentadvanced.webp';
import appDevStrongEcosystem from '../../assets/wysele-appdevelopmentstrongecosystem.webp';

const essentials = [
    {
        image: appDevGlobalMarket,
        title: "Global Market Accessibility",
        desc: "With a vast number of mobile users worldwide, your application can reach diverse audiences and expand your presence across global markets through a flexible and scalable ecosystem."
    },
    {
        image: appDevFlexible,
        title: "Flexible & Custom Solutions",
        desc: "A highly adaptable development environment enables tailored solutions, allowing your application to deliver personalized experiences aligned with user expectations."
    },
    {
        image: appDevCostEfficient,
        title: "Cost-Efficient Development",
        desc: "Optimized tools and streamlined processes help reduce development costs while maintaining high quality and efficient resource utilization."
    },
    {
        image: appDevRobust,
        title: "Robust Security Framework",
        desc: "Advanced security measures ensure data protection and user privacy, establishing trust and maintaining the integrity of your application."
    },
    {
        image: appDevAdvanced,
        title: "Advanced Feature Integration",
        desc: "Leverage modern technologies such as AI, AR, and IoT to create engaging, interactive, and future-ready user experiences."
    },
    {
        image: appDevStrongEcosystem,
        title: "Strong Ecosystem & Support",
        desc: "Access to a broad developer community and continuous support ensures faster problem-solving and smooth application growth over time."
    },
];

const AppDevelopmentEssential = () => {
    return (
        <section className="w-full pt-4 md:pt-6 pb-16 md:pb-24 px-6 md:px-16 lg:px-24 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto">

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-black leading-tight tracking-wide">
                        How Mobile App Development Supports Business Success
                    </h2>
                </motion.div>

                {/* Cards Grid: 3 columns × 2 rows */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {essentials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -100 : 100,
                                y: 50
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                y: 0
                            }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{
                                duration: 1.0,
                                delay: index * 0.15,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="flex flex-col overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white cursor-pointer"
                        >
                            {/* Card Image */}
                            <div className="w-full h-36 overflow-hidden">
                                <img loading="lazy" src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-3 flex flex-col flex-1 bg-white">
                                <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[12px] md:text-[13px] text-gray-900 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AppDevelopmentEssential;
