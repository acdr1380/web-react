import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 登录状态
const isLoginAtom = atom(false);
// 用户信息
const userInfoAtom = atomWithStorage('user', {});
// 菜单数据
const menuListAtom = atom([]);

export { isLoginAtom, userInfoAtom, menuListAtom };
