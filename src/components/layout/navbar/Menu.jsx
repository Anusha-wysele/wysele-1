import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Facebook, X } from "lucide-react";
import { menuImage, WYSELE_LOGOS } from "../../common/data";

const SAP_SERVICES_LIST = [
  { label: "SAP Consulting Services", path: "/services/sap-consulting" },
  { label: "SAP Signavio Solutions", path: "/services/sap-signavio" },
  { label: "SAP Datasphere Support", path: "/services/sap-datasphere" },
  { label: "RISE with SAP", path: "/services/rise-with-sap" },
  { label: "BTP services", path: "/services/sap-btp" },
  { label: "SAP Integration Services", path: "/services/sap-integration" },
  { label: "SAP VIM & BRIM Services", path: "/services/sap-vim-brim" },
  { label: "Migration Services", path: "/services/sap-migration" },
  { label: "S/4 HANA Conversion", path: "/services/sap-s4hana" },
  { label: "Gen AI Services", path: "/services/sap-genai" },
  { label: "Master Data Governance", path: "/services/sap-masterdata" },
  { label: "SAP BTP & API Mgmt", path: "/services/sap-btp-api-management" },
  { label: "Technical Consulting", path: "/services/sap-technical-consulting" },
  { label: "OpenText Services", path: "/services/sap-opentext" }
];

