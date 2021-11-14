import { atom } from "recoil";


export const isDarkAtom = atom({
  key: "isDark",  // key는 Unique 해야 함
  default: true,
})