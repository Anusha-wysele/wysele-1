import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Building2 } from 'lucide-react';
import { MapPinSimpleArea, TrainRegional, HeadCircuit, Headset, HandFist } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CountUpNumber = ({ end, duration, startTrigger, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startTrigger) return;

        let start = 0;
        const endNum = parseInt(end.replace(/\D/g, ''));
        const totalSteps = 60;
        const increment = endNum / totalSteps;
        const intervalTime = duration / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= endNum) {
                setCount(endNum);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [end, duration, startTrigger]);

    return <span>{count}{suffix}</span>;
};

const SimnStats = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        {
            icon: <TrainRegional size={24} weight="thin" className="text-gray-700" />,
            value: "25",
            suffix: "+",
            label: "Happy Clients & Growing"
        },
        {
            icon: <Headset size={24} weight="thin" className="text-gray-700" />,
            value: "20000",
            suffix: "+",
            label: "Hours of Monthly Support"
        },
        {
            icon: <HeadCircuit size={24} weight="thin" className="text-gray-700" />,
            value: "100",
            suffix: "+",
            label: "Skilled Consultants"
        },
        {
            icon: <HandFist size={24} weight="thin" className="text-gray-700" />,
            value: "20",
            suffix: "+",
            label: "Years Leadership"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-card-simn", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="pb-8 md:pb-12 pt-0 bg-white overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-12">

                {/* Operating Locations Section */}
                <div className="text-center mb-6 md:mb-10 space-y-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <MapPinSimpleArea size={32} weight="thin" className="text-red-600" />
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Operating Locations</h2>
                    </div>
                    <div className="w-12 h-0.5 bg-red-600 mx-auto"></div>
                    <h3 className="text-2xl md:text-4xl font-light text-gray-900 max-w-4xl mx-auto leading-tight tracking-tight">
                        Our Global Presence
                    </h3>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed max-w-3xl mx-auto font-light">
                        Our strategic locations form the foundation of our worldwide reach, empowering us to provide seamless services and support to clients globally.
                    </p>
                </div>

                {/* Location Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-10 max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-5 md:p-6 rounded-xl space-y-2 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                            <ShieldCheck className="w-4 h-4 text-red-600" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900">India Headquarters</h4>
                        <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed font-light">
                            Wysele Technologies<br />
                            #308 4th floor DSL Abacus IT Park,<br />
                            Survey Colony, Industrial Development Area,<br />
                            Uppal, Hyderabad, Telangana 500039.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-5 md:p-6 rounded-xl space-y-2 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                            <Building2 className="w-4 h-4 text-red-600" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900">USA Regional Office</h4>
                        <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed font-light">
                            Wysele Technologies<br />
                            5900 Balcones Drive STE 100<br />
                            Austin, TX 78731
                        </p>
                    </div>
                </div>

                {/* Grid Counters */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="stat-card-simn p-4 flex flex-col items-center text-center space-y-3"
                        >
                            {/* Icon */}
                            <div className="p-3 bg-gray-50 rounded-full text-red-600">
                                {stat.icon}
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light font-montserrat text-gray-900 tracking-tighter">
                                    <CountUpNumber
                                        end={stat.value}
                                        duration={2000}
                                        startTrigger={inView}
                                        suffix={stat.suffix}
                                    />
                                </h3>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-montserrat font-bold text-gray-400">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SimnStats;