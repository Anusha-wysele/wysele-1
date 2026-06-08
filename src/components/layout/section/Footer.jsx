import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import LogoWhiteImg from "../../../assets/LogoWhite.png";


export default function Footer() {
    return (
        <footer className="bg-[#1A1614] text-white pt-16 pb-8 font-inter relative overflow-hidden">
            <div className="max-w-7xl 3xl:max-w-8xl 4xl:max-w-9xl mx-auto px-6 md:px-8 lg:px-16 w-full relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <a
                            href="https://www.wysele.com/"
                            title="Wysele Technologies Home"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="block w-fit"
                        >
                            <img loading="lazy" src={LogoWhiteImg} alt="Wysele Enterprise Logo" title="Wysele Technologies" width="96" height="24" className="w-24 opacity-90" />
                        </a>
                        <p className="text-white/60 text-base leading-relaxed max-w-md">
                            Wysele is one of India’s top SAP solution providers, delivering end-to-end digital transformation for enterprises globally.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/wyseletechnologies", title: "Wysele Technologies LinkedIn Profile" },
                                { Icon: Instagram, href: "#!", title: "Wysele Technologies Instagram Profile" },
                                { Icon: Facebook, href: "#!", title: "Wysele Technologies Facebook Profile" }
                            ].map(({ Icon, href, title }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    title={title}
                                    aria-label={title}
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
                            {[
                                { label: "Home", href: "https://www.wysele.com/", title: "Wysele Technologies Home" },
                                { label: "About Us", href: "/about", title: "About Wysele Technologies" },
                                { label: "Our Services", href: "/sap-services", title: "Wysele Enterprise SAP and IT Services" },
                                { label: "Industries", href: "/industries", title: "Industries | Wysele" },
                                { label: "Site Map", href: "/sitemap", title: "Wysele Technologies Site Map" }
                            ].map(item => (
                                <li key={item.label}>
                                    <a href={item.href} title={item.title} className="hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Expertise</h3>
                        <ul className="space-y-4 text-white/70">
                            {[
                                { label: "Why Choose Us", href: "/about", title: "Why Choose Wysele Technologies" },
                                { label: "Our Team", href: "/#team", title: "Meet the Wysele Team" },
                                { label: "Latest Blogs", href: "/blogs", title: "Wysele Technologies Latest Blogs and Insights" },
                                { label: "Career", href: "/careers", title: "Careers and Job Opportunities at Wysele" }
                            ].map(item => (
                                <li key={item.label}>
                                    <a href={item.href} title={item.title} className="hover:text-white transition-colors">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">Connect</h3>
                        <ul className="space-y-4 text-white/70">
                            {[
                                { label: "Contact", href: "/contact", title: "Contact Wysele Technologies" },
                                { label: "LinkedIn", href: "https://www.linkedin.com/company/wyseletechnologies", title: "Wysele Technologies LinkedIn Profile", target: "_blank", rel: "noopener noreferrer" },
                                { label: "WhatsApp", href: "#!", title: "Chat with Wysele on WhatsApp" },
                                { label: "Email Us", href: "mailto:info@wysele.com", title: "Contact Wysele Technologies" }
                            ].map(item => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        title={item.title}
                                        target={item.target}
                                        rel={item.rel}
                                        className="hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} Wysele. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            { label: "Privacy Policy", href: "/privacy-policy", title: "Wysele Technologies Privacy Policy" },
                            { label: "Terms of Service", href: "/terms-of-service", title: "Wysele Technologies Terms of Service" },
                            { label: "Cookies", href: "/cookie-policy", title: "Wysele Technologies Cookie Policy" },
                            { label: "Site Map", href: "/sitemap", title: "Wysele Technologies HTML Site Map" },
                            { label: "XML Sitemap", href: "/sitemap.xml", title: "Wysele Technologies XML Sitemap for Search Engines" }
                        ].map(item => (
                            <a key={item.label} href={item.href} title={item.title} className="hover:text-white transition-colors">
                                {item.label}
                            </a>
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
