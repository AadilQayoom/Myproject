import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();


export const selectedEventState = atom({
  key:"selectedEventState",
  default: {},
  effects_UNSTABLE: [persistAtom],
  
})
