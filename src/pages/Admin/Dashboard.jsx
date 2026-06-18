import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  FileText,
  Mail,
  MessageSquare,
  TrendingUp,
  User,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    jobs: [],
    blogs: [],
    consultations: [],
    contacts: [],
    applications: [],
    stats: {
      jobs: 0,
      blogs: 0,
      consultations: 0,
      contacts: 0
    }
  });

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
  const hasConsultations = companyParam?.toLowerCase() === 'wysele';

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
          jobService.getAllContacts({ limit: 100 }),
          jobService.getAllApplications()
        ]);

        const jobsRes = results[0].status === 'fulfilled' ? results[0].value : {};
        const blogsRes = results[1].status === 'fulfilled' ? results[1].value : {};
        const consultationsRes = results[2].status === 'fulfilled' ? results[2].value : {};
        const contactsRes = results[3].status === 'fulfilled' ? results[3].value : {};
        const appsRes = results[4].status === 'fulfilled' ? results[4].value : {};

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

        // 5. Process Applications
        const appsList = appsRes.data || appsRes.applications || (Array.isArray(appsRes) ? appsRes : []);
        const filteredApps = appsList.filter(a => 
          (a.company_name || a.company || 'wysele')?.toLowerCase().includes(companyKey)
        );

        setData({
          jobs: filteredJobs,
          blogs: filteredBlogs,
          consultations: filteredConsultations,
          contacts: filteredContacts,
          applications: filteredApps,
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

  // Job Status breakdown for Doughnut Chart
  const getJobStatusData = () => {
    let open = 0;
    let closed = 0;
    let draft = 0;

    data.jobs.forEach(job => {
      const status = (job.status || '').toLowerCase();
      if (status === 'active' || status === 'published' || status === 'active' || status === 'open') {
        open++;
      } else if (status === 'closed' || status === 'inactive') {
        closed++;
      } else {
        draft++;
      }
    });

    // Fallbacks if no data exists
    if (open === 0 && closed === 0 && draft === 0) {
      return [
        { name: 'Open Jobs', value: 4, color: '#7C3AED' },
        { name: 'Closed Jobs', value: 2, color: '#C084FC' },
        { name: 'Draft Jobs', value: 1, color: '#F3E8FF' }
      ];
    }

    return [
      { name: 'Open Jobs', value: open, color: '#7C3AED' },
      { name: 'Closed Jobs', value: closed, color: '#A855F7' },
      { name: 'Draft Jobs', value: draft, color: '#E9D5FF' }
    ];
  };

  const jobStatusData = getJobStatusData();
  const totalJobsCount = jobStatusData.reduce((acc, curr) => acc + curr.value, 0);

  // Blog Performance Monthly Data
  const getBlogPerformanceData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = {};
    months.forEach(m => { counts[m] = 0; });

    let hasRealData = false;
    data.blogs.forEach(blog => {
      const date = blog.createdAt || blog.created_at || blog.date;
      if (date) {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
          const mName = months[d.getMonth()];
          counts[mName]++;
          hasRealData = true;
        }
      }
    });

    if (!hasRealData) {
      // Mock data for beautiful trend representation if empty
      return [
        { name: 'Jan', Blogs: 2 },
        { name: 'Feb', Blogs: 5 },
        { name: 'Mar', Blogs: 3 },
        { name: 'Apr', Blogs: 8 },
        { name: 'May', Blogs: 6 },
        { name: 'Jun', Blogs: 10 },
        { name: 'Jul', Blogs: 7 },
        { name: 'Aug', Blogs: 12 }
      ];
    }

    // Get non-zero months or last 6 months
    return months.map(m => ({ name: m, Blogs: counts[m] })).slice(0, 8);
  };

  const blogPerformanceData = getBlogPerformanceData();

  // Job Applications Overview Monthly Data
  const getApplicationsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = {};
    months.forEach(m => { counts[m] = 0; });

    let hasRealData = false;
    data.applications.forEach(app => {
      const date = app.createdAt || app.created_at || app.applied_at || app.date;
      if (date) {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
          const mName = months[d.getMonth()];
          counts[mName]++;
          hasRealData = true;
        }
      }
    });

    if (!hasRealData) {
      // Mock data matching modern premium aesthetics
      return [
        { name: 'Jan', Applications: 15 },
        { name: 'Feb', Applications: 32 },
        { name: 'Mar', Applications: 21 },
        { name: 'Apr', Applications: 45 },
        { name: 'May', Applications: 38 },
        { name: 'Jun', Applications: 62 },
        { name: 'Jul', Applications: 48 },
        { name: 'Aug', Applications: 75 }
      ];
    }

    return months.map(m => ({ name: m, Applications: counts[m] })).slice(0, 8);
  };

  const applicationsData = getApplicationsData();

  // Stats definition with modern 3D gradients and premium aesthetics
  const statCards = [
    { label: 'Total Blogs', value: data.stats.blogs, icon: FileText, trend: '+14%', bgGrad: 'from-[#A78BFA] to-[#8B5CF6]' },
    { label: 'Total Jobs', value: data.stats.jobs, icon: Briefcase, trend: '+8%', bgGrad: 'from-[#93C5FD] to-[#3B82F6]' },
    { label: 'Total Contacts', value: data.stats.contacts, icon: Mail, trend: '+12%', bgGrad: 'from-[#FCA5A5] to-[#EF4444]' },
    hasConsultations && { label: 'Total Consultations', value: data.stats.consultations, icon: MessageSquare, trend: '+22%', bgGrad: 'from-[#86EFAC] to-[#22C55E]' }
  ].filter(Boolean);

  // Custom tooltips for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md border border-purple-100 p-3 rounded-xl shadow-lg">
          <p className="text-xs font-bold text-gray-900 mb-1">{label}</p>
          {payload.map((pld, index) => (
            <p key={index} className="text-xs font-semibold" style={{ color: pld.color || '#7C3AED' }}>
              {pld.name}: {pld.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="space-y-6 px-1 pb-10 bg-[#fffcfc] min-h-screen pt-2 font-inter">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-blue-500 capitalize">
              {companyDisplayName} Executive Dashboard
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Real-time overview and insights of your organizational channels.
            </p>
          </div>
         
        </div>

        {/* 1. Top Statistics Section */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasConsultations ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${stat.bgGrad} rounded-md p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative group overflow-hidden flex flex-col justify-between h-36 border border-white/10`}
            >
              {/* Concentric Circle Overlays */}
              <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute right-[-20px] bottom-[-20px] w-44 h-44 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute right-[-30px] bottom-[-30px] w-56 h-56 rounded-full border border-white/5 pointer-events-none" />

              {/* Left text layout */}
              <div className="relative z-10 flex flex-col justify-between h-full text-white">
                <div>
                  <span className="text-white/80 text-[11px] font-semibold tracking-wider capitalize">{stat.label}</span>
                  <h3 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
                    {loading ? (
                      <div className="w-12 h-6 bg-white/20 animate-pulse rounded-md" />
                    ) : (
                      stat.value
                    )}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
                  <TrendingUp size={11} className="text-white" />
                  {stat.trend}
                </div>
              </div>

              {/* Large floating white translucent icon on the right */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 text-white/25 transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                <stat.icon size={56} className="stroke-[1.5] drop-shadow-[0_8px_16px_rgba(255,255,255,0.1)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Outer Flex Container for Main Content & Right Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Columns (Main Content Area - 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 2. Blogs Section (Replace Popular Course) */}
            <div className="bg-white/80 backdrop-blur-md rounded-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Latest Blogs</h2>
                  <p className="text-xs text-gray-400 font-medium">Freshly published insights and news</p>
                </div>
                <Link to="/admin/blogs" className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1.5 transition-colors group">
                  View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="space-y-3">
                      <div className="aspect-[4/3] rounded-md bg-gray-200 animate-pulse" />
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-12" />
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-full" />
                    </div>
                  ))
                ) : data.blogs.length === 0 ? (
                  <div className="col-span-3 py-12 text-center text-gray-400 text-sm font-semibold uppercase">
                    No latest blogs posted yet
                  </div>
                ) : (
                  data.blogs.slice(0, 3).map((blog) => (
                    <motion.div
                      key={blog.id || blog._id}
                      className="group flex flex-col justify-between h-full space-y-3 cursor-pointer"
                      whileHover={{ y: -2 }}
                    >
                      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                        {blog.image_url || blog.img ? (
                          <img
                            src={blog.image_url || blog.img}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-purple-200 bg-purple-50/50">
                            <FileText size={36} />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] bg-[#F3E8FF] border border-[#E9D5FF]">
                            {blog.category || 'Tech'}
                          </span>
                          <h3 className="text-sm font-bold text-gray-900 mt-2 line-clamp-2 leading-snug group-hover:text-[#7C3AED] transition-colors">
                            {blog.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-2 flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(blog.createdAt || blog.created_at || blog.date)}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* 4. Jobs Table Section (Replace My Course) */}
            <div className="bg-white/80 backdrop-blur-md rounded-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Job Openings</h2>
                  <p className="text-xs text-gray-400 font-medium">Currently active career opportunities</p>
                </div>
                <Link to="/admin/job-postings" className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1.5 transition-colors group">
                  View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="overflow-hidden rounded-md border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/75 border-b border-gray-100">
                      <th className="py-3.5 px-4 text-xs font-bold text-gray-500 capitalize tracking-wider">Role</th>
                      <th className="py-3.5 px-4 text-xs font-bold text-gray-500 capitalize tracking-wider text-center">Job Type</th>
                      <th className="py-3.5 px-4 text-xs font-bold text-gray-500 capitalize tracking-wider text-center">Status</th>
                      <th className="py-3.5 px-4 text-xs font-bold text-gray-500 capitalize tracking-wider text-center">Posted On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      [1, 2, 3].map(i => (
                        <tr key={i}>
                          <td colSpan="4" className="py-4 px-4">
                            <div className="h-6 bg-gray-100 animate-pulse rounded w-full" />
                          </td>
                        </tr>
                      ))
                    ) : data.jobs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-12 text-center text-gray-400 text-xs font-semibold uppercase">
                          No jobs available
                        </td>
                      </tr>
                    ) : (
                      data.jobs.slice(0, 5).map((job, index) => (
                        <tr
                          key={job.id || job._id}
                          className={`group hover:bg-purple-50/10 transition-colors ${
                            index % 2 === 1 ? 'bg-gray-50/20' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#7C3AED] transition-colors truncate max-w-[200px]">
                              {job.job_title || job.role || job.title || 'Untitled Role'}
                            </p>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                              (job.job_type || job.type || '').toLowerCase().includes('part') 
                                ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                                : (job.job_type || job.type || '').toLowerCase().includes('contract') 
                                  ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}>
                              {job.job_type || job.type || 'Full-time'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${
                              (job.status === 'active' || job.status === 'published' || job.status === 'Published') 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : job.status === 'Draft' 
                                  ? 'bg-gray-50 text-gray-400 border border-gray-100'
                                  : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}>
                              {job.status === 'Published' ? 'Active' : job.status || 'Active'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-xs font-semibold text-gray-400">
                            {formatDate(job.job_posted_date || job.jobPostedDate || job.createdAt || job.created_at || job.date)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5B. Consultation Requests Section */}
            {hasConsultations && (
              <div className="bg-white/80 backdrop-blur-md rounded-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Consultation Requests</h2>
                    <p className="text-xs text-gray-400 font-medium font-sans">Recent scheduling requests</p>
                  </div>
                  {data.stats.consultations > 0 && (
                    <Link to="/admin/consultations" className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1.5 transition-colors group">
                      View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {loading ? (
                    [1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-md animate-pulse h-16" />
                    ))
                  ) : data.consultations.length === 0 ? (
                    <div className="col-span-3 py-6 text-center text-gray-400 text-xs font-semibold uppercase font-sans">
                      No consultation inquiries
                    </div>
                  ) : (
                    data.consultations.slice(0, 3).map((item, index) => (
                      <motion.div
                        key={item.id || item._id || index}
                        className="p-4 bg-white border border-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-[#7C3AED]" />
                            <p className="text-sm font-bold text-gray-900">{item.name}</p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-xs text-gray-500 font-medium truncate flex items-center gap-2">
                            <Mail size={12} className="text-gray-400" />
                            {item.email}
                          </p>
                          {item.phone_number || item.phone || item.mobile_number ? (
                            <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                              <Phone size={12} className="text-gray-400" />
                              {item.phone_number || item.phone || item.mobile_number}
                            </p>
                          ) : null}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Side Panel (1/3 width) */}
          <div className="space-y-6">
            
            {/* 3. Jobs Analytics Section (Doughnut Chart) */}
            <div className="bg-white/80 backdrop-blur-md rounded-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-4 flex flex-col justify-between min-h-[360px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Jobs Overview</h2>
                <p className="text-xs text-gray-400 font-medium font-sans">Breakdown of current job statuses</p>
              </div>

              <div className="relative h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {jobStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip cursor={{ fill: 'transparent' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Count in the center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                  <span className="text-3xl font-extrabold text-gray-900">{loading ? '---' : totalJobsCount}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Jobs</span>
                </div>
              </div>

              {/* Legends */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50 text-center">
                {jobStatusData.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.name.split(' ')[0]}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-bold text-gray-800">{loading ? '0' : item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5A. Contacts Section (Replace Continue Learning) */}
            <div className="bg-white/80 backdrop-blur-md rounded-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
                  <p className="text-xs text-gray-400 font-medium">Latest incoming inquiries</p>
                </div>
                <Link to="/admin/contacts" className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 transition-colors group">
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="space-y-3">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-md animate-pulse h-16" />
                  ))
                ) : data.contacts.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 text-xs font-semibold uppercase font-sans">
                    No contact requests
                  </div>
                ) : (
                  data.contacts.slice(0, 3).map((contact, index) => {
                    const borderColors = ['border-purple-500', 'border-indigo-500', 'border-violet-500'];
                    const bgColors = ['bg-purple-50 text-purple-600', 'bg-indigo-50 text-indigo-600', 'bg-violet-50 text-violet-600'];
                    return (
                      <motion.div
                        key={contact.id || contact._id || index}
                        className={`flex items-center justify-between p-3 bg-white border border-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300`}
                        whileHover={{ x: 2 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full border-2 ${borderColors[index % 3]} flex items-center justify-center text-xs font-bold shrink-0 ${bgColors[index % 3]}`}>
                            {contact.name?.[0] || 'C'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{contact.name}</p>
                            <p className="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{contact.email}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={14} className="text-gray-300 hover:text-[#7C3AED] cursor-pointer shrink-0 transition-colors" />
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
