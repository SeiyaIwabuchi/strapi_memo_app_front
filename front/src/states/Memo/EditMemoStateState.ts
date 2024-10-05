import { atom } from "jotai";
import { Memo } from "../../entities/memo/response/Memo";

export const isEditModalOpenAtom = atom(false);
export const edittingMemoAtom = atom<Memo | null>();