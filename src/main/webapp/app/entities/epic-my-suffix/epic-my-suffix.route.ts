import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EpicMySuffixComponent } from './epic-my-suffix.component';
import { EpicMySuffixDetailComponent } from './epic-my-suffix-detail.component';
import { EpicMySuffixPopupComponent } from './epic-my-suffix-dialog.component';
import { EpicMySuffixDeletePopupComponent } from './epic-my-suffix-delete-dialog.component';

@Injectable()
export class EpicMySuffixResolvePagingParams implements Resolve<any> {

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

export const epicRoute: Routes = [
    {
        path: 'epic-my-suffix',
        component: EpicMySuffixComponent,
        resolve: {
            'pagingParams': EpicMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Epics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'epic-my-suffix/:id',
        component: EpicMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Epics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const epicPopupRoute: Routes = [
    {
        path: 'epic-my-suffix-new',
        component: EpicMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Epics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'epic-my-suffix/:id/edit',
        component: EpicMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Epics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'epic-my-suffix/:id/delete',
        component: EpicMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Epics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
