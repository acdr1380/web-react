import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Table, Spin, Button, Flex } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import request from '@/utils/request';
import tools from '@/utils/tools';

import AddDrawer from './addDrawer';
import { render } from 'react-dom';

/**
 * 菜单管理
 */
export default function Index() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        request.get('/system/menu').then(({ success, data }) => {
            if (success) {
                setDataSource(data);
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
        {
            title: '编辑',
            dataIndex: 'edit',
            render: (text, record) => {
                return (
                    <Flex justify="flex-start" gap={10}>
                        <Button type="primary" onClick={() => handleEdit(record)} icon={<EditFilled />} />
                        <Button type="primary" onClick={() => handleEdit(record)} icon={<DeleteFilled />} />
                    </Flex>
                );
            },
        },
    ];

    /**
     * 保存
     */
    function onSave(values, callback) {
        request.post('/system/menu', values).then(({ success, data }) => {
            if (success) {
                setDataSource([...dataSource, data]);
                callback();
            }
        });
    }

    /**
     * 编辑
     */
    function handleEdit(row) {
        setSelectedRow(row);
        setOpen(true);
    }

    const treeData = useMemo(() => tools.buildTree(dataSource), [dataSource]);

    return (
        <Spin spinning={loading}>
            <Layout>
                <Layout.Header>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        新增
                    </Button>
                    <Button type="primary" onClick={() => setOpen(true)}>
                        修改
                    </Button>
                </Layout.Header>
                <Layout.Content>
                    <Table rowKey="Id" bordered pagination={false} columns={columns} dataSource={treeData} />
                </Layout.Content>
            </Layout>
            <AddDrawer open={open} parentNode={dataSource} onSave={onSave} onClose={() => setOpen(false)} />
        </Spin>
    );
}
