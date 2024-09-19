import React from 'react';
import { Layout } from 'antd';

const { Sider, Content, Header } = Layout;
export default function layout() {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>Content</Content>
            </Layout>
        </Layout>
    );
}
