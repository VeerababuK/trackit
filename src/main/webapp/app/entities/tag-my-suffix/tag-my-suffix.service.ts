import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TagMySuffix } from './tag-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TagMySuffix>;

@Injectable()
export class TagMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/tags';

    constructor(private http: HttpClient) { }

    create(tag: TagMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.post<TagMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tag: TagMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(tag);
        return this.http.put<TagMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TagMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TagMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TagMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TagMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TagMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TagMySuffix[]>): HttpResponse<TagMySuffix[]> {
        const jsonResponse: TagMySuffix[] = res.body;
        const body: TagMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TagMySuffix.
     */
    private convertItemFromServer(tag: TagMySuffix): TagMySuffix {
        const copy: TagMySuffix = Object.assign({}, tag);
        return copy;
    }

    /**
     * Convert a TagMySuffix to a JSON which can be sent to the server.
     */
    private convert(tag: TagMySuffix): TagMySuffix {
        const copy: TagMySuffix = Object.assign({}, tag);
        return copy;
    }
}
