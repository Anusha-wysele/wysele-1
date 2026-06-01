import { motion } from 'framer-motion';
import s4hanaHeroImg from '../../../assets/wysele-s4hanahero.webp';

export default function SapS4hero() {
    return (
        <div className="w-full">
            <section className="relative w-full overflow-hidden font-sans min-h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)] pt-[140px] md:pt-0 py-12 lg:py-0">
                <img 
                    src={s4hanaHeroImg} 
                    alt="SAP S/4HANA" 
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>

                {/* Content Container */}
                <div className="relative lg:absolute inset-0 flex items-center z-20">
                    <div className="max-w-5xl mx-auto px-6 md:px-12 w-full mt-12 md:mt-40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left Side: Content */}
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="order-2 md:order-1"
                            >
                                <p className="text-sm md:text-base text-white font-light leading-relaxed">
                                    Unlock the full potential of your business with SAP S/4HANA—the next-generation ERP suite designed to drive smarter decision-making, enhance operational efficiency, and accelerate innovation. Our SAP S/4HANA Conversion Services ensure your transition from a legacy SAP system to SAP S/4HANA is seamless, efficient, and minimally disruptive, allowing you to leverage the latest technologies for superior performance.
                                </p>
                            </motion.div>

                            {/* Right Side: Heading Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="order-1 md:order-2 w-full max-w-md ml-auto"
                            >
                                <div className="bg-white rounded-3xl p-4 md:p-5 flex flex-col gap-5 shadow-2xl">
                                    
                                    {/* Top section with icon and heading */}
                                    <div className="flex flex-col sm:flex-row items-start gap-3">
                                        <div className="bg-yellow-500 p-2 rounded-xl shrink-0 shadow-sm mt-1">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                            </svg>
                                        </div>
                                        <h1 className="text-lg md:text-xl lg:text-2xl font-light text-gray-900 leading-snug">
                                            Smooth Transition to a <br className="hidden sm:block" />
                                            <span className="font-semibold">Future-Ready</span> SAP S/4HANA
                                        </h1>
                                    </div>

                                    {/* Bottom section with horizontal stat boxes */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="bg-[#fef9e6] rounded-xl p-3 flex flex-col justify-center">
                                            <h3 className="text-lg md:text-xl font-light text-[#d97706] mb-0.5">500+</h3>
                                            <p className="text-gray-600 text-xs">Successful Migrations</p>
                                        </div>
                                        <div className="bg-[#fff1f2] rounded-xl p-3 flex flex-col justify-center">
                                            <h3 className="text-lg md:text-xl font-light text-[#e11d48] mb-0.5">98%</h3>
                                            <p className="text-gray-600 text-xs">Satisfaction Rate</p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
