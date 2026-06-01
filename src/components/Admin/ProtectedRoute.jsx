import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-crimson-100 border-t-crimson-600 rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but save the current location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(user?.role?.toUpperCase())) {
    console.warn(`Access denied for role: ${user?.role}. Required roles: ${allowedRoles}`);
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
