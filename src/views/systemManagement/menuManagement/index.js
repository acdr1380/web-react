import React, { useState } from 'react';
import { EditTable } from '@/components';

/**
 * 菜单管理
 */
export default function Index() {
    const [dataSource, setDataSource] = useState([]);

    return <EditTable editable dataSource={dataSource} editTools={['add']} />;
}
