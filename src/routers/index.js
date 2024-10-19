import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { useAtomValue } from 'jotai';

import storageAtoms from '@/layout/storage';
import baseRouter from './baseRouters';

// 批量导入页面
const modules = require.context('@/views', true, /\.js$/);

function GetRoutes() {
    const menuList = useAtomValue(storageAtoms.menuListAtom);

    const _baseRouter = useMemo(() => {
        menuList.forEach(item => {
            if (item.url) {
                console.log(modules.keys());

                const url = item.url.replace('@/views', '.');
                // 加载组件
                const Component = modules(url).default;

                // 添加路由
                baseRouter[0].children.push({
                    path: item.path,
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
