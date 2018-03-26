import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { ReleaseXMySuffixService } from './release-x-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-release-x-my-suffix',
    templateUrl: './release-x-my-suffix.component.html'
})
export class ReleaseXMySuffixComponent implements OnInit, OnDestroy {
releaseXES: ReleaseXMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private releaseXService: ReleaseXMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.releaseXService.query().subscribe(
            (res: HttpResponse<ReleaseXMySuffix[]>) => {
                this.releaseXES = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInReleaseXES();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ReleaseXMySuffix) {
        return item.id;
    }
    registerChangeInReleaseXES() {
        this.eventSubscriber = this.eventManager.subscribe('releaseXListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
