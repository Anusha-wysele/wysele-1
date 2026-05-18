import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Mail, Fingerprint, Phone, Briefcase, Building, ShieldCheck, Loader2 } from 'lucide-react';
import employeeService from '../../services/employeeService';
import { useToast } from '../Admin/ToastContext';

const RegisterEmployeeModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    email: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    phone_number: '',
    company_id: '',
    role: 'HR'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await employeeService.registerEmployee(formData);
      showToast('Employee registered successfully!', 'success');
      window.dispatchEvent(new CustomEvent('employeeRegistered'));
      onSuccess?.();
      onClose();
      setFormData({
        employee_id: '',
        email: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        phone_number: '',
        company_id: '',
        role: 'HR'
      });
    } catch (err) {
      showToast(err.message || 'Failed to register employee.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="bg-[#800000]  p-3 text-white flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffcc00] text-black  rounded-full">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold uppercase tracking-normal">Register New Employee</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Onboarding System</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                
                {/* Field 1: Employee ID */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Fingerprint size={12} /> Employee ID
                  </label>
                  <input 
                    type="text" name="employee_id" required
                    value={formData.employee_id} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                    placeholder="e.g. WYS-001"
                  />
                </div>

                {/* Field 2: First Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" name="first_name" required
                    value={formData.first_name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                  />
                </div>

                {/* Field 3: Official Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} /> Official Email
                  </label>
                  <input 
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                    placeholder="employee@wysele.com"
                  />
                </div>

                {/* Field 4: Middle Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Middle Name</label>
                  <input 
                    type="text" name="middle_name"
                    value={formData.middle_name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                  />
                </div>

                {/* Field 5: Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input 
                    type="text" name="phone_number" required
                    value={formData.phone_number} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Field 6: Last Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" name="last_name" required
                    value={formData.last_name} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                  />
                </div>

                {/* Field 7: Company ID */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Building size={12} /> Company ID
                  </label>
                  <input 
                    type="text" name="company_id" required
                    value={formData.company_id} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                    placeholder="WYS-GLOBAL"
                  />
                </div>

                {/* Field 8: System Role */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} /> System Role
                  </label>
                  <select 
                    name="role"
                    value={formData.role} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-normal focus:bg-white focus:border-[#800000] outline-none transition-all capitalize tracking-normal"
                  >
                    <option value="HR">HR Manager</option>
                    <option value="ADMIN">System Admin</option>
                  </select>
                </div>

              </div>

              {/* Centered Submit Button */}
              <div className="flex justify-center pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-[35%]  bg-[#ffcc00] text-black py-3 rounded-none font-semibold uppercase tracking-normal text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Briefcase size={18} />}
                  Register Employee
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RegisterEmployeeModal;
