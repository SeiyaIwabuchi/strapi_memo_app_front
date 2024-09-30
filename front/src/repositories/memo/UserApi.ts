import ApiBase from "../bases/ApiBase"
import { Memos, Memo } from "../../entities/memo/response/Memo"
import { Memo as MemoRequest } from "../../entities/memo/request/Memo"
import { UserInfo } from "../../entities/UserInfo/response/UserInfo";
import { Credential } from "../../entities/UserInfo/response/Credential";

export default class UserApi extends ApiBase {

    endpoint = "/users"
    baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
    
    getMyInfo = () => super.get<UserInfo>(`${this.endpoint}/me`).then(res => res.data);
    authentication = () => this.axiosBase.get<Credential>(`${this.baseUrl}/api/auth/keycloak/callback${location.search}`).then(res => res.data);
}