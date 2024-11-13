import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout } from 'antd';

import { useUserInfo } from '@/hooks';
import tools from '@/utils/tools';
import request from '@/utils/request';
import global from '@/utils/globalStore';
import LoadingComponent from '@/components/LoadingComponent';

import Header from './header';
import Sider from './sider';

const { Content } = Layout;

export default observer(function () {
    const navigate = useNavigate();
    const [userInfo] = useUserInfo();
    const [loading, setLoading] = useState(false);

    // 当用户信息存在时，请求系统菜单数据并更新全局菜单列表
    useEffect(() => {
        if (!tools.isEmpty(userInfo)) {
            setLoading(true);
            request
                .get('/system/menu')
                .then(({ success, data }) => {
                    setLoading(false);
                    if (success) {
                        // 更新全局菜单列表
                        global.setMenus(data);
                        navigate('home');
                    }
                })
                .catch(() => setLoading(false));
        } else {
            navigate('/login');
        }
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    return (
        <Layout>
            <Sider />
            <Layout>
                <Header />
                <Content style={{ margin: 12, padding: 10, position: 'relative' }} id="layout-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
});
