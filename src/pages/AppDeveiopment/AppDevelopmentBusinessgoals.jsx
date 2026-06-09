import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Understand Your Target Audience",
        desc: "A successful app begins with a clear understanding of your users. Identifying your target audience helps in delivering solutions that align with their needs and expectations."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: "Deliver High Performance",
        desc: "App performance is a key factor in user satisfaction. We ensure smooth functionality and responsiveness, even under varying workloads, to provide a reliable experience."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        title: "Enable Quick Updates",
        desc: "Regular updates help improve performance, fix issues, and enhance stability. This ensures your application remains efficient, secure, and competitive."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        title: "Enhance Brand Visibility",
        desc: "Strategic communication and user engagement features help strengthen your brand presence and keep users connected with your services."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: "Build Trust & Loyalty",
        desc: "With strong security and scalable architecture, applications are designed to handle growing demands while maintaining reliability, fostering user trust and long-term engagement."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Ensure a Seamless User Experience",
        desc: "We focus on creating intuitive and engaging interfaces that help build meaningful connections with users, delivering a smooth and enjoyable experience."
    },
];

const AppDevelopmentBusinessgoals = () => {
    return (
        <section className="w-full pt-6 md:pt-8 pb-16 md:pb-24 px-6 md:px-16 lg:px-24">
            <div className="w-full max-w-7xl mx-auto">

                {/* Heading & Paragraphs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4 mx-auto max-w-3xl flex flex-col items-start text-left px-4 md:px-0"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-black mb-2 leading-tight tracking-wide">
                        Achieve Your Business Goals with <br />Mobile <Link to="/services/app-development" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>App Development</Link>
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 font-light mb-1 w-full leading-relaxed">
                        In today's fast-evolving digital landscape, mobile devices play a vital role in simplifying everyday life. Mobile applications are designed to provide seamless, intuitive, and accessible experiences for users.
                    </p>
                    <p className="text-sm md:text-base text-gray-700 font-light w-full leading-relaxed">
                        Our mobile app development approach focuses on building high-quality applications with advanced features, ensuring optimal performance and user satisfaction.
                    </p>
                </motion.div>

                {/* Feature Cards: 3 columns × 2 rows, icon + title + desc centered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                            className="flex flex-col items-center text-center px-4"
                        >
                            <div className="text-gray-700 mb-2">
                                {feature.icon}
                            </div>
                            <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AppDevelopmentBusinessgoals;
