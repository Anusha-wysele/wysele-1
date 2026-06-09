import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Eye, Server, Target, Users, Zap } from 'lucide-react';
import { useRef } from 'react';
import Cylinders from '../../../components/common/Cylinders';
import sapConsultingTechnicalImg from '../../../assets/wysele-sapconsultingtechnical.webp';

const services = [
    { 
        title: "SAP Migration and Upgrades", 
        description: "We support secure SAP migrations and version upgrades, including SAP ECC to SAP S/4HANA transitions. Our migration strategy prioritizes data accuracy, continuity, and reduced downtime." 
    },
    { 
        title: "Custom SAP Development", 
        description: "Our team develops custom SAP applications, workflows, reports, and integrations that match your operational requirements and business processes." 
    },
    { 
        title: "SAP Integration Services", 
        description: "We help integrate SAP systems with CRM platforms, ERP tools, HR software, finance applications, eCommerce platforms, and third-party business tools." 
    },
    { 
        title: "Data Migration Services", 
        description: "Data quality plays a major role in SAP performance. We ensure structured data migration with validation, cleansing, mapping, and testing processes." 
    },
    { 
        title: "SAP Cloud Solutions", 
        description: <>Wysele supports <Link to="/services/sap-consulting" className="hover:underline transition-colors decoration-[#C9184A] underline-offset-4 text-inherit font-medium">SAP cloud environments</Link> that improve flexibility, scalability, accessibility, and infrastructure efficiency for growing organizations.</> 
    },
    { 
        title: "SAP Performance Optimization", 
        description: "We monitor and optimize SAP systems to improve speed, usability, reporting accuracy, and operational efficiency." 
    }
];

const TechnicalConsulting = () => {
    const sectionRef = useRef(null);

    const servicesHeadingRef = useRef(null);
    const isServicesHeadingInView = useInView(servicesHeadingRef, { once: true, margin: "-80px" });
    const servicesWords = "Technical SAP Consulting Services".split(" ");

    return (
        <div className="bg-white" ref={sectionRef}>
            {/* Full Width Image with Overlay Text */}
            <div className="w-full relative min-h-[90vh] lg:min-h-[75vh] flex items-center bg-black overflow-hidden py-16 lg:py-0">
                <img loading="lazy" src={sapConsultingTechnicalImg}
                    alt="Technical SAP Consulting"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/65"></div>
                <Cylinders />

                <div className="w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left Side Content: Heading & Description */}
                    <div className="lg:col-span-5 text-left space-y-4">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                            Trusted by Businesses Looking for <br />
                            Long-Term SAP Success
                        </h2>
                        <div className="text-xs sm:text-sm text-white/80 leading-relaxed space-y-3 font-normal">
                            <p>
                                Organizations choose Wysele because we focus on practical implementation strategies, operational clarity, and long-term system performance.
                            </p>
                            <p>
                                Our SAP consultants work closely with internal teams to reduce project risks, improve communication, and support successful adoption across departments.
                            </p>
                        </div>
                    </div>

                    {/* Right Side Content: 5 Badges in a Row */}
                    <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-5 gap-4 lg:gap-6 pt-4 lg:pt-0">
                        {[
                            {
                                title: "Faster Implementation Support",
                                icon: <Zap className="w-5 h-5 text-[#FFB703]" />
                            },
                            {
                                title: "Improved Process Visibility",
                                icon: <Eye className="w-5 h-5 text-[#FFB703]" />
                            },
                            {
                                title: "Better User Adoption",
                                icon: <Users className="w-5 h-5 text-[#FFB703]" />
                            },
                            {
                                title: "Scalable SAP Environments",
                                icon: <Server className="w-5 h-5 text-[#FFB703]" />
                            },
                            {
                                title: "Long-Term Optimization Support",
                                icon: <Target className="w-5 h-5 text-[#FFB703]" />
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 rounded-full border border-[#FFB703] bg-black/40 flex items-center justify-center shadow-md">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] sm:text-xs text-white font-medium leading-tight px-1 max-w-[120px]">
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Angled Color Accent at the bottom */}
                <div
                    className="absolute bottom-0 right-0 w-full h-32 sm:h-48 md:h-64 lg:h-80 bg-[#6b0d2b]/80 backdrop-blur-sm pointer-events-none"
                    style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
                ></div>
            </div>

            <div className="py-16">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                        {/* Left side heading and description */}
                        <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
                            <h2 className="text-3xl font-normal text-gray-900 mb-6 flex flex-wrap gap-x-2" ref={servicesHeadingRef}>
                                {servicesWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isServicesHeadingInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h2>
                        </div>

                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <div className="space-y-4 pl-8">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative flex items-center group"
                                        whileHover="hover"
                                        initial="initial"
                                    >
                                        {/* + / Arrow indicator sitting on the vertical line */}
                                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center z-10">
                                            <span className="absolute text-gray-400 text-lg font-light transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">+</span>
                                            <ArrowRight className="absolute text-[#455982] opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" size={16} />
                                        </div>

                                        {/* Card */}
                                        <div className="relative border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden w-full">
                                            {/* Sliding background overlay */}
                                            <motion.div
                                                variants={{
                                                    initial: { clipPath: "inset(0 100% 0 0)" },
                                                    hover: { clipPath: "inset(0 0 0 0)" }
                                                }}
                                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                className="absolute inset-0 bg-[#455982] rounded-lg"
                                            />
                                            <div className="relative z-10">
                                                <h3 className="text-xs font-bold text-gray-900 mb-1 group-hover:text-white transition-colors duration-300">{service.title}</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{service.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalConsulting;
