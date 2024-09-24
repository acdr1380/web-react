import React from 'react';
import { Layout, Menu } from 'antd';
import { useAtomValue } from 'jotai';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

import { collapsedAtom, countAtom } from '../storage';

export default function Sider() {
    const collapsed = useAtomValue(collapsedAtom);

    const count = useAtomValue(countAtom);

    const items = React.useMemo(() => {
        return new Array(count).fill(null).map((_, i) => {
            const icon = i === 1 ? <UserOutlined /> : i % 2 === 0 ? <VideoCameraOutlined /> : <UploadOutlined />;
            return {
                key: i,
                icon: icon,
                label: `nav ${i}`,
            };
        });
    }, [count]);

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Layout.Sider>
    );
}
