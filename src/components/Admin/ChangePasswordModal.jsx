import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Key, Loader2, Lock, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { useToast } from '../Admin/ToastContext';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setShowOldPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh]"
          >
            <div className="bg-blue-200 p-6 text-blue-900 text-center shrink-0">
              <div className="w-12 h-12 bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-900">
                <Lock size={22} />
              </div>
              <h3 className="text-lg font-semibold uppercase tracking-normal mb-1">Secure Your Account</h3>
              <p className="text-blue-900/70 text-xs font-normal capitalize tracking-normal leading-relaxed">
                As this is your first time logging in, please update your temporary password to proceed.
              </p>
            </div>

            <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
              {isSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 uppercase">Security Verified</h4>
                  <p className="text-gray-500 text-sm font-medium">Your session is now secure. Redirecting...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <ShieldAlert size={12} className="text-red-500" /> Current Password
                    </label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? 'text' : 'password'} required
                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                        placeholder="Enter temporary password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                      >
                        {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-55">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Key size={12} className="text-green-600" /> New Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? 'text' : 'password'} required
                          value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                          placeholder="Min. 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Key size={12} className="text-green-600/60" /> Confirm New Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? 'text' : 'password'} required
                          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-4 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#005A9E] text-white py-3 rounded-lg font-semibold uppercase tracking-wider text-xs hover:bg-[#004b85] hover:text-white transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
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
