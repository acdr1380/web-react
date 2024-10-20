import React, { useMemo } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';

import storageAtoms from '@/layout/storage';
import baseRouter from './baseRouters';

// 批量导入页面
const modules = require.context('@/views', true, /\.js$/);

/**
 *  获取路由
 * @returns 路由
 */
function GetRoutes() {
    const menuList = useAtomValue(storageAtoms.menuListAtom);

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

    return <>{element}</>;
}

export default GetRoutes;
