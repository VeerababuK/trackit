import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { ReleaseXMySuffixPopupService } from './release-x-my-suffix-popup.service';
import { ReleaseXMySuffixService } from './release-x-my-suffix.service';

@Component({
    selector: 'jhi-release-x-my-suffix-delete-dialog',
    templateUrl: './release-x-my-suffix-delete-dialog.component.html'
})
export class ReleaseXMySuffixDeleteDialogComponent {

    releaseX: ReleaseXMySuffix;

    constructor(
        private releaseXService: ReleaseXMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.releaseXService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'releaseXListModification',
                content: 'Deleted an releaseX'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-release-x-my-suffix-delete-popup',
    template: ''
})
export class ReleaseXMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private releaseXPopupService: ReleaseXMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.releaseXPopupService
                .open(ReleaseXMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
