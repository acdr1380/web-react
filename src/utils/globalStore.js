import { configureStore, createSlice } from '@reduxjs/toolkit';

const global = createSlice({
    name: 'global',
    initialState: {
        // 菜单列表
        menus: [],
        // 用户信息
        userInfo: {},
    },
    reducers: {
        /**
         * 设置菜单
         * @param {any} state 当前状态
         * @param {any} action 携带的数据
         */
        setMenus(state, action) {
            return new Promise(resolve => {
                state.menus = action.payload;
                resolve(state);
            });
        },

        /**
         * 设置用户信息
         * @param {any} state 当前状态
         * @param {any} action 携带的数据
         */
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});

export const { setMenus } = global.actions;

export default configureStore({
    reducer: {
        global: global.reducer,
    },
});
