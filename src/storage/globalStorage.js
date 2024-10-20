import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 登录状态
const isLoginAtom = atom(false);
// 用户信息
const userInfoAtom = atomWithStorage('user', {});

export { isLoginAtom, userInfoAtom };
