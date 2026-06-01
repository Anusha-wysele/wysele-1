import { motion } from 'framer-motion';

export default function Iotkeyfeatures() {
    const features = [
        {
            title: "Requirement-Based Planning",
            icon: (
                <svg className="w-8 h-8 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            borderClass: "border-b border-gray-200 md:border-r md:border-b"
        },
        {
            title: "Scalable IoT Architecture",
            icon: (
                <svg className="w-8 h-8 text-[#4BDE7B] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2zm0-10a2 2 0 01-2-2H5a2 2 0 01-2-2V3a2 2 0 012-2h2a2 2 0 012 2zm7 2h3a2 2 0 012 2v2a2 2 0 01-2 2h-3a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
            ),
            borderClass: "border-b border-gray-200 md:border-r md:border-b"
        },
        {
            title: "End-to-End Development",
            icon: (
                <svg className="w-8 h-8 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
            ),
            borderClass: "border-b border-gray-200 md:border-b"
        },
        {
            title: "Secure System Integration",
            icon: (
                <svg className="w-8 h-8 text-cyan-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
            ),
            borderClass: "border-b border-gray-200 md:border-r md:border-b-0"
        },
        {
            title: "Testing & Operational Validation",
            icon: (
                <svg className="w-8 h-8 text-pink-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            borderClass: "border-b border-gray-200 md:border-r md:border-b-0"
        },
        {
            title: "Continuous Monitoring & Support",
            icon: (
                <svg className="w-8 h-8 text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5 6.75-6.75M19.5 12l.75-3.75L16.5 9" />
                </svg>
            ),
            borderClass: "border-0"
        }
    ];

    return (
        <section className="pt-0 pb-4 md:pt-0 md:pb-6 bg-white relative overflow-hidden">
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="max-w-3xl mb-12 text-center md:text-left lg:pl-8 xl:pl-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl font-bold text-gray-900 leading-tight tracking-tight"
                    >
                        Key Features Of Our IoT Development Process
                    </motion.h2>
                </div>

                {/* Features Divider Grid */}
                <div className="max-w-[1150px] lg:pl-8 xl:pl-12">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col items-center justify-center p-8 md:p-12 text-center border-gray-200 ${feature.borderClass}`}
                            >
                                {feature.icon}
                                <h3 className="text-[#141C4F] text-[15px] md:text-[16px] font-bold tracking-wide">
                                    {feature.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
