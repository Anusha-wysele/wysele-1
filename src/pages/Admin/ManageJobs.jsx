import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Filter,
  Download,
  Briefcase,
  Users,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import { useToast } from '../../components/Admin/ToastContext';
import ConfirmModal from '../../components/Admin/ConfirmModal';

const ManageJobs = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleDeleteClick = (id) => {
    setJobToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    
    try {
      await jobService.deleteJob(jobToDelete);
      setJobs(jobs.filter(job => (job._id || job.id) !== jobToDelete));
      showToast('Job deleted successfully.', 'success');
    } catch (err) {
      showToast('Failed to delete the job. Please try again.', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setJobToDelete(null);
    }
  };

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllJobs();
      console.log('📦 ManageJobs Raw Response:', data);
      
      // Handle various backend response structures
      let rawJobs = [];
      if (Array.isArray(data)) rawJobs = data;
      else if (data.results && Array.isArray(data.results)) rawJobs = data.results;
      else if (data.jobs && Array.isArray(data.jobs)) rawJobs = data.jobs;
      else if (data.data && Array.isArray(data.data)) rawJobs = data.data;
      
      console.log('📊 Count of Raw Jobs found:', rawJobs.length);

      // Map backend fields to UI fields
      const mappedJobs = rawJobs.map(job => {
        const s = (job.status || '').toLowerCase();
        let normalizedStatus = (s === 'active' || s === 'published') ? 'Published' : (job.status || 'Published');
        
        return {
          id: job._id || job.id || job.job_code || 'N/A',
          title: job.role || job.title || 'Untitled Role',
          code: job.job_code || job.jobCode || job.code || 'N/A',
          type: job.job_type || job.jobType || job.type || 'Full Time',
          status: normalizedStatus,
          applicants: job.applicants || 0,
          date: job.job_posted_date || job.jobPostedDate || job.date || 'Recently'
        };
      });

      console.log('🗺️ Mapped Jobs for UI:', mappedJobs);
      setJobs(mappedJobs);
      setError(null);
    } catch (err) {
      setError('Failed to load job postings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleView = async (jobId) => {
    try {
      const responseData = await jobService.getJobById(jobId);
      console.log('🔍 Full Job Details Response:', responseData);
      
      // Handle nested structures like { job: { ... } } or { data: { ... } }
      const fullJob = responseData.job || responseData.data || responseData;
      
      const s = (fullJob.status || '').toLowerCase();
      let normalizedStatus = (s === 'active' || s === 'published') ? 'Published' : (fullJob.status || 'Published');

      // Standardize data for UI
      const mappedJob = {
        ...fullJob,
        id: fullJob._id || fullJob.id,
        role: fullJob.role || fullJob.title || 'Untitled',
        jobCode: fullJob.job_code || fullJob.jobCode || fullJob.code || 'N/A',
        jobType: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        keySkills: fullJob.key_skills || fullJob.keySkills || fullJob.skills || [],
        responsibilities: fullJob.responsibilities || fullJob.key_responsibilities || [],
        jobPostedDate: fullJob.job_posted_date || fullJob.jobPostedDate || fullJob.date || 'N/A',
        lastDateToApply: fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.deadline || 'N/A',
        status: normalizedStatus
      };
      
      setSelectedJob(mappedJob);
      setIsViewModalOpen(true);
    } catch (err) {
      showToast('Failed to fetch job details.', 'error');
    }
  };

  const handleEditInit = async (jobId) => {
    try {
      const responseData = await jobService.getJobById(jobId);
      console.log('✏️ Edit Mode Response:', responseData);

      // Handle nested structures
      const fullJob = responseData.job || responseData.data || responseData;

      const s = (fullJob.status || '').toLowerCase();
      let normalizedStatus = (s === 'active' || s === 'published') ? 'Published' : (fullJob.status || 'Published');

      // Standardize data for UI
      const mappedJob = {
        ...fullJob,
        id: fullJob._id || fullJob.id,
        role: fullJob.role || fullJob.title || '',
        jobCode: fullJob.job_code || fullJob.jobCode || fullJob.code || '',
        jobType: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        keySkills: fullJob.key_skills || fullJob.keySkills || fullJob.skills || [],
        responsibilities: fullJob.responsibilities || fullJob.key_responsibilities || [],
        jobPostedDate: fullJob.job_posted_date || fullJob.jobPostedDate || fullJob.date || '',
        lastDateToApply: fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.deadline || '',
        status: normalizedStatus
      };

      setSelectedJob(mappedJob);
      setIsEditModalOpen(true);
    } catch (err) {
      showToast('Failed to fetch job details.', 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await jobService.updateJob(selectedJob._id || selectedJob.id, selectedJob);
      
      // Update local state
      setJobs(jobs.map(j => ((j._id || j.id) === (selectedJob._id || selectedJob.id) ? {
        ...j,
        title: selectedJob.role || selectedJob.title,
        code: selectedJob.jobCode || selectedJob.code,
        type: selectedJob.jobType || selectedJob.type,
      } : j)));
      
      setIsEditModalOpen(false);
      showToast('Job updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update job.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTab = activeTab === 'All' || job.status === activeTab;
    const matchesSearch = (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                         (job.code?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const exportToCSV = () => {
    if (filteredJobs.length === 0) {
      showToast('No data available to export.', 'info');
      return;
    }

    const headers = ['Job Title', 'Job Code', 'Job Type', 'Status', 'Applicants', 'Posted On'];
    const csvRows = filteredJobs.map(job => [
      `"${job.title.replace(/"/g, '""')}"`,
      `"${job.code}"`,
      `"${job.type}"`,
      `"${job.status}"`,
      job.applicants,
      `"${job.date}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wysele_jobs_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Job report exported successfully.', 'success');
  };

  return (
    <AdminLayout>
      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Manage Job Postings</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Monitor, edit, and track the performance of your enterprise job openings.</p>
          </div>
          <Link 
            to="/admin/job-posting"
            className="flex items-center gap-2 px-4 py-3 bg-[#ffcc00]/90 text-black rounded-none font-semibold text-sm hover:bg-black hover:text-white transition-all  w-fit"
          >
            <Plus size={18} />
            Create New Job
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Active Postings', value: jobs.filter(j => j.status === 'Published').length.toString(), icon: Briefcase, color: 'text-[#800000]' },
            { label: 'Total Applicants', value: jobs.reduce((acc, curr) => acc + (curr.applicants || 0), 0).toLocaleString(), icon: Users, color: 'text-blue-600' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-none bg-white border border-gray-100  flex items-center gap-5">
              <div className={`${stat.color} flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-none border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search By Name, Mobile Or Topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-none border border-gray-100 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-[#800000]/10 focus:border-[#800000] outline-none transition-all"
                />
              </div>
              
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-black rounded-none font-semibold text-xs  transition-all uppercase tracking-widest hover:bg-[#800000] hover:text-white"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[300px] relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching enterprise data...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-12 text-center">
                <p className="text-red-500 font-bold mb-4">{error}</p>
                <button 
                  onClick={fetchJobs}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-all"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {!error && (
              <div className="responsive-table-container">
                <table className="w-full text-left">
                <colgroup>
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                </colgroup>
                <thead className="bg-[#800000] text-white">
                  <tr>
                    <th className="px-8 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Job Details</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Job Code</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Job Type</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Posted On</th>
                    <th className="px-8 py-4 text-[11px] font-semibold text-white capitalize tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job._id || job.id} className="group hover:bg-gray-100 transition-colors">
                    <td className="px-8 py-2 text-center">
                      <span className="text-sm font-semibold text-gray-900 transition-colors truncate capitalize block">{job.title}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{job.code}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[10px] font-bold text-gray-600 uppercase bg-gray-50 px-2 py-1 border border-gray-100 rounded">{job.type}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        job.status === 'Published' 
                          ? 'bg-green-50 text-green-600 border border-green-100' 
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-xs font-medium text-gray-500">{job.date}</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => handleView(job._id || job.id)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all" title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleEditInit(job._id || job.id)}
                          className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-all" title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(job._id || job.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                          <Search size={32} />
                        </div>
                        <p className="text-gray-500 font-bold">No jobs found matching your criteria</p>
                        <button 
                          onClick={() => {setSearchTerm(''); setActiveTab('All');}}
                          className="text-crimson-600 text-xs font-black uppercase tracking-widest hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          )}
          </div>

          {/* Pagination Mock */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{filteredJobs.length}</span> of <span className="font-bold text-gray-900">{jobs.length}</span> jobs
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-400 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-black transition-all">Next</button>
            </div>
          </div>
        </div>

        {/* View Modal */}
        <AnimatePresence>
          {isViewModalOpen && selectedJob && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsViewModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-[#800000] p-3 flex justify-between items-center text-white">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Job Details</h3>
                  <button onClick={() => setIsViewModalOpen(false)}><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Role</p>
                      <p className="text-base font-bold text-gray-900">{selectedJob.role || selectedJob.title}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Code</p>
                      <p className="text-base font-bold text-gray-900">{selectedJob.jobCode || selectedJob.code}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">
                        {selectedJob.status || 'Published'}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</p>
                      <p className="text-sm font-medium text-gray-700">{selectedJob.jobType || selectedJob.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                      <p className="text-sm font-medium text-gray-700">{selectedJob.experience}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-medium text-gray-700">{selectedJob.location}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Region</p>
                      <p className="text-sm font-medium text-gray-700">{selectedJob.region}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Posted On</p>
                      <p className="text-sm font-medium text-gray-700">{selectedJob.jobPostedDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Date to Apply</p>
                      <p className="text-sm font-bold text-crimson-600">{selectedJob.lastDateToApply}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Key Responsibilities</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedJob.responsibilities || []).map((resp, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-lg text-xs font-bold text-[#800000]">
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Key Skills Required</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedJob.keySkills || []).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</p>
                    <div className="text-sm text-gray-600 leading-relaxed border p-4 rounded-xl bg-gray-50" dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditModalOpen && selectedJob && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsEditModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-3xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-[#800000] p-3 flex justify-between items-center text-white">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Edit Job Posting</h3>
                  <button onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
                </div>
                <form onSubmit={handleUpdate} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto hide-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Role / Title</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.role || selectedJob.title || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Job Code</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.jobCode || selectedJob.code || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, jobCode: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Job Type</label>
                      <select 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none appearance-none"
                        value={selectedJob.jobType || selectedJob.type || ''}
                        onChange={(e) => setSelectedJob({...selectedJob, jobType: e.target.value})}
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Experience</label>
                      <select 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none appearance-none"
                        value={selectedJob.experience || ''}
                        onChange={(e) => setSelectedJob({...selectedJob, experience: e.target.value})}
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Lead / Manager">Lead / Manager</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Location</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.location || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Region</label>
                      <select 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none appearance-none"
                        value={selectedJob.region || ''}
                        onChange={(e) => setSelectedJob({...selectedJob, region: e.target.value})}
                      >
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia Pacific">Asia Pacific</option>
                        <option value="Remote (Global)">Remote (Global)</option>
                      </select>
                    </div>
                    <div className="col-span-full space-y-3 pt-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Key Responsibilities</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(selectedJob.responsibilities || []).map((resp, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded text-[11px] font-bold text-[#800000]">
                            {resp}
                            <button 
                              type="button"
                              onClick={() => {
                                const newResps = selectedJob.responsibilities.filter((_, i) => i !== idx);
                                setSelectedJob({...selectedJob, responsibilities: newResps});
                              }}
                              className="hover:text-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          id="edit-resp-input"
                          placeholder="Add responsibility and press Enter..."
                          className="flex-1 border p-2.5 rounded-lg text-sm outline-none focus:border-[#800000] bg-gray-50/50"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = e.target.value.trim();
                              if (val && !(selectedJob.responsibilities || []).includes(val)) {
                                setSelectedJob({
                                  ...selectedJob, 
                                  responsibilities: [...(selectedJob.responsibilities || []), val]
                                });
                                e.target.value = '';
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-span-full space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Last Date to Apply</label>
                      <input 
                        type="date"
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.lastDateToApply || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, lastDateToApply: e.target.value})}
                      />
                    </div>
                    <div className="col-span-full space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Job Description</label>
                      <textarea 
                        className="w-full border p-2.5 rounded-lg text-sm min-h-[120px] focus:border-crimson-500 outline-none" 
                        value={selectedJob.description || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-sm font-bold text-gray-500">Cancel</button>
                    <button 
                      type="submit" 
                      disabled={isUpdating}
                      className="px-8 py-2 bg-crimson-600 text-white rounded-lg text-sm font-bold flex items-center gap-2"
                    >
                      {isUpdating && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <ConfirmModal 
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Job Posting?"
          message="Are you sure you want to delete this job? This action cannot be undone and all applicant data for this role will be hidden."
          confirmText="Yes, Delete Job"
          cancelText="No, Keep it"
        />
      </div>
    </AdminLayout>
  );
};

export default ManageJobs;
