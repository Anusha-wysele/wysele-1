import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  ChevronRight,
  CloudLightning,
  Code,
  Database,
  ExternalLink,
  Home, Info,
  Map,
  Server,
  Shield,
  Smartphone, Wifi
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import Footer from '../../components/layout/section/Footer';
import blogService from '../../services/blogService';

/* ─── Sitemap Data Structure ──────────────────────────────────────────────── */

const SITE_SECTIONS = [
  {
    id: 'main',
    title: 'Main Pages',
    icon: Home,
    color: '#800000',
    pages: [
      { label: 'Home', path: '/', desc: 'Digital transformation solutions for enterprises' },
      { label: 'About Us', path: '/about', desc: 'Our story, mission, values and leadership team' },
      { label: 'Industries We Serve', path: '/industries', desc: 'Sector-specific expertise across verticals' },
      { label: 'Blogs & Insights', path: '/blogs', desc: 'Thought leadership, trends and case studies' },
      { label: 'Careers', path: '/careers', desc: 'Join our growing team of technology experts' },
      { label: 'Contact Us', path: '/contact', desc: 'Get in touch with our consultants' },
    ],
  },
  {
    id: 'sap',
    title: 'SAP Services',
    icon: Database,
    color: '#0070b8',
    pages: [
      { label: 'SAP Services Hub', path: '/sap-services', desc: 'Overview of all SAP capabilities' },
      { label: 'SAP Consulting', path: '/services/sap-consulting', desc: 'End-to-end SAP advisory and implementation' },
      { label: 'SAP Signavio', path: '/services/sap-signavio', desc: 'Process mining and business transformation' },
      { label: 'SAP Datasphere', path: '/services/sap-datasphere', desc: 'Unified data management and analytics' },
      { label: 'RISE with SAP', path: '/services/rise-with-sap', desc: 'Cloud ERP migration and modernisation' },
      { label: 'SAP BTP', path: '/services/sap-btp', desc: 'Business Technology Platform services' },
      { label: 'SAP Integration', path: '/services/sap-integration', desc: 'Cross-system and API connectivity' },
      { label: 'SAP VIM & BRIM', path: '/services/sap-vim-brim', desc: 'Vendor invoice and billing management' },
      { label: 'SAP Migration', path: '/services/sap-migration', desc: 'Secure data and system transition' },
      { label: 'SAP S/4HANA', path: '/services/sap-s4hana', desc: 'Intelligent ERP for the digital age' },
      { label: 'SAP GenAI', path: '/services/sap-genai', desc: 'Generative AI capabilities within SAP' },
      { label: 'SAP Master Data', path: '/services/sap-masterdata', desc: 'Data governance and MDM solutions' },
      { label: 'SAP BTP API Management', path: '/services/sap-btp-api-management', desc: 'Build, manage and scale APIs' },
      { label: 'SAP Technical Consulting', path: '/services/sap-technical-consulting', desc: 'Deep technical SAP expertise' },
      { label: 'SAP OpenText', path: '/services/sap-opentext', desc: 'Content and document management' },
    ],
  },
  {
    id: 'tech',
    title: 'Technology Services',
    icon: Code,
    color: '#C9184A',
    pages: [
      { label: 'Salesforce', path: '/services/salesforce', desc: 'CRM and multi-cloud solutions', icon: CloudLightning },
      { label: 'Cybersecurity', path: '/services/cybersecurityhome', desc: 'Enterprise security and threat protection', icon: Shield },
      { label: 'IT Infrastructure', path: '/services/itinfrastructure', desc: 'Managed networks and data centres', icon: Server },
      { label: 'Web Development', path: '/services/web-development', desc: 'Scalable and modern web applications', icon: Code },
      { label: 'App Development', path: '/services/app-development', desc: 'Native and hybrid mobile apps', icon: Smartphone },
      { label: 'IoT Services', path: '/services/iot-services', desc: 'Smart connected systems and devices', icon: Wifi },
      { label: 'AI & ML Services', path: '/services/aiml-services', desc: 'Enterprise intelligence and automation', icon: Brain },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: BookOpen,
    color: '#059669',
    pages: [
      { label: 'All Blogs', path: '/blogs', desc: 'Industry insights and thought leadership' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Navigation',
    icon: Info,
    color: '#6b7280',
    pages: [
      { label: 'HTML Sitemap', path: '/sitemap', desc: 'Full site navigation map' },
      { label: 'XML Sitemap', path: '/sitemap.xml', desc: 'Machine-readable URL list for search engines', external: true },
    ],
  },
];

/* ─── Section Card ─────────────────────────────────────────────────────────── */
function SectionCard({ section, index }) {
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-3"
        style={{ borderLeft: `4px solid ${section.color}` }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${section.color}15` }}
        >
          <Icon size={18} style={{ color: section.color }} />
        </div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          {section.title}
        </h2>
        <span
          className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${section.color}15`, color: section.color }}
        >
          {section.pages.length}
        </span>
      </div>

      {/* Links */}
      <ul className="divide-y divide-gray-50">
        {section.pages.map((page) => {
          return (
            <li key={page.path}>
              {page.external ? (
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 flex-shrink-0 text-gray-300 group-hover:text-gray-500 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#800000] transition-colors flex items-center gap-1.5">
                      {page.label}
                      <ExternalLink size={11} className="opacity-40" />
                    </span>
                    {page.desc && (
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{page.desc}</p>
                    )}
                  </div>
                </a>
              ) : (
                <Link
                  to={page.path}
                  className="flex items-start gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 flex-shrink-0 text-gray-300 group-hover:text-[#800000] transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-[#800000] transition-colors">
                      {page.label}
                    </span>
                    {page.desc && (
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{page.desc}</p>
                    )}
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* ─── Blog List Section ─────────────────────────────────────────────────────── */
function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService.getAllBlogs?.()
      .then(data => {
        const list = data?.blogs || data?.data || data || [];
        setBlogs(Array.isArray(list) ? list.slice(0, 20) : []);
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4" style={{ borderLeft: '4px solid #059669' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#05966915' }}>
            <BookOpen size={18} style={{ color: '#059669' }} />
          </div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Blogs</h2>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!blogs.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="px-6 py-4 flex items-center gap-3" style={{ borderLeft: '4px solid #059669' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#05966915' }}>
          <BookOpen size={18} style={{ color: '#059669' }} />
        </div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Blog Articles</h2>
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#05966915', color: '#059669' }}>
          {blogs.length}
        </span>
      </div>

      <ul className="divide-y divide-gray-50">
        {blogs.map((blog) => (
          <li key={blog._id || blog.id || blog.slug}>
            <Link
              to={`/blogs/${blog._id || blog.id || blog.slug}`}
              className="flex items-start gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group"
            >
              <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-gray-300 group-hover:text-[#800000] transition-colors" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-gray-800 group-hover:text-[#800000] transition-colors line-clamp-1">
                  {blog.title}
                </span>
                {blog.category && (
                  <p className="text-[11px] text-gray-400 mt-0.5">{blog.category}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Main Sitemap Page ────────────────────────────────────────────────────── */
export default function SitemapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Site Map | Wysele Technologies';
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9fb] font-sans">

      {/* Hero */}
      <section className="relative bg-[#1A1614] pt-32 pb-16 px-6 overflow-hidden">
        <Breadcrumbs />

        {/* Background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap">
            SITEMAP
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Map size={14} className="text-[#800000]" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
              Navigation
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Site Map
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
            A complete directory of every page on the Wysele Technologies website — organised by category for easy navigation.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: 'Total Pages', value: '30+' },
              { label: 'Service Pages', value: '21' },
              { label: 'Updated', value: 'Monthly' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick jump anchors */}
      <div className="bg-white border-b border-gray-100 sticky top-[60px] z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 overflow-x-auto">
          <div className="flex gap-1 py-2 whitespace-nowrap">
            {SITE_SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 text-[11px] font-bold text-gray-500 hover:text-[#800000] hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
              >
                {s.title}
              </a>
            ))}
            <a
              href="#blogs"
              className="px-4 py-2 text-[11px] font-bold text-gray-500 hover:text-[#800000] hover:bg-gray-50 rounded-lg transition-colors flex-shrink-0"
            >
              Blog Articles
            </a>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-12">

        {/* XML Sitemap notice */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-blue-900">Looking for the XML Sitemap?</p>
            <p className="text-xs text-blue-600 mt-0.5">The machine-readable version for search engines is available at /sitemap.xml</p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ExternalLink size={13} />
            View XML Sitemap
          </a>
        </div>

        {/* Section grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SITE_SECTIONS.map((section, i) => (
            <div key={section.id} id={section.id}>
              <SectionCard section={section} index={i} />
            </div>
          ))}

          {/* Dynamic Blog list */}
          <div id="blogs">
            <BlogSection />
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            This sitemap is maintained manually. New pages are added as the site grows.
            <br />
            For search engines:{' '}
            <a href="/sitemap.xml" className="text-[#800000] hover:underline font-semibold">
              https://www.wysele.com/sitemap.xml
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
