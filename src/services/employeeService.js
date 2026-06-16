import api from './api';

const employeeService = {
  /**
   * Register a new employee (Super Admin only)
   * POST /api/v1/auth/register
   */
  registerEmployee: async (employeeData) => {
    const response = await api.post('/auth/register', employeeData);
    return response.data || response;
  },

  /**
   * Get all employees/admins
   * GET /api/v1/admins/
   */
  getAllEmployees: async (params = {}) => {
    const response = await api.get('/admins/', { params });
    const resData = response.data || response;
    const employees = resData.employees || resData.data || (Array.isArray(resData) ? resData : []);
    return { employees };
  },

  /**
   * Update an employee
   * PUT /api/v1/admins/{id}
   */
  updateEmployee: async (id, data) => {
    const response = await api.put(`/admins/${id}`, data);
    return response.data;
  },

  /**
   * Update employee permissions
   * PATCH /api/v1/admins/{user_id}/permissions
   */
  updatePermissions: async (id, permissions) => {
    const response = await api.patch(`/admins/${id}/permissions`, permissions);
    return response.data;
  },

  /**
   * Toggle employee status (Active/Inactive)
   * PATCH /api/v1/admins/{user_id}/status?is_active={bool}
   */
  toggleStatus: async (id, isActive) => {
    const response = await api.patch(`/admins/${id}/status`, null, {
      params: { is_active: isActive }
    });
    return response.data;
  },

  /**
   * Delete an employee
   * DELETE /api/v1/admins/{id}
   */
  deleteEmployee: async (id) => {
    const response = await api.delete(`/admins/${id}`);
    return response.data;
  }
};

export default employeeService;
