import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Release_MySuffix } from './release-my-suffix.model';
import { Release_MySuffixPopupService } from './release-my-suffix-popup.service';
import { Release_MySuffixService } from './release-my-suffix.service';

@Component({
    selector: 'jhi-release-my-suffix-dialog',
    templateUrl: './release-my-suffix-dialog.component.html'
})
export class Release_MySuffixDialogComponent implements OnInit {

    release_: Release_MySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private release_Service: Release_MySuffixService,
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
        if (this.release_.id !== undefined) {
            this.subscribeToSaveResponse(
                this.release_Service.update(this.release_));
        } else {
            this.subscribeToSaveResponse(
                this.release_Service.create(this.release_));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Release_MySuffix>>) {
        result.subscribe((res: HttpResponse<Release_MySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Release_MySuffix) {
        this.eventManager.broadcast({ name: 'release_ListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-release-my-suffix-popup',
    template: ''
})
export class Release_MySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private release_PopupService: Release_MySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.release_PopupService
                    .open(Release_MySuffixDialogComponent as Component, params['id']);
            } else {
                this.release_PopupService
                    .open(Release_MySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
