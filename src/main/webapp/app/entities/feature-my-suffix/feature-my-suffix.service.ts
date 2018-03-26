import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FeatureMySuffix } from './feature-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FeatureMySuffix>;

@Injectable()
export class FeatureMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/features';

    constructor(private http: HttpClient) { }

    create(feature: FeatureMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(feature);
        return this.http.post<FeatureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(feature: FeatureMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(feature);
        return this.http.put<FeatureMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FeatureMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FeatureMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<FeatureMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FeatureMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FeatureMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FeatureMySuffix[]>): HttpResponse<FeatureMySuffix[]> {
        const jsonResponse: FeatureMySuffix[] = res.body;
        const body: FeatureMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FeatureMySuffix.
     */
    private convertItemFromServer(feature: FeatureMySuffix): FeatureMySuffix {
        const copy: FeatureMySuffix = Object.assign({}, feature);
        return copy;
    }

    /**
     * Convert a FeatureMySuffix to a JSON which can be sent to the server.
     */
    private convert(feature: FeatureMySuffix): FeatureMySuffix {
        const copy: FeatureMySuffix = Object.assign({}, feature);
        return copy;
    }
}
