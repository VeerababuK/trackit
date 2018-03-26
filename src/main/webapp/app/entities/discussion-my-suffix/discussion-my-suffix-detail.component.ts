import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DiscussionMySuffix } from './discussion-my-suffix.model';
import { DiscussionMySuffixService } from './discussion-my-suffix.service';

@Component({
    selector: 'jhi-discussion-my-suffix-detail',
    templateUrl: './discussion-my-suffix-detail.component.html'
})
export class DiscussionMySuffixDetailComponent implements OnInit, OnDestroy {

    discussion: DiscussionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discussionService: DiscussionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscussions();
    }

    load(id) {
        this.discussionService.find(id)
            .subscribe((discussionResponse: HttpResponse<DiscussionMySuffix>) => {
                this.discussion = discussionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discussionListModification',
            (response) => this.load(this.discussion.id)
        );
    }
}
