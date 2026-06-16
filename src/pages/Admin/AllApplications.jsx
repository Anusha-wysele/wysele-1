import {
  Briefcase,
  ChevronRight,
  Clock,
  Download,
  Search,
  UserCheck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import jobService from '../../services/jobService';

import AdminLayout from '../../components/Admin/AdminLayout';

const AllApplications = () => {
  const location = useLocation();
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Reset page when search or company filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCompany]);

  useEffect(() => {
    fetchAllApplications();
  }, [activeCompany]);

  const fetchAllApplications = async () => {
    try {
      setLoading(true);
      // Step 1: Get all jobs to find their IDs
      const jobsData = await jobService.getAllJobs();
      const jobsList = Array.isArray(jobsData) ? jobsData : (jobsData.jobs || jobsData.data || []);
      
      // Filter jobsList by activeCompany
      const companyKey = activeCompany.toLowerCase();
      const filteredJobsList = jobsList.filter(job => 
        (job.company_name || job.company || 'wysele').toLowerCase().includes(companyKey)
      );

      // Step 2: Fetch applications for each filtered job ID
      const allAppsPromises = filteredJobsList.map(async (job) => {
        try {
          const jobId = job.id || job.job_id;
          if (!jobId) return [];
          const apps = await jobService.getJobApplications(jobId);
          // Return the apps list, adding the job title for context
          return (Array.isArray(apps) ? apps : (apps.applications || [])).map(a => ({
            ...a,
            role: job.job_title || job.role || job.title || 'Candidate'
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

  const totalPages = Math.ceil(filteredApps.length / limit) || 1;
  const startIndex = (currentPage - 1) * limit;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + limit);

  return (
    <AdminLayout>
      <div className="space-y-10 pb-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">
              All Applications
            </h1>
            <p className="text-gray-500 font-medium tracking-tight">
              Manage and review every candidate submission across your entire recruitment pipeline.
            </p>
          </div>
        </div>

        {/* Search & Export Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#005A9E] outline-none transition-all"
            />
          </div>
          
          {/* Export CSV Button */}
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#005A9E] text-white rounded-lg font-semibold text-xs hover:bg-[#004b85] hover:text-white transition-all shadow-sm whitespace-nowrap"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <div className="responsive-table-container">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-200 border-b border-gray-100">
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Candidate</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Role</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Experience</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Notice</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Contact</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Location</th>
                  <th className="px-6 py-2.5 text-center text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-blue-100 border-t-[#005A9E] rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading candidates...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredApps.length > 0 ? (
                  paginatedApps.map((app, index) => (
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

        {/* Standalone Pagination Card */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentPage === totalPages 
                  ? 'border border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#005A9E] text-white hover:bg-[#004b85]'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllApplications;
