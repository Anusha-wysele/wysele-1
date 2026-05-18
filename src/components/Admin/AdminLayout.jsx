import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ChangePasswordModal from './ChangePasswordModal';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="admin-dark-theme min-h-screen flex bg-white font-['Inter',_sans-serif]">
      {/* Sidebar - Desktop and Mobile Overlay */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        <main className="flex-1 overflow-y-auto admin-scrollbar p-4 md:p-6 lg:p-10">
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
