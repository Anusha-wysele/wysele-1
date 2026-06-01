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
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import jobService from '../../services/jobService';

const AdminConsultations = () => {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await jobService.getAllConsultations();
        console.log('📊 Consultation Requests Response:', data);
        
        let rawData = [];
        if (Array.isArray(data)) rawData = data;
        else if (data.data && Array.isArray(data.data)) rawData = data.data;
        else if (data.results && Array.isArray(data.results)) rawData = data.results;
        else if (data.consultations && Array.isArray(data.consultations)) rawData = data.consultations;
        else if (data.items && Array.isArray(data.items)) rawData = data.items;
        
        console.log('✅ Processed rawData:', rawData);
        setRequests(rawData);
      } catch (err) {
        console.error('Failed to load consultations:', err);
        showToast('Failed to load consultation requests.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [showToast]);

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

  const filteredRequests = requests.filter(item => {
    const searchStr = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchStr) ||
      item.email?.toLowerCase().includes(searchStr) ||
      item.company_name?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Consultation Requests</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Review and manage technical consultation bookings from potential clients.</p>
          </div>
        
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Requests', value: requests.length.toString(), icon: MessageSquare, color: 'text-crimson-600', bg: 'bg-crimson-50' },
            { label: 'Unique Companies', value: [...new Set(requests.map(i => i.company_name))].length.toString(), icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Callback', value: requests.length.toString(), icon: Phone, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-none bg-white border border-gray-100 flex items-center gap-5">
              <div className={`w-12 h-12 rounded-xl  ${stat.color} flex items-center justify-center`}>
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
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-4 py-2.5 rounded-none border border-gray-200 bg-gray-50 text-sm focus:bg-white outline-none transition-all w-full"
                />
              </div>
              
            </div>
            <button 
              onClick={exportToCSV}
              className="p-2.5 rounded-none border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2 text-xs font-bold"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>

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
              <thead>
                <tr className="bg-[#800000] border-b border-gray-100">
                  <th className="px-8 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Client Name</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Company</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-[13px] font-semibold text-white capitalize tracking-widest">Submitted</th>
                  <th className="px-8 py-4 text-[13px] font-semibold text-white capitalize tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((item) => (
                    <tr key={item._id || item.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-gray-900 transition-colors capitalize">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                          <Building2 size={12} className="text-gray-400" />
                          {item.company_name}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Mail size={12} className="text-gray-400" />
                            {item.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone size={12} className="text-gray-400" />
                            {item.mobile_number}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          <Calendar size={12} className="text-gray-400" />
                          {item.submitted_at || 'Recently'}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
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
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <MessageSquare size={32} className="text-gray-200" />
                        <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No consultation requests found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        <AnimatePresence>
          {isViewModalOpen && selectedRequest && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsViewModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="bg-[#800000] p-6 flex justify-between items-center text-white">
                  <h3 className="text-lg font-bold uppercase tracking-widest">Consultation Details</h3>
                  <button onClick={() => setIsViewModalOpen(false)}><X size={20} /></button>
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
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-all"
                    >
                      Close View
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


      </div>
    </AdminLayout>
  );
};

export default AdminConsultations;
