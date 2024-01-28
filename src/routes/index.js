// index.js
import { useRoutes, Navigate } from 'react-router-dom';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    LoginRoutes,
    MainRoutes
  ]);
}
