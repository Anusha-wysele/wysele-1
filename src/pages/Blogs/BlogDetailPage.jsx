import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import Footer from "../../components/layout/section/Footer";
import blogService from "../../services/blogService";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        // Backend might return { blog: { ... } } or just { ... }
        const blogData = data.blog || data.data || data;
        setBlog(blogData);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Blog post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
    window.scrollTo(0, 0);
  }, [id]);

  // Inject per-blog dynamic SEO meta once blog data is loaded
  useEffect(() => {
    if (!blog) return;

    const prevTitle = document.title;
    const pageTitle = `${blog.title} | Wysele Technologies`;
    const pageDesc = blog.excerpt || blog.summary || blog.description ||
      (blog.content ? blog.content.substring(0, 160).replace(/\n/g, ' ') + '...' : '');
    const pageImage = blog.image_url || blog.img || 'https://www.wysele.com/og-image.png';
    const canonical = `https://www.wysele.com/blogs/${id}`;

    document.title = pageTitle;

    const setMeta = (attr, name, value) => {
      let el = document.querySelector(`meta[${attr}='${name}']`);
      const oldVal = el ? el.getAttribute('content') : null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
      return () => {
        if (oldVal !== null) el.setAttribute('content', oldVal);
        else el.remove();
      };
    };

    const setLink = (rel, value) => {
      let el = document.querySelector(`link[rel='${rel}']`);
      const oldVal = el ? el.getAttribute('href') : null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', value);
      return () => {
        if (oldVal !== null) el.setAttribute('href', oldVal);
        else el.remove();
      };
    };

    const cleanups = [
      setMeta('name', 'description', pageDesc),
      setMeta('property', 'og:title', pageTitle),
      setMeta('property', 'og:description', pageDesc),
      setMeta('property', 'og:image', pageImage),
      setMeta('property', 'og:url', canonical),
      setMeta('property', 'og:type', 'article'),
      setMeta('name', 'twitter:title', pageTitle),
      setMeta('name', 'twitter:description', pageDesc),
      setMeta('name', 'twitter:image', pageImage),
      setLink('canonical', canonical),
    ];

    // Article schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-article-schema';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "description": pageDesc,
      "image": pageImage,
      "url": canonical,
      "datePublished": blog.created_at || blog.date || '',
      "publisher": {
        "@type": "Organization",
        "name": "Wysele Technologies",
        "logo": { "@type": "ImageObject", "url": "https://www.wysele.com/og-image.png" }
      }
    });
    document.head.appendChild(script);

    return () => {
      document.title = prevTitle;
      cleanups.forEach(fn => fn());
      const s = document.getElementById('blog-article-schema');
      if (s) s.remove();
    };
  }, [blog, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#C9184A] rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading article...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">OOPS!</h1>
        <p className="text-gray-500 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
        <button 
          onClick={() => navigate('/blogs')}
          className="px-8 py-3 bg-[#C9184A] text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif] pt-[68px]">
      <Breadcrumbs />
      {/* Article Header */}
      <section className="pt-12 pb-12 px-6 md:px-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#C9184A] text-[10px] font-black uppercase tracking-widest transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-crimson-50 text-[10px] font-black text-crimson-600 rounded uppercase tracking-wider">
              {blog.category || (blog.tags && blog.tags[0]) || "Insights"}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} /> {blog.read_time || "5 MIN READ"}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar size={12} /> {blog.day || ''} {blog.month || ''}, {blog.year || ''}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.1] mb-5">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#800000] flex items-center justify-center text-white font-bold text-xs">
                W
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Wysele Editorial Team</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Published by Wysele</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin size={18} /></button>
              <button className="p-2 text-gray-400 hover:text-[#C9184A] transition-colors"><Share2 size={18} /></button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-20 max-w-5xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-video overflow-hidden bg-gray-100"
        >
          <img loading="lazy" src={blog.image_url || blog.img} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="px-6 md:px-20 max-w-4xl mx-auto pb-32">
        <div 
          className="prose prose-lg max-w-none text-gray-600 leading-[1.8] text-base md:text-lg whitespace-pre-wrap"
        >
          {blog.content}
        </div>

        {/* Tags */}
        {/* {(blog.tags || blog.category) && (
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            {(blog.tags || [blog.category]).map((tag, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                #{tag}
              </span>
            ))}
          </div>
        )} */}

        {/* Author Bio Card */}
        <div className="mt-20 p-8 md:p-12 bg-gray-50 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-[#800000] flex items-center justify-center text-white font-black text-2xl shrink-0">
            W
          </div>
          <div>
            <h4 className="text-xs font-black text-[#C9184A] uppercase tracking-widest mb-2">About the Author</h4>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Wysele Editorial Team</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Bringing you the latest insights into enterprise technology, digital transformation, and business strategy. 
              Our team of experts delivers in-depth analysis to help your organization excel in a changing world.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
