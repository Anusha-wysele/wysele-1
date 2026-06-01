import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase, Check,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
  MapPin,
  Upload,
  User,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import jobService from '../../services/jobService';
import { jobOpenings } from './CareersOpenings';

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLocation: '',
    region: '',
    totalExp: '',
    relevantExp: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: ''
  });

  // OTP State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await jobService.getJobById(id);
        
        // Handle nested structures like { job: { ... } } or { data: { ... } }
        const apiData = data.job || data.data || data;

        const apiJob = {
          ...apiData,
          id: apiData.id || apiData._id,
          title: apiData.role || apiData.title,
          dept: apiData.region || 'Engineering',
          exp: apiData.experience || 'Any Experience',
          location: apiData.location || 'Remote',
          type: apiData.job_type || apiData.jobType || apiData.type || 'Full Time',
          details: {
            about: apiData.description?.replace(/<[^>]*>/g, '') || 'Join our team...',
            responsibilities: apiData.responsibilities || [],
            skills: apiData.key_skills || apiData.keySkills || apiData.skills || [],
            benefits: apiData.benefits || ['Flexible Hours', 'Health Insurance']
          }
        };
        setJob(apiJob);
      } catch (err) {
        console.error('Failed to fetch job:', err);
        // Fallback to mock data if API fails
        const foundJob = jobOpenings.find(j => j.id === parseInt(id));
        if (foundJob) setJob(foundJob);
        else navigate('/careers');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset error
    setFileError("");

    // Validate size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("File size exceeds 5MB limit.");
      setSelectedFile(null);
      return;
    }

    // Validate format
    const allowedFormats = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedFormats.includes(file.type)) {
      setFileError("Invalid format. Please upload PDF, DOC, or DOCX.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setFileError("Please upload your resume.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Step 1: Send OTP to the user's email
      await jobService.sendOtp(formData.email);
      setIsOtpModalOpen(true);
    } catch (err) {
      console.error('OTP Send Error:', err);
      alert(`Failed to send verification code: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAndSubmit = async () => {
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      setOtpError('Please enter the full 6-digit code.');
      return;
    }

    try {
      setIsVerifying(true);
      setOtpError('');
      
      // Verification now happens during the final applyForJob call
      const formDataObj = new FormData();
      
      // Map frontend fields to exact backend names from the documentation
      formDataObj.append('job_id', parseInt(id));
      formDataObj.append('firstName', formData.firstName);
      formDataObj.append('lastName', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('mobileNumber', formData.phone);
      formDataObj.append('currentLocation', formData.currentLocation);
      formDataObj.append('noticePeriod', formData.noticePeriod);
      formDataObj.append('releventExperience', formData.relevantExp); // Spelling: relevent (with e)
      formDataObj.append('resume', selectedFile);
      
      // Optional fields with correct casing
      formDataObj.append('region', formData.region || '');
      formDataObj.append('currentCtc', formData.currentCTC || '');
      formDataObj.append('expectedCtc', formData.expectedCTC || '');

      await jobService.applyForJob(formDataObj, fullOtp);
      
      setIsOtpModalOpen(false);
      setIsSuccessOpen(true);
      setTimeout(() => {
        setIsSuccessOpen(false);
        navigate('/careers');
      }, 3000);
    } catch (err) {
      console.error('Verification Error:', err);
      setOtpError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otpCode[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#800000]/10 border-t-[#800000] rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Job Details...</p>
      </div>
    </div>
  );

  if (!job) return null;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 font-sans">
      <Breadcrumbs />
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Button */}
        <Link 
          to="/careers" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#800000] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Careers
        </Link>

        {/* 1. Job Header */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#800000] uppercase bg-[#800000]/5 px-3 py-1 rounded-full">{job.dept}</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase border border-gray-100 px-3 py-1 rounded-full">{job.type}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900 leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-8 pt-2">
            <div className="flex items-center gap-2.5 text-gray-500">
              <MapPin className="w-5 h-5 text-[#ffcc00]" />
              <span className="text-sm font-medium">{job.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-500">
              <Briefcase className="w-5 h-5 text-[#ffcc00]" />
              <span className="text-sm font-medium">{job.exp}</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-500">
              <Clock className="w-5 h-5 text-[#ffcc00]" />
              <span className="text-sm font-medium">Posted 2 days ago</span>
            </div>
          </div>
        </div>

        {/* 2. Job Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pb-20 border-b border-gray-100">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h3 className="text-xl font-normal text-gray-900 flex items-center gap-3">
                <div className="w-8 h-[1.5px] bg-[#ffcc00]" />
                About the Role
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                {job.details.about}
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-xl font-normal text-gray-900 flex items-center gap-3">
                <div className="w-8 h-[1.5px] bg-[#ffcc00]" />
                Key Responsibilities
              </h3>
              <ul className="space-y-5">
                {job.details.responsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-4 text-gray-600 font-light text-base">
                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#ffcc00] flex-shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Core Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.details.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Benefits & Perks</h4>
              <div className="space-y-4">
                {job.details.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#800000]/5 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#800000]" />
                    </div>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Application Form Section */}
        <div className="mt-5 space-y-12 bg-gray-50/50 p-8 md:p-12 lg:p-16  border border-gray-100">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900">Apply for <span className="text-[#800000]">this position</span></h2>
            <p className="text-gray-500 text-sm font-light">Complete the form below and our recruitment team will get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-12">
            
            {/* Form Fields - Reusing the high-fidelity design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* 1. Personal Information */}
              <div className="col-span-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Personal Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name <span className="text-red-500">*</span></label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Enter your first name" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name <span className="text-red-500">*</span></label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Enter your last name" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter your email address" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number <span className="text-red-500">*</span></label>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Enter your mobile number" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                </div>
              </div>

              {/* 2. Location Information */}
              <div className="col-span-full space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Location Information</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Location <span className="text-red-500">*</span></label>
                    <input required name="currentLocation" value={formData.currentLocation} onChange={handleInputChange} type="text" placeholder="Enter your current location" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Region <span className="text-red-500">*</span></label>
                    <input required name="region" value={formData.region} onChange={handleInputChange} type="text" placeholder="Enter your region" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                </div>
              </div>

              {/* 3. Experience & Salary */}
              <div className="col-span-full space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Experience & Compensation</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Exp <span className="text-red-500">*</span></label>
                    <input required name="totalExp" value={formData.totalExp} onChange={handleInputChange} type="text" placeholder="Years" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rel. Exp <span className="text-red-500">*</span></label>
                    <input required name="relevantExp" value={formData.relevantExp} onChange={handleInputChange} type="text" placeholder="Years" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current CTC <span className="text-red-500">*</span></label>
                    <input required name="currentCTC" value={formData.currentCTC} onChange={handleInputChange} type="text" placeholder="e.g. 12LPA" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expected CTC <span className="text-red-500">*</span></label>
                    <input required name="expectedCTC" value={formData.expectedCTC} onChange={handleInputChange} type="text" placeholder="e.g. 18LPA" className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm" />
                  </div>
                </div>
              </div>

              {/* 4. Additional Information */}
              <div className="col-span-full space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Additional Information</h4>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notice Period <span className="text-red-500">*</span></label>
                    <select required name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-none text-sm focus:outline-none focus:border-[#800000] transition-colors shadow-sm appearance-none">
                      <option value="">Select notice period</option>
                      <option value="Immediate">Immediate</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Resume / CV <span className="text-red-500">*</span></label>
                    <div className={`relative border-2 border-dashed ${fileError ? 'border-red-300 bg-red-50/30' : 'border-gray-200 bg-white'} rounded-none p-6 text-center hover:border-[#800000] transition-colors group cursor-pointer`}>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <div className="space-y-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto transition-colors shadow-inner ${selectedFile ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400 group-hover:text-[#800000]'}`}>
                          {selectedFile ? <Check className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                        </div>
                        {selectedFile ? (
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-800">{selectedFile.name}</p>
                            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">File attached successfully</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-gray-600">Choose File or Drag & Drop</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                    {fileError && (
                      <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider pt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {fileError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-10 flex flex-col items-center gap-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-12 py-3.5 bg-[#800000] text-white text-sm font-bold rounded-none shadow-xl shadow-maroon-900/20 transition-all uppercase tracking-widest flex items-center justify-center gap-3 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#a00000]'
                }`}
              >
                {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="text-[10px] text-gray-400 text-center">By submitting, you agree to our recruitment terms and data privacy policy.</p>
            </div>
          </form>
        </div>

      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccessOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[3000] bg-white rounded-2xl shadow-2xl border border-green-100 p-6 flex items-center gap-4 pr-12"
          >
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Success</h4>
              <p className="text-xs text-gray-500 font-medium">Application submitted successfully!</p>
            </div>
            <button onClick={() => setIsSuccessOpen(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Verification Modal */}
      <AnimatePresence>
        {isOtpModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
              onClick={() => setIsOtpModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-none shadow-[0_0_50px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              <div className="bg-[#800000] p-10 text-white text-center space-y-3">
                <div className="w-16 h-16 bg-white/10 rounded-none flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-normal uppercase tracking-[4px]">Verification</h3>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-[2px] leading-relaxed">
                  A 6-digit code has been sent to <br />
                  <span className="text-white">{formData.email}</span>
                </p>
              </div>

              <div className="p-10 space-y-8">
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-10 h-12 border border-gray-100 bg-gray-50 text-center text-lg font-black text-gray-900 focus:border-[#800000] focus:bg-white outline-none transition-all rounded-none"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-center text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 py-3 border border-red-100">
                    {otpError}
                  </p>
                )}

                <div className="space-y-4">
                  <button
                    onClick={handleVerifyAndSubmit}
                    disabled={isVerifying}
                    className="w-full py-4 bg-[#800000] text-white rounded-none text-[10px] font-black uppercase tracking-[3px] hover:bg-[#600000] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isVerifying ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Verify & Submit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsOtpModalOpen(false)}
                    className="w-full text-[9px] font-black text-gray-400 uppercase tracking-[2px] hover:text-[#800000] transition-colors"
                  >
                    Cancel Application
                  </button>
                </div>

                <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  Didn't receive the code? <button className="text-[#800000] hover:underline">Resend OTP</button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default JobApplicationPage;
