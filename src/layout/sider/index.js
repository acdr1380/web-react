import React, { useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import tools from '@/utils/tools';
import global from '@/utils/globalStore';
import store from '../store';

const key = 'id';
const parentKey = 'parentid';

/**
 * 菜单列表
 */
export default observer(function (props) {
    // 菜单列表
    const menuList = global.menus;

    const navigate = useNavigate();

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

    const handleMenus = ({ key }) => {
        navigate(key);
    };

    return (
        <Layout.Sider trigger={null} collapsible collapsed={store.collapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} items={items} onClick={handleMenus} />
        </Layout.Sider>
    );
});
