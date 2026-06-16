import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Briefcase,
  Check,
  Factory,
  HeartPulse,
  Landmark,
  Monitor,
  ShoppingCart,
  Truck,
  Zap
} from 'lucide-react';
import { useRef } from 'react';

const industries = [
    { name: "Manufacturing", icon: <Factory className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Retail & eCommerce", icon: <ShoppingCart className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Healthcare", icon: <HeartPulse className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Logistics & Supply Chain", icon: <Truck className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Banking & Financial Services", icon: <Landmark className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Energy & Utilities", icon: <Zap className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Technology", icon: <Monitor className="w-6 h-6 text-[#C9184A]" /> },
    { name: "Professional Services", icon: <Briefcase className="w-6 h-6 text-[#C9184A]" /> }
];

const benefits = [
    "Better process visibility",
    "Increased operational transparency",
    "Faster operational decision-making",
    "Stronger governance frameworks",
    "Improved workflow efficiency",
    "Better process standardization",
    "Reduced operational bottlenecks",
    "Continuous operational improvement",
    "Enhanced collaboration",
    "Improved scalability and agility"
];

// Animation configuration
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" } 
    }
};

const benefitVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" } 
    }
};

const SignavioIndustrieswesupport = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section className="bg-white py-12 md:py-16" ref={sectionRef}>
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column: Industries We Support */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
                    >
                        <div className="text-center mb-8 flex flex-col items-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-3">
                                Industries We Support
                            </h2>
                            <div className="w-12 h-1 bg-[#800000] rounded" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                            {industries.map((ind, i) => (
                                <motion.div 
                                    key={i} 
                                    variants={cardVariants}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100/80 hover:shadow-md hover:border-[#800000]/20 transition-all duration-300 h-28 cursor-pointer group"
                                >
                                    <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                                        {ind.icon}
                                    </div>
                                    <span className="text-[11px] sm:text-xs font-bold text-gray-950 leading-tight">
                                        {ind.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Benefits of SAP Signavio Solutions */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
                    >
                        <div className="text-center mb-8 flex flex-col items-center">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mb-3">
                                Benefits of SAP Signavio Solutions
                            </h2>
                            <div className="w-12 h-1 bg-[#800000] rounded" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 my-auto">
                            {benefits.map((benefit, i) => (
                                <motion.div 
                                    key={i} 
                                    variants={benefitVariants}
                                    className="flex items-center gap-3.5 text-left group cursor-default"
                                >
                                    <div className="w-5 h-5 rounded-full bg-[#800000] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
                                    </div>
                                    <span className="text-xs sm:text-[13px] text-gray-700 font-medium leading-tight transition-colors duration-300 group-hover:text-[#800000]">
                                        {benefit}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default SignavioIndustrieswesupport;

