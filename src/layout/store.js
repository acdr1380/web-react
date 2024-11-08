import { makeAutoObservable } from 'mobx';

class Store {
    // 侧边栏是否折叠
    collapsed = false;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 合并对象属性到当前对象
     * 此方法用于将传入的对象属性安全地合并到当前对象中
     * 它首先检查当前对象是否已定义了传入属性的键，如果是，则更新该键的值
     * 这种方法可以防止设置未定义的属性，从而避免潜在的错误或数据泄露
     *
     * @param {Object} obj - 包含要设置的属性和值的对象
     */
    setState(obj) {
        // 遍历传入对象的所有属性
        Object.keys(obj).forEach(key => {
            // 检查当前对象是否具有该属性，防止设置未定义的属性
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                // 更新当前对象的属性值
                this[key] = obj[key];
            }
        });
    }
}
const store = new Store();
export default store;
