import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    Release_MySuffixService,
    Release_MySuffixPopupService,
    Release_MySuffixComponent,
    Release_MySuffixDetailComponent,
    Release_MySuffixDialogComponent,
    Release_MySuffixPopupComponent,
    Release_MySuffixDeletePopupComponent,
    Release_MySuffixDeleteDialogComponent,
    release_Route,
    release_PopupRoute,
} from './';

const ENTITY_STATES = [
    ...release_Route,
    ...release_PopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        Release_MySuffixComponent,
        Release_MySuffixDetailComponent,
        Release_MySuffixDialogComponent,
        Release_MySuffixDeleteDialogComponent,
        Release_MySuffixPopupComponent,
        Release_MySuffixDeletePopupComponent,
    ],
    entryComponents: [
        Release_MySuffixComponent,
        Release_MySuffixDialogComponent,
        Release_MySuffixPopupComponent,
        Release_MySuffixDeleteDialogComponent,
        Release_MySuffixDeletePopupComponent,
    ],
    providers: [
        Release_MySuffixService,
        Release_MySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitRelease_MySuffixModule {}
