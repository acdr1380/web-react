import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginComponent, ProtectedRouteComponent } from '@/components';
import Layout from '@/layout/index';

// 配置路由，目前写死路由，后续优化

export const router = createBrowserRouter([
    { path: '/login', element: <LoginComponent /> },
    {
        path: '/app',
        element: (
            <ProtectedRouteComponent>
                <Layout />
            </ProtectedRouteComponent>
        ),
    },
    { path: '*', element: <Navigate to="/login" /> },
]);
