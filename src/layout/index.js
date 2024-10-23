import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

import Header from './header';
import Sider from './sider';

const { Content } = Layout;

function Index() {
    const { token: themToken } = theme.useToken();

    return (
        <Layout>
            <Sider themToken={themToken} />
            <Layout>
                <Header themToken={themToken} />
                <Content style={{ margin: 12, padding: 12 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
export default Index;
