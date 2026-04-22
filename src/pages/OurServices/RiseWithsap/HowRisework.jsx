import { motion } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';
import { 
    MagnifyingGlass, 
    MapTrifold, 
    GearSix, 
    ArrowsClockwise 
} from "@phosphor-icons/react";

const steps = [
    {
        title: "Assessment",
        icon: <MagnifyingGlass size={24} weight="light" />,
        description: "The journey begins with a thorough analysis of your current business processes. Our team works to understand your unique challenges and strategic goals, setting the foundation for effective transformation."
    },
    {
        title: "Transformation Plan",
        icon: <MapTrifold size={24} weight="light" />,
        description: "Based on your specific needs, we develop a customized roadmap outlining the steps for your business transformation. This plan is designed to align with your organizational objectives and prioritize initiatives that will deliver immediate value."
    },
    {
        title: "Implementation",
        icon: <GearSix size={24} weight="light" />,
        description: "Our expert consultants implement SAP’s best-in-class solutions across your organization. This integration ensures that each solution works cohesively with your existing systems, driving alignment with your overarching business goals."
    },
    {
        title: "Continuous Support",
        icon: <ArrowsClockwise size={24} weight="light" />,
        description: "After implementation, the RISE with SAP framework continues to support your organization by optimizing business processes. We focus on ensuring continuous improvement, allowing your business to adapt and evolve in response to challenges."
    }
];

const Card = ({ step, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="transition-all duration-300 group flex flex-col h-full hover:-translate-y-1"
    >

        
        <div className="p-3 lg:p-4 relative flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="text-white opacity-80 shrink-0">
                    {step.icon}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{step.title}</h3>
            </div>
            <p className="text-xs text-white/90 font-light leading-relaxed flex-grow">{step.description}</p>
        </div>
    </motion.div>
);

const HowRisework = () => {
    return (
        <section
            className="relative z-10 w-full px-6 md:px-16 py-4 md:py-6 flex items-center justify-center bg-white"
            style={{
                backgroundImage: `url("${SERVICES_PAGE_IMAGES.howRiseWorkBg}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Moderate dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative z-10 w-full max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 max-w-3xl drop-shadow-md"
                >
                    <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                        How Does <span className="font-bold text-[#800000] tracking-wide">RISE with SAP</span> Work?
                    </h2>
                    <p className="text-gray-100 leading-relaxed text-xs md:text-[14px]">
                        At Wysele, we follow a proven, structured methodology to ensure your migration to RISE with SAP is seamless, efficient, and aligned with your long-term vision.
                    </p>
                </motion.div>

                {/* Grid layout spanning 2 columns - tighter gaps for closer alignment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full max-w-4xl relative">
                    {/* Vertical separator line for Desktop (between columns) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 z-0" />
                    
                    {/* Horizontal separator line for Desktop (between rows) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
                    {steps.map((step, index) => (
                        <Card key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowRisework;
