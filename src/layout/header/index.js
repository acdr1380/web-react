import React from 'react';
import { Layout, Button } from 'antd';
import { useAtom } from 'jotai';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import storage from '../storage';

export default function Header(props) {
    const { themToken = {} } = props;
    const [collapsed, setCollapsed] = useAtom(storage.collapsedAtom);

    return (
        <Layout.Header style={{ padding: 0, background: themToken.colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Layout.Header>
    );
}
