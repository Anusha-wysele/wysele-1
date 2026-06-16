import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Building, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Globe, 
  Mail, 
  User, 
  FileText, 
  MapPin, 
  ExternalLink,
  X,
  Loader2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import companyService from '../../services/companyService';
import ConfirmModal from '../../components/Admin/ConfirmModal';

const CompanyOnboard = () => {
  const { user } = useAuth();
  const userRoleRaw = user?.role?.toUpperCase() || '';
  const isSuperAdmin = userRoleRaw === 'SUPER_ADMIN' || userRoleRaw === 'SUPERADMIN';

  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'inactive'
  const { showToast } = useToast();

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    domain: '',
    email_domain: '',
    description: '',
    domain_link: '',
    responsible_person: '',
    documents: '',
    address: '',
    is_active: true
  });

  const loadCompanies = useCallback(() => {
    setCompanies(companyService.getCompanies());
  }, []);

  useEffect(() => {
    loadCompanies();
    companyService.fetchCompanies(); // Fetch fresh data from backend API
    window.addEventListener('companiesUpdated', loadCompanies);
    return () => window.removeEventListener('companiesUpdated', loadCompanies);
  }, [loadCompanies]);

  if (!isSuperAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleOpenAdd = () => {
    setSelectedCompany(null);
    setFormData({
      id: '',
      name: '',
      domain: '',
      email_domain: '',
      description: '',
      domain_link: '',
      responsible_person: '',
      documents: '',
      address: '',
      is_active: true
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (company) => {
    setSelectedCompany(company);
    setFormData({ ...company });
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (company) => {
    setSelectedCompany(company);
    setIsDeleteModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Field validation (NOT NULL validation)
    const requiredFields = ['name', 'domain', 'email_domain', 'description', 'domain_link', 'responsible_person', 'address'];
    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        showToast(`${field.replace('_', ' ')} is required.`, 'error');
        return;
      }
    }

    try {
      await companyService.saveCompany(formData);
      showToast(
        selectedCompany ? 'Company updated successfully!' : 'Company onboarded successfully!',
        'success'
      );
      setIsFormModalOpen(false);
    } catch (err) {
      showToast(err.message || 'An error occurred.', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedCompany) {
      try {
        await companyService.deleteCompany(selectedCompany.id);
        showToast('Company deleted successfully!', 'success');
        setIsDeleteModalOpen(false);
        setSelectedCompany(null);
      } catch (err) {
        showToast(err.message || 'Failed to delete company.', 'error');
      }
    }
  };

  const handleToggleActive = async (company) => {
    const originalIsActive = company.is_active;
    const newIsActive = !originalIsActive;

    // Optimistically update local UI state immediately
    setCompanies(prev => 
      prev.map(c => c.id === company.id ? { ...c, is_active: newIsActive } : c)
    );

    try {
      await companyService.toggleStatus(company.id, newIsActive);
      showToast(
        `Company ${newIsActive ? 'activated' : 'deactivated'} successfully!`,
        'success'
      );
    } catch (err) {
      // Revert back on failure
      setCompanies(prev => 
        prev.map(c => c.id === company.id ? { ...c, is_active: originalIsActive } : c)
      );
      showToast(err.message || 'Failed to toggle status.', 'error');
    }
  };

  const filteredCompanies = companies.filter(company => {
    // 1. Filter by Active Tab
    if (activeTab === 'active' && !company.is_active) return false;
    if (activeTab === 'inactive' && company.is_active) return false;

    // 2. Filter by Search Term
    const name = (company?.name || '').toLowerCase();
    const domain = (company?.domain || '').toLowerCase();
    const responsiblePerson = (company?.responsible_person || '').toLowerCase();
    const term = (searchTerm || '').toLowerCase();
    return name.includes(term) || domain.includes(term) || responsiblePerson.includes(term);
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Organizations</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Register new companies, manage existing domains, and control system roles.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#005A9E] text-white rounded-lg font-semibold text-xs hover:bg-[#004b85] hover:text-white transition-all shadow-sm"
          >
            <Plus size={16} />
            Onboard Organization
          </button>
        </div>

        {/* Toolbar Card with Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 py-1 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === 'all'
                  ? 'bg-[#005A9E] text-white shadow-sm border border-transparent'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All ({companies.length})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === 'active'
                  ? 'bg-[#005A9E] text-white shadow-sm border border-transparent'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Active ({companies.filter(c => c.is_active).length})
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`px-4 py-1.5 text-xs font-semibold capitalize rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                activeTab === 'inactive'
                  ? 'bg-[#005A9E] text-white shadow-sm border border-transparent'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Inactive ({companies.filter(c => !c.is_active).length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md w-full md:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search companies by name, domain, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#005A9E] outline-none transition-all"
            />
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="responsive-table-container min-h-[300px] relative overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-200 text-blue-900">
                <tr>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Domain Info</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Owner</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-center">Status</th>
                  <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <tr key={company.id} className="group hover:bg-gray-50/50 transition-colors">
                      {/* Company Name & Description */}
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="text-sm font-bold text-gray-900 capitalize">
                          {company.name}
                        </p>
                        <p className="text-xs text-gray-400 font-normal line-clamp-2 mt-0.5">
                          {company.description}
                        </p>
                      </td>

                      {/* Domains */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-1">
                          <a 
                            href={company.domain_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 text-xs text-[#005A9E] hover:underline font-semibold"
                          >
                            <Globe size={12} />
                            {company.domain}
                            <ExternalLink size={10} />
                          </a>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Mail size={12} className="text-gray-400" />
                            @{company.email_domain}
                          </div>
                        </div>
                      </td>

                      {/* Responsible Person */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-50 text-[#005A9E] flex items-center justify-center font-bold text-[10px] uppercase">
                            {(company.responsible_person || 'RP').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 capitalize">{company.responsible_person || 'N/A'}</p>
                            {company.documents && (
                              <a 
                                href={company.documents} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#005A9E] mt-0.5 font-medium"
                              >
                                <FileText size={10} />
                                View Docs
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                          <MapPin size={12} className="text-gray-400 shrink-0" />
                          <span className="truncate max-w-[150px]" title={company.address}>
                            {company.address}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleActive(company)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-sm ${
                              company.is_active ? 'bg-green-600' : 'bg-red-600'
                            }`}
                            title={company.is_active ? 'Deactivate Company' : 'Activate Company'}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                company.is_active ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className={`text-[9px] font-black uppercase tracking-wider ${
                            company.is_active ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {company.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(company)}
                            className="p-1.5 text-gray-500 hover:text-[#005A9E] hover:bg-gray-100 rounded-lg transition-all"
                            title="Edit Company"
                          >
                            <Pencil size={14} />
                          </button>
                          {!(company.id === 'wysele' || company.id === 'orbintix' || company.id === 'gracevirtue') && (
                            <button
                              onClick={() => handleOpenDelete(company)}
                              className="p-1.5 text-gray-500 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Company"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                      No companies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {createPortal(
          <AnimatePresence>
            {isFormModalOpen && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto overflow-x-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFormModalOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-md"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden my-auto"
                >
                  {/* Header */}
                  <div className="bg-blue-200 p-4 text-blue-900 flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#ffcc00] text-black rounded-full">
                        <Building size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold uppercase tracking-normal">
                          {selectedCompany ? 'Edit Organization Profile' : 'Onboard New Organization'}
                        </h3>
                        <p className="text-blue-900/60 text-[10px] font-bold uppercase tracking-widest mt-1">Enterprise Registry</p>
                      </div>
                    </div>
                    <button onClick={() => setIsFormModalOpen(false)} className="p-2 hover:bg-blue-900/10 rounded-full transition-colors text-blue-900">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="p-6 space-y-6 max-h-[calc(100vh-140px)] overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      
                      {/* Field 1: Company Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Building size={12} /> Company Name *
                        </label>
                        <input 
                          type="text" name="name" required
                          value={formData.name} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="e.g. Wysele, Orbintix"
                        />
                      </div>

                      {/* Field 2: Domain */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Globe size={12} /> Domain *
                        </label>
                        <input 
                          type="text" name="domain" required
                          value={formData.domain} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="e.g. wysele.com"
                        />
                      </div>

                      {/* Field 3: Email Domain */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Mail size={12} /> Email Domain *
                        </label>
                        <input 
                          type="text" name="email_domain" required
                          value={formData.email_domain} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="e.g. wysele.com"
                        />
                      </div>

                      {/* Field 4: Domain Link */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <ExternalLink size={12} /> Domain Link *
                        </label>
                        <input 
                          type="url" name="domain_link" required
                          value={formData.domain_link} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="e.g. https://wysele.com"
                        />
                      </div>

                      {/* Field 5: Responsible Person */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <User size={12} /> Responsible Person *
                        </label>
                        <input 
                          type="text" name="responsible_person" required
                          value={formData.responsible_person} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="Contact person name"
                        />
                      </div>

                      {/* Field 6: Documents */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12} /> Documents Link (Optional)
                        </label>
                        <input 
                          type="url" name="documents"
                          value={formData.documents} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all"
                          placeholder="Link to shared folders/agreements"
                        />
                      </div>

                      {/* Field 7: Address */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={12} /> Address *
                        </label>
                        <textarea 
                          name="address" required rows={2}
                          value={formData.address} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all resize-none"
                          placeholder="Full registered address"
                        />
                      </div>

                      {/* Field 8: Description */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Description *</label>
                        <textarea 
                          name="description" required rows={3}
                          value={formData.description} onChange={handleFormChange}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold focus:bg-white focus:border-[#005A9E] outline-none transition-all resize-none"
                          placeholder="Provide details about the company's core operations..."
                        />
                      </div>

                      {/* Field 9: Is Active Status */}
                      <div className="flex items-center justify-between md:col-span-2 p-3.5 bg-gray-50/50 border border-gray-100 rounded-lg">
                        <div>
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-0.5 select-none">
                            Profile Status
                          </label>
                          <span className="text-[10px] text-gray-500 font-medium select-none">
                            Visible in client portals and active company selectors
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-sm ${
                              formData.is_active ? 'bg-green-600' : 'bg-red-600'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                formData.is_active ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span className={`text-[10px] font-black uppercase tracking-wider min-w-[50px] ${
                            formData.is_active ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formData.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Centered Submit Button */}
                    <div className="flex justify-center pt-2">
                      <button 
                        type="submit"
                        className="w-full md:w-[35%] bg-[#005A9E] text-white py-3 rounded-lg font-semibold uppercase tracking-normal text-xs hover:bg-[#004b85] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Building size={16} />
                        {selectedCompany ? 'Update Details' : 'Onboard Organization'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Company"
          message={`Are you sure you want to delete "${selectedCompany?.name}"? This operation is irreversible and all referencing data may fail to filter correctly.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />


      </div>
    </AdminLayout>
  );
};

export default CompanyOnboard;
