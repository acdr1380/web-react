import React, { useState, useMemo, useEffect } from 'react';
import { Drawer, Button, Form, Input, TreeSelect } from 'antd';

import tools from '@/utils/tools';

/**
 *
 * @param {*} props
 * @returns
 */
export default function AddDrawer(props) {
    const { onSave, open = false, onClose, parentNode = [], selectedRow } = props;

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && selectedRow) {
            form.setFieldsValue(selectedRow);
        }
    }, [open, selectedRow, form]);

    /**
     * 确定
     */
    async function onFinish() {
        try {
            const values = await form.validateFields();

            if (onSave && typeof onSave === 'function') {
                setLoading(true);
                onSave(values, () => setLoading(false));
            }
        } catch (errorInfo) {
            console.error('Failed:', errorInfo);
        }
    }

    const treeData = useMemo(() => {
        return tools.buildTree(tools.flattenTree(parentNode).map(x => ({ ...x, label: x.Title, value: x.Id })));
    }, [parentNode]);

    return (
        <Drawer
            title="添加"
            onClose={onClose}
            open={open}
            size="small"
            loading={loading}
            footer={
                <>
                    <Button type="primary" onClick={onFinish}>
                        保存
                    </Button>
                    <Button onClick={onClose}>取消</Button>
                </>
            }
        >
            <Form name="add" form={form} layout="vertical" autoComplete="off">
                <Form.Item label="标题" name="Title" rules={[{ required: true }]} hasFeedback>
                    <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item label="标题编码" name="Code" rules={[{ required: true }]} hasFeedback>
                    <Input placeholder="请输入编码" />
                </Form.Item>
                <Form.Item label="地址" name="Url" rules={[{ required: true }]} hasFeedback>
                    <Input placeholder="请输入地址" />
                </Form.Item>
                <Form.Item label="父级" name="ParentId">
                    <TreeSelect allowClear treeDefaultExpandAll treeData={treeData} placeholder="请选择" />
                </Form.Item>
            </Form>
        </Drawer>
    );
}
