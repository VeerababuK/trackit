import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { StoryMySuffixComponent } from './story-my-suffix.component';
import { StoryMySuffixDetailComponent } from './story-my-suffix-detail.component';
import { StoryMySuffixPopupComponent } from './story-my-suffix-dialog.component';
import { StoryMySuffixDeletePopupComponent } from './story-my-suffix-delete-dialog.component';

@Injectable()
export class StoryMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const storyRoute: Routes = [
    {
        path: 'story-my-suffix',
        component: StoryMySuffixComponent,
        resolve: {
            'pagingParams': StoryMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stories'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'story-my-suffix/:id',
        component: StoryMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storyPopupRoute: Routes = [
    {
        path: 'story-my-suffix-new',
        component: StoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'story-my-suffix/:id/edit',
        component: StoryMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'story-my-suffix/:id/delete',
        component: StoryMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
