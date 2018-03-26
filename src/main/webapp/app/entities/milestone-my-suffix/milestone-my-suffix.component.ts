import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MilestoneMySuffix } from './milestone-my-suffix.model';
import { MilestoneMySuffixService } from './milestone-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-milestone-my-suffix',
    templateUrl: './milestone-my-suffix.component.html'
})
export class MilestoneMySuffixComponent implements OnInit, OnDestroy {
milestones: MilestoneMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private milestoneService: MilestoneMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.milestoneService.query().subscribe(
            (res: HttpResponse<MilestoneMySuffix[]>) => {
                this.milestones = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMilestones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MilestoneMySuffix) {
        return item.id;
    }
    registerChangeInMilestones() {
        this.eventSubscriber = this.eventManager.subscribe('milestoneListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
