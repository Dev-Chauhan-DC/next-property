import { atom } from "recoil";

export const tabBarHeightAtom = atom<number>({
    key: 'tabBarHeightAtomState',
    default: 50
});