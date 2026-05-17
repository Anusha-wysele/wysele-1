import React, { useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import GlassCard from '../../components/Admin/GlassCard';
import { 
  ChevronRight, 
  MapPin, 
  Briefcase, 
  Globe, 
  DollarSign, 
  Calendar,
  X,
  Plus,
  ArrowLeft,
  Save,
  Send,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import jobService from '../../services/jobService';
import { useToast } from '../../components/Admin/ToastContext';

const JobPosting = () => {
  const { showToast } = useToast();
  const [skills, setSkills] = useState(['React', 'Node.js', 'AWS', 'Docker']);
  const [newSkill, setNewSkill] = useState('');
  const [responsibilities, setResponsibilities] = useState(['Develop clean code', 'Collaborate with teams']);
  const [newResponsibility, setNewResponsibility] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCode, setJobCode] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [experience, setExperience] = useState('Entry Level');
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('North America');
  const [lastDateToApply, setLastDateToApply] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [jobPostedDate, setJobPostedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [activeStyles, setActiveStyles] = useState([]);

  const handlePublish = async () => {
    if (!jobTitle.trim() || !jobCode.trim()) {
      showToast('Please fill in the Job Title and Job Code before publishing.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const editorContent = document.getElementById('rich-editor').innerHTML;
      
      const payload = {
        role: jobTitle,
        jobCode: jobCode,
        description: editorContent,
        keySkills: skills,
        responsibilities: responsibilities,
        jobType: jobType,
        experience: experience,
        location: location,
        region: region,
        jobPostedDate: jobPostedDate,
        lastDateToApply: lastDateToApply,
        is_featured: isFeatured,
        status: 'Published'
      };

      console.log('🚀 Sending Job Payload:', payload);
      await jobService.createJob(payload);
      setShowSuccessModal(true);
      setError(null);
      showToast('Job opening published successfully!', 'success');
    } catch (err) {
      setError('Failed to publish the job. Please check your connection and try again.');
      showToast('Failed to publish the job.', 'error');
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

  const addSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addResponsibility = (e) => {
    if (e.key === 'Enter' && newResponsibility.trim()) {
      if (!responsibilities.includes(newResponsibility.trim())) {
        setResponsibilities([...responsibilities, newResponsibility.trim()]);
      }
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (resp) => {
    setResponsibilities(responsibilities.filter(r => r !== resp));
  };

  return (
    <AdminLayout>
      <div className="space-y-3 pb-10 max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Create New Job Opening</h1>
          <p className="text-gray-500 text-sm font-medium">Publish and manage enterprise hiring opportunities with a streamlined recruitment workflow.</p>
        </div>

        {/* Form Sections */}
        <div className="space-y-4">
          
          {/* Section 1: Basic Information */}
          <div className="rounded-none overflow-hidden border border-gray-200 shadow-sm bg-white">
            <div className="bg-[#800000]/90 px-6 py-2">
              <div className="flex items-center gap-3">
                <Briefcase className="text-white/70" size={18} />
                <h2 className="text-sm font-normal text-white uppercase tracking-wider">General Information</h2>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Role / Title</label>
                  <input 
                    type="text" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Solutions Architect" 
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Job Code</label>
                  <input 
                    type="text" 
                    value={jobCode}
                    onChange={(e) => setJobCode(e.target.value)}
                    placeholder="e.g. INFRA-2024-05" 
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Job Type</label>
                  <select 
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Experience Level</label>
                  <select 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option value="Entry Level">Entry Level(fresher)</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Lead / Manager">Lead / Manager</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div className="rounded-none overflow-hidden border border-gray-200 shadow-sm bg-white">
            <div className="bg-[#800000] px-6 py-2">
              <div className="flex items-center gap-3">
                <MapPin className="text-white/70" size={18} />
                <h2 className="text-sm font-normal text-white uppercase tracking-wider">Location & Region</h2>
              </div>
            </div>
            <div className="p-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Work Location</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New York, NY or Remote" 
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Region</label>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm appearance-none cursor-pointer"
                  >
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                    <option>Remote (Global)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Job Details */}
          <div className="rounded-none overflow-hidden border border-gray-200 shadow-sm bg-white">
            <div className="bg-[#800000] px-6 py-2">
              <div className="flex items-center gap-3">
                <Globe className="text-white/70" size={18} />
                <h2 className="text-sm font-normal text-white uppercase tracking-wider">Detailed Description & Skills</h2>
              </div>
            </div>
            <div className="p-5 space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-700">Job Description</label>
                <div className="rounded-none border border-gray-200 bg-white overflow-hidden shadow-sm">
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
                        onClick={tool.action}
                        className={`px-4 py-2 rounded-none text-xs font-medium transition-all uppercase tracking-widest ${
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
                    onInput={checkActiveStyles}
                    onKeyDown={handleKeyDown}
                    onKeyUp={checkActiveStyles}
                    onMouseUp={checkActiveStyles}
                    className="w-full bg-transparent p-5 text-gray-700 outline-none min-h-[400px] admin-scrollbar text-base font-normal prose prose-slate max-w-none editor-content hide-scrollbar"
                    placeholder="Describe the role, responsibilities, and impact..."
                  ></div>
                </div>
              </div>

              {/* Key Responsibilities Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Key Responsibilities</label>
                <div className="flex flex-wrap gap-2 mb-1">
                  <AnimatePresence mode="popLayout">
                    {responsibilities.map((resp) => (
                      <motion.div
                        key={resp}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#800000] text-[10px] font-bold uppercase tracking-wider"
                      >
                        {resp}
                        <button onClick={() => removeResponsibility(resp)} className="hover:text-red-500 transition-colors">
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    onKeyDown={addResponsibility}
                    placeholder="Add a responsibility and press Enter..." 
                    className="w-full pl-11 pr-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-[#800000] transition-all outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-gray-50">
                <label className="text-xs font-bold text-gray-700">Key Skills & Technologies</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  <AnimatePresence mode="popLayout">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={addSkill}
                    placeholder="Add a skill and press Enter..." 
                    className="w-full pl-11 pr-4 py-3 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Application Dates */}
          <div className="rounded-none overflow-hidden border border-gray-200 shadow-sm bg-white">
            <div className="bg-[#800000] px-6 py-2">
              <div className="flex items-center gap-3">
                <Calendar className="text-white/70" size={18} />
                <h2 className="text-sm font-normal text-white uppercase tracking-wider">Important Dates</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Post Date</label>
                  <input 
                    type="date" 
                    value={jobPostedDate}
                    onChange={(e) => setJobPostedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Last Date to Apply</label>
                  <input 
                    type="date" 
                    value={lastDateToApply}
                    onChange={(e) => setLastDateToApply(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-none border border-gray-200 bg-white text-gray-600 focus:border-crimson-500 transition-all outline-none text-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Final Action Panel */}
          <div className="flex items-center justify-between p-5 rounded-none bg-white border border-gray-200 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to publish?</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">Your job posting will be reviewed and visible to thousands of potential candidates.</p>
              {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePublish}
                disabled={isSubmitting}
                className={`px-4 py-3 rounded-none bg-[#ffcc00]/90 text-black font-medium text-sm transition-all shadow-lg  flex items-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-crimsom-200'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Send size={18} />
                )}
                {isSubmitting ? 'Publishing...' : 'Publish Opening'}
              </button>
            </div>
          </div>

        </div>

        {/* Success Modal Overlay */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccessModal(false)}
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              >
                <div className="p-5 text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-crimson-50 text-crimson-600 mb-2">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Date to Apply</p>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Job is Published!</h2>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                      Your job opening has been successfully posted to the enterprise career portal.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col gap-3">
                    <Link 
                      to="/admin"
                      className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-black transition-all shadow-lg text-center"
                    >
                      Go to Dashboard
                    </Link>
                    <button 
                      onClick={() => setShowSuccessModal(false)}
                      className="w-full py-3 rounded-xl border border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-crimson-600"></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </AdminLayout>
  );
};

export default JobPosting;
