import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const userData = await authService.getCurrentUser();
        const finalUser = userData.user || userData.data || userData;
        console.log('DEBUG: User Profile Loaded:', finalUser);
        setUser(finalUser);
        localStorage.setItem('admin_user', JSON.stringify(finalUser));
      } catch (error) {
        console.error('Session verification failed:', error);
        setUser(null);
        localStorage.removeItem('admin_user');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const userData = data.user || data.data || data;
    setUser(userData);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    
    // Capture the token correctly (supporting both 'token' and 'access_token')
    const token = data.access_token || data.token || userData.access_token || userData.token;
    if (token) {
      localStorage.setItem('admin_token', token);
    }
    return userData;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
