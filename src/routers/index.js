import React, { useEffect, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { useAtom } from 'jotai';
import baseRouter from './baseRouters';

import { menuListAtom } from '@/storage/globalStorage';

function GetRoutes() {
    const [menuList, setMenuList] = useAtom(menuListAtom);

    useEffect(() => {
        const Home = lazy(() => import('@/views/homePage'));
        setMenuList([
            {
                path: '',
                element: <Home />,
            },
        ]);
    }, []);

    useEffect(() => {}, [menuList]);
    const element = useRoutes(baseRouter);

    return <>{element}</>;
}

export default GetRoutes;
