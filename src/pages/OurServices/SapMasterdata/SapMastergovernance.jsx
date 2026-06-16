import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SapMasterGovernanceImg from '../../../assets/wysele-SapMastergovernance.webp';

export default function SapMastergovernance() {
    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center pl-8 lg:pl-16"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e293b] mb-3 leading-tight">
                        Comprehensive SAP Master Data Governance (MDG) Services
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        At Wysele Technologies, we specialize in SAP Master Data Governance (MDG) services, enabling your business to maintain high-quality, accurate, and consistent master data across your organization. Master data is the foundation of your business processes, and managing it efficiently is crucial for operational excellence. Our SAP MDG services provide you with the tools and expertise to streamline your data management, reduce errors, improve decision-making, and drive overall business performance.
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
                    <img loading="lazy" src={SapMasterGovernanceImg}
                        alt="SAP Master Data Governance"
                        className="w-full max-w-md h-auto object-contain"
                    />
                </motion.div>

            </div>
        </section>
    );
}
