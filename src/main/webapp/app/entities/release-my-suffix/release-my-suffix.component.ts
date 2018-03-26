import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Release_MySuffix } from './release-my-suffix.model';
import { Release_MySuffixService } from './release-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-release-my-suffix',
    templateUrl: './release-my-suffix.component.html'
})
export class Release_MySuffixComponent implements OnInit, OnDestroy {
release_S: Release_MySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private release_Service: Release_MySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.release_Service.query().subscribe(
            (res: HttpResponse<Release_MySuffix[]>) => {
                this.release_S = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRelease_S();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Release_MySuffix) {
        return item.id;
    }
    registerChangeInRelease_S() {
        this.eventSubscriber = this.eventManager.subscribe('release_ListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
