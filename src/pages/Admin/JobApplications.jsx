import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Download, 
  ArrowLeft,
  FileText,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jobService from '../../services/jobService';

const JobApplications = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch job details to get the role title
        const jobData = await jobService.getJobById(id);
        setJob(jobData.job || jobData.data || jobData);

        // Fetch applications for this job
        const appsData = await jobService.getJobApplications(id);
        setApplications(Array.isArray(appsData) ? appsData : (appsData.applications || appsData.data || []));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications. Please verify the API connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const exportToCSV = () => {
    if (applications.length === 0) return;

    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Role', 'Experience', 'Notice Period', 'Location', 'Expected CTC'];
    const csvRows = applications.map(app => [
      `"${(app.firstName || app.first_name || '').replace(/"/g, '""')}"`,
      `"${(app.lastName || app.last_name || '').replace(/"/g, '""')}"`,
      `"${app.email}"`,
      `"${app.mobileNumber || app.phone || app.mobile_number || ''}"`,
      `"${(job?.role || job?.title || '').replace(/"/g, '""')}"`,
      `"${app.releventExperience || app.relevantExperience || ''}"`,
      `"${app.noticePeriod || ''}"`,
      `"${(app.currentLocation || '').replace(/"/g, '""')}"`,
      `"${app.expectedCtc || ''}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${job?.role || 'report'}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link to="/admin/manage-jobs" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-crimson-600 transition-all group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO MANAGE JOBS
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-crimson-50 rounded-2xl flex items-center justify-center text-crimson-600 shadow-sm border border-crimson-100">
                <Users size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                  Candidate Applications
                </h1>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Role: <span className="text-crimson-600">{job?.role || job?.title || 'Loading...'}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-none text-[10px] font-black text-gray-900 hover:bg-gray-50 transition-all shadow-sm tracking-widest"
            >
              <Download size={14} />
              EXPORT
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-h-[400px] relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scanning Candidates...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-20 text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X size={32} />
              </div>
              <p className="text-sm font-bold text-gray-900">{error}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold uppercase">Retry</button>
            </div>
          )}

          {!loading && !error && (
            <div className="responsive-table-container">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#800000] border-b border-gray-100">
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Candidate</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Role</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Experience</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Notice</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Contact</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Location</th>
                    <th className="px-6 py-3 text-center text-[10px] font-semibold text-white uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.length > 0 ? (
                    applications.map((app, index) => (
                      <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-6 text-center">
                          <span className="text-sm font-bold text-gray-900 group-hover:text-crimson-600 transition-colors">
                            {app.firstName || app.first_name || app.name || 'N/A'} {app.lastName || app.last_name || ''}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                            {job?.role || job?.title || 'Candidate'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="text-xs font-bold text-gray-700">
                            {app.releventExperience || app.relevantExperience || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                            {app.noticePeriod || 'Immediate'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="text-xs text-gray-600 font-medium">{app.email}</span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          <span className="text-xs font-bold text-gray-700">{app.currentLocation || 'Remote'}</span>
                        </td>
                        <td className="px-6 py-6 text-center">
                          {(() => {
                            const resumePath = app.resume_url || app.resume;
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
                      <td colSpan="7" className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center gap-3 opacity-20">
                          <Users size={64} className="text-gray-400" />
                          <p className="text-lg font-black uppercase tracking-widest text-gray-400">No Applications Yet</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default JobApplications;
