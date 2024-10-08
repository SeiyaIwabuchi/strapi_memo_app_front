import ApiBase from "../bases/ApiBase"
import { Memos, Memo } from "../../entities/memo/response/Memo"
import { IMemo as MemoRequest } from "../../entities/memo/request/IMemo"

export default class MemoApi extends ApiBase {

    endpoint = "/memos"

    getAll = () => super.get<Memos>(this.endpoint).then(res => res.data);
    
    getOne = (documentId: string) => super.get<Memo>(`${this.endpoint}/${documentId}`).then(res => res.data);

    create = (body: MemoRequest) => super.post(this.endpoint, { data: body });

    update = (documentId: string, body: MemoRequest) => super.put(`${this.endpoint}/${documentId}`, { data: body});

    remove = (documentId: string) => super.delete(`${this.endpoint}/${documentId}`);
}