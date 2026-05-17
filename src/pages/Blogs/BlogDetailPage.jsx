import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Navbar from "../../components/layout/navbar/Navbar";
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
    <div className="min-h-screen bg-white font-['Inter',_sans-serif]">
      {/* Article Header */}
      <section className="pt-32 pb-12 px-6 md:px-20 max-w-5xl mx-auto">
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
          <img 
            src={blog.image_url || blog.img} 
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
