import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    IterationMySuffixService,
    IterationMySuffixPopupService,
    IterationMySuffixComponent,
    IterationMySuffixDetailComponent,
    IterationMySuffixDialogComponent,
    IterationMySuffixPopupComponent,
    IterationMySuffixDeletePopupComponent,
    IterationMySuffixDeleteDialogComponent,
    iterationRoute,
    iterationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...iterationRoute,
    ...iterationPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IterationMySuffixComponent,
        IterationMySuffixDetailComponent,
        IterationMySuffixDialogComponent,
        IterationMySuffixDeleteDialogComponent,
        IterationMySuffixPopupComponent,
        IterationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        IterationMySuffixComponent,
        IterationMySuffixDialogComponent,
        IterationMySuffixPopupComponent,
        IterationMySuffixDeleteDialogComponent,
        IterationMySuffixDeletePopupComponent,
    ],
    providers: [
        IterationMySuffixService,
        IterationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitIterationMySuffixModule {}
