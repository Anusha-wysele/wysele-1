import {
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  UserCircle2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import { useAuth } from '../../context/AuthContext';
import jobService from '../../services/jobService';

const AdminContacts = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCompany = searchParams.get('company') || user?.company_name || 'wysele';
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCompany]);

  const fetchInquiries = async () => {
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
      const data = await jobService.getAllContacts(queryParams);
      console.log('📬 Contact Inquiries Response:', data);
      
      let rawInquiries = [];
      let totalCount = 0;
      let calculatedTotalPages = 1;

      if (Array.isArray(data)) {
        rawInquiries = data;
        const filtered = rawInquiries.map(item => {
          const locationVal = item.location || '';
          const hasPrefix = locationVal.includes(':');
          const contactCompany = hasPrefix ? locationVal.split(':')[0] : (item.company_name || item.company || 'wysele');
          const cleanLocation = hasPrefix ? locationVal.split(':').slice(1).join(':') : locationVal;
          return {
            ...item,
            company_name: contactCompany,
            company: contactCompany,
            location: cleanLocation
          };
        }).filter(item => {
          if (item.company_name.toLowerCase() !== activeCompany.toLowerCase()) {
            return false;
          }
          const searchStr = searchTerm.toLowerCase();
          const fullName = item.full_name || item.fullName || '';
          const email = item.email || item.emailAddress || '';
          return (
            fullName.toLowerCase().includes(searchStr) ||
            email.toLowerCase().includes(searchStr) ||
            item.location?.toLowerCase().includes(searchStr) ||
            item.message?.toLowerCase().includes(searchStr)
          );
        });
        totalCount = filtered.length;
        calculatedTotalPages = Math.ceil(totalCount / limit) || 1;
        const startIndex = (currentPage - 1) * limit;
        rawInquiries = filtered.slice(startIndex, startIndex + limit);
      } else {
        if (data.results && Array.isArray(data.results)) rawInquiries = data.results;
        else if (data.data && Array.isArray(data.data)) rawInquiries = data.data;
        else if (data.contacts && Array.isArray(data.contacts)) rawInquiries = data.contacts;
        
        rawInquiries = rawInquiries.map(item => {
          const locationVal = item.location || '';
          const hasPrefix = locationVal.includes(':');
          const contactCompany = hasPrefix ? locationVal.split(':')[0] : (item.company_name || item.company || 'wysele');
          const cleanLocation = hasPrefix ? locationVal.split(':').slice(1).join(':') : locationVal;
          return {
            ...item,
            company_name: contactCompany,
            company: contactCompany,
            location: cleanLocation
          };
        });

        const filtered = rawInquiries.filter(item => 
          item.company_name.toLowerCase() === activeCompany.toLowerCase()
        );

        totalCount = data.count || data.total || data.totalItems || filtered.length;
        calculatedTotalPages = data.totalPages || data.pages || Math.ceil(totalCount / limit) || 1;

        rawInquiries = filtered;
        if (rawInquiries.length > limit) {
          const startIndex = (currentPage - 1) * limit;
          rawInquiries = rawInquiries.slice(startIndex, startIndex + limit);
        }
      }

      setInquiries(rawInquiries);
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      showToast('Failed to load contact inquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, activeCompany, searchTerm, showToast]);



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

  const filteredInquiries = inquiries;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Contact Inquiries</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Manage and respond to contact requests from the website.</p>
          </div>
        </div>



        {/* Search & Export Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search contacts or messages..."
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
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading inquiries...</p>
                </div>
              </div>
            )}
            
            <table className="w-full text-left">
              <thead className="bg-blue-200 text-blue-900">
                <tr>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Name</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Email</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Mobile Number</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center">Location</th>
                  <th className="px-4 py-2 text-[11px] font-semibold text-blue-900 capitalize tracking-wider text-center w-1/4">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((item) => (
                    <tr key={item._id || item.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 text-center">
                        <p className="text-sm font-bold text-gray-900 capitalize">
                          {item.full_name || item.fullName || 'N/A'}
                        </p>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                          <Mail size={12} className="text-gray-400" />
                          {item.email || item.emailAddress || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                          <Phone size={12} className="text-gray-400" />
                          {item.phone_number || item.phoneNumber || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-xs font-bold text-gray-600">
                          {item.location || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <p className="text-xs text-gray-500 line-clamp-2 max-w-xs mx-auto">
                          {item.message}
                        </p>
                      </td>

                    </tr>
                  ))
                ) : !loading && (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                      No inquiries found
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


      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
