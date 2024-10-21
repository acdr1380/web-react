import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';

import { useUserInfo } from '@/hooks';
import request from '@/utils/request';
import Header from './header';
import Sider from './sider';

import store from './store';

const { Content } = Layout;

function Index() {
    const [userInfo] = useUserInfo();

    const { token: themToken } = theme.useToken();

    useEffect(() => {
        request.get('system/menu').then(({ success, data }) => {
            if (success) {
                // setMenuList([{ title: '首页', path: '', url: '@/views/systemManagement/userManagement/index.js' }]);
                // setMenuList(data.map(item => ({ ...item, label: item.Title, key: item.Id, url: item.Url })));
            }
        });
    }, []);

    return (
        <Provider store={store}>
            <Layout>
                <Sider themToken={themToken} />
                <Layout>
                    <Header themToken={themToken} />
                    <Content style={{ margin: 12, padding: 12 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Provider>
    );
}
export default Index;
