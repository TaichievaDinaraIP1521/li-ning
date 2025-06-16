import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin } = useCart();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;