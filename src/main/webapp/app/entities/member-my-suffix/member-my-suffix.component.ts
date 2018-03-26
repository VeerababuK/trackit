import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MemberMySuffix } from './member-my-suffix.model';
import { MemberMySuffixService } from './member-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-member-my-suffix',
    templateUrl: './member-my-suffix.component.html'
})
export class MemberMySuffixComponent implements OnInit, OnDestroy {
members: MemberMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private memberService: MemberMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.memberService.query().subscribe(
            (res: HttpResponse<MemberMySuffix[]>) => {
                this.members = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMembers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MemberMySuffix) {
        return item.id;
    }
    registerChangeInMembers() {
        this.eventSubscriber = this.eventManager.subscribe('memberListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
