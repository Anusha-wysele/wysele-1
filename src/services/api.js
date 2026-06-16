import { showToast } from '../components/Admin/ToastContext';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://wysele-backend-three.vercel.app';
const API_PREFIX = '/api/v1';

/**
 * Enhanced fetch wrapper with auth and error handling
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('admin_token');
  
  const headers = {
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Automatic Content-Type handling:
  // 1. If FormData, browser handles it (boundary needed)
  // 2. If URLSearchParams, use application/x-www-form-urlencoded
  // 3. Otherwise default to application/json
  if (!headers['Content-Type']) {
    if (options.body instanceof URLSearchParams) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
  }

  const config = {
    ...options,
    credentials: 'include',
    headers,
  };

  try {
    let finalEndpoint = endpoint;
    const params = options.params;
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      finalEndpoint = endpoint.includes('?') ? `${endpoint}&${queryString}` : `${endpoint}?${queryString}`;
    }

    // Cleanly join URL parts to prevent double slashes
    const fullUrl = `${BASE_URL}${API_PREFIX}${finalEndpoint}`.replace(/([^:]\/)\/+/g, "$1");
    const response = await fetch(fullUrl, config);
    
    // Safely parse JSON or return text
    let data = {};
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { message: text };
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('login_timestamp');
        if (!window.location.pathname.startsWith('/masterlogin')) {
          showToast('Your session has expired. Please log in again.', 'error');
          setTimeout(() => {
            window.location.href = '/masterlogin';
          }, 2000);
        }
      }

      // Improved error reporting for validation failures
      let errorMessage = '';
      if (data.missing_or_invalid_fields && Array.isArray(data.missing_or_invalid_fields)) {
        errorMessage = data.missing_or_invalid_fields
          .map(f => {
            const cleanField = f.field
              .split('->')
              .map(part => part.trim().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
              .join(' -> ');
            
            if (f.message.toLowerCase() === 'field cannot be empty or only whitespace') {
              return `${cleanField} cannot be empty`;
            }
            return `${cleanField}: ${f.message}`;
          })
          .join(', ');
      } else {
        const errorDetail = data.detail;
        errorMessage = typeof errorDetail === 'object' 
          ? JSON.stringify(errorDetail) 
          : (errorDetail || data.message || `API Error: ${response.status}`);
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    return { data, status: response.status };
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

const api = {
  get: (url, config) => {
    return apiFetch(url, { method: 'GET', ...config });
  },
  
  post: (url, data, config) => {
    const body = (data instanceof FormData || data instanceof URLSearchParams) 
      ? data 
      : JSON.stringify(data);
    return apiFetch(url, { method: 'POST', body, ...config });
  },
  
  put: (url, data, config) => {
    const body = (data instanceof FormData || data instanceof URLSearchParams) 
      ? data 
      : JSON.stringify(data);
    return apiFetch(url, { method: 'PUT', body, ...config });
  },
  
  patch: (url, data, config) => {
    const body = (data instanceof FormData || data instanceof URLSearchParams) 
      ? data 
      : JSON.stringify(data);
    return apiFetch(url, { method: 'PATCH', body, ...config });
  },
  
  delete: (url, config) => {
    return apiFetch(url, { method: 'DELETE', ...config });
  }
};

export default api;
