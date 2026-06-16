import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Download,
  Edit3,
  Eye,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import ConfirmModal from '../../components/Admin/ConfirmModal';
import { useToast } from '../../components/Admin/ToastContext';
import jobService from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';

const capitalizeText = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const formatDisplayDate = (dateStr) => {
  if (!dateStr || dateStr === 'Recently' || dateStr === 'N/A') return dateStr || 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

const formatInputDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};

const ManageJobs = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobsCount, setTotalJobsCount] = useState(0);
  const limit = 10;

  // Debounce search term to prevent excessive backend queries
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Reset page when active company or status filter tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCompany, activeTab]);
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
      const queryParams = { 
        company: activeCompany,
        page: currentPage,
        limit: limit
      };
      if (debouncedSearchTerm.trim()) {
        queryParams.q = debouncedSearchTerm;
        queryParams.query = debouncedSearchTerm;
      }
      if (activeTab !== 'All') {
        const getBackendStatus = (tab) => {
          if (tab === 'Posted') return 'ACTIVE';
          if (tab === 'Draft') return 'DRAFT';
          return undefined;
        };
        const backendStatus = getBackendStatus(activeTab);
        if (backendStatus) {
          queryParams.status = backendStatus;
        }
      }
      const data = await jobService.getAllJobs(queryParams);
      console.log('📦 ManageJobs Raw Response:', data);
      
      // Handle various backend response structures and robustly extract pagination metadata
      let rawJobs = [];
      let totalCount = 0;
      let calculatedTotalPages = 1;

      if (Array.isArray(data)) {
        rawJobs = data;
      } else {
        if (data.results && Array.isArray(data.results)) rawJobs = data.results;
        else if (data.jobs && Array.isArray(data.jobs)) rawJobs = data.jobs;
        else if (data.data && Array.isArray(data.data)) rawJobs = data.data;
        else if (Array.isArray(data)) rawJobs = data;
      }
      
      // 1. Client-side fallback filter for company (run before slicing)
      if (activeCompany) {
        rawJobs = rawJobs.filter(job => 
          (job.company_name || job.company || 'wysele')?.toLowerCase() === activeCompany.toLowerCase()
        );
      }

      // 2. Client-side status fallback filter (run before slicing)
      if (activeTab !== 'All') {
        const expectedStatus = activeTab === 'Draft' ? 'draft' : 'active';
        rawJobs = rawJobs.filter(job => {
          const s = (job.status || '').toLowerCase();
          if (expectedStatus === 'draft') {
            return s === 'draft';
          } else {
            return s !== 'draft';
          }
        });
      }

      // 3. Recalculate pagination metadata based on filtered results
      if (Array.isArray(data) || (!data.count && !data.total && !data.totalJobs && !data.totalItems && !data.total_items)) {
        totalCount = rawJobs.length;
        calculatedTotalPages = Math.ceil(totalCount / limit) || 1;
      } else {
        totalCount = data.count || data.total || data.totalJobs || data.totalItems || data.total_items || rawJobs.length;
        calculatedTotalPages = data.totalPages || data.pages || Math.ceil(totalCount / limit) || 1;
      }

      // 4. Finally, slice for pagination on the filtered subset
      const startIndex = (currentPage - 1) * limit;
      rawJobs = rawJobs.slice(startIndex, startIndex + limit);

      console.log('📊 Count of Raw Jobs found:', rawJobs.length);

      // Map backend fields to UI fields
      const mappedJobs = rawJobs.map(job => {
        const s = (job.status || '').toLowerCase();
        let normalizedStatus = s === 'draft' ? 'Draft' : 'Published';
        
        return {
          id: job._id || job.id || job.job_code || 'N/A',
          title: job.job_title || job.role || job.title || 'Untitled Role',
          code: job.job_code || job.jobCode || job.code || 'N/A',
          type: job.job_type || job.jobType || job.type || 'Full Time',
          status: normalizedStatus,
          applicants: job.applicants || 0,
          date: formatDisplayDate(job.job_posted_date || job.jobPostedDate || job.createdAt || job.created_at || job.date || 'Recently')
        };
      });

      console.log('🗺️ Mapped Jobs for UI:', mappedJobs);
      setJobs(mappedJobs);
      setOriginalJobs(rawJobs);
      setTotalJobsCount(totalCount);
      setTotalPages(calculatedTotalPages);
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
  }, [activeCompany, activeTab, currentPage, debouncedSearchTerm]);

  const handleView = async (jobId) => {
    try {
      // Find the job in originalJobs local state first
      let fullJob = originalJobs.find(j => (j._id || j.id) === jobId);
      
      // Fallback to API call if not found locally
      if (!fullJob) {
        const responseData = await jobService.getJobById(jobId);
        console.log('🔍 Full Job Details Response:', responseData);
        fullJob = responseData.job || responseData.data || responseData;
      }
      
      const s = (fullJob.status || '').toLowerCase();
      let normalizedStatus = s === 'draft' ? 'Draft' : 'Published';

      // Standardize data for UI
      const mappedJob = {
        ...fullJob,
        id: fullJob._id || fullJob.id,
        role: fullJob.job_title || fullJob.role || fullJob.title || 'Untitled',
        jobCode: fullJob.job_code || fullJob.jobCode || fullJob.code || 'N/A',
        jobType: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        keySkills: fullJob.required_skills || fullJob.key_skills || fullJob.keySkills || fullJob.skills || [],
        responsibilities: fullJob.responsibilities || fullJob.key_responsibilities || [],
        jobPostedDate: formatDisplayDate(fullJob.job_posted_date || fullJob.jobPostedDate || fullJob.createdAt || fullJob.created_at || fullJob.date || 'N/A'),
        lastDateToApply: formatDisplayDate(fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.application_deadline || fullJob.deadline || 'N/A'),
        status: normalizedStatus
      };
      
      setSelectedJob(mappedJob);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('Error in handleView:', err);
      showToast('Failed to fetch job details.', 'error');
    }
  };

  const handleEditInit = async (jobId) => {
    try {
      // Find the job in originalJobs local state first
      let fullJob = originalJobs.find(j => (j._id || j.id) === jobId);
      
      // Fallback to API call if not found locally
      if (!fullJob) {
        const responseData = await jobService.getJobById(jobId);
        console.log('✏️ Edit Mode Response:', responseData);
        fullJob = responseData.job || responseData.data || responseData;
      }

      const s = (fullJob.status || '').toLowerCase();
      let normalizedStatus = s === 'draft' ? 'Draft' : 'Published';

      // Standardize data for UI
      const mappedJob = {
        ...fullJob,
        id: fullJob._id || fullJob.id,
        role: fullJob.job_title || fullJob.role || fullJob.title || '',
        jobCode: fullJob.job_code || fullJob.jobCode || fullJob.code || '',
        jobType: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        keySkills: (fullJob.required_skills || fullJob.key_skills || fullJob.keySkills || fullJob.skills || []).map(s => typeof s === 'object' ? s.name : s),
        responsibilities: fullJob.responsibilities || fullJob.key_responsibilities || [],
        benefits: fullJob.benefits || [],
        jobPostedDate: formatInputDate(fullJob.job_posted_date || fullJob.jobPostedDate || fullJob.createdAt || fullJob.created_at || fullJob.date),
        lastDateToApply: formatInputDate(fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.application_deadline || fullJob.deadline),
        status: normalizedStatus
      };

      setSelectedJob(mappedJob);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error('Error in handleEditInit:', err);
      showToast('Failed to fetch job details.', 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!selectedJob.role?.trim() && !selectedJob.title?.trim() && !selectedJob.job_title?.trim()) {
      showToast('Job Title cannot be empty', 'error');
      return;
    }
    if (!selectedJob.jobCode?.trim() && !selectedJob.code?.trim() && !selectedJob.job_code?.trim()) {
      showToast('Job Code cannot be empty', 'error');
      return;
    }

    try {
      setIsUpdating(true);

      const payload = {
        role: selectedJob.role || selectedJob.title || '',
        job_title: selectedJob.role || selectedJob.title || '',
        title: selectedJob.role || selectedJob.title || '',
        jobCode: selectedJob.jobCode || selectedJob.code || '',
        job_code: selectedJob.jobCode || selectedJob.code || '',
        code: selectedJob.jobCode || selectedJob.code || '',
        description: selectedJob.description || '',
        keySkills: selectedJob.keySkills || selectedJob.required_skills || selectedJob.skills || [],
        required_skills: selectedJob.keySkills || selectedJob.required_skills || selectedJob.skills || [],
        responsibilities: selectedJob.responsibilities || [],
        jobType: selectedJob.jobType || selectedJob.type || 'Full Time',
        employment_type: selectedJob.jobType || selectedJob.type || 'Full Time',
        work_mode: selectedJob.work_mode || 'Remote',
        experience: selectedJob.experience || 'Entry Level',
        openings: Number(selectedJob.openings) || 0,
        location: selectedJob.location || '',
        min_salary: Number(selectedJob.min_salary) || 0,
        max_salary: Number(selectedJob.max_salary) || 0,
        qualification: selectedJob.qualification || '',
        application_email: selectedJob.application_email || '',
        jobPostedDate: selectedJob.jobPostedDate || selectedJob.job_posted_date || selectedJob.createdAt || selectedJob.created_at || selectedJob.date || '',
        lastDateToApply: selectedJob.lastDateToApply || selectedJob.last_date_to_apply || selectedJob.application_deadline || selectedJob.deadline || '',
        application_deadline: selectedJob.lastDateToApply || selectedJob.last_date_to_apply || selectedJob.application_deadline || selectedJob.deadline || '',
        is_featured: selectedJob.is_featured ?? true,
        status: selectedJob.status === 'Draft' ? 'DRAFT' : 'ACTIVE',
        company_name: selectedJob.company_name || 'wysele',
        company_id: selectedJob.company_id || 'wysele_co',
        department: selectedJob.department || ''
      };

      console.log('✏️ Sending Update Payload:', payload);
      await jobService.updateJob(selectedJob._id || selectedJob.id, payload);
      
      // Update local state
      const updatedJobMapped = {
        id: selectedJob._id || selectedJob.id,
        title: selectedJob.role || selectedJob.title,
        code: selectedJob.jobCode || selectedJob.code,
        type: selectedJob.jobType || selectedJob.type,
        status: selectedJob.status === 'Draft' ? 'Draft' : 'Published',
        applicants: selectedJob.applicants || 0,
        date: selectedJob.jobPostedDate || selectedJob.date || 'Recently'
      };

      setJobs(jobs.map(j => (j.id === updatedJobMapped.id ? updatedJobMapped : j)));
      setOriginalJobs(originalJobs.map(j => ((j._id || j.id) === (selectedJob._id || selectedJob.id) ? { ...j, ...payload, title: payload.title, job_title: payload.job_title, code: payload.code, job_code: payload.job_code } : j)));
      
      setIsEditModalOpen(false);
      showToast('Job updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating job:', err);
      showToast(err.message || 'Failed to update job.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePublishJob = async (jobId) => {
    try {
      // Find full job details locally or from API
      let fullJob = originalJobs.find(j => (j._id || j.id) === jobId);
      if (!fullJob) {
        const responseData = await jobService.getJobById(jobId);
        fullJob = responseData.job || responseData.data || responseData;
      }

      // Map to payload with updated status
      const payload = {
        role: fullJob.job_title || fullJob.role || fullJob.title || '',
        job_title: fullJob.job_title || fullJob.role || fullJob.title || '',
        jobCode: fullJob.job_code || fullJob.jobCode || fullJob.code || '',
        job_code: fullJob.job_code || fullJob.jobCode || fullJob.code || '',
        description: fullJob.description || '',
        keySkills: fullJob.required_skills || fullJob.key_skills || fullJob.keySkills || fullJob.skills || [],
        required_skills: fullJob.required_skills || fullJob.key_skills || fullJob.keySkills || fullJob.skills || [],
        responsibilities: fullJob.responsibilities || [],
        jobType: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        employment_type: fullJob.job_type || fullJob.jobType || fullJob.type || 'Full Time',
        work_mode: fullJob.work_mode || 'Remote',
        experience: fullJob.experience || 'Entry Level',
        openings: Number(fullJob.openings) || 0,
        location: fullJob.location || '',
        min_salary: Number(fullJob.min_salary) || 0,
        max_salary: Number(fullJob.max_salary) || 0,
        qualification: fullJob.qualification || '',
        application_email: fullJob.application_email || '',
        jobPostedDate: fullJob.job_posted_date || fullJob.jobPostedDate || fullJob.createdAt || fullJob.created_at || fullJob.date || '',
        lastDateToApply: fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.application_deadline || fullJob.deadline || '',
        application_deadline: fullJob.last_date_to_apply || fullJob.lastDateToApply || fullJob.application_deadline || fullJob.deadline || '',
        is_featured: fullJob.is_featured ?? true,
        status: 'ACTIVE',
        company_name: fullJob.company_name || 'wysele',
        company_id: fullJob.company_id || 'wysele_co',
        department: fullJob.department || ''
      };

      await jobService.updateJob(jobId, payload);
      showToast('Job published successfully!', 'success');
      
      // Update local state
      setJobs(prevJobs => prevJobs.map(j => j.id === jobId ? { ...j, status: 'Published' } : j));
      setOriginalJobs(prevOriginalJobs => prevOriginalJobs.map(j => (j._id || j.id) === jobId ? { ...j, status: 'Published' } : j));
    } catch (err) {
      console.error('Error publishing job:', err);
      showToast(err.message || 'Failed to publish job.', 'error');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                         (job.code?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesSearch;
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
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Manage Job Postings</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Monitor, edit, and track the performance of your enterprise job openings.</p>
          </div>
          <Link 
            to={`/admin/job-posting?company=${activeCompany}`}
            className="flex items-center gap-2 px-4 py-3 bg-[#005A9E] text-white rounded-lg font-semibold text-sm hover:bg-[#004b85] hover:text-white transition-all w-fit"
          >
            <Plus size={18} />
            Post Job
          </Link>
        </div>

        {/* Search & Export Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by job title or code..."
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

        {/* Status Tabs Card */}
        <div className="flex items-center gap-2 py-1">
          {['All', 'Posted', 'Draft'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === tab
                  ? 'bg-[#005A9E] text-white shadow-sm border border-transparent'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Separate Table Card */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-blue-100 border-t-[#005A9E] rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching enterprise data...</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-12 text-center">
                <p className="text-red-500 font-bold">{error}</p>
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
                  <thead className="bg-blue-200 text-blue-900">
                    <tr>
                      <th className="px-8 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Job Title</th>
                      <th className="px-6 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Job Code</th>
                      <th className="px-6 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Job Type</th>
                      <th className="px-6 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Status</th>
                      <th className="px-6 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Posted On</th>
                      <th className="px-8 py-2.5 text-[11px] font-semibold text-[#005A9E] capitalize tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <tr key={job._id || job.id} className="group hover:bg-gray-100 transition-colors">
                          <td className="px-8 py-2.5 text-center">
                            <span className="text-xs font-semibold text-gray-900 transition-colors truncate capitalize block">{capitalizeText(job.title)}</span>
                          </td>
                          <td className="px-6 py-2.5 text-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{job.code}</span>
                          </td>
                          <td className="px-6 py-2.5 text-center">
                            <span className="text-[9px] font-bold text-gray-600 uppercase bg-gray-50 px-2 py-1 border border-gray-100 rounded">{job.type}</span>
                          </td>
                          <td className="px-6 py-2.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              job.status === 'Published' 
                                ? 'bg-green-50 text-green-600 border border-green-100' 
                                : 'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-2.5 text-center">
                            <span className="text-[10px] font-medium text-gray-500">{job.date}</span>
                          </td>
                          <td className="px-8 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button 
                                onClick={() => handleView(job._id || job.id)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-all" title="View"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditInit(job._id || job.id)}
                                className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-all" title="Edit"
                              >
                                <Edit3 size={16} />
                              </button>
                              {job.status === 'Draft' && (
                                <button 
                                  onClick={() => handlePublishJob(job._id || job.id)}
                                  className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-all" title="Publish"
                                >
                                  <Send size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                              <Search size={32} />
                            </div>
                            <p className="text-gray-500 font-bold">No jobs found</p>
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

        {/* View Modal */}
        {createPortal(
          <AnimatePresence>
            {isViewModalOpen && selectedJob && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsViewModalOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-blue-200 p-3 flex justify-between items-center text-blue-900">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Job Details</h3>
                  <button onClick={() => setIsViewModalOpen(false)} className="text-blue-900"><X size={20} /></button>
                </div>
                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Role</p>
                      <p className="text-base font-bold text-gray-900">{capitalizeText(selectedJob.role || selectedJob.title)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Code</p>
                      <p className="text-base font-bold text-gray-900">{selectedJob.jobCode || selectedJob.code}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        selectedJob.status === 'Published'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
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
                    <div className="text-sm text-gray-600 leading-relaxed border p-4 rounded-xl bg-gray-50" dangerouslySetInnerHTML={{ __html: selectedJob.description || '' }} />
                  </div>
                </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Edit Modal */}
        {createPortal(
          <AnimatePresence>
            {isEditModalOpen && selectedJob && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-3xl rounded-none shadow-2xl overflow-hidden"
              >
                <div className="bg-blue-200 p-3 flex justify-between items-center text-blue-900">
                  <h3 className="text-[15px] font-semibold uppercase tracking-widest">Edit Job Posting</h3>
                  <button onClick={() => setIsEditModalOpen(false)} className="text-blue-900"><X size={20} /></button>
                </div>
                <form onSubmit={handleUpdate} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto hide-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Role / Title</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.role || selectedJob.title || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, role: e.target.value, title: e.target.value, job_title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Job Code</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.jobCode || selectedJob.code || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, jobCode: e.target.value, code: e.target.value, job_code: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Status</label>
                      <select 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-[#005A9E] outline-none appearance-none"
                        value={selectedJob.status || 'Published'}
                        onChange={(e) => setSelectedJob({...selectedJob, status: e.target.value})}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
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
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Department</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.department || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, department: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Work Mode</label>
                      <select 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none appearance-none"
                        value={selectedJob.work_mode || selectedJob.workMode || 'Remote'}
                        onChange={(e) => setSelectedJob({...selectedJob, work_mode: e.target.value})}
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Number of Openings</label>
                      <input 
                        type="number"
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.openings ?? 1} 
                        onChange={(e) => setSelectedJob({...selectedJob, openings: Number(e.target.value)})}
                        min="1"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Company ID</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.company_id || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, company_id: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Minimum Salary ($ / Year)</label>
                      <input 
                        type="number"
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.min_salary || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, min_salary: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Maximum Salary ($ / Year)</label>
                      <input 
                        type="number"
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.max_salary || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, max_salary: Number(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Qualification Required</label>
                      <input 
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.qualification || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, qualification: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Application Email</label>
                      <input 
                        type="email"
                        className="w-full border p-2.5 rounded-lg text-sm focus:border-crimson-500 outline-none" 
                        value={selectedJob.application_email || ''} 
                        onChange={(e) => setSelectedJob({...selectedJob, application_email: e.target.value})}
                      />
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
                      className="px-8 py-2 bg-[#005A9E] text-white rounded-lg text-sm font-semibold hover:bg-[#004b85] transition-all flex items-center gap-2 shadow-sm"
                    >
                      {isUpdating && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

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
