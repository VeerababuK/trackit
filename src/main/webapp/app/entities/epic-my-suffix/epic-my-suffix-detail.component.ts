import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EpicMySuffix } from './epic-my-suffix.model';
import { EpicMySuffixService } from './epic-my-suffix.service';

@Component({
    selector: 'jhi-epic-my-suffix-detail',
    templateUrl: './epic-my-suffix-detail.component.html'
})
export class EpicMySuffixDetailComponent implements OnInit, OnDestroy {

    epic: EpicMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private epicService: EpicMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEpics();
    }

    load(id) {
        this.epicService.find(id)
            .subscribe((epicResponse: HttpResponse<EpicMySuffix>) => {
                this.epic = epicResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEpics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'epicListModification',
            (response) => this.load(this.epic.id)
        );
    }
}
