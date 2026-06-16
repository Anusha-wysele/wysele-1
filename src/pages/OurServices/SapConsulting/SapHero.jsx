import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../../components/common/Breadcrumbs';
import sapConsultingHeroImg from '../../../assets/wysele-sapconsultinghero.webp';
import Footer from '../../../components/layout/section/Footer';
import FunctionalConsulting from './FunctionalConsulting';
import SapIndustriesweserve from './SapIndustriesweserve';
import SapIntegrationsupport from './SapIntegrationsupport';
import SapOverview from './SapOverview';
import TechnicalConsulting from './TechnicalConsulting';
import WhyChooseWysele from './WhyChooseWysele';

const SapConsulting = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="relative min-h-[560px] lg:h-[600px] w-full overflow-hidden bg-[#D5E7B5] flex flex-col lg:flex-row">
                {/* SVG ClipPath Definitions - Precision Path for Rounded-Tip Arrow */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id="exactArrowMask" clipPathUnits="objectBoundingBox">
                            <path d="
                            M 1,0
                            L 0.65,0
                            L 0.37,0.38
                            Q 0.27,0.5 0.37,0.62
                            L 0.65,1
                            L 1,1
                            Z
                        " />
                        </clipPath>
                        <clipPath id="exactArrowBgMask" clipPathUnits="objectBoundingBox">
                            <path d="
                            M 1,0
                            L 0.61,0
                            L 0.33,0.38
                            Q 0.23,0.5 0.33,0.62
                            L 0.61,1
                            L 1,1
                            Z
                        " />
                        </clipPath>
                    </defs>
                </svg>

                {/* Mobile Background Image and Overlay */}
                <div className="absolute inset-0 block lg:hidden z-0">
                    <img
                        src={sapConsultingHeroImg}
                        alt="SAP Consulting Team"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/65" />
                </div>

                {/* Content Area (Left Side) */}
                <div className="relative w-full lg:w-[60%] h-full flex flex-col justify-end px-6 sm:px-12 lg:pl-16 lg:pr-10 pb-12 sm:pb-16 lg:pb-20 pt-[150px] md:pt-28 sm:pt-32 z-20">
                    <div className="max-w-xl w-full">
                        <motion.h1
                            initial={{ opacity: 1, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-3xl sm:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-6 leading-tight text-white lg:text-gray-900"
                        >
                            SAP Consulting Services <br className="hidden sm:block" />
                            That Improve <span className="text-[#C9184A]">Operations</span> and <span className="text-[#C9184A]">Business Growth</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-3 sm:space-y-4"
                        >
                            <h4 className="text-sm sm:text-base font-bold text-white lg:text-gray-800">
                                Expert SAP Consulting for Growing Businesses
                            </h4>
                            <p className="text-xs sm:text-sm text-white/80 lg:text-gray-600 leading-relaxed font-normal max-w-lg">
                                Modern businesses need more than software implementation. They need SAP systems that improve workflows, reduce delays, support decision-making, and scale with business growth.
                            </p>

                            {/* Buttons Container */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="px-6 py-3 bg-[#FFB703] hover:bg-[#e0a100] text-gray-900 font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                                >
                                    Talk to an SAP Consultant
                                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Visual Area (Right Side - Exact Geometry) */}
                <div className="absolute right-0 top-0 h-full w-full lg:w-[min(1000px,70vw)] z-10 hidden lg:block opacity-90">
                    <div className="w-full h-full absolute inset-0">
                        {/* Layer 1 — OUTER GEOMETRIC BORDER */}
                        <div
                            className="absolute inset-0 z-0 bg-[#800000]"
                            style={{ clipPath: "url(#exactArrowBgMask)" }}
                        />

                        {/* Layer 2 — IMAGE + LABELS (Inner) */}
                        <div
                            className="absolute inset-0 overflow-hidden z-10"
                            style={{ clipPath: "url(#exactArrowMask)" }}
                        >
                            <div className="relative w-full h-full">
                                <img
                                    src={sapConsultingHeroImg}
                                    alt="SAP Consulting Team"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D5E7B5]/90 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Layer 3 — FLOATING BADGE */}
                        <motion.div
                            initial={{ opacity: 1, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="absolute bottom-[10%] left-[28%] z-20 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100/50 flex items-center gap-3 w-[260px] pointer-events-none"
                        >
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 leading-tight">Reliable SAP Solutions</h4>
                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Better Processes. Stronger Growth.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Breadcrumbs />
            <SapOverview />
            <FunctionalConsulting />
            <TechnicalConsulting />
            <SapIndustriesweserve />
            <WhyChooseWysele />
            <SapIntegrationsupport />
            <Footer />
        </>
    );
};

export default SapConsulting;
