import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cylinders from '../../../components/common/Cylinders';
import riseWithSapHeroImg from "../../../assets/wysele-risewithsaphero.webp";

const RiseWithsaphero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-full min-h-screen lg:h-[calc(100vh-68px)] flex items-end overflow-hidden font-sans bg-black pt-[140px] lg:pt-0">
            {/* Background Image */}
            <img
                src={riseWithSapHeroImg}
                alt="RISE with SAP Services"
                className="absolute inset-0 w-full h-full object-cover object-[70%] lg:object-center z-0"
            />

            {/* Responsive overlay: Solid dark on mobile, elegant gradient on desktop */}
            <div className="absolute inset-0 bg-black/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/85 lg:via-black/50 lg:to-transparent z-10" />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content Container */}
            <div className="relative z-20 w-full pb-8 sm:pb-10 lg:pb-12 pt-32">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full">
                    
                    {/* Content Column */}
                    <div className="max-w-4xl w-full">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight mb-6"
                        >
                            Modernize Operations with <span className="text-white font-semibold">Scalable SAP Cloud Solutions</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="text-sm sm:text-base font-semibold text-white leading-relaxed"
                        >
                            <Link to="/services/rise-with-sap" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/rise-with-sap" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">RISE with SAP</Link></Link> Services for Enterprise Agility and Business Transformation
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="w-12 h-[1.5px] bg-[#FFB703]/60 my-5" 
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal"
                        >
                            Businesses today need flexible systems that support growth, improve operational efficiency, and simplify complex business processes. Many organizations still rely on disconnected systems, outdated workflows, and infrastructure that slows down productivity and decision-making. <Link to="/services/rise-with-sap" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/rise-with-sap" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">RISE with SAP</Link></Link> helps businesses modernize operations through cloud-based solutions, integrated services, and process optimization tools designed to support long-term business transformation.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                            className="w-12 h-[1.5px] bg-[#FFB703]/60 my-5" 
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal"
                        >
                            Wysele provides <Link to="/services/rise-with-sap" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/rise-with-sap" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">RISE with SAP</Link></Link> consulting and implementation services that help organizations improve workflow visibility, simplify enterprise operations, and build scalable digital environments that support business growth. Our consultants work closely with businesses to understand operational challenges, identify process gaps, and create transformation strategies aligned with long-term business goals.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65, ease: [0.33, 1, 0.68, 1] }}
                            className="pt-6"
                        >
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e0a100] text-gray-900 font-semibold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
                            >
                                Schedule a Consultation
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2} />
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RiseWithsaphero;
