import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProjectMySuffixComponent } from './project-my-suffix.component';
import { ProjectMySuffixDetailComponent } from './project-my-suffix-detail.component';
import { ProjectMySuffixPopupComponent } from './project-my-suffix-dialog.component';
import { ProjectMySuffixDeletePopupComponent } from './project-my-suffix-delete-dialog.component';

export const projectRoute: Routes = [
    {
        path: 'project-my-suffix',
        component: ProjectMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-my-suffix/:id',
        component: ProjectMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-my-suffix-new',
        component: ProjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-my-suffix/:id/edit',
        component: ProjectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-my-suffix/:id/delete',
        component: ProjectMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
