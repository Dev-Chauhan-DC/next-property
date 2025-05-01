import { IConversation } from "@/src/data/network/models/conversation";
import { atom } from "recoil";

export const selectedConvAtom = atom<IConversation | undefined>({
    key: 'selectedConvAtomState',
    default: undefined
});