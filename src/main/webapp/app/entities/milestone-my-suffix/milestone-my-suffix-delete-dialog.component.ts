import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { MilestoneMySuffixPopupService } from './milestone-my-suffix-popup.service';
import { MilestoneMySuffixService } from './milestone-my-suffix.service';

@Component({
    selector: 'jhi-milestone-my-suffix-delete-dialog',
    templateUrl: './milestone-my-suffix-delete-dialog.component.html'
})
export class MilestoneMySuffixDeleteDialogComponent {

    milestone: MilestoneMySuffix;

    constructor(
        private milestoneService: MilestoneMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.milestoneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'milestoneListModification',
                content: 'Deleted an milestone'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-milestone-my-suffix-delete-popup',
    template: ''
})
export class MilestoneMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private milestonePopupService: MilestoneMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.milestonePopupService
                .open(MilestoneMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
