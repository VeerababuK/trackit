import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IterationMySuffix } from './iteration-my-suffix.model';
import { IterationMySuffixPopupService } from './iteration-my-suffix-popup.service';
import { IterationMySuffixService } from './iteration-my-suffix.service';

@Component({
    selector: 'jhi-iteration-my-suffix-dialog',
    templateUrl: './iteration-my-suffix-dialog.component.html'
})
export class IterationMySuffixDialogComponent implements OnInit {

    iteration: IterationMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private iterationService: IterationMySuffixService,
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
        if (this.iteration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.iterationService.update(this.iteration));
        } else {
            this.subscribeToSaveResponse(
                this.iterationService.create(this.iteration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IterationMySuffix>>) {
        result.subscribe((res: HttpResponse<IterationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IterationMySuffix) {
        this.eventManager.broadcast({ name: 'iterationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-iteration-my-suffix-popup',
    template: ''
})
export class IterationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterationPopupService: IterationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.iterationPopupService
                    .open(IterationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.iterationPopupService
                    .open(IterationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
