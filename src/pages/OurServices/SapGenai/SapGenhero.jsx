import { motion } from 'framer-motion';
import SapgenaiImg from '../../../assets/wysele-Sapgenaihero.webp';
import Cylinders from '../../../components/common/Cylinders';

export default function SapGenhero() {
    return (
        <div className="w-full">
            <section className="relative w-full overflow-hidden font-sans min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] pt-[140px] md:pt-0 py-12 lg:py-0">
                <img 
                    src={SapgenaiImg} 
                    alt="SAP GenAI" 
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                {/* Decorative Cylinders */}
                <Cylinders />

                {/* Content Container */}
                <div className="relative lg:absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-6 mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide max-w-4xl leading-tight mb-6">
                            Transforming Enterprise with <br />
                            <span className="font-semibold text-white">SAP GenAI</span>
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-white font-light max-w-2xl mx-auto leading-relaxed">
                            Unlock the future of business intelligence. Our tailored Generative AI solutions for SAP empower your organization with unparalleled automation, insights, and innovation.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
