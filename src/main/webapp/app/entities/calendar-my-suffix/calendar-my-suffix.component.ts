import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CalendarMySuffix } from './calendar-my-suffix.model';
import { CalendarMySuffixService } from './calendar-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-calendar-my-suffix',
    templateUrl: './calendar-my-suffix.component.html'
})
export class CalendarMySuffixComponent implements OnInit, OnDestroy {
calendars: CalendarMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private calendarService: CalendarMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.calendarService.query().subscribe(
            (res: HttpResponse<CalendarMySuffix[]>) => {
                this.calendars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCalendars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CalendarMySuffix) {
        return item.id;
    }
    registerChangeInCalendars() {
        this.eventSubscriber = this.eventManager.subscribe('calendarListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
