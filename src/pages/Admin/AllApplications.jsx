import {
  Briefcase,
  ChevronRight,
  Clock,
  Download,
  Search,
  UserCheck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import jobService from '../../services/jobService';

import AdminLayout from '../../components/Admin/AdminLayout';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      setLoading(true);
      // Step 1: Get all jobs to find their IDs
      const jobsData = await jobService.getAllJobs();
      const jobsList = Array.isArray(jobsData) ? jobsData : (jobsData.jobs || jobsData.data || []);
      
      // Step 2: Fetch applications for each job ID
      const allAppsPromises = jobsList.map(async (job) => {
        try {
          const jobId = job.id || job.job_id;
          if (!jobId) return [];
          const apps = await jobService.getJobApplications(jobId);
          // Return the apps list, adding the job title for context
          return (Array.isArray(apps) ? apps : (apps.applications || [])).map(a => ({
            ...a,
            role: job.role || job.title
          }));
        } catch (err) {
          console.error(`Failed to fetch apps for job ${job.id}:`, err);
          return [];
        }
      });

      // Step 3: Combine all results
      const results = await Promise.all(allAppsPromises);
      const flattenedApps = results.flat();
      
      setApplications(flattenedApps);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (filteredApps.length === 0) return;

    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Role', 'Experience', 'Notice Period', 'Location', 'Expected CTC'];
    const csvRows = filteredApps.map(app => [
      `"${(app.firstName || app.first_name || '').replace(/"/g, '""')}"`,
      `"${(app.lastName || app.last_name || '').replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${app.mobile_number || app.mobileNumber || app.phone || ''}"`,
      `"${(app.role || '').replace(/"/g, '""')}"`,
      `"${app.relevent_experience || app.releventExperience || ''}"`,
      `"${app.notice_period || app.noticePeriod || ''}"`,
      `"${(app.current_location || app.currentLocation || '').replace(/"/g, '""')}"`,
      `"${app.expected_ctc || app.expectedCtc || ''}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `all_applications_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApps = applications.filter(app => {
    const searchStr = searchTerm.toLowerCase();
    return (
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchStr) ||
      app.email?.toLowerCase().includes(searchStr) ||
      app.job_id?.toString().includes(searchStr) ||
      app.role?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-10 pb-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">
              All Applications
            </h1>
            <p className="text-gray-500 font-medium tracking-tight">
              Manage and review every candidate submission across your entire recruitment pipeline.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-2.5 bg-white border border-gray-100 rounded-none shadow-sm w-full md:w-80 text-sm font-medium transition-all focus:ring-2 focus:ring-[#800000]/10 outline-none"
              />
            </div>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-none text-[10px] font-black text-gray-900 hover:bg-gray-50 transition-all shadow-sm tracking-widest"
            >
              <Download size={16} />
              EXPORT
            </button>
          </div>
        </div>

        {/* Stats Quick View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Applicants', value: applications.length.toString(), icon: UserCheck, color: 'bg-maroon-900/30 text-maroon-400 border-maroon-500/20' },
            { label: 'Roles with Apps', value: [...new Set(applications.map(a => a.role))].length.toString(), icon: Briefcase, color: 'bg-crimson-900/30 text-crimson-400 border-crimson-500/20' },
            { label: 'Pending Review', value: applications.length.toString(), icon: Clock, color: 'bg-maroon-900/30 text-maroon-400 border-maroon-500/20' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-none shadow-sm border border-gray-100 flex items-center gap-6 group transition-all hover:shadow-md">
              <div className={` w-14 h-14 text-blue-400  flex items-center justify-center  transition-transform group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-none shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="responsive-table-container">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#800000] border-b border-gray-100">
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Candidate</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Role</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Experience</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Notice</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Contact</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Location</th>
                  <th className="px-6 py-3 text-center text-[10px] font-semibold text-white capitalize tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading candidates...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredApps.length > 0 ? (
                  filteredApps.map((app, index) => (
                    <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-6 text-center">
                        <span className="text-xs font-semibold text-gray-900 uppercase transition-colors">
                          {app.firstName || app.first_name || app.name || 'N/A'} {app.lastName || app.last_name || ''}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          {app.role || 'Candidate'}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-xs font-bold text-gray-700">
                          {app.relevent_experience || app.releventExperience || app.relevant_experience || app.relevantExperience || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                          {app.notice_period || app.noticePeriod || 'Immediate'}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-xs text-gray-600 font-medium">{app.email}</span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-xs font-bold text-gray-700">{app.current_location || app.currentLocation || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        {(() => {
                          const resumePath = app.resume || app.resume_url;
                          const fullUrl = resumePath 
                            ? (resumePath.startsWith('http') ? resumePath : `https://wysele-backend.vercel.app/${resumePath}`)
                            : '#';
                          
                          return (
                            <a 
                              href={fullUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1 text-[12px] font-bold text-blue-400 hover:underline transition-all ${
                                !resumePath && 'opacity-50 cursor-not-allowed pointer-events-none'
                              }`}
                            >
                              View CV
                              <ChevronRight size={14} />
                            </a>
                          );
                        })()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-8 py-20 text-center">
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No candidates found in your pipeline</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllApplications;
