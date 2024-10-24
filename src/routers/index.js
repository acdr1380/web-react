import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import baseRouter from './baseRouters';

// 批量导入页面
const modules = require.context('@/views', true, /\.js$/);

/**
 *  获取路由
 * @returns 路由
 */
function GetRoutes() {
    const { menus: menuList } = useSelector(state => state.global);

    // 根据菜单列表动态生成路由配置
    const _baseRouter = useMemo(() => {
        menuList.forEach(item => {
            if (item.Url) {
                const url = item.Url.replace('@/views', '.');
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

    return <>{element}</>;
}

export default GetRoutes;
