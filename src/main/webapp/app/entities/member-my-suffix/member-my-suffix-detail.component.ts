import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MemberMySuffix } from './member-my-suffix.model';
import { MemberMySuffixService } from './member-my-suffix.service';

@Component({
    selector: 'jhi-member-my-suffix-detail',
    templateUrl: './member-my-suffix-detail.component.html'
})
export class MemberMySuffixDetailComponent implements OnInit, OnDestroy {

    member: MemberMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private memberService: MemberMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMembers();
    }

    load(id) {
        this.memberService.find(id)
            .subscribe((memberResponse: HttpResponse<MemberMySuffix>) => {
                this.member = memberResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMembers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'memberListModification',
            (response) => this.load(this.member.id)
        );
    }
}
