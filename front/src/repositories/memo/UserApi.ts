import ApiBase from "../bases/ApiBase"
import { Memos, Memo } from "../../entities/memo/response/Memo"
import { IMemo as MemoRequest } from "../../entities/memo/request/IMemo"
import { UserInfo } from "../../entities/UserInfo/response/UserInfo";
import { Credential } from "../../entities/UserInfo/response/Credential";

export default class UserApi extends ApiBase {

    endpoint = "/users"
    baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
    authCallbackPath = import.meta.env.VITE_STRAPI_AUTH_CALLBACK_PATH;
    
    getMyInfo = () => super.get<UserInfo>(`${this.endpoint}/me`).then(res => res.data);
    authentication = (accessToken: string) => this.axiosBase.get<Credential>(`${this.baseUrl}${this.authCallbackPath}?access_token=${accessToken}`).then(res => res.data);
}