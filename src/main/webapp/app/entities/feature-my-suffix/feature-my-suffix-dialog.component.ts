import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FeatureMySuffix } from './feature-my-suffix.model';
import { FeatureMySuffixPopupService } from './feature-my-suffix-popup.service';
import { FeatureMySuffixService } from './feature-my-suffix.service';
import { EpicMySuffix, EpicMySuffixService } from '../epic-my-suffix';
import { MilestoneMySuffix, MilestoneMySuffixService } from '../milestone-my-suffix';
import { ReleaseXMySuffix, ReleaseXMySuffixService } from '../release-x-my-suffix';
import { MemberMySuffix, MemberMySuffixService } from '../member-my-suffix';

@Component({
    selector: 'jhi-feature-my-suffix-dialog',
    templateUrl: './feature-my-suffix-dialog.component.html'
})
export class FeatureMySuffixDialogComponent implements OnInit {

    feature: FeatureMySuffix;
    isSaving: boolean;

    epics: EpicMySuffix[];

    milestones: MilestoneMySuffix[];

    releasexes: ReleaseXMySuffix[];

    members: MemberMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private featureService: FeatureMySuffixService,
        private epicService: EpicMySuffixService,
        private milestoneService: MilestoneMySuffixService,
        private releaseXService: ReleaseXMySuffixService,
        private memberService: MemberMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.epicService.query()
            .subscribe((res: HttpResponse<EpicMySuffix[]>) => { this.epics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.milestoneService
            .query({filter: 'feature-is-null'})
            .subscribe((res: HttpResponse<MilestoneMySuffix[]>) => {
                if (!this.feature.milestoneId) {
                    this.milestones = res.body;
                } else {
                    this.milestoneService
                        .find(this.feature.milestoneId)
                        .subscribe((subRes: HttpResponse<MilestoneMySuffix>) => {
                            this.milestones = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.releaseXService
            .query({filter: 'feature-is-null'})
            .subscribe((res: HttpResponse<ReleaseXMySuffix[]>) => {
                if (!this.feature.releaseXId) {
                    this.releasexes = res.body;
                } else {
                    this.releaseXService
                        .find(this.feature.releaseXId)
                        .subscribe((subRes: HttpResponse<ReleaseXMySuffix>) => {
                            this.releasexes = [subRes.body].concat(res.body);
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
        if (this.feature.id !== undefined) {
            this.subscribeToSaveResponse(
                this.featureService.update(this.feature));
        } else {
            this.subscribeToSaveResponse(
                this.featureService.create(this.feature));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FeatureMySuffix>>) {
        result.subscribe((res: HttpResponse<FeatureMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FeatureMySuffix) {
        this.eventManager.broadcast({ name: 'featureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEpicById(index: number, item: EpicMySuffix) {
        return item.id;
    }

    trackMilestoneById(index: number, item: MilestoneMySuffix) {
        return item.id;
    }

    trackReleaseXById(index: number, item: ReleaseXMySuffix) {
        return item.id;
    }

    trackMemberById(index: number, item: MemberMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-feature-my-suffix-popup',
    template: ''
})
export class FeatureMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private featurePopupService: FeatureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.featurePopupService
                    .open(FeatureMySuffixDialogComponent as Component, params['id']);
            } else {
                this.featurePopupService
                    .open(FeatureMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
