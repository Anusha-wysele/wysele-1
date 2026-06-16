import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, MapPin, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import jobService from '../../services/jobService';

export const jobOpenings = [
  {
    id: 1,
    title: "Cloud Infrastructure Engineer",
    dept: "Engineering",
    exp: "5+ Years",
    location: "Remote / Hybrid",
    type: "Full-Time",
    desc: "Architect and manage large-scale multi-cloud environments (AWS/Azure) for enterprise clients.",
    keySkills: ["AWS/Azure", "Terraform", "Kubernetes"],
    details: {
      about: "We are seeking a seasoned Cloud Infrastructure Engineer to lead the design and implementation of high-performance cloud architectures. You will be responsible for ensuring scalability, security, and cost-efficiency for global enterprise clients.",
      responsibilities: [
        "Design and deploy scalable AWS/Azure architectures.",
        "Implement Infrastructure as Code (IaC) using Terraform or CloudFormation.",
        "Optimize cloud resource consumption and performance.",
        "Collaborate with security teams to ensure robust compliance standards."
      ],
      skills: ["AWS/Azure Certified", "Terraform", "Kubernetes", "Python/Go", "CI/CD", "Docker"],
      benefits: ["Remote work stipends", "Premium health insurance", "Stock options", "Annual learning budget"]
    }
  },
  {
    id: 2,
    title: "Network Security Analyst",
    dept: "Security",
    exp: "3+ Years",
    location: "On-site (NY)",
    type: "Full-Time",
    desc: "Monitor and protect enterprise network architectures from sophisticated security threats.",
    keySkills: ["SIEM", "Firewall Mgmt", "Network Security"],
    details: {
      about: "Join our core security team to monitor, detect, and respond to network threats in real-time. You'll work at the forefront of cybersecurity for critical IT infrastructure.",
      responsibilities: [
        "Perform regular network vulnerability assessments.",
        "Configure and maintain enterprise-grade firewalls and IDS/IPS.",
        "Monitor security logs for suspicious activity.",
        "Develop incident response protocols and documentation."
      ],
      skills: ["CISSP/CEH", "Network Protocols", "SIEM Tools", "Firewall Mgmt", "Intrusion Detection"],
      benefits: ["Gym membership", "Daily gourmet lunches", "Generous PTO", "Tech gear of choice"]
    }
  },
  {
    id: 3,
    title: "DevOps Engineer",
    dept: "Engineering",
    exp: "4+ Years",
    location: "Remote",
    type: "Full-Time",
    desc: "Bridge the gap between development and operations with automated CI/CD pipelines.",
    keySkills: ["Docker", "Jenkins", "Ansible"],
    details: {
      about: "We're looking for an automation wizard to streamline our deployment processes. You'll build and maintain the pipelines that power our rapid innovation cycles.",
      responsibilities: [
        "Build and maintain CI/CD pipelines using Jenkins/GitLab.",
        "Automate infrastructure provisioning and configuration.",
        "Monitor system performance and reliability.",
        "Lead the transition to microservices architecture."
      ],
      skills: ["Docker", "Jenkins", "Ansible", "Bash/Python", "Linux Administration", "Git"],
      benefits: ["Unlimited PTO", "Retreats to tropical locations", "Home office setup", "Performance bonuses"]
    }
  },
  {
    id: 4,
    title: "Solutions Architect",
    dept: "Sales Engineering",
    exp: "7+ Years",
    location: "Hybrid",
    type: "Full-Time",
    desc: "Design end-to-end technology solutions that solve complex business infrastructure needs.",
    keySkills: ["Architecture", "Client Strategy", "Hybrid Cloud"],
    details: {
      about: "Act as the bridge between technical capability and business strategy. You'll design holistic solutions that empower our clients to scale effectively.",
      responsibilities: [
        "Conduct technical discovery workshops with clients.",
        "Create comprehensive solution design documents.",
        "Oversee the initial implementation phase of complex projects.",
        "Advise executive stakeholders on technology roadmaps."
      ],
      skills: ["Architecture Frameworks", "Client Facing", "Project Mgmt", "Hybrid Cloud", "Presales"],
      benefits: ["High commission potential", "Car allowance", "Global travel opportunities", "Flexible hours"]
    }
  },
  {
    id: 5,
    title: "System Administrator",
    dept: "Operations",
    exp: "4+ Years",
    location: "Chicago, IL",
    type: "Full-Time",
    desc: "Maintain and optimize server performance, ensuring maximum reliability for enterprise systems.",
    keySkills: ["Linux/Windows", "Active Directory", "Scripting"],
    details: {
      about: "We need a proactive System Administrator to manage our internal and client-facing server environments. You will ensure 99.9% uptime and handle troubleshooting.",
      responsibilities: [
        "Manage Windows/Linux server environments.",
        "Perform regular backups and disaster recovery tests.",
        "Monitor system health and resource utilization.",
        "Automate routine maintenance tasks."
      ],
      skills: ["Windows/Linux", "Active Directory", "Scripting", "Backups", "Virtualization", "Monitoring Tools"],
      benefits: ["Flexible scheduling", "Competitive salary", "Learning budget", "Health & Wellness"]
    }
  },
  {
    id: 6,
    title: "IT Support Specialist",
    dept: "Support",
    exp: "2+ Years",
    location: "Remote / Hybrid",
    type: "Full-Time",
    desc: "Provide high-level technical assistance and troubleshooting for enterprise-grade hardware and software.",
    keySkills: ["Troubleshooting", "OS Mgmt", "Customer Service"],
    details: {
      about: "Join our front-line support team to resolve technical issues for our global workforce. You'll play a key role in maintaining productivity across the organization.",
      responsibilities: [
        "Troubleshoot hardware, software, and network issues.",
        "Manage internal ticketing system and prioritize requests.",
        "Configure and deploy workstations and mobile devices.",
        "Document common issues and create self-help guides."
      ],
      skills: ["Technical Troubleshooting", "Customer Service", "OS Mgmt", "Network Basics", "Hardware Repair", "Ticketing Systems"],
      benefits: ["Career mentoring", "Overtime opportunities", "Paid certifications", "Casual dress code"]
    }
  }
];

