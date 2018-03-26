import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DefectMySuffix } from './defect-my-suffix.model';
import { DefectMySuffixPopupService } from './defect-my-suffix-popup.service';
import { DefectMySuffixService } from './defect-my-suffix.service';
import { StoryMySuffix, StoryMySuffixService } from '../story-my-suffix';
import { MemberMySuffix, MemberMySuffixService } from '../member-my-suffix';

@Component({
    selector: 'jhi-defect-my-suffix-dialog',
    templateUrl: './defect-my-suffix-dialog.component.html'
})
export class DefectMySuffixDialogComponent implements OnInit {

    defect: DefectMySuffix;
    isSaving: boolean;

    stories: StoryMySuffix[];

    members: MemberMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private defectService: DefectMySuffixService,
        private storyService: StoryMySuffixService,
        private memberService: MemberMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storyService.query()
            .subscribe((res: HttpResponse<StoryMySuffix[]>) => { this.stories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.memberService.query()
            .subscribe((res: HttpResponse<MemberMySuffix[]>) => { this.members = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.defect.id !== undefined) {
            this.subscribeToSaveResponse(
                this.defectService.update(this.defect));
        } else {
            this.subscribeToSaveResponse(
                this.defectService.create(this.defect));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DefectMySuffix>>) {
        result.subscribe((res: HttpResponse<DefectMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DefectMySuffix) {
        this.eventManager.broadcast({ name: 'defectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStoryById(index: number, item: StoryMySuffix) {
        return item.id;
    }

    trackMemberById(index: number, item: MemberMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-defect-my-suffix-popup',
    template: ''
})
export class DefectMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defectPopupService: DefectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.defectPopupService
                    .open(DefectMySuffixDialogComponent as Component, params['id']);
            } else {
                this.defectPopupService
                    .open(DefectMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
