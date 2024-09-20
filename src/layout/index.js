import React from 'react';
import { Layout } from 'antd';
import { useUserInfo } from '@/hooks';

const { Sider, Content, Header } = Layout;
function Index() {
    const userInfo = useUserInfo();
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
