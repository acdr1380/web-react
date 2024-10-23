import React from 'react';
import { Spin } from 'antd';
import './style.css'; // 可选，用于自定义样式

/**
 * Loading 组件
 * 用于显示加载状态的动画或提示信息
 * @returns {JSX.Element} 渲染的加载组件
 */
function Loading() {
    return (
        <div className="loading-container">
            <Spin size="large">加载中...</Spin>
        </div>
    );
}

export default Loading;
