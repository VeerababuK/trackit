import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DefectMySuffix } from './defect-my-suffix.model';
import { DefectMySuffixPopupService } from './defect-my-suffix-popup.service';
import { DefectMySuffixService } from './defect-my-suffix.service';

@Component({
    selector: 'jhi-defect-my-suffix-delete-dialog',
    templateUrl: './defect-my-suffix-delete-dialog.component.html'
})
export class DefectMySuffixDeleteDialogComponent {

    defect: DefectMySuffix;

    constructor(
        private defectService: DefectMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.defectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'defectListModification',
                content: 'Deleted an defect'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-defect-my-suffix-delete-popup',
    template: ''
})
export class DefectMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private defectPopupService: DefectMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.defectPopupService
                .open(DefectMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
