import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { MilestoneMySuffixService } from './milestone-my-suffix.service';

@Component({
    selector: 'jhi-milestone-my-suffix-detail',
    templateUrl: './milestone-my-suffix-detail.component.html'
})
export class MilestoneMySuffixDetailComponent implements OnInit, OnDestroy {

    milestone: MilestoneMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private milestoneService: MilestoneMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMilestones();
    }

    load(id) {
        this.milestoneService.find(id)
            .subscribe((milestoneResponse: HttpResponse<MilestoneMySuffix>) => {
                this.milestone = milestoneResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMilestones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'milestoneListModification',
            (response) => this.load(this.milestone.id)
        );
    }
}
