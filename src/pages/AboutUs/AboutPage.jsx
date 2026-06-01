import { motion } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import SimnHero from "./SimnHero";

// Lazy load below-the-fold components
const WhatWeDo = lazy(() => import("./WhatWeDo"));
const SimnWhoWeAre = lazy(() => import("./SimnWhoWeAre"));
const Founder = lazy(() => import("./Founder"));
const SimnStats = lazy(() => import("./SimnStats"));
const TrustUs = lazy(() => import("./TrustUs"));
const Footer = lazy(() => import("../../components/layout/section/Footer"));

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
            {/* 1. Full-width Material Hero */}
            <SimnHero />
            <Breadcrumbs />

            <Suspense fallback={<div className="h-[50vh]" />}>
                <WhatWeDo />

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
            </Suspense>
        </div>
    );
};

export default AboutPage;
