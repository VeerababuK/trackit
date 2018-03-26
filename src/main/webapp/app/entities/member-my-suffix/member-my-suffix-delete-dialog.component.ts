import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MemberMySuffix } from './member-my-suffix.model';
import { MemberMySuffixPopupService } from './member-my-suffix-popup.service';
import { MemberMySuffixService } from './member-my-suffix.service';

@Component({
    selector: 'jhi-member-my-suffix-delete-dialog',
    templateUrl: './member-my-suffix-delete-dialog.component.html'
})
export class MemberMySuffixDeleteDialogComponent {

    member: MemberMySuffix;

    constructor(
        private memberService: MemberMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.memberService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'memberListModification',
                content: 'Deleted an member'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-member-my-suffix-delete-popup',
    template: ''
})
export class MemberMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private memberPopupService: MemberMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.memberPopupService
                .open(MemberMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
