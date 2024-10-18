import { lazy, Suspense } from 'react';
import loadable from '@loadable/component';

function LazyLoad(url) {
    const ComponentNode = lazy(() => import(url));
    return <ComponentNode />;
}

export default LazyLoad;
