import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import blogService from '../../services/blogService';
import jobService from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';
import companyService from '../../services/companyService';

export default function Dashboard() {
  const { user } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const companyParam = searchParams.get('company') || user?.company_name || 'wysele';

  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const load = () => {
      setCompaniesList(companyService.getCompanies());
    };
    load();
    companyService.fetchCompanies(); // Fetch fresh data from backend API
    window.addEventListener('companiesUpdated', load);
    return () => window.removeEventListener('companiesUpdated', load);
  }, []);

  const getCompanyDisplayName = (comp) => {
    try {
      const lower = (comp || '').toLowerCase();
      if (!companiesList || !Array.isArray(companiesList)) {
        return 'Wysele Technologies';
      }
      const company = companiesList.find(c => c && (c.id || '').toLowerCase() === lower);
      if (company && company.name) {
        return (company.name || '').toLowerCase().includes('technologies') 
          ? company.name 
          : `${company.name} Technologies`;
      }
      if (lower.includes('orbintix')) {
        return 'Orbintix Technologies';
      }
      if (lower.includes('gracevirtue')) {
        return 'Grace Virtue Technologies';
      }
      return 'Wysele Technologies';
    } catch (err) {
      console.error('Error resolving company display name:', err);
      return 'Wysele Technologies';
    }
  };

  const companyDisplayName = getCompanyDisplayName(companyParam);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    jobs: [],
    blogs: [],
    consultations: [],
    contacts: [],
    stats: {
      jobs: 0,
      blogs: 0,
      consultations: 0,
      contacts: 0
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const companyKey = companyParam?.toLowerCase() || 'wysele';

        const results = await Promise.allSettled([
          jobService.getAllJobs({ company: companyParam, limit: 100 }),
          blogService.getAllBlogs({ limit: 100 }),
          companyKey !== 'wysele' 
            ? Promise.resolve({ data: [], total_records: 0 }) 
            : jobService.getAllConsultations({ limit: 100 }),
          jobService.getAllContacts({ limit: 100 })
        ]);

        const jobsRes = results[0].status === 'fulfilled' ? results[0].value : {};
        const blogsRes = results[1].status === 'fulfilled' ? results[1].value : {};
        const consultationsRes = results[2].status === 'fulfilled' ? results[2].value : {};
        const contactsRes = results[3].status === 'fulfilled' ? results[3].value : {};

        results.forEach((res, idx) => {
          if (res.status === 'rejected') {
            const names = ['Jobs', 'Blogs', 'Consultations', 'Contacts'];
            console.error(`⚠️ Dashboard failed to load ${names[idx]}:`, res.reason);
          }
        });

        // 1. Process Jobs
        const jobsList = jobsRes.data || jobsRes.jobs || (Array.isArray(jobsRes) ? jobsRes : []);
        const filteredJobs = jobsList.filter(j => 
          (j.company_name || j.company || 'wysele')?.toLowerCase().includes(companyKey)
        );
        const jobsCount = filteredJobs.length;

        // 2. Process Blogs
        const blogsList = blogsRes.data || blogsRes.blogs || (Array.isArray(blogsRes) ? blogsRes : []);
        const processedBlogs = blogsList.map(blog => {
          const hasPrefix = blog.category && blog.category.includes(':');
          const blogCompany = hasPrefix ? blog.category.split(':')[0] : (blog.company_name || blog.company || 'wysele');
          const cleanCategory = hasPrefix ? blog.category.split(':')[1] : (blog.category || 'Organisation');
          return {
            ...blog,
            company_name: blogCompany,
            category: cleanCategory
          };
        });
        const filteredBlogs = processedBlogs.filter(b => 
          (b.company_name || 'wysele')?.toLowerCase() === companyKey
        );
        const blogsCount = filteredBlogs.length;

        // 3. Process Consultations
        const consultationsList = consultationsRes.data || consultationsRes.consultations || (Array.isArray(consultationsRes) ? consultationsRes : []);
        const filteredConsultations = companyKey !== 'wysele' ? [] : consultationsList.filter(c => 
          (c.company || 'wysele')?.toLowerCase().includes(companyKey)
        );
        const consultationsCount = companyKey !== 'wysele' 
          ? 0 
          : (consultationsRes.total_records || consultationsRes.count || consultationsRes.total || filteredConsultations.length);

        // 4. Process Contacts
        const contactsList = contactsRes.data || contactsRes.contacts || (Array.isArray(contactsRes) ? contactsRes : []);
        const processedContacts = contactsList.map(contact => {
          const locationVal = contact.location || '';
          const hasPrefix = locationVal.includes(':');
          const contactCompany = hasPrefix ? locationVal.split(':')[0] : (contact.company_name || contact.company || 'wysele');
          const cleanLocation = hasPrefix ? locationVal.split(':').slice(1).join(':') : locationVal;
          return {
            ...contact,
            company_name: contactCompany,
            company: contactCompany,
            location: cleanLocation
          };
        });
        const filteredContacts = processedContacts.filter(c => 
          (c.company_name || 'wysele')?.toLowerCase() === companyKey
        );
        const contactsCount = filteredContacts.length;

        setData({
          jobs: filteredJobs.slice(0, 3),
          blogs: filteredBlogs.slice(0, 3),
          consultations: filteredConsultations.slice(0, 3),
          contacts: filteredContacts.slice(0, 3),
          stats: {
            jobs: jobsCount,
            blogs: blogsCount,
            consultations: consultationsCount,
            contacts: contactsCount
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [companyParam, user]);

  const isOrbintix = companyParam?.toLowerCase() === 'orbintix';
  const hasConsultations = companyParam?.toLowerCase() === 'wysele';

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'Recently' || dateStr === 'N/A') return dateStr || 'Recently';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  const statCards = [
    { label: 'Total Jobs Posted', value: data.stats.jobs, icon: Briefcase, color: 'text-rose-500', bg: 'bg-rose-50', trend: '+12%', borderStyle: 'border-l-4 border-rose-500' },
    { label: 'Blog Posts', value: data.stats.blogs, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50', trend: '+5%', borderStyle: 'border-l-4 border-purple-500' },
    hasConsultations && { label: 'Consultations', value: data.stats.consultations, icon: MessageSquare, color: 'text-[#005A9E]', bg: 'bg-blue-50', trend: '+24%', borderStyle: 'border-l-4 border-[#005A9E]' },
    { label: 'Contact Inquiries', value: data.stats.contacts, icon: Mail, color: 'text-orange-500', bg: 'bg-orange-50', trend: '+8%', borderStyle: 'border-l-4 border-orange-500' },
  ].filter(Boolean);

  return (
    <AdminLayout>
      <div className="space-y-6 px-1 pb-10 bg-[#fffcfc] min-h-screen pt-0 hide-scrollbar">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-2">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">
              {companyDisplayName} Executive Dashboard
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1 font-sans">
              Real-time overview of {companyDisplayName} IT infrastructure operations.
            </p>
          </div>
        </div>

        {/* Section 1: KPI Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${!hasConsultations ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-md p-6 border border-gray-200 relative group overflow-hidden ${stat.borderStyle}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                  <stat.icon size={18} />
                </div>
                <div className="flex items-center gap-1 text-[8px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  <TrendingUp size={10} />
                  {stat.trend}
                </div>
              </div>
              
              <div className="space-y-0.5 mb-3">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tighter">
                  {loading ? '---' : stat.value}
                </h3>
                <p className="text-gray-400 text-[8px] font-black uppercase tracking-[0.1em]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 2: Jobs & Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Recent Job Postings */}
          <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 space-y-4 flex flex-col h-auto">
            {/* Header inside card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-50 text-[#800000] flex items-center justify-center shrink-0">
                  <Briefcase size={13} />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
                  Recent Job Postings
                </h2>
              </div>
              <Link to="/admin/job-postings" className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all">
                VIEW ALL <ArrowRight size={12} />
              </Link>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto min-h-0">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Job Type</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Posted On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    [1,2,3].map(i => <tr key={i}><td colSpan="4" className="py-1.5 animate-pulse bg-gray-50/50 h-8"></td></tr>)
                  ) : data.jobs.length === 0 ? (
                    <tr><td colSpan="4" className="py-6 text-center text-gray-400 text-[10px] font-semibold uppercase">No recent jobs</td></tr>
                  ) : (
                    data.jobs.map((job) => (
                      <tr key={job.id || job._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-1">
                          <p className="text-xs font-normal text-gray-900 truncate max-w-[150px]">{job.job_title || job.role || job.title || 'Untitled Role'}</p>
                        </td>
                        <td className="py-1 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-center inline-block ${
                            (job.job_type || job.type || '').toLowerCase().includes('part') ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            (job.job_type || job.type || '').toLowerCase().includes('contract') ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {job.job_type || job.type || 'Full-time'}
                          </span>
                        </td>
                        <td className="py-1 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-center inline-block ${
                            (job.status === 'active' || job.status === 'published' || job.status === 'Published') 
                              ? 'bg-green-50 text-green-600 border-green-100' 
                              : job.status === 'Draft' 
                                ? 'bg-gray-50 text-gray-500 border border-gray-100'
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}>
                            {job.status === 'Published' ? 'Active' : job.status || 'Active'}
                          </span>
                        </td>
                        <td className="py-1 text-center text-[10px] font-semibold text-gray-400">
                          {formatDate(job.job_posted_date || job.jobPostedDate || job.createdAt || job.created_at || job.date)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Blogs */}
          <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 space-y-4 flex flex-col h-auto">
            {/* Header inside card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-50 text-[#800000] flex items-center justify-center shrink-0">
                  <FileText size={13} />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Latest Blog Posts
                </h2>
              </div>
              <Link to="/admin/blogs" className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all">
                VIEW ALL <ArrowRight size={12} />
              </Link>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto min-h-0">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Image</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Category</th>
                    <th className="pb-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider text-center">Posted On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    [1,2,3].map(i => <tr key={i}><td colSpan="4" className="py-1.5 animate-pulse bg-gray-50/50 h-8"></td></tr>)
                  ) : data.blogs.length === 0 ? (
                    <tr><td colSpan="4" className="py-6 text-center text-gray-400 text-[10px] font-semibold uppercase">No blogs</td></tr>
                  ) : (
                    data.blogs.map((blog) => (
                      <tr key={blog.id || blog._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="py-1">
                          <div className="w-6 h-6 rounded-md bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                            {(blog.image_url || blog.img) ? (
                              <img src={blog.image_url || blog.img} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <FileText size={11} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-1">
                          <p className="text-xs font-normal text-gray-900 truncate max-w-[150px]">{blog.title}</p>
                        </td>
                        <td className="py-1 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-center inline-block ${
                            blog.category === 'Technology' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            blog.category === 'Innovation' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            blog.category === 'AI' ? 'bg-green-50 text-green-600 border border-green-100' :
                            blog.category === 'Culture' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            'bg-rose-50 text-rose-600 border border-rose-100'
                          }`}>
                            {blog.category || 'Tech'}
                          </span>
                        </td>
                        <td className="py-1 text-center text-[10px] font-semibold text-gray-400">
                          {formatDate(blog.createdAt || blog.created_at || blog.date || blog.updatedAt || blog.updated_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: CRM */}
        <div className={`grid grid-cols-1 ${!hasConsultations ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-4`}>
          
          {hasConsultations && (
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 space-y-4 flex flex-col h-auto">
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-rose-50 text-[#800000] flex items-center justify-center shrink-0">
                    <MessageSquare size={13} />
                  </div>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
                    Recent Consultations
                  </h2>
                </div>
                <Link to="/admin/consultations" className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all">
                  VIEW ALL <ArrowRight size={12} />
                </Link>
              </div>

              {/* List */}
              <div className="divide-y divide-gray-50 min-h-0">
                {loading ? (
                  [1,2,3].map(i => <div key={i} className="py-2 animate-pulse bg-gray-50/50 h-8 rounded-sm mb-1"></div>)
                ) : data.consultations.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 text-[10px] font-semibold uppercase">No inquiries</div>
                ) : (
                  data.consultations.map((item) => (
                    <div key={item.id} className="py-1 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[9px] font-black">
                          {item.name?.[0] || 'C'}
                        </div>
                        <div className="flex gap-6">
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <div>
                            <p className="text-[9px] text-gray-400 mt-0.5">{item.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 space-y-4 flex flex-col h-auto">
            {/* Header inside card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-rose-50 text-[#800000] flex items-center justify-center shrink-0">
                  <Mail size={13} />
                </div>
                <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-sans">
                  Contact Inquiries
                </h2>
              </div>
              <Link to="/admin/contacts" className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-all">
                VIEW ALL <ArrowRight size={12} />
              </Link>
            </div>

            {/* List */}
            <div className="divide-y divide-gray-50 min-h-0">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="py-2 animate-pulse bg-gray-50/50 h-8 rounded-sm mb-1"></div>)
              ) : data.contacts.length === 0 ? (
                <div className="py-6 text-center text-gray-400 text-[10px] font-semibold uppercase font-sans">No requests</div>
              ) : (
                data.contacts.map((item) => (
                  <div key={item.id} className="py-1 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[9px] font-black">
                        {item.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.name}</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">{item.email}</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-bold text-gray-500 italic max-w-[120px] truncate">"{item.message}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};
