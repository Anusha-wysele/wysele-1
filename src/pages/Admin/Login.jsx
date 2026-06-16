import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import logoDark from '../../assets/wysele_dark-removebg-preview.png';
// import CompanySelectionModal from '../../components/Admin/CompanySelectionModal';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('SUPER_ADMIN'); // 'ADMIN' or 'SUPER_ADMIN'

  // Forgot / Reset password state variables
  const [view, setView] = useState('LOGIN'); // 'LOGIN' | 'FORGOT' | 'RESET'
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successAlert, setSuccessAlert] = useState('');

  const { login, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setView('RESET');
      setResetToken(token);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccessAlert('');
    setEmail('');
    setPassword('');
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessAlert('');
    setIsLoading(true);

    try {
      await authService.forgotPassword(email.trim());
      setView('RESET');
    } catch (err) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessAlert('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(resetToken.trim(), newPassword.trim());
      setView('LOGIN');
      setSuccessAlert('Your password has been reset successfully! Please log in with your new password.');
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please verify the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessAlert('');
    setIsLoading(true);

    try {
      // Automatic trim to prevent copy-paste errors
      const loggedInUser = await login(email.trim(), password.trim());

      // Validate role matches the active tab selection
      const userRole = loggedInUser.role?.toUpperCase();
      const isSuperAdmin = userRole === 'SUPER_ADMIN';

      if ((activeTab === 'SUPER_ADMIN' && !isSuperAdmin) || (activeTab === 'ADMIN' && isSuperAdmin)) {
        // Revoke partial login session state
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
        setUser(null);
        if (activeTab === 'SUPER_ADMIN') {
          throw new Error('Access denied. Only Super Admins are allowed.');
        } else {
          throw new Error('Access denied.');
        }
      }

      const fromPath = location.state?.from?.pathname;
      if (fromPath) {
        navigate(fromPath, { replace: true });
      } else if (loggedInUser.role === 'SUPER_ADMIN') {
        navigate('/superadmin/dashboard', { replace: true });
      } else {
        const company = loggedInUser.company_name?.toLowerCase();
        if (company) {
          navigate(`/admin/dashboard?company=${company}`, { replace: true });
        } else {
          navigate('/admin/dashboard', { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden font-['Inter',_sans-serif]">

      {/* Blurred Background Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-lg scale-105"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/7693114/pexels-photo-7693114.jpeg')`,
        }}
    />
      <div className="absolute inset-0 z-0 bg-black/30 backdrop-blur-xs" /> 

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl md:h-[500px] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-none"
      >
        {/* Home Button to return to main website */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[#800000] text-xs font-bold tracking-wider transition-all cursor-pointer group/home"
        >
          <ArrowLeft size={16} className="transition-transform group-hover/home:-translate-x-1" />
          <span className="group-hover/home:underline decoration-2 underline-offset-4">
            Back To Home
          </span>
        </button>

        {/* Left Side - Visual Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden group">

          {/* Image */}
          <img
            src="https://images.pexels.com/photos/7693114/pexels-photo-7693114.jpeg"
            alt="Admin Login Visual"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

          {/* Content Over Image */}
          <div className="absolute bottom-10 left-10 z-10 text-[white] max-w-sm">
            <div className="space-y-3">
              <h1 className="text-3xl uppercase leading-none tracking-normal font-inter font-semibold">
                Enterprise Hub
              </h1>

              <div className="w-20 h-1 bg-[#ffcc00] rounded-full"></div>

              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
                Secure access to the administrative dashboard.
                Manage enterprise operations with speed, security, and precision.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-10 bg-white relative overflow-y-auto">
          <div className="md:hidden flex justify-center mb-6">
            <img src={logoDark} alt="Wysele" className="h-8" />
          </div>

          {/* Tab Selection */}
          {view === 'LOGIN' && (
            <div className="flex border-b border-gray-100 mb-6">
              <button
                type="button"
                onClick={() => handleTabChange('SUPER_ADMIN')}
                className={`flex-1 pb-3 text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === 'SUPER_ADMIN' 
                    ? 'text-[#800000] border-b-2 border-[#800000]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('ADMIN')}
                className={`flex-1 pb-3 text-[10px] font-black uppercase tracking-wider transition-all ${
                  activeTab === 'ADMIN' 
                    ? 'text-[#800000] border-b-2 border-[#800000]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {view === 'LOGIN' && (
            <div className="space-y-1 text-center md:text-left mb-8">
              <div className="flex justify-between items-baseline">
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-normal">Welcome Back</h2>
              </div>
              <p className="text-gray-500 text-xs font-medium">Enter your credentials to continue.</p>
            </div>
          )}

          {view === 'FORGOT' && (
            <div className="space-y-1 text-center md:text-left mb-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-normal">Forgot Password</h2>
              <p className="text-gray-500 text-xs font-medium">Enter your email to receive a verification code.</p>
            </div>
          )}

          {view === 'RESET' && (
            <div className="space-y-1 text-center md:text-left mb-8">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-normal">Reset Password</h2>
              <p className="text-gray-500 text-xs font-medium">Enter the verification code sent to your email and your new password.</p>
            </div>
          )}

          {successAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-50 border-l-4 border-green-600 text-green-700 text-xs font-bold flex items-center gap-3"
            >
              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px] shrink-0">✓</div>
              {successAlert}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border-l-4 border-red-600 text-red-600 text-xs font-bold flex items-center gap-3"
            >
              <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] shrink-0">!</div>
              {error}
            </motion.div>
          )}

          {view === 'LOGIN' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400  transition-colors">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white   focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Password</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      setView('FORGOT');
                      setError('');
                      setSuccessAlert('');
                    }}
                    className="text-[9px] font-black text-[#800000] uppercase tracking-widest hover:underline focus:outline-none cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500  transition-colors">
                    <Lock size={14} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#005A9E] text-white py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-[#004b85] flex items-center justify-center gap-3 active:scale-[0.98] mt-2 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Authenticating...
                  </>
                ) : (
                  'Secure Access'
                )}
              </button>
            </form>
          )}

          {view === 'FORGOT' && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#005A9E] text-white py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-[#004b85] flex items-center justify-center gap-3 active:scale-[0.98] mt-2 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setView('LOGIN');
                  setError('');
                  setSuccessAlert('');
                }}
                className="w-full text-center text-xs font-semibold text-gray-500 hover:text-gray-700 hover:underline pt-2 focus:outline-none"
              >
                Back to Login
              </button>
            </form>
          )}

          {view === 'RESET' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Verification Code</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">New Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={14} />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="At least 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Confirm New Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={14} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-100 rounded-none text-xs focus:bg-white focus:border-gray-400 outline-none transition-all font-semibold"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#005A9E] text-white py-3.5 rounded-lg font-semibold text-sm transition-all hover:bg-[#004b85] flex items-center justify-center gap-3 active:scale-[0.98] mt-2 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setView('FORGOT');
                    setError('');
                    setSuccessAlert('');
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-700 hover:underline focus:outline-none"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView('LOGIN');
                    setError('');
                    setSuccessAlert('');
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-700 hover:underline focus:outline-none"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 flex items-center gap-4 text-gray-300">
            <div className="flex-1 h-[1px] bg-gray-100"></div>
            <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Wysele Security</p>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
