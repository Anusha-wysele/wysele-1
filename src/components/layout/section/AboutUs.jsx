import React, { useState, useEffect, useRef } from 'react';
import { AlignCenterVertical, BoundingBox, CraneTower } from '@phosphor-icons/react';
import { ABOUT_US_IMAGES } from '../../common/data';
import { motion, AnimatePresence } from 'framer-motion';

const images = ABOUT_US_IMAGES;

const textItems = [
    {
        number: "01",
        title: "Our Vision",
        description: "To deliver cost-effective, cutting-edge solutions that help our clients achieve their goals. We continuously invest in R&D to stay ahead of technological advancements.",
        Icon: AlignCenterVertical,
    },
    {
        number: "02",
        title: "Our Mission",
        description: "To be a trusted technology partner, collaborating with clients to achieve strategic objectives and deliver long-term business value.",
        Icon: BoundingBox,
    },
    {
        number: "03",
        title: "Our Values",
        description: "We build strong connections with clients and communities to create a better tomorrow. Our guiding principles help us stay different and better.",
        Icon: CraneTower,
    }
];

const LIQUID_EASE = [0.32, 0.72, 0, 1];

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

export default function AboutUs() {
    const [cycleCount, setCycleCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const width = useWindowWidth();
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (!entry.isIntersecting) {
                    setCycleCount(0);
                }
            },
            { threshold: 0.1 }
        );

        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const interval = setInterval(() => {
            setCycleCount((prev) => prev + 1);
        }, 7000);

        return () => clearInterval(interval);
    }, [isInView]);

    const activeIndex = cycleCount % images.length;
    const activeLineIndex = cycleCount % textItems.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.2, ease: LIQUID_EASE }
        }
    };

    const imageWrapperVariants = {
        hidden: { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 30 : 0, filter: "blur(10px)", scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: { duration: 1.6, ease: LIQUID_EASE }
        }
    };

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '45fr 55fr',
                minHeight: isMobile ? 'auto' : '85vh',
                background: '#fff',
                overflow: 'hidden',
            }}
        >
            {/* Left Side - Image */}
            <motion.div
                variants={imageWrapperVariants}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: isMobile ? '24px 20px 16px 20px' : isTablet ? '30px 16px 30px 30px' : '41px 20px 40px 40px',
                    minHeight: isMobile ? '280px' : isTablet ? '360px' : 'auto',
                }}
            >
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: isMobile ? '260px' : '100%',
                    borderRadius: '16px',
                    boxShadow: '0 25px 60px -15px rgba(0,0,0,0.12)',
                    background: '#fcfcfc',
                }}>
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={cycleCount}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.6, ease: "easeInOut" }}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0, left: 0,
                                zIndex: cycleCount
                            }}
                        >
                            <motion.img
                                src={images[activeIndex]}
                                alt="About Us Banner"
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "easeOut" }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    willChange: 'transform'
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Inner Subtle Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.03)',
                        pointerEvents: 'none'
                    }} />
                </div>
            </motion.div>

            {/* Right Side - Content */}
            <div
                style={{
                    background: '#ffffff',
                    padding: isMobile
                        ? '28px 20px 40px 20px'
                        : isTablet
                        ? '40px 30px 40px 24px'
                        : '60px 80px 60px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "15px",
                    }}
                >
                    <h2 style={{
                        fontSize: isMobile ? '1.15rem' : '1.4rem',
                        fontWeight: 600,
                        color: '#111',
                        margin: 0,
                        fontFamily: 'Inter Tight, sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        What We Do
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 52 }}
                        transition={{ duration: 1.2, ease: LIQUID_EASE, delay: 0.9 }}
                        style={{
                            height: 2,
                            background: "#111",
                            borderRadius: 2
                        }}
                    />
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: isMobile ? '0.82rem' : '0.9rem',
                        color: '#555',
                        marginBottom: isMobile ? '28px' : '45px',
                        lineHeight: 1.8,
                        maxWidth: '580px',
                        fontFamily: 'Jost, sans-serif'
                    }}
                >
                    Wysele partners with enterprises to engineer intelligent SAP ecosystems, cloud-native solutions, and AI-driven strategies — delivering outcomes that create lasting competitive advantage across every market we serve.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: isMobile ? '24px' : '35px',
                        paddingLeft: isMobile ? '24px' : '35px',
                    }}>
                    {/* Vertical Line System */}
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '5%',
                        bottom: '5%',
                        width: '1px',
                        background: '#f0f0f0',
                    }} />

                    {/* Active Track Overlay */}
                    <motion.div
                        animate={{ top: `${(activeLineIndex * 33.33) + (33.33 * 0.05)}%` }}
                        transition={{ duration: 0.8, ease: LIQUID_EASE }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '1px',
                            background: '#111',
                            height: '30%',
                            zIndex: 1
                        }}
                    />

                    {textItems.map((item, idx) => {
                        const IconComponent = item.Icon;
                        const isActive = idx === activeLineIndex;

                        return (
                            <motion.div
                                key={item.number}
                                variants={itemVariants}
                                style={{
                                    display: 'flex',
                                    gap: isMobile ? '16px' : '24px',
                                    alignItems: 'flex-start',
                                    transition: 'opacity 0.6s ease',
                                    opacity: isActive ? 1 : 0.35,
                                }}
                            >
                                {/* Icon Container */}
                                <div style={{
                                    width: isMobile ? '42px' : '52px',
                                    height: isMobile ? '42px' : '52px',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    background: isActive ? '#f9f9f9' : 'transparent',
                                    boxShadow: isActive ? '0 10px 20px rgba(0,0,0,0.03)' : 'none',
                                    transition: 'all 0.6s ease'
                                }}>
                                    <IconComponent
                                        size={isMobile ? (isActive ? 26 : 24) : (isActive ? 34 : 32)}
                                        color={isActive ? "#111" : "#aaa"}
                                        weight="thin"
                                        style={{ transition: 'all 0.6s ease' }}
                                    />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontSize: '11px',
                                        color: isActive ? '#333' : '#ccc',
                                        marginBottom: '6px',
                                        fontWeight: 600,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase'
                                    }}>
                                        {item.number}
                                    </div>

                                    <h3 style={{
                                        fontSize: isMobile ? '0.9rem' : '1rem',
                                        fontWeight: 600,
                                        color: '#111',
                                        margin: '0 0 8px 0',
                                        fontFamily: 'Inter Tight, sans-serif',
                                    }}>
                                        {item.title}
                                    </h3>

                                    <p style={{
                                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                                        lineHeight: 1.6,
                                        color: '#666',
                                        margin: 0,
                                        fontFamily: 'Jost, sans-serif',
                                    }}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    );
}
