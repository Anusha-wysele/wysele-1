import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import fdeImg from '../../assets/Wysele-FDE.webp';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Lightbulb, Blocks, Network, Rocket, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const responsibilities = [
  { title: "Business Process Analysis", icon: Activity },
  { title: "AI Opportunity Identification", icon: Lightbulb },
  { title: "Solution Architecture Design", icon: Blocks },
  { title: "Enterprise Integration", icon: Network },
  { title: "AI Implementation & Deployment", icon: Rocket },
  { title: "Governance & Compliance Support", icon: ShieldCheck },
  { title: "Performance Optimization", icon: TrendingUp },
  { title: "User Adoption & Change Mgmt", icon: Users }
];

const FdeHero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-white w-full">
            <section className="relative w-full overflow-hidden mt-[60px] bg-white min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col justify-end pb-8 lg:pb-12">
                {/* Breadcrumbs Overlay */}
                <div className="absolute top-[-90px] md:top-[-90px] left-0 w-full h-0 z-50">
                    <Breadcrumbs />
                </div>

                {/* Background Image & Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={fdeImg}
                        alt="FDE Services"
                        className="w-full h-full object-cover object-center block"
                    />
                    <div className="absolute inset-0 bg-black/20 lg:bg-gradient-to-r lg:from-black/50 lg:via-black/10 lg:to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pb-12 sm:pb-16 lg:pb-16 pt-32">
                    <div className="max-w-2xl">
                        <motion.h4
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-[#FFB703] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3"
                        >
                            Forward-Deployed Engineering (<Link to="/services/fde" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>FDE</Link>) Services
                        </motion.h4>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-6"
                        >
                            Transforming AI Vision into Measurable Business Outcomes
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                                At Wysele Technologies, our Forward-Deployed Engineering (<Link to="/services/fde" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>FDE</Link>) Services help organizations accelerate AI adoption by embedding experienced engineers directly into business and technology teams. We work alongside your stakeholders to design, build, deploy, and optimize AI-powered solutions that create measurable business impact.
                            </p>
                            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                                Powered by our proprietary Generative AI and Agentic AI solutions, we help enterprises reduce implementation complexity, improve adoption, and unlock faster value from AI investments.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8"
                        >
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 py-3 bg-[#FFB703] hover:bg-[#e0a100] text-gray-900 font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-all shadow-sm w-fit"
                            >
                                Talk to an Expert
                                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Responsibilities Floating Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="relative z-30 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 w-full -mt-4 sm:-mt-6 lg:-mt-10"
            >
                <div className="bg-white rounded-2xl lg:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-gray-100 p-5 md:p-6 lg:py-8 lg:px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 gap-x-2 lg:gap-x-0">
                        {responsibilities.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div 
                                    key={index} 
                                    className="relative flex flex-col items-center justify-between text-center px-1 lg:px-2 group/item min-h-[90px] lg:border-r border-gray-200/50 last:border-r-0 cursor-pointer overflow-hidden py-2"
                                    whileHover="hover"
                                    initial="initial"
                                >
                                    <motion.div
                                        variants={{
                                            initial: { clipPath: "inset(0 100% 0 0)" },
                                            hover: { clipPath: "inset(0 0 0 0)" }
                                        }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 bg-[#455982] z-0"
                                    />
                                    <div className="relative z-10 flex flex-col items-center justify-between h-full w-full">
                                        <div className="text-blue-600 mb-3 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-white">
                                            <Icon className="w-7 h-7" strokeWidth={1.8} />
                                        </div>
                                        <p className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight max-w-[125px] mt-auto transition-colors duration-300 group-hover/item:text-white">
                                            {service.title}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FdeHero;
