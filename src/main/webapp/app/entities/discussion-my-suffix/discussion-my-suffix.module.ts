import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    DiscussionMySuffixService,
    DiscussionMySuffixPopupService,
    DiscussionMySuffixComponent,
    DiscussionMySuffixDetailComponent,
    DiscussionMySuffixDialogComponent,
    DiscussionMySuffixPopupComponent,
    DiscussionMySuffixDeletePopupComponent,
    DiscussionMySuffixDeleteDialogComponent,
    discussionRoute,
    discussionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...discussionRoute,
    ...discussionPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DiscussionMySuffixComponent,
        DiscussionMySuffixDetailComponent,
        DiscussionMySuffixDialogComponent,
        DiscussionMySuffixDeleteDialogComponent,
        DiscussionMySuffixPopupComponent,
        DiscussionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DiscussionMySuffixComponent,
        DiscussionMySuffixDialogComponent,
        DiscussionMySuffixPopupComponent,
        DiscussionMySuffixDeleteDialogComponent,
        DiscussionMySuffixDeletePopupComponent,
    ],
    providers: [
        DiscussionMySuffixService,
        DiscussionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitDiscussionMySuffixModule {}
