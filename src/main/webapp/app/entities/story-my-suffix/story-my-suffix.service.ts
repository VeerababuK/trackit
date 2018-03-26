import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StoryMySuffix } from './story-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StoryMySuffix>;

@Injectable()
export class StoryMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/stories';

    constructor(private http: HttpClient) { }

    create(story: StoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(story);
        return this.http.post<StoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(story: StoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(story);
        return this.http.put<StoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StoryMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoryMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StoryMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StoryMySuffix[]>): HttpResponse<StoryMySuffix[]> {
        const jsonResponse: StoryMySuffix[] = res.body;
        const body: StoryMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StoryMySuffix.
     */
    private convertItemFromServer(story: StoryMySuffix): StoryMySuffix {
        const copy: StoryMySuffix = Object.assign({}, story);
        return copy;
    }

    /**
     * Convert a StoryMySuffix to a JSON which can be sent to the server.
     */
    private convert(story: StoryMySuffix): StoryMySuffix {
        const copy: StoryMySuffix = Object.assign({}, story);
        return copy;
    }
}
