import axios, { AxiosInstance } from "axios";
import { getDefaultStore, useSetAtom } from "jotai";
import snackbarStateAtom from "../../states/SnackbarStateAtom";


const store = getDefaultStore();


class ApiBase {
    baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
    axiosBase: AxiosInstance

    constructor() {
        this.axiosBase = axios.create({
            baseURL: this.baseUrl,
            responseType: 'json',
        });
    }

    

    get<T>(endpoint: string, params: object = {}) {
        return this.axiosBase.get<T>("/api" + endpoint, {
            params: params,
            headers: {
                Authorization: `bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(res => {
            console.debug(res);
            return res;
        })
        .catch(err => {
            console.error(err);
            store.set(snackbarStateAtom, { isShow: true, message: `${err.code} ${err.message} ${err.name}` });
            throw err;
        });
    }

    post<T>(endpoint: string, params: object = {}) {
        return this.axiosBase.post<T>("/api" + endpoint, params, {
            headers: {
                Authorization: `bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => {
            console.debug(res);
            return res;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
    }

    put<T>(endpoint: string, params: object = {}) {
        return this.axiosBase.put<T>("/api" + endpoint, params, {
            headers: {
                Authorization: `bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => {
            console.debug(res);
            return res;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
    }

    delete<T>(endpoint: string, params: object = {}) {
        return this.axiosBase.delete<T>("/api" + endpoint, {
            params: params,
            headers: {
                Authorization: `bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => {
            console.debug(res);
            return res;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
    }
}

export default ApiBase;