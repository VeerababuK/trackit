import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackitSharedModule } from '../../shared';
import {
    MemberMySuffixService,
    MemberMySuffixPopupService,
    MemberMySuffixComponent,
    MemberMySuffixDetailComponent,
    MemberMySuffixDialogComponent,
    MemberMySuffixPopupComponent,
    MemberMySuffixDeletePopupComponent,
    MemberMySuffixDeleteDialogComponent,
    memberRoute,
    memberPopupRoute,
} from './';

const ENTITY_STATES = [
    ...memberRoute,
    ...memberPopupRoute,
];

@NgModule({
    imports: [
        TrackitSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MemberMySuffixComponent,
        MemberMySuffixDetailComponent,
        MemberMySuffixDialogComponent,
        MemberMySuffixDeleteDialogComponent,
        MemberMySuffixPopupComponent,
        MemberMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MemberMySuffixComponent,
        MemberMySuffixDialogComponent,
        MemberMySuffixPopupComponent,
        MemberMySuffixDeleteDialogComponent,
        MemberMySuffixDeletePopupComponent,
    ],
    providers: [
        MemberMySuffixService,
        MemberMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackitMemberMySuffixModule {}
