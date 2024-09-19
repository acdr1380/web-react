/**
 * 封装请求
 * @module 请求模块
 * @author acdr1380
 */

// api.js
const BASE_URL = 'https://api.example.com';

// 封装 GET 请求
export async function get(url, params = {}, config = {}) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            ...config,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
}

// 封装 POST 请求
export async function post(url, data = {}, config = {}) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            body: JSON.stringify(data),
            ...config,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
}

// 封装 PUT 请求
export async function put(url, data = {}, config = {}) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            body: JSON.stringify(data),
            ...config,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
}

// 封装 DELETE 请求
export async function del(url, config = {}) {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
            ...config,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
}

const request = { get, post, put, del };
export default request;
