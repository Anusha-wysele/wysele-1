import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  UserSquare2,
  X,
  Building,
  Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import companyService from '../../services/companyService';


const menuItems = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/admin',
    roles: ['SUPER_ADMIN', 'HR', 'ADMIN']
  },
  { 
    id: 'jobs', 
    label: 'Jobs', 
    icon: Briefcase, 
    path: '/admin/job-postings',
    roles: ['SUPER_ADMIN', 'HR', 'ADMIN'],
    subItems: [
      { label: 'Create Job', path: '/admin/job-posting/create' },
      { label: 'Manage All Jobs', path: '/admin/job-postings' },
      { label: 'Applicants', path: '/admin/applicants' }
    ]
  },
  { 
    id: 'employees', 
    label: 'Employees', 
    icon: UserSquare2, 
    path: '/admin/employees',
    roles: ['SUPER_ADMIN']
  },
  { 
    id: 'blogs', 
    label: 'Blogs', 
    icon: FileText, 
    path: '/admin/blogs',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  { 
    id: 'contacts', 
    label: 'Contacts', 
    icon: Mail, 
    path: '/admin/contacts',
    roles: ['SUPER_ADMIN', 'HR', 'ADMIN']
  },
  { 
    id: 'consultations', 
    label: 'Consultations', 
    icon: MessageCircle, 
    path: '/admin/consultations',
    roles: ['SUPER_ADMIN', 'HR', 'ADMIN']
  },
  { 
    id: 'company-onboard', 
    label: 'Organizations', 
    icon: Building, 
    path: '/admin/company-onboard',
    roles: ['SUPER_ADMIN']
  },
];

