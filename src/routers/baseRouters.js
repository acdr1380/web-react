import { Navigate } from 'react-router-dom';
import { ProtectedRouteComponent, LoginComponent } from '@/components';
import Layout from '@/layout/index';

// 基础路由
const router = [
    {
        path: '/app',
        element: (
            <ProtectedRouteComponent>
                <Layout />
            </ProtectedRouteComponent>
        ),
        children: [],
    },
    { path: '/login', element: <LoginComponent /> },
    { path: '*', element: <Navigate to="/login" /> },
];
export default router;
