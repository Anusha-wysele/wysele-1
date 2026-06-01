import { AirTrafficControl, FramerLogo, LinkedinLogo, SlackLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Award, Cloud, Lightbulb, TrendingUp, Users } from 'lucide-react';
import founderImg from '../../assets/wysele-founder.webp';

const Founder = () => {
    // Animations are now viewport-based using Framer Motion and Tailwind lg: modifiers

    return (
        <>

            {/* Second Section - What We Deliver */}
            <section className="bg-white pt-16 pb-8 md:pt-24 md:pb-10 px-6 md:px-12">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                        {/* Right Side (Higher Importance for Mobile) - Company Description */}
                        <div className="lg:w-[45%] lg:-ml-8 order-1 lg:order-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                                Transforming Complexity into Confident Solutions
                            </h2>
                            {/* Animated line */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "80px" }}
                                viewport={{ once: false }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="h-[1px] bg-gray-900 mb-6"
                            />
                            <p className="text-gray-800 text-[13px] md:text-[14px] leading-relaxed font-normal">
                                Since its inception in 2021, Wysele has focused on bringing clarity and purpose to every challenge—prioritizing meaningful execution over noise and real impact over empty promises. Our approach is grounded in transparency, strong values, and a commitment to building lasting partnerships. At Wysele, success is defined by the long-term value we create and the trust we build with every client we serve. We operate at the intersection of technology and business strategy—helping organizations harness the full potential of SAP, cloud platforms, and AI-driven innovation. Our team of seasoned architects and consultants brings deep domain expertise, ensuring every solution we deliver is purposeful, scalable, and aligned with your long-term vision.
                            </p>
                        </div>

                        {/* Left Side - Heading and Content */}
                        <div className="lg:w-[55%] lg:pr-4 lg:pl-4 pl-2 md:pl-4 order-2 lg:order-1">
                            <h2 className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-5">
                                What We Do
                            </h2>

                            <div className="space-y-4">
                                {/* Approach 1 */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <AirTrafficControl size={20} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-semibold mb-1 text-gray-900">
                                            Purpose-Driven Approach, Precision in Delivery
                                        </h3>
                                        <p className="text-gray-800 text-[13px] md:text-sm leading-snug font-normal">
                                            At Wysele, we focus on solving challenges before speaking—bringing clarity, speed, and effective execution. We prioritize outcomes over noise and action over hierarchy.
                                        </p>
                                    </div>
                                </div>

                                {/* Approach 2 */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <SlackLogo size={20} weight="thin" className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-semibold mb-1 text-gray-900">
                                            Beyond IT — Building Trust That Endures
                                        </h3>
                                        <p className="text-gray-800 text-[13px] md:text-sm leading-snug font-normal">
                                            We don't just pursue clients—we cultivate long-term partnerships. Through ethical practices and transparent communication, we create trust that goes beyond agreements.
                                        </p>
                                    </div>
                                </div>

                                {/* Approach 3 */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <Cloud size={20} strokeWidth={1} className="text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-semibold mb-1 text-gray-900">
                                            Cloud. SAP. Innovation. Seamlessly Executed
                                        </h3>
                                        <p className="text-gray-800 text-[13px] md:text-sm leading-snug font-normal">
                                            From SAP ECC to S/4HANA and On-Premise to RISE, we simplify complex transitions. Our team leverages AWS, Azure, GCP, and modern app development.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Third Section - Meet Our Founder */}
            <section className="bg-white pt-8 pb-12 md:pt-10 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto">
                    <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center overflow-visible`}>

                        {/* Left Side - Founder Image */}
                        <div className="w-full lg:w-[40%] lg:pl-16">
                            <h2 className="text-2xl font-semibold text-red-600 mb-10 flex items-center gap-4">
                                <FramerLogo size={36} weight="thin" />
                                <span className="tracking-tight">Meet Our Founder</span>
                            </h2>
                            <div className="relative mx-4 md:mx-0 group">
                                {/* Red border frame */}
                                <div className={`absolute -top-4 -left-4 w-full h-full border-2 border-red-600 rounded-lg hidden md:block`}></div>

                                {/* Image container */}
                                <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                                    <img
                                        src={founderImg}
                                        alt="Brahmam Chowdary Murukonda Founder and CEO"
                                        title="Founder and CEO"
                                        className="w-full h-[400px] md:h-[480px] object-cover transition-all duration-700 group-hover:grayscale-[30%]"
                                    />

                                    {/* Diagonal Overlay Transition - Top Left */}
                                    <div
                                        className="absolute top-0 left-0 w-0 h-0 bg-black/10 transition-all duration-700 group-hover:w-full group-hover:h-full"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                                        }}
                                    ></div>

                                    {/* Diagonal Overlay Transition - Bottom Right */}
                                    <div
                                        className="absolute bottom-0 right-0 w-0 h-0 bg-black/10 transition-all duration-700 group-hover:w-full group-hover:h-full"
                                        style={{
                                            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                        }}
                                    ></div>

                                    {/* LinkedIn Icon Overlay */}
                                    <a
                                        href="https://www.linkedin.com/company/wyseletech/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 shadow-lg hover:scale-110 transform z-10"
                                        style={{ transition: 'all 0.3s ease' }}
                                    >
                                        <LinkedinLogo size={20} weight="fill" className="text-[#0077B5]" />
                                    </a>

                                    {/* Name overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#C9184A] text-white p-6">
                                        <h3 className="text-xl font-medium tracking-tight">
                                            - Brahmam Chowdary Murukonda
                                        </h3>
                                    </div>
                                </div>

                                {/* Mobile frame - cleaner */}
                                <div className="absolute inset-0 border border-red-600/20 rounded-lg pointer-events-none md:hidden"></div>
                            </div>
                        </div>

                        {/* Right Side - Founder Details */}
                        <div className="w-full lg:w-[60%] flex flex-col justify-center lg:pl-20 pl-6 md:pl-10">
                            <div className="max-w-2xl">
                                <p className="text-red-600 text-lg font-medium mb-3">Founder, CEO</p>

                                {/* Underline */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "64px" }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-[1px] bg-[#C9184A] mb-6"
                                />

                                <div className="space-y-1 mb-8">
                                    <p className="text-gray-800 text-[13px] md:text-[14px] leading-snug font-normal">
                                        Brahmam is a seasoned technology leader with over 20 years of experience delivering enterprise-grade solutions across industries. With a strong foundation from his tenure at a leading multinational corporation, he has consistently driven large-scale digital transformation initiatives and optimized mission-critical systems.
                                    </p>
                                    <p className="text-gray-800 text-[13px] md:text-[14px] leading-snug font-normal">
                                        As an accomplished SAP Technical and Functional Architect, Brahmam specializes in integrating Artificial Intelligence (AI) with SAP ecosystems to build intelligent, data-driven enterprises. His expertise lies in transforming traditional ERP systems into smart platforms that enable automation, real-time insights, and predictive decision-making.
                                    </p>
                                    <p className="text-gray-800 text-[13px] md:text-[14px] leading-snug font-normal">
                                        He focuses on aligning business strategy with technology execution—helping organizations enhance efficiency, reduce operational complexity, and scale with confidence. Under his leadership, the organization is committed to delivering innovative, high-impact solutions that convert complex enterprise challenges into measurable business outcomes.
                                    </p>
                                </div>

                                {/* Skills Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {[
                                        { icon: <Users size={20} className="text-red-600" />, title: "Visionary", desc: "Driving future-ready strategies by integrating AI with enterprise systems." },
                                        { icon: <Award size={20} className="text-red-600" />, title: "Excellence", desc: "Delivering consistent, high-quality outcomes with measurable impact." },
                                        { icon: <Lightbulb size={20} className="text-red-600" />, title: "Innovation", desc: "Adopting AI, automation, and modern technologies to solve real business problems." },
                                        { icon: <TrendingUp size={20} className="text-red-600" />, title: "Growth", desc: "Building scalable, sustainable solutions that enable long-term success." }
                                    ].map((skill, si) => (
                                        <div key={si} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                                                {skill.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{skill.title}</h4>
                                                <p className="text-gray-500 text-xs md:text-sm">{skill.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Founder;
