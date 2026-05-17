import api from './api';

/**
 * Blog Service for interacting with /api/v1/blogs/
 */
const blogService = {
  /**
   * Fetch all blog posts
   * GET /api/v1/blogs/
   */
  getAllBlogs: async (params = {}) => {
    const response = await api.get('/blogs/', { params });
    return response.data;
  },

  /**
   * Get a single blog by ID
   * GET /api/v1/blogs/{blog_id}/
   */
  getBlogById: async (blogId) => {
    try {
      const response = await api.get(`/blogs/${blogId}/`);
      return response.data;
    } catch (error) {
      if (error.status === 404 || error.message.includes('404')) {
        const response = await api.get(`/blogs/${blogId}`);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Create a new blog post
   * POST /api/v1/blogs/
   */
  createBlog: async (blogData) => {
    try {
      const response = await api.post('/blogs/', blogData);
      return response.data;
    } catch (error) {
      if (error.message.includes('400') || error.message.includes('404')) {
        const response = await api.post('/blogs', blogData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Update an existing blog
   * PUT /api/v1/blogs/{blog_id}/
   */
  updateBlog: async (blogId, blogData) => {
    try {
      const response = await api.put(`/blogs/${blogId}/`, blogData);
      return response.data;
    } catch (error) {
      if (error.status === 404 || error.message.includes('404')) {
        const response = await api.put(`/blogs/${blogId}`, blogData);
        return response.data;
      }
      throw error;
    }
  },

  /**
   * Delete a blog post
   * DELETE /api/v1/blogs/{blog_id}/
   */
  deleteBlog: async (blogId) => {
    if (!blogId) {
      console.error('Delete Error: No Blog ID provided');
      throw new Error('No Blog ID provided');
    }
    try {
      // Attempt 1: With trailing slash (standard for this API)
      const response = await api.delete(`/blogs/${blogId}/`);
      return response.data;
    } catch (error) {
      // Check for 404 via the status property or the message
      if (error.status === 404 || error.message.includes('404')) {
        console.warn(`Initial delete attempt for blog ${blogId} failed with 404, trying without trailing slash...`);
        const response = await api.delete(`/blogs/${blogId}`);
        return response.data;
      }
      throw error;
    }
  }
};

export default blogService;
