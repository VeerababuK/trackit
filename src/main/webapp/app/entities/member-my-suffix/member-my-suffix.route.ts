import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MemberMySuffixComponent } from './member-my-suffix.component';
import { MemberMySuffixDetailComponent } from './member-my-suffix-detail.component';
import { MemberMySuffixPopupComponent } from './member-my-suffix-dialog.component';
import { MemberMySuffixDeletePopupComponent } from './member-my-suffix-delete-dialog.component';

export const memberRoute: Routes = [
    {
        path: 'member-my-suffix',
        component: MemberMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'member-my-suffix/:id',
        component: MemberMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const memberPopupRoute: Routes = [
    {
        path: 'member-my-suffix-new',
        component: MemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-my-suffix/:id/edit',
        component: MemberMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'member-my-suffix/:id/delete',
        component: MemberMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Members'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
