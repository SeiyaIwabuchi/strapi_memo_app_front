import { atom } from "jotai";
import { Memos } from "../../entities/memo/response/Memo";

export const memoListAtom = atom<Memos>({ data: [], meta: null });