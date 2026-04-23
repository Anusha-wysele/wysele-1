import React from 'react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Settings, 
    Activity, 
    ShieldCheck,
    ArrowUpRight 
} from 'lucide-react';

const SapIntegrationHelp = () => {
    const steps = [
        {
            title: "Consultation & Strategy",
            desc: "Comprehensive assessment of business needs and IT architecture to develop an aligned integration strategy.",
            icon: <Search className="w-5 h-5" />
        },
        {
            title: "Implementation",
            desc: "Leveraging proven methodologies to create seamless connections and harmonious system operations.",
            icon: <Settings className="w-5 h-5" />
        },
        {
            title: "Testing & Optimization",
            desc: "Thorough testing and continuous monitoring to ensure flawless performance and adaptability.",
            icon: <Activity className="w-5 h-5" />
        },
        {
            title: "Ongoing Support",
            desc: "Continuous maintenance and support services to ensure long-term system performance and reliability.",
            icon: <ShieldCheck className="w-5 h-5" />
        }
    ];

    return (
        <section className="pt-4 pb-16 bg-gray-50/50 font-inter">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                
                {/* Header */}
                <div className="mb-8 text-center mx-auto">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9184A] mb-3 block">Our Methodology</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 tracking-tight leading-tight max-w-2xl mx-auto">
                        A structured approach to <br /> enterprise-wide integration
                    </h2>
                </div>

                {/* Cards Grid: 2 Cards per Column (2 Columns) */}
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative bg-[#800000] p-5 md:p-7 rounded-xl border border-black shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
                            >
                                {/* Slide-down background layer */}
                                <div className="absolute inset-0 bg-[#C9A84C] -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                                        {step.title}
                                    </h3>
                                    
                                    <p className="text-gray-200 text-[13px] font-light leading-relaxed max-w-sm">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SapIntegrationHelp;
