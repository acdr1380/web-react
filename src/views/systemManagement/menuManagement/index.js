import React, { useState, useEffect } from 'react';
import { Layout, Table, Spin } from 'antd';
import request from '@/utils/request';
import tools from '@/utils/tools';

import AddDrawer from './addDrawer';

/**
 * 菜单管理
 */
export default function Index() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);
        request.get('/system/menu').then(({ success, data }) => {
            if (success) {
                setDataSource(tools.buildTree(data));
            }

            setLoading(false);
        });
    }, []);

    const columns = [
        {
            title: '标题',
            dataIndex: 'Title',
        },
        {
            title: '地址',
            dataIndex: 'Url',
        },
        {
            title: '创建时间',
            dataIndex: 'CreatedTime',
        },
    ];

    return (
        <Spin spinning={loading}>
            <Layout>
                <Layout.Header>
                    <AddDrawer parentNode={dataSource} />
                </Layout.Header>
                <Layout.Content>
                    <Table rowKey="Id" bordered pagination={false} columns={columns} dataSource={dataSource} />
                </Layout.Content>
            </Layout>
        </Spin>
    );
}
