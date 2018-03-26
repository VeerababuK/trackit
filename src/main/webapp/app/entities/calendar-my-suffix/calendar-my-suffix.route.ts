import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CalendarMySuffixComponent } from './calendar-my-suffix.component';
import { CalendarMySuffixDetailComponent } from './calendar-my-suffix-detail.component';
import { CalendarMySuffixPopupComponent } from './calendar-my-suffix-dialog.component';
import { CalendarMySuffixDeletePopupComponent } from './calendar-my-suffix-delete-dialog.component';

export const calendarRoute: Routes = [
    {
        path: 'calendar-my-suffix',
        component: CalendarMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calendars'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calendar-my-suffix/:id',
        component: CalendarMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calendars'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calendarPopupRoute: Routes = [
    {
        path: 'calendar-my-suffix-new',
        component: CalendarMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calendars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calendar-my-suffix/:id/edit',
        component: CalendarMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calendars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calendar-my-suffix/:id/delete',
        component: CalendarMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Calendars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
