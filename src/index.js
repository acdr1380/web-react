import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from '@/utils/routers';
import '@/assets/globalStyle.scss';
import { Provider } from 'jotai';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = { token: { colorPrimary: '#00b96b' } };

// 渲染
root.render(
    <Provider>
        <ConfigProvider theme={theme}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </Provider>
);
