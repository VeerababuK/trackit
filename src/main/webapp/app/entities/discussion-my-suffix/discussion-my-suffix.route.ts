import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DiscussionMySuffixComponent } from './discussion-my-suffix.component';
import { DiscussionMySuffixDetailComponent } from './discussion-my-suffix-detail.component';
import { DiscussionMySuffixPopupComponent } from './discussion-my-suffix-dialog.component';
import { DiscussionMySuffixDeletePopupComponent } from './discussion-my-suffix-delete-dialog.component';

export const discussionRoute: Routes = [
    {
        path: 'discussion-my-suffix',
        component: DiscussionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discussions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discussion-my-suffix/:id',
        component: DiscussionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discussions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discussionPopupRoute: Routes = [
    {
        path: 'discussion-my-suffix-new',
        component: DiscussionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discussions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discussion-my-suffix/:id/edit',
        component: DiscussionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discussions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discussion-my-suffix/:id/delete',
        component: DiscussionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discussions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
