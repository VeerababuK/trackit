import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StoryMySuffix } from './story-my-suffix.model';
import { StoryMySuffixPopupService } from './story-my-suffix-popup.service';
import { StoryMySuffixService } from './story-my-suffix.service';

@Component({
    selector: 'jhi-story-my-suffix-delete-dialog',
    templateUrl: './story-my-suffix-delete-dialog.component.html'
})
export class StoryMySuffixDeleteDialogComponent {

    story: StoryMySuffix;

    constructor(
        private storyService: StoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storyListModification',
                content: 'Deleted an story'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-story-my-suffix-delete-popup',
    template: ''
})
export class StoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storyPopupService: StoryMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storyPopupService
                .open(StoryMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
