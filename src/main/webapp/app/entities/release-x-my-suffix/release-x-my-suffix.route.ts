import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReleaseXMySuffixComponent } from './release-x-my-suffix.component';
import { ReleaseXMySuffixDetailComponent } from './release-x-my-suffix-detail.component';
import { ReleaseXMySuffixPopupComponent } from './release-x-my-suffix-dialog.component';
import { ReleaseXMySuffixDeletePopupComponent } from './release-x-my-suffix-delete-dialog.component';

export const releaseXRoute: Routes = [
    {
        path: 'release-x-my-suffix',
        component: ReleaseXMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Releases'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'release-x-my-suffix/:id',
        component: ReleaseXMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Releases'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const releaseXPopupRoute: Routes = [
    {
        path: 'release-x-my-suffix-new',
        component: ReleaseXMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Releases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'release-x-my-suffix/:id/edit',
        component: ReleaseXMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Releases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'release-x-my-suffix/:id/delete',
        component: ReleaseXMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Releases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
