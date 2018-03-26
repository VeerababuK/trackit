import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DefectMySuffix } from './defect-my-suffix.model';
import { DefectMySuffixService } from './defect-my-suffix.service';

@Component({
    selector: 'jhi-defect-my-suffix-detail',
    templateUrl: './defect-my-suffix-detail.component.html'
})
export class DefectMySuffixDetailComponent implements OnInit, OnDestroy {

    defect: DefectMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private defectService: DefectMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDefects();
    }

    load(id) {
        this.defectService.find(id)
            .subscribe((defectResponse: HttpResponse<DefectMySuffix>) => {
                this.defect = defectResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDefects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'defectListModification',
            (response) => this.load(this.defect.id)
        );
    }
}