const mapApiJob = (job) => {
  const rawSkills = job.required_skills || job.key_skills || job.keySkills || job.skills || [];
  const keySkills = Array.isArray(rawSkills)
    ? rawSkills.map(s => {
        if (!s) return '';
        if (typeof s === 'object') return s.name || s.label || '';
        return String(s);
      }).filter(Boolean)
    : [];

  return {
    id: job.id || job._id,
    title: job.job_title || job.role || job.title || 'Untitled Role',
    dept: job.region || 'Engineering',
    exp: job.experience || job.total_exp || 'Any Experience',
    location: job.location || 'Remote',
    type: job.job_type || job.jobType || job.type || 'Full Time',
    desc: job.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || 'No description available',
    keySkills,
    company_name: job.company_name || job.company || 'wysele',
    status: job.status || 'Published',
    details: job
  };
};

const CareersOpenings = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchQuery.trim()) {
          data = await jobService.searchJobs(searchQuery);
        } else {
          data = await jobService.getAllJobs({
            company: 'wysele',
            limit: 100
          });
        }

        console.log('🚀 Careers API Response:', data);

        let rawJobs = [];
        if (Array.isArray(data)) {
          rawJobs = data;
        } else {
          rawJobs = data.data || data.results || data.jobs || [];
        }

        // Map and filter active Wysele jobs
        const wyseleJobs = rawJobs.map(mapApiJob).filter(j => 
          (j.company_name.toLowerCase() === 'wysele' || j.company_name === '') && 
          (j.status.toLowerCase() === 'published' || j.status.toLowerCase() === 'active')
        );

        setJobs(wyseleJobs);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        if (!searchQuery) {
          setJobs(jobOpenings);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchJobs();
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.dept.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.keySkills.some(skill => skill.toLowerCase().includes(query))
    );
  });

  const handleApplyClick = (jobId) => {
    navigate(`/careers/apply/${jobId}`);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE) || 1;
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <section className="py-10 bg-gray-50/30 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#ffcc00]" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">Opportunities</span>
            </div>
            <h2 className="text-3xl md:text-2xl lg:text-3xl font-normal text-gray-900">
              Current <span className="text-[#800000]">Openings</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-base font-light max-w-md">
            Find your place in a team that values technical mastery and creative thinking. We are always looking for exceptional talent.
          </p>
        </motion.div>

        {/* Search Bar Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#800000]" />
            <h4 className="text-sm font-semibold text-gray-800">Open Positions</h4>
          </div>
          
          <div className="bg-white p-2 rounded-xl  flex flex-col md:flex-row items-center gap-4 shadow-sm border border-gray-100">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jobs, skills, or locations..." 
                className="w-full pl-14 pr-6 py-4 bg-transparent text-sm focus:outline-none text-gray-800 placeholder:text-gray-300 font-light"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto px-2 pb-2 md:pb-0">
              <button className="flex-grow md:flex-none px-8 py-3 bg-[#800000] text-white text-xs font-bold rounded-xl hover:bg-[#C9184A] transition-all flex items-center justify-center gap-2">
                <Search className="w-3.5 h-3.5" />
                Search Jobs
              </button>
              <button 
                onClick={() => setSearchQuery("")}
                className="flex-grow md:flex-none px-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] relative">
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm rounded-xl">
               <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-maroon-100 border-t-maroon-800 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Openings...</p>
               </div>
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <motion.div 
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group border border-gray-100 rounded-xl overflow-hidden bg-white transition-all duration-500 flex flex-col h-full relative"
                >
                  <div className="p-8 flex flex-col h-full space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-widest text-[#800000] uppercase">{job.dept}</span>
                        <span className="text-[10px] font-medium text-gray-400">{job.type}</span>
                      </div>
                      <h3 className="text-lg font-normal text-gray-900 group-hover:text-[#800000] transition-colors leading-tight min-h-[50px]">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <MapPin className="w-3 h-3 text-[#ffcc00]" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <Briefcase className="w-3 h-3 text-[#ffcc00]" />
                          {job.exp}
                        </div>
                      </div>
                    </div>

                    {/* Key Skills Section */}
                    <div className="space-y-3">
                      <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Key Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.keySkills.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-50 text-[9px] text-gray-600 font-medium rounded-md border border-gray-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-grow pt-2">
                      {job.desc}
                    </p>

                    {/* Center Apply Button */}
                    <div className="pt-3 flex justify-center">
                      <button 
                        onClick={() => handleApplyClick(job.id)}
                        className="w-full py-4 text-[white] text-xs font-semibold rounded-2xl bg-[#800000] transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-maroon-900/10"
                      >
                        Apply Job
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-normal text-gray-900">No positions found</h3>
                  <p className="text-sm text-gray-500">Try adjusting your search query or filters.</p>
                </div>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold text-[#800000] border-b border-[#800000] pb-1"
                >
                  Clear all search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Standalone Pagination Card */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center pt-10">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
                }}
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
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  currentPage === totalPages 
                    ? 'border border-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#800000] text-white hover:bg-[#a31414] shadow-md shadow-maroon-900/10'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareersOpenings;
