import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/feature/auth/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const token = localStorage.getItem('accessToken');

  // Check if the user is logged in
  if (!token) {
    console.log('No token found. Redirecting to login page...');
    return <Navigate to="/login" replace={true} />;
  }

  // Check if the route is admin-only and the user is not an admin
  if (adminOnly && user?.role !== 'admin') {
    console.log('User is not an admin. Redirecting to home page...');
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
