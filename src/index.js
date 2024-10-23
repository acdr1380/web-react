import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import Routers from '@/routers';
import globalStore from '@/utils/globalStore';
import '@/assets/globalStyle.scss';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = { token: { colorPrimary: '#00b96b' } };

// 渲染
root.render(
    <ConfigProvider theme={theme}>
        <Provider store={globalStore}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </Provider>
    </ConfigProvider>
);
