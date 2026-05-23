import React from "react";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import LogoWhiteImg from "../../../assets/LogoWhite.png";


export default function Footer() {
    const LOGO_WHITE = "https://wysele.com/wp-content/uploads/2025/02/logo1000.png";
    return (
        <footer className="bg-[#1A1614] text-white pt-16 pb-8 font-inter relative overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <img src={LogoWhiteImg} alt="Wysele" className="w-24 opacity-90" />
                        <p className="text-white/60 text-base leading-relaxed max-w-md">
                            Wysele is one of India’s top SAP solution providers, delivering end-to-end digital transformation for enterprises globally.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/wysele" },
                                { Icon: Instagram, href: "#" },
                                { Icon: Facebook, href: "#" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target={href !== "#" ? "_blank" : undefined}
                                    rel={href !== "#" ? "noopener noreferrer" : undefined}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <Icon size={20} className="text-white/60" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Company</h3>
                        <ul className="space-y-4 text-white/70">
                            {["Home", "About Us", "Our Services", "Industries"].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Expertise</h3>
                        <ul className="space-y-4 text-white/70">
                            {["Why Choose Us", "Our Team", "Latest Blogs", "Career"].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Connect</h3>
                        <ul className="space-y-4 text-white/70">
                            {["Contact", "LinkedIn", "WhatsApp", "Email Us"].map(item => (
                                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} Wysele. All rights reserved.</p>
                    <div className="flex gap-8">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map(item => (
                            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Backdrop Text */}
            <motion.div
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                whileInView={{ opacity: 1, y: 0, x: "-50%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 md:-bottom-10 left-1/2 text-[12vw] md:text-[15vw] font-bold text-white/[0.04] md:text-white/[0.06] select-none pointer-events-none whitespace-nowrap"
            >
                WYSELE
            </motion.div>
        </footer>
    );
}
