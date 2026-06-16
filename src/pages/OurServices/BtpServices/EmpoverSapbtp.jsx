import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import btpEmpover1Img from "../../../assets/wysele-btpempover1.webp";
import btpEmpover2Img from "../../../assets/wysele-btpempover2.webp";

const btpPoints = [
    "Unlock the full potential of your business data with SAP BTP",
    "Unify analytics, AI, and cloud technologies into one platform",
    "Connect systems seamlessly for smooth data flow and insights",
    "Drive innovation with intelligent tools and modern capabilities",
    "Optimize processes to improve efficiency and performance",
    "Scale operations to support future business growth",
    "Leverage Wysele’s end-to-end SAP BTP expertise for tailored solutions"
];

const EmpoverSapbtp = () => {
    return (
        <section className="relative w-full bg-white pt-20 pb-4 overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-16">
                
                {/* Left Side: Content Box */}
                <div className="w-full lg:w-1/2 flex justify-start lg:pl-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group p-6 border border-gray-100 bg-white max-w-lg"
                    >
                        {/* Interactive Background Box (Shrinks to fit on hover) */}
                        <div className="absolute -inset-4 border-2 border-[#800000] opacity-30 group-hover:inset-0 transition-all duration-500 ease-out pointer-events-none" />
                        
                        <div className="relative z-10">
                            {/* Heading */}
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight mb-2">
                                Empower Your Business <br />
                                <span className="text-[#800000]">with SAP BTP</span>
                            </h2>

                            {/* List with Arrows */}
                            <ul className="space-y-0.5">
                                {btpPoints.map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                                        className="flex items-start gap-4 text-[13px] text-gray-600 leading-relaxed group/item"
                                    >
                                        <ArrowRight className="mt-[4px] shrink-0 text-[#800000]" size={14} />
                                        <span className="group-hover/item:text-gray-900 transition-colors duration-300">
                                            {point}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Recreating Screenshot UI (Floating Card) */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    {/* Background "Under" Image with thin border (matches screenshot's framed base) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden border border-gray-200 p-2 bg-gray-50 shadow-sm"
                    >
                        <img loading="lazy" src={btpEmpover1Img}
                            alt="SAP BTP Architecture"
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                    </motion.div>

                    {/* Floating Analytics Image (No background gradient) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-[30%] top-[20%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] rounded-3xl shadow-2xl z-20 overflow-hidden border border-gray-100 bg-white"
                    >
                        {/* Integrated Analytics Image */}
                        <img loading="lazy" src={btpEmpover2Img}
                            alt="Wysele BTP Analytics"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EmpoverSapbtp;
