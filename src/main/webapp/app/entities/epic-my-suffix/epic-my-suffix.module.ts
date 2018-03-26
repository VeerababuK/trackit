import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    EpicMySuffixService,
    EpicMySuffixPopupService,
    EpicMySuffixComponent,
    EpicMySuffixDetailComponent,
    EpicMySuffixDialogComponent,
    EpicMySuffixPopupComponent,
    EpicMySuffixDeletePopupComponent,
    EpicMySuffixDeleteDialogComponent,
    epicRoute,
    epicPopupRoute,
    EpicMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...epicRoute,
    ...epicPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EpicMySuffixComponent,
        EpicMySuffixDetailComponent,
        EpicMySuffixDialogComponent,
        EpicMySuffixDeleteDialogComponent,
        EpicMySuffixPopupComponent,
        EpicMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EpicMySuffixComponent,
        EpicMySuffixDialogComponent,
        EpicMySuffixPopupComponent,
        EpicMySuffixDeleteDialogComponent,
        EpicMySuffixDeletePopupComponent,
    ],
    providers: [
        EpicMySuffixService,
        EpicMySuffixPopupService,
        EpicMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitEpicMySuffixModule {}
