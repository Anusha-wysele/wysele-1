import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeSlideUp, staggerContainer, viewportSettings } from "../../common/animations";
import HeadingBracket from "../../common/HeadingBracket";

import aerospaceImg from "../../../assets/wysele-AerospaceDefense.webp";
import agribusinessImg from "../../../assets/wysele-industires-agribusines.webp";
import automotiveImg from "../../../assets/wysele-industry-automotive-heavy-equipment.webp";
import bankingImg from "../../../assets/Banking.webp";
import logisticsImg from "../../../assets/wysele-industry-logistics.webp";
import manufacturingImg from "../../../assets/wysele-industires-manufacturing.jpeg";
import miningImg from "../../../assets/wysele-Industry-mining.webp";
import pharmaImg from "../../../assets/wysele-industires-pharma.webp";
import retailImg from "../../../assets/Retail.webp";
import textilesImg from "../../../assets/wysele-industry-textile.webp";
import utilitiesImg from "../../../assets/wysele-industires-utilities.webp";

const industryImagesLocal = [
    manufacturingImg,
    utilitiesImg,
    logisticsImg,
    pharmaImg,
    agribusinessImg,
    aerospaceImg,
    automotiveImg,
    bankingImg,
    retailImg,
    textilesImg,
    miningImg
];

const industriesBase = [
    {
        name: "Manufacturing",
        title: "Manufacturing Industry",
        desc: "Enhance production efficiency and innovation with tailored SAP solutions. From shop floor to top floor, we help manufacturers streamline operations, reduce waste, and achieve operational excellence with intelligent ERP systems and real-time analytics.",
        tags: ["SAP S/4HANA", "Production Planning", "Quality Management", "Plant Maintenance"],
        color: "#1e3a5f",
        alt: "Manufacturing Solutions",
        titleAttr: "Manufacturing Services",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <rect x="8" y="28" width="48" height="28" rx="1" />
                <path d="M8 28 L20 16 L32 28 L44 16 L56 28" />
                <rect x="20" y="38" width="10" height="18" />
                <rect x="34" y="38" width="10" height="18" />
                <line x1="32" y1="8" x2="32" y2="16" />
                <circle cx="32" cy="6" r="3" />
            </svg>
        ),
    },
    {
        name: "Utilities",
        title: "Utilities Industry",
        desc: "Improve operational efficiency with advanced SAP Signavio analytics. We empower utility providers to modernize infrastructure management, optimize asset performance, and deliver reliable services through data-driven insights and process automation.",
        tags: ["Asset Management", "SAP Signavio", "Process Analytics", "Grid Optimization"],
        color: "#1a4a3a",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <circle cx="32" cy="32" r="18" />
                <path d="M32 14 L32 32 L44 24" />
                <circle cx="32" cy="32" r="4" fill="white" stroke="none" opacity="0.4" />
                <path d="M20 52 Q32 44 44 52" />
            </svg>
        ),
    },
    {
        name: "Logistics",
        title: "Logistics Industry",
        desc: "Seamlessly integrate and manage enterprise-wide data with SAP. Our logistics solutions help companies gain full supply chain visibility, automate warehouse operations, and optimize last-mile delivery with intelligent tracking and routing capabilities.",
        tags: ["Supply Chain", "Warehouse Management", "Transportation", "Track & Trace"],
        color: "#2c1a4a",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <rect x="6" y="30" width="32" height="20" rx="2" />
                <path d="M38 38 L50 38 L56 46 L56 50 L38 50 Z" />
                <circle cx="16" cy="52" r="5" />
                <circle cx="44" cy="52" r="5" />
                <path d="M6 36 L38 36" />
            </svg>
        ),
    },
    {
        name: "Pharmaceutical",
        title: "Pharmaceutical Industry",
        desc: "Accelerate digital transformation with secure and compliant SAP solutions. We help pharmaceutical companies navigate complex regulatory requirements, manage clinical data, ensure product quality, and bring life-saving therapies to market faster.",
        tags: ["Regulatory Compliance", "GMP", "Clinical Management", "Drug Safety"],
        color: "#1e2d40",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <rect x="22" y="8" width="20" height="8" rx="2" />
                <rect x="14" y="16" width="36" height="40" rx="3" />
                <line x1="32" y1="26" x2="32" y2="46" />
                <line x1="22" y1="36" x2="42" y2="36" />
            </svg>
        ),
    },
    {
        name: "Agribusiness",
        title: "Agribusiness Industry",
        desc: "Leverage SAP Business Technology Platform for improved agility and growth. We support agribusiness operations across the entire value chain — from field to fork — with precision farming analytics, commodity management, and supply chain traceability.",
        tags: ["SAP BTP", "Commodity Management", "Field Analytics", "Supply Chain"],
        color: "#1a3a1a",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <path d="M32 56 L32 28" />
                <path d="M32 28 Q20 20 20 10 Q32 14 32 28" />
                <path d="M32 36 Q44 28 50 18 Q38 20 32 36" />
                <circle cx="32" cy="58" r="3" />
            </svg>
        ),
    },
    {
        name: "Aerospace & Defense",
        title: "Aerospace & Defense",
        desc: "Enable secure and seamless data flow between SAP and non-SAP systems. We serve aerospace and defense organizations with mission-critical integration solutions, compliance frameworks, and advanced analytics for complex program management.",
        tags: ["System Integration", "Compliance", "MRO", "Program Management"],
        color: "#0f1e3a",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <path d="M8 40 L32 16 L56 40 L48 40 L48 52 L16 52 L16 40 Z" />
                <path d="M24 40 L24 52" />
                <path d="M40 40 L40 52" />
                <ellipse cx="32" cy="40" rx="6" ry="3" />
            </svg>
        ),
    },
    {
        name: "Automotive & Heavy Equipment",
        title: "Automotive & Heavy Equipment",
        desc: "Optimize invoicing, billing, and supply chain with SAP automation. Our automotive solutions streamline complex manufacturing processes, dealer management, warranty handling, and connected vehicle data integration for the modern auto industry.",
        tags: ["SAP Automation", "Supply Chain", "Warranty Management", "Dealer Network"],
        color: "#2a1a10",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <rect x="10" y="28" width="44" height="20" rx="4" />
                <path d="M14 28 L20 16 L44 16 L50 28" />
                <circle cx="20" cy="50" r="7" />
                <circle cx="44" cy="50" r="7" />
                <rect x="26" y="20" width="12" height="8" rx="1" />
            </svg>
        ),
    },
    {
        name: "Banking & Financial",
        title: "Banking & Financial",
        desc: "Ensure smooth business continuity with hassle-free SAP migration. We guide financial institutions through core banking transformations, risk management implementations, and regulatory reporting automation with minimal disruption to operations.",
        tags: ["Core Banking", "Risk Management", "Regulatory Reporting", "SAP Migration"],
        color: "#1a1a2e",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <rect x="10" y="20" width="44" height="32" rx="2" />
                <path d="M10 28 L54 28" />
                <rect x="16" y="34" width="12" height="8" rx="1" />
                <rect x="32" y="34" width="16" height="3" rx="1" />
                <rect x="32" y="40" width="10" height="3" rx="1" />
                <path d="M10 20 L32 10 L54 20" />
            </svg>
        ),
    },
    {
        name: "Retail",
        title: "Retail Industry",
        desc: "Upgrade to SAP S/4HANA for real-time insights and intelligent operations. We help retailers unify online and offline channels, optimize inventory replenishment, personalize customer experiences, and maximize margins with predictive analytics.",
        tags: ["SAP S/4HANA", "Omnichannel", "Inventory Optimization", "Customer Analytics"],
        color: "#2a1020",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <path d="M14 20 L18 8 L46 8 L50 20 Z" />
                <rect x="14" y="20" width="36" height="36" rx="2" />
                <rect x="22" y="32" width="20" height="24" />
                <path d="M26 20 Q26 14 32 14 Q38 14 38 20" />
            </svg>
        ),
    },
    {
        name: "Textiles",
        title: "Textiles Industry",
        desc: "Transform business processes with SAP S/4HANA for increased efficiency. Our textile industry solutions cover end-to-end production planning, fabric procurement, quality control, and fashion retail management for global textile enterprises.",
        tags: ["Production Planning", "Procurement", "Quality Control", "Fashion Retail"],
        color: "#1a2a1a",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 64, height: 64, opacity: 0.25 }}>
                <path d="M16 16 Q32 8 48 16 L48 48 Q32 56 16 48 Z" />
                <path d="M16 16 L16 48" />
                <path d="M48 16 L48 48" />
                <path d="M16 32 Q32 24 48 32" />
                <circle cx="32" cy="32" r="4" opacity="0.4" fill="white" stroke="none" />
            </svg>
        ),
    },
    {
        name: "Mining",
        title: "Mining Industry",
        desc: "Enhance operational performance and decision-making with SAP S/4HANA. We deliver specialized mining solutions for asset lifecycle management, safety compliance, resource planning, and environmental reporting to drive sustainable mining operations.",
        tags: ["Asset Lifecycle", "Safety Compliance", "Resource Planning", "Environmental"],
        color: "#2a2010",
        Icon: () => (
            <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1.5" style={{ width: 80, height: 80, opacity: 0.25 }}>
                <path d="M12 52 L24 28 L32 40 L40 20 L52 52 Z" />
                <circle cx="20" cy="24" r="4" />
                <path d="M36 16 L40 8 L44 16" />
                <line x1="40" y1="8" x2="40" y2="20" />
            </svg>
        ),
    },
];

