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

export default function AboutUs() {
    const [cycleCount, setCycleCount] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);

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

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
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

    // Orchestration Variants
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
        hidden: { opacity: 0, x: -30, filter: "blur(10px)", scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
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
                gridTemplateColumns: '45fr 55fr',
                minHeight: '85vh',
                background: '#fff',
                overflow: 'hidden'
            }}
        >
            {/* Left Side - Image (Perfect Alignment) */}
            <motion.div
                variants={imageWrapperVariants}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '41px 20px 40px 40px',
                }}
            >
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
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

            {/* Right Side - Content (Symmetrical Padding) */}
            <div
                style={{
                    background: '#ffffff',
                    padding: '60px 80px 60px 40px',
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
                        fontSize: '1.4rem',
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
                        fontSize: '0.9rem',
                        color: '#555',
                        marginBottom: '45px',
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
                        gap: '35px',
                        paddingLeft: '35px',
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
                        animate={{ top: `${(activeLineIndex * 33.33) + (33.33 * 0.05)}%` }} // aligned to section
                        transition={{ duration: 0.8, ease: LIQUID_EASE }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: '1px', // ultra-thin
                            background: '#111',
                            height: '30%', // slightly shorter for elegance
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
                                    gap: '24px',
                                    alignItems: 'flex-start',
                                    transition: 'opacity 0.6s ease',
                                    opacity: isActive ? 1 : 0.35,
                                }}
                            >
                                {/* Icon Container (Perfect Circle/Square balance) */}
                                <div style={{
                                    width: '52px',
                                    height: '52px',
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
                                        size={isActive ? 34 : 32}
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
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#111',
                                        margin: '0 0 8px 0',
                                        fontFamily: 'Inter Tight, sans-serif',
                                    }}>
                                        {item.title}
                                    </h3>

                                    <p style={{
                                        fontSize: '0.8rem',
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
