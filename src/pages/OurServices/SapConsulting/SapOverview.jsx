import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const SapOverview = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const words = "Unlock the Full Potential of SAP with Professional Consulting".split(" ");

    return (
        <div className="bg-white pt-6 pb-2" ref={ref}>
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex flex-wrap gap-x-2">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h2>
                <div className="text-base text-gray-700 leading-relaxed space-y-4 mb-8">
                    <p>
                        Wysele delivers SAP consulting services designed to help organizations implement, optimize, migrate, and manage SAP environments with confidence. From SAP S/4HANA implementation to cloud migration and process optimization, our consultants help businesses simplify operations while improving visibility across teams.
                    </p>
                    <p>
                        Whether you're planning a fresh SAP rollout, upgrading legacy systems, or improving existing workflows, our team helps you move forward with clarity and measurable outcomes.
                    </p>
                </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src={SERVICES_PAGE_IMAGES.sapOverview}
                        alt="SAP Overview"
                        className="w-full h-auto rounded-xl object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default SapOverview;
