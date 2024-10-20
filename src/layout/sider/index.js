import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { useAtomValue } from 'jotai';
import tools from '@/utils/tools';

import storage from '../storage';

const key = 'Id';
const parentKey = 'ParentId';

export default function Sider() {
    const collapsed = useAtomValue(storage.collapsedAtom);

    // 菜单列表
    const menuList = useAtomValue(storage.menuListAtom);

    const items = useMemo(() => {
        return tools.buildTree(menuList, key, parentKey);
    }, [menuList]);

    return (
        <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Layout.Sider>
    );
}
