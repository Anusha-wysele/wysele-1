import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare,
  Download,
  Filter,
  UserCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jobService from '../../services/jobService';
import { useToast } from '../../components/Admin/ToastContext';
import ConfirmModal from '../../components/Admin/ConfirmModal';

const AdminContacts = () => {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await jobService.getAllContacts();
      console.log('📬 Contact Inquiries Response:', data);
      
      // Handle various response structures
      let rawInquiries = [];
      if (Array.isArray(data)) rawInquiries = data;
      else if (data.data && Array.isArray(data.data)) rawInquiries = data.data;
      else if (data.results && Array.isArray(data.results)) rawInquiries = data.results;
      else if (data.contacts && Array.isArray(data.contacts)) rawInquiries = data.contacts;
      
      setInquiries(rawInquiries);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      showToast('Failed to load contact inquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setInquiryToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!inquiryToDelete) return;
    try {
      await jobService.deleteContact(inquiryToDelete);
      setInquiries(inquiries.filter(item => (item._id || item.id) !== inquiryToDelete));
      showToast('Inquiry deleted successfully.', 'success');
    } catch (err) {
      showToast('Failed to delete inquiry.', 'error');
    } finally {
      setIsConfirmModalOpen(false);
      setInquiryToDelete(null);
    }
  };

  const exportToCSV = () => {
    if (filteredInquiries.length === 0) return;

    const headers = ['Name', 'Email', 'Phone', 'Location', 'Message'];
    const csvRows = filteredInquiries.map(item => [
      `"${(item.full_name || item.fullName || 'N/A').replace(/"/g, '""')}"`,
      `"${item.email || item.emailAddress || 'N/A'}"`,
      `"${item.phone_number || item.phoneNumber || 'N/A'}"`,
      `"${(item.location || 'N/A').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(item => {
    const searchStr = searchTerm.toLowerCase();
    return (
      item.fullName?.toLowerCase().includes(searchStr) ||
      item.emailAddress?.toLowerCase().includes(searchStr) ||
      item.location?.toLowerCase().includes(searchStr) ||
      item.message?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Contact Inquiries</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Manage and respond to contact requests from the website.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Total Inquiries', value: inquiries.length.toString(), icon: MessageSquare, color: 'text-crimson-600', bg: 'bg-crimson-50' },
            { label: 'Active Contacts', value: [...new Set(inquiries.map(i => i.emailAddress))].length.toString(), icon: UserCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-none bg-white border border-gray-100 flex items-center gap-5">
              <div className={`w-12 h-12   ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-none border border-gray-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search contacts or messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 rounded-none border border-gray-200 bg-gray-50 text-[13px] outline-none transition-all w-full md:w-80"
              />
            </div>
            <button 
              onClick={exportToCSV}
              className="p-2.5 rounded-none border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2 text-[13px] font-bold"
            >
              <Download size={18} />
              Export
            </button>
          </div>

          {/* Table */}
          <div className="responsive-table-container min-h-[400px] relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading inquiries...</p>
                </div>
              </div>
            )}
            
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#800000] border-b border-gray-100">
                  <th className="px-8 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Contact Info</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Location</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest w-1/3">Message</th>
                  <th className="px-8 py-4 text-[13px] font-semibold text-white capitalize tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((item) => (
                    <tr key={item._id || item.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="text-[13px] font-bold text-gray-900  transition-colors capitalize">
                          {item.full_name || item.fullName || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            {item.email || item.emailAddress || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Phone size={12} className="text-gray-400" />
                            {item.phone_number || item.phoneNumber || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-[13px] text-gray-600">
                          <MapPin size={12} className="text-gray-400" />
                          {item.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                          {item.message}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => handleDeleteClick(item._id || item.id)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : !loading && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No inquiries found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal 
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Inquiry?"
          message="Are you sure you want to remove this user inquiry? This action cannot be undone."
          confirmText="Yes, Remove"
          cancelText="Cancel"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
