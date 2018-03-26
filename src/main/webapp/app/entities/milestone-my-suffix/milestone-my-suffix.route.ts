import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MilestoneMySuffixComponent } from './milestone-my-suffix.component';
import { MilestoneMySuffixDetailComponent } from './milestone-my-suffix-detail.component';
import { MilestoneMySuffixPopupComponent } from './milestone-my-suffix-dialog.component';
import { MilestoneMySuffixDeletePopupComponent } from './milestone-my-suffix-delete-dialog.component';

export const milestoneRoute: Routes = [
    {
        path: 'milestone-my-suffix',
        component: MilestoneMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Milestones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'milestone-my-suffix/:id',
        component: MilestoneMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Milestones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const milestonePopupRoute: Routes = [
    {
        path: 'milestone-my-suffix-new',
        component: MilestoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Milestones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'milestone-my-suffix/:id/edit',
        component: MilestoneMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Milestones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'milestone-my-suffix/:id/delete',
        component: MilestoneMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Milestones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
