import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { WYSELE_LOGOS } from "../../common/data";

const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

const Footer = () => {
    return (
        <footer className="bg-[#1A1614] text-white px-10 md:px-20 pt-[40px] pb-10 font-inter relative overflow-hidden flex flex-col justify-between">
            {/* Top Grid Section */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[5fr,1fr,1fr,1fr] gap-10 md:gap-15 mb-8 relative z-10 lg:justify-items-end"
            >
                <motion.div variants={fadeUpVariants} className="lg:col-span-1 md:col-span-2 mb-10 lg:mb-0 lg:justify-self-start">
                    <img
                        src={WYSELE_LOGOS.white}
                        alt="Wysele Logo"
                        className="w-24 mb-2 opacity-90"
                    />
                    <p className="font-jost text-base md:text-lg opacity-60 mt-2 leading-relaxed max-w-[450px]">
                        Wysele is one of India’s top SAP solution providers, having the technology, capabilities and skills to deliver end-to-end digital solutions for large and medium enterprises in the public and private sectors.
                    </p>

                    {/* Social Media Section */}
                    <div className="mt-8">
                        <h4 className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] opacity-40 mb-4">
                            connect with us
                        </h4>
                        <div className="flex gap-6">
                            {[FaLinkedin, FaInstagram, FaFacebook, FaYoutube].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.2, opacity: 1 }}
                                    className="text-xl opacity-60 transition-opacity"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Company Links */}
                <motion.div variants={fadeUpVariants} className="flex flex-col">
                    <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.15em] mb-8 opacity-40">
                        Company
                    </h3>
                    <ul className="flex flex-col gap-[15px]">
                        {["Home", "About Us", "Our Services", "Industries"].map((link) => (
                            <li key={link}>
                                <motion.a
                                    href={`#${link.toLowerCase().replace(" ", "")}`}
                                    whileHover={{ x: 5, opacity: 1 }}
                                    className="font-jost text-base opacity-80 transition-opacity block"
                                >
                                    {link}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Expertise Links */}
                <motion.div variants={fadeUpVariants} className="flex flex-col">
                    <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.15em] mb-8 opacity-40">
                        Expertise
                    </h3>
                    <ul className="flex flex-col gap-[15px]">
                        {["Why Choose Us", "Our Team", "Latest Blogs", "Career"].map((link) => (
                            <li key={link}>
                                <motion.a
                                    href="#"
                                    whileHover={{ x: 5, opacity: 1 }}
                                    className="font-jost text-base opacity-80 transition-opacity block"
                                >
                                    {link}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Connect Links */}
                <motion.div variants={fadeUpVariants} className="flex flex-col">
                    <h3 className="font-montserrat text-sm font-semibold uppercase tracking-[0.15em] mb-8 opacity-40">
                        Connect
                    </h3>
                    <ul className="flex flex-col gap-[15px]">
                        {["Contact", "LinkedIn", "WhatsApp", "Email Us"].map((link) => (
                            <li key={link}>
                                <motion.a
                                    href="#"
                                    whileHover={{ x: 5, opacity: 1 }}
                                    className="font-jost text-base opacity-80 transition-opacity block"
                                >
                                    {link}
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>

            {/* Subtle Divider */}
            <motion.hr
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="border-t border-white/10 mt-[-70px] mb-24 relative z-10"
            />

            {/* Bottom Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-[10px] text-sm opacity-50 font-jost relative z-20"
            >
                <div className="footer-copyright">
                    © {new Date().getFullYear()} Wysele. All rights reserved.
                </div>
                <div className="footer-legal-links flex gap-[30px]">
                    {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
                        <a key={link} href="#" className="hover:opacity-100 transition-opacity">
                            {link}
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Massive Backdrop Text */}
            <motion.div
                initial={{ y: 50, x: "-50%", opacity: 0 }}
                whileInView={{ y: 0, x: "-50%", opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute -bottom-[48px] left-1/2 font-inter font-bold text-[100px] lg:text-[230px] tracking-[-0.05em] text-white/25 whitespace-nowrap pointer-events-none select-none z-10"
            >
                wysele
            </motion.div>
        </footer>
    );
};

export default Footer;
