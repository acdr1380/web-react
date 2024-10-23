import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import tools from '@/utils/tools';

const key = 'id';
const parentKey = 'parentid';

/**
 * 菜单列表
 */
export default function Sider() {
    // 菜单列表
    const menuList = useSelector(state => state.global.menus);

    const items = useMemo(() => {
        const l = menuList.map(item => ({
            label: item.Title,
            key: item.Code,
            url: item.Url,
            id: item.Id,
            parentid: item.ParentId,
        }));

        return tools.buildTree(l, key, parentKey);
    }, [menuList]);

    const handleMenus = e => {
        console.log(e);
    };

    return (
        <Layout.Sider trigger={null} collapsible collapsed={false}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={handleMenus} />
        </Layout.Sider>
    );
}
