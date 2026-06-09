import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppDev1 from '../../assets/wysele-appdevelopmenthero.webp';

const AppDevelopmenthero = () => {
    return (
        <section className="relative w-full bg-[#1A222E] flex items-center justify-center overflow-x-hidden pt-[150px] pb-6 md:pt-[140px] md:pb-12 lg:pt-[180px] lg:pb-16">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">

                {/* Left Side: Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full md:w-1/2 flex flex-col z-20 shrink-0 text-center md:text-left items-center md:items-start"
                >
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4 md:mb-5">
                        <span className="w-8 h-[1.5px] bg-white opacity-60" />
                        <span className="text-xs md:text-[10px] font-normal tracking-[0.2em] md:tracking-[0.3em] text-white opacity-60 uppercase">
                            Mobile <Link to="/services/app-development" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>App Development</Link>
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-light text-white leading-[1.3] mb-4 md:mb-5 tracking-tight">
                        Reliable, Feature-Rich Mobile Apps
                    </h1>

                    <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-5 max-w-lg leading-relaxed font-light">
                        Leverage modern technologies to build reliable, feature-rich mobile applications. Our approach focuses on performance, scalability, and intuitive design to deliver a smooth and engaging user experience.
                    </p>

                    <p className="text-sm md:text-base text-gray-200 mb-6 md:mb-8 max-w-lg leading-relaxed font-light">
                        Our solutions are tailored to adapt to diverse business needs, ensuring flexibility, efficiency, and long-term growth.
                    </p>

                    <div>
                        <button className="bg-[#800000] text-white text-xs md:text-sm font-medium tracking-[0.1em] md:tracking-[0.15em] px-6 md:px-8 py-3 md:py-4 uppercase hover:bg-[#600000] transition-colors duration-300">
                            Get Started
                        </button>
                    </div>
                </motion.div>

                {/* Right Side: Image */}
                <div className="w-full md:w-1/2 shrink-0 flex items-center justify-center md:items-end md:justify-end md:self-end mt-8 md:mt-0">
                    <motion.img
                        src={AppDev1}
                        alt="App Development Mockup"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-[95%] sm:w-[90%] md:w-[720px] lg:w-[1050px] md:max-w-none object-contain md:translate-y-16 lg:translate-y-24"
                    />
                </div>

            </div>
        </section>
    );
};

export default AppDevelopmenthero;
