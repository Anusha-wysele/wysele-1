import {
  Download,
  Mail,
  Phone,
  Search,
  Pencil,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { useToast } from '../../components/Admin/ToastContext';
import employeeService from '../../services/employeeService';
import EditEmployeeModal from '../../components/Admin/EditEmployeeModal';
import EditPermissionsModal from '../../components/Admin/EditPermissionsModal';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleOpenEdit = (emp) => {
    setSelectedEmployee(emp);
    setIsEditModalOpen(true);
  };

  const handleOpenPermissions = (emp) => {
    setSelectedEmployee(emp);
    setIsPermissionsModalOpen(true);
  };

  const handleToggleStatus = async (emp) => {
    const originalIsActive = emp.is_active ?? true;
    const newIsActive = !originalIsActive;

    // Optimistically update local UI state immediately
    setEmployees(prev => 
      prev.map(e => (emp.id !== undefined ? e.id === emp.id : e._id === emp._id) ? { ...e, is_active: newIsActive } : e)
    );

    try {
      await employeeService.toggleStatus(emp._id || emp.id, newIsActive);
      showToast(
        `Employee access ${newIsActive ? 'activated' : 'deactivated'} successfully!`,
        'success'
      );
    } catch (err) {
      // Revert back on failure
      setEmployees(prev => 
        prev.map(e => (emp.id !== undefined ? e.id === emp.id : e._id === emp._id) ? { ...e, is_active: originalIsActive } : e)
      );
      showToast(err.message || 'Failed to toggle status.', 'error');
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const fullName = emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`;
    const empId = emp.emp_id || emp.employee_id || '';
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const exportToCSV = () => {
    if (filteredEmployees.length === 0) return;

    const headers = ['Name', 'Email', 'Phone', 'Employee ID', 'Role', 'Status'];
    const csvRows = filteredEmployees.map(emp => {
      const name = emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim();
      return [
        `"${(name || '').replace(/"/g, '""')}"`,
        `"${emp.email || ''}"`,
        `"${emp.phone_number || ''}"`,
        `"${emp.emp_id || emp.employee_id || ''}"`,
        `"${emp.role || ''}"`,
        `"${(emp.is_active ?? true) ? 'Active' : 'Inactive'}"`
      ];
    });

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
            <h1 className="text-lg tracking-normal text-[#005A9E] capitalize font-inter font-semibold">Employee Directory</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">Manage and monitor internal staff access.</p>
          </div>
        </div>

        {/* Toolbar Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-[#005A9E] outline-none transition-all"
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#005A9E] text-white rounded-lg font-semibold text-xs hover:bg-[#004b85] hover:text-white transition-all shadow-sm"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="responsive-table-container min-h-[300px] relative overflow-x-auto">
            {loading ? (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 mt-20">
                  <Loader2 className="animate-spin text-[#005A9E]" size={36} />
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading staff directory...</p>
                </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-blue-200 text-blue-900">
                  <tr>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Employee</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Id</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Role</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Email</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Mobile Number</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Status</th>
                    <th className="px-4 py-3 text-[11px] font-semibold capitalize tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp._id || emp.id} className="group hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-center">
                          <p className="text-sm font-bold text-gray-900 capitalize">
                            {emp.name || `${emp.first_name || ''} ${emp.last_name || ''}`.trim() || 'N/A'}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-xs font-bold text-gray-600">
                            {emp.emp_id || emp.employee_id || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full uppercase tracking-wider">
                            {emp.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                            <Mail size={12} /> {emp.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                            <Phone size={12} /> {emp.phone_number || 'N/A'}
                          </div>
                        </td>
                        {/* Status Toggle switch */}
                        <td className="px-4 py-3 text-center">
                          {emp.role?.toUpperCase() === 'SUPER_ADMIN' || emp.role?.toUpperCase() === 'SUPERADMIN' ? (
                            <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              Always Active
                            </span>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(emp)}
                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-sm ${
                                  (emp.is_active ?? true) ? 'bg-green-600' : 'bg-red-600'
                                }`}
                                title={(emp.is_active ?? true) ? 'Deactivate Employee' : 'Activate Employee'}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                                    (emp.is_active ?? true) ? 'translate-x-4' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                              <span className={`text-[9px] font-black uppercase tracking-wider ${
                                (emp.is_active ?? true) ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {(emp.is_active ?? true) ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          )}
                        </td>
                        {/* Actions column */}
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="p-1.5 text-gray-500 hover:text-[#005A9E] hover:bg-gray-100 rounded-lg transition-all"
                              title="Edit Profile"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleOpenPermissions(emp)}
                              className="p-1.5 text-gray-500 hover:text-blue-650 hover:bg-blue-50 rounded-lg transition-all"
                              title="Access Control Permissions"
                            >
                              <ShieldCheck size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                        No staff members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modals */}
        <EditEmployeeModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          employee={selectedEmployee}
          onSuccess={fetchEmployees}
        />

        <EditPermissionsModal 
          isOpen={isPermissionsModalOpen}
          onClose={() => setIsPermissionsModalOpen(false)}
          employee={selectedEmployee}
          onUpdate={fetchEmployees}
        />

      </div>
    </AdminLayout>
  );
};

export default Employees;
