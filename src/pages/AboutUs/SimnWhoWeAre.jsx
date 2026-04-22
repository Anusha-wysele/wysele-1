import React, { useState, useEffect, useRef } from 'react';
import { OTHER_PAGE_IMAGES } from '../../components/common/data';

const CountUpNumber = ({ end, duration, startTrigger }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startTrigger) return;

        let start = 0;
        const totalSteps = 60;
        const increment = end / totalSteps;
        const intervalTime = duration / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [end, duration, startTrigger]);

    return <span>{count}%</span>;
};

const SimnWhoWeAre = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    // Skill data based on Wysele's core competencies
    const skills = [
        { name: "SAP S/4HANA Engineering", percentage: 95 },
        { name: "Digital Cloud Enablement", percentage: 88 },
        { name: "Strategic Business Advisory", percentage: 92 },
        { name: "Managed Support Services", percentage: 85 }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-8 md:py-12 bg-white overflow-hidden flex flex-col justify-center relative"
            style={{
                backgroundImage: `url(${OTHER_PAGE_IMAGES.whoWeAre})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12 lg:px-20 w-full font-montserrat relative z-10">

                {/* Section Title */}
                <div className="text-center mb-12 md:mb-20 space-y-4">
                    <p className="text-[12px] md:text-sm uppercase tracking-[0.4em] font-bold text-red-500">
                        Who We Are
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white mx-auto max-w-3xl">
                        Strategic Excellence.<br />
                    </h2>
                    <p className="text-sm md:text-base font-oxygen text-gray-300 leading-relaxed max-w-2xl mx-auto pt-4">
                        We combine structured frameworks with agile execution to accelerate time-to-value for your enterprise through precision-engineered implementations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Columns 1 & 2: Text content (Vision/Mission) */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-montserrat font-bold text-white border-l-2 border-red-600 pl-4">
                                    Our Agency
                                </h3>
                                <p className="text-gray-300 font-oxygen leading-relaxed text-sm md:text-base font-light">
                                    Wysele is one of India's top SAP solution providers, having the technology, capabilities and skills to deliver end-to-end digital solutions for large and medium enterprises.
                                </p>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-montserrat font-bold text-white border-l-2 border-red-600 pl-4">
                                    Our Mission
                                </h3>
                                <p className="text-gray-300 font-oxygen leading-relaxed text-sm md:text-base font-light">
                                    To be the benchmark SAP consulting partner — delivering precision-engineered implementations and intelligent integrations that empower enterprises.
                                </p>
                            </div>
                        </div>

                        {/* Visual Separator */}
                        <div className="w-[80px] h-[1px] bg-red-600/50 mt-12 hidden md:block" />
                    </div>

                    {/* Column 3: Skills / Progress Bars */}
                    <div className="lg:col-span-4 space-y-10" style={{ marginTop: '-80px' }}>
                        {skills.map((skill, index) => (
                            <div key={index} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest font-montserrat font-black text-white">
                                        {skill.name}
                                    </span>
                                    <span className="text-xs md:text-sm font-montserrat font-black text-white tabular-nums">
                                        <CountUpNumber end={skill.percentage} duration={2000} startTrigger={inView} />
                                    </span>
                                </div>
                                <div className="w-full h-1 bg-white/10 relative group overflow-hidden rounded-full">
                                    {/* Animated Progress Bar Fill */}
                                    <div
                                        className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-[2000ms] ease-in-out"
                                        style={{ width: inView ? `${skill.percentage}%` : '0%' }}
                                    >
                                        {/* Minimalist Terminal Indicator */}
                                        <div className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-red-600 bg-white shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SimnWhoWeAre;