const SidebarItem = ({ item, isCollapsed, isActive, company }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getPathWithCompany = (path) => {
    return company ? `${path}?company=${company}` : path;
  };

  if (item.subItems && !isCollapsed) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full pr-6 py-2.5 transition-all duration-200 group ${
            isActive 
              ? 'bg-[#EFF6FC] text-[#0078D4] border-l-4 border-[#0078D4] pl-[16px] font-semibold' 
              : 'text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-100/80 pl-5'
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon size={18} className={`${isActive ? 'text-[#0078D4]' : 'text-gray-500 group-hover:text-gray-700'} shrink-0`} />
            <span className="font-medium text-sm tracking-normal capitalize whitespace-nowrap">{item.label}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className={`${isActive ? 'text-[#0078D4]' : 'text-gray-450 group-hover:text-gray-700'}`}
          >
            <ChevronRight size={14} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-10 pr-2 space-y-1 mt-1"
            >
              {item.subItems.map((sub) => {
                const isSubActive = location.pathname === sub.path;
                return (
                  <Link 
                    key={sub.path} 
                    to={getPathWithCompany(sub.path)}
                    className={`block py-2 text-xs font-normal capitalize transition-colors ${
                      isSubActive ? 'text-[#0078D4] font-medium bg-[#EFF6FC] rounded px-2 -mx-2' : 'text-gray-500 hover:text-gray-950'
                    }`}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link to={getPathWithCompany(item.path)}>
      <motion.div
        whileHover={isCollapsed ? {} : { x: 4 }}
        className={`flex items-center gap-3 transition-all duration-205 relative group ${
          isCollapsed ? 'px-2 py-2 justify-center' : 'pr-6 py-2.5'
        } ${
          isActive 
            ? 'bg-[#EFF6FC] text-[#0078D4] border-l-4 border-[#0078D4] pl-[16px]' 
            : 'text-gray-700 font-medium hover:text-gray-900 hover:bg-gray-100/80 pl-5'
        }`}
      >
        <item.icon size={18} className={`${isActive ? 'text-[#0078D4]' : 'text-gray-500 group-hover:text-gray-700'} shrink-0`} />
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className={`${isActive ? 'font-semibold' : 'font-medium'} text-[13px] tracking-normal capitalize whitespace-nowrap truncate`}>{item.label}</span>
            {item.status && (
              <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-[8px] font-black text-gray-500 uppercase tracking-tighter rounded-sm border border-gray-200 flex-shrink-0">
                {item.status}
              </span>
            )}
          </div>
        )}
        
        {isCollapsed && (
          <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl">
            {item.label}
          </div>
        )}
      </motion.div>
    </Link>
  );
};

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isCollapsed }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const loadCompanies = () => {
      setCompaniesList(companyService.getCompanies());
    };
    loadCompanies();
    companyService.fetchCompanies(); // Fetch fresh data from backend API
    window.addEventListener('companiesUpdated', loadCompanies);
    return () => window.removeEventListener('companiesUpdated', loadCompanies);
  }, []);

  const { user } = useAuth();
  const userRoleRaw = user?.role?.toUpperCase() || '';
  const userRole = (userRoleRaw === 'SUPERADMIN' || userRoleRaw === 'SUPER_ADMIN') ? 'SUPER_ADMIN' : userRoleRaw;

  const searchParams = new URLSearchParams(location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';

  const activeCompanyObj = companiesList.find(c => (c.id || '').toLowerCase() === activeCompany?.toLowerCase());
  const companyDisplayName = (activeCompanyObj && activeCompanyObj.name) ? activeCompanyObj.name : (activeCompany?.toLowerCase() === 'orbintix' ? 'Orbintix' : 'Wysele');
  const companyLetter = (companyDisplayName || 'W').charAt(0).toUpperCase();

  const filteredMenuItems = menuItems
    .filter(item => !item.roles || item.roles.includes(userRole))
    .filter(item => {
      if (item.id === 'consultations' && activeCompany?.toLowerCase() !== 'wysele') {
        return false;
      }
      return true;
    })
    .map(item => ({
      ...item,
      status: item.getStatus ? item.getStatus(userRole) : null
    }));

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 60 : 180,
          x: isMobile ? (isMobileMenuOpen ? 0 : -220) : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 z-[999] flex flex-col shrink-0 overflow-visible
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >

        {/* Sidebar Header */}
        <div className="h-[51px] shrink-0 bg-[#005A9E] border-b border-white/10 flex items-center justify-center relative w-full px-4">
          <Link to="/admin" className="flex items-center justify-center w-full pr-8 lg:pr-0" onClick={() => setIsMobileMenuOpen(false)}>
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.div
                  key="company-collapsed-text"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-black text-lg select-none"
                >
                  {companyLetter}
                </motion.div>
              ) : (
                <motion.div
                  key="company-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="select-none text-center"
                >
                  <p className="text-sm font-bold text-white tracking-wider uppercase leading-none">
                    {companyDisplayName}
                  </p>
                  <p className="text-[8px] font-medium text-white/65 tracking-widest uppercase mt-1 leading-none">
                    Technologies
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 lg:hidden p-2 text-white hover:text-white/80 z-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Navigation Menu */}
          <nav className={`flex-1 space-y-1 py-4 overflow-y-auto hide-scrollbar transition-all duration-300 ${isCollapsed ? 'px-1' : 'px-0'}`}>
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.subItems && item.subItems.some(sub => location.pathname === sub.path));
              return (
                <div key={item.id} onClick={() => window.innerWidth < 1024 && setIsMobileMenuOpen(false)}>
                  <SidebarItem 
                    item={item} 
                    isCollapsed={isCollapsed} 
                    isActive={isActive} 
                    company={activeCompany}
                  />
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className={`border-t border-gray-200 transition-all duration-300 ${isCollapsed ? 'p-1.5' : 'p-0'} space-y-1`}>
            {userRole && ['SUPER_ADMIN', 'HR', 'ADMIN'].includes(userRole) && (
              <div onClick={() => window.innerWidth < 1024 && setIsMobileMenuOpen(false)}>
                <SidebarItem 
                  item={{
                    id: 'settings', 
                    label: 'Settings', 
                    icon: Settings, 
                    path: '/admin/settings'
                  }} 
                  isCollapsed={isCollapsed} 
                  isActive={location.pathname === '/admin/settings'} 
                  company={activeCompany}
                />
              </div>
            )}
            <motion.button
              whileHover={isCollapsed ? {} : { x: 4 }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.href = '/masterlogin';
              }}
              className={`flex items-center gap-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group ${isCollapsed ? 'px-2 py-2 justify-center' : 'pr-6 py-2.5 w-full pl-5'}`}
            >
              <LogOut size={18} className="text-red-600 shrink-0" />
              {(!isCollapsed || isMobileMenuOpen) && <span className="font-bold text-[13px] uppercase tracking-tighter">Logout</span>}
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
