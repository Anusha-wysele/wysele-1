import { motion } from "framer-motion";
import webDevServices1 from "../../assets/wysele-webdevelopmentservices1.webp";
import webDevServices2 from "../../assets/wysele-webdevelopmentservices2.webp";

const SERVICES_OFFERED = [
    {
        title: "Frontend Development",
        desc: "Craft modern, responsive user interfaces that deliver seamless digital experiences."
    },
    {
        title: "Backend Development",
        desc: "Build secure and scalable server-side systems for reliable performance."
    },
    {
        title: "Full Stack Development",
        desc: "Develop complete end-to-end applications with integrated frontend and backend."
    },
    {
        title: "E-commerce Solutions",
        desc: "Create scalable online platforms with secure and smooth shopping experiences."
    },
    {
        title: "API Development",
        desc: "Enable seamless system communication with robust and secure APIs."
    },
    {
        title: "Maintenance & Support",
        desc: "Ensure consistent performance with ongoing updates and technical support."
    }
];

export default function WebServicesweoffer() {
    return (
        <section className="pt-16 pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                {/* Header Section */}
                <div className="mb-12 flex items-stretch gap-4">
                    <motion.div 
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        className="w-1 bg-[#800000] origin-top"
                    />
                    <motion.h2 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight"
                    >
                        Services We Offer
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Services List */}
                    <div className="lg:col-span-6 relative pl-4 py-4">
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200" />
                        
                        <div className="flex flex-col gap-y-3">
                            {SERVICES_OFFERED.map((service, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <h3 className="text-gray-900 text-base font-semibold tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-700 text-xs md:text-sm font-normal leading-relaxed tracking-tight mt-0.5">
                                        {service.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Layered Image Showcase */}
                    <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center lg:items-start">
                        <div className="relative w-full">
                            {/* Base Image (Monochrome Workspace - Restored to 16/9) */}
                            <motion.div 
                                initial={{ opacity: 0, x: 0, y: 20 }}
                                whileInView={{ opacity: 1, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 60, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="relative z-0 overflow-hidden rounded-sm shadow-xl border border-gray-100 aspect-[16/9] w-full"
                            >
                                <img 
                                    src={webDevServices1} 
                                    alt="Workspace Base" 
                                    className="w-full h-full object-cover"
                                />
                                {/* Subtle Right-to-Left Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Overlapping Top Image (MacBook Pro - Floating Layer) */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20, y: 60 }}
                                whileInView={{ 
                                    opacity: 1, 
                                    x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : -20, 
                                    y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40 
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                className="absolute bottom-[-20px] md:bottom-[-40px] left-0 md:left-[-20px] w-full aspect-[16/9] z-10 overflow-hidden rounded-sm shadow-2xl"
                            >
                                <img 
                                    src={webDevServices2} 
                                    alt="Modern Setup" 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
