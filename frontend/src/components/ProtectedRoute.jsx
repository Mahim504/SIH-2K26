import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, ROLE_DEFAULT_ROUTES } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    const defaultRoute = (role && ROLE_DEFAULT_ROUTES[role]) || '/control-tower';
    return <Navigate to={defaultRoute} replace />;
  }

  return children;
}
