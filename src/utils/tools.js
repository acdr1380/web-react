/**
 * 构建树形结构
 * @param {Array<any>} data 原始数据
 * @param {String} key 唯一标识
 * @param {String} parentKey 父节点标识
 * @returns {Array<any>}
 */
function buildTree(data, key = 'Id', parentKey = 'ParentId') {
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
}

/**
 * 将树形数据转换为平级数据
 * @param {Array<any>} tree 树形数据
 * @returns {Array<any>} 平级数据
 */
function flattenTree(tree) {
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
}

/**
 * 判断值是否为空
 * @param {*} value - 需要判断的值
 * @returns {boolean} - 如果值为空，返回 true；否则返回 false
 */
function isEmpty(value) {
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
}

const tools = { buildTree, flattenTree, isEmpty };
export default tools;
