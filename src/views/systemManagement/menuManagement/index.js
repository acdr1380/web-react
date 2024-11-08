import React, { useState } from 'react';
import { Layout, Button, Table } from 'antd';

/**
 * 菜单管理
 */
export default function Index() {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: '标题',
            dataIndex: 'Title',
        },
        {
            title: '地址',
            dataIndex: 'Title',
        },
        {
            title: '创建时间',
            dataIndex: 'CreatedTime',
        },
    ];

    return (
        <Layout>
            <Layout.Header>
                <Button type="primary">添加</Button>
            </Layout.Header>
            <Layout.Content>
                <Table columns={columns} dataSource={dataSource} />
            </Layout.Content>
        </Layout>
    );
}
