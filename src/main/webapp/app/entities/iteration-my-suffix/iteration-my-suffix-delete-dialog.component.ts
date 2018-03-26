import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IterationMySuffix } from './iteration-my-suffix.model';
import { IterationMySuffixPopupService } from './iteration-my-suffix-popup.service';
import { IterationMySuffixService } from './iteration-my-suffix.service';

@Component({
    selector: 'jhi-iteration-my-suffix-delete-dialog',
    templateUrl: './iteration-my-suffix-delete-dialog.component.html'
})
export class IterationMySuffixDeleteDialogComponent {

    iteration: IterationMySuffix;

    constructor(
        private iterationService: IterationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.iterationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'iterationListModification',
                content: 'Deleted an iteration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-iteration-my-suffix-delete-popup',
    template: ''
})
export class IterationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private iterationPopupService: IterationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.iterationPopupService
                .open(IterationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
