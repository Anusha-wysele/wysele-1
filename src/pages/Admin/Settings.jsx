import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  ShieldAlert, 
  UserCircle2, 
  Loader2,
  KeyRound,
  IdCard,
  Building
} from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Admin/ToastContext';
import authService from '../../services/authService';
import employeeService from '../../services/employeeService';

const Settings = () => {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'password'
  const [profileLoading, setProfileLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  
  // Profile Form State
  const [profileData, setProfileData] = useState({
    emp_id: '',
    email: '',
    name: '',
    phone_number: '',
    role: '',
    company_name: ''
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Password Visibility States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        const data = await authService.getCurrentUser();
        const finalUser = data.user || data.data || data;
        setProfileData({
          emp_id: finalUser.emp_id || '',
          email: finalUser.email || finalUser.username || '',
          name: finalUser.name || '',
          phone_number: finalUser.phone_number || '',
          role: finalUser.role || '',
          company_name: finalUser.company_name || ''
        });
      } catch (err) {
        console.error('Failed to load fresh user profile:', err);
        // Fallback to local AuthContext user
        if (user) {
          setProfileData({
            emp_id: user.emp_id || '',
            email: user.email || user.username || '',
            name: user.name || '',
            phone_number: user.phone_number || '',
            role: user.role || '',
            company_name: user.company_name || ''
          });
        }
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim()) {
      showToast('Full Name is required.', 'error');
      return;
    }
    
    setSavingProfile(true);
    try {
      const userId = user?.id || user?._id || user?.emp_id;
      if (!userId) {
        throw new Error('User ID could not be resolved.');
      }

      await employeeService.updateEmployee(userId, {
        name: profileData.name.trim(),
        phone_number: profileData.phone_number.trim(),
        email: profileData.email.trim()
      });

      // Update context and local storage immediately
      const updatedUser = {
        ...user,
        name: profileData.name.trim(),
        phone_number: profileData.phone_number.trim()
      };
      setUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));

      showToast('Profile details updated successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update profile details.', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordData.old_password) {
      showToast('Current Password is required.', 'error');
      return;
    }
    if (!passwordData.new_password) {
      showToast('New Password is required.', 'error');
      return;
    }
    if (passwordData.new_password !== passwordData.confirm_password) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (passwordData.new_password.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }

    setSavingPassword(true);
    try {
      await authService.changePassword(
        passwordData.old_password,
        passwordData.new_password
      );
      
      showToast('Password changed successfully!', 'success');
      setPasswordData({
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err) {
      showToast(err.message || 'Failed to change password.', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div>
          <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Account Settings</h1>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage your administrator profile details and configure account passwords.</p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
          
          {/* Tabs header */}
          <div className="flex border-b border-gray-100 bg-gray-50/55 px-6 pt-3">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'profile'
                  ? 'border-[#005A9E] text-[#005A9E]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <User size={15} />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'password'
                  ? 'border-[#005A9E] text-[#005A9E]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              <Lock size={15} />
              Change Password
            </button>
          </div>

          <div className="p-6 md:p-8 max-w-3xl">
            {profileLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin text-[#005A9E]" size={36} />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Loading Account details...</span>
              </div>
            ) : activeTab === 'profile' ? (
              
              /* PROFILE TAB CONTENT */
              <div className="space-y-1 max-w-2xl bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                
                {/* Field 1: Name */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <UserCircle2 size={16} className="text-slate-500 shrink-0" />
                    <span>Full Name</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600 capitalize">
                    {profileData.name || 'N/A'}
                  </span>
                </div>

                {/* Field 2: Email */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <Mail size={16} className="text-slate-500 shrink-0" />
                    <span>Email Address</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600">
                    {profileData.email || 'N/A'}
                  </span>
                </div>

                {/* Field 3: Phone Number */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <Phone size={16} className="text-slate-500 shrink-0" />
                    <span>Phone Number</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600">
                    {profileData.phone_number || 'N/A'}
                  </span>
                </div>

                {/* Field 4: Role */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <ShieldAlert size={16} className="text-slate-500 shrink-0" />
                    <span>System Role</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600 uppercase">
                    {profileData.role || 'N/A'}
                  </span>
                </div>

                {/* Field 5: Employee ID */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <IdCard size={16} className="text-slate-500 shrink-0" />
                    <span>Employee ID</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600">
                    {profileData.emp_id || 'N/A'}
                  </span>
                </div>

                {/* Field 6: Company */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <Building size={16} className="text-slate-500 shrink-0" />
                    <span>Company</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <span className="text-sm font-semibold text-slate-600 capitalize">
                    {profileData.company_name || 'N/A'}
                  </span>
                </div>

                {/* Field 7: Password Placeholder */}
                <div className="grid grid-cols-[140px_20px_1fr] sm:grid-cols-[180px_30px_1fr] items-center py-3.5">
                  <div className="flex items-center gap-2.5 text-slate-500 font-semibold text-sm capitalize shrink-0">
                    <Lock size={16} className="text-slate-500 shrink-0" />
                    <span>Account Password</span>
                  </div>
                  <span className="text-slate-400 text-center font-bold">:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-600 tracking-[0.25em]">••••••••••••</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('password')}
                      className="px-3 py-1.5 bg-[#DEECF9] text-[#005A9E] hover:bg-[#DEECF9]/80 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shrink-0"
                    >
                      <KeyRound size={12} />
                      Change Password
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              
              /* PASSWORD TAB CONTENT */
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  
                  {/* Field 1: Current Password */}
                  <div className="space-y-1.5 md:col-span-2 max-w-md">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Lock size={12} /> Current Password *
                    </label>
                    <div className="relative">
                      <input 
                        type={showOldPassword ? 'text' : 'password'} 
                        name="old_password" 
                        required
                        value={passwordData.old_password} 
                        onChange={handlePasswordChange}
                        className="w-full pl-4 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 focus:outline-none transition-colors"
                      >
                        {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Field 2: New Password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <KeyRound size={12} /> New Password *
                    </label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? 'text' : 'password'} 
                        name="new_password" 
                        required
                        value={passwordData.new_password} 
                        onChange={handlePasswordChange}
                        className="w-full pl-4 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 focus:outline-none transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Field 3: Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <KeyRound size={12} /> Confirm New Password *
                    </label>
                    <div className="relative">
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        name="confirm_password" 
                        required
                        value={passwordData.confirm_password} 
                        onChange={handlePasswordChange}
                        className="w-full pl-4 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 focus:outline-none transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Save Button */}
                <div className="pt-4 flex justify-start">
                  <button 
                    type="submit"
                    disabled={savingPassword}
                    className="w-full md:w-[35%] bg-[#005A9E] text-white py-3 rounded-lg font-semibold uppercase tracking-normal text-xs hover:bg-[#004b85] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {savingPassword ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <KeyRound size={16} />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default Settings;
