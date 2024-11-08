import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import Routers from '@/routers';
import '@/assets/globalStyle.scss';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = {
    token: {
        colorPrimary: '#1890ff',
    },
    components: {
        Layout: {
            headerBg: '#fff',
            headerPadding: 0,
            headerHeight: '60px',
        },
    },
};

// 渲染
root.render(
    <ConfigProvider theme={theme} locale={zhCN}>
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </ConfigProvider>
);
