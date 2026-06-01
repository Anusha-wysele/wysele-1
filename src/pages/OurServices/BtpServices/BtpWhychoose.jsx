import { motion } from 'framer-motion';
import { LifeBuoy, ShieldCheck, Target } from 'lucide-react';

const chooseData = [
    {
        title: "Comprehensive Expertise",
        desc: "Our certified consultants have extensive experience with the complete capabilities of SAP Business Technology Platform (BTP). This includes in-depth knowledge of data management, integration techniques, and the latest advancements in artificial intelligence and cloud solutions. With our expertise, we can guide your organization through the complexities of implementing and maximizing SAP BTP to drive innovation.",
        icon: ShieldCheck,
        badge: "Certified Team"
    },
    {
        title: "Tailored Solutions",
        desc: "We recognize that every business is unique, which is why we develop customized BTP services and solutions that align closely with your specific business objectives. Our team works collaboratively with you to identify opportunities for leveraging SAP BTP to gain a competitive advantage, enhance operational efficiencies, and foster an environment of ongoing innovation.",
        icon: Target,
        badge: "Business Aligned"
    },
    {
        title: "End-to-End Support",
        desc: "We pride ourselves on providing comprehensive support throughout your journey with SAP BTP. From the initial consultation phase, where we assess your needs and requirements, to the implementation of your solution, and through to ongoing management and optimization, our team is dedicated to ensuring that your SAP BTP ecosystem performs at its highest potential.",
        icon: LifeBuoy,
        badge: "Full Lifecycle"
    }
];

const BtpWhychoose = () => {
    return (
        <section className="pt-4 pb-20 bg-white">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                
                {/* Section Title with Screenshot-Style Underline */}
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#1e293b] mb-2">
                        <span className="relative">
                            Why Choose
                            <div className="absolute -bottom-2 left-0 w-full h-[1px] bg-gray-300" />
                        </span> SAP BTP with Us?
                    </h2>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {chooseData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            className="relative py-3 px-6 border border-gray-200 bg-white flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Centered Icon */}
                            <div className="mt-2 mb-2 text-[#334155]">
                                <item.icon size={24} strokeWidth={1} />
                            </div>

                            {/* Heading - Now using the Accent Yellow Color */}
                            <h3 className="text-sm font-bold text-[#FFD700] mb-1.5 font-['Inter']">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[12px] text-[#334155] leading-relaxed pb-1 font-normal">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BtpWhychoose;
