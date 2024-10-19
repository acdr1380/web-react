import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import { Provider, useSetAtom } from 'jotai';
import { Outlet } from 'react-router-dom';

import { useUserInfo } from '@/hooks';
import request from '@/utils/request';
import Header from './header';
import Sider from './sider';

import storage from './storage';
import tools from '@/utils/tools';

const { Content } = Layout;
const key = 'Id';
const parentKey = 'ParentId';
function Index() {
    const userInfo = useUserInfo();

    const { token: themToken } = theme.useToken();

    const setMenuList = useSetAtom(storage.menuListAtom);

    useEffect(() => {
        setTimeout(async () => {
            request.get('system/menu').then(({ success, data }) => {
                if (success) {
                    // console.log(tools.buildTree(data, key, parentKey));

                    setMenuList([{ title: '首页', path: '', url: '@/views/systemManagement/menuManagement/index.js' }]);
                    // setMenuList(data.map(item => ({ title: item.Title, key: item.Id, url: item.Url })));
                }
            });
        }, 500);
    }, []);

    return (
        <Provider>
            <Layout>
                <Sider themToken={themToken} />
                <Layout>
                    <Header themToken={themToken} />
                    <Content style={{ margin: 12, padding: 12 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Provider>
    );
}
export default Index;
