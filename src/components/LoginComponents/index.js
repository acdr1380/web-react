import React from 'react';
import { Form, Input, Button, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import style from './style.module.scss';

export default function LoginComponent() {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={style['login-container']}>
            <div className={style['login-box']}>
                <h2>登录</h2>
                <Form name="login" onFinish={onFinish}>
                    <Form.Item name="UserAccount" rules={[{ required: true, message: '请输入用户账号!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <a href="javascript(0)">忘记密码</a>
                            <a href="javascript(0)">注册</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
