/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { selectCurrentUser } from '../redux/feature/auth/authSlice';
import { useAppSelector } from '../redux/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
  userOnly?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserProtecedRoute = ({ children, userOnly = false }: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const token = localStorage.getItem('accessToken');

  // Check if the user is logged in
  if (!token) {
    console.log('No token found. Redirecting to login page...');
    return <Navigate to="/login" replace={true} />;
  }

  // Check if the route is admin-only and the user is not an admin
  if (userOnly && user?.role !== 'user') {
    console.log('User is not an admin. Redirecting to home page...');
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default UserProtecedRoute;
