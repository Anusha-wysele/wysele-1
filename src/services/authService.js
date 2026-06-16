import api from './api';

const authService = {
  /**
   * Login Super Admin or Employee
   * POST /api/v1/auth/login
   */
  login: async (email, password) => {
    // Switching back to clean JSON as per your initial requirement
    const response = await api.post('/auth/login', { 
      email, 
      password 
    }, {
      headers: { 'Authorization': '' } // Still clearing stale tokens
    });
    return response.data;
  },

  /**
   * Change password (especially for first-time login)
   * POST /api/v1/auth/change-password
   */
  changePassword: async (old_password, new_password) => {
    const response = await api.patch('/auth/change-password', { old_password, new_password });
    return response.data;
  },

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token'); // Keep for legacy if needed
    return response.data;
  },

  /**
   * Get current user profile (verify session)
   * GET /api/v1/auth/me
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Request password reset token/email
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password using token/OTP
   * POST /api/v1/auth/reset-password
   */
  resetPassword: async (token, new_password) => {
    const response = await api.post('/auth/reset-password', { token, new_password });
    return response.data;
  }
};

export default authService;
