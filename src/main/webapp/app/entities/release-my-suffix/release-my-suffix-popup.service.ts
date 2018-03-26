import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Release_MySuffix } from './release-my-suffix.model';
import { Release_MySuffixService } from './release-my-suffix.service';

@Injectable()
export class Release_MySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private release_Service: Release_MySuffixService

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
                this.release_Service.find(id)
                    .subscribe((release_Response: HttpResponse<Release_MySuffix>) => {
                        const release_: Release_MySuffix = release_Response.body;
                        release_.fromDate = this.datePipe
                            .transform(release_.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        release_.toDate = this.datePipe
                            .transform(release_.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.release_ModalRef(component, release_);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.release_ModalRef(component, new Release_MySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    release_ModalRef(component: Component, release_: Release_MySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.release_ = release_;
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
