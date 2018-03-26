import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    TagMySuffixService,
    TagMySuffixPopupService,
    TagMySuffixComponent,
    TagMySuffixDetailComponent,
    TagMySuffixDialogComponent,
    TagMySuffixPopupComponent,
    TagMySuffixDeletePopupComponent,
    TagMySuffixDeleteDialogComponent,
    tagRoute,
    tagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tagRoute,
    ...tagPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TagMySuffixComponent,
        TagMySuffixDetailComponent,
        TagMySuffixDialogComponent,
        TagMySuffixDeleteDialogComponent,
        TagMySuffixPopupComponent,
        TagMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TagMySuffixComponent,
        TagMySuffixDialogComponent,
        TagMySuffixPopupComponent,
        TagMySuffixDeleteDialogComponent,
        TagMySuffixDeletePopupComponent,
    ],
    providers: [
        TagMySuffixService,
        TagMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitTagMySuffixModule {}
