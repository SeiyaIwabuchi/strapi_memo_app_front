import { atom } from "jotai";
import { IMemo } from "../../entities/memo/request/IMemo";

export const addingMemoStateAtom = atom<IMemo>({ Title: "", Body: "", Deleted_at: null });

export const isOpenAddMomeModal = atom(false);