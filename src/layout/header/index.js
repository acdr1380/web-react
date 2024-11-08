import React from 'react';
import { Layout, Button } from 'antd';
import { observer } from 'mobx-react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import store from '../store';

/**
 * 顶部导航
 */
export default observer(function (props) {
    return (
        <Layout.Header style={{ padding: 0 }}>
            <Button
                type="text"
                icon={store.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => store.setState({ collapsed: !store.collapsed })}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Layout.Header>
    );
});
