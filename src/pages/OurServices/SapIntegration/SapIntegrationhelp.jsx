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
            img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
        },
        {
            title: "Implementation",
            desc: "Leveraging proven methodologies to create seamless connections and harmonious system operations.",
            img: "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg"
        },
        {
            title: "Testing & Optimization",
            desc: "Thorough testing and continuous monitoring to ensure flawless performance and adaptability.",
            img: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg"
        },
        {
            title: "Ongoing Support",
            desc: "Continuous maintenance and support services to ensure long-term system performance and reliability.",
            img: "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg"
        }
    ];

    return (
        <section className="pt-4 pb-16 bg-white font-inter">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">

                {/* Header */}
                <div className="mb-10 text-center mx-auto" data-aos="fade-up">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C9184A] mb-3 block">Our Methodology</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-gray-900 tracking-tight leading-tight max-w-2xl mx-auto">
                        A structured approach to <br /> enterprise-wide integration
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative p-5 md:p-7 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100 min-h-[160px] flex flex-col justify-center"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                {/* Background Image */}
                                <img 
                                    src={step.img} 
                                    alt={step.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-300" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-200 text-[13px] font-normal leading-relaxed max-w-sm opacity-95">
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
