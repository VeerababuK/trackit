import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DiscussionMySuffix } from './discussion-my-suffix.model';
import { DiscussionMySuffixService } from './discussion-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-discussion-my-suffix',
    templateUrl: './discussion-my-suffix.component.html'
})
export class DiscussionMySuffixComponent implements OnInit, OnDestroy {
discussions: DiscussionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private discussionService: DiscussionMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.discussionService.query().subscribe(
            (res: HttpResponse<DiscussionMySuffix[]>) => {
                this.discussions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiscussions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DiscussionMySuffix) {
        return item.id;
    }
    registerChangeInDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('discussionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
