import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CalendarMySuffix } from './calendar-my-suffix.model';
import { CalendarMySuffixPopupService } from './calendar-my-suffix-popup.service';
import { CalendarMySuffixService } from './calendar-my-suffix.service';

@Component({
    selector: 'jhi-calendar-my-suffix-dialog',
    templateUrl: './calendar-my-suffix-dialog.component.html'
})
export class CalendarMySuffixDialogComponent implements OnInit {

    calendar: CalendarMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private calendarService: CalendarMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calendar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calendarService.update(this.calendar));
        } else {
            this.subscribeToSaveResponse(
                this.calendarService.create(this.calendar));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CalendarMySuffix>>) {
        result.subscribe((res: HttpResponse<CalendarMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CalendarMySuffix) {
        this.eventManager.broadcast({ name: 'calendarListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-calendar-my-suffix-popup',
    template: ''
})
export class CalendarMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calendarPopupService: CalendarMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calendarPopupService
                    .open(CalendarMySuffixDialogComponent as Component, params['id']);
            } else {
                this.calendarPopupService
                    .open(CalendarMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
