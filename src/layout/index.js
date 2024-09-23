import React, { useEffect } from 'react';
import { Layout } from 'antd';
import request from '@/utils/request';
import { useUserInfo } from '@/hooks';

const { Sider, Content, Header } = Layout;
function Index() {
    const userInfo = useUserInfo();

    useEffect(() => {
        request.get('system/user').then(({ success, data }) => {
            if (success) {
                console.log(data);
            }
        });
    }, []);

    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>{JSON.stringify(userInfo)}</Content>
            </Layout>
        </Layout>
    );
}
export default Index;
