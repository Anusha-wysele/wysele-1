import { motion } from 'framer-motion';
import SapApiEnhancementImg from '../../../assets/wysele-SapApimanagement.webp';

export default function SapApimanagement() {
    return (
        <section className="pt-12 md:pt-16 pb-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center pl-8 lg:pl-16"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e293b] mb-4 leading-tight">
                        Seamless API Management for Scalable Integration
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        Unlock the full potential of your enterprise by leveraging the SAP Business Technology Platform (BTP) alongside APIs. This integration enhances interoperability and enables greater operational agility across your business processes.
                    </p>
                </motion.div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center lg:justify-start pr-8 lg:pr-16"
                >
                    <img loading="lazy" src={SapApiEnhancementImg}
                        alt="SAP API Enhancement"
                        className="w-full max-w-xl h-auto object-contain"
                    />
                </motion.div>

            </div>
        </section>
    );
}
