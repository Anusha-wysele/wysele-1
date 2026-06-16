import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import { showToast } from '../components/Admin/ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    if (user) {
      let loginTime = localStorage.getItem('login_timestamp');
      if (!loginTime) {
        loginTime = Date.now().toString();
        localStorage.setItem('login_timestamp', loginTime);
      }

      const elapsed = Date.now() - parseInt(loginTime);
      const sessionTimeoutDuration = 60 * 60 * 1000; // 60 minutes
      const remainingTime = Math.max(sessionTimeoutDuration - elapsed, 0);

      console.log(`⏰ Proactive logout timer starting. Remaining session time: ${Math.round(remainingTime / 1000)} seconds.`);

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      const timer = setTimeout(() => {
        console.log('⏰ Session expired proactively. Logging out.');
        showToast('Your session has expired. Please log in again.', 'error');
        setTimeout(() => {
          logout();
        }, 2000);
      }, remainingTime);

      setLogoutTimer(timer);

      return () => {
        clearTimeout(timer);
      };
    } else {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
      localStorage.removeItem('login_timestamp');
    }
  }, [user]);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        setUser(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('login_timestamp');
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getCurrentUser();
        const finalUser = userData.user || userData.data || userData;
        if (finalUser && finalUser.role) {
          finalUser.role = finalUser.role.toUpperCase();
        }
        console.log('DEBUG: User Profile Loaded:', finalUser);
        setUser(finalUser);
        localStorage.setItem('admin_user', JSON.stringify(finalUser));
      } catch (error) {
        console.error('Session verification failed, clearing session:', error);
        setUser(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
        localStorage.removeItem('login_timestamp');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const userData = data.user || data.data || data;
      if (userData && userData.role) {
        userData.role = userData.role.toUpperCase();
      }
      setUser(userData);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      // Capture the token correctly (supporting both 'token' and 'access_token')
      const token = data.access_token || data.token || userData.access_token || userData.token;
      if (token) {
        localStorage.setItem('admin_token', token);
      }
      localStorage.setItem('login_timestamp', Date.now().toString());
      return userData;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error(error.message || 'Invalid email or password. Please try again.');
    }
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
      localStorage.removeItem('login_timestamp');
      window.location.href = '/masterlogin';
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
