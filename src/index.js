import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import Routers from '@/routers';
import '@/assets/globalStyle.scss';

// 挂载根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// antd 配置主题
const theme = {
    token: {
        padding: 10,
        paddingLG: 10,
        paddingXS: 10,
        colorText: '#000',
        borderRadius: 3,
    },
    components: {
        Layout: {
            headerBg: '#fff',
            headerPadding: 0,
            headerHeight: '60px',
        },
        Drawer: {
            footerPaddingBlock: 10,
        },
    },
};

// 渲染
root.render(
    <ConfigProvider
        // table={{
        //     expandable: {
        //         expandIcon: ({ expanded, onExpand, record }) =>
        //             expanded && record.chidlren ? (
        //                 <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
        //             ) : (
        //                 <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
        //             ),
        //     },
        // }}
        form={{
            validateMessages: { required: '${label}是必填项' },
        }}
        theme={theme}
        locale={zhCN}
    >
        <BrowserRouter>
            <Routers />
        </BrowserRouter>
    </ConfigProvider>
);
