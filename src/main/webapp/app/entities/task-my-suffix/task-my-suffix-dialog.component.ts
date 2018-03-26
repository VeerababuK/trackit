import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TaskMySuffix } from './task-my-suffix.model';
import { TaskMySuffixPopupService } from './task-my-suffix-popup.service';
import { TaskMySuffixService } from './task-my-suffix.service';
import { StoryMySuffix, StoryMySuffixService } from '../story-my-suffix';
import { IterationMySuffix, IterationMySuffixService } from '../iteration-my-suffix';
import { ReleaseXMySuffix, ReleaseXMySuffixService } from '../release-x-my-suffix';
import { MemberMySuffix, MemberMySuffixService } from '../member-my-suffix';

@Component({
    selector: 'jhi-task-my-suffix-dialog',
    templateUrl: './task-my-suffix-dialog.component.html'
})
export class TaskMySuffixDialogComponent implements OnInit {

    task: TaskMySuffix;
    isSaving: boolean;

    stories: StoryMySuffix[];

    iterations: IterationMySuffix[];

    releasexes: ReleaseXMySuffix[];

    members: MemberMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private taskService: TaskMySuffixService,
        private storyService: StoryMySuffixService,
        private iterationService: IterationMySuffixService,
        private releaseXService: ReleaseXMySuffixService,
        private memberService: MemberMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storyService.query()
            .subscribe((res: HttpResponse<StoryMySuffix[]>) => { this.stories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.iterationService
            .query({filter: 'task-is-null'})
            .subscribe((res: HttpResponse<IterationMySuffix[]>) => {
                if (!this.task.iterationId) {
                    this.iterations = res.body;
                } else {
                    this.iterationService
                        .find(this.task.iterationId)
                        .subscribe((subRes: HttpResponse<IterationMySuffix>) => {
                            this.iterations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.releaseXService
            .query({filter: 'task-is-null'})
            .subscribe((res: HttpResponse<ReleaseXMySuffix[]>) => {
                if (!this.task.releaseXId) {
                    this.releasexes = res.body;
                } else {
                    this.releaseXService
                        .find(this.task.releaseXId)
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
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TaskMySuffix>>) {
        result.subscribe((res: HttpResponse<TaskMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TaskMySuffix) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
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

    trackIterationById(index: number, item: IterationMySuffix) {
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
    selector: 'jhi-task-my-suffix-popup',
    template: ''
})
export class TaskMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskPopupService
                    .open(TaskMySuffixDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService
                    .open(TaskMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
