import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    ReleaseXMySuffixService,
    ReleaseXMySuffixPopupService,
    ReleaseXMySuffixComponent,
    ReleaseXMySuffixDetailComponent,
    ReleaseXMySuffixDialogComponent,
    ReleaseXMySuffixPopupComponent,
    ReleaseXMySuffixDeletePopupComponent,
    ReleaseXMySuffixDeleteDialogComponent,
    releaseXRoute,
    releaseXPopupRoute,
} from './';

const ENTITY_STATES = [
    ...releaseXRoute,
    ...releaseXPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReleaseXMySuffixComponent,
        ReleaseXMySuffixDetailComponent,
        ReleaseXMySuffixDialogComponent,
        ReleaseXMySuffixDeleteDialogComponent,
        ReleaseXMySuffixPopupComponent,
        ReleaseXMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ReleaseXMySuffixComponent,
        ReleaseXMySuffixDialogComponent,
        ReleaseXMySuffixPopupComponent,
        ReleaseXMySuffixDeleteDialogComponent,
        ReleaseXMySuffixDeletePopupComponent,
    ],
    providers: [
        ReleaseXMySuffixService,
        ReleaseXMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitReleaseXMySuffixModule {}
