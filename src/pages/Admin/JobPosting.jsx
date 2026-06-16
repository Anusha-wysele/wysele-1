import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  Plus,
  Send,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import jobService from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';

const JobPosting = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [responsibilities, setResponsibilities] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState('');
  const [benefits, setBenefits] = useState([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [lastDateToApply, setLastDateToApply] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [jobPostedDate, setJobPostedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isFeatured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStyles, setActiveStyles] = useState([]);
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [openings, setOpenings] = useState(1);
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [qualification, setQualification] = useState('');
  const [applicationEmail, setApplicationEmail] = useState('');
  const [companyId, setCompanyId] = useState(user?.company_id || '');
  const [description, setDescription] = useState('');

  const handlePublish = async (statusVal = 'Published') => {
    if (!jobTitle.trim()) {
      showToast('Job Title cannot be empty', 'error');
      return;
    }
    if (!jobCode.trim()) {
      showToast('Job Code cannot be empty', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const editorElement = document.getElementById('rich-editor');
      const editorContent = editorElement ? editorElement.innerHTML : '';
      
      const payload = {
        role: jobTitle,
        job_title: jobTitle,
        jobCode: jobCode,
        job_code: jobCode,
        description: editorContent,
        keySkills: skills,
        required_skills: skills,
        responsibilities: responsibilities,
        benefits: benefits,
        jobType: jobType || 'Full Time',
        employment_type: employmentType || 'Full Time',
        work_mode: workMode || 'Remote',
        experience: experience || 'Entry Level',
        openings: Number(openings) || 1,
        location: location,
        min_salary: Number(minSalary) || 0,
        max_salary: Number(maxSalary) || 0,
        qualification: qualification,
        application_email: applicationEmail,
        jobPostedDate: jobPostedDate,
        lastDateToApply: lastDateToApply,
        application_deadline: lastDateToApply,
        is_featured: isFeatured,
        status: statusVal === 'Draft' ? 'DRAFT' : 'ACTIVE',
        company_name: activeCompany,
        company_id: companyId || 'wysele_co',
        department: department
      };

      console.log('🚀 Sending Job Payload:', payload);
      await jobService.createJob(payload);
      showToast(`Job opening saved as ${statusVal === 'Draft' ? 'Draft' : 'Published'}!`, 'success');
      navigate(`/admin/manage-jobs?company=${activeCompany}`);
    } catch (err) {
      showToast(err.message || 'Failed to publish the job.', 'error');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    checkActiveStyles();
    document.getElementById('rich-editor').focus();
  };

  const checkActiveStyles = () => {
    const styles = [];
    if (document.queryCommandState('bold')) styles.push('B');
    if (document.queryCommandState('italic')) styles.push('I');
    if (document.queryCommandState('underline')) styles.push('U');
    
    const block = document.queryCommandValue('formatBlock');
    if (block === 'h1') styles.push('H1');
    if (block === 'h2') styles.push('H2');
    if (document.queryCommandState('insertUnorderedList')) styles.push('List');
    
    setActiveStyles(styles);
  };

  const handleKeyDown = (e) => {
    // Shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); execCommand('bold'); }
      if (e.key === 'i') { e.preventDefault(); execCommand('italic'); }
      if (e.key === 'u') { e.preventDefault(); execCommand('underline'); }
    }

    // List Logic
    if (e.key === 'Enter') {
      const isList = document.queryCommandState('insertUnorderedList');
      if (isList) {
        const selection = window.getSelection();
        const node = selection.anchorNode;
        if (node && node.textContent.trim() === '') {
          // If empty bullet, remove list on Enter (alternative to backspace)
          // Actually user said "Backspace on empty bullet removes list"
        }
      }
    }
  };

  const handleAddSkill = () => {
    const val = newSkill.trim();
    if (val && !skills.includes(val)) {
      setSkills([...skills, val]);
    }
    setNewSkill('');
  };

  const addSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddResponsibility = () => {
    const val = newResponsibility.trim();
    if (val && !responsibilities.includes(val)) {
      setResponsibilities([...responsibilities, val]);
    }
    setNewResponsibility('');
  };

  const addResponsibility = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResponsibility();
    }
  };

  const removeResponsibility = (resp) => {
    setResponsibilities(responsibilities.filter(r => r !== resp));
  };

  const handleAddBenefit = () => {
    const val = newBenefit.trim();
    if (val && !benefits.includes(val)) {
      setBenefits([...benefits, val]);
    }
    setNewBenefit('');
  };

  const addBenefit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBenefit();
    }
  };

  const removeBenefit = (benefit) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  const employmentTypes = [
    { value: 'Full Time', label: 'Full-time', subtext: '40+ hrs/week', icon: '⏱️' },
    { value: 'Part Time', label: 'Part-time', subtext: 'Flexible hours', icon: '🕒' },
    { value: 'Contract', label: 'Contract', subtext: 'Project-based', icon: '💼' },
    { value: 'Internship', label: 'Internship', subtext: 'Career kickstart', icon: '🎓' },
    { value: 'Freelance', label: 'Freelance', subtext: 'Independent', icon: '💻' }
  ];

  const workModes = [
    { value: 'On-site', label: 'On-site', subtext: 'Work at physical office', icon: '🏢' },
    { value: 'Remote', label: 'Remote', subtext: 'Work from anywhere', icon: '🏠' },
    { value: 'Hybrid', label: 'Hybrid', subtext: 'Split office & home', icon: '🌐' }
  ];

  const expLevels = [
    { value: 'Entry Level', label: 'Entry Level', subtext: '0-2 years exp', icon: '🌱' },
    { value: 'Mid Level', label: 'Mid-Senior', subtext: '2-5 years exp', icon: '🚀' },
    { value: 'Senior Level', label: 'Senior Level', subtext: '5+ years exp', icon: '🏆' },
    { value: 'Lead / Manager', label: 'Lead / Manager', subtext: 'Management track', icon: '💼' }
  ];

  const hasPreviewContent = !!(
    jobTitle.trim() ||
    jobCode.trim() ||
    department.trim() ||
    location.trim() ||
    employmentType ||
    workMode ||
    experience ||
    minSalary ||
    maxSalary ||
    applicationEmail.trim() ||
    qualification.trim() ||
    skills.length > 0 ||
    responsibilities.length > 0 ||
    benefits.length > 0 ||
    description.trim()
  );

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10 max-w-7xl mx-auto font-inter">
        
        {/* Scaffolding Header Block */}
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="p-3 bg-[#005A9E] text-white rounded-md flex items-center justify-center shadow-sm">
            <Plus size={20} className="stroke-[3]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 uppercase tracking-wider">Publish Job Listing</h1>
            <p className="text-xs text-gray-500 font-medium">Specify your job details across the tabs below.</p>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Tabbed Form */}
          <div className="lg:col-span-8 bg-white rounded-md border border-gray-200 shadow-sm p-6 space-y-6">
            
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                className={`px-4 py-1.5 text-xs font-bold capitalize tracking-wider transition-all rounded-lg ${
                  activeTab === 1
                    ? 'bg-[#005A9E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200/80'
                }`}
              >
                1. Basics
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!jobTitle.trim() || !jobCode.trim()) {
                    showToast('Please fill in the Job Title and Job Code to proceed.', 'error');
                    return;
                  }
                  setActiveTab(2);
                }}
                className={`px-4 py-1.5 text-xs font-bold capitalize tracking-wider transition-all rounded-lg ${
                  activeTab === 2
                    ? 'bg-[#005A9E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200/80'
                }`}
              >
                2. Salary
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!jobTitle.trim() || !jobCode.trim()) {
                    showToast('Please fill in the Job Title and Job Code to proceed.', 'error');
                    return;
                  }
                  setActiveTab(3);
                }}
                className={`px-4 py-1.5 text-xs font-bold capitalize tracking-wider transition-all rounded-lg ${
                  activeTab === 3
                    ? 'bg-[#005A9E] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200/80'
                }`}
              >
                3. Apply Info
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              
              {/* Tab 1: Basics Content */}
              <div className={`space-y-4 ${activeTab === 1 ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  
                  {/* Job Title */}
                  <div className="space-y-1 col-span-full">
                    <label className="text-xs font-bold text-gray-700">Job Title <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="e.g. Senior Developer" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Job Code */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Job Code <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={jobCode}
                        onChange={(e) => setJobCode(e.target.value)}
                        placeholder="e.g. DEV-2026-001" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Department</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Engineering" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Number of Openings */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Number of Openings <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={openings}
                        onChange={(e) => setOpenings(Number(e.target.value) || 1)}
                        min="1"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Application Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Application Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="email" 
                        value={applicationEmail}
                        onChange={(e) => setApplicationEmail(e.target.value)}
                        placeholder="e.g. careers@company.com" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Application Deadline */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Application Deadline <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={lastDateToApply}
                        onChange={(e) => setLastDateToApply(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Work Location */}
                  <div className="space-y-1 col-span-full">
                    <label className="text-xs font-bold text-gray-700">Work Location</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. New York, NY or Remote" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Employment Type Selector */}
                  <div className="space-y-1 col-span-full pt-1">
                    <label className="text-xs font-bold text-gray-700">Employment Type</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {employmentTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => {
                            setJobType(type.value);
                            setEmploymentType(type.value);
                          }}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all ${
                            employmentType === type.value
                              ? 'border-[#005A9E] bg-blue-50/40 ring-1 ring-[#005A9E]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-normal text-gray-900">{type.label}</p>
                            <p className="text-[10px] text-gray-400 font-normal uppercase tracking-tight">{type.subtext}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Work Mode Selector */}
                  <div className="space-y-1 col-span-full pt-1">
                    <label className="text-xs font-bold text-gray-700">Work Mode</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {workModes.map((mode) => (
                        <button
                          key={mode.value}
                          type="button"
                          onClick={() => setWorkMode(mode.value)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all ${
                            workMode === mode.value
                              ? 'border-[#005A9E] bg-blue-50/40 ring-1 ring-[#005A9E]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-normal text-gray-900">{mode.label}</p>
                            <p className="text-[10px] text-gray-400 font-normal uppercase tracking-tight">{mode.subtext}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level Selector */}
                  <div className="space-y-1 col-span-full pt-1">
                    <label className="text-xs font-bold text-gray-700">Experience Level Required</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {expLevels.map((lvl) => (
                        <button
                          key={lvl.value}
                          type="button"
                          onClick={() => setExperience(lvl.value)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all ${
                            experience === lvl.value
                              ? 'border-[#005A9E] bg-blue-50/40 ring-1 ring-[#005A9E]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-normal text-gray-900">{lvl.label}</p>
                            <p className="text-[10px] text-gray-400 font-normal uppercase tracking-tight">{lvl.subtext}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Tab 2: Salary Content */}
              <div className={`space-y-4 ${activeTab === 2 ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                  
                  {/* Min Salary */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Minimum Salary ($ / Year)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">$</span>
                      <input 
                        type="number" 
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        placeholder="e.g. 60000" 
                        className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Max Salary */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Maximum Salary ($ / Year)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-sm">$</span>
                      <input 
                        type="number" 
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        placeholder="e.g. 90000" 
                        className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Benefits & Perks pill builder */}
                  <div className="space-y-1 col-span-full">
                    <label className="text-xs font-bold text-gray-700">Benefits & Perks</label>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {benefits.map((b) => (
                        <div
                          key={b}
                          className="flex items-center gap-2 px-3 py-1.5 rounded bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider"
                        >
                          <span>{b}</span>
                          <button 
                            type="button" 
                            onClick={() => removeBenefit(b)} 
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        onKeyDown={addBenefit}
                        placeholder="Add a benefit..." 
                        className="w-full pl-3 pr-8 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="absolute right-2 p-1.5 rounded-md hover:bg-gray-100 text-[#005A9E] transition-colors flex items-center justify-center"
                        title="Add"
                      >
                        <Plus size={18} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tab 3: Apply Info Content */}
              <div className={`space-y-4 ${activeTab === 3 ? 'block' : 'hidden'}`}>
                <div className="space-y-3">
                  
                  {/* Qualification Required */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Qualification Required</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="e.g. B.Tech / MCA / Degree in CS" 
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Key Skills pill builder */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Key Skills & Technologies</label>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider"
                        >
                          <span>{skill}</span>
                          <button 
                            type="button" 
                            onClick={() => removeSkill(skill)} 
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={addSkill}
                        placeholder="Add a skill..." 
                        className="w-full pl-3 pr-8 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="absolute right-2 p-1.5 rounded-md hover:bg-gray-100 text-[#005A9E] transition-colors flex items-center justify-center"
                        title="Add"
                      >
                        <Plus size={18} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Key Responsibilities pill builder */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Key Responsibilities</label>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {responsibilities.map((resp) => (
                        <div
                          key={resp}
                          className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#800000] text-[10px] font-bold uppercase tracking-wider"
                        >
                          <span>{resp}</span>
                          <button 
                            type="button" 
                            onClick={() => removeResponsibility(resp)} 
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        onKeyDown={addResponsibility}
                        placeholder="Add a responsibility..." 
                        className="w-full pl-3 pr-8 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 focus:border-[#005A9E] outline-none text-sm placeholder:text-xs transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleAddResponsibility}
                        className="absolute right-2 p-1.5 rounded-md hover:bg-gray-100 text-[#005A9E] transition-colors flex items-center justify-center"
                        title="Add"
                      >
                        <Plus size={18} className="stroke-[2.5]" />
                      </button>
                    </div>
                  </div>

                  {/* Job Description (Rich Editor) */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Job Description</label>
                    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
                      <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50">
                        {[
                          { label: 'B', action: () => execCommand('bold') },
                          { label: 'I', action: () => execCommand('italic') },
                          { label: 'U', action: () => execCommand('underline') },
                          { label: 'H1', action: () => execCommand('formatBlock', 'h1') },
                          { label: 'H2', action: () => execCommand('formatBlock', 'h2') },
                          { label: 'List', action: () => execCommand('insertUnorderedList') }
                        ].map((tool) => (
                          <button 
                            key={tool.label} 
                            type="button"
                            onClick={tool.action}
                            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all uppercase tracking-widest ${
                              activeStyles.includes(tool.label) 
                                ? 'bg-white text-black shadow-sm border border-gray-200' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {tool.label}
                          </button>
                        ))}
                      </div>
                      <div 
                        id="rich-editor"
                        contentEditable
                        onInput={(e) => {
                          checkActiveStyles();
                          setDescription(e.target.innerHTML);
                        }}
                        onKeyDown={handleKeyDown}
                        onKeyUp={checkActiveStyles}
                        onMouseUp={checkActiveStyles}
                        className="w-full bg-transparent p-3 text-gray-700 outline-none min-h-[220px] text-sm prose prose-slate max-w-none editor-content"
                        placeholder="Describe the role, responsibilities, and impact..."
                      ></div>
                    </div>
                  </div>

                </div>
              </div>



              {/* Bottom Buttons Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                {activeTab > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(prev => prev - 1)}
                    className="px-5 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-wider transition-all"
                  >
                    Previous Tab
                  </button>
                ) : (
                  <div />
                )}
                
                {activeTab < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === 1 && (!jobTitle.trim() || !jobCode.trim())) {
                        showToast('Please fill in the Job Title and Job Code to proceed.', 'error');
                        return;
                      }
                      setActiveTab(prev => prev + 1);
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#005A9E] text-white hover:bg-[#004b84] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Next Tab
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button 
                      type="button"
                      onClick={() => handlePublish('Draft')}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      Save as Draft
                    </button>
                    <button 
                      type="button"
                      onClick={() => handlePublish('Published')}
                      disabled={isSubmitting}
                      className={`px-5 py-2 rounded-lg bg-[#005A9E] text-white hover:bg-[#004b85] font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Send size={12} />
                      )}
                      Publish Opening
                    </button>
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Right Column: Live Preview Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 self-start bg-white rounded-md border border-gray-200 shadow-md p-5 space-y-6 animate-in fade-in duration-300 max-h-[85vh] overflow-y-auto hide-scrollbar">
            {/* Live Preview Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005A9E] text-white rounded-lg flex items-center justify-center shadow-sm">
                  <Briefcase size={18} />
                </div>
                <span className="text-[11px] font-bold text-[#005A9E] uppercase tracking-wider">
                  {department || 'Job Preview'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 border border-green-200/50 rounded-full text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Active
              </div>
            </div>

            {!hasPreviewContent ? (
              <div className="py-16 text-center text-gray-400 border border-dashed border-gray-200 rounded-lg">
                <Globe size={32} className="mx-auto mb-2 text-gray-300 animate-pulse" />
                <p className="text-xs font-semibold uppercase tracking-wider">Empty Preview</p>
                <p className="text-[10px] text-gray-400/80 mt-1">Details will appear here as you type.</p>
              </div>
            ) : (
              <>
                {/* Job Title */}
                {jobTitle && (
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 transition-colors capitalize">
                      {jobTitle}
                    </h2>
                  </div>
                )}

                {/* Badges row */}
                {(employmentType || workMode || experience) && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {employmentType && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-200/50 rounded-md text-[10px] font-semibold">
                        {employmentType}
                      </span>
                    )}
                    {workMode && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-200/50 rounded-md text-[10px] font-semibold">
                        {workMode}
                      </span>
                    )}
                    {experience && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-200/50 rounded-md text-[10px] font-semibold">
                        {experience}
                      </span>
                    )}
                  </div>
                )}

                {/* Section: Application Details */}
                {(applicationEmail || jobCode || location || openings) && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Application Details</h4>
                    <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-3 space-y-1.5 text-xs text-gray-600">
                      <p><span className="font-semibold text-gray-800">Method:</span> Internal Application</p>
                      {applicationEmail && <p><span className="font-semibold text-gray-800">Email:</span> {applicationEmail}</p>}
                      {jobCode && <p><span className="font-semibold text-gray-800">Job Code:</span> {jobCode}</p>}
                      {location && <p><span className="font-semibold text-gray-800">Location:</span> {location}</p>}
                      {openings && <p><span className="font-semibold text-gray-800">Openings:</span> {openings}</p>}
                    </div>
                  </div>
                )}

                {/* Section: Qualification */}
                {qualification && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Qualification Required</h4>
                    <p className="text-xs text-gray-700 font-medium">{qualification}</p>
                  </div>
                )}

                {/* Section: Key Skills */}
                {skills.length > 0 && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Key Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-semibold rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Key Responsibilities */}
                {responsibilities.length > 0 && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Responsibilities</h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-gray-600">
                      {responsibilities.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section: Salary Range */}
                {(minSalary || maxSalary) && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Est. Compensation</h4>
                    <p className="text-sm font-bold text-gray-800">
                      {minSalary ? `$${Number(minSalary).toLocaleString()}` : '$0'} - {maxSalary ? `$${Number(maxSalary).toLocaleString()}` : '$0'} / Year
                    </p>
                  </div>
                )}

                {/* Section: Benefits & Perks */}
                {benefits.length > 0 && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Benefits & Perks</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {benefits.map((b) => (
                        <span key={b} className="px-2 py-0.5 bg-green-50 border border-green-100 text-green-700 text-[9px] font-semibold rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Job Description */}
                {description && (
                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Job Description</h4>
                    <div 
                      className="text-xs text-gray-650 prose prose-sm max-w-none break-words leading-relaxed editor-preview" 
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </div>
                )}

                {/* Preview Footer */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1 text-gray-500">
                    <CheckCircle2 size={12} className="text-green-500" />
                    Smart Match Enabled
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 border border-red-200/50 rounded-md">
                    <Calendar size={12} />
                    Deadline: {lastDateToApply ? new Date(lastDateToApply).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default JobPosting;
