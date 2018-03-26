import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    CalendarMySuffixService,
    CalendarMySuffixPopupService,
    CalendarMySuffixComponent,
    CalendarMySuffixDetailComponent,
    CalendarMySuffixDialogComponent,
    CalendarMySuffixPopupComponent,
    CalendarMySuffixDeletePopupComponent,
    CalendarMySuffixDeleteDialogComponent,
    calendarRoute,
    calendarPopupRoute,
} from './';

const ENTITY_STATES = [
    ...calendarRoute,
    ...calendarPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CalendarMySuffixComponent,
        CalendarMySuffixDetailComponent,
        CalendarMySuffixDialogComponent,
        CalendarMySuffixDeleteDialogComponent,
        CalendarMySuffixPopupComponent,
        CalendarMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CalendarMySuffixComponent,
        CalendarMySuffixDialogComponent,
        CalendarMySuffixPopupComponent,
        CalendarMySuffixDeleteDialogComponent,
        CalendarMySuffixDeletePopupComponent,
    ],
    providers: [
        CalendarMySuffixService,
        CalendarMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitCalendarMySuffixModule {}
