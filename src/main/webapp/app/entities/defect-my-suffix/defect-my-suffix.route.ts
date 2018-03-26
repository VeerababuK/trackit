import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DefectMySuffixComponent } from './defect-my-suffix.component';
import { DefectMySuffixDetailComponent } from './defect-my-suffix-detail.component';
import { DefectMySuffixPopupComponent } from './defect-my-suffix-dialog.component';
import { DefectMySuffixDeletePopupComponent } from './defect-my-suffix-delete-dialog.component';

export const defectRoute: Routes = [
    {
        path: 'defect-my-suffix',
        component: DefectMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Defects'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'defect-my-suffix/:id',
        component: DefectMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Defects'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const defectPopupRoute: Routes = [
    {
        path: 'defect-my-suffix-new',
        component: DefectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Defects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'defect-my-suffix/:id/edit',
        component: DefectMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Defects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'defect-my-suffix/:id/delete',
        component: DefectMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Defects'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