export default function Menu({ open, onClose }) {
  const navigate = useNavigate();
  const [sapServicesOpen, setSapServicesOpen] = useState(false);

  const navButtonStyle = {
    background: "none", border: "none", padding: 0,
    textAlign: "left", color: "#fff", fontSize: 15, fontWeight: 500,
    cursor: "pointer", transition: "all 0.3s ease",
    display: "flex", alignItems: "center", gap: 8
  };

  const handleNavMouseEnter = e => {
    e.currentTarget.style.color = "#fbbf24";
    e.currentTarget.style.paddingLeft = "8px";
  };

  const handleNavMouseLeave = e => {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.paddingLeft = "0";
  };

  // Social icon helper
  const SocialIcon = ({ Icon }) => (
    <a
      href="#"
      style={{
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(156,163,175,0.2)", color: "#9ca3af",
        transition: "all 0.3s ease", textDecoration: "none"
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#fbbf24"; e.currentTarget.style.color = "#111827"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(156,163,175,0.2)"; e.currentTarget.style.color = "#9ca3af"; }}
    >
      <Icon size={16} />
    </a>
  );

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        zIndex: 990,
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
        transition: "visibility 0.5s",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.6s ease",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Slide-in panel */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: 340,
          maxWidth: "85vw",
          background: "#2d3237",
          boxShadow: "-10px 0 50px rgba(0,0,0,0.3)",
          display: "flex", flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 991,
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* FIXED HEADER: Logo, Close, and Intro */}
        <div style={{
          padding: "30px 30px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          flexShrink: 0,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.5s ease 0.1s"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
            <img
              src={WYSELE_LOGOS.white}
              alt="Wysele Logo"
              style={{ width: 80, height: "auto" }}
            />
            <button
              onClick={onClose}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#fff", opacity: 0.8, padding: 4,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = "rotate(90deg)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.8; e.currentTarget.style.transform = "rotate(0deg)"; }}
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <p style={{
            color: "#9ca3af", fontSize: 13, lineHeight: 1.5,
            fontWeight: 400, letterSpacing: "0.01em"
          }}>
            We always aim to improve. Here&apos;s what some of our customers shared about their experience:
          </p>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "25px 30px 40px",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {/* Testimonial Card */}
          <div style={{
            background: "#fff", borderRadius: 10, padding: "22px 20px", marginBottom: 30,
            boxShadow: "0 15px 30px rgba(0,0,0,0.15)", opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.2s"
          }}>
            <h3 style={{
              color: "#1e293b", fontSize: 16, fontWeight: 700, marginBottom: 12,
            }}>
              -DigitalExcellence
            </h3>
            <p style={{
              color: "#475569", fontSize: 13, lineHeight: 1.5, fontStyle: "italic", marginBottom: 16,
            }}>
              &ldquo;The strategic partnership with Wysele has been transformative for our global operations. Their expertise in AI-driven analytics has not only optimized our workflow but also future-proofed our business model.&rdquo;
            </p>
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
              <p style={{ color: "#1e293b", fontSize: 12, fontWeight: 700, marginBottom: 2 }}>
                &mdash; Chief Technology Officer
              </p>
              <p style={{ color: "#1e293b", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                NexGen Global Solutions
              </p>
              <p style={{ color: "#fbbf24", fontSize: 11, fontWeight: 500 }}>
                Scaling innovation across 42 regions
              </p>
            </div>
          </div>

          {/* Office Image */}
          <div style={{
            borderRadius: 8, overflow: "hidden", marginBottom: 35,
            boxShadow: "0 12px 25px rgba(0,0,0,0.2)", opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.3s"
          }}>
            <img
              src={menuImage}
              alt="Our Office"
              style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
            />
          </div>

          {/* QUICK LINKS */}
          <div style={{
            marginBottom: 40,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s ease 0.35s"
          }}>
            <h4 style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Home */}
              <button
                onClick={() => { navigate("/"); onClose(); window.scrollTo(0, 0); }}
                style={navButtonStyle}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                Home
              </button>

              {/* About Us */}
              <button
                onClick={() => { navigate("/about"); onClose(); window.scrollTo(0, 0); }}
                style={navButtonStyle}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                About Us
              </button>

              {/* SAP Services dropdown accordion */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() => setSapServicesOpen(!sapServicesOpen)}
                  style={{
                    background: "none", border: "none", padding: 0,
                    textAlign: "left", color: sapServicesOpen ? "#fbbf24" : "#fff",
                    fontSize: 15, fontWeight: 500,
                    cursor: "pointer", transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", gap: 8,
                    width: "100%"
                  }}
                  onMouseEnter={handleNavMouseEnter}
                  onMouseLeave={e => {
                    if (!sapServicesOpen) e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  <span>SAP Services</span>
                  <span style={{
                    fontSize: 10,
                    transform: sapServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    opacity: 0.6
                  }}>▼</span>
                </button>

                <div style={{
                  maxHeight: sapServicesOpen ? "450px" : "0px",
                  opacity: sapServicesOpen ? 1 : 0,
                  overflowY: "auto",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  paddingLeft: 16,
                  marginTop: sapServicesOpen ? 10 : 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  scrollbarWidth: "none"
                }}>
                  {SAP_SERVICES_LIST.map((subService) => (
                    <button
                      key={subService.label}
                      onClick={() => {
                        navigate(subService.path);
                        onClose();
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        background: "none", border: "none", padding: 0,
                        textAlign: "left", color: "#9ca3af", fontSize: 13.5, fontWeight: 400,
                        cursor: "pointer", transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#fbbf24"; e.currentTarget.style.paddingLeft = "6px"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.paddingLeft = "0"; }}
                    >
                      • {subService.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <button
                onClick={() => { navigate("/industries"); onClose(); window.scrollTo(0, 0); }}
                style={navButtonStyle}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                Industries
              </button>

              {/* Blogs */}
              <button
                onClick={() => { navigate("/blogs"); onClose(); window.scrollTo(0, 0); }}
                style={navButtonStyle}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                Blogs
              </button>

              {/* Careers */}
              <button
                onClick={() => { navigate("/careers"); onClose(); window.scrollTo(0, 0); }}
                style={navButtonStyle}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                Careers
              </button>
            </div>
          </div>

          {/* SERVICES */}
          <div style={{
            marginBottom: 40,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s ease 0.38s"
          }}>
            <h4 style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              Services
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "SAP Services", path: "/sap-services" },
                { label: "Salesforce Services", path: "/services/salesforce" },
                { label: "IT Infrastructure Services", path: "/services/itinfrastructure" },
                { label: "Cybersecurity Services", path: "/services/cybersecurityhome" },
                { label: "Web Development", path: "/services/web-development" },
                { label: "App Development", path: "/services/app-development" },
                { label: "IoT Services", path: "/services/iot-services" },
                { label: "AI/ML Services", path: "/services/aiml-services" }
              ].map((service) => (
                <button
                  key={service.label}
                  onClick={() => {
                    navigate(service.path);
                    onClose();
                  }}
                  style={{
                    background: "none", border: "none", padding: 0,
                    textAlign: "left", color: "#fff", fontSize: 15, fontWeight: 500,
                    cursor: "pointer", transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", gap: 8
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fbbf24"; e.currentTarget.style.paddingLeft = "8px"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.paddingLeft = "0"; }}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer / Contact */}
          <div style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s ease 0.4s"
          }}>
            <a
              href="mailto:contact@wysele.com"
              style={{
                color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none",
                display: "block", marginBottom: 18, transition: "color 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#fbbf24"}
              onMouseLeave={e => e.currentTarget.style.color = "#fff"}
            >
              contact@wysele.com
            </a>

            <div style={{ display: "flex", gap: 10 }}>
              <SocialIcon Icon={Linkedin} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Facebook} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
