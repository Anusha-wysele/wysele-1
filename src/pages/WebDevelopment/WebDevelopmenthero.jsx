// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import webDevHeroBg from "../../assets/wysele-webdevelopmentmainhero.webp";
import webDevHero1 from "../../assets/wysele-webdevelopmenthero1.webp";
import webDevHero2 from "../../assets/wysele-webdevelopmenthero2.webp";
import webDevHero3 from "../../assets/wysele-webdevelopmenthero3.webp";

const WEB_DEVELOPMENT_IMAGES = [webDevHero1, webDevHero2, webDevHero3];

const HERO_CONTENT = [
    {
        title: "Driving Digital Excellence Through Web Development",
        desc: <>We deliver high-performance, scalable, and secure <Link to="/services/web-development" className="hover:underline transition-colors decoration-[#C9184A] underline-offset-4 text-inherit font-medium">web solutions</Link> designed to drive business growth and digital success.</>
    },
    {
        title: "Building Resilient and Scalable Web Platforms",
        desc: "Our expert team builds robust, responsive, and efficient web applications tailored to meet evolving business needs."
    },
    {
        title: "Crafting High-Impact Digital Experiences",
        desc: "We create modern, user-centric web experiences that combine performance, security, and seamless functionality."
    }
];

export default function WebDevelopmenthero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [key, setKey] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [randomRotation, setRandomRotation] = useState(30);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_CONTENT.length);
        setKey(prev => prev + 1);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + HERO_CONTENT.length) % HERO_CONTENT.length);
        setKey(prev => prev + 1);
    }, []);

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Generate a random angle between 15 and 60 degrees, alternating negative/positive
        const angle = (Math.random() * 45 + 15) * (Math.random() > 0.5 ? 1 : -1);
        setRandomRotation(angle);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 40 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
        }
    };

    return (
        <div className="w-full">
            <section className="relative w-full min-h-[calc(100vh-68px)] lg:h-screen bg-black overflow-hidden flex flex-col lg:flex-row pt-[140px] md:pt-0">
                {/* Left Column (30%) - Deep Maroon */}
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    className="w-full lg:w-[30%] h-auto lg:h-full relative border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between p-6 md:p-8 lg:p-12 bg-[#330000] z-10"
                >
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40"
                        >
                            Digital Innovation
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute right-0 top-0 w-[1px] bg-transparent"
                    />
                </div>

                {/* Right Column (70%) - Content Side with Background */}
                <div className="w-full lg:w-[70%] flex-1 lg:h-full relative flex items-center px-6 md:px-12 lg:pl-64 lg:pr-24 pt-[220px] md:pt-[280px] lg:pt-0 pb-12 lg:pb-0 overflow-hidden">
                    {/* Background Image for Right Column - Cinematic View */}
                    <div className="absolute inset-0 z-0">
                        <motion.img fetchpriority="high"
                            src={webDevHeroBg}
                            alt="Background"
                            initial={{ scale: 1.1, opacity: 1 }}
                            animate={{ scale: 1, opacity: 0.85 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 lg:from-black/40 to-transparent" />
                    </div>

                    <div className="relative w-full lg:h-[450px] flex flex-col justify-center">
                        <div className="relative h-auto lg:h-[300px] w-full min-h-[200px]">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    variants={containerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="relative lg:absolute inset-0 flex flex-col justify-center max-w-xl"
                                >
                                    <motion.h1
                                        variants={itemVariants}
                                        className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight mb-6 lg:mb-8 tracking-tight"
                                    >
                                        {HERO_CONTENT[currentSlide].title}
                                    </motion.h1>

                                    <motion.p
                                        variants={itemVariants}
                                        className="text-base md:text-lg text-white/90 leading-relaxed font-normal"
                                    >
                                        {HERO_CONTENT[currentSlide].desc}
                                    </motion.p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Progress Bar & Counter */}
                        <div className="mt-8 lg:mt-12 flex items-center gap-4 md:gap-8 flex-wrap">
                            <div className="w-24 md:w-32 h-[1px] bg-white/10 relative overflow-hidden hidden sm:block">
                                <motion.div
                                    key={key}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 8, ease: "linear" }}
                                    className="absolute inset-y-0 left-0 bg-[#FFB703]"
                                />
                            </div>

                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 min-w-[60px]">
                                0{currentSlide + 1} / 0{HERO_CONTENT.length}
                            </span>

                            {/* Navigation Arrows on the Right */}
                            <div className="flex items-center gap-4 ml-auto sm:ml-0">
                                <button
                                    onClick={prevSlide}
                                    className="text-white/40 hover:text-[#800000] transition-colors duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="text-white/40 hover:text-[#800000] transition-colors duration-300"
                                >
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered Box on the Line - Image Slider */}
                <div className="absolute top-[160px] md:top-[180px] lg:top-[55%] left-1/2 lg:left-[38%] -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none flex items-center" style={{ perspective: "1000px" }}>
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 1, scale: 0.9, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="pointer-events-auto relative cursor-pointer"
                    >
                        {/* Rotated Decorative Border */}
                        <motion.div
                            initial={{ rotate: 30 }}
                            animate={{ rotate: isHovered ? 0 : randomRotation }}
                            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute inset-0 border-2 border-white/40 -z-10"
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 1, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="w-56 h-40 md:w-64 md:h-48 lg:w-96 lg:h-72 border border-white/40 bg-[#1a1a1a] rounded-sm shadow-2xl overflow-hidden relative"
                                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                            >
                                <img fetchpriority="high"
                                    src={WEB_DEVELOPMENT_IMAGES[currentSlide]}
                                    alt="Web Development Showcase"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}