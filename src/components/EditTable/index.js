import React, { memo, useState, useMemo } from 'react';
import { Layout, Table, Button, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import tools from '@/utils/tools';

const { Header, Content } = Layout;

/**
 * 编辑表格
 * @param {any} props 基础的antd表格属性
 * @param {boolean} editable 是否允许编辑
 * @param {Array<'add', 'edit', 'delete'>} editTools 编辑工具
 * @param {Function} onEditBefore 编辑前，一般用于编辑前校验能否进入编辑状态
 * @param {Function} onEdit 编辑，更新编辑状态
 * @returns
 */
function EditTable(props) {
    const { rowKey = '_id', editable = false, editTools = [], dataSource, pagination = false } = props;

    // 表格数据
    const [_dataSource, set_DataSource] = useState(dataSource);
    // 缓存数据
    const [cacheData, setCacheData] = useState([]);

    // 编辑状态
    const [editType, setEditType] = useState();
    const editStatus = useMemo(() => !!editType, [editType]);

    /**
     * 表格编辑栏
     */
    const _editTools = useMemo(() => {
        // 是否允许编辑
        if (!editable) return <></>;

        // 编辑工具
        if (!editTools || editTools.length === 0) return <></>;

        /**
         * 新增前校验
         */
        const onAddBefore = () => {
            if (props.onAddBefore && typeof props.onAddBefore === 'function') {
                return props.onAddBefore();
            }

            return true;
        };

        /**
         * 新增
         */
        const onAdd = () => {
            if (!onAddBefore()) {
                return;
            }

            // 默认模板
            let template = {
                [rowKey]: tools.getGuid(),
            };

            // 使用自定义模板
            if (props.rowTemplate && typeof props.rowTemplate === 'function') {
                template = props.rowTemplate();
            }
            setEditType('add');
            setCacheData(tools.deepClone(_dataSource));
            set_DataSource([..._dataSource, template]);
        };

        /**
         * 编辑前，一般在用作校验
         */
        const onEditBefore = () => {
            if (!_dataSource || _dataSource.length === 0) {
                message.warning('没有编辑数据');
                return false;
            }

            if (props.onEditBefore && typeof props.onEditBefore === 'function') {
                return props.onEditBefore();
            }

            return true;
        };

        /**
         * 编辑
         */
        const onEdit = () => {
            if (!onEditBefore()) {
                return;
            }

            if (props.onEdit && typeof props.onEdit === 'function') {
                props.onEdit();
            }

            setEditType('edit');
            setCacheData(tools.deepClone(_dataSource));
        };

        /**
         * 放弃编辑
         */
        const onCancel = () => {
            setEditType();
            set_DataSource(cacheData);
            setCacheData([]);
        };

        /**
         * 编辑保存
         */
        const onEditSave = () => {
            if (props.onEditSave && typeof props.onEditSave === 'function') {
                props.onEditSave(_dataSource, editType);
            }

            setEditType();
            setCacheData([]);
        };

        // 编辑按钮
        const buttons = [];
        if (editStatus) {
            buttons.push(
                <Button key="save" color="primary" onClick={onEditSave}>
                    保存
                </Button>
            );
            buttons.push(
                <Button key="cancel" onClick={onCancel}>
                    放弃编辑
                </Button>
            );
        } else {
            for (const t of editTools) {
                switch (t) {
                    case 'add':
                        buttons.push(
                            <Button key={t} icon={<PlusOutlined />} color="primary" onClick={onAdd}>
                                添加
                            </Button>
                        );
                        break;
                    case 'edit':
                        buttons.push(
                            <Button key={t} icon={<EditOutlined />} color="primary" onClick={onEdit}>
                                编辑
                            </Button>
                        );
                        break;
                    case 'delete':
                        buttons.push(
                            <Button key={t} icon={<DeleteOutlined />} color="danger">
                                删除
                            </Button>
                        );
                        break;
                    default:
                        break;
                }
            }
        }

        return <Header className={style['edit-tools']}>{buttons}</Header>;
    }, [editable, editTools, editStatus, props, rowKey, _dataSource, cacheData, editType]);

    return (
        <Layout className={style.EditTable}>
            {_editTools}
            <Content>
                <Table bordered rowKey={rowKey} pagination={pagination} {...props} dataSource={_dataSource} />
            </Content>
        </Layout>
    );
}
export default memo(EditTable);
