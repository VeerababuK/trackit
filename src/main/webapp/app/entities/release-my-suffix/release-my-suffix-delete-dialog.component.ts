import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Release_MySuffix } from './release-my-suffix.model';
import { Release_MySuffixPopupService } from './release-my-suffix-popup.service';
import { Release_MySuffixService } from './release-my-suffix.service';

@Component({
    selector: 'jhi-release-my-suffix-delete-dialog',
    templateUrl: './release-my-suffix-delete-dialog.component.html'
})
export class Release_MySuffixDeleteDialogComponent {

    release_: Release_MySuffix;

    constructor(
        private release_Service: Release_MySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.release_Service.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'release_ListModification',
                content: 'Deleted an release_'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-release-my-suffix-delete-popup',
    template: ''
})
export class Release_MySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private release_PopupService: Release_MySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.release_PopupService
                .open(Release_MySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
