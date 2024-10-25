import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import { useUserInfo } from '@/hooks';
import tools from '@/utils/tools';
import request from '@/utils/request';
import LoadingComponent from '@/components/LoadingComponent';

import Header from './header';
import Sider from './sider';

const { Content } = Layout;

function Index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useUserInfo();
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
                        dispatch({ type: 'global/setMenus', payload: data });

                        navigate('home');
                    }
                })
                .catch(() => setLoading(false));
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
                <Content style={{ margin: 12, padding: 10 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
export default Index;
