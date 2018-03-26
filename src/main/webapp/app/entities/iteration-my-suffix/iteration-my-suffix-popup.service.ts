import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IterationMySuffix } from './iteration-my-suffix.model';
import { IterationMySuffixService } from './iteration-my-suffix.service';

@Injectable()
export class IterationMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private iterationService: IterationMySuffixService

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
                this.iterationService.find(id)
                    .subscribe((iterationResponse: HttpResponse<IterationMySuffix>) => {
                        const iteration: IterationMySuffix = iterationResponse.body;
                        iteration.fromDate = this.datePipe
                            .transform(iteration.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        iteration.toDate = this.datePipe
                            .transform(iteration.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.iterationModalRef(component, iteration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.iterationModalRef(component, new IterationMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    iterationModalRef(component: Component, iteration: IterationMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.iteration = iteration;
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
