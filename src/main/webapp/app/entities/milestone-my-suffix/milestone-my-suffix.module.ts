import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    MilestoneMySuffixService,
    MilestoneMySuffixPopupService,
    MilestoneMySuffixComponent,
    MilestoneMySuffixDetailComponent,
    MilestoneMySuffixDialogComponent,
    MilestoneMySuffixPopupComponent,
    MilestoneMySuffixDeletePopupComponent,
    MilestoneMySuffixDeleteDialogComponent,
    milestoneRoute,
    milestonePopupRoute,
} from './';

const ENTITY_STATES = [
    ...milestoneRoute,
    ...milestonePopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MilestoneMySuffixComponent,
        MilestoneMySuffixDetailComponent,
        MilestoneMySuffixDialogComponent,
        MilestoneMySuffixDeleteDialogComponent,
        MilestoneMySuffixPopupComponent,
        MilestoneMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MilestoneMySuffixComponent,
        MilestoneMySuffixDialogComponent,
        MilestoneMySuffixPopupComponent,
        MilestoneMySuffixDeleteDialogComponent,
        MilestoneMySuffixDeletePopupComponent,
    ],
    providers: [
        MilestoneMySuffixService,
        MilestoneMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitMilestoneMySuffixModule {}
