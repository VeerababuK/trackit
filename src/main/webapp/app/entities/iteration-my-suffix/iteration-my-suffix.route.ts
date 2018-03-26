import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IterationMySuffixComponent } from './iteration-my-suffix.component';
import { IterationMySuffixDetailComponent } from './iteration-my-suffix-detail.component';
import { IterationMySuffixPopupComponent } from './iteration-my-suffix-dialog.component';
import { IterationMySuffixDeletePopupComponent } from './iteration-my-suffix-delete-dialog.component';

export const iterationRoute: Routes = [
    {
        path: 'iteration-my-suffix',
        component: IterationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'iteration-my-suffix/:id',
        component: IterationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const iterationPopupRoute: Routes = [
    {
        path: 'iteration-my-suffix-new',
        component: IterationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iteration-my-suffix/:id/edit',
        component: IterationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'iteration-my-suffix/:id/delete',
        component: IterationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Iterations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
