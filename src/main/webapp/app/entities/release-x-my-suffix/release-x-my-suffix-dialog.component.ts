import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { ReleaseXMySuffixPopupService } from './release-x-my-suffix-popup.service';
import { ReleaseXMySuffixService } from './release-x-my-suffix.service';

@Component({
    selector: 'jhi-release-x-my-suffix-dialog',
    templateUrl: './release-x-my-suffix-dialog.component.html'
})
export class ReleaseXMySuffixDialogComponent implements OnInit {

    releaseX: ReleaseXMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private releaseXService: ReleaseXMySuffixService,
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
        if (this.releaseX.id !== undefined) {
            this.subscribeToSaveResponse(
                this.releaseXService.update(this.releaseX));
        } else {
            this.subscribeToSaveResponse(
                this.releaseXService.create(this.releaseX));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReleaseXMySuffix>>) {
        result.subscribe((res: HttpResponse<ReleaseXMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReleaseXMySuffix) {
        this.eventManager.broadcast({ name: 'releaseXListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-release-x-my-suffix-popup',
    template: ''
})
export class ReleaseXMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private releaseXPopupService: ReleaseXMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.releaseXPopupService
                    .open(ReleaseXMySuffixDialogComponent as Component, params['id']);
            } else {
                this.releaseXPopupService
                    .open(ReleaseXMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
