import { IUser } from "@/src/data/network/models/user";
import { atom } from "recoil";

export const userState = atom<IUser | null>({
  key: 'userStateAtom',
  default: null,
});