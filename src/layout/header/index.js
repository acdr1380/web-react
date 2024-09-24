import React from 'react';
import { Layout, Button } from 'antd';
import { useAtom, useSetAtom } from 'jotai';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { collapsedAtom, countAtom } from '../storage';

export default function Header(props) {
    const { themToken = {} } = props;
    const [collapsed, setCollapsed] = useAtom(collapsedAtom);
    const setCount = useSetAtom(countAtom);

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
            <Button children="点击加1" onClick={() => setCount(count => count + 1)} />
        </Layout.Header>
    );
}
