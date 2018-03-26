import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReleaseXMySuffix } from './release-x-my-suffix.model';
import { ReleaseXMySuffixService } from './release-x-my-suffix.service';

@Component({
    selector: 'jhi-release-x-my-suffix-detail',
    templateUrl: './release-x-my-suffix-detail.component.html'
})
export class ReleaseXMySuffixDetailComponent implements OnInit, OnDestroy {

    releaseX: ReleaseXMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private releaseXService: ReleaseXMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReleaseXES();
    }

    load(id) {
        this.releaseXService.find(id)
            .subscribe((releaseXResponse: HttpResponse<ReleaseXMySuffix>) => {
                this.releaseX = releaseXResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReleaseXES() {
        this.eventSubscriber = this.eventManager.subscribe(
            'releaseXListModification',
            (response) => this.load(this.releaseX.id)
        );
    }
}
