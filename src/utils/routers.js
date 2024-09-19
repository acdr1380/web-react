import { createBrowserRouter, Navigate } from 'react-router-dom';

import LoginComponent from '@/components/LoginComponents';
import Layout from '@/layout/index';

// 配置路由，目前写死路由，后续优化

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginComponent />,
    },
    { path: '/app', element: <Layout /> },
    { path: '*', element: <Navigate to="/login" /> },
]);
