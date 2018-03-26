import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IterationMySuffix } from './iteration-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IterationMySuffix>;

@Injectable()
export class IterationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/iterations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(iteration: IterationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(iteration);
        return this.http.post<IterationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(iteration: IterationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(iteration);
        return this.http.put<IterationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IterationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IterationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<IterationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IterationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IterationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IterationMySuffix[]>): HttpResponse<IterationMySuffix[]> {
        const jsonResponse: IterationMySuffix[] = res.body;
        const body: IterationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IterationMySuffix.
     */
    private convertItemFromServer(iteration: IterationMySuffix): IterationMySuffix {
        const copy: IterationMySuffix = Object.assign({}, iteration);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(iteration.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(iteration.toDate);
        return copy;
    }

    /**
     * Convert a IterationMySuffix to a JSON which can be sent to the server.
     */
    private convert(iteration: IterationMySuffix): IterationMySuffix {
        const copy: IterationMySuffix = Object.assign({}, iteration);

        copy.fromDate = this.dateUtils.toDate(iteration.fromDate);

        copy.toDate = this.dateUtils.toDate(iteration.toDate);
        return copy;
    }
}
