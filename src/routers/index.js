import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react';

import baseRouter from './baseRouters';
import global from '@/utils/globalStore';

// 批量导入页面
const modules = require.context('@/views', true, /\.js$/);

/**
 *  获取路由
 * @returns 路由
 */
export default observer(function () {
    const menuList = global.menus;

    // 根据菜单列表动态生成路由配置
    const _baseRouter = useMemo(() => {
        menuList.forEach(item => {
            try {
                if (item.Url) {
                    const url = item.Url.replace('@/views', '.');
                    // 加载组件
                    const Component = modules(url)?.default;

                    if (Component) {
                        // 添加路由
                        baseRouter[0].children.push({
                            path: item.Code,
                            element: <Component />,
                        });
                    }
                }
            } catch (error) {
                console.error('Error loading component:', error);
            }
        });

        return baseRouter;
    }, [menuList]);

    const element = useRoutes(_baseRouter);

    return <>{element}</>;
});
