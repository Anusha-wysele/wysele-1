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
            value: "60",
            suffix: "+",
            label: "Skilled Consultants"
        },
        {
            icon: <HandFist size={24} weight="thin" className="text-gray-700" />,
            value: "25",
            suffix: "+",
            label: "Years Leadership Experience"
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
            { threshold: 0.3 }
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
                    start: "top 80%",
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
        <section ref={sectionRef} className="py-2 md:py-4 bg-white">
            <div className="max-w-6xl mx-auto px-8 md:px-12">
                
                {/* Operating Locations Section */}
                <div className="text-center mb-8 space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <MapPinSimpleArea size={32} weight="thin" className="text-gray-700" />
                        <h2 className="text-xl font-semibold text-gray-800">Operating Locations</h2>
                    </div>
                    <div className="w-16 h-0.5 bg-gray-400 mx-auto mb-4"></div>
                    <h3 className="text-3xl md:text-4xl font-light text-gray-900 max-w-4xl mx-auto">
                        Our Global Presence: Driving Innovation Worldwide
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-4xl mx-auto">
                        Our strategic locations form the foundation of our worldwide reach, empowering us to provide seamless services and support to clients globally. From our headquarters in India, where innovation and core operations flourish, to our regional office in the USA, ensuring local expertise and communication, we are committed to fostering connections and driving success across continents. Discover how our strategic locations enable us to meet diverse client needs with efficiency and precision.
                    </p>
                </div>

                {/* Location Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl mx-auto">
                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-gray-700" strokeWidth={1} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">India Headquarters</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Situated in the heart of India, our main office drives innovation and manages core operations for our clients worldwide.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-gray-700" strokeWidth={1} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">USA Regional Office</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Our US office supports North American clients, ensuring seamless communication and local support.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Column 2: 4-column Counters (Full Width) */}
                    <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="stat-card-simn p-4 flex flex-col items-center text-center space-y-2"
                            >
                                {/* Icon */}
                                <div className="p-2">
                                    {stat.icon}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl lg:text-3xl font-light font-montserrat text-gray-900 tracking-tighter">
                                        <CountUpNumber 
                                            end={stat.value} 
                                            duration={2000} 
                                            startTrigger={inView} 
                                            suffix={stat.suffix}
                                        />
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-montserrat font-bold text-gray-500">
                                        {stat.label}
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

export default SimnStats;