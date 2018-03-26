import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiscussionMySuffix } from './discussion-my-suffix.model';
import { DiscussionMySuffixPopupService } from './discussion-my-suffix-popup.service';
import { DiscussionMySuffixService } from './discussion-my-suffix.service';
import { EpicMySuffix, EpicMySuffixService } from '../epic-my-suffix';
import { StoryMySuffix, StoryMySuffixService } from '../story-my-suffix';
import { TaskMySuffix, TaskMySuffixService } from '../task-my-suffix';
import { DefectMySuffix, DefectMySuffixService } from '../defect-my-suffix';

@Component({
    selector: 'jhi-discussion-my-suffix-dialog',
    templateUrl: './discussion-my-suffix-dialog.component.html'
})
export class DiscussionMySuffixDialogComponent implements OnInit {

    discussion: DiscussionMySuffix;
    isSaving: boolean;

    epics: EpicMySuffix[];

    stories: StoryMySuffix[];

    tasks: TaskMySuffix[];

    defects: DefectMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discussionService: DiscussionMySuffixService,
        private epicService: EpicMySuffixService,
        private storyService: StoryMySuffixService,
        private taskService: TaskMySuffixService,
        private defectService: DefectMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.epicService.query()
            .subscribe((res: HttpResponse<EpicMySuffix[]>) => { this.epics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.storyService.query()
            .subscribe((res: HttpResponse<StoryMySuffix[]>) => { this.stories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.taskService.query()
            .subscribe((res: HttpResponse<TaskMySuffix[]>) => { this.tasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.defectService.query()
            .subscribe((res: HttpResponse<DefectMySuffix[]>) => { this.defects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discussion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discussionService.update(this.discussion));
        } else {
            this.subscribeToSaveResponse(
                this.discussionService.create(this.discussion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DiscussionMySuffix>>) {
        result.subscribe((res: HttpResponse<DiscussionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DiscussionMySuffix) {
        this.eventManager.broadcast({ name: 'discussionListModification', content: 'OK'});
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

    trackStoryById(index: number, item: StoryMySuffix) {
        return item.id;
    }

    trackTaskById(index: number, item: TaskMySuffix) {
        return item.id;
    }

    trackDefectById(index: number, item: DefectMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-discussion-my-suffix-popup',
    template: ''
})
export class DiscussionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discussionPopupService: DiscussionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discussionPopupService
                    .open(DiscussionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.discussionPopupService
                    .open(DiscussionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
