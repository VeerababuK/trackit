import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    StoryMySuffixService,
    StoryMySuffixPopupService,
    StoryMySuffixComponent,
    StoryMySuffixDetailComponent,
    StoryMySuffixDialogComponent,
    StoryMySuffixPopupComponent,
    StoryMySuffixDeletePopupComponent,
    StoryMySuffixDeleteDialogComponent,
    storyRoute,
    storyPopupRoute,
    StoryMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...storyRoute,
    ...storyPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoryMySuffixComponent,
        StoryMySuffixDetailComponent,
        StoryMySuffixDialogComponent,
        StoryMySuffixDeleteDialogComponent,
        StoryMySuffixPopupComponent,
        StoryMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StoryMySuffixComponent,
        StoryMySuffixDialogComponent,
        StoryMySuffixPopupComponent,
        StoryMySuffixDeleteDialogComponent,
        StoryMySuffixDeletePopupComponent,
    ],
    providers: [
        StoryMySuffixService,
        StoryMySuffixPopupService,
        StoryMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitStoryMySuffixModule {}
