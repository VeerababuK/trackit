import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { MilestoneMySuffixPopupService } from './milestone-my-suffix-popup.service';
import { MilestoneMySuffixService } from './milestone-my-suffix.service';

@Component({
    selector: 'jhi-milestone-my-suffix-dialog',
    templateUrl: './milestone-my-suffix-dialog.component.html'
})
export class MilestoneMySuffixDialogComponent implements OnInit {

    milestone: MilestoneMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private milestoneService: MilestoneMySuffixService,
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
        if (this.milestone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.milestoneService.update(this.milestone));
        } else {
            this.subscribeToSaveResponse(
                this.milestoneService.create(this.milestone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MilestoneMySuffix>>) {
        result.subscribe((res: HttpResponse<MilestoneMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MilestoneMySuffix) {
        this.eventManager.broadcast({ name: 'milestoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-milestone-my-suffix-popup',
    template: ''
})
export class MilestoneMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private milestonePopupService: MilestoneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.milestonePopupService
                    .open(MilestoneMySuffixDialogComponent as Component, params['id']);
            } else {
                this.milestonePopupService
                    .open(MilestoneMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
