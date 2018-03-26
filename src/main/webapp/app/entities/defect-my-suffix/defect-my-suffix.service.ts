import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DefectMySuffix } from './defect-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DefectMySuffix>;

@Injectable()
export class DefectMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/defects';

    constructor(private http: HttpClient) { }

    create(defect: DefectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(defect);
        return this.http.post<DefectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(defect: DefectMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(defect);
        return this.http.put<DefectMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DefectMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DefectMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DefectMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DefectMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DefectMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DefectMySuffix[]>): HttpResponse<DefectMySuffix[]> {
        const jsonResponse: DefectMySuffix[] = res.body;
        const body: DefectMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DefectMySuffix.
     */
    private convertItemFromServer(defect: DefectMySuffix): DefectMySuffix {
        const copy: DefectMySuffix = Object.assign({}, defect);
        return copy;
    }

    /**
     * Convert a DefectMySuffix to a JSON which can be sent to the server.
     */
    private convert(defect: DefectMySuffix): DefectMySuffix {
        const copy: DefectMySuffix = Object.assign({}, defect);
        return copy;
    }
}
