import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CalendarMySuffix } from './calendar-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CalendarMySuffix>;

@Injectable()
export class CalendarMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/calendars';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(calendar: CalendarMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(calendar);
        return this.http.post<CalendarMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(calendar: CalendarMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(calendar);
        return this.http.put<CalendarMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CalendarMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CalendarMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CalendarMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CalendarMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CalendarMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CalendarMySuffix[]>): HttpResponse<CalendarMySuffix[]> {
        const jsonResponse: CalendarMySuffix[] = res.body;
        const body: CalendarMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CalendarMySuffix.
     */
    private convertItemFromServer(calendar: CalendarMySuffix): CalendarMySuffix {
        const copy: CalendarMySuffix = Object.assign({}, calendar);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(calendar.date);
        return copy;
    }

    /**
     * Convert a CalendarMySuffix to a JSON which can be sent to the server.
     */
    private convert(calendar: CalendarMySuffix): CalendarMySuffix {
        const copy: CalendarMySuffix = Object.assign({}, calendar);

        copy.date = this.dateUtils.toDate(calendar.date);
        return copy;
    }
}
