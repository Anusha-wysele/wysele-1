import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ScrollProgressBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();

    useEffect(() => {
        // Reset scroll progress when route changes
        setScrollProgress(0);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <>
            {/* Scroll to Top Button with Progress Ring */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    width: '56px',
                    height: '56px',
                    zIndex: 9999,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    cursor: 'pointer',
                }}
                onClick={scrollToTop}
            >
                {/* SVG Progress Ring */}
                <svg
                    width="56"
                    height="56"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: 'rotate(-90deg)',
                        pointerEvents: 'none',
                    }}
                >
                    {/* Background Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r="20"
                        fill="none"
                        stroke="rgba(251, 146, 60, 0.2)"
                        strokeWidth="3"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="28"
                        cy="28"
                        r="20"
                        fill="none"
                        stroke="#fb923c"
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.1s ease',
                        }}
                    />
                </svg>

                {/* Button */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#10b981',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                        transition: 'box-shadow 0.3s ease',
                        pointerEvents: 'none',
                    }}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </div>
            </motion.div>
        </>
    );
};

export default ScrollProgressBar;
