import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ role, children, redirectTo }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated || (role && userRole !== role)) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
