import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router-dom';

import Routers from '@/routers';
import '@/assets/globalStyle.scss';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = { token: { colorPrimary: '#00b96b' } };

// 渲染
root.render(
    <Provider>
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </ConfigProvider>
    </Provider>
);
