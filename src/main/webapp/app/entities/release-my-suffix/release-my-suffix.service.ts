import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Release_MySuffix } from './release-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Release_MySuffix>;

@Injectable()
export class Release_MySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/release-s';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(release_: Release_MySuffix): Observable<EntityResponseType> {
        const copy = this.convert(release_);
        return this.http.post<Release_MySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(release_: Release_MySuffix): Observable<EntityResponseType> {
        const copy = this.convert(release_);
        return this.http.put<Release_MySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Release_MySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Release_MySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<Release_MySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Release_MySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Release_MySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Release_MySuffix[]>): HttpResponse<Release_MySuffix[]> {
        const jsonResponse: Release_MySuffix[] = res.body;
        const body: Release_MySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Release_MySuffix.
     */
    private convertItemFromServer(release_: Release_MySuffix): Release_MySuffix {
        const copy: Release_MySuffix = Object.assign({}, release_);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(release_.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(release_.toDate);
        return copy;
    }

    /**
     * Convert a Release_MySuffix to a JSON which can be sent to the server.
     */
    private convert(release_: Release_MySuffix): Release_MySuffix {
        const copy: Release_MySuffix = Object.assign({}, release_);

        copy.fromDate = this.dateUtils.toDate(release_.fromDate);

        copy.toDate = this.dateUtils.toDate(release_.toDate);
        return copy;
    }
}
