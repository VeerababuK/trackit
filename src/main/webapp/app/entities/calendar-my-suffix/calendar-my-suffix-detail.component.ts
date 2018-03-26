import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CalendarMySuffix } from './calendar-my-suffix.model';
import { CalendarMySuffixService } from './calendar-my-suffix.service';

@Component({
    selector: 'jhi-calendar-my-suffix-detail',
    templateUrl: './calendar-my-suffix-detail.component.html'
})
export class CalendarMySuffixDetailComponent implements OnInit, OnDestroy {

    calendar: CalendarMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calendarService: CalendarMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalendars();
    }

    load(id) {
        this.calendarService.find(id)
            .subscribe((calendarResponse: HttpResponse<CalendarMySuffix>) => {
                this.calendar = calendarResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalendars() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calendarListModification',
            (response) => this.load(this.calendar.id)
        );
    }
}
