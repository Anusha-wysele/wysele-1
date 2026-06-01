import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WYSELE_LOGOS } from '../../components/common/data';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Automatic trim to prevent copy-paste errors
      await login(email.trim(), password.trim());
      navigate(from, { replace: true });
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
              <h1 className="text-3xl font-black uppercase leading-none tracking-normal font-sans">
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
            <img src={WYSELE_LOGOS.dark} alt="Wysele" className="h-8" />
          </div>

          <div className="space-y-1 text-center md:text-left mb-8">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-normal">Welcome Back</h2>
            <p className="text-gray-500 text-xs font-medium">Enter your credentials to continue.</p>
          </div>

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
                {/* <button type="button" className="text-[9px] font-black text-[#800000] uppercase tracking-widest hover:underline">Forgot?</button> */}
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
              className="w-full bg-[#ffcc00] text-black py-3.5 rounded-lg font-black text-[10px] uppercase tracking-[0.2em]  transition-all   flex items-center justify-center gap-3 active:scale-[0.98] mt-2"
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
