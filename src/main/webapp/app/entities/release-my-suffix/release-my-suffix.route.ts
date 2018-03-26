import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Release_MySuffixComponent } from './release-my-suffix.component';
import { Release_MySuffixDetailComponent } from './release-my-suffix-detail.component';
import { Release_MySuffixPopupComponent } from './release-my-suffix-dialog.component';
import { Release_MySuffixDeletePopupComponent } from './release-my-suffix-delete-dialog.component';

export const release_Route: Routes = [
    {
        path: 'release-my-suffix',
        component: Release_MySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Release_S'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'release-my-suffix/:id',
        component: Release_MySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Release_S'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const release_PopupRoute: Routes = [
    {
        path: 'release-my-suffix-new',
        component: Release_MySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Release_S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'release-my-suffix/:id/edit',
        component: Release_MySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Release_S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'release-my-suffix/:id/delete',
        component: Release_MySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Release_S'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
