import { motion } from 'framer-motion';
import offering1 from '../../../assets/wysele-sapganaiofferings1.webp';
import offering2 from '../../../assets/wysele-sapganaiofferings2.webp';
import offering3 from '../../../assets/wysele-sapganaiofferings3.webp';
import offering4 from '../../../assets/wysele-sapganaiofferings4.webp';

export default function SapGenaiOfferings() {
    const offerings = [
        {
            title: "AI-Powered Automation",
            description: "Transform your organization’s workflows with state-of-the-art AI-driven automation solutions that minimize manual efforts, reduce errors, and improve operational efficiency across departments.",
            image: offering1
        },
        {
            title: "AI Chatbots & Virtual Assistants",
            description: "Implement AI-powered conversational agents that provide immediate support and enhance customer engagement, allowing for 24/7 service availability and effective resolution of customer issues.",
            image: offering2
        },
        {
            title: "Predictive Analytics & Machine Learning",
            description: "Utilize advanced AI models designed to predict trends, optimize operational processes, and empower data-driven decision-making for your organization, enhancing your strategic planning capabilities.",
            image: offering3
        },
        {
            title: "Generative AI for Content Creation",
            description: "Streamline the content creation process by automating the generation of high-quality text, images, and videos that resonate with your target audience, elevating your brand presence in the market.",
            image: offering4
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="pt-4 pb-10 md:pt-8 md:pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#1e293b] uppercase tracking-wide">
                        Our Gen AI Offerings
                    </h2>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start"
                >
                    {offerings.map((offering, index) => (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col group border border-gray-100 relative cursor-pointer"
                        >
                            <div className="h-48 relative overflow-hidden">
                                <img loading="lazy" src={offering.image} 
                                    alt={offering.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/90 via-[#1e293b]/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-5 flex items-end justify-between">
                                    <h3 className="text-base font-bold text-white uppercase tracking-wide drop-shadow-md pr-2 leading-tight">
                                        {offering.title}
                                    </h3>
                                    <svg className="w-5 h-5 text-white/70 transform transition-transform duration-500 group-hover:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out bg-white">
                                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                                    <div className="p-6 pt-4 border-t border-gray-50">
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {offering.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
