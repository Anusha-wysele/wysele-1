import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Save,
  ShieldCheck,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import employeeService from '../../services/employeeService';
import { useToast } from './ToastContext';

const PermissionToggle = ({ label, description, isChecked, onChange }) => (
  <div className="flex flex-col p-2.5 bg-gray-50/50 border border-gray-100 group hover:border-crimson-100 transition-all rounded-lg">
    <div className="flex items-center justify-between mb-1.5">
      <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{label}</p>
      <button
        onClick={() => onChange(!isChecked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 outline-none ${
          isChecked ? 'bg-[#800000]' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
    <p className="text-[9px] text-gray-500 font-medium leading-tight">{description}</p>
  </div>
);

const EditPermissionsModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isActive, setIsActive] = useState(employee?.is_active ?? true);
  const [permissions, setPermissions] = useState({
    can_post_blog: false,
    can_edit_blog: false,
    can_delete_blog: false,
    can_post_job: false,
    can_access_contact: false,
    can_access_consulting: false
  });

  useEffect(() => {
    if (employee) {
      setPermissions({
        can_post_blog: !!employee.can_post_blog,
        can_edit_blog: !!employee.can_edit_blog,
        can_delete_blog: !!employee.can_delete_blog,
        can_post_job: !!employee.can_post_job,
        can_access_contact: !!employee.can_access_contact,
        can_access_consulting: !!employee.can_access_consulting
      });
      setIsActive(employee.is_active ?? true);
    }
  }, [employee]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await employeeService.updatePermissions(employee.id || employee._id, permissions);
      if (isActive !== employee.is_active) {
        await employeeService.toggleStatus(employee.id || employee._id, isActive);
      }
      showToast('Access permissions updated successfully!', 'success');
      onUpdate?.();
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to update permissions.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-[600px] max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col m-auto z-10"
          >
            {/* Header */}
            <div className="bg-[#800000] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wide">Access Control</h3>
                  <p className="text-white/70 text-[9px] font-semibold uppercase tracking-widest">
                     {employee?.first_name} {employee?.last_name}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 admin-scrollbar hide-scrollbar">
              {/* Account Status */}
              <section className="bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
                    Account Status
                  </h4>
                  <span className={`px-2 py-0.5 text-[8px] font-bold rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isActive ? 'Active' : 'Blocked'}
                  </span>
                </div>
                <div 
                  onClick={() => setIsActive(!isActive)}
                  className={`p-3 cursor-pointer border rounded-lg transition-all flex items-center justify-between ${
                    isActive ? 'bg-white border-green-100' : 'bg-white border-red-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isActive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                      {isActive ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-900 uppercase">System Access</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${isActive ? 'bg-green-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              </section>

              {/* Module Permissions Grid */}
              <div className="space-y-4">
                <section>
                  <h4 className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1.5">
                    Blog Control
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <PermissionToggle 
                      label="Post" 
                      description="Create new blogs"
                      isChecked={permissions.can_post_blog}
                      onChange={(val) => setPermissions({...permissions, can_post_blog: val})}
                    />
                    <PermissionToggle 
                      label="Edit" 
                      description="Update content"
                      isChecked={permissions.can_edit_blog}
                      onChange={(val) => setPermissions({...permissions, can_edit_blog: val})}
                    />
                    <PermissionToggle 
                      label="Delete" 
                      description="Remove posts"
                      isChecked={permissions.can_delete_blog}
                      onChange={(val) => setPermissions({...permissions, can_delete_blog: val})}
                    />
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2 border-b border-gray-100 pb-1.5">
                    Recruitment & CRM
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <PermissionToggle 
                      label="Jobs" 
                      description="Post openings"
                      isChecked={permissions.can_post_job}
                      onChange={(val) => setPermissions({...permissions, can_post_job: val})}
                    />
                    <PermissionToggle 
                      label="Contact" 
                      description="Inquiry list"
                      isChecked={permissions.can_access_contact}
                      onChange={(val) => setPermissions({...permissions, can_access_contact: val})}
                    />
                    <PermissionToggle 
                      label="Consult" 
                      description="Bookings"
                      isChecked={permissions.can_access_consulting}
                      onChange={(val) => setPermissions({...permissions, can_access_consulting: val})}
                    />
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={12} />
                <p className="text-[8px] font-bold uppercase tracking-widest">Live Updates</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 rounded-lg"
                >
                  {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditPermissionsModal;
