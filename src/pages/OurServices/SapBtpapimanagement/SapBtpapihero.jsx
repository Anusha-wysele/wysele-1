import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SapbtpapiheroImg from '../../../assets/wysele-Sapbtpapihero.webp';

export default function SapBtpapihero() {
    return (
        <div className="w-full min-h-screen lg:h-screen overflow-hidden relative flex flex-col pt-[140px] lg:pt-0">
            
            {/* Full screen image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={SapbtpapiheroImg}
                    alt="SAP BTP API Management"
                    className="w-full h-full object-cover"
                />
                {/* Dark gradient concentrated on the left/bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Main Content — bottom left */}
            <div className="relative lg:absolute lg:bottom-0 lg:left-0 z-20 w-full px-6 md:px-12 lg:px-20 pt-12 lg:pt-0 pb-14 md:pb-20 flex-1 flex flex-col justify-end">
                <div className="max-w-2xl">

                    {/* Massive Uppercase Bold Headline */}
                    <motion.h1
                        initial={{ opacity: 1, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white uppercase leading-[1.15] tracking-tight mb-6"
                    >
                        Build, Manage <br />
                        &amp; Scale APIs <br />
                        with <Link to="/services/sap-btp" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}><Link to="/services/sap-btp" className="hover:underline transition-colors decoration-gray-400 underline-offset-4 text-inherit">SAP BTP</Link></Link>.
                    </motion.h1>

                    {/* Short paragraph */}
                    <motion.p
                        initial={{ opacity: 1, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                        className="text-sm md:text-base text-white/80 leading-relaxed font-light max-w-md"
                    >
                        Wysele helps you leverage SAP Business Technology Platform (BTP) <Link to="/services/sap-btp-api-management" style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted #ccc" }}>API Management</Link> to securely publish, promote, and oversee APIs in a scalable, enterprise-ready environment.
                    </motion.p>

                </div>
            </div>

            {/* Bottom-right: service index labels */}
            <motion.div
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="absolute bottom-10 md:bottom-14 right-6 md:right-12 lg:right-20 z-20 hidden md:flex items-end gap-10"
            >
                {[
                    { num: "01", title: "API Lifecycle Mgmt", sub: "Design to Deprecation" },
                    { num: "02", title: "SAP Integration Suite", sub: "Cross-System Connectivity" },
                    { num: "03", title: "API Monetization", sub: "Usage-Based Value Tracking" },
                ].map((item) => (
                    <div key={item.num} className="text-left">
                        <span className="block text-white text-[11px] font-bold uppercase tracking-wide leading-tight">{item.title}</span>
                        <span className="block text-white/50 text-[10px] uppercase tracking-wide">{item.sub}</span>
                    </div>
                ))}
            </motion.div>

        </div>
    );
}

