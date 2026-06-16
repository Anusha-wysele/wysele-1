import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  Download,
  Eye,
  Mail,
  MessageSquare,
  Phone,
  Search,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import { useAuth } from '../../context/AuthContext';
import jobService from '../../services/jobService';

const AdminConsultations = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCompany]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const queryParams = { 
        page: currentPage,
        limit: limit,
        company: activeCompany
      };
      if (searchTerm.trim()) {
        queryParams.q = searchTerm;
        queryParams.query = searchTerm;
      }
      const data = await jobService.getAllConsultations(queryParams);
      console.log('📊 Consultation Requests Response:', data);
      
      let rawData = [];
      let totalCount = 0;
      let calculatedTotalPages = 1;

      if (Array.isArray(data)) {
        rawData = data;
        const filtered = rawData.filter(item => {
          const contactCompany = item.company || 'wysele';
          if (contactCompany.toLowerCase() !== activeCompany.toLowerCase()) {
            return false;
          }
          const searchStr = searchTerm.toLowerCase();
          return (
            item.name?.toLowerCase().includes(searchStr) ||
            item.email?.toLowerCase().includes(searchStr) ||
            item.company_name?.toLowerCase().includes(searchStr)
          );
        });
        totalCount = filtered.length;
        calculatedTotalPages = Math.ceil(totalCount / limit) || 1;
        const startIndex = (currentPage - 1) * limit;
        rawData = filtered.slice(startIndex, startIndex + limit);
      } else {
        if (data.results && Array.isArray(data.results)) rawData = data.results;
        else if (data.data && Array.isArray(data.data)) rawData = data.data;
        else if (data.consultations && Array.isArray(data.consultations)) rawData = data.consultations;
        else if (data.items && Array.isArray(data.items)) rawData = data.items;
        
        const filtered = rawData.filter(item => {
          const contactCompany = item.company || 'wysele';
          return contactCompany.toLowerCase() === activeCompany.toLowerCase();
        });

        totalCount = data.count || data.total || data.totalItems || filtered.length;
        calculatedTotalPages = data.totalPages || data.pages || Math.ceil(totalCount / limit) || 1;

        rawData = filtered;
        if (rawData.length > limit) {
          const startIndex = (currentPage - 1) * limit;
          rawData = rawData.slice(startIndex, startIndex + limit);
        }
      }
      
      console.log('✅ Processed rawData:', rawData);
      setRequests(rawData);
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      console.error('Failed to load consultations:', err);
      showToast('Failed to load consultation requests.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, activeCompany, searchTerm, showToast]);

  const exportToCSV = () => {
    if (filteredRequests.length === 0) return;

    const headers = ['Name', 'Company', 'Department', 'Email', 'Mobile', 'Message', 'Submitted At'];
    const csvRows = filteredRequests.map(item => [
      `"${(item.name || 'N/A').replace(/"/g, '""')}"`,
      `"${(item.company_name || 'N/A').replace(/"/g, '""')}"`,
      `"${(item.department || 'N/A').replace(/"/g, '""')}"`,
      `"${item.email || 'N/A'}"`,
      `"${item.mobile_number || 'N/A'}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`,
      `"${item.submitted_at || 'Recently'}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `consultation_requests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRequests = requests;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Consultation Requests</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Review and manage technical consultation bookings from potential clients.</p>
          </div>
        
        </div>



        {/* Search & Export Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#005A9E] outline-none transition-all"
            />
          </div>
          
          {/* Export CSV Button */}
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#005A9E] text-white rounded-lg font-semibold text-xs hover:bg-[#004b85] hover:text-white transition-all shadow-sm whitespace-nowrap"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table */}
          <div className="responsive-table-container min-h-[400px] relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Fetching requests...</p>
                </div>
              </div>
            )}
            
            <table className="w-full text-left">
              <thead className="bg-blue-200 text-blue-900">
                <tr>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Client Name</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Company</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Email</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Mobile Number</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Submitted</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((item) => (
                    <tr key={item._id || item.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 text-center">
                        <p className="text-sm font-bold text-gray-900 capitalize">
                          {item.name}
                        </p>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-xs font-bold text-gray-600">
                          {item.company_name}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                          <Mail size={12} className="text-gray-400" />
                          {item.email}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                          <Phone size={12} className="text-gray-400" />
                          {item.mobile_number || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-xs text-gray-500">
                          {item.submitted_at || 'Recently'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => {setSelectedRequest(item); setIsViewModalOpen(true);}}
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : !loading && (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                      No consultation requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standalone Pagination Card */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${
                currentPage === 1 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <span className="text-xs text-gray-500 font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                currentPage === totalPages 
                  ? 'border border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#005A9E] text-white hover:bg-[#004b85]'
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {/* View Modal */}
        {createPortal(
          <AnimatePresence>
            {isViewModalOpen && selectedRequest && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsViewModalOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-md"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="bg-blue-200 p-6 flex justify-between items-center text-blue-900">
                    <h3 className="text-lg font-bold uppercase tracking-widest">Consultation Details</h3>
                    <button onClick={() => setIsViewModalOpen(false)} className="text-blue-900"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                        <p className="text-sm font-bold text-gray-900">{selectedRequest.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</p>
                        <p className="text-sm font-bold text-gray-900">{selectedRequest.company_name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile</p>
                        <p className="text-sm font-bold text-gray-900">{selectedRequest.mobile_number}</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Requirement Details</p>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 leading-relaxed max-h-48 overflow-y-auto hide-scrollbar">
                        {selectedRequest.message}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={() => setIsViewModalOpen(false)}
                        className="px-6 py-2 bg-[#005A9E] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#004b85] transition-all shadow-sm"
                      >
                        Close View
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}


      </div>
    </AdminLayout>
  );
};

export default AdminConsultations;
