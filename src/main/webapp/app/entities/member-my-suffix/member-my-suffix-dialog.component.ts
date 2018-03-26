import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MemberMySuffix } from './member-my-suffix.model';
import { MemberMySuffixPopupService } from './member-my-suffix-popup.service';
import { MemberMySuffixService } from './member-my-suffix.service';
import { ProjectMySuffix, ProjectMySuffixService } from '../project-my-suffix';

@Component({
    selector: 'jhi-member-my-suffix-dialog',
    templateUrl: './member-my-suffix-dialog.component.html'
})
export class MemberMySuffixDialogComponent implements OnInit {

    member: MemberMySuffix;
    isSaving: boolean;

    projects: ProjectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private memberService: MemberMySuffixService,
        private projectService: ProjectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: HttpResponse<ProjectMySuffix[]>) => { this.projects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.member.id !== undefined) {
            this.subscribeToSaveResponse(
                this.memberService.update(this.member));
        } else {
            this.subscribeToSaveResponse(
                this.memberService.create(this.member));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MemberMySuffix>>) {
        result.subscribe((res: HttpResponse<MemberMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MemberMySuffix) {
        this.eventManager.broadcast({ name: 'memberListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: ProjectMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-member-my-suffix-popup',
    template: ''
})
export class MemberMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberPopupService: MemberMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.memberPopupService
                    .open(MemberMySuffixDialogComponent as Component, params['id']);
            } else {
                this.memberPopupService
                    .open(MemberMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
