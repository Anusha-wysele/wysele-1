import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#800000] border-t-[#ffcc00] rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the current location
    return <Navigate to="/masterlogin" state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles) {
    const userRoleRaw = user?.role?.toUpperCase() || '';
    const userRole = (userRoleRaw === 'SUPERADMIN' || userRoleRaw === 'SUPER_ADMIN') ? 'SUPER_ADMIN' : userRoleRaw;
    const cleanAllowedRoles = allowedRoles.map(role => {
      const r = role.toUpperCase();
      return (r === 'SUPERADMIN' || r === 'SUPER_ADMIN') ? 'SUPER_ADMIN' : r;
    });
    
    if (!cleanAllowedRoles.includes(userRole)) {
      console.warn(`Access denied for role: ${userRole}. Required roles: ${cleanAllowedRoles}`);
      if (userRole === 'SUPER_ADMIN') {
        return <Navigate to="/superadmin/dashboard" replace />;
      }
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
