import { motion } from 'framer-motion';
import SapTechnicalconsultingoverviewImg from '../../../assets/wysele-Saptechnicalconsultingoverview.webp';

export default function SapTechnicalconsultingoverview() {
    return (
        <section className="pt-6 md:pt-8 pb-0 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center lg:pl-16"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e293b] mb-4 leading-tight">
                        Expert Technical SAP Consulting Services
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        At our firm, we understand that the complexities of SAP solutions require specialized expertise. Our technical SAP consultants are dedicated to providing the knowledge and skills necessary to configure, integrate, and maintain your SAP environment effectively. We emphasize building a robust and scalable SAP infrastructure tailored to meet your business's current needs and future growth ambitions.
                    </p>
                </motion.div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center lg:justify-start lg:pr-16"
                >
                    <img
                        src={SapTechnicalconsultingoverviewImg}
                        alt="SAP Technical Consulting Overview"
                        className="w-full max-w-xl h-auto object-contain"
                    />
                </motion.div>

            </div>
        </section>
    );
}
