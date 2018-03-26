import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { ReleaseXMySuffixService } from './release-x-my-suffix.service';

@Injectable()
export class ReleaseXMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private releaseXService: ReleaseXMySuffixService

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
                this.releaseXService.find(id)
                    .subscribe((releaseXResponse: HttpResponse<ReleaseXMySuffix>) => {
                        const releaseX: ReleaseXMySuffix = releaseXResponse.body;
                        releaseX.fromDate = this.datePipe
                            .transform(releaseX.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        releaseX.toDate = this.datePipe
                            .transform(releaseX.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.releaseXModalRef(component, releaseX);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.releaseXModalRef(component, new ReleaseXMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    releaseXModalRef(component: Component, releaseX: ReleaseXMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.releaseX = releaseX;
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
