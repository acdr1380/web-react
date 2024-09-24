import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSetAtom } from 'jotai';
import { useLocalStorage } from '@/hooks';
import request from '@/utils/request';
import style from './style.module.scss';

import { userInfoAtom } from '@/storage/globalStorage';

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const [, setToken] = useLocalStorage(
        process.env.REACT_APP_TOKEN_KEY,
        null,
        process.env.REACT_APP_TOKEN_EXPIRES * 1000
    );
    const setUserInfo = useSetAtom(userInfoAtom);
    const navigate = useNavigate();

    const onFinish = values => {
        setLoading(true);
        request.post('system/user/login', values, { verifyToken: false }).then(({ success, data }) => {
            if (success) {
                setToken(data.Token);
                setUserInfo({ UserId: data.UserId, UserName: data.UserName });
                navigate('/app');
            }

            setLoading(false);
        });
    };

    return (
        <div className={style['login-container']}>
            <div className={style['login-box']}>
                <h2>登录</h2>
                <Form
                    name="login"
                    initialValues={{ UserAccount: 'admin', PassWord: '123456' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item name="UserAccount" rules={[{ required: true, message: '请输入用户账号!' }]}>
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item name="PassWord" rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <a href="javascript(0)">忘记密码</a>
                            <a href="javascript(0)">注册</a>
                        </Flex>
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
