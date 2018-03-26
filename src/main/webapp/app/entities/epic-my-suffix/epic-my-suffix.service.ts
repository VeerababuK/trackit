import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EpicMySuffix } from './epic-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EpicMySuffix>;

@Injectable()
export class EpicMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/epics';

    constructor(private http: HttpClient) { }

    create(epic: EpicMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(epic);
        return this.http.post<EpicMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(epic: EpicMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(epic);
        return this.http.put<EpicMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EpicMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EpicMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EpicMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EpicMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EpicMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EpicMySuffix[]>): HttpResponse<EpicMySuffix[]> {
        const jsonResponse: EpicMySuffix[] = res.body;
        const body: EpicMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EpicMySuffix.
     */
    private convertItemFromServer(epic: EpicMySuffix): EpicMySuffix {
        const copy: EpicMySuffix = Object.assign({}, epic);
        return copy;
    }

    /**
     * Convert a EpicMySuffix to a JSON which can be sent to the server.
     */
    private convert(epic: EpicMySuffix): EpicMySuffix {
        const copy: EpicMySuffix = Object.assign({}, epic);
        return copy;
    }
}
