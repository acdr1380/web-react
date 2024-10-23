import React, { useEffect, useState, useMemo } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import request from '@/utils/request';
import { useUserInfo } from '@/hooks';

import baseRouter from './baseRouters';
import LoadingComponent from '@/components/LoadingComponent';

// 批量导入页面
const modules = require.context('@/views', true, /\.js$/);

/**
 *  获取路由
 * @returns 路由
 */
function GetRoutes() {
    const dispatch = useDispatch();
    const userInfo = useUserInfo();
    const { menus: menuList } = useSelector(state => state.global);

    const [loading, setLoading] = useState(false);

    // 当用户信息存在时，请求系统菜单数据并更新全局菜单列表
    useEffect(() => {
        if (userInfo) {
            setLoading(true);

            request
                .get('/system/menu')
                .then(({ success, data }) => {
                    setLoading(false);
                    if (success) {
                        // 更新全局菜单列表
                        console.log(
                            dispatch({
                                type: 'global/setMenus',
                                payload: data,
                            })
                        );

                        // dispatch({
                        //     type: 'global/setMenus',
                        //     payload: data,
                        // }).then(res => console.log(res));
                    }
                })
                .catch(() => setLoading(false));
        }
    }, [dispatch, userInfo]);

    // 根据菜单列表动态生成路由配置
    const _baseRouter = useMemo(() => {
        menuList.forEach(item => {
            if (item.url) {
                const url = item.url.replace('@/views', '.');
                // 加载组件
                const Component = modules(url).default;

                // 添加路由
                baseRouter[0].children.push({
                    path: item.Code,
                    element: <Component />,
                });
            }
        });

        return baseRouter;
    }, [menuList]);

    const element = useRoutes(_baseRouter);

    if (loading) {
        return <LoadingComponent />;
    }

    return <>{element}</>;
}

export default GetRoutes;
