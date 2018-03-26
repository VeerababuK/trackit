import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CalendarMySuffix } from './calendar-my-suffix.model';
import { CalendarMySuffixPopupService } from './calendar-my-suffix-popup.service';
import { CalendarMySuffixService } from './calendar-my-suffix.service';

@Component({
    selector: 'jhi-calendar-my-suffix-delete-dialog',
    templateUrl: './calendar-my-suffix-delete-dialog.component.html'
})
export class CalendarMySuffixDeleteDialogComponent {

    calendar: CalendarMySuffix;

    constructor(
        private calendarService: CalendarMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calendarService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calendarListModification',
                content: 'Deleted an calendar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calendar-my-suffix-delete-popup',
    template: ''
})
export class CalendarMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calendarPopupService: CalendarMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calendarPopupService
                .open(CalendarMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
