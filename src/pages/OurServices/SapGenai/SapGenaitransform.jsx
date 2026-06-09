import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GanAiphasesImg from '../../../assets/wysele-sapgenaitransfom.webp';

export default function SapGenaitransform() {
    return (
        <section className="py-8 md:py-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e293b] mb-4 leading-tight">
                        Innovate with AI-Driven Transformation
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        As the landscape of technology evolves, Artificial Intelligence is fundamentally transforming various industries, with <Link to="/services/sap-genai" className="hover:underline transition-colors decoration-[#C9184A] underline-offset-4 text-inherit font-medium">Generative AI</Link> at the helm of this change. Our Gen AI Services empower organizations to leverage advanced AI-driven automation, obtain actionable data insights, and create innovative content, ultimately driving growth, efficiency, and competitive advantage.
                    </p>
                </motion.div>

                {/* Right Side: Image */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex justify-center lg:justify-end"
                >
                    <img loading="lazy" src={GanAiphasesImg}
                        alt="SAP GenAI Transformation Phases"
                        className="w-full max-w-xl h-auto object-contain rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)]"
                    />
                </motion.div>

            </div>
        </section>
    );
}
