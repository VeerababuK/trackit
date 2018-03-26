import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { MilestoneMySuffixService } from './milestone-my-suffix.service';

@Injectable()
export class MilestoneMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private milestoneService: MilestoneMySuffixService

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
                this.milestoneService.find(id)
                    .subscribe((milestoneResponse: HttpResponse<MilestoneMySuffix>) => {
                        const milestone: MilestoneMySuffix = milestoneResponse.body;
                        milestone.date = this.datePipe
                            .transform(milestone.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.milestoneModalRef(component, milestone);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.milestoneModalRef(component, new MilestoneMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    milestoneModalRef(component: Component, milestone: MilestoneMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.milestone = milestone;
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
