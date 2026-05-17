import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts as staticBlogPosts } from "../../common/data";
import blogService from "../../../services/blogService";
import HeadingBracket from "../../common/HeadingBracket";
import Button from "../../common/Button";

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
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const tag = post.tags?.[0] ?? "Insights";
  const dateStr = `${post.month.toUpperCase()} ${post.day}, ${post.year}  ·  10 MIN READ`;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/blogs/${post.id || post._id}`)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      <div style={{ height: "1px", background: "#c9cdd2", marginBottom: "10px" }} />
      <div style={{ width: "100%", height: isMobile ? "180px" : "220px", overflow: "hidden", marginBottom: "10px" }}>
        <motion.img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
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
   <h3 style={{
        fontSize: isMobile ? "0.95rem" : "1.05rem", fontWeight: 400, lineHeight: 1.4,
        color: hovered ? "#374151" : "#111827",
        fontFamily: "Inter, sans-serif", transition: "color 0.2s",
        margin: 0,
      }}>
        {post.title}
      </h3>
    
      <button style={{
        display: "flex", alignItems: "center", gap: "8px", 
        color: "#ffcc00", fontSize: "12px", fontWeight: 300, 
        textTransform: "capitalize", letterSpacing: "0.05em",
        background: "none", border: "none", cursor: "pointer",
        padding: 0
      }}>
        Read More <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

// Card where text sits BELOW the image — shorter image height (even cards)
function BlogCardTextInside({ post, isMobile }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const tag = post.tags?.[0] ?? "Insights";
  const dateStr = `${post.month.toUpperCase()} ${post.day}, ${post.year}  ·  10 MIN READ`;

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/blogs/${post.id || post._id}`)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
    >
      <div style={{ height: "1px", background: "#c9cdd2", marginBottom: "10px" }} />
      <div style={{ width: "100%", height: isMobile ? "180px" : "160px", overflow: "hidden", marginBottom: "10px" }}>
        <motion.img
          src={post.img}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
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
     <h3 style={{
        fontSize: isMobile ? "0.95rem" : "1.05rem", fontWeight: 400, lineHeight: 1.4,
        color: hovered ? "#374151" : "#111827",
        fontFamily: "Inter, sans-serif", transition: "color 0.2s",
        margin: 0,
      }}>
        {post.title}
      </h3>
     
      <button style={{
        display: "flex", alignItems: "center", gap: "8px", 
        color: "#ffcc00", fontSize: "12px", fontWeight: 300, 
        textTransform: "capitalize", letterSpacing: "0.05em",
        background: "none", border: "none", cursor: "pointer",
        padding: 0
      }}>
        Read More <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

export default function BlogsBanner() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(true);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllBlogs();
        let fetchedBlogs = [];
        if (Array.isArray(data)) fetchedBlogs = data;
        else if (data.results && Array.isArray(data.results)) fetchedBlogs = data.results;
        else if (data.blogs && Array.isArray(data.blogs)) fetchedBlogs = data.blogs;
        else if (data.data && Array.isArray(data.data)) fetchedBlogs = data.data;

        if (fetchedBlogs.length > 0) {
          const mappedBlogs = fetchedBlogs.map(blog => ({
            ...blog,
            day: blog.day || new Date(blog.createdAt || Date.now()).getDate().toString().padStart(2, '0'),
            month: blog.month || new Date(blog.createdAt || Date.now()).toLocaleString('default', { month: 'short' }),
            year: blog.year || new Date(blog.createdAt || Date.now()).getFullYear().toString(),
            img: blog.image_url || blog.img || "https://images.pexels.com/photos/7988751/pexels-photo-7988751.jpeg?auto=compress&cs=tinysrgb&w=1200",
            tags: blog.category ? [blog.category] : (blog.tags || ["Insights"])
          }));
          setBlogPosts(mappedBlogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs for banner:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase()));

  const displayPosts = filtered.slice(0, 4);

  return (
    <section style={{ background: "#ffffff", padding: isMobile ? "30px 20px" : "45px 60px", fontFamily: "Inter, sans-serif" }}>
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", alignItems: "flex-start", gap: isMobile ? "16px" : "40px", marginBottom: isMobile ? "24px" : "32px" }}
      >
        <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <HeadingBracket size={isMobile ? 40 : 64} style={{ transform: isMobile ? "translate(24px, -12px)" : "translate(40px, -20px)" }} />
          <h2 style={{ fontSize: isMobile ? "2.2rem" : "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: "#111827", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
            Wysele Blog
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} style={{ paddingTop: isMobile ? "0" : "8px" }}>
          <p style={{ fontSize: isMobile ? "13px" : "14px", color: "#374151", lineHeight: 1.7, marginBottom: "6px" }}>
            Every article is crafted to bring you closer to enterprise innovation, fostering a deeper connection with the future of technology.
          </p>
          <p style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 700, color: "#111827" }}>
            Get Inspired. Get Informed. Get Involved.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}
        style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: isMobile ? "24px" : "30px" }}
      >
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: isMobile ? "5px 14px" : "6px 18px", borderRadius: "6px", border: "1px solid #C9184A", background: isActive ? "#C9184A" : "transparent", color: isActive ? "#fff" : "#111827", fontSize: isMobile ? "12px" : "13px", fontWeight: 400, cursor: "pointer", transition: "all 0.3s ease", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "#C9184A"; e.currentTarget.style.color = "#ffffff"; } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#111827"; } }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      <motion.div
        key={activeCategory} initial="hidden" animate="visible" variants={stagger}
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr) auto", gap: isMobile ? "40px" : "28px", alignItems: "start" }}
      >
        {displayPosts.map((post, idx) => idx % 2 === 0 ? <BlogCardTextBelow key={post.title} post={post} isMobile={isMobile} /> : <BlogCardTextInside key={post.title} post={post} isMobile={isMobile} />)}

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: isTablet ? "0px" : "130px", justifyContent: isTablet ? "center" : "flex-start", gridColumn: isTablet ? "span 2" : "auto", paddingTop: isTablet ? "20px" : "0" }}>
            <Button text="View All" onClick={() => navigate('/blogs')} />
          </div>
        )}

        {isMobile && (
          <div className="w-full mt-2">
            <Button text="View all articles" onClick={() => navigate('/blogs')} className="w-full" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
