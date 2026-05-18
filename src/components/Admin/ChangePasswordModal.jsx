import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldAlert, CheckCircle2, Loader2, Key } from 'lucide-react';
import authService from '../../services/authService';
import { useToast } from '../Admin/ToastContext';
import { useAuth } from '../../context/AuthContext';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { showToast } = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return showToast('Passwords do not match.', 'error');
    }
    if (newPassword.length < 8) {
      return showToast('New password must be at least 8 characters.', 'error');
    }

    setIsLoading(true);
    try {
      await authService.changePassword(oldPassword, newPassword);
      setIsSuccess(true);
      showToast('Password updated successfully!', 'success');
      
      // Update local user state to reflect is_first_login is now false
      const savedUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
      const updatedUser = { ...savedUser, is_first_login: false };
      setUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      showToast(err.message || 'Failed to update password.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-[450px] h-[400px] max-w-md bg-white rounded-none shadow-2xl overflow-hidden"
          >
            <div className="bg-[#800000] p-4 text-white text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-semibold uppercase tracking-normal mb-2">Secure Your Account</h3>
              <p className="text-white/70 text-xs font-normal capitalize tracking-normal leading-relaxed">
                As this is your first time logging in, please update your temporary password to proceed.
              </p>
            </div>

            <div className="p-5 overflow-y-auto hide-scrollbar">
              {isSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 uppercase">Security Verified</h4>
                  <p className="text-gray-500 text-sm font-medium">Your session is now secure. Redirecting...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={12} className="text-red-500" /> Current Password
                    </label>
                    <input 
                      type="password" required
                      value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#C9184A] outline-none transition-all"
                      placeholder="Enter temporary password"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Key size={12} className="text-green-600" /> New Password
                      </label>
                      <input 
                        type="password" required
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#C9184A] outline-none transition-all"
                        placeholder="Min. 8 characters"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirm New Password</label>
                      <input 
                        type="password" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#C9184A] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#C9184A] text-white py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Update & Continue'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
