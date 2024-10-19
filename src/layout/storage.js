import { atom } from 'jotai';

// 侧边栏是否折叠
const collapsedAtom = atom(false);
const menuListAtom = atom([]);

const storageAtoms = {
    collapsedAtom,
    menuListAtom,
};

export default storageAtoms;
