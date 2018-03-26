import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DefectMySuffix } from './defect-my-suffix.model';
import { DefectMySuffixService } from './defect-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-defect-my-suffix',
    templateUrl: './defect-my-suffix.component.html'
})
export class DefectMySuffixComponent implements OnInit, OnDestroy {
defects: DefectMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private defectService: DefectMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.defectService.query().subscribe(
            (res: HttpResponse<DefectMySuffix[]>) => {
                this.defects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDefects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DefectMySuffix) {
        return item.id;
    }
    registerChangeInDefects() {
        this.eventSubscriber = this.eventManager.subscribe('defectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
