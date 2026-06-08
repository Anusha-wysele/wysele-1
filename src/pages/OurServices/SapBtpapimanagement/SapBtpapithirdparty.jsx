import { motion } from 'framer-motion';
import SapBtpapithirdpartyImg from '../../../assets/wysele-Sapbtpapithirdparty.webp';

export default function SapBtpapithirdparty() {
    return (
        <section className="pt-0 pb-12 md:pb-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center lg:justify-end lg:pl-16"
                >
                    <img loading="lazy" src={SapBtpapithirdpartyImg}
                        alt="SAP BTP Third Party Integration"
                        className="w-full max-w-xl h-auto object-contain"
                    />
                </motion.div>

                {/* Right Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center lg:pr-16"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e293b] mb-4 leading-tight">
                        Third-Party &amp; Legacy System Integration
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        We specialize in seamlessly connecting SAP with legacy applications, Customer Relationship Management (CRM) systems, Enterprise Resource Planning (ERP) platforms, and other third-party systems. This unified integration fosters smoother operations, ensuring that all your systems work together harmoniously to support your organizational goals.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
