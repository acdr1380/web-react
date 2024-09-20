import { useState } from 'react';

/**
 * useLocalStorage - 带有过期时间的localStorage hook，访问时自动延长过期时间
 * @param {string} key - 存储在localStorage中的键名
 * @param {any} defaultValue - 当localStorage中没有值时的默认值
 * @param {number} [expireTime=null] - 过期时间（可选），以毫秒为单位。如1小时为 3600000毫秒。如果不传入或为 null，则数据永不过期。
 * @returns {[any, Function]} - 返回一个包含当前值和设置值的数组
 */
function useLocalStorage(key, defaultValue = '', expireTime = null) {
    // 获取当前时间
    const now = new Date().getTime();

    // 从localStorage中获取存储的值
    const getStoredValue = () => {
        const storedData = localStorage.getItem(key);

        // 如果 localStorage 中没有存储值，返回默认值
        if (!storedData) {
            return defaultValue;
        }

        // 解析存储的JSON对象
        try {
            const parsedData = JSON.parse(storedData);

            // 如果设置了过期时间，并且当前时间已经超过了过期时间
            if (parsedData.expireTime && now > parsedData.expireTime) {
                localStorage.removeItem(key);
                return defaultValue;
            }

            // 如果存在过期时间且没过期，刷新过期时间
            if (expireTime) {
                // 更新过期时间
                const newExpireTime = now + expireTime;
                const updatedData = {
                    value: parsedData.value,
                    expireTime: newExpireTime,
                };
                localStorage.setItem(key, JSON.stringify(updatedData));
            }

            // 返回存储的实际值
            return parsedData.value;
        } catch (error) {
            console.error('分析本地存储数据时出错:', error);
            return defaultValue;
        }
    };

    // 使用useState保存当前值
    const [storedValue, setStoredValue] = useState(getStoredValue);

    // 更新localStorage的值
    const setValue = value => {
        try {
            // 如果是函数，将函数返回的值作为新值
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // 构造存储的对象，包括实际值和可选的过期时间
            const dataToStore = {
                value: valueToStore,
                expireTime: expireTime ? now + expireTime : null, // 如果传入了过期时间，则设置，否则为null
            };

            // 存储到localStorage中
            localStorage.setItem(key, JSON.stringify(dataToStore));

            // 更新state中的值
            setStoredValue(valueToStore);
        } catch (error) {
            console.error('设置本地存储值时出错:', error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
