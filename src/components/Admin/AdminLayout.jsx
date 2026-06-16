import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';
import ChangePasswordModal from './ChangePasswordModal';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    const isMobileView = window.matchMedia('(max-width: 1023px)').matches;
    if (isMobileView) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="admin-dark-theme min-h-screen flex bg-[#F0F0F0] font-['Inter',_sans-serif]">
      {/* Sidebar - Desktop and Mobile Overlay */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        isCollapsed={isSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onMenuToggle={handleToggleSidebar} 
        />
        <main className="flex-1 overflow-y-auto hide-scrollbar pt-[16px] px-3 pb-4 md:pt-[22px] md:px-4 md:pb-6 lg:pt-[30px] lg:px-6 lg:pb-10">
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* Force password change for first-time login (excluding Super Admins) */}
      <ChangePasswordModal 
        isOpen={user?.is_first_login === true && user?.role !== 'SUPER_ADMIN'} 
        onClose={() => {}} 
      />
    </div>
  );
};

export default AdminLayout;
