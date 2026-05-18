import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, Command, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import RegisterEmployeeModal from './RegisterEmployeeModal';
import jobService from '../../services/jobService';
import { useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Mail, Briefcase, Loader2, ArrowRight } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    const type = result.type?.toLowerCase() || '';
    if (type.includes('job')) navigate('/admin/job-postings');
    else if (type.includes('blog')) navigate('/admin/blogs');
    else if (type.includes('contact')) navigate('/admin/contacts');
    else if (type.includes('consult')) navigate('/admin/consultations');
    else if (type.includes('employee')) navigate('/admin/employees');
  };

  const isAuthorizedToRegister = user?.role?.toUpperCase() === 'SUPER_ADMIN' || 
                                user?.role?.toUpperCase() === 'SUPERADMIN';

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-8 gap-4">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Global Search */}
          <div className="relative flex-1 max-w-lg group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-[#800000] transition-colors">
              {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            </div>
            <input
              id="global-search-input"
              type="text"
              className="block w-full pl-11 pr-10 md:pr-24 py-2.5 bg-gray-50/50 border border-gray-100 rounded-none text-gray-900 placeholder-gray-400 focus:bg-white transition-all text-sm font-medium outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowResults(true)}
            />
           
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setShowResults(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="absolute left-0 right-0 mt-3 bg-white border border-gray-100 shadow-2xl rounded-none overflow-hidden z-[110]"
                  >
                    <div className="p-2 border-b border-gray-50 bg-gray-50/30">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Search Results</p>
                    </div>
                    <div className="max-h-[450px] overflow-y-auto hide-scrollbar">
                      {searchResults.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                          {searchResults.map((result, idx) => {
                            const Icon = (result.type?.toLowerCase() || '').includes('job') ? Briefcase : FileText;
                            return (
                              <button
                                key={idx}
                                onClick={() => handleResultClick(result)}
                                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group"
                              >
                                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 group-hover:bg-[#800000] group-hover:text-white transition-all">
                                  <Icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#800000]">
                                    {result.title || result.name || 'Untitled'}
                                  </p>
                                  <span className="text-[9px] font-black text-[#800000] uppercase tracking-widest">
                                    {result.type}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-gray-400 text-xs">No results found</div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
  
          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            
            {/* Register Employee Button - Only for SuperAdmin/Admin */}
            {isAuthorizedToRegister && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRegisterModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#ffcc00] text-black rounded-none font-semibold text-[12px] capitalize tracking-normal transition-all hover:bg-black hover:text-white"
              >
                <UserPlus size={14} />
                <span className="hidden md:inline">Register Employee</span>
              </motion.button>
            )}
  
            {/* Admin Profile */}
            <div className="relative">
              <div 
                className="flex items-center gap-2 md:gap-3 pl-2 md:pl-6 border-l border-gray-100 cursor-pointer group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.first_name || 'Admin'}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase">{user?.role}</p>
                </div>
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-maroon-800 to-crimson-700 flex items-center justify-center text-white font-semibold text-sm uppercase shadow-sm">
                  {user?.first_name?.[0] || 'A'}
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
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
                      className="absolute right-0 mt-3 w-48 md:w-56 bg-white border border-gray-100 shadow-2xl rounded-none overflow-hidden z-10"
                    >
                      <div className="p-4 border-b border-gray-50 bg-gray-50/30 lg:hidden">
                        <p className="text-sm font-bold text-gray-900">{user?.first_name} {user?.last_name}</p>
                        <p className="text-[10px] text-[#800000] font-black uppercase tracking-widest leading-none">{user?.role}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-1">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        {isAuthorizedToRegister && (
                          <button 
                            onClick={() => {
                              setIsRegisterModalOpen(true);
                              setIsProfileOpen(false);
                            }}
                            className="sm:hidden w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors uppercase tracking-widest"
                          >
                            <UserPlus size={16} />
                            Register Employee
                          </button>
                        )}
                        <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/20">
                          <p className="text-[10px] font-bold text-[#800000] truncate">{user?.email}</p>
                        </div>
                        <button 
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-rose-600 hover:bg-rose-50 transition-colors uppercase tracking-widest"
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
