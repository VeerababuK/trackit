import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TagMySuffix } from './tag-my-suffix.model';
import { TagMySuffixPopupService } from './tag-my-suffix-popup.service';
import { TagMySuffixService } from './tag-my-suffix.service';
import { EpicMySuffix, EpicMySuffixService } from '../epic-my-suffix';
import { StoryMySuffix, StoryMySuffixService } from '../story-my-suffix';
import { TaskMySuffix, TaskMySuffixService } from '../task-my-suffix';

@Component({
    selector: 'jhi-tag-my-suffix-dialog',
    templateUrl: './tag-my-suffix-dialog.component.html'
})
export class TagMySuffixDialogComponent implements OnInit {

    tag: TagMySuffix;
    isSaving: boolean;

    epics: EpicMySuffix[];

    stories: StoryMySuffix[];

    tasks: TaskMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tagService: TagMySuffixService,
        private epicService: EpicMySuffixService,
        private storyService: StoryMySuffixService,
        private taskService: TaskMySuffixService,
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
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tagService.update(this.tag));
        } else {
            this.subscribeToSaveResponse(
                this.tagService.create(this.tag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TagMySuffix>>) {
        result.subscribe((res: HttpResponse<TagMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TagMySuffix) {
        this.eventManager.broadcast({ name: 'tagListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tag-my-suffix-popup',
    template: ''
})
export class TagMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tagPopupService: TagMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tagPopupService
                    .open(TagMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tagPopupService
                    .open(TagMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
