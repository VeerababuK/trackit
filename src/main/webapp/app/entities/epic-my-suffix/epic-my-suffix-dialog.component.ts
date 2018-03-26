import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EpicMySuffix } from './epic-my-suffix.model';
import { EpicMySuffixPopupService } from './epic-my-suffix-popup.service';
import { EpicMySuffixService } from './epic-my-suffix.service';
import { ReleaseXMySuffix, ReleaseXMySuffixService } from '../release-x-my-suffix';
import { MilestoneMySuffix, MilestoneMySuffixService } from '../milestone-my-suffix';
import { MemberMySuffix, MemberMySuffixService } from '../member-my-suffix';

@Component({
    selector: 'jhi-epic-my-suffix-dialog',
    templateUrl: './epic-my-suffix-dialog.component.html'
})
export class EpicMySuffixDialogComponent implements OnInit {

    epic: EpicMySuffix;
    isSaving: boolean;

    releasexes: ReleaseXMySuffix[];

    milestones: MilestoneMySuffix[];

    members: MemberMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private epicService: EpicMySuffixService,
        private releaseXService: ReleaseXMySuffixService,
        private milestoneService: MilestoneMySuffixService,
        private memberService: MemberMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.releaseXService
            .query({filter: 'epic-is-null'})
            .subscribe((res: HttpResponse<ReleaseXMySuffix[]>) => {
                if (!this.epic.releaseXId) {
                    this.releasexes = res.body;
                } else {
                    this.releaseXService
                        .find(this.epic.releaseXId)
                        .subscribe((subRes: HttpResponse<ReleaseXMySuffix>) => {
                            this.releasexes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.milestoneService
            .query({filter: 'epic-is-null'})
            .subscribe((res: HttpResponse<MilestoneMySuffix[]>) => {
                if (!this.epic.milestoneId) {
                    this.milestones = res.body;
                } else {
                    this.milestoneService
                        .find(this.epic.milestoneId)
                        .subscribe((subRes: HttpResponse<MilestoneMySuffix>) => {
                            this.milestones = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.memberService.query()
            .subscribe((res: HttpResponse<MemberMySuffix[]>) => { this.members = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.epic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.epicService.update(this.epic));
        } else {
            this.subscribeToSaveResponse(
                this.epicService.create(this.epic));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EpicMySuffix>>) {
        result.subscribe((res: HttpResponse<EpicMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EpicMySuffix) {
        this.eventManager.broadcast({ name: 'epicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReleaseXById(index: number, item: ReleaseXMySuffix) {
        return item.id;
    }

    trackMilestoneById(index: number, item: MilestoneMySuffix) {
        return item.id;
    }

    trackMemberById(index: number, item: MemberMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-epic-my-suffix-popup',
    template: ''
})
export class EpicMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private epicPopupService: EpicMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.epicPopupService
                    .open(EpicMySuffixDialogComponent as Component, params['id']);
            } else {
                this.epicPopupService
                    .open(EpicMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
