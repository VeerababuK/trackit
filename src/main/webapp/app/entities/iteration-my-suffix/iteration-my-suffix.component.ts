import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IterationMySuffix } from './iteration-my-suffix.model';
import { IterationMySuffixService } from './iteration-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-iteration-my-suffix',
    templateUrl: './iteration-my-suffix.component.html'
})
export class IterationMySuffixComponent implements OnInit, OnDestroy {
iterations: IterationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private iterationService: IterationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.iterationService.query().subscribe(
            (res: HttpResponse<IterationMySuffix[]>) => {
                this.iterations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIterations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IterationMySuffix) {
        return item.id;
    }
    registerChangeInIterations() {
        this.eventSubscriber = this.eventManager.subscribe('iterationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
