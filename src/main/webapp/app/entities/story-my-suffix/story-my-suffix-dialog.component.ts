import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoryMySuffix } from './story-my-suffix.model';
import { StoryMySuffixPopupService } from './story-my-suffix-popup.service';
import { StoryMySuffixService } from './story-my-suffix.service';
import { FeatureMySuffix, FeatureMySuffixService } from '../feature-my-suffix';
import { IterationMySuffix, IterationMySuffixService } from '../iteration-my-suffix';
import { ReleaseXMySuffix, ReleaseXMySuffixService } from '../release-x-my-suffix';
import { MilestoneMySuffix, MilestoneMySuffixService } from '../milestone-my-suffix';
import { MemberMySuffix, MemberMySuffixService } from '../member-my-suffix';

@Component({
    selector: 'jhi-story-my-suffix-dialog',
    templateUrl: './story-my-suffix-dialog.component.html'
})
export class StoryMySuffixDialogComponent implements OnInit {

    story: StoryMySuffix;
    isSaving: boolean;

    features: FeatureMySuffix[];

    iterations: IterationMySuffix[];

    releasexes: ReleaseXMySuffix[];

    milestones: MilestoneMySuffix[];

    stories: StoryMySuffix[];

    members: MemberMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private storyService: StoryMySuffixService,
        private featureService: FeatureMySuffixService,
        private iterationService: IterationMySuffixService,
        private releaseXService: ReleaseXMySuffixService,
        private milestoneService: MilestoneMySuffixService,
        private memberService: MemberMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.featureService.query()
            .subscribe((res: HttpResponse<FeatureMySuffix[]>) => { this.features = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.iterationService
            .query({filter: 'story-is-null'})
            .subscribe((res: HttpResponse<IterationMySuffix[]>) => {
                if (!this.story.iterationId) {
                    this.iterations = res.body;
                } else {
                    this.iterationService
                        .find(this.story.iterationId)
                        .subscribe((subRes: HttpResponse<IterationMySuffix>) => {
                            this.iterations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.releaseXService
            .query({filter: 'story-is-null'})
            .subscribe((res: HttpResponse<ReleaseXMySuffix[]>) => {
                if (!this.story.releaseXId) {
                    this.releasexes = res.body;
                } else {
                    this.releaseXService
                        .find(this.story.releaseXId)
                        .subscribe((subRes: HttpResponse<ReleaseXMySuffix>) => {
                            this.releasexes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.milestoneService
            .query({filter: 'story-is-null'})
            .subscribe((res: HttpResponse<MilestoneMySuffix[]>) => {
                if (!this.story.milestoneId) {
                    this.milestones = res.body;
                } else {
                    this.milestoneService
                        .find(this.story.milestoneId)
                        .subscribe((subRes: HttpResponse<MilestoneMySuffix>) => {
                            this.milestones = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.story.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storyService.update(this.story));
        } else {
            this.subscribeToSaveResponse(
                this.storyService.create(this.story));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StoryMySuffix>>) {
        result.subscribe((res: HttpResponse<StoryMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StoryMySuffix) {
        this.eventManager.broadcast({ name: 'storyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFeatureById(index: number, item: FeatureMySuffix) {
        return item.id;
    }

    trackIterationById(index: number, item: IterationMySuffix) {
        return item.id;
    }

    trackReleaseXById(index: number, item: ReleaseXMySuffix) {
        return item.id;
    }

    trackMilestoneById(index: number, item: MilestoneMySuffix) {
        return item.id;
    }

    trackStoryById(index: number, item: StoryMySuffix) {
        return item.id;
    }

    trackMemberById(index: number, item: MemberMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-story-my-suffix-popup',
    template: ''
})
export class StoryMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storyPopupService: StoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storyPopupService
                    .open(StoryMySuffixDialogComponent as Component, params['id']);
            } else {
                this.storyPopupService
                    .open(StoryMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
