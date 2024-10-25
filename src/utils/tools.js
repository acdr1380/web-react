const tools = {
    /**
     * 构建树形结构
     * @param {Array<any>} data 原始数据
     * @param {String} key 唯一标识
     * @param {String} parentKey 父节点标识
     * @returns {Array<any>}
     */
    buildTree: (data, key = 'Id', parentKey = 'ParentId') => {
        const map = {}; // 用来存储所有节点
        const tree = []; // 最终生成的树

        // 先遍历数据，将每个节点存储到 map 中，并初始化 children 数组
        data.forEach(item => {
            map[item[key]] = { ...item, children: [] }; // 创建新对象，防止数据污染
        });

        // 再次遍历，找到每个节点的父节点，并将其放入父节点的 children 数组中
        data.forEach(item => {
            if (item[parentKey]) {
                // 如果有 ParentId，就把当前节点放到父节点的 children 中
                map[item[parentKey]].children.push(map[item[key]]);
            } else {
                // 没有 ParentId 的节点是根节点
                tree.push(map[item[key]]);
            }
        });

        /**
         * 删除没有子节点的 children 属性
         * @param {Array} nodes - 需要处理的节点数组
         */
        function removeEmptyChildren(nodes) {
            nodes.forEach(node => {
                if (node.children && node.children.length === 0) {
                    delete node.children; // 删除 children 属性
                } else if (node.children) {
                    removeEmptyChildren(node.children); // 递归处理子节点
                }
            });
        }

        removeEmptyChildren(tree); // 从根节点开始处理

        return tree;
    },

    /**
     * 将树形数据转换为平级数据
     * @param {Array<any>} tree 树形数据
     * @returns {Array<any>} 平级数据
     */
    flattenTree: tree => {
        const flatArray = [];

        function flatten(nodes) {
            nodes.forEach(node => {
                // 将节点添加到平级数组中
                const { children, ...rest } = node; // 排除 children 属性
                flatArray.push(rest);
                if (children) {
                    flatten(children); // 递归处理子节点
                }
            });
        }

        flatten(tree); // 开始递归
        return flatArray;
    },

    /**
     * 判断值是否为空
     * @param {*} value - 需要判断的值
     * @returns {boolean} - 如果值为空，返回 true；否则返回 false
     */
    isEmpty: value => {
        if (value === null || value === undefined) {
            return true;
        }

        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        if (Array.isArray(value)) {
            return value.length === 0;
        }

        if (typeof value === 'object') {
            return Object.keys(value).length === 0;
        }

        return false;
    },

    /**
     * 生成GUID
     * @returns {string} Guid 字符串
     */
    getGuid: () => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    },

    /**
     * 深拷贝
     */
    deepClone: (value, hash = new WeakMap()) => {
        // 处理基本类型，null 和 undefined
        if (value === null || typeof value !== 'object') {
            return value;
        }

        // 处理循环引用，使用 WeakMap 存储已经克隆的对象
        if (hash.has(value)) {
            return hash.get(value);
        }

        // 处理 Date 对象
        if (value instanceof Date) {
            return new Date(value);
        }

        // 处理正则表达式对象
        if (value instanceof RegExp) {
            return new RegExp(value);
        }

        // 处理函数对象，直接返回函数（注意：函数是不可深拷贝的）
        if (typeof value === 'function') {
            return value;
        }

        // 处理数组
        if (Array.isArray(value)) {
            const result = [];
            hash.set(value, result); // 保存引用以避免循环
            value.forEach((item, index) => {
                result[index] = tools.deepClone(item, hash); // 递归拷贝每一个元素
            });
            return result;
        }

        // 处理对象
        if (value instanceof Object) {
            const result = {};
            hash.set(value, result); // 保存引用以避免循环
            Object.keys(value).forEach(key => {
                result[key] = tools.deepClone(value[key], hash); // 递归拷贝每一个属性
            });
            return result;
        }

        // 如果是其他不可识别类型，直接返回
        return value;
    },
};

export default tools;
