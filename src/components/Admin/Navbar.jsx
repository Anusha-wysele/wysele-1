import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Building, ChevronDown, FileText, Loader2, LogOut, Mail, Menu, Search, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import jobService from '../../services/jobService';
import RegisterEmployeeModal from './RegisterEmployeeModal';
import companyService from '../../services/companyService';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const loadCompanies = () => {
      setCompaniesList(companyService.getCompanies());
    };
    loadCompanies();
    companyService.fetchCompanies(); // Fetch fresh data from backend API
    window.addEventListener('companiesUpdated', loadCompanies);
    return () => window.removeEventListener('companiesUpdated', loadCompanies);
  }, []);
  
  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const data = await jobService.globalSearch(searchQuery);
          setSearchResults(data.results || data || []);
          setShowResults(true);
        } catch (error) {
          console.error('Global search failed:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (companiesList.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      const activeCompanyParam = searchParams.get('company') || user?.company_name;
      const currentCompanyKey = (activeCompanyParam || 'wysele').toLowerCase();
      const companyObj = companiesList.find(c => (c.id || '').toLowerCase() === currentCompanyKey);
      
      if (companyObj && !companyObj.is_active) {
        const firstActive = companiesList.find(c => c.is_active);
        if (firstActive) {
          const currentPath = window.location.pathname;
          navigate(`${currentPath}?company=${firstActive.id}`, { replace: true });
        } else {
          const currentPath = window.location.pathname;
          navigate(currentPath, { replace: true });
        }
      }
    }
  }, [companiesList, user, navigate]);

  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name;

  const getSelectedCompanyDisplay = () => {
    const currentCompanyKey = (activeCompany || '').toLowerCase();
    const company = companiesList.find(c => (c.id || '').toLowerCase() === currentCompanyKey);
    if (company && company.is_active) {
      return company.name;
    }
    const userCompanyKey = (user?.company_name || '').toLowerCase();
    const userCompany = companiesList.find(c => (c.id || '').toLowerCase() === userCompanyKey);
    if (userCompany && userCompany.is_active) {
      return userCompany.name;
    }
    // Fallback for default companies to avoid empty selector text
    if (currentCompanyKey === 'orbintix') return 'Orbintix';
    if (currentCompanyKey === 'gracevirtue') return 'Grace Virtue';
    return 'Wysele';
  };

  const navigateWithCompany = (path) => {
    if (activeCompany) {
      navigate(`${path}?company=${activeCompany}`);
    } else {
      navigate(path);
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    const type = result.type?.toLowerCase() || '';
    if (type.includes('job')) navigateWithCompany('/admin/job-postings');
    else if (type.includes('blog')) navigateWithCompany('/admin/blogs');
    else if (type.includes('contact')) navigateWithCompany('/admin/contacts');
    else if (type.includes('consult')) navigateWithCompany('/admin/consultations');
    else if (type.includes('employee')) navigateWithCompany('/admin/employees');
  };

  const handleCompanyChange = (e) => {
    const selectedCompany = e.target.value;
    const currentPath = window.location.pathname;
    navigate(`${currentPath}?company=${selectedCompany}`);
  };

  const handleCompanySelection = (selectedCompany) => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}?company=${selectedCompany}`);
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return (user.first_name[0] + user.last_name[0]).toUpperCase();
    }
    if (user?.name) {
      const parts = user.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return user.name.slice(0, 2).toUpperCase();
    }
    return 'SA';
  };

  const isAuthorizedToRegister = user?.role?.toUpperCase() === 'SUPER_ADMIN' || 
                                user?.role?.toUpperCase() === 'SUPERADMIN';

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-[#005A9E] border-b border-white/5 shadow-sm">
        <div className="flex h-[50px] items-center justify-between pl-4 md:pl-8 pr-0 gap-4">
          
          {/* Responsive Menu Toggle */}
          <button 
            onClick={onMenuToggle}
            className="p-2 text-white hover:text-white/80 transition-colors border-r border-white/5 pr-4 mr-2"
          >
            <Menu size={20} />
          </button>
 
          {/* Search bar removed */}
          <div className="flex-1" />
  
          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 h-full">
            
            {/* Company Selector for Super Admin */}
            {(user?.role?.toUpperCase() === 'SUPER_ADMIN' || user?.role?.toUpperCase() === 'SUPERADMIN') && (
              <div className="relative">
                <button
                  onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                  className="flex items-center gap-2 bg-[#004b87] px-3 py-1.5 border border-white/5 rounded-md text-white shadow-sm font-semibold text-xs hover:bg-[#003f72] transition-all select-none"
                >
                  <Building size={16} className="text-white/90" />
                  <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider hidden md:inline">COMPANY:</span>
                  <span className="capitalize">{getSelectedCompanyDisplay()}</span>
                  <ChevronDown size={12} className="text-white/90" />
                </button>

                 <AnimatePresence>
                  {isCompanyDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-[105]" 
                        onClick={() => setIsCompanyDropdownOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 mt-2 w-44 bg-white border border-white rounded-lg shadow-2xl overflow-hidden z-[110]"
                        style={{ border: '3px solid white' }}
                      >
                        {companiesList.filter(c => c.is_active).length > 0 ? (
                          companiesList.filter(c => c.is_active).map((company) => (
                            <button
                              key={company.id}
                              type="button"
                              onClick={() => {
                                handleCompanySelection(company.id);
                                setIsCompanyDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-all capitalize ${
                                (activeCompany || 'wysele').toLowerCase() === (company.id || '').toLowerCase()
                                  ? 'bg-[#0078D4] text-white'
                                  : 'bg-[#DEECF9] text-gray-700 hover:bg-[#DEECF9]/80'
                              }`}
                            >
                              {company.name}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-xs font-semibold text-gray-400 text-center bg-gray-50 uppercase tracking-wider select-none">
                            No companies found
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Register Employee Button - Only for SuperAdmin/Admin */}
            {isAuthorizedToRegister && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRegisterModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1 bg-white text-[#005A9E] rounded-full font-bold text-[11px] capitalize tracking-normal transition-all hover:bg-slate-100 border border-transparent shadow-sm"
              >
                <UserPlus size={13} className="text-[#005A9E]" />
                <span className="hidden md:inline">Register Employee</span>
              </motion.button>
            )}
  
            {/* Admin Profile */}
            <div className="relative h-full">
              <div 
                className="flex items-center gap-3 px-6 bg-[#004b87]/40 border-l border-white/10 hover:bg-[#004b87]/60 cursor-pointer group h-full transition-all"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-white">
                    {user?.role?.toUpperCase() === 'SUPER_ADMIN' || user?.role?.toUpperCase() === 'SUPERADMIN' ? 'Super Admin' : user?.role || 'Super Admin'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-[#005A9E] flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {getInitials()}
                </div>
                <ChevronDown size={14} className="text-white" />
              </div>
  
              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-0" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 md:w-56 bg-white border border-gray-100 shadow-2xl rounded-none overflow-hidden z-10"
                    >
                      <div className="p-4 border-b border-gray-100 bg-slate-50/50">
                        <p className="text-sm font-semibold text-slate-800">
                          {user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'Admin'}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-normal">
                          <Mail size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">{user?.email || user?.email_id || user?.username || 'admin@wysele.com'}</span>
                        </div>
                      </div>
                      <div className="p-1">
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigateWithCompany('/admin/settings');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors rounded-md"
                        >
                          <User size={16} className="text-slate-500 shrink-0" />
                          Profile
                        </button>
                        {isAuthorizedToRegister && (
                          <button 
                            onClick={() => {
                              setIsRegisterModalOpen(true);
                              setIsProfileOpen(false);
                            }}
                            className="sm:hidden w-full flex items-center gap-3 px-4 py-2.5 text-xs font-normal text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <UserPlus size={16} />
                            Register Employee
                          </button>
                        )}
                        <button 
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold bg-[#e81123] text-white hover:bg-red-700 transition-colors rounded-md"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
  
      <RegisterEmployeeModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
