import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

export default AuthRoute;
