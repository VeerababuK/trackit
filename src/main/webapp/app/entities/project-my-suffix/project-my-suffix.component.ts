import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectMySuffix } from './project-my-suffix.model';
import { ProjectMySuffixService } from './project-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-project-my-suffix',
    templateUrl: './project-my-suffix.component.html'
})
export class ProjectMySuffixComponent implements OnInit, OnDestroy {
projects: ProjectMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private projectService: ProjectMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.projectService.query().subscribe(
            (res: HttpResponse<ProjectMySuffix[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProjectMySuffix) {
        return item.id;
    }
    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
