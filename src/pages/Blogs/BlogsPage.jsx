import { motion } from "framer-motion";
import { ArrowRight, Clock, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogsHeroBg from "../../assets/wysele-insights.webp";
import blogsDefaultImg from "../../assets/wysele-blogs1.webp";

import Breadcrumbs from "../../components/common/Breadcrumbs";
import { staticBlogPosts } from "../../components/layout/section/BlogsBanner";
import Footer from "../../components/layout/section/Footer";
import blogService from "../../services/blogService";

const categories = ["All", "Organisation", "Innovation", "Technology", "Culture", "AI"];

const BlogsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const BLOGS_PER_PAGE = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllBlogs({ limit: 100 });

        let fetchedBlogs = [];
        if (Array.isArray(data)) fetchedBlogs = data;
        else if (data.results && Array.isArray(data.results)) fetchedBlogs = data.results;
        else if (data.blogs && Array.isArray(data.blogs)) fetchedBlogs = data.blogs;
        else if (data.data && Array.isArray(data.data)) fetchedBlogs = data.data;

        if (fetchedBlogs.length > 0) {
          const hostname = window.location.hostname.toLowerCase();
          const siteCompany = hostname.includes('orbintix') ? 'orbintix' : 
                              hostname.includes('gracevirtue') ? 'gracevirtue' : 'wysele';

          const mappedBlogs = fetchedBlogs
            .map(blog => {
              const hasPrefix = blog.category && blog.category.includes(':');
              const blogCompany = hasPrefix ? blog.category.split(':')[0] : (blog.company_name || blog.company || 'wysele');
              const cleanCategory = hasPrefix ? blog.category.split(':')[1] : (blog.category || 'Organisation');
              return {
                ...blog,
                company_name: blogCompany,
                category: cleanCategory,
                day: blog.day || new Date(blog.createdAt || Date.now()).getDate().toString().padStart(2, '0'),
                month: blog.month || new Date(blog.createdAt || Date.now()).toLocaleString('default', { month: 'short' }),
                year: blog.year || new Date(blog.createdAt || Date.now()).getFullYear().toString(),
                img: blog.image_url || blog.img || blogsDefaultImg,
                tags: cleanCategory ? [cleanCategory] : (blog.tags || ["Insights"]),
                excerpt: blog.excerpt || blog.content?.substring(0, 120) + "..." || "No description available."
              };
            })
            .filter(blog => blog.company_name.toLowerCase() === siteCompany);
            
          setBlogPosts(mappedBlogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" ||
      post.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase()) ||
      post.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE) || 1;
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[560px] lg:h-[600px] w-full overflow-hidden bg-black font-sans flex items-center justify-center">
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full relative"
            style={{
              backgroundImage: `url(${blogsHeroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-20 relative z-10 flex justify-center items-center w-full py-30">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-full max-w-full flex flex-col justify-center items-center text-center mt-24 md:mt-32"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
             
              <span className="w-2 h-3 rounded-full bg-[#800000]"></span>
              <span className="text-[#ffcc00] font-bold text-sm">Technology Insights</span>
            </div>

            <div className="w-12 h-[2px] bg-[#C9184A] mb-6 mx-auto"></div>

            <h1 className="text-xl md:text-3xl font-semibold text-white leading-[1.1] mb-3 tracking-normal capitalize">
              Transforming {" "}
              enterprises through {" "}
              intelligent innovation
            </h1>

            <p className="text-gray-300 text-base md:text-sm leading-relaxed mb-10 font-normal max-w-4xl">
              Explore expert insights on AI, cybersecurity, cloud infrastructure,
              digital transformation, and emerging technologies shaping the future
              of modern enterprises.
            </p>

            <button 
              onClick={() => document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#C9184A] text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-none"
            >
              Explore Insights
            </button>
          </motion.div>
        </div>
      </section>
      <Breadcrumbs />

      {/* Filter & Search Bar */}
      <section className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                    ? "bg-[#C9184A] text-white border-[#C9184A]"
                    : "bg-transparent text-gray-500 border-gray-200 hover:border-[#C9184A] hover:text-[#C9184A]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:border-[#C9184A] outline-none text-sm transition-all"
            />
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section id="blog-grid" className="py-10 px-6 md:px-20 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-[#C9184A] rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading latest stories...</p>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentBlogs.map((post, idx) => (
              <motion.div
                key={post.id || post._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                  <img loading="lazy" src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-normal uppercase tracking-widest text-[#C9184A]">
                      {post.tags?.[0] || post.category || "Insights"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {post.month} {post.day}, {post.year}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {post.read_time || "5 MIN READ"}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2  transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate(`/blogs/${post.id || post._id}`)}
                      className="flex items-center gap-2 text-[#ffcc00] text-[12px] font-semibold capitalize tracking-normal transition-all hover:gap-3"
                    >
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest">No articles found</h3>
            <button
              onClick={() => { setActiveCategory("All"); setSearchTerm(""); }}
              className="mt-4 text-[#C9184A] text-xs font-black uppercase tracking-widest hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Standalone Pagination Card */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center pt-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${
                  currentPage === 1 
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <span className="text-xs text-gray-500 font-semibold px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  currentPage === totalPages 
                    ? 'border border-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#C9184A] text-white hover:bg-[#a5133b] shadow-md shadow-red-900/10'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;
