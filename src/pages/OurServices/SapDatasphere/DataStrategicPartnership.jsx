import {
  ArrowsMerge,
  CornersOut,
  Gear,
  Monitor,
  Target
} from "@phosphor-icons/react";
import { motion } from 'framer-motion';
import sapDatasphereStrategic1Img from "../../../assets/wysele-sapdataspherestrategic1.webp";
import sapDatasphereStrategic2Img from "../../../assets/wysele-sapdataspherestrategic2.webp";

const DataStrategicPartnership = () => {
    const points = [
        {
            text: "Continuous SAP support & enhancement for sustained performance",
            icon: <Gear size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Proactive monitoring & optimization to ensure system efficiency and reliability",
            icon: <Monitor size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Seamless data integration & management for unified and actionable insights",
            icon: <ArrowsMerge size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Scalable support model aligned with evolving business and data needs",
            icon: <CornersOut size={20} weight="light" className="text-white mt-0.5" />
        },
        {
            text: "Outcome-Driven Approach focused on performance, agility, and long-term value",
            icon: <Target size={20} weight="light" className="text-white mt-0.5" />
        }
    ];

    return (
        <section className="pt-4 pb-10 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Left side label/description - matching Signavio layout logic */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-sm py-8 px-6 shadow-sm relative overflow-hidden group h-full flex flex-col justify-center min-h-[300px]"
                        >
                            {/* Background Image with dark overlay for text readability */}
                            <div className="absolute inset-0 z-0">
                                <img loading="lazy" src={sapDatasphereStrategic1Img} 
                                    className="w-full h-full object-cover object-[center_75%] transition-transform duration-700 group-hover:scale-110" 
                                    alt="Partner Background" 
                                />
                                <div className="absolute inset-0 bg-black/50 transition-colors duration-700 group-hover:bg-black/60" />
                            </div>

                            <div className="relative z-10 w-full mt-20">
                                <span className="text-white drop-shadow-md text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">
                                    Strategic Partnership
                                </span>
                                <h2 className="text-xl md:text-2xl font-light text-white drop-shadow-lg leading-tight mb-4 tracking-tight max-w-[260px]">
                                    Maximizing Value with<br />
                                    <span className="font-semibold text-white drop-shadow-lg">SAP Support Services</span>
                                </h2>
                                <p className="text-white drop-shadow-md text-sm font-medium leading-relaxed max-w-md">
                                    We help you unlock the full potential of your SAP landscape through tailored support models that grow with your organizational needs.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: The Boxed Content - exact size/padding matching Signavio Strengths */}
                    <div className="w-full lg:w-1/2 lg:mt-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-sm py-4 px-5 shadow-sm relative overflow-hidden group"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img loading="lazy" src={sapDatasphereStrategic2Img} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    alt="Background" 
                                    />
                                <div className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/40" />
                            </div>

                            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                                <h2 className="text-lg font-light text-white drop-shadow-lg mb-2 tracking-tight">
                                    Why <span className="font-semibold text-[#8B3A5E]">Wysele</span> for SAP Support?
                                </h2>
                                
                                <ul className="space-y-1.5">
                                    {points.map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="shrink-0 drop-shadow-md">
                                                {item.icon}
                                            </div>
                                            <p className="text-xs text-white drop-shadow-md leading-snug font-medium">
                                                {item.text}
                                            </p>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DataStrategicPartnership;
