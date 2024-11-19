import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Table, Spin, Button, message, Modal } from 'antd';
import request from '@/utils/request';
import tools from '@/utils/tools';

import AddDrawer from './addDrawer';
import { set } from 'mobx';

/**
 * 菜单管理
 */
export default function Index() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false);

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
    ];

    /**
     * 保存
     */
    function onSave(values, callback) {
        if (type === 'add') {
            request.post('/system/menu', values).then(({ success, data }) => {
                if (success) {
                    setDataSource([...dataSource, data]);
                    setOpen(false);
                }
                callback();
            });
        } else {
            request.put('/system/menu', { ...selectedRow, ...values }).then(({ success, data }) => {
                if (success) {
                    setDataSource(dataSource.map(item => (item.Id === data.Id ? data : item)));
                    setOpen(false);
                    setSelectedRow(data);
                }
                callback();
            });
        }
    }

    /**
     * 新增
     */
    function handleAdd() {
        setOpen(true);
        setType('add');
    }

    /**
     * 编辑
     */
    function handleEdit() {
        if (tools.isEmpty(selectedRow)) {
            message.warning('请选择要编辑的数据');
            return;
        }

        setSelectedRow(selectedRow);
        setType('edit');
        setOpen(true);
    }

    /**
     * 删除
     */
    function handleDelete() {
        if (tools.isEmpty(selectedRow)) {
            message.warning('请选择要删除的数据');
            return;
        }

        Modal.confirm({
            title: '删除菜单',
            content: '确定删除该菜单吗？',
            onOk() {
                setLoading(true);
                request.del('/system/menu/' + selectedRow.Id).then(({ success }) => {
                    if (success) {
                        setDataSource(dataSource.filter(item => item.Id !== selectedRow.Id));
                        setSelectedRow();
                    }
                    setLoading(false);
                });
            },
        });
    }

    const treeData = useMemo(() => tools.buildTree(dataSource), [dataSource]);

    return (
        <Spin spinning={loading}>
            <Layout>
                <Layout.Header>
                    <Button type="primary" onClick={handleAdd}>
                        新增
                    </Button>
                    <Button onClick={handleEdit}>编辑</Button>
                    <Button color="danger" variant="solid" onClick={handleDelete}>
                        删除
                    </Button>
                </Layout.Header>
                <Layout.Content>
                    <Table
                        rowKey="Id"
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={treeData}
                        onRow={row => {
                            return {
                                onClick: () => setSelectedRow(row),
                            };
                        }}
                        rowSelection={{
                            disableRowSelect: true,
                            selectedRowKeys: [selectedRow?.Id],
                        }}
                    />
                </Layout.Content>
            </Layout>
            <AddDrawer
                open={open}
                type={type}
                selectedRow={selectedRow}
                parentNode={dataSource}
                onSave={onSave}
                onClose={() => setOpen(false)}
            />
        </Spin>
    );
}
