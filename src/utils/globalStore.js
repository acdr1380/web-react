import { makeAutoObservable } from 'mobx';

class Global {
    // 全局菜单
    menus = [];

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 设置菜单
     */
    setMenus(menus) {
        this.menus = menus;
    }
}

const global = new Global();

export default global;
