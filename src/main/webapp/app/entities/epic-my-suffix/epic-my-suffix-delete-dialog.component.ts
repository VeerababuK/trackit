import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EpicMySuffix } from './epic-my-suffix.model';
import { EpicMySuffixPopupService } from './epic-my-suffix-popup.service';
import { EpicMySuffixService } from './epic-my-suffix.service';

@Component({
    selector: 'jhi-epic-my-suffix-delete-dialog',
    templateUrl: './epic-my-suffix-delete-dialog.component.html'
})
export class EpicMySuffixDeleteDialogComponent {

    epic: EpicMySuffix;

    constructor(
        private epicService: EpicMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.epicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'epicListModification',
                content: 'Deleted an epic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-epic-my-suffix-delete-popup',
    template: ''
})
export class EpicMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private epicPopupService: EpicMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.epicPopupService
                .open(EpicMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
