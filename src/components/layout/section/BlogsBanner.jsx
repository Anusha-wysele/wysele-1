import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../../common/data";
import HeadingBracket from "../../common/HeadingBracket";

const categories = ["All", "Organisation", "Innovation", "Technology", "Culture", "AI"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

// Card where text sits BELOW the image (odd cards — tall image)
function BlogCardTextBelow({ post, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const tag = post.tags?.[0] ?? "Insights";
  const dateStr = `${post.month.toUpperCase()} ${post.day}, ${post.year}  ·  10 MIN READ`;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      {/* Top divider */}
      <div style={{ height: "1px", background: "#c9cdd2", marginBottom: "10px" }} />

      {/* Tall image */}
      <div style={{ width: "100%", height: isMobile ? "180px" : "220px", overflow: "hidden", marginBottom: "10px" }}>
        <motion.img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase", color: "#374151",
          border: "1px solid #9ca3af", borderRadius: "3px", padding: "1px 6px",
        }}>
          {tag}
        </span>
        <span style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "0.02em" }}>
          {dateStr}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? "0.95rem" : "1.05rem", fontWeight: 400, lineHeight: 1.4,
        color: hovered ? "#374151" : "#111827",
        fontFamily: "Inter, sans-serif", transition: "color 0.2s",
        margin: 0,
      }}>
        {post.title}
      </h3>
    </motion.div>
  );
}

// Card where text sits BELOW the image — shorter image height (even cards)
function BlogCardTextInside({ post, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const tag = post.tags?.[0] ?? "Insights";
  const dateStr = `${post.month.toUpperCase()} ${post.day}, ${post.year}  ·  10 MIN READ`;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      {/* Top divider */}
      <div style={{ height: "1px", background: "#c9cdd2", marginBottom: "10px" }} />

      {/* Shorter image — no overlay */}
      <div style={{ width: "100%", height: isMobile ? "180px" : "160px", overflow: "hidden", marginBottom: "10px" }}>
        <motion.img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <span style={{
          fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase", color: "#374151",
          border: "1px solid #9ca3af", borderRadius: "3px", padding: "1px 6px",
        }}>
          {tag}
        </span>
        <span style={{ fontSize: "10px", color: "#6b7280", letterSpacing: "0.02em" }}>
          {dateStr}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: isMobile ? "0.95rem" : "1.05rem", fontWeight: 400, lineHeight: 1.4,
        color: hovered ? "#374151" : "#111827",
        fontFamily: "Inter, sans-serif", transition: "color 0.2s",
        margin: 0,
      }}>
        {post.title}
      </h3>
    </motion.div>
  );
}

export default function BlogsBanner() {
  const [activeCategory, setActiveCategory] = useState("All");
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) =>
        p.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase())
      );

  const displayPosts = filtered.slice(0, 4);

  return (
    <section style={{
      background: "#ffffff",
      padding: isMobile ? "30px 20px" : "45px 60px",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* ── Header row ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          alignItems: "flex-start",
          gap: isMobile ? "16px" : "40px",
          marginBottom: isMobile ? "24px" : "32px",
        }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <HeadingBracket size={isMobile ? 40 : 64} style={{ transform: isMobile ? "translate(24px, -12px)" : "translate(40px, -20px)" }} />
          <h2
            style={{
              fontSize: isMobile ? "2.2rem" : "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400, color: "#111827", lineHeight: 1.05,
              letterSpacing: "-0.02em", margin: 0,
            }}
          >
            Wysele Blog
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} style={{ paddingTop: isMobile ? "0" : "8px" }}>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color: "#374151", lineHeight: 1.7, marginBottom: "6px" }}>
            Every article is crafted to bring you closer to enterprise innovation,
            fostering a deeper connection with the future of technology.
          </p>
          <p style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 700, color: "#111827" }}>
            Get Inspired. Get Informed. Get Involved.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Category pills ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: isMobile ? "24px" : "30px" }}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: isMobile ? "5px 14px" : "6px 18px",
                borderRadius: "6px",
                border: "1px solid #C9184A",
                background: isActive ? "#C9184A" : "transparent",
                color: isActive ? "#fff" : "#111827",
                fontSize: isMobile ? "12px" : "13px", fontWeight: 400, cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#C9184A";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#111827";
                }
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* ── Blog cards grid ── */}
      <motion.div
        key={activeCategory}
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr) auto",
          gap: isMobile ? "40px" : "28px",
          alignItems: "start",
        }}
      >
        {displayPosts.map((post, idx) =>
          idx % 2 === 0
            ? <BlogCardTextBelow key={post.title} post={post} isMobile={isMobile} />
            : <BlogCardTextInside key={post.title} post={post} isMobile={isMobile} />
        )}

        {/* Action arrow - hidden on mobile, shown on tablet/desktop */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: isTablet ? "0px" : "130px", justifyContent: isTablet ? "center" : "flex-start", gridColumn: isTablet ? "span 2" : "auto", paddingTop: isTablet ? "20px" : "0" }}>
            <button
              style={{
                color: "#111827",
                backgroundColor: "transparent",
                border: "1px solid #C9184A",
                padding: "10px 24px",
                borderRadius: "6px",
                fontSize: "0.95rem",
                fontWeight: "400",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C9184A", e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#111827")}
            >
              <span>View All</span>
              <svg
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "transform 0.3s ease" }}
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile View-All Button */}
        {isMobile && (
          <motion.button
            variants={fadeUp}
            style={{
              width: "100%",
              padding: "12px 28px",
              borderRadius: "6px",
              background: "transparent",
              border: "1px solid #C9184A",
              color: "#111827",
              fontSize: "0.95rem",
              fontWeight: 400,
              cursor: "pointer",
              marginTop: "10px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C9184A", e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#111827")}
          >
            <span>View all articles</span>
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "transform 0.3s ease" }}
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
