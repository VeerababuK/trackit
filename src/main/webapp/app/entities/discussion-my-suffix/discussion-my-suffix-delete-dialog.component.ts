import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DiscussionMySuffix } from './discussion-my-suffix.model';
import { DiscussionMySuffixPopupService } from './discussion-my-suffix-popup.service';
import { DiscussionMySuffixService } from './discussion-my-suffix.service';

@Component({
    selector: 'jhi-discussion-my-suffix-delete-dialog',
    templateUrl: './discussion-my-suffix-delete-dialog.component.html'
})
export class DiscussionMySuffixDeleteDialogComponent {

    discussion: DiscussionMySuffix;

    constructor(
        private discussionService: DiscussionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discussionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discussionListModification',
                content: 'Deleted an discussion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discussion-my-suffix-delete-popup',
    template: ''
})
export class DiscussionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discussionPopupService: DiscussionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discussionPopupService
                .open(DiscussionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
