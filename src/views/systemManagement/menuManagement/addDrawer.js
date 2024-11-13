import React, { useState, useMemo } from 'react';
import { Drawer, Button, Form, Input, TreeSelect } from 'antd';
import tools from '@/utils/tools';

/**
 *
 * @param {*} props
 * @returns
 */
export default function AddDrawer(props) {
    const { onAdd, parentNode = [] } = props;

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    /**
     * 添加
     */
    function onOpen() {
        form.resetFields();
        setOpen(true);
    }

    /**
     * 关闭
     */
    function onClose() {
        setOpen(false);
    }

    /**
     * 确定
     */
    function onFinish() {
        form.validateFields()
            .then(values => {
                console.log('values', values);

                if (onAdd && typeof onAdd === 'function') {
                    onAdd();
                }
            })
            .catch(err => console.log('err', err));
    }

    const treeData = useMemo(() => {
        return tools.buildTree(tools.flattenTree(parentNode).map(x => ({ ...x, label: x.Title, value: x.Id })));
    }, [parentNode]);

    return (
        <>
            <Button type="primary" onClick={onOpen}>
                添加
            </Button>
            <Drawer
                title="添加"
                onClose={onClose}
                open={open}
                size="small"
                footer={
                    <>
                        <Button type="primary" onClick={onFinish}>
                            添加
                        </Button>
                        <Button onClick={onClose}>取消</Button>
                    </>
                }
                getContainer={() => document.getElementById('layout-content')}
            >
                <Form name="add" form={form} layout="horizontal" autoComplete="off">
                    <Form.Item label="标题" name="Name" rules={[{ required: true }]}>
                        <Input placeholder="请输入标题" />
                    </Form.Item>
                    <Form.Item label="地址" name="Path" rules={[{ required: true }]}>
                        <Input placeholder="请输入地址" />
                    </Form.Item>
                    <Form.Item label="父级" name="ParentId">
                        <TreeSelect showSearch treeDefaultExpandAll treeData={treeData} placeholder="请选择" />
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
