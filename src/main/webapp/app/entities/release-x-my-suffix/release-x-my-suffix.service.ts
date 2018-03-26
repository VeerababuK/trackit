import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReleaseXMySuffix>;

@Injectable()
export class ReleaseXMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/release-xes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(releaseX: ReleaseXMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(releaseX);
        return this.http.post<ReleaseXMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(releaseX: ReleaseXMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(releaseX);
        return this.http.put<ReleaseXMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReleaseXMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReleaseXMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReleaseXMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReleaseXMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReleaseXMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReleaseXMySuffix[]>): HttpResponse<ReleaseXMySuffix[]> {
        const jsonResponse: ReleaseXMySuffix[] = res.body;
        const body: ReleaseXMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReleaseXMySuffix.
     */
    private convertItemFromServer(releaseX: ReleaseXMySuffix): ReleaseXMySuffix {
        const copy: ReleaseXMySuffix = Object.assign({}, releaseX);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(releaseX.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(releaseX.toDate);
        return copy;
    }

    /**
     * Convert a ReleaseXMySuffix to a JSON which can be sent to the server.
     */
    private convert(releaseX: ReleaseXMySuffix): ReleaseXMySuffix {
        const copy: ReleaseXMySuffix = Object.assign({}, releaseX);

        copy.fromDate = this.dateUtils.toDate(releaseX.fromDate);

        copy.toDate = this.dateUtils.toDate(releaseX.toDate);
        return copy;
    }
}
