import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CalendarMySuffix } from './calendar-my-suffix.model';
import { CalendarMySuffixService } from './calendar-my-suffix.service';

@Injectable()
export class CalendarMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calendarService: CalendarMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.calendarService.find(id)
                    .subscribe((calendarResponse: HttpResponse<CalendarMySuffix>) => {
                        const calendar: CalendarMySuffix = calendarResponse.body;
                        calendar.date = this.datePipe
                            .transform(calendar.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.calendarModalRef(component, calendar);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calendarModalRef(component, new CalendarMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calendarModalRef(component: Component, calendar: CalendarMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calendar = calendar;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
