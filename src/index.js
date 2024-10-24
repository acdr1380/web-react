import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import Routers from '@/routers';
import globalStore from '@/utils/globalStore';
import '@/assets/globalStyle.scss';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = {
    token: {},
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
        <Provider store={globalStore}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </Provider>
    </ConfigProvider>
);
