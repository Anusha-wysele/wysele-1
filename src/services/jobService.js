import api from './api';

/**
 * Job Service for interacting with /api/v1/jobs/
 */
const jobService = {
  /**
   * Fetch all job postings
   * GET /api/v1/jobs/
   */
  getAllJobs: async (params = {}) => {
    const response = await api.get('/jobs/', { params });
    return response.data;
  },

  /**
   * Search for jobs based on query
   * GET /api/v1/jobs/search?q=...
   */
  searchJobs: async (query) => {
    const response = await api.get('/jobs/search', { 
      params: { 
        q: query,
        query: query 
      } 
    });
    return response.data;
  },

  /**
   * Get a single job by ID
   * GET /api/v1/jobs/{job_id}/
   */
  getJobById: async (jobId) => {
    try {
      const response = await api.get(`/jobs/${jobId}/`);
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.get(`/jobs/${jobId}`);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Create a new job posting
   * POST /api/v1/jobs/
   */
  createJob: async (jobData) => {
    try {
      const response = await api.post('/jobs/', jobData);
      return response.data;
    } catch (error) {
      if (error.message.includes('400') || error.message.includes('404')) {
        const response = await api.post('/jobs', jobData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Update an existing job
   * PUT /api/v1/jobs/{job_id}
   */
  updateJob: async (jobId, jobData) => {
    try {
      const response = await api.put(`/jobs/${jobId}/`, jobData);
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.put(`/jobs/${jobId}`, jobData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Delete a job posting
   * DELETE /api/v1/jobs/{job_id}/
   */
  deleteJob: async (jobId) => {
    if (!jobId) {
      console.error('Delete Error: No Job ID provided');
      throw new Error('No Job ID provided');
    }
    try {
      const response = await api.delete(`/jobs/${jobId}/`);
      return response.data;
    } catch (error) {
      if (error.status === 404 || error.status === 405 || error.message.includes('404') || error.message.includes('405')) {
        const response = await api.delete(`/jobs/${jobId}`);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Apply for a specific job
   * POST /api/v1/jobs/{job_id}/apply/
   */
  /**
   * Apply for a specific job
   * POST /api/v1/jobs/apply/
   * Note: jobId is passed in the applicantData FormData
   */
  applyForJob: async (applicantData, otp) => {
    try {
      const response = await api.post(`/jobs/apply?otp=${otp}`, applicantData);
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.post(`/jobs/apply/?otp=${otp}`, applicantData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Get all applications for a specific job
   * GET /api/v1/jobs/{job_id}/applications
   */
  getJobApplications: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/applications`);
    return response.data;
  },
  /**
   * Send OTP to candidate's email
   * POST /api/v1/jobs/send-otp
   */
  sendOtp: async (email) => {
    const response = await api.post('/jobs/send-otp', { email });
    return response.data;
  },

  /**
   * Verify candidate's OTP
   * POST /api/v1/jobs/verify-otp
   */
  verifyOtp: async (email, otp) => {
    const response = await api.post('/jobs/verify-otp', { email, otp });
    return response.data;
  },
  /**
   * Get ALL job applications across all jobs
   * GET /api/v1/applications/
   */
  getAllApplications: async () => {
    try {
      // Try Pattern 1: /applications/
      const response = await api.get('/applications/');
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        // Fallback: Some backends use /jobs/applications
        const response = await api.get('/jobs/applications');
        return response.data;
      }
      throw error;
    }
  },


  // --- Contact Inquiry APIs ---
  
  /**
   * Submit a contact inquiry
   * POST /api/v1/contact/
   */
  createContact: async (contactData) => {
    try {
      const response = await api.post('/contact/', contactData);
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.post('/contact', contactData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Get all contact inquiries
   * GET /api/v1/contact/all
   */
  getAllContacts: async (params = {}) => {
    try {
      const response = await api.get('/contact/all', { params });
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.get('/contact/', { params });
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Delete a contact inquiry
   * DELETE /api/v1/contact/{inquiry_id}
   */
  deleteContact: async (inquiryId) => {
    try {
      // Attempt 1: Without trailing slash
      const response = await api.delete(`/contact/${inquiryId}`);
      return response.data;
    } catch (error) {
      // If 404 or 405, try with trailing slash
      if (error.status === 404 || error.status === 405 || error.message.includes('404') || error.message.includes('405')) {
        const response = await api.delete(`/contact/${inquiryId}/`);
        return response.data;
      }
      throw error;
    }
  },

  // --- Consulting APIs ---

  /**
   * Send OTP for consultation verification
   * POST /api/v1/consulting/send-otp
   */
  sendConsultingOtp: async (mobileNumber, email) => {
    const response = await api.post('/consulting/send-otp', { 
      mobile_number: mobileNumber,
      email: email 
    });
    return response.data;
  },

  /**
   * Verify OTP for consultation
   * POST /api/v1/consulting/verify-otp
   */
  verifyConsultingOtp: async (mobileNumber, email, otp) => {
    // Backend strictly requires 'otp' as a STRING
    const response = await api.post('/consulting/verify-otp', { 
      mobile_number: mobileNumber,
      email: email, 
      otp: String(otp).trim() 
    });
    return response.data;
  },

  /**
   * Submit a consultation request
   * POST /api/v1/consulting/submit
   */
  submitConsultation: async (consultingData) => {
    const response = await api.post('/consulting/submit', consultingData);
    return response.data;
  },

  /**
   * Get all consultation requests
   * GET /api/v1/consulting/
   */
  getAllConsultations: async (params = {}) => {
    try {
      const response = await api.get('/consulting/', { params });
      return response.data;
    } catch (error) {
      if (error.message.includes('404')) {
        const response = await api.get('/consulting', { params });
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Delete a consultation request
   * DELETE /api/v1/consulting/{id}
   */
  deleteConsultation: async (id) => {
    try {
      // Attempt 1: Without trailing slash
      const response = await api.delete(`/consulting/${id}`);
      return response.data;
    } catch (error) {
      // If 404 or 405, try with trailing slash
      if (error.status === 404 || error.status === 405 || error.message.includes('404') || error.message.includes('405')) {
        const response = await api.delete(`/consulting/${id}/`);
        return response.data;
      }
      throw error;
    }
  },
  /**
   * Global Search across all modules
   * GET /api/v1/search/?q=...
   */
  globalSearch: async (query) => {
    const response = await api.get('/search/', { params: { q: query } });
    return response.data;
  }
};

export default jobService;
