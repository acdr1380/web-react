// request.js
import { message } from 'antd';

const baseUrl = process.env.REACT_APP_BASE_URL || '/api';

const request = async (endpoint, options = {}, config = {}) => {
    const _options = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${baseUrl}/${endpoint}`, _options);

        if (!response.ok) {
            throw new Error(`请求失败，错误状态: ${response.status}`);
        }

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
        if (config.showError) {
            message.error(error.message);
        }
        return { success: false, message: error.message };
    }
};

const get = async (endpoint, params = {}, config = { showError: true }) => {
    // 创建URL实例，并拼接baseUrl和endpoint
    const url = new URL(endpoint);

    // 遍历参数对象，将键值对附加到URL的搜索参数中
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    // 发起GET请求
    const data = await request(url, { method: 'GET' }, config);

    return data;
};

const post = async (endpoint, params = {}, config = { showError: true }) => {
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
