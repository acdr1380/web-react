import React from 'react';
import { Navigate } from 'react-router-dom';
import { message } from 'antd';
import { useToken } from '@/hooks';

const ProtectedRoute = ({ children }) => {
    const [token] = useToken();

    /**
     * 这里可以添加自己的身份验证逻辑
     * 示例：检查本地存储的 token 是否存在
     * @returns
     */
    const isAuthenticated = () => {
        return !!token;
    };

    if (!isAuthenticated()) {
        message.warning('登录失效，请重新登录！');
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
