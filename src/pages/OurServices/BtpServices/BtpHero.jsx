import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cylinders from '../../../components/common/Cylinders';
import sapBtpHeroImg from "../../../assets/wysele-btphero.webp";

const BtpHero = () => {
    const slideUp = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <section className="relative w-full min-h-[calc(100vh-68px)] lg:min-h-screen overflow-hidden bg-black text-white flex flex-col justify-center pt-[150px] md:pt-0">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img fetchpriority="high"
                    src={sapBtpHeroImg}
                    alt="SAP BTP Services"
                    className="w-full h-full object-cover object-[center_45%]"
                />
            </div>

            {/* Black color overlay for text legibility */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

            {/* Cylinders Background Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Cylinders />
            </div>

            {/* Reverting to Centered Content Design (as requested by 'how it is previous') */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 w-full flex-1">
                <motion.div
                    className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto w-full flex flex-col items-center"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Minimal Label */}
                    <motion.div variants={slideUp} className="mb-6 md:mb-8">
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.5em] text-white/70 uppercase">
                            Digital Transformation
                        </span>
                    </motion.div>

                    {/* Headline - Restored to original requested text */}
                    <div className="mb-10 md:mb-16">
                        <motion.h1
                            variants={slideUp}
                            className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight"
                        >
                            Transform Your <br className="hidden sm:block" />
                            Business with <br className="hidden sm:block" />
                            <span className="text-[#800000] font-semibold">SAP BTP</span>
                        </motion.h1>
                    </div>

                    {/* Horizontal Content Strip - Restoring Detailed Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full">
                        {[
                            "At Wysele, we enable organizations to unlock the true value of their data by delivering robust SAP BTP solutions that drive innovation, improve efficiency, and support scalable growth.",
                            "SAP BTP brings together analytics, AI, and cloud capabilities into a unified ecosystem—helping businesses integrate systems, streamline processes, and gain meaningful data insights.",
                            "Our SAP BTP services provide a flexible, future-ready foundation that evolves with your business needs, modernizing operations and building intelligent applications."
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                variants={slideUp}
                                className="flex flex-col items-center"
                            >
                                <div className="h-[1px] w-12 md:w-8 bg-[#800000] mb-5 md:mb-6" />
                                <p className="text-sm md:text-base text-white/90 leading-relaxed font-light max-w-[280px] md:max-w-xs">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BtpHero;
