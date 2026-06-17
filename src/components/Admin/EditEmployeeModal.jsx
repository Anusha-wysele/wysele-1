import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Building, Fingerprint, Loader2, Mail, Phone, ShieldCheck, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import employeeService from '../../services/employeeService';
import { useToast } from '../Admin/ToastContext';
import companyService from '../../services/companyService';

const EditEmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
  const [formData, setFormData] = useState({
    emp_id: '',
    email: '',
    name: '',
    phone_number: '',
    company_name: '',
    role: 'ADMIN'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [companiesList, setCompaniesList] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    const loadCompanies = () => {
      setCompaniesList(companyService.getCompanies());
    };
    loadCompanies();
    companyService.fetchCompanies(); // Fetch fresh data from backend API
    window.addEventListener('companiesUpdated', loadCompanies);
    return () => window.removeEventListener('companiesUpdated', loadCompanies);
  }, []);

  useEffect(() => {
    if (employee) {
      setFormData({
        emp_id: employee.emp_id || employee.employee_id || '',
        email: employee.email || '',
        name: employee.name || '',
        phone_number: employee.phone_number || '',
        company_name: employee.company_name || employee.company || '',
        role: employee.role || 'ADMIN'
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Name is required.', 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      const id = employee?.id || employee?._id;
      if (!id) {
        throw new Error('Employee ID not found.');
      }
      
      await employeeService.updateEmployee(id, {
        name: formData.name.trim(),
        phone_number: formData.phone_number.trim(),
        company_name: formData.company_name,
        role: formData.role
      });
      
      showToast('Employee details updated successfully!', 'success');
      onSuccess?.();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to update employee details.', 'error');
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
            <div className="bg-blue-200 p-3 text-blue-900 flex items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ffcc00] text-black rounded-full">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold uppercase tracking-normal">Edit Employee details</h3>
                  <p className="text-blue-900/60 text-[10px] font-bold uppercase tracking-widest mt-1">Onboarding System</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-blue-900/10 rounded-full transition-colors text-blue-900">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                
                {/* Field 1: Employee ID */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Fingerprint size={12} /> Employee ID (Read-only)
                  </label>
                  <input 
                    type="text" 
                    name="emp_id" 
                    readOnly
                    value={formData.emp_id} 
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold text-gray-500 cursor-not-allowed outline-none select-none"
                  />
                </div>

                {/* Field 2: Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all capitalize"
                    placeholder="e.g. John Doe"
                  />
                </div>

                {/* Field 3: Official Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} /> Official Email (Read-only)
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    readOnly
                    value={formData.email} 
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm font-semibold text-gray-500 cursor-not-allowed outline-none select-none"
                  />
                </div>

                {/* Field 4: Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="phone_number" 
                    value={formData.phone_number} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Field 5: Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Building size={12} /> Company Name
                  </label>
                  <select 
                    name="company_name" 
                    required
                    value={formData.company_name} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#800000] outline-none transition-all capitalize"
                  >
                    <option value="">Select Company</option>
                    {companiesList.filter(c => c.is_active || c.id === 'gracevirtue').map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}                  </select>
                </div>

                {/* Field 6: System Role */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12} /> System Role
                  </label>
                  <select 
                    name="role"
                    value={formData.role} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm font-normal focus:bg-white focus:border-[#800000] outline-none transition-all tracking-normal"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </div>

              </div>

              {/* Centered Submit Button */}
              <div className="flex justify-center pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-[35%] bg-[#005A9E] text-white py-3 rounded-lg font-semibold uppercase tracking-normal text-xs hover:bg-[#004b85] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Briefcase size={18} />}
                  Update Details
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditEmployeeModal;
