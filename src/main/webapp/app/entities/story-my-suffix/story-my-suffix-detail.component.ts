import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StoryMySuffix } from './story-my-suffix.model';
import { StoryMySuffixService } from './story-my-suffix.service';

@Component({
    selector: 'jhi-story-my-suffix-detail',
    templateUrl: './story-my-suffix-detail.component.html'
})
export class StoryMySuffixDetailComponent implements OnInit, OnDestroy {

    story: StoryMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storyService: StoryMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStories();
    }

    load(id) {
        this.storyService.find(id)
            .subscribe((storyResponse: HttpResponse<StoryMySuffix>) => {
                this.story = storyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storyListModification',
            (response) => this.load(this.story.id)
        );
    }
}
