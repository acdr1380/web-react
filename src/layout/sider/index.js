import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import tools from '@/utils/tools';

const key = 'Id';
const parentKey = 'ParentId';

/**
 * 菜单列表
 */
export default function Sider() {
    // 菜单列表
    const menuList = [];

    const items = useMemo(() => {
        return tools.buildTree(menuList, key, parentKey);
    }, [menuList]);

    return (
        <Layout.Sider trigger={null} collapsible collapsed={false}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Layout.Sider>
    );
}
