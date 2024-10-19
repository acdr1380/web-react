import React from 'react';
import { Layout, Menu } from 'antd';
import { useAtomValue } from 'jotai';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

import storage from '../storage';

export default function Sider() {
    const collapsed = useAtomValue(storage.collapsedAtom);

    const menuList = useAtomValue(storage.menuListAtom);

    const items = React.useMemo(() => {
        return menuList.map((_, i) => {
            const icon = i === 1 ? <UserOutlined /> : i % 2 === 0 ? <VideoCameraOutlined /> : <UploadOutlined />;
            return {
                key: i,
                icon: icon,
                label: `nav ${i}`,
            };
        });
    }, [menuList]);

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Layout.Sider>
    );
}
