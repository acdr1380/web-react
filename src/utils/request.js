// request.js
import { message } from 'antd';

const baseUrl = process.env.REACT_APP_BASE_URL || '/api';

const request = async (endpoint, options = {}, config = {}) => {
    const _config = {
        showError: true,
        verifyToken: true,
        ...config,
    };
    const _options = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    try {
        if (_config.verifyToken) {
            // 获取当前时间
            const now = new Date().getTime();
            // 获取本地存储中的token检验
            const storedData = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);

            if (!storedData) {
                window.location.href = '/login';
                throw new Error('Token 不存在，请重新登录');
            }

            const parsedData = JSON.parse(storedData);

            // 如果设置了过期时间，并且当前时间已经超过了过期时间
            if (parsedData.expireTime && now > parsedData.expireTime) {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
                window.location.href = '/login';
                throw new Error('Token 已过期，请重新登录');
            }

            // 更新过期时间
            const newExpireTime = now + process.env.REACT_APP_TOKEN_EXPIRES * 1000;
            const updatedData = {
                value: parsedData.value,
                expireTime: newExpireTime,
            };

            localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, JSON.stringify(updatedData));

            // 添加验证
            _options.headers.Authorization = parsedData.value;
        }

        const response = await fetch(`${baseUrl}/${endpoint}`, _options);

        // 如果响应状态码不是200，抛出错误
        if (!response.ok) {
            throw new Error(`请求失败，错误状态: ${response.status}`);
        }

        // 解析响应数据
        const data = await response.json();

        if (!data.Success) {
            throw new Error(`请求失败: ${data.Message}`);
        }

        // 返回数据
        return {
            success: true,
            data: data.Data,
            message: data.Message,
        };
    } catch (error) {
        if (_config.showError) {
            message.error(error.message);
            console.error(error.message);
        }
        return { success: false, message: error.message };
    }
};

const get = async (endpoint, params = {}, config = {}) => {
    //拼接endpoint和params
    if (params && Object.keys(params).length > 0) {
        endpoint = `${endpoint}?${new URLSearchParams(params).toString()}`;
    }

    // 发起GET请求
    const data = await request(endpoint, { method: 'GET' }, config);

    return data;
};

const post = async (endpoint, params = {}, config = {}) => {
    // 执行POST请求，使用baseUrl和endpoint构建完整URL
    const data = await request(endpoint, { method: 'POST', body: JSON.stringify(params) }, config);
    return data;
};

const uploadFile = async (endpoint, file, additionalData = {}) => {
    // 创建FormData对象，用于保存要上传的文件和其他数据
    const formData = new FormData();
    // 将文件添加到FormData对象中
    formData.append('file', file);

    // 如果有其他额外的字段
    Object.keys(additionalData).forEach(key => {
        // 将这些字段也添加到FormData对象中
        formData.append(key, additionalData[key]);
    });

    // 发送带有FormData的POST请求到指定的服务器端点
    const data = await request(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
};
const _request = { get, post, uploadFile };

export default _request;
