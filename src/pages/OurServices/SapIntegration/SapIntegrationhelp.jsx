import React from 'react';
import { motion } from 'framer-motion';

const SapIntegrationHelp = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">SAP Integration Help</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We help enterprises bridge the gap between SAP and non-SAP systems with robust, scalable integration solutions.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SapIntegrationHelp;
