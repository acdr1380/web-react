import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import { Provider } from 'jotai';

import { useUserInfo } from '@/hooks';
import request from '@/utils/request';
import Header from './header';
import Sider from './sider';

const { Content } = Layout;
function Index() {
    const userInfo = useUserInfo();
    const { token: themToken } = theme.useToken();

    useEffect(() => {
        request.get('system/user').then(({ success, data }) => {
            if (success) {
                console.log(data);
            }
        });
    }, []);

    return (
        <Provider>
            <Layout>
                <Sider themToken={themToken} />
                <Layout>
                    <Header themToken={themToken} />
                    <Content style={{ margin: 12, padding: 12 }}>{JSON.stringify(userInfo)}</Content>
                </Layout>
            </Layout>
        </Provider>
    );
}
export default Index;
