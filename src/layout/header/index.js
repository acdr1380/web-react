import React from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

/**
 * 顶部导航
 */
export default function Header(props) {
    return (
        <Layout.Header style={{ padding: 0 }}>
            <Button
                type="text"
                icon={false ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Layout.Header>
    );
}
