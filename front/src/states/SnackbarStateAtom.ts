import { atom } from "jotai";
import ISnackbarState from "../entities/SnackbarState/SnackbarState";

const snackbarStateAtom = atom<ISnackbarState>({ isShow: false, message: "" });

export default snackbarStateAtom;