import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Release_MySuffix } from './release-my-suffix.model';
import { Release_MySuffixService } from './release-my-suffix.service';

@Component({
    selector: 'jhi-release-my-suffix-detail',
    templateUrl: './release-my-suffix-detail.component.html'
})
export class Release_MySuffixDetailComponent implements OnInit, OnDestroy {

    release_: Release_MySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private release_Service: Release_MySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRelease_S();
    }

    load(id) {
        this.release_Service.find(id)
            .subscribe((release_Response: HttpResponse<Release_MySuffix>) => {
                this.release_ = release_Response.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRelease_S() {
        this.eventSubscriber = this.eventManager.subscribe(
            'release_ListModification',
            (response) => this.load(this.release_.id)
        );
    }
}
