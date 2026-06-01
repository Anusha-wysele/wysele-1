import {
  Briefcase,
  Download,
  Filter,
  Mail,
  Phone,
  Search,
  UserSquare2
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import EditPermissionsModal from '../../components/Admin/EditPermissionsModal';
import { useToast } from '../../components/Admin/ToastContext';
import employeeService from '../../services/employeeService';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const { showToast } = useToast();

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await employeeService.getAllEmployees();
      setEmployees(data.employees || data.data || data || []);
    } catch (err) {
      showToast('Failed to load employees.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEmployees();

    const handleRefresh = () => {
      console.log('🔄 Refreshing employee list...');
      fetchEmployees();
    };

    window.addEventListener('employeeRegistered', handleRefresh);
    return () => window.removeEventListener('employeeRegistered', handleRefresh);
  }, [fetchEmployees]);

  const handleEditPermissions = (emp) => {
    setSelectedEmployee(emp);
    setIsPermissionsModalOpen(true);
  };

  const filteredEmployees = employees.filter(emp => 
    `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (filteredEmployees.length === 0) return;

    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Employee ID', 'Role', 'Status'];
    const csvRows = filteredEmployees.map(emp => [
      `"${(emp.first_name || '').replace(/"/g, '""')}"`,
      `"${(emp.last_name || '').replace(/"/g, '""')}"`,
      `"${emp.email || ''}"`,
      `"${emp.phone_number || ''}"`,
      `"${emp.employee_id || ''}"`,
      `"${emp.role || ''}"`,
      `"${emp.is_active ? 'Active' : 'Inactive'}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#800000] capitalize font-semibold font-sans">Employee Directory</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Manage and monitor internal staff access.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-none text-[10px] font-black text-gray-900 hover:bg-gray-50 transition-all shadow-sm tracking-widest"
             >
              <Download size={16} />
              EXPORT 
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Staff', value: employees.length.toString(), icon: UserSquare2, color: 'text-crimson-600', bg: 'bg-crimson-50' },
            { label: 'Active Roles', value: new Set(employees.map(e => e.role)).size.toString(), icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Departments', value: '0', icon: Filter, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-none bg-white border border-gray-100 flex items-center gap-5 shadow-sm">
              <div className={`w-12 h-12 rounded-none  ${stat.color} flex items-center justify-center`}>
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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search by name, email or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-none border border-gray-100 bg-gray-50 text-sm focus:bg-white   outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="responsive-table-container min-h-[300px] relative">
            {loading ? (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading staff directory...</p>
                </div>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#800000] text-white">
                  <tr>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Employee</th>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Id</th>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Role</th>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Contact</th>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Permissions</th>
                    <th className="px-6 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Access Panel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp._id || emp.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-center">
                          <p className="text-sm font-bold text-gray-900 capitalize">{emp.first_name} {emp.last_name}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs font-bold text-gray-600">{emp.employee_id}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full uppercase tracking-wider">
                            {emp.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Mail size={12} /> {emp.email}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Phone size={12} /> {emp.phone_number}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {(() => {
                            const activeCount = [
                              emp.can_post_blog, 
                              emp.can_edit_blog, 
                              emp.can_delete_blog, 
                              emp.can_post_job, 
                              emp.can_access_contact, 
                              emp.can_access_consulting
                            ].filter(Boolean).length;

                            return activeCount > 0 ? (
                              <span className="text-xs font-bold text-gray-700">{activeCount}</span>
                            ) : (
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No access</span>
                            );
                          })()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handleEditPermissions(emp)}
                            className="text-xs font-semibold text-gray-900 hover:text-blue-400 hover:underline hover:decoration-[2px] transition-all"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        No staff members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <EditPermissionsModal 
          isOpen={isPermissionsModalOpen}
          onClose={() => {
            setIsPermissionsModalOpen(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          onUpdate={fetchEmployees}
        />


      </div>
    </AdminLayout>
  );
};

export default Employees;
