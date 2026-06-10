import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cylinders from '../../../components/common/Cylinders';
import sapSignavioHeroImg from "../../../assets/wysele-sapsignaviohero.webp";

const AnimatedNumber = ({ value, duration = 1200, delay = 200 }) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        let active = true;
        const startTimeout = setTimeout(() => {
            let start = 0;
            const end = value;
            if (start === end) return;

            const incrementTime = Math.max(Math.floor(duration / end), 15);
            const step = Math.ceil(end / (duration / incrementTime));

            const timer = setInterval(() => {
                if (!active) return;
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);

            return () => {
                clearInterval(timer);
            };
        }, delay);

        return () => {
            active = false;
            clearTimeout(startTimeout);
        };
    }, [value, duration, delay]);

    return <>{count}</>;
};

const SapSignavioHero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-full min-h-screen lg:h-[calc(100vh-68px)] flex items-end overflow-hidden font-sans bg-black pt-[140px] lg:pt-0">
            {/* Background Image */}
            <img
                src={sapSignavioHeroImg}
                alt="SAP Signavio"
                className="absolute inset-0 w-full h-full object-cover object-[70%] lg:object-center z-0"
            />

            {/* Responsive overlay: Solid dark on mobile, elegant gradient on desktop */}
            <div className="absolute inset-0 bg-black/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/85 lg:via-black/50 lg:to-transparent z-10" />

            {/* Decorative Cylinders */}
            <Cylinders />

            {/* Content Container */}
            <div className="relative z-20 w-full pb-8 sm:pb-10 lg:pb-12 pt-32">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                    
                    {/* Left Column: Content */}
                    <div className="max-w-2xl w-full">
                        <motion.h1
                            initial={{ opacity: 1, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight mb-6"
                        >
                            Transform Business Operations with SAP <span className="text-[#FFB703] font-semibold">Signavio Services</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            className="text-sm sm:text-base font-semibold text-white leading-relaxed"
                        >
                            Improve Process Visibility, Workflow Efficiency, and Operational Agility
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="w-12 h-[1.5px] bg-[#FFB703]/60 my-5" 
                        />

                        <motion.p
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal"
                        >
                            Wysele delivers <Link to="/services/sap-signavio" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-signavio" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Signavio</Link></Link> consulting and implementation services that help organizations streamline workflows, improve collaboration, strengthen process governance, and support continuous operational improvement across departments.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                            className="w-12 h-[1.5px] bg-[#FFB703]/60 my-5" 
                        />

                        <motion.p
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal"
                        >
                            Whether your business is preparing for <Link to="/services/sap-s4hana" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-s4hana" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP S/4HANA</Link></Link> transformation, modernizing legacy workflows, or improving operational transparency, our <Link to="/services/sap-signavio" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-signavio" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP Signavio</Link></Link> experts help create scalable and data-driven process environments that support business growth and operational excellence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65, ease: [0.33, 1, 0.68, 1] }}
                            className="pt-6"
                        >
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e0a100] text-gray-900 font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
                            >
                                Schedule a Consultation
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: Floating Badges (Visible on desktop/large screens) */}
                    <div className="hidden lg:flex flex-col gap-5 w-full max-w-[300px] mr-4 flex-shrink-0">
                        {/* Card 1: Process Intelligence */}
                        <motion.div
                            initial={{ opacity: 1, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-start"
                        >
                            <span className="text-xs sm:text-[13px] font-bold text-gray-800 tracking-tight mb-3">Process Intelligence</span>
                            <div className="flex items-center gap-4">
                                <svg className="w-14 h-14 flex-shrink-0" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F1F1" strokeWidth="3" />
                                    <motion.circle 
                                        cx="18" 
                                        cy="18" 
                                        r="16" 
                                        fill="none" 
                                        stroke="#800000" 
                                        strokeWidth="3.5"
                                        strokeDasharray="100" 
                                        initial={{ strokeDashoffset: 100 }}
                                        animate={{ strokeDashoffset: 22 }}
                                        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                                        strokeLinecap="round"
                                        transform="rotate(-90 18 18)" 
                                    />
                                </svg>
                                <div className="flex flex-col">
                                    <span className="text-xl font-extrabold text-[#800000] leading-none">
                                        <AnimatedNumber value={78} delay={200} />%
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5 leading-tight">Process Efficiency</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Bottlenecks Identified */}
                        <motion.div
                            initial={{ opacity: 1, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-start"
                        >
                            <span className="text-xs sm:text-[13px] font-bold text-gray-800 tracking-tight mb-1">Bottlenecks Identified</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-extrabold text-[#800000]">
                                    <AnimatedNumber value={46} delay={400} />
                                </span>
                            </div>
                            <svg className="w-full h-11 mt-1" viewBox="0 0 200 60">
                                <defs>
                                    <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#800000" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#800000" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <motion.path 
                                    d="M 0 50 Q 25 20, 50 40 T 100 25 T 150 45 T 200 30 L 200 60 L 0 60 Z" 
                                    fill="url(#waveGrad)" 
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.2, delay: 1.0 }}
                                />
                                <motion.path 
                                    d="M 0 50 Q 25 20, 50 40 T 100 25 T 150 45 T 200 30" 
                                    fill="none" 
                                    stroke="#800000" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                                />
                            </svg>
                        </motion.div>

                        {/* Card 3: Workflow Performance */}
                        <motion.div
                            initial={{ opacity: 1, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-start"
                        >
                            <span className="text-xs sm:text-[13px] font-bold text-gray-800 tracking-tight mb-2">Workflow Performance</span>
                            <div className="flex items-end justify-between gap-1.5 h-12 mt-1.5 w-full">
                                {[40, 25, 55, 30, 65, 45, 50, 75, 35, 60].map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="w-2 rounded-t-sm" 
                                        initial={{ height: "0%" }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 1.2, delay: 0.6 + i * 0.05, ease: "easeOut" }}
                                        style={{ 
                                            backgroundColor: i % 2 === 0 ? '#800000' : '#C9184A'
                                        }} 
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SapSignavioHero;
