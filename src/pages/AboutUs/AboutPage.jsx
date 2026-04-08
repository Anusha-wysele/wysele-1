import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SimnHero from "./SimnHero";
import SimnWhoWeAre from "./SimnWhoWeAre";
import Founder from "./Founder";
import SimnStats from "./SimnStats";
import TrustUs from "./TrustUs";
import Footer from "../../components/layout/section/Footer";
import LeftSidebar from "../../components/layout/navbar/LeftSidebar";

const AboutPage = () => {
    useEffect(() => {
        // Ensure Montserrat and Oxygen are applied globally to the page container
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return (
        <div className="relative w-full bg-white min-h-screen font-oxygen">
            {/* Left Sidebar with Home and Join Us buttons */}
            <LeftSidebar />
            
            {/* 1. Full-width Material Hero */}
            <SimnHero />

            {/* 2. Who We Are + Skills Section */}

            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Founder />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <SimnWhoWeAre />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <TrustUs />
            </motion.div>

            {/* 2.5 Founder & Vision Section */}

            {/* 3. Metrics Section (Dark grid on light background) */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <SimnStats />
            </motion.div>

            {/* 7. Preserved Brand Footer */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Footer />
            </motion.div>
        </div>
    );
};

export default AboutPage;
