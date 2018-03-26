import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    FeatureMySuffixService,
    FeatureMySuffixPopupService,
    FeatureMySuffixComponent,
    FeatureMySuffixDetailComponent,
    FeatureMySuffixDialogComponent,
    FeatureMySuffixPopupComponent,
    FeatureMySuffixDeletePopupComponent,
    FeatureMySuffixDeleteDialogComponent,
    featureRoute,
    featurePopupRoute,
    FeatureMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...featureRoute,
    ...featurePopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FeatureMySuffixComponent,
        FeatureMySuffixDetailComponent,
        FeatureMySuffixDialogComponent,
        FeatureMySuffixDeleteDialogComponent,
        FeatureMySuffixPopupComponent,
        FeatureMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FeatureMySuffixComponent,
        FeatureMySuffixDialogComponent,
        FeatureMySuffixPopupComponent,
        FeatureMySuffixDeleteDialogComponent,
        FeatureMySuffixDeletePopupComponent,
    ],
    providers: [
        FeatureMySuffixService,
        FeatureMySuffixPopupService,
        FeatureMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitFeatureMySuffixModule {}
