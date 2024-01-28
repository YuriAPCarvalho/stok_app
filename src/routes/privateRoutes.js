import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoutes({ children }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
}
