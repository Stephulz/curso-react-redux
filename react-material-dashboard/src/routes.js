import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import TarefasListView from 'src/views/customer/TarefasListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'tarefas', element: <TarefasListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Link to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Link to="/app/dashboard" /> },
      { path: '*', element: <Link to="/404" /> }
    ]
  }
];

export default routes;
