import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MilestoneMySuffix>;

@Injectable()
export class MilestoneMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/milestones';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(milestone: MilestoneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(milestone);
        return this.http.post<MilestoneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(milestone: MilestoneMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(milestone);
        return this.http.put<MilestoneMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MilestoneMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MilestoneMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MilestoneMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MilestoneMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MilestoneMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MilestoneMySuffix[]>): HttpResponse<MilestoneMySuffix[]> {
        const jsonResponse: MilestoneMySuffix[] = res.body;
        const body: MilestoneMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MilestoneMySuffix.
     */
    private convertItemFromServer(milestone: MilestoneMySuffix): MilestoneMySuffix {
        const copy: MilestoneMySuffix = Object.assign({}, milestone);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(milestone.date);
        return copy;
    }

    /**
     * Convert a MilestoneMySuffix to a JSON which can be sent to the server.
     */
    private convert(milestone: MilestoneMySuffix): MilestoneMySuffix {
        const copy: MilestoneMySuffix = Object.assign({}, milestone);

        copy.date = this.dateUtils.toDate(milestone.date);
        return copy;
    }
}
