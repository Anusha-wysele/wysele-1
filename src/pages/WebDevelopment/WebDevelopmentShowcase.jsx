import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TABS = [
    {
        id: "ecommerce",
        label: "E-Commerce",
        title: "Scalable Storefronts",
        subtitle: "High-Performance Digital Commerce",
        description: "Delivering bespoke e-commerce platforms with headless architecture and seamless ERP integrations. We focus on conversion optimization, multi-currency support, and mobile-first storefronts that drive global growth.",
        image: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg"
    },
    {
        id: "enterprise",
        label: "Enterprise Apps",
        title: "Operational Excellence",
        subtitle: "Custom Business Logic Solutions",
        description: "Building robust enterprise software designed to streamline complex corporate workflows. From advanced data management to automated reporting, we create secure tools that scale alongside your organizational needs.",
        image: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
    },
    {
        id: "portals",
        label: "Web Portals",
        title: "Engaging Gateways",
        subtitle: "High-Traffic Digital Experiences",
        description: "Crafting intuitive web portals that prioritize user engagement and brand identity. We leverage modern frameworks to ensure sub-second load times, interactive features, and seamless navigation for diverse global audiences.",
        image: "https://images.unsplash.com/photo-1678227547330-7b17f29fd1ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8"
    },
    {
        id: "pwa",
        label: "Mobile PWAs",
        title: "App-Like Web Apps",
        subtitle: "Seamless Mobile Connectivity",
        description: "Developing Progressive Web Apps that offer offline functionality, push notifications, and native-app performance directly within the browser. We eliminate the friction of app stores while maximizing reach and user retention.",
        image: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg"
    }
];

export default function WebDevelopmentShowcase() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <section className="pt-4 pb-0 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <div className="mb-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                        Our Project Showcase
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed">
                        Explore our diverse portfolio of high-impact digital solutions, where innovation meets functionality to drive business success.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-1 border-b border-gray-100 pb-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab)}
                            className={`relative pb-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                                activeTab.id === tab.id ? "text-black" : "text-gray-400 hover:text-gray-600"
                            }`}
                        >
                            {tab.label}
                            {activeTab.id === tab.id && (
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area - Full Width Background */}
            <div className="relative bg-[#1A222E] overflow-hidden w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.id}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: { duration: 0.4, staggerChildren: 0.1 }
                            },
                            exit: { 
                                opacity: 0,
                                transition: { duration: 0.3 }
                            }
                        }}
                        className="max-w-7xl mx-auto flex flex-col md:flex-row w-full"
                    >
                        {/* Left Content */}
                        <div className="flex-1 p-8 md:p-12 lg:p-16 lg:pl-20 flex flex-col justify-center space-y-4">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: -40 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
                                    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
                                }}
                                className="space-y-3"
                            >
                                <h3 className="text-white text-xl md:text-2xl font-semibold">
                                    {activeTab.title}
                                </h3>
                                <div className="w-10 h-[1px] bg-[#4BDE7B]/30" />
                                <h4 className="text-white font-medium text-base md:text-lg">
                                    {activeTab.subtitle}
                                </h4>
                            </motion.div>
                            
                            <motion.p 
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
                                    exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } }
                                }}
                                className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg"
                            >
                                {activeTab.description}
                            </motion.p>
                        </div>

                        {/* Right Image (Slides from Right) */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, x: 40, scale: 0.95 },
                                visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
                                exit: { opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
                            }}
                            className="flex-1 relative flex items-center justify-center p-6 md:p-12 lg:pr-20 group mb-6 md:mb-0"
                        >
                            
                            {/* Main Container for Image and Offset Border */}
                            <div className="relative w-full max-w-[550px] h-[250px] sm:h-[300px] md:h-[400px]">
                                
                                {/* Offset Border Box (Moved Up and Left) */}
                                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full overflow-hidden p-[2px] z-0 shadow-lg bg-[#800000] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1">
                                    {/* Hollow Center */}
                                    <div className="absolute inset-[2px] bg-[#1A222E]" />
                                </div>

                                {/* Inner Content (Image) */}
                                <div className="relative w-full h-full bg-[#1A222E] z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                                    <motion.img
                                        src={activeTab.image}
                                        alt={activeTab.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