const industries = industriesBase.map((ind, idx) => ({
    ...ind,
    img: industryImagesLocal[idx] || null,
}));

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

function PlusIcon({ active }) {
    return (
        <div style={{
            position: "relative",
            width: 20,
            height: 20,
            flexShrink: 0,
        }}>
            <span style={{
                position: "absolute", background: "#c0392b", borderRadius: 1,
                top: "50%", left: "50%", width: 14, height: 2,
                transform: "translate(-50%, -50%) rotate(0deg)",
            }} />
            <span style={{
                position: "absolute", background: "#c0392b", borderRadius: 1,
                top: "50%", left: "50%", width: 2, height: 14,
                transform: `translate(-50%, -50%) rotate(${active ? "90deg" : "0deg"})`,
                opacity: active ? 0 : 1,
                transition: "all 0.3s ease",
            }} />
        </div>
    );
}

function Tag({ label }) {
    return (
        <motion.span
            whileHover={{ scale: 1.05, borderColor: "#c0392b", color: "#c0392b" }}
            style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.6px", textTransform: "uppercase",
                padding: "4px 10px", border: `1px solid #dde2e8`, color: "#6b7a8d",
                borderRadius: 2, cursor: "default", transition: "all 0.2s",
            }}
        >
            {label}
        </motion.span>
    );
}

function ContentPanel({ industry, isMobile }) {
    const { Icon, img } = industry;

    return (
        <motion.div
            key={industry.name}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ display: "flex", flexDirection: "column" }}
        >
            <div style={{
                width: "100%",
                height: isMobile ? 180 : 240,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                marginBottom: 15
            }}>
                <motion.div
                    initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(135deg, ${industry.color} 0%, ${industry.color}cc 60%, ${industry.color}88 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {img ? (
                        <img loading="lazy" src={img} alt={industry.alt || industry.title} title={industry.titleAttr || industry.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        <Icon />
                    )}
                </motion.div>
            </div>

            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 20 }
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                <motion.div initial={{ width: 0 }} animate={{ width: 56 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ height: 3, background: "#1e2d40", width: 56, margin: "0 0 18px" }} />
                <h2 style={{ fontSize: isMobile ? "1.2rem" : "1.5rem", fontWeight: 700, color: "#1e2d40", marginBottom: 14 }}>{industry.title}</h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#6b7a8d", fontWeight: 400, marginBottom: 20 }}>{industry.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                    {industry.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function IndustriesWeServe() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const width = useWindowWidth();
    const isMobile = width < 768;

    useEffect(() => {
        industryImagesLocal.forEach((imgSrc) => {
            if (imgSrc) {
                const img = new Image();
                img.src = imgSrc;
            }
        });
    }, []);

    return (

        <div style={{
            fontFamily: "'Jost', sans-serif",
            background: "#ffffff",
            color: "#2c3e50",
            height: "auto",
            padding: isMobile ? "25px 20px" : "35px 40px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: 4 }}>
                <HeadingBracket size={isMobile ? 30 : 40} style={{ transform: isMobile ? "translate(24px, -8px)" : "translate(32px, -10px)" }} />
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: isMobile ? "1.2rem" : "1.6rem",
                        fontWeight: 700,
                        color: "#1e2d40",
                        marginBottom: 0,
                        letterSpacing: "-0.5px",
                    }}
                >
                    Industries we serve
                </motion.h2>
            </div>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ width: 40, height: 3, background: "#c0392b", marginBottom: isMobile ? 16 : 24 }}
            />

            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
                gap: isMobile ? 30 : 60,
                alignItems: "start",
            }}>
                {/* LEFT — Accordion */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportSettings}
                    variants={staggerContainer}
                    style={{ borderTop: "1px solid #dde2e8", order: isMobile ? 2 : 1 }}
                >
                    {industries.map((ind, i) => (
                        <motion.div
                            key={ind.name}
                            variants={fadeSlideUp}
                            style={{ borderBottom: "1px solid #dde2e8", cursor: "pointer" }}
                            onClick={() => setActiveIndex(i)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", padding: "8px 4px", fontSize: "0.95rem" }}>
                                <motion.span
                                    animate={{
                                        color: activeIndex === i ? "#c0392b" : hoveredIndex === i ? "#c0392b" : "#2c3e50",
                                        fontWeight: activeIndex === i ? 600 : 400
                                    }}
                                    style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", transition: "color 0.2s" }}
                                >
                                    {ind.name}
                                </motion.span>
                                <PlusIcon active={activeIndex === i} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* RIGHT — Content Panel */}
                <div style={{ position: "sticky", top: 80, order: isMobile ? 1 : 2 }}>
                    <AnimatePresence mode="wait">
                        <ContentPanel key={activeIndex} industry={industries[activeIndex]} isMobile={isMobile} />
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}