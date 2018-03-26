import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DiscussionMySuffix } from './discussion-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DiscussionMySuffix>;

@Injectable()
export class DiscussionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/discussions';

    constructor(private http: HttpClient) { }

    create(discussion: DiscussionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(discussion);
        return this.http.post<DiscussionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(discussion: DiscussionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(discussion);
        return this.http.put<DiscussionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DiscussionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DiscussionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiscussionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiscussionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DiscussionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DiscussionMySuffix[]>): HttpResponse<DiscussionMySuffix[]> {
        const jsonResponse: DiscussionMySuffix[] = res.body;
        const body: DiscussionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DiscussionMySuffix.
     */
    private convertItemFromServer(discussion: DiscussionMySuffix): DiscussionMySuffix {
        const copy: DiscussionMySuffix = Object.assign({}, discussion);
        return copy;
    }

    /**
     * Convert a DiscussionMySuffix to a JSON which can be sent to the server.
     */
    private convert(discussion: DiscussionMySuffix): DiscussionMySuffix {
        const copy: DiscussionMySuffix = Object.assign({}, discussion);
        return copy;
    }
}
