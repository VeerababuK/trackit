import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IterationMySuffix } from './iteration-my-suffix.model';
import { IterationMySuffixService } from './iteration-my-suffix.service';

@Component({
    selector: 'jhi-iteration-my-suffix-detail',
    templateUrl: './iteration-my-suffix-detail.component.html'
})
export class IterationMySuffixDetailComponent implements OnInit, OnDestroy {

    iteration: IterationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private iterationService: IterationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIterations();
    }

    load(id) {
        this.iterationService.find(id)
            .subscribe((iterationResponse: HttpResponse<IterationMySuffix>) => {
                this.iteration = iterationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIterations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'iterationListModification',
            (response) => this.load(this.iteration.id)
        );
    }
}
