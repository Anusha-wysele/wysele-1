import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { SERVICES_PAGE_IMAGES } from '../../../components/common/data';

const SapOverview = () => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const words = "Unlock the Full Potential of SAP with Professional Consulting".split(" ");

    return (
        <div className="bg-white pt-6 pb-2" ref={ref}>
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 flex items-center gap-12">
                <div className="w-1/2">
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
                <p className="text-base text-gray-700 leading-relaxed mb-8">
                    In the fast-paced world of business technology, leveraging expert consulting services can be the key to fully harnessing the capabilities of SAP solutions. Our consultants will work closely with your team to identify opportunities for improvement, optimize processes, and drive tangible results. Don't just adapt—thrive with the right strategies and insights to elevate your business to new heights.
                </p>
                <button
                    onClick={() => navigate('/contact')}
                    className="px-6 py-2 bg-[#C9184A] text-white font-semibold rounded-full hover:bg-gray-900 transition-all duration-300"
                >
                    Contact Us
                </button>
                </div>
                <div className="w-1/2">
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
