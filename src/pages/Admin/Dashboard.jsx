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

export default function Dashboard() {
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
        const [jobsRes, blogsRes, consultationsRes, contactsRes] = await Promise.all([
          jobService.getAllJobs(),
          blogService.getAllBlogs(),
          jobService.getAllConsultations(),
          jobService.getAllContacts()
        ]);

        const jobsList = jobsRes.jobs || jobsRes.data || (Array.isArray(jobsRes) ? jobsRes : []);
        const blogsList = blogsRes.blogs || blogsRes.data || (Array.isArray(blogsRes) ? blogsRes : []);
        const consultationsList = consultationsRes.consultations || consultationsRes.data || (Array.isArray(consultationsRes) ? consultationsRes : []);
        const contactsList = contactsRes.contacts || contactsRes.data || (Array.isArray(contactsRes) ? contactsRes : []);

        setData({
          jobs: jobsList.slice(0, 3),
          blogs: blogsList.slice(0, 3),
          consultations: consultationsList.slice(0, 3),
          contacts: contactsList.slice(0, 3),
          stats: {
            jobs: jobsList.length,
            blogs: blogsList.length,
            consultations: consultationsList.length,
            contacts: contactsList.length
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Total Jobs Posted', value: data.stats.jobs, icon: Briefcase, color: 'text-rose-500', bg: 'bg-rose-50', trend: '+12%', sparkColor: '#f43f5e' },
    { label: 'Blog Posts', value: data.stats.blogs, icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50', trend: '+5%', sparkColor: '#a855f7' },
    { label: 'Consultations', value: data.stats.consultations, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+24%', sparkColor: '#3b82f6' },
    { label: 'Contact Inquiries', value: data.stats.contacts, icon: Mail, color: 'text-orange-500', bg: 'bg-orange-50', trend: '+8%', sparkColor: '#f97316' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10 bg-white min-h-screen p-1 admin-scrollbar">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal text-[#800000] capitalize font-sans">Executive Dashboard</h1>
            <p className="text-gray-500 text-sm font-medium mt-1 font sans">Real-time overview of Wysele IT infrastructure operations.</p>
          </div>
          
        </div>

        {/* Section 1: KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 border border-gray-100  relative group overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                  <stat.icon size={22} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp size={12} />
                  {stat.trend}
                </div>
              </div>
              
              <div className="space-y-1 mb-6">
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                  {loading ? '---' : stat.value}
                </h3>
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.15em]">{stat.label}</p>
              </div>

              {/* Sparkline Graphic with Premium Effects */}
              <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden opacity-40">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 40">
                  <defs>
                    <filter id={`lineShadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={stat.sparkColor} floodOpacity="0.4" />
                    </filter>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    d="M0 25 C 20 20, 40 30, 60 15 S 80 5, 100 20 S 120 30, 140 15 S 160 5, 180 20 S 200 30, 220 15 S 240 5, 260 20 S 280 30, 300 15"
                    fill="none"
                    stroke={stat.sparkColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter={`url(#lineShadow-${index})`}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 2: Jobs & Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Job Postings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking- normal flex items-center gap-2 font-sans">
                <Briefcase size={16} className="text-[#800000] " /> Recent Job Postings
              </h2>
              <Link to="/admin/job-postings" className="text-[10px] font-black text-crimson-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-100 overflow-hidden hide-scrollbar">
              <table className="w-full text-left table-auto">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Job Type</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    [1,2,3].map(i => <tr key={i}><td colSpan="3" className="px-6 py-4 animate-pulse bg-gray-50/50 h-12"></td></tr>)
                  ) : data.jobs.length === 0 ? (
                    <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400 text-[10px] font-black uppercase">No recent jobs</td></tr>
                  ) : (
                    data.jobs.map((job) => (
                      <tr key={job.id || job._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-gray-900 group-hover:text-[#800000] truncate max-w-[150px]">{job.role || job.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-gray-500 uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            {job.job_type || job.type || 'Full-time'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[10px]">
                          <span className={`px-2 py-0.5 font-black uppercase rounded-sm border ${
                            (job.status === 'active' || job.status === 'published' || job.status === 'Published') 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {job.status || 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Blogs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-medium flex items-center gap-2">
                <FileText size={16} className="text-[#800000]" /> Latest Blog Posts
              </h2>
              <Link to="/admin/blogs" className="text-[10px] font-black text-crimson-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-100 shadow-sm divide-y divide-gray-50">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="p-4 animate-pulse bg-gray-50/50 h-16"></div>)
              ) : data.blogs.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-[10px] font-black uppercase">No blogs</div>
              ) : (
                data.blogs.map((blog) => (
                  <div key={blog.id || blog._id} className="p-4 flex items-center gap-4 group hover:bg-gray-50/50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 flex-shrink-0 rounded overflow-hidden border border-gray-50">
                      {(blog.image_url || blog.img) ? (
                        <img src={blog.image_url || blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <FileText size={18} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate group-hover:text-[#800000]">{blog.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{blog.category || 'Tech'}</p>
                    </div>
                    {/* <Eye size={14} className="text-gray-300 group-hover:text-gray-900" /> */}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Section 3: CRM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-medium px-2 flex items-center gap-2">
              <MessageSquare size={16} className="text-[#800000]" /> Recent Consultations
            </h2>
            <div className="bg-white border border-gray-100 shadow-sm divide-y divide-gray-50">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="p-4 animate-pulse h-16"></div>)
              ) : data.consultations.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-[10px] font-black uppercase">No inquiries</div>
              ) : (
                data.consultations.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between group hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black">
                        {item.name?.[0] || 'C'}
                      </div>
                      <div className='flex gap-10'>
                        <p className="text-xs font-bold text-gray-900">{item.name}</p>
                        <div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{item.email}</p>
                        </div>
                      </div>
                    </div>
                    {/* <p className="text-[9px] font-black text-gray-400 uppercase">{item.service || 'General'}</p> */}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-medium px-2 flex items-center gap-2">
              <Mail size={16} className="text-[#800000]" /> Contact Inquiries
            </h2>
            <div className="bg-white border border-gray-100 shadow-sm divide-y divide-gray-50">
              {loading ? (
                [1,2,3].map(i => <div key={i} className="p-4 animate-pulse h-16"></div>)
              ) : data.contacts.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-[10px] font-black uppercase">No requests</div>
              ) : (
                data.contacts.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between group hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-[10px] font-black">
                        {item.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{item.email}</p>
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
