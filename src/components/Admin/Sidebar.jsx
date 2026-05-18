import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  UserSquare2, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  MessageCircle,
  FileText,
  Mail,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { WYSELE_LOGOS } from '../common/data';
import logoDark from '../../assets/wysele_dark-removebg-preview.png';


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
    roles: ['SUPER_ADMIN', 'HR']
  },
  { 
    id: 'consultations', 
    label: 'Consultations', 
    icon: MessageCircle, 
    path: '/admin/consultations',
    roles: ['SUPER_ADMIN', 'HR']
  },
];

const SidebarItem = ({ item, isCollapsed, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (item.subItems && !isCollapsed) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all duration-300 group ${
            isActive 
              ? 'bg-crimson-50/50 text-crimson-600' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <item.icon size={18} className={isActive ? 'text-crimson-600' : 'group-hover:text-crimson-500 transition-colors'} />
            <span className="font-semibold text-sm tracking-normal capitalize whitespace-nowrap">{item.label}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
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
              className="overflow-hidden pl-11 pr-2 space-y-1 mt-1"
            >
              {item.subItems.map((sub) => {
                const isSubActive = location.pathname === sub.path;
                return (
                  <Link 
                    key={sub.path} 
                    to={sub.path}
                    className={`block py-2 text-xs font-semibold capitalize transition-colors ${
                      isSubActive ? 'text-crimson-600' : 'text-gray-400 hover:text-gray-900'
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
    <Link to={item.path}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${
          isActive 
            ? 'bg-crimson-50/50 text-crimson-600' 
            : 'text-black hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute left-0 w-1 h-5 bg-crimson-600 rounded-r-full"
          />
        )}
        <item.icon size={18} className={isActive ? 'text-crimson-600' : 'group-hover:text-crimson-500 transition-colors'} />
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="font-semibold text-sm tracking-normal capitalize whitespace-nowrap truncate">{item.label}</span>
            {item.status && (
              <span className="ml-2 px-1.5 py-0.5 bg-amber-50 text-[8px] font-black text-amber-600 uppercase tracking-tighter rounded-sm border border-amber-100 flex-shrink-0">
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

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const userRole = user?.role?.toUpperCase() || '';

  const filteredMenuItems = menuItems
    .filter(item => !item.roles || item.roles.includes(userRole))
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
          width: isCollapsed ? 80 : 220,
          x: isMobileMenuOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -220 : 0)
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 h-screen bg-white border-r border-gray-100 z-[999] flex flex-col shrink-0 overflow-visible
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Collapse Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-gray-100 rounded-full hidden lg:flex items-center justify-center text-gray-800 hover:text-crimson-600 shadow-sm hover:shadow-md transition-all z-[60]"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Sidebar Header */}
        <div className=" pl-2 flex items-start justify-start">
          <Link to="/admin" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <AnimatePresence mode="wait">
              {isCollapsed ? (
                <motion.img
                  key="favicon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  src={WYSELE_LOGOS.favicon}
                  alt="Wysele"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              ) : (
                <motion.img
                  key="logo-dark"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  src={logoDark}
                  alt="Wysele"
                  className="h-[100px] sm:h-12 lg:h-[100px] w-[200px] object-contain "
                />
              )}
            </AnimatePresence>
          </Link>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1.5 py-4 overflow-y-auto hide-scrollbar">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.subItems && item.subItems.some(sub => location.pathname === sub.path));
            return (
              <div key={item.id} onClick={() => window.innerWidth < 1024 && setIsMobileMenuOpen(false)}>
                <SidebarItem 
                  item={item} 
                  isCollapsed={isCollapsed} 
                  isActive={isActive} 
                />
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-50">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.location.href = '/admin/login';
            }}
            className="flex items-center gap-3.5 px-4 py-3 w-full rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group"
          >
            <LogOut size={18} className="group-hover:text-red-600" />
            {(!isCollapsed || isMobileMenuOpen) && <span className="font-bold text-xs uppercase tracking-widest">Logout</span>}
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